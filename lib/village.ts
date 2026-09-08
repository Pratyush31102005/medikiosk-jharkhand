import type { Answers } from './intake';
export type Lang = 'hi' | 'en' | 'bn' | 'or';
export type Words = [string, string, string, string];
export const languages: Lang[] = ['hi', 'en', 'bn', 'or'];
export const languageNames = ['हिन्दी', 'English', 'বাংলা', 'ଓଡ଼ିଆ'];
export const local = (w: Words, l: Lang) => w[languages.indexOf(l)];
export const words = {
  welcome: ['नमस्ते।', 'Welcome.', 'নমস্কার।', 'ନମସ୍କାର।'],
  choose: [
    'अपनी भाषा चुनें',
    'Choose your language',
    'আপনার ভাষা বেছে নিন',
    'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ',
  ],
  role: ['आप कौन हैं?', 'Who are you?', 'আপনি কে?', 'ଆପଣ କିଏ?'],
  patient: ['मरीज़', 'Patient', 'রোগী', 'ରୋଗୀ'],
  doctor: ['डॉक्टर', 'Doctor', 'ডাক্তার', 'ଡାକ୍ତର'],
  dashboard: ['मेरा dashboard', 'My dashboard', 'আমার ড্যাশবোর্ড', 'ମୋ ଡ୍ୟାସବୋର୍ଡ'],
  doctorDashboard: [
    'डॉक्टर dashboard',
    'Doctor dashboard',
    'ডাক্তারের ড্যাশবোর্ড',
    'ଡାକ୍ତରଙ୍କ ଡ୍ୟାସବୋର୍ଡ',
  ],
  newVisit: [
    'नई परेशानी बताएं',
    'Start a new visit',
    'নতুন সমস্যা জানান',
    'ନୂଆ ସମସ୍ୟା କୁହନ୍ତୁ',
  ],
  records: ['मेरे रिकॉर्ड', 'My records', 'আমার রেকর্ড', 'ମୋ ରେକର୍ଡ'],
  back: ['पीछे', 'Back', 'পিছনে', 'ପଛକୁ'],
  next: [
    'सही है, आगे बढ़ें',
    'Confirm and continue',
    'ঠিক আছে, এগিয়ে যান',
    'ଠିକ୍ ଅଛି, ଆଗକୁ ଯାଆନ୍ତୁ',
  ],
  listen: ['सवाल सुनें', 'Hear the question', 'প্রশ্ন শুনুন', 'ପ୍ରଶ୍ନ ଶୁଣନ୍ତୁ'],
  talk: ['दबाएं और बोलें', 'Tap and speak', 'চাপ দিন ও বলুন', 'ଦବାନ୍ତୁ ଓ କୁହନ୍ତୁ'],
  listening: [
    'सुन रहे हैं… रोकने के लिए दबाएं',
    'Listening… tap to stop',
    'শুনছি… থামাতে চাপ দিন',
    'ଶୁଣୁଛି… ବନ୍ଦ କରିବାକୁ ଦବାନ୍ତୁ',
  ],
  retry: ['फिर से बोलें', 'Speak again', 'আবার বলুন', 'ପୁଣି କୁହନ୍ତୁ'],
  answer: ['आपका जवाब', 'Your answer', 'আপনার উত্তর', 'ଆପଣଙ୍କ ଉତ୍ତର'],
  check: [
    'आपने यह बताया। सही है?',
    'Is this what you said?',
    'আপনি কি এটাই বলেছেন?',
    'ଆପଣ ଏହା କହିଥିଲେ କି?',
  ],
  name: [
    'आपका नाम क्या है?',
    'What is your name?',
    'আপনার নাম কী?',
    'ଆପଣଙ୍କ ନାମ କଣ?',
  ],
  age: [
    'आपकी उम्र कितनी है?',
    'How old are you?',
    'আপনার বয়স কত?',
    'ଆପଣଙ୍କ ବୟସ କେତେ?',
  ],
  address: [
    'आपका गाँव या पता क्या है?',
    'What is your village or address?',
    'আপনার গ্রাম বা ঠিকানা কী?',
    'ଆପଣଙ୍କ ଗାଁ ବା ଠିକଣା କଣ?',
  ],
  optional: [
    'नहीं बताना / आगे बढ़ें',
    'Skip this question',
    'এই প্রশ্ন বাদ দিন',
    'ଏହି ପ୍ରଶ୍ନ ଛାଡ଼ନ୍ତୁ',
  ],
  permission: [
    'शुरू करने से पहले',
    'Before we begin',
    'শুরু করার আগে',
    'ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ',
  ],
  demo: [
    'डेमो है। काल्पनिक जानकारी दें। रिकॉर्ड इसी ब्राउज़र में रहते हैं; दूसरे फ़ोन में नहीं दिखेंगे।',
    'Demo only. Use sample details. Records stay in this browser and do not sync to other devices.',
    'এটি ডেমো। কাল্পনিক তথ্য দিন। রেকর্ড এই ব্রাউজারেই থাকে, অন্য ফোনে দেখা যাবে না।',
    'ଏହା ଡେମୋ। କାଳ୍ପନିକ ତଥ୍ୟ ଦିଅନ୍ତୁ। ରେକର୍ଡ ଏହି ବ୍ରାଉଜରରେ ରହେ, ଅନ୍ୟ ଫୋନରେ ଦେଖାଯିବ ନାହିଁ।',
  ],
  agree: [
    'मैं डेमो के लिए सहमत हूँ',
    'I agree to use this demo',
    'আমি এই ডেমো ব্যবহারে সম্মত',
    'ମୁଁ ଏହି ଡେମୋ ବ୍ୟବହାର ପାଇଁ ସମ୍ମତ',
  ],
  voicePermission: [
    'बोलकर भरें। ब्राउज़र सेवा आवाज़ ऑनलाइन भेज सकती है। यह ऐप रिकॉर्डिंग सेव नहीं करता।',
    'Use voice. Your browser provider may process audio online. This app does not save recordings.',
    'কথা বলে পূরণ করুন। ব্রাউজার পরিষেবা অনলাইনে অডিও পাঠাতে পারে। এই অ্যাপ রেকর্ডিং রাখে না।',
    'କହିକରି ପୂରଣ କରନ୍ତୁ। ବ୍ରାଉଜର ସେବା ଅଡିଓ ଅନଲାଇନ ପଠାଇପାରେ। ଏହି ଆପ୍ ରେକର୍ଡିଂ ରଖେ ନାହିଁ।',
  ],
  handsfree: [
    'अपने आप सवाल सुनाएं और जवाब सुनें',
    'Read questions and listen automatically',
    'নিজে থেকে প্রশ্ন পড়ুন ও উত্তর শুনুন',
    'ଆପେ ପ୍ରଶ୍ନ ପଢ଼ନ୍ତୁ ଓ ଉତ୍ତର ଶୁଣନ୍ତୁ',
  ],
  voiceHelp: [
    'हर जवाब के बाद “सही है” बोलें या हरा बटन दबाएं। बदलने के लिए नया जवाब बोलें।',
    'After each answer, say “confirm” or tap the green button. Speak a new answer to change it.',
    'প্রতিটি উত্তরের পরে “ঠিক আছে” বলুন বা সবুজ বোতাম চাপুন। বদলাতে নতুন উত্তর বলুন।',
    'ପ୍ରତି ଉତ୍ତର ପରେ “ଠିକ୍ ଅଛି” କୁହନ୍ତୁ ବା ସବୁଜ ବଟନ ଦବାନ୍ତୁ। ବଦଳାଇବାକୁ ନୂଆ ଉତ୍ତର କୁହନ୍ତୁ।',
  ],
  unavailable: [
    'यहाँ माइक नहीं चल रहा। Chrome या Edge में खोलें, या किसी की मदद से बटन दबाएं।',
    'Voice is unavailable here. Try Chrome or Edge, or ask someone to help with the buttons.',
    'এখানে মাইক চলছে না। Chrome বা Edge-এ খুলুন, অথবা বোতাম চাপতে কারও সাহায্য নিন।',
    'ଏଠାରେ ମାଇକ୍ କାମ କରୁନାହିଁ। Chrome ବା Edge ରେ ଖୋଲନ୍ତୁ, କିମ୍ବା ବଟନ ଦବାଇବାକୁ ସାହାଯ୍ୟ ନିଅନ୍ତୁ।',
  ],
  noAudio: [
    'इस भाषा की आवाज़ उपलब्ध नहीं है। माइक से बोल सकते हैं या मदद लें।',
    'A reading voice for this language is unavailable. You can use the microphone or ask for help.',
    'এই ভাষায় পড়ার কণ্ঠ নেই। মাইকে বলুন বা সাহায্য নিন।',
    'ଏହି ଭାଷାର ପଢ଼ିବା ସ୍ୱର ନାହିଁ। ମାଇକରେ କୁହନ୍ତୁ ବା ସାହାଯ୍ୟ ନିଅନ୍ତୁ।',
  ],
  notHeard: [
    'आवाज़ नहीं समझ आई। माइक की अनुमति जांचें और फिर बोलें।',
    'Could not hear you. Check microphone permission and try again.',
    'শোনা যায়নি। মাইকের অনুমতি দেখুন ও আবার বলুন।',
    'ଶୁଣିପାରିଲି ନାହିଁ। ମାଇକ୍ ଅନୁମତି ଦେଖନ୍ତୁ ଓ ପୁଣି କୁହନ୍ତୁ।',
  ],
  invalidAge: [
    'उम्र 1 से 120 साल के बीच बताएं, जैसे “बयालीस”।',
    'Enter an age from 1 to 120, for example “forty two”.',
    '১ থেকে ১২০ বছরের মধ্যে বয়স বলুন, যেমন “বিয়াল্লিশ”।',
    '୧ ରୁ ୧୨୦ ବର୍ଷ ମଧ୍ୟରେ ବୟସ କୁହନ୍ତୁ, ଯେପରି “ବୟାଳିଶ”।',
  ],
  patientId: ['मरीज़ ID', 'Patient ID', 'রোগীর ID', 'ରୋଗୀ ID'],
  doctorId: ['डॉक्टर ID', 'Doctor ID', 'ডাক্তারের ID', 'ଡାକ୍ତର ID'],
  open: ['खोलें', 'Open', 'খুলুন', 'ଖୋଲନ୍ତୁ'],
  notFound: [
    'इस ID का रिकॉर्ड यहाँ नहीं मिला। ID जांचें।',
    'No record for this ID in this browser. Check the ID.',
    'এই ব্রাউজারে এই ID-এর রেকর্ড নেই। ID দেখুন।',
    'ଏହି ବ୍ରାଉଜରରେ ଏହି ID ର ରେକର୍ଡ ନାହିଁ। ID ଯାଞ୍ଚ କରନ୍ତୁ।',
  ],
  demoIds: [
    'डेमो डॉक्टर ID: DOC-101 या DOC-102। यह सुरक्षित लॉगिन नहीं है।',
    'Demo doctor IDs: DOC-101 or DOC-102. This is not a secure login.',
    'ডেমো ডাক্তার ID: DOC-101 বা DOC-102। এটি নিরাপদ লগইন নয়।',
    'ଡେମୋ ଡାକ୍ତର ID: DOC-101 ବା DOC-102। ଏହା ସୁରକ୍ଷିତ ଲଗଇନ ନୁହେଁ।',
  ],
  selectDoctor: [
    'किस डॉक्टर को दिखाना है?',
    'Which doctor will you see?',
    'কোন ডাক্তার দেখাবেন?',
    'କେଉଁ ଡାକ୍ତରଙ୍କୁ ଦେଖାଇବେ?',
  ],
  clinic: ['विभाग', 'Clinic', 'বিভাগ', 'ବିଭାଗ'],
  general: ['सामान्य ओपीडी', 'General OPD', 'সাধারণ বহির্বিভাগ', 'ସାଧାରଣ ବହିର୍ବିଭାଗ'],
  ayush: ['आयुर्वेद', 'Ayurveda', 'আয়ুর্বেদ', 'ଆୟୁର୍ବେଦ'],
  review: [
    'अपनी जानकारी सुनें और जांचें',
    'Review your information',
    'আপনার তথ্য শুনুন ও দেখুন',
    'ଆପଣଙ୍କ ତଥ୍ୟ ଶୁଣନ୍ତୁ ଓ ଦେଖନ୍ତୁ',
  ],
  edit: ['बदलें', 'Edit', 'বদলান', 'ବଦଳାନ୍ତୁ'],
  save: ['रिकॉर्ड सेव करें', 'Save record', 'রেকর্ড রাখুন', 'ରେକର୍ଡ ରଖନ୍ତୁ'],
  saved: [
    'आपका रिकॉर्ड सेव हो गया',
    'Your record is saved',
    'আপনার রেকর্ড রাখা হয়েছে',
    'ଆପଣଙ୍କ ରେକର୍ଡ ରଖାଗଲା',
  ],
  empty: [
    'अभी कोई रिकॉर्ड नहीं है',
    'No records yet',
    'এখনও কোনো রেকর্ড নেই',
    'ଏପର୍ଯ୍ୟନ୍ତ ରେକର୍ଡ ନାହିଁ',
  ],
  waiting: ['जांच बाकी', 'Waiting for review', 'পর্যালোচনা বাকি', 'ସମୀକ୍ଷା ବାକି'],
  done: ['जांच हुई', 'Reviewed', 'পর্যালোচিত', 'ସମୀକ୍ଷିତ'],
  all: ['सभी', 'All', 'সব', 'ସବୁ'],
  logout: ['भूमिका बदलें', 'Switch role', 'ভূমিকা বদলান', 'ଭୂମିକା ବଦଳାନ୍ତୁ'],
  notes: [
    'डॉक्टर की टिप्पणी / जांच',
    'Clinician notes / examination',
    'ডাক্তারের মন্তব্য / পরীক্ষা',
    'ଡାକ୍ତରଙ୍କ ମତାମତ / ପରୀକ୍ଷା',
  ],
  diagnosis: [
    'डॉक्टर द्वारा निदान',
    'Clinician diagnosis',
    'ডাক্তারের রোগ নির্ণয়',
    'ଡାକ୍ତରଙ୍କ ରୋଗ ନିର୍ଣ୍ଣୟ',
  ],
  prescription: [
    'दवाई / सलाह',
    'Prescription / advice',
    'ওষুধ / পরামর্শ',
    'ଔଷଧ / ପରାମର୍ଶ',
  ],
  checked: [
    'मैंने जानकारी जांच ली है',
    'I have reviewed this information',
    'আমি তথ্য যাচাই করেছি',
    'ମୁଁ ତଥ୍ୟ ଯାଞ୍ଚ କରିଛି',
  ],
  download: [
    'रिकॉर्ड डाउनलोड करें',
    'Download record',
    'রেকর্ড ডাউনলোড করুন',
    'ରେକର୍ଡ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
  ],
  urgent: [
    'तुरंत पास के स्वास्थ्यकर्मी को बताएं। यह ऐप किसी को सूचना नहीं भेजता।',
    'Tell a nearby healthcare worker immediately. This app does not send an alert.',
    'এখনই কাছের স্বাস্থ্যকর্মীকে জানান। এই অ্যাপ কাউকে সতর্কবার্তা পাঠায় না।',
    'ତୁରନ୍ତ ପାଖର ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କୁ କୁହନ୍ତୁ। ଏହି ଆପ୍ କାହାକୁ ସୂଚନା ପଠାଏ ନାହିଁ।',
  ],
  storageError: [
    'रिकॉर्ड सेव नहीं हुआ। ब्राउज़र स्टोरेज जांचें और फिर कोशिश करें।',
    'Record could not be saved. Check browser storage and try again.',
    'রেকর্ড রাখা যায়নি। ব্রাউজার স্টোরেজ দেখুন ও আবার চেষ্টা করুন।',
    'ରେକର୍ଡ ରଖାଯାଇନି। ବ୍ରାଉଜର ଷ୍ଟୋରେଜ ଦେଖନ୍ତୁ ଓ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
  ],
  history: ['पुरानी विज़िट', 'Previous visits', 'আগের সাক্ষাৎ', 'ପୂର୍ବ ସାକ୍ଷାତ'],
  summary: ['जानकारी का मसौदा', 'Draft history', 'তথ্যের খসড়া', 'ତଥ୍ୟର ଖସଡ଼ା'],
  search: [
    'मरीज़ ID से खोजें',
    'Find by patient ID',
    'রোগীর ID দিয়ে খুঁজুন',
    'ରୋଗୀ ID ଦ୍ୱାରା ଖୋଜନ୍ତୁ',
  ],
  sample: [
    'डेमो मरीज़ जोड़ें',
    'Add sample patient',
    'নমুনা রোগী যোগ করুন',
    'ନମୁନା ରୋଗୀ ଯୋଡ଼ନ୍ତୁ',
  ],
  delete: [
    'यह रिकॉर्ड मिटाएं',
    'Delete this record',
    'এই রেকর্ড মুছুন',
    'ଏହି ରେକର୍ଡ ଲିଭାନ୍ତୁ',
  ],
  cancel: ['रद्द करें', 'Cancel', 'বাতিল', 'ବାତିଲ'],
  deleteConfirm: [
    'यह रिकॉर्ड इसी ब्राउज़र से हमेशा के लिए मिटेगा।',
    'This record will be permanently removed from this browser.',
    'এই ব্রাউজার থেকে রেকর্ডটি স্থায়ীভাবে মুছে যাবে।',
    'ଏହି ବ୍ରାଉଜରରୁ ରେକର୍ଡ ସବୁଦିନ ପାଇଁ ଲିଭିଯିବ।',
  ],
} satisfies Record<string, Words>;
export type Q = { id: string; title: Words; choices?: Words[] };
const yes: Words = ['हाँ', 'Yes', 'হ্যাঁ', 'ହଁ'],
  no: Words = ['नहीं', 'No', 'না', 'ନା'],
  unsure: Words = ['पता नहीं', 'Not sure', 'জানি না', 'ଜାଣିନି'];
