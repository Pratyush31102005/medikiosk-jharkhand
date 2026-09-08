export type Pair = [string,string];
export type Answers = Record<string,string>;
export type Question = {id:string; title:Pair; hint?:Pair; choices?:Pair[]};
export type Visit = {
 id:string; patientId:string; name:string; age:string; address?:string; doctorId?:string; mode:'opd'|'ayush'; language:'hi'|'en'|'bn'|'or';
 answers:Answers; date:string; consentAt:string; status:'draft'|'reviewed'; summary:string;
 history:string; notes:string; diagnosis:string; prescription:string; reviewer:string;
 assessment:Answers; urgent:boolean;
};
export const questions: Question[] = [
 {id:'complaint',title:['क्या परेशानी है?','What brings you in today?'],hint:['एक या एक से ज़्यादा परेशानी अपने शब्दों में बताएं।','Tell us your main concern in your own words.'],choices:[['बुखार','Fever'],['खांसी','Cough'],['दर्द','Pain'],['पेट की परेशानी','Stomach trouble'],['चक्कर','Dizziness']]},
 {id:'safety',title:['क्या इनमें से कुछ अभी हो रहा है?','Is any of this happening right now?'],hint:['अगर परेशानी बहुत ज़्यादा है, सीधे स्टाफ को बताएं।','If you feel very unwell, speak to clinic staff now.'],choices:[['सांस लेने में बहुत तकलीफ','Severe difficulty breathing'],['सीने में नया, तेज़ दर्द','New, severe chest pain'],['इनमें से कोई नहीं','Neither of these'],['पता नहीं','Not sure']]},
 {id:'onset',title:['यह कब से हो रहा है?','When did it start?'],choices:[['आज से','Today'],['1–3 दिन से','1–3 days ago'],['4–7 दिन से','4–7 days ago'],['एक हफ़्ते से ज़्यादा','More than a week ago']]},
 {id:'site',title:['शरीर में कहाँ परेशानी है?','Where do you feel it?'],choices:[['सिर','Head'],['गला या छाती','Throat or chest'],['पेट','Abdomen'],['हाथ या पैर','Arms or legs'],['पूरे शरीर में','All over'],['किसी एक जगह नहीं','No single place']]},
 {id:'character',title:['परेशानी कैसी लगती है?','What does it feel like?'],hint:['जैसे जलन, भारीपन, चुभन या सूखी खांसी।','For example: burning, heaviness, sharp pain, or a dry cough.']},
 {id:'radiation',title:['क्या दर्द दूसरी जगह भी जाता है?','Does the pain spread anywhere?'],choices:[['नहीं','No'],['दर्द नहीं है','There is no pain'],['हाँ, नीचे लिखें','Yes, describe below']]},
 {id:'associated',title:['साथ में और कोई परेशानी?','Any other symptoms?'],hint:['जैसे उल्टी, कमज़ोरी या भूख कम लगना।','For example: vomiting, weakness, or a change in appetite.'],choices:[['और कुछ नहीं','Nothing else'],['पता नहीं','Not sure']]},
 {id:'timing',title:['परेशानी कब होती है?','When does it happen?'],choices:[['हर समय','All the time'],['आती-जाती है','Comes and goes'],['रात में ज़्यादा','Worse at night'],['पता नहीं','Not sure']]},
 {id:'triggers',title:['किससे आराम या तकलीफ बढ़ती है?','What makes it better or worse?'],hint:['खाना, चलना, आराम करना या दवाई?','Eating, walking, resting, or taking medicine?'],choices:[['पता नहीं','Not sure']]},
 {id:'severity',title:['रोज़ के काम में कितनी तकलीफ है?','How much does it affect your day?'],choices:[['कम • काम कर सकता/सकती हूँ','Mild · I can do my usual tasks'],['कुछ काम मुश्किल हैं','Moderate · Some tasks are difficult'],['बहुत ज़्यादा • काम नहीं हो पा रहा','Severe · I cannot do my usual tasks']]},
 {id:'medicines',title:['अभी कोई दवाई ले रहे हैं?','Are you taking any medicines?'],hint:['नाम याद नहीं है तो डॉक्टर को दवाई की पर्ची दिखाएं।','If you do not know the names, show your prescription to the doctor.'],choices:[['कोई दवाई नहीं','No medicines'],['नाम याद नहीं','I do not know the names']]},
 {id:'allergies',title:['किसी दवाई से एलर्जी है?','Do you have any medicine allergies?'],choices:[['कोई एलर्जी मालूम नहीं','No known allergies'],['पता नहीं','Not sure']]},
 {id:'history',title:['पहले से कोई बीमारी या ऑपरेशन?','Any past conditions or operations?'],hint:['जैसे शुगर, बीपी, दमा या पहले का ऑपरेशन।','For example: diabetes, blood pressure, asthma, or previous surgery.'],choices:[['कोई बीमारी मालूम नहीं','No known conditions'],['पता नहीं','Not sure']]}
];
export const ayushQuestions:Question[]=[
 {id:'food',title:['खाना और भूख कैसी है?','Tell us about your food and appetite.'],hint:['आम तौर पर क्या खाते हैं? भूख और पाचन कैसा है?','What do you usually eat? How are your appetite and digestion?']},
 {id:'routine',title:['नींद और रोज़ का काम कैसा है?','How are your sleep and daily routine?'],hint:['नींद, चलना-फिरना, काम और थकान के बारे में बताएं।','Tell us about sleep, activity, work, and tiredness.']}
];
export const assessmentFields:Pair[]=[['प्रकृति','Prakriti'],['विकृति','Vikriti'],['सार','Sara'],['संहनन','Samhanana'],['प्रमाण','Pramana'],['सात्म्य','Satmya'],['सत्त्व','Satva'],['आहार शक्ति','Ahara Shakti'],['व्यायाम शक्ति','Vyayama Shakti'],['वय','Vaya']];
export function getQuestions(mode:string,answers:Answers) {
 return [...questions.filter(q=>q.id!=='radiation'|| /pain|दर्द/i.test(answers.complaint||'')),...(mode==='ayush'?ayushQuestions:[])];
}
export function needsAttention(a:Answers) {
 // Demonstration rules only. Never use absence of a match to declare a patient safe.
 return /severe difficulty breathing|new, severe chest pain|सांस लेने में बहुत तकलीफ|सीने में नया, तेज़ दर्द/i.test(a.safety||'') ||
 /can't breathe|cannot breathe|chest pain|सीने में दर्द|सांस नहीं/i.test(Object.values(a).join(' '));
}
export function makeSummary(v: Pick<Visit,'name'|'age'|'mode'|'answers'>):string {
 const a=v.answers;
 const lines=[
 'PATIENT-REPORTED HISTORY — DRAFT FOR STAFF REVIEW',
 `Patient: ${v.name}; age: ${v.age}. Visit: ${v.mode==='ayush'?'AYUSH':'General OPD'}.`,
 `Presenting concern: ${a.complaint||'Not provided'}. Onset: ${a.onset||'Not provided'}.`,
 `Site: ${a.site||'Not provided'}. Character: ${a.character||'Not provided'}.${a.radiation?' Spread: '+a.radiation+'.':''}`,
 `Pattern: ${a.timing||'Not provided'}. Better / worse: ${a.triggers||'Not provided'}.`,
 `Associated symptoms: ${a.associated||'Not provided'}. Impact on daily tasks: ${a.severity||'Not provided'}.`,
 `Medicines: ${a.medicines||'Not provided'}. Allergies: ${a.allergies||'Not provided'}.`,
 `Past conditions / operations: ${a.history||'Not provided'}.`,
 ...(v.mode==='ayush'?[`Food / appetite / digestion: ${a.food||'Not provided'}.`,`Sleep / activity / routine: ${a.routine||'Not provided'}. Dashavidha assessment requires clinician entry.`]:[]),
 `Immediate safety question: ${a.safety||'Not provided'}.`,
 needsAttention(a)?'ATTENTION: A demonstration safety rule matched. In-person staff assessment is needed.':'Urgency has not been clinically assessed.',
 'Generated from entered answers using a fixed template. No diagnosis inferred.'
 ];
 return lines.join('\n\n');
}
export function orderVisits(visits:Visit[]) {
 return [...visits].sort((a,b)=>Number(b.status==='draft')-Number(a.status==='draft') || Number(b.urgent)-Number(a.urgent) || b.date.localeCompare(a.date));
}
