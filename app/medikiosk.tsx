'use client';
import { useEffect, useRef, useState } from 'react';
import {
  HeartPulse,
  UserRound,
  Stethoscope,
  Mic,
  MicOff,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  FileHeart,
  LogOut,
  Download,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  assessmentFields,
  orderVisits,
  needsAttention,
  type Visit,
  type Answers,
} from '@/lib/intake';
import {
  words,
  local,
  languages,
  languageNames,
  flow,
  cleanAnswers,
  canonicalAnswer,
  displayAnswer,
  spokenAge,
  urgentAnswer,
  type Lang,
  type Q,
} from '@/lib/village';
type Screen =
  | 'role'
  | 'patient'
  | 'login'
  | 'consent'
  | 'setup'
  | 'form'
  | 'review'
  | 'saved'
  | 'records'
  | 'record'
  | 'doctor'
  | 'case';
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult:
    | ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void)
    | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
  stop: () => void;
};
const STORE = 'medikiosk-demo-visits-v1',
  doctors = ['DOC-101', 'DOC-102'];
const identity = (s: string) =>
  s
    .toUpperCase()
    .replace(/[\s–—]+/g, '-')
    .replace(/-+/g, '-')
    .trim();
const confirmSpeech = (s: string) =>
  /^(सही है|हाँ सही है|हां सही है|आगे|आगे बढ़ें|confirm|correct|yes|yes correct|next|ঠিক আছে|হ্যাঁ ঠিক আছে|পরের|ଠିକ୍ ଅଛି|ହଁ ଠିକ୍ ଅଛି|ଆଗକୁ)[।.!?\s]*$/i.test(
    s.trim(),
  );