const q = (id: string, title: Words, choices?: Words[]): Q => ({
  id,
  title,
  choices,
});
export const common = {
  complaint: q(
    'complaint',
    [
      'क्या परेशानी है? अपने शब्दों में बताएं।',
      'What is troubling you? Tell us in your words.',
      'কী সমস্যা হচ্ছে? নিজের ভাষায় বলুন।',
      'କଣ ସମସ୍ୟା ହେଉଛି? ନିଜ ଭାଷାରେ କୁହନ୍ତୁ।',
    ],
    [
      ['पेट दर्द', 'Stomach pain', 'পেট ব্যথা', 'ପେଟ ବଥା'],
      ['खांसी', 'Cough', 'কাশি', 'କାଶ'],
      ['बुखार', 'Fever', 'জ্বর', 'ଜ୍ୱର'],
      ['सिर दर्द', 'Headache', 'মাথাব্যথা', 'ମୁଣ୍ଡବଥା'],
      ['जोड़ों में दर्द', 'Joint pain', 'জয়েন্টে ব্যথা', 'ଗଣ୍ଠି ବଥା'],
    ],
  ),
  safety: q(
    'safety',
    [
      'क्या अभी सांस लेने में बहुत तकलीफ या सीने में नया तेज़ दर्द है?',
      'Do you have severe trouble breathing or new severe chest pain now?',
      'এখন কি শ্বাস নিতে খুব কষ্ট বা বুকে নতুন তীব্র ব্যথা হচ্ছে?',
      'ଏବେ ଶ୍ୱାସ ନେବାରେ ବହୁତ କଷ୍ଟ ବା ଛାତିରେ ନୂଆ ତୀବ୍ର ବଥା ହେଉଛି କି?',
    ],
    [yes, no, unsure],
  ),
  onset: q(
    'onset',
    ['यह कब से है?', 'When did this start?', 'কবে থেকে হচ্ছে?', 'କେବେଠାରୁ ହେଉଛି?'],
    [
      ['आज से', 'Today', 'আজ থেকে', 'ଆଜିଠାରୁ'],
      ['दो–तीन दिन से', 'Two or three days', 'দুই–তিন দিন', 'ଦୁଇ–ତିନି ଦିନ'],
      ['एक हफ्ते से ज़्यादा', 'More than a week', 'এক সপ্তাহের বেশি', 'ଏକ ସପ୍ତାହରୁ ଅଧିକ'],
    ],
  ),
  severity: q(
    'severity',
    [
      'इस परेशानी से रोज़ के काम कर पा रहे हैं?',
      'Can you do your usual tasks with this problem?',
      'এই সমস্যায় রোজকার কাজ করতে পারছেন?',
      'ଏହି ସମସ୍ୟାରେ ଦୈନିକ କାମ କରିପାରୁଛନ୍ତି କି?',
    ],
    [
      ['हाँ, कर पा रहा हूँ', 'Yes, I can', 'হ্যাঁ, পারছি', 'ହଁ, ପାରୁଛି'],
      ['थोड़ी मुश्किल है', 'Some difficulty', 'কিছুটা অসুবিধা', 'କିଛି କଷ୍ଟ ହେଉଛି'],
      ['नहीं कर पा रहा हूँ', 'I cannot', 'পারছি না', 'ପାରୁନାହିଁ'],
    ],
  ),
  associated: q(
    'associated',
    [
      'साथ में और क्या परेशानी है?',
      'What other symptoms do you have?',
      'সঙ্গে আর কী সমস্যা হচ্ছে?',
      'ସାଙ୍ଗରେ ଆଉ କଣ ସମସ୍ୟା ହେଉଛି?',
    ],
    [['और कुछ नहीं', 'Nothing else', 'আর কিছু নেই', 'ଆଉ କିଛି ନାହିଁ']],
  ),
  medicines: q(
    'medicines',
    [
      'इसके लिए कोई दवाई ली है?',
      'Have you taken medicine for this?',
      'এর জন্য ওষুধ খেয়েছেন?',
      'ଏଥିପାଇଁ ଔଷଧ ନେଇଛନ୍ତି କି?',
    ],
    [no, unsure],
  ),
  allergies: q(
    'allergies',
    [
      'किसी दवाई से एलर्जी है?',
      'Any medicine allergies?',
      'কোনো ওষুধে অ্যালার্জি আছে?',
      'କୌଣସି ଔଷଧରେ ଆଲର୍ଜି ଅଛି କି?',
    ],
    [no, unsure],
  ),
  history: q(
    'history',
    [
      'पहले से कोई बीमारी या ऑपरेशन?',
      'Any previous illness or operation?',
      'আগের কোনো রোগ বা অস্ত্রোপচার আছে?',
      'ଆଗରୁ କୌଣସି ରୋଗ ବା ଅପରେସନ ହୋଇଛି କି?',
    ],
    [no, unsure],
  ),
};
const branches = {
  stomach: [
    q(
      'stomach_site',
      [
        'पेट में किस जगह दर्द है?',
        'Where in your abdomen does it hurt?',
        'পেটের কোন জায়গায় ব্যথা?',
        'ପେଟର କେଉଁଠି ବଥା?',
      ],
      [
        ['ऊपर', 'Upper abdomen', 'উপরের দিকে', 'ଉପର ଭାଗ'],
        ['नीचे', 'Lower abdomen', 'নিচের দিকে', 'ତଳ ଭାଗ'],
        ['दाईं तरफ', 'Right side', 'ডান দিকে', 'ଡାହାଣ ପଟେ'],
        ['बाईं तरफ', 'Left side', 'বাঁ দিকে', 'ବାମ ପଟେ'],
        ['पूरे पेट में', 'All over the abdomen', 'পুরো পেটে', 'ପୂରା ପେଟରେ'],
      ],
    ),
    q(
      'stomach_character',
      [
        'पेट का दर्द कैसा है?',
        'What does the stomach pain feel like?',
        'পেটের ব্যথা কেমন?',
        'ପେଟ ବଥା କିପରି ଲାଗୁଛି?',
      ],
      [
        ['ऐंठन', 'Cramping', 'মোচড়ানো', 'ମୋଡ଼ିବା ଭଳି'],
        ['जलन', 'Burning', 'জ্বালা', 'ଜଳାପୋଡ଼ା'],
        ['चुभन', 'Sharp pain', 'তীক্ষ্ণ ব্যথা', 'ତୀବ୍ର ବଥା'],
      ],
    ),
    q(
      'stomach_meals',
      [
        'खाने के बाद पेट का दर्द बदलता है?',
        'Does eating change the stomach pain?',
        'খাওয়ার পরে পেটের ব্যথা বদলায়?',
        'ଖାଇବା ପରେ ପେଟ ବଥା ବଦଳୁଛି କି?',
      ],
      [
        ['बढ़ता है', 'Worse after eating', 'বাড়ে', 'ବଢ଼ୁଛି'],
        ['कम होता है', 'Better after eating', 'কমে', 'କମୁଛି'],
        ['नहीं बदलता', 'No change', 'বদলায় না', 'ବଦଳୁନାହିଁ'],
      ],
    ),
    q(
      'vomiting',
      [
        'क्या उल्टी भी हो रही है?',
        'Are you vomiting too?',
        'বমিও হচ্ছে?',
        'ବାନ୍ତି ମଧ୍ୟ ହେଉଛି କି?',
      ],
      [yes, no],
    ),
    q(
      'bowel',
      [
        'पाखाने में कोई बदलाव है?',
        'Any change in bowel movements?',
        'পায়খানায় কোনো পরিবর্তন?',
        'ମଳତ୍ୟାଗରେ କିଛି ପରିବର୍ତ୍ତନ ଅଛି କି?',
      ],
      [
        ['दस्त', 'Diarrhea', 'পাতলা পায়খানা', 'ଝାଡ଼ା'],
        ['कब्ज़', 'Constipation', 'কোষ্ঠকাঠিন্য', 'କୋଷ୍ଠକାଠିନ୍ୟ'],
        ['नहीं', 'No', 'না', 'ନା'],
      ],
    ),
  ],
  cough: [
    q(
      'cough_type',
      [
        'खांसी सूखी है या बलगम आता है?',
        'Is the cough dry or with phlegm?',
        'শুকনো কাশি নাকি কফ ওঠে?',
        'ଶୁଖିଲା କାଶ ନା କଫ ବାହାରୁଛି?',
      ],
      [
        ['सूखी खांसी', 'Dry cough', 'শুকনো কাশি', 'ଶୁଖିଲା କାଶ'],
        ['बलगम आता है', 'With phlegm', 'কফ ওঠে', 'କଫ ବାହାରୁଛି'],
      ],
    ),
    q(
      'cough_time',
      [
        'खांसी कब ज़्यादा होती है?',
        'When is the cough worse?',
        'কাশি কখন বেশি হয়?',
        'କାଶ କେତେବେଳେ ଅଧିକ ହୁଏ?',
      ],
      [
        ['रात में', 'At night', 'রাতে', 'ରାତିରେ'],
        ['दिन में', 'During the day', 'দিনে', 'ଦିନରେ'],
        ['हर समय', 'All the time', 'সব সময়', 'ସବୁବେଳେ'],
      ],
    ),
    q(
      'cough_fever',
      [
        'खांसी के साथ बुखार भी है?',
        'Do you also have a fever with the cough?',
        'কাশির সঙ্গে জ্বরও আছে?',
        'କାଶ ସହ ଜ୍ୱର ମଧ୍ୟ ଅଛି କି?',
      ],
      [yes, no, unsure],
    ),
  ],
  fever: [
    q(
      'fever_temp',
      [
        'तापमान नापा है? कितना था?',
        'Did you measure your temperature? What was it?',
        'তাপমাত্রা মেপেছেন? কত ছিল?',
        'ତାପମାତ୍ରା ମାପିଛନ୍ତି କି? କେତେ ଥିଲା?',
      ],
      [unsure],
    ),
    q(
      'fever_pattern',
      [
        'बुखार लगातार है या आता-जाता है?',
        'Is the fever constant or does it come and go?',
        'জ্বর সব সময় নাকি আসে যায়?',
        'ଜ୍ୱର ସବୁବେଳେ ନା ଆସୁଛି ଯାଉଛି?',
      ],
      [
        ['लगातार', 'Constant', 'সব সময়', 'ସବୁବେଳେ'],
        ['आता-जाता है', 'Comes and goes', 'আসে যায়', 'ଆସୁଛି ଯାଉଛି'],
      ],
    ),
    q(
      'fever_chills',
      [
        'बुखार के साथ ठंड या कंपकंपी आती है?',
        'Do you have chills with the fever?',
        'জ্বরের সঙ্গে কাঁপুনি হয়?',
        'ଜ୍ୱର ସହ ଥଣ୍ଡା ବା କମ୍ପ ହେଉଛି କି?',
      ],
      [yes, no],
    ),
  ],
  head: [
    q('head_site', [
      'सिर में कहाँ दर्द है?',
      'Where does your head hurt?',
      'মাথার কোথায় ব্যথা?',
      'ମୁଣ୍ଡର କେଉଁଠି ବଥା?',
    ]),
    q(
      'head_start',
      [
        'सिर दर्द अचानक शुरू हुआ या धीरे-धीरे?',
        'Did the headache start suddenly or gradually?',
        'মাথাব্যথা হঠাৎ নাকি ধীরে শুরু হয়েছে?',
        'ମୁଣ୍ଡବଥା ହଠାତ୍ ନା ଧୀରେ ଆରମ୍ଭ ହେଲା?',
      ],
      [
        ['अचानक', 'Suddenly', 'হঠাৎ', 'ହଠାତ୍'],
        ['धीरे-धीरे', 'Gradually', 'ধীরে ধীরে', 'ଧୀରେ ଧୀରେ'],
      ],
    ),
    q(
      'head_light',
      [
        'रोशनी या आवाज़ से सिर दर्द बढ़ता है?',
        'Does light or sound worsen the headache?',
        'আলো বা শব্দে মাথাব্যথা বাড়ে?',
        'ଆଲୋକ ବା ଶବ୍ଦରେ ମୁଣ୍ଡବଥା ବଢ଼େ କି?',
      ],
      [yes, no],
    ),
  ],
  joint: [
    q('joint_site', [
      'किस जोड़ या अंग में दर्द है?',
      'Which joint or limb hurts?',
      'কোন জয়েন্ট বা অঙ্গে ব্যথা?',
      'କେଉଁ ଗଣ୍ଠି ବା ଅଙ୍ଗରେ ବଥା?',
    ]),
    q(
      'joint_swelling',
      [
        'वहाँ सूजन भी है?',
        'Is there swelling there?',
        'সেখানে ফোলাও আছে?',
        'ସେଠାରେ ଫୁଲା ମଧ୍ୟ ଅଛି କି?',
      ],
      [yes, no],
    ),
    q(
      'joint_movement',
      [
        'चलने या हिलाने से दर्द बढ़ता है?',
        'Does walking or movement worsen the pain?',
        'হাঁটলে বা নড়ালে ব্যথা বাড়ে?',
        'ଚାଲିଲେ ବା ହଲାଇଲେ ବଥା ବଢ଼େ କି?',
      ],
      [yes, no],
    ),
  ],
  other: [
    q('site', [
      'यह परेशानी शरीर में कहाँ है?',
      'Where in your body is the problem?',
      'শরীরের কোথায় সমস্যা?',
      'ଶରୀରର କେଉଁଠି ସମସ୍ୟା?',
    ]),
    q('character', [
      'यह कैसा लगता है? थोड़ा और बताएं।',
      'What does it feel like? Tell us more.',
      'কেমন লাগে? একটু বেশি বলুন।',
      'କିପରି ଲାଗୁଛି? ଆଉ ଟିକେ କୁହନ୍ତୁ।',
    ]),
  ],
};
export function symptomKinds(s: string): Array<keyof typeof branches> {
  const checks: [keyof typeof branches, RegExp][] = [
    ['stomach', /stomach|abdomen|belly|पेट|পেট|ପେଟ/i],
    ['cough', /cough|खांसी|खाँसी|কাশি|କାଶ/i],
    ['fever', /fever|बुखार|জ্বর|ଜ୍ୱର/i],
    ['head', /headache|head pain|सिर|মাথা|ମୁଣ୍ଡ/i],
    ['joint', /joint|knee|leg pain|जोड़|घुटन|पैर|হাঁটু|জয়েন্ট|ଗଣ୍ଠି|ଆଣ୍ଠୁ/i],
  ];
  const found = checks.filter(([, r]) => r.test(s)).map(([k]) => k);
  return found.length ? found : ['other'];
}
export const isYes = (s = '') =>
  /^(yes|हाँ|हां|হ্যাঁ|ହଁ)(\b|\s|[।.!]|$)/iu.test(s.trim());
