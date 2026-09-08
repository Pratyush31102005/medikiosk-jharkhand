import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  flow,
  cleanAnswers,
  isYes,
  canonicalAnswer,
  spokenAge,
  words,
  languages,
  local,
  common,
  symptomKinds,
} from '../lib/village.ts';
test('stomach complaints route identically in all four languages', () => {
  for (const complaint of ['पेट दर्द', 'Stomach pain', 'পেট ব্যথা', 'ପେଟ ବଥା']) {
    const ids = flow({ complaint }, 'opd').map((q) => q.id);
    assert(ids.includes('stomach_site'));
    assert(!ids.includes('cough_type'));
    assert(!ids.includes('head_site'));
  }
});
test('positive vomiting response asks related follow-up in every language', () => {
  for (const vomiting of ['Yes', 'हाँ', 'হ্যাঁ', 'ହଁ']) {
    assert(isYes(vomiting));
    const ids = flow({ complaint: 'Stomach pain', vomiting }, 'opd').map(
      (q) => q.id,
    );
    assert.equal(ids[ids.indexOf('vomiting') + 1], 'vomiting_count');
  }
  assert(
    !flow({ complaint: 'Stomach pain', vomiting: 'No' }, 'opd').some(
      (q) => q.id === 'vomiting_count',
    ),
  );
});
test('diarrhea and productive cough get specific follow-ups', () => {
  assert(
    flow({ complaint: 'Stomach pain', bowel: 'Diarrhea' }, 'opd').some(
      (q) => q.id === 'bowel_count',
    ),
  );
  assert(
    flow({ complaint: 'Cough', cough_type: 'With phlegm' }, 'opd').some(
      (q) => q.id === 'phlegm',
    ),
  );
  assert(
    !flow({ complaint: 'Cough', cough_type: 'Dry cough' }, 'opd').some(
      (q) => q.id === 'phlegm',
    ),
  );
});
test('changing complaint removes stale branch answers and dependent questions', () => {
  const a = cleanAnswers(
    {
      complaint: 'Stomach pain',
      cough_type: 'With phlegm',
      phlegm: 'Yellow',
      cough_fever: 'Yes',
      fever_temp: '38',
      vomiting: 'No',
      vomiting_count: '5',
    },
    'opd',
  );
  assert.deepEqual(a, { complaint: 'Stomach pain', vomiting: 'No' });
});
test('additional symptoms add related questions without duplicates', () => {
  const ids = flow(
    {
      complaint: 'Cough',
      cough_fever: 'Yes',
      associated: 'Fever and stomach pain',
      vomiting: 'Yes',
    },
    'opd',
  ).map((q) => q.id);
  assert(ids.includes('fever_temp'));
  assert(ids.includes('stomach_site'));
  assert(ids.includes('vomiting_count'));
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(symptomKinds('पेट दर्द और खांसी'), ['stomach', 'cough']);
});
test('all static labels and reachable questions have four nonempty translations', () => {
  for (const w of Object.values(words))
    for (const l of languages) assert(local(w, l)?.trim());
  for (const q of flow(
    {
      complaint: 'Stomach pain cough fever headache joint pain',
      vomiting: 'Yes',
      bowel: 'Diarrhea',
      cough_type: 'With phlegm',
    },
    'ayush',
  )) {
    for (const l of languages) {
      assert(local(q.title, l)?.trim());
      for (const c of q.choices || []) assert(local(c, l)?.trim());
    }
  }
});
test('localized choices save canonical values; unfamiliar answers stay verbatim', () => {
  assert.equal(canonicalAnswer('হ্যাঁ', common.safety), 'Yes');
  assert.equal(canonicalAnswer('ନା', common.safety), 'No');
  assert.equal(canonicalAnswer('हाँ।', common.safety), 'Yes');
  assert.equal(
    canonicalAnswer('I have a new symptom', common.safety),
    'I have a new symptom',
  );
});
test('spoken ages support native digits and reject ambiguous text without guessing', () => {
  for (const s of ['४२', '৪২', '୪୨', 'बयालीस', 'forty two', 'বিয়াল্লিশ', 'ବୟାଳିଶ'])
    assert.equal(spokenAge(s), '42');
  assert.equal(spokenAge('मेरी उम्र पच्चीस साल है'), '25');
  assert.equal(spokenAge('one hundred and twenty'), '120');
  assert.equal(spokenAge('maybe thirty or forty'), 'maybe thirty or forty');
});