function draftSummary(v: Visit) {
  return [
    `PATIENT-REPORTED HISTORY — DRAFT`,
    `${v.name} | ${v.age} | ${v.patientId}`,
    `Address: ${v.address || 'Not provided'} | Doctor: ${v.doctorId || 'DOC-101'}`,
    ...flow(v.answers, v.mode)
      .filter((q) => v.answers[q.id])
      .map((q) => `${q.title[1]}: ${v.answers[q.id]}`),
    'No diagnosis inferred. Clinician review required.',
  ].join('\n\n');
}
export default function MediKiosk() {
  const [lang, setLang] = useState<Lang>('hi'),
    [screen, setScreen] = useState<Screen>('role'),
    [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]),
    [message, setMessage] = useState(''),
    [consent, setConsent] = useState(false),
    [voice, setVoice] = useState(false),
    [auto, setAuto] = useState(false);
  const [profile, setProfile] = useState({ name: '', age: '', address: '' }),
    [patientId, setPatientId] = useState(''),
    [doctorId, setDoctorId] = useState('DOC-101'),
    [loginId, setLoginId] = useState(''),
    [lookup, setLookup] = useState('');
  const [doctorSession,setDoctorSession]=useState(false);
  const [mode, setMode] = useState<'opd' | 'ayush'>('opd'),
    [answers, setAnswers] = useState<Answers>({}),
    [field, setField] = useState('name'),
    [value, setValue] = useState(''),
    [reviewReturn, setReviewReturn] = useState(false);
  const [listening, setListening] = useState(false),
    [activeId, setActiveId] = useState(''),
    [editing, setEditing] = useState<Visit | null>(null),
    [checked, setChecked] = useState(false),
    [filter, setFilter] = useState('draft'),
    [deleting, setDeleting] = useState(false);
  const speech = useRef<Recognition | null>(null),
    generation = useRef(0),
    panel = useRef<HTMLDivElement>(null),
    confirmRef = useRef(() => {}),
    captureRef = useRef<() => void>(() => {}),
    voiceRef = useRef(false),
    autoRef = useRef(false),
    continueRef = useRef<(text: string) => void>(() => {});
  const t = (k: keyof typeof words) => local(words[k], lang);
  const profileQs: Q[] = [
    { id: 'name', title: words.name },
    { id: 'age', title: words.age },
    { id: 'address', title: words.address },
  ];
  const qs = [...profileQs, ...flow(answers, mode)],
    question = qs.find((q) => q.id === field) || qs[0];
  const active = visits.find((v) => v.id === activeId),
    own = visits.filter((v) => v.patientId === patientId),
    queue = orderVisits(
      visits.filter((v) => (v.doctorId || 'DOC-101') === doctorId),
    );
  voiceRef.current = voice;
  autoRef.current = auto;
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORE) || '[]');
      if (Array.isArray(data))
        setVisits(
          data.filter(
            (v) =>
              v &&
              typeof v.id === 'string' &&
              typeof v.patientId === 'string' &&
              v.answers &&
              typeof v.date === 'string',
          ),
        );
    } catch {
      setMessage(local(words.storageError, 'hi'));
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  function stop() {
    generation.current++;
    speech.current?.abort();
    speech.current = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setListening(false);
  }
  function go(s: Screen) {
    stop();
    setMessage('');
    setScreen(s);
  }
  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [screen, field]);
  useEffect(
    () => () => {
      generation.current++;
      speech.current?.abort();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    },
    [],
  );
  function persist(next: Visit[]) {
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
      setVisits(next);
      return true;
    } catch {
      setMessage(t('storageError'));
      return false;
    }
  }
  function read(text: string, after?: () => void) {
    const token = ++generation.current;
    speech.current?.abort();
    setListening(false);
    if (!('speechSynthesis' in window)) {
      setMessage(t('noAudio'));
      return;
    }
    window.speechSynthesis.cancel();
    const available = window.speechSynthesis.getVoices(),
      selected = available.find((v) => v.lang.toLowerCase().startsWith(lang));
    if (available.length && !selected) {
      setMessage(t('noAudio'));
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = `${lang}-IN`;
    if (selected) u.voice = selected;
    u.rate = 0.85;
    u.onend = () => {
      if (token === generation.current) after?.();
    };
    u.onerror = () => {
      if (token === generation.current) setMessage(t('noAudio'));
    };
    window.speechSynthesis.speak(u);
  }
  function capture(onText: (s: string) => void) {
    if (!voiceRef.current) {
      setMessage(t('voicePermission'));
      return;
    }
    if (listening) {
      stop();
      return;
    }
    stop();
    const token = generation.current;
    const w = window as Window & {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const C = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!C) {
      setAuto(false);
      setMessage(t('unavailable'));
      return;
    }
    const r = new C();
    speech.current = r;
    r.lang = `${lang}-IN`;
    r.continuous = false;
    r.interimResults = false;
    r.onresult = (e) => {
      if (token !== generation.current) return;
      setListening(false);
      onText(e.results[0][0].transcript);
    };
    r.onerror = () => {
      if (token === generation.current) {
        setListening(false);
        setMessage(t('notHeard'));
      }
    };
    r.onend = () => {
      if (token === generation.current) setListening(false);
    };
    try {
      r.start();
      setListening(true);
      setMessage('');
    } catch {
      setListening(false);
      setMessage(t('notHeard'));
    }
  }
  function acceptSpeech(text: string) {
    const next =
      field === 'age' ? spokenAge(text) : canonicalAnswer(text, question);
    setValue(next);
    if (autoRef.current)
      read(`${t('check')} ${displayAnswer(next, question, lang)}`, () =>
        captureRef.current(),
      );
  }
  captureRef.current = () =>
    capture((text) => {
      if (confirmSpeech(text)) confirmRef.current();
      else continueRef.current(text);
    });
  continueRef.current = acceptSpeech;
  function ask() {
    read(local(question.title, lang), () =>
      capture((text) => continueRef.current(text)),
    );
  }
  useEffect(() => {
    if (screen === 'form' && auto && voice) {
      const timer = setTimeout(ask, 250);
      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [screen, field, lang, auto, voice]);
  function enterField(id: string, editingReview = false) {
    stop();
    setField(id);
    setValue(
      id in profile ? profile[id as keyof typeof profile] : answers[id] || '',
    );
    setReviewReturn(editingReview);
    setScreen('form');
  }
  function nextAnswer() {
    let answer = value.trim();
    if (!answer && field !== 'address') return;
    if (field === 'age') {
      answer = spokenAge(answer);
      if (!/^\d+$/.test(answer) || Number(answer) < 1 || Number(answer) > 120) {
        setMessage(t('invalidAge'));
        return;
      }
    }
    stop();
    setMessage('');
    if (field in profile) {
      setProfile((p) => ({ ...p, [field]: answer }));
      if (reviewReturn) {
        go('review');
        return;
      }
      const i = profileQs.findIndex((q) => q.id === field);
      enterField(i < 2 ? profileQs[i + 1].id : 'complaint');
      return;
    }
    const next = cleanAnswers(
      { ...answers, [field]: canonicalAnswer(answer, question) },
      mode,
    );
    setAnswers(next);
    if (reviewReturn) {
      setReviewReturn(false);
      const missing = flow(next, mode).find((q) => !next[q.id]);
      if (!missing) {
        go('review');
        return;
      }
      setField(missing.id);
      setValue('');
      return;
    }
    const route = flow(next, mode),
      i = route.findIndex((q) => q.id === field);
    if (i === route.length - 1) {
      go('review');
      return;
    }
    const item = route[i + 1];
    setField(item.id);
    setValue(next[item.id] || '');
  }
  confirmRef.current = nextAnswer;
  function newVisit() {
    stop();
    setConsent(false);
    setVoice(false);
    setAuto(false);
    setAnswers({});
    setMode('opd');
    setActiveId('');
    setReviewReturn(false);
    if (!patientId) setProfile({ name: '', age: '', address: '' });
    go('consent');
  }
  function save() {
    const a = cleanAnswers(answers, mode);
    if (
      !consent ||
      !profile.name.trim() ||
      Number(profile.age) < 1 ||
      Number(profile.age) > 120 ||
      flow(a, mode).some((q) => !a[q.id])
    )
      return;
    const id = crypto.randomUUID(),
      pid = patientId || `DEMO-${id.slice(0, 6).toUpperCase()}`;
    const v: Visit = {
      id,
      patientId: pid,
      ...profile,
      doctorId,
      mode,
      language: lang,
      answers: a,
      date: new Date().toISOString(),
      consentAt: new Date().toISOString(),
      status: 'draft',
      summary: '',
      history: '',
      notes: '',
      diagnosis: '',
      prescription: '',
      reviewer: '',
      assessment: {},
      urgent: urgentAnswer(a) || needsAttention(a),
    };
    v.summary = draftSummary(v);
    if (persist([v, ...visits])) {
      setPatientId(pid);
      setActiveId(id);
      go('saved');
    }
  }
  function openPatient() {
    const id = identity(lookup),
      v = visits.find((v) => identity(v.patientId) === id);
    if (!v) {
      setMessage(t('notFound'));
      return;
    }
    setPatientId(v.patientId);
    setProfile({ name: v.name, age: v.age, address: v.address || '' });
    setLookup('');
    go('records');
  }
  function openDoctor() {
    const id = identity(loginId);
    if (!doctors.includes(id)) {
      setMessage(t('demoIds'));
      return;
    }
    setDoctorId(id);
    setDoctorSession(true);
    setLoginId('');
    go('doctor');
  }
  function openRecord(v: Visit) {
    setActiveId(v.id);
    if (role === 'doctor') {
      setEditing(structuredClone(v));
      setChecked(false);
      go('case');
    } else go('record');
  }
  function download(v: Visit) {
    const text = [
      v.patientId,
      v.summary,
      v.history,
      v.notes,
      v.diagnosis,
      v.prescription,
      ...Object.entries(v.assessment).map(([k, s]) => `${k}: ${s}`),
      v.reviewer,
      v.status,
    ].join('\n\n');
    const url = URL.createObjectURL(
        new Blob([text], { type: 'text/plain;charset=utf-8' }),
      ),
      a = document.createElement('a');
    a.href = url;
    a.download = `MediKiosk-${v.patientId}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function patchEdit(key: keyof Visit, v: string) {
    if (editing) {
      setEditing({ ...editing, [key]: v });
      setChecked(false);
    }
  }
  function dashboard() {
    go(role === 'doctor' ? (doctorSession?'doctor':'login') : 'patient');
  }
  function VoiceButton({ onText }: { onText: (s: string) => void }) {
    return (
      <button
        type="button"
        className={'voice-button ' + (listening ? 'listening' : '')}
        onClick={() => capture(onText)}
      >
        {listening ? <MicOff /> : <Mic />}
        {t(listening ? 'listening' : 'talk')}
      </button>
    );
  }
  function VoiceAccess() {
    return (
      <label className="consent-row">
        <Checkbox
          checked={voice}
          onCheckedChange={(v) => {
            setVoice(!!v);
            if (!v) {
              setAuto(false);
              stop();
            }
          }}
        />
        <span>{t('voicePermission')}</span>
      </label>
    );
  }
  function recordCards(rows: Visit[]) {
    return rows.length ? (
      rows.map((v) => (
        <button
          className={'queue-card ' + (v.urgent ? 'priority-card' : '')}
          key={v.id}
          onClick={() => openRecord(v)}
        >
          <div className="card-row">
            <b>{v.name}</b>
            <ArrowRight size={20} />
          </div>
          <small>
            {v.patientId} · {new Date(v.date).toLocaleDateString(lang)}
          </small>
          <p>
            {displayAnswer(
              v.answers.complaint || '',
              flow(v.answers, v.mode)[0],
              lang,
            )}
          </p>
          <span className="badge">
            {t(v.status === 'draft' ? 'waiting' : 'done')}
          </span>
        </button>
      ))
    ) : (
      <p className="empty-copy">{t('empty')}</p>
    );
  }
  return (
    <main className="studio village">
      <header className="studio-bar">
        <span className="brand">
          <HeartPulse /> MediKiosk <span className="brand-by">Jharkhand</span>
        </span>
        <span className="demo-label">SIH 2026</span>
      </header>
      <div className="village-stage">
        <aside className="village-aside">
          <HeartPulse size={36} />
          <h1>MediKiosk</h1>
          <p>Jharkhand</p>
          <p>{t('talk')}</p>
          <p className="fineprint">{t('demo')}</p>
        </aside>
        <div className="device">
          <div className="status-bar" aria-hidden="true">
            <b>MediKiosk</b>
            <span>● ● ●</span>
          </div>
          <div className="phone-app">
            <header className="app-header">
              <span className="brand">
                <span className="brand-icon">
                  <HeartPulse />
                </span>
                MediKiosk
              </span>
              <select
                className="language-small"
                aria-label={t('choose')}
                value={lang}
                onChange={(e) => {
                  stop();
                  setLang(e.target.value as Lang);
                }}
              >
                {languages.map((l, i) => (
                  <option key={l} value={l}>
                    {languageNames[i]}
                  </option>
                ))}
              </select>
            </header>
            <div className="page-content" ref={panel}>
              {message && (
                <div className="notice" role="status">
                  {message}
                </div>
              )}
              {screen === 'role' && (
                <>
                  <p className="clinic-line">Jharkhand · SIH 2026</p>
                  <h2>{t('welcome')}</h2>
                  <p className="intro">{t('choose')}</p>
                  <RadioGroup
                    className="language-grid"
                    value={lang}
                    onValueChange={(v) => {
                      stop();
                      setLang(v as Lang);
                    }}
                  >
                    {languages.map((l, i) => (
                      <label
                        className={
                          'language-card ' + (lang === l ? 'selected' : '')
                        }
                        key={l}
                      >
                        <RadioGroupItem value={l} />
                        <span>{languageNames[i]}</span>
                      </label>
                    ))}
                  </RadioGroup>
                  <h3 className="section-title">{t('role')}</h3>
                  <button
                    className="role-card"
                    onClick={() => {
                      setRole('patient');
                      setPatientId('');
                      setLookup('');
                      go('patient');
                    }}
                  >
                    <UserRound />
                    <span>{t('patient')}</span>
                    <ArrowRight />
                  </button>
                  <button
                    className="role-card"
                    onClick={() => {
                      setRole('doctor');
                      setLookup('');
                      go('login');
                    }}
                  >
                    <Stethoscope />
                    <span>{t('doctor')}</span>
                    <ArrowRight />
                  </button>
                  <button
                    className="listen-button"
                    onClick={() =>
                      read(`${t('role')} ${t('patient')} ${t('doctor')}`)
                    }
                  >
                    <Volume2 />
                    {t('listen')}
                  </button>
                  <p className="fineprint">{t('demo')}</p>
                </>
              )}
              {screen === 'patient' && (
                <>
                  <h2>{t('dashboard')}</h2>
                  {patientId && (
                    <div className="patient-strip">
                      <UserRound />
                      <span>
                        {profile.name}
                        <small>{patientId}</small>
                      </span>
                    </div>
                  )}
                  <button className="role-card" onClick={newVisit}>
                    <Plus />
                    <span>{t('newVisit')}</span>
                    <ArrowRight />
                  </button>
                  {patientId && (
                    <button className="role-card" onClick={() => go('records')}>
                      <FileHeart />
                      <span>{t('records')}</span>
                      <ArrowRight />
                    </button>
                  )}
                  <label className="field">
                    {t('patientId')}
                    <input
                      value={lookup}
                      placeholder="DEMO-…"
                      onChange={(e) => setLookup(e.target.value)}
                    />
                  </label>
                  <VoiceAccess />
                  <VoiceButton onText={setLookup} />
                  <button
                    className="secondary spaced"
                    disabled={!lookup.trim()}
                    onClick={openPatient}
                  >
                    {t('open')}
                  </button>
                  <p className="fineprint">{t('demo')}</p>
                </>
              )}
              {screen === 'login' && (
                <>
                  <h2>{t('doctorId')}</h2>
                  <p className="intro">{t('demoIds')}</p>
                  <label className="field">
                    {t('doctorId')}
                    <input
                      autoComplete="off"
                      value={loginId}
                      placeholder="DOC-101"
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </label>
                  <button className="primary spaced" onClick={openDoctor}>
                    {t('open')}
                    <ArrowRight />
                  </button>
                </>
              )}
              {screen === 'consent' && (
                <>
                  <h2>{t('permission')}</h2>
                  <p className="intro">{t('demo')}</p>
                  <button
                    className="listen-button"
                    onClick={() =>
                      read(`${t('demo')} ${t('agree')} ${t('voicePermission')}`)
                    }
                  >
                    <Volume2 />
                    {t('listen')}
                  </button>
                  <label className="consent-row">
                    <Checkbox
                      checked={consent}
                      onCheckedChange={(v) => setConsent(!!v)}
                    />
                    {t('agree')}
                  </label>
                  <VoiceAccess />
                  <label className="consent-row">
                    <Checkbox
                      checked={auto}
                      disabled={!voice}
                      onCheckedChange={(v) => setAuto(!!v)}
                    />
                    {t('handsfree')}
                  </label>
                  <p className="fineprint">{t('voiceHelp')}</p>
                  <button
                    className="primary spaced"
                    disabled={!consent}
                    onClick={() => go('setup')}
                  >
                    {t('next')}
                    <ArrowRight />
                  </button>
                </>
              )}
              {screen === 'setup' && (
                <>
                  <h2>{t('selectDoctor')}</h2>
                  <RadioGroup
                    className="choice-list"
                    value={doctorId}
                    onValueChange={(v) => setDoctorId(String(v))}
                  >
                    {doctors.map((d) => (
                      <label className="choice" key={d}>
                        <RadioGroupItem value={d} />
                        <Stethoscope />
                        {d}
                      </label>
                    ))}
                  </RadioGroup>
                  <h3 className="section-title">{t('clinic')}</h3>
                  <RadioGroup
                    className="choice-list"
                    value={mode}
                    onValueChange={(v) => setMode(v as 'opd' | 'ayush')}
                  >
                    {(['opd', 'ayush'] as const).map((m) => (
                      <label className="choice" key={m}>
                        <RadioGroupItem value={m} />
                        {t(m === 'opd' ? 'general' : 'ayush')}
                      </label>
                    ))}
                  </RadioGroup>
                  <button
                    className="primary spaced"
                    onClick={() => enterField('name')}
                  >
                    {t('next')}
                    <ArrowRight />
                  </button>
                </>
              )}
              {screen === 'form' && (
                <>
                  <div className="step-top">
                    <button
                      className="back-link"
                      onClick={() => {
                        const i = qs.findIndex((q) => q.id === field);
                        if (i > 0) enterField(qs[i - 1].id);
                        else go('setup');
                      }}
                    >
                      <ArrowLeft />
                      {t('back')}
                    </button>
                    <span>
                      {qs.findIndex((q) => q.id === field) + 1} / {qs.length}
                    </span>
                  </div>
                  <h2 className="question-title">
                    {local(question.title, lang)}
                  </h2>
                  <button
                    className="listen-button"
                    onClick={() => read(local(question.title, lang))}
                  >
                    <Volume2 />
                    {t('listen')}
                  </button>
                  {voice && <VoiceButton onText={acceptSpeech} />}
                  {question.choices && (
                    <RadioGroup
                      className="choice-list"
                      value={value}
                      onValueChange={(v) => {
                        stop();
                        setValue(String(v));
                      }}
                    >
                      {question.choices.map((c) => (
                        <label
                          className={
                            'choice ' + (value === c[1] ? 'selected' : '')
                          }
                          key={c[1]}
                        >
                          <RadioGroupItem value={c[1]} />
                          {local(c, lang)}
                        </label>
                      ))}
                    </RadioGroup>
                  )}
                  <label className="field">
                    {t('answer')}
                    <textarea
                      rows={field === 'address' ? 3 : 2}
                      maxLength={
                        field === 'name' ? 60 : field === 'age' ? 40 : 1000
                      }
                      value={displayAnswer(value, question, lang)}
                      onChange={(e) => {
                        stop();
                        setValue(e.target.value);
                      }}
                    />
                  </label>
                  {value && (
                    <button
                      className="listen-button"
                      onClick={() => read(displayAnswer(value, question, lang))}
                    >
                      <Volume2 />
                      {t('check')}
                    </button>
                  )}
                  {(urgentAnswer({ ...answers, [field]: value }) ||
                    needsAttention({ ...answers, [field]: value })) && (
                    <div className="urgent-notice">
                      <AlertTriangle />
                      {t('urgent')}
                    </div>
                  )}
                  <button
                    className="primary spaced"
                    disabled={!value.trim() && field !== 'address'}
                    onClick={nextAnswer}
                  >
                    <Check />
                    {t('next')}
                  </button>
                  {field === 'address' && (
                    <button
                      className="text-button"
                      onClick={() => {
                        setValue('');
                        setProfile((p) => ({ ...p, address: '' }));
                        if (reviewReturn) go('review');
                        else enterField('complaint');
                      }}
                    >
                      {t('optional')}
                    </button>
                  )}
                  {voice && (
                    <label className="consent-row spaced">
                      <Checkbox
                        checked={auto}
                        onCheckedChange={(v) => {
                          stop();
                          setAuto(!!v);
                        }}
                      />
                      {t('handsfree')}
                    </label>
                  )}
                </>
              )}
              {screen === 'review' && (
                <>
                  <h2>{t('review')}</h2>
                  <button
                    className="listen-button"
                    onClick={() =>
                      read(
                        qs
                          .map(
                            (q) =>
                              `${local(q.title, lang)} ${q.id in profile ? profile[q.id as keyof typeof profile] : displayAnswer(answers[q.id] || '', q, lang)}`,
                          )
                          .join('. '),
                      )
                    }
                  >
                    <Volume2 />
                    {t('listen')}
                  </button>
                  {qs.map((q) => (
                    <div className="answer-review" key={q.id}>
                      <div>
                        <small>{local(q.title, lang)}</small>
                        <p>
                          {q.id in profile
                            ? profile[q.id as keyof typeof profile]
                            : displayAnswer(answers[q.id] || '', q, lang)}
                        </p>
                      </div>
                      <button onClick={() => enterField(q.id, true)}>
                        {t('edit')}
                      </button>
                    </div>
                  ))}
                  <p className="fineprint">
                    {t('doctor')}: {doctorId}
                  </p>
                  <button className="primary spaced" onClick={save}>
                    <Check />
                    {t('save')}
                  </button>
                </>
              )}
              {screen === 'saved' && active && (
                <>
                  <div className="success-icon">
                    <Check size={40} />
                  </div>
                  <h2>{t('saved')}</h2>
                  <div className="ticket">
                    <p>{t('patientId')}</p>
                    <h3>{active.patientId}</h3>
                    <p>{active.name}</p>
                    <p>
                      {t('doctor')}: {active.doctorId}
                    </p>
                  </div>
                  <button className="primary" onClick={dashboard}>
                    <Home />
                    {t('dashboard')}
                  </button>
                  <button
                    className="secondary spaced"
                    onClick={() => go('record')}
                  >
                    {t('records')}
                  </button>
                </>
              )}
              {screen === 'records' && (
                <>
                  <h2>{t('records')}</h2>
                  {patientId ? (
                    <>
                      <p className="fineprint">{patientId}</p>
                      {recordCards(own)}
                    </>
                  ) : (
                    <>
                      <label className="field">
                        {t('patientId')}
                        <input
                          value={lookup}
                          onChange={(e) => setLookup(e.target.value)}
                        />
                      </label>
                      <VoiceAccess />
                      <VoiceButton onText={setLookup} />
                      <button className="primary spaced" onClick={openPatient}>
                        {t('open')}
                      </button>
                    </>
                  )}
                </>
              )}
              {screen === 'record' && active && (
                <>
                  <h2>{active.name}</h2>
                  <p className="fineprint">
                    {active.patientId} ·{' '}
                    {t(active.status === 'draft' ? 'waiting' : 'done')}
                  </p>
                  {flow(active.answers, active.mode)
                    .filter((q) => active.answers[q.id])
                    .map((q) => (
                      <div className="answer-review" key={q.id}>
                        <div>
                          <small>{local(q.title, lang)}</small>
                          <p>{displayAnswer(active.answers[q.id], q, lang)}</p>
                        </div>
                      </div>
                    ))}
                  {active.status === 'reviewed' && (
                    <div className="details-block">
                      <h3>
                        {t('doctor')}: {active.reviewer}
                      </h3>
                      <p>{active.notes}</p>
                      <p>{active.diagnosis}</p>
                      <p>{active.prescription}</p>
                    </div>
                  )}
                  <details className="details-block"><summary>{t('summary')}</summary><p className="history-text">{active.summary}</p></details>
                  <button
                    className="secondary spaced"
                    onClick={() => download(active)}
                  >
                    <Download />
                    {t('download')}
                  </button>
                  <button
                    className="text-button danger-text"
                    onClick={() => setDeleting(true)}
                  >
                    {t('delete')}
                  </button>
                </>
              )}
              {screen === 'doctor' && (
                <>
                  <h2>{t('doctorDashboard')}</h2>
                  <p className="intro">{doctorId}</p>
                  <div className="queue-count">
                    <span>
                      {queue.filter((v) => v.status === 'draft').length}
                      <small>{t('waiting')}</small>
                    </span>
                    <span>
                      {queue.filter((v) => v.status === 'reviewed').length}
                      <small>{t('done')}</small>
                    </span>
                  </div>
                  <label className="field">
                    {t('search')}
                    <input
                      value={lookup}
                      placeholder="DEMO-…"
                      onChange={(e) => setLookup(e.target.value)}
                    />
                  </label>
                  <div className="filter-row">
                    {['draft', 'reviewed', 'all'].map((f) => (
                      <button
                        key={f}
                        aria-pressed={filter === f}
                        onClick={() => setFilter(f)}
                      >
                        {t(
                          f === 'draft'
                            ? 'waiting'
                            : f === 'reviewed'
                              ? 'done'
                              : 'all',
                        )}
                      </button>
                    ))}
                  </div>
                  {recordCards(
                    queue.filter(
                      (v) =>
                        (filter === 'all' || v.status === filter) &&
                        (!lookup.trim() ||
                          identity(v.patientId).includes(identity(lookup))),
                    ),
                  )}
                  <button
                    className="secondary spaced"
                    onClick={() => {
                      const id = crypto.randomUUID();
                      const v: Visit = {
                        id,
                        patientId: `DEMO-${id.slice(0, 6).toUpperCase()}`,
                        name: 'Meena Devi',
                        age: '42',
                        address: 'Sample village',
                        doctorId,
                        language: lang,
                        mode: 'opd',
                        answers: {
                          complaint: 'Stomach pain',
                          safety: 'No',
                          onset: 'Today',
                          stomach_site: 'Upper abdomen',
                          vomiting: 'No',
                        },
                        date: new Date().toISOString(),
                        consentAt: new Date().toISOString(),
                        status: 'draft',
                        summary: '',
                        history: '',
                        notes: '',
                        diagnosis: '',
                        prescription: '',
                        reviewer: '',
                        assessment: {},
                        urgent: false,
                      };
                      v.summary = draftSummary(v);
                      persist([v, ...visits]);
                    }}
                  >
                    <Plus />
                    {t('sample')}
                  </button>
                  <p className="fineprint">{t('demoIds')}</p>
                </>
              )}
              {screen === 'case' && editing && (
                <>
                  <button className="back-link" onClick={() => go('doctor')}>
                    <ArrowLeft />
                    {t('doctorDashboard')}
                  </button>
                  <h2>{editing.name}</h2>
                  <p className="fineprint">
                    {editing.patientId} · {editing.age} · {editing.address}
                  </p>
                  {editing.urgent && (
                    <div className="urgent-notice">
                      <AlertTriangle />
                      {t('urgent')}
                    </div>
                  )}
                  <label className="field">
                    {t('summary')}
                    <textarea
                      rows={10}
                      value={editing.summary}
                      onChange={(e) => patchEdit('summary', e.target.value)}
                    />
                  </label>
                  <details className="details-block">
                    <summary>{t('answer')}</summary>
                    {flow(editing.answers, editing.mode)
                      .filter((q) => editing.answers[q.id])
                      .map((q) => (
                        <p key={q.id}>
                          {local(q.title, lang)}:{' '}
                          {displayAnswer(editing.answers[q.id], q, lang)}
                        </p>
                      ))}
                  </details>
                  <label className="field">
                    {t('history')}
                    <textarea
                      value={editing.history}
                      onChange={(e) => patchEdit('history', e.target.value)}
                    />
                  </label>
                  {queue
                    .filter(
                      (v) =>
                        v.patientId === editing.patientId &&
                        v.id !== editing.id,
                    )
                    .map((v) => (
                      <details className="details-block" key={v.id}>
                        <summary>
                          {new Date(v.date).toLocaleDateString(lang)}
                        </summary>
                        <p className="history-text">{v.summary}</p>
                      </details>
                    ))}
                  {(['notes', 'diagnosis', 'prescription'] as const).map(
                    (k) => (
                      <label className="field" key={k}>
                        {t(k)}
                        <textarea
                          rows={3}
                          value={editing[k]}
                          onChange={(e) => patchEdit(k, e.target.value)}
                        />
                      </label>
                    ),
                  )}
                  {editing.mode === 'ayush' &&
                    assessmentFields.map((f) => (
                      <label className="field" key={f[1]}>
                        {lang === 'hi' ? f[0] : f[1]}
                        <input
                          value={editing.assessment[f[1]] || ''}
                          onChange={(e) => {
                            setEditing({
                              ...editing,
                              assessment: {
                                ...editing.assessment,
                                [f[1]]: e.target.value,
                              },
                            });
                            setChecked(false);
                          }}
                        />
                      </label>
                    ))}
                  <label className="consent-row spaced">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => setChecked(!!v)}
                    />
                    {t('checked')}
                  </label>
                  <button
                    className="primary spaced"
                    disabled={!checked || !editing.summary.trim()}
                    onClick={() => {
                      const v = {
                        ...editing,
                        status: 'reviewed' as const,
                        reviewer: doctorId,
                      };
                      if (persist(visits.map((x) => (x.id === v.id ? v : x)))) {
                        setEditing(null);
                        go('doctor');
                      }
                    }}
                  >
                    <Check />
                    {t('save')}
                  </button>
                  <button
                    className="secondary spaced"
                    onClick={() => {
                      const v = {
                        ...editing,
                        status: 'draft' as const,
                        reviewer: '',
                      };
                      if (persist(visits.map((x) => (x.id === v.id ? v : x))))
                        go('doctor');
                    }}
                  >
                    {t('summary')} · {t('save')}
                  </button>
                </>
              )}
            </div>
            {role && (
              <nav className="bottom-nav">
                <button onClick={dashboard}>
                  <Home />
                  {t(role === 'doctor' ? 'doctorDashboard' : 'dashboard')}
                </button>
                {role === 'patient' && (
                  <button onClick={() => go('records')}>
                    <FileHeart />
                    {t('records')}
                  </button>
                )}
                <button
                  onClick={() => {
                    setRole(null);
                    setDoctorSession(false);
                    setEditing(null);
                    setLookup('');
                    setPatientId('');
                    setVoice(false);
                    setAuto(false);
                    go('role');
                  }}
                >
                  <LogOut />
                  {t('logout')}
                </button>
              </nav>
            )}
          </div>
          <div className="home-indicator" />
        </div>
      </div>
      <AlertDialog open={deleting} onOpenChange={setDeleting}>
        <AlertDialogContent className="delete-dialog">
          <AlertDialogTitle>{t('delete')}</AlertDialogTitle>
          <AlertDialogDescription>{t('deleteConfirm')}</AlertDialogDescription>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (persist(visits.filter((v) => v.id !== activeId))) {
                setActiveId('');
                go('records');
              }
            }}
          >
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