export function flow(a: Answers, mode: string): Q[] {
  const kinds = symptomKinds(a.complaint || '');
  const result = [common.complaint, common.safety, common.onset];
  for (const kind of kinds) {
    for (const item of branches[kind]) {
      result.push(item);
      if (item.id === 'vomiting' && isYes(a.vomiting))
        result.push(
          q('vomiting_count', [
            'आज कितनी बार उल्टी हुई? पानी पीकर रुकता है?',
            'How many times have you vomited today? Can you keep water down?',
            'আজ কতবার বমি হয়েছে? জল পেটে থাকছে?',
            'ଆଜି କେତେଥର ବାନ୍ତି ହୋଇଛି? ପାଣି ପିଇଲେ ରହୁଛି କି?',
          ]),
        );
      if (
        item.id === 'cough_type' &&
        /phlegm|बलगम|কফ|କଫ/i.test(a.cough_type || '')
      )
        result.push(
          q('phlegm', [
            'बलगम कैसा दिखता है?',
            'What does the phlegm look like?',
            'কফ দেখতে কেমন?',
            'କଫ କିପରି ଦେଖାଯାଉଛି?',
          ]),
        );
    }
  }
  if (
    kinds.includes('cough') &&
    !kinds.includes('fever') &&
    isYes(a.cough_fever)
  )
    result.push(...branches.fever);
  result.push(common.associated);
  for (const kind of symptomKinds(a.associated || '')) {
    if (kind !== 'other' && !kinds.includes(kind))
      result.push(...branches[kind]);
  }
  result.push(
    common.severity,
    common.medicines,
    common.allergies,
    common.history,
  );
  if (mode === 'ayush')
    result.push(
      q('food', [
        'भूख और पाचन कैसा है?',
        'How are your appetite and digestion?',
        'খিদে ও হজম কেমন?',
        'ଭୋକ ଓ ହଜମ କିପରି?',
      ]),
      q('routine', [
        'नींद और रोज़ का काम कैसा है?',
        'How are your sleep and daily routine?',
        'ঘুম ও দৈনন্দিন কাজ কেমন?',
        'ନିଦ ଓ ଦୈନିକ କାମ କିପରି?',
      ]),
    );
  const unique = result.filter(
    (v, i, all) => all.findIndex((x) => x.id === v.id) === i,
  );
  if (
    unique.some((q) => q.id === 'vomiting') &&
    isYes(a.vomiting) &&
    !unique.some((q) => q.id === 'vomiting_count')
  )
    unique.splice(
      unique.findIndex((q) => q.id === 'vomiting') + 1,
      0,
      q('vomiting_count', [
        'आज कितनी बार उल्टी हुई? पानी पीकर रुकता है?',
        'How many times have you vomited today? Can you keep water down?',
        'আজ কতবার বমি হয়েছে? জল পেটে থাকছে?',
        'ଆଜି କେତେଥର ବାନ୍ତି ହୋଇଛି? ପାଣି ପିଇଲେ ରହୁଛି କି?',
      ]),
    );
  if (
    unique.some((q) => q.id === 'bowel') &&
    /diarrhea|दस्त|পাতলা|ଝାଡ଼ା/i.test(a.bowel || '')
  )
    unique.splice(
      unique.findIndex((q) => q.id === 'bowel') + 1,
      0,
      q('bowel_count', [
        'आज कितनी बार पतला पाखाना हुआ?',
        'How many loose stools have you had today?',
        'আজ কতবার পাতলা পায়খানা হয়েছে?',
        'ଆଜି କେତେଥର ପତଳା ଝାଡ଼ା ହୋଇଛି?',
      ]),
    );
  if (
    unique.some((q) => q.id === 'cough_type') &&
    /phlegm|बलगम|কফ|କଫ/i.test(a.cough_type || '') &&
    !unique.some((q) => q.id === 'phlegm')
  )
    unique.splice(
      unique.findIndex((q) => q.id === 'cough_type') + 1,
      0,
      q('phlegm', [
        'बलगम कैसा दिखता है?',
        'What does the phlegm look like?',
        'কফ দেখতে কেমন?',
        'କଫ କିପରି ଦେଖାଯାଉଛି?',
      ]),
    );
  return unique;
}
export function cleanAnswers(a: Answers, mode: string): Answers {
  let next = { ...a };
  for (let i = 0; i < 4; i++) {
    const ids = new Set(flow(next, mode).map((q) => q.id));
    next = Object.fromEntries(
      Object.entries(next).filter(([id]) => ids.has(id)),
    );
  }
  return next;
}
export function urgentAnswer(a: Answers) {
  return isYes(a.safety);
}
export function canonicalAnswer(text: string, item: Q): string {
  const s = text.trim().replace(/[।.!?]+$/, '');
  const choice = item.choices?.find((c) =>
    c.some((x) => x.toLocaleLowerCase() === s.toLocaleLowerCase()),
  );
  return choice ? choice[1] : text.trim();
}
export function displayAnswer(value: string, item: Q, l: Lang) {
  const choice = item.choices?.find((c) => c[1] === value);
  return choice ? local(choice, l) : value;
}
export function spokenAge(text: string): string {
  const normalized = text.replace(/[०-९০-৯୦-୯]/g, (c) =>
    String(
      c.charCodeAt(0) -
        (c >= '୦' && c <= '୯' ? 0xb66 : c >= '০' && c <= '৯' ? 0x9e6 : 0x966),
    ),
  );
  const digits = normalized.match(/\d+/);
  if (digits) return digits[0];
  const basic: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };
  const english = normalized
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\b(i am|my age is|years?|old|and)\b/g, '')
    .trim()
    .split(/\s+/);
  if (english.every((x) => basic[x] || x === 'hundred')) {
    let n = 0;
    for (const x of english)
      n = x === 'hundred' ? Math.max(1, n) * 100 : n + basic[x];
    return String(n);
  }
  const sets = [
    ['एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ', 'दस'],
    ['এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ'],
    ['ଏକ', 'ଦୁଇ', 'ତିନି', 'ଚାରି', 'ପାଞ୍ଚ', 'ଛଅ', 'ସାତ', 'ଆଠ', 'ନଅ', 'ଦଶ'],
  ];
  const extra: Record<string, number> = {
    बीस: 20,
    तीस: 30,
    चालीस: 40,
    बयालीस: 42,
    पचास: 50,
    साठ: 60,
    सत्तर: 70,
    अस्सी: 80,
    नब्बे: 90,
    কুড়ি: 20,
    ত্রিশ: 30,
    চল্লিশ: 40,
    বিয়াল্লিশ: 42,
    পঞ্চাশ: 50,
    ষাট: 60,
    ସତୁରି: 70,
    କୋଡ଼ିଏ: 20,
    ତିରିଶ: 30,
    ଚାଳିଶ: 40,
    ବୟାଳିଶ: 42,
    ପଚାଶ: 50,
    ଷାଠିଏ: 60,
  };
  const cleaned = text
    .replace(/[।.!?]/g, '')
    .replace(/(मेरी उम्र|मेरी आयु|साल|वर्ष|है|আমার বয়স|বছর|ମୋ ବୟସ|ବର୍ଷ)/g, '')
    .trim();
  const hindi =
    'एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उनासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सतासी अट्ठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे सौ'.split(
      ' ',
    );
  const hiIndex = hindi.indexOf(cleaned);
  if (hiIndex >= 0) return String(hiIndex + 1);
  for (const [word, n] of Object.entries(extra))
    if (cleaned === word) return String(n);
  for (const arr of sets)
    for (let i = 0; i < arr.length; i++)
      if (cleaned === arr[i]) return String(i + 1);
  return text;
}
