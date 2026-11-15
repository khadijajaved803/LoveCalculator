/**
 * Love Horoscope Engine
 *
 * Deterministic daily / weekly / monthly love readings per zodiac sign.
 * The reading for a given period is derived from a hash of the period key
 * (YYYY-MM-DD for today/tomorrow, ISO week number for weekly, YYYY-MM for
 * monthly) + sign id + mode + language, so readings refresh when the period
 * changes and stay constant within it. All readings are written as
 * tendencies ("the day favours…", "traditionally read as…") — never a
 * guarantee of meeting someone, luck, money or marriage.
 *
 * Pools below are written fresh for this page; they are not copied from
 * rashifalEngine.
 */

import { ALL_ZODIAC_SIGNS, getSunSignByDob, ZodiacSignDetails } from './zodiacEngine';

export type LoveHoroscopeMode = 'single' | 'couple';
export type LoveHoroscopeLang = 'en' | 'hi';
export type LoveHoroscopeSpan = 'today' | 'tomorrow' | 'weekly' | 'monthly';

export interface SpanReading {
  reading: string;
  mood: string;
  say: string;
  avoid: string;
  dateLabel: string;
}

export interface LoveHoroscopeResult {
  sign: ZodiacSignDetails;
  mode: LoveHoroscopeMode;
  lang: LoveHoroscopeLang;
  spans: Record<LoveHoroscopeSpan, SpanReading>;
  bestMatches: string[];
}

// ─── Date helpers (local time) ──────────────────────────────────────────────

export function getLocalIsoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function isoWeek(d: Date): { year: number; week: number } {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (t.getUTCDay() + 6) % 7; // Monday = 0
  t.setUTCDate(t.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const fDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - fDayNum + 3);
  const week = 1 + Math.round((t.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000));
  return { year: t.getUTCFullYear(), week };
}

function weekStart(d: Date): Date {
  const c = new Date(d);
  const day = (c.getDay() + 6) % 7; // Monday = 0
  c.setDate(c.getDate() - day);
  return c;
}

function formatLong(d: Date, lang: LoveHoroscopeLang): string {
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── Seeded picking ─────────────────────────────────────────────────────────

function hashKey(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) % 100000;
  }
  return h;
}

function pick<T>(pool: T[], seed: number, offset: number): T {
  return pool[(seed + offset) % pool.length];
}

// ─── English reading pools: 10 lines per span per mode ─────────────────────

const EN_READINGS: Record<LoveHoroscopeSpan, Record<LoveHoroscopeMode, string[]>> = {
  today: {
    single: [
      'Today favours a small, honest first step: a message you have been putting off is traditionally read as well-timed now, and a short, warm reply is worth more than a long, careful one. If someone new catches your eye, the day favours saying hello rather than waiting for a perfect moment that may not come.',
      'The day favours lightness for singles: a casual chat, a shared joke, a compliment given without expecting one back. Traditionally read as a good day for meeting someone in an ordinary place — the reading says the mood is open, not that a meeting is certain.',
      'Today is traditionally read as a day to look at what you actually want, not what you think you should want. If you are still thinking about someone, the day favours one clear message over a week of wondering.',
      'The day favours patience with yourself: if love feels slow, that is not a sign it is absent. A single reader is traditionally read as better off enjoying the day — a walk, a friend, a favourite place — and letting a conversation happen on its own.',
      'Today favours courage in small doses: tell someone you enjoyed talking to them, or accept an invitation you would usually refuse. The reading favours the attempt, not the outcome.',
      'The day favours honesty about a crush: if the feeling is real, a gentle, direct word is traditionally read as the right move today. Keep it simple — the day favours plain words over grand gestures.',
      'Today is traditionally read as a day for noticing who notices you. Someone steady may already be showing interest in small ways — the day favours giving that person a little more of your attention.',
      'The day favours a fresh start: if an old conversation went quiet, today is traditionally read as a fair day to reopen it lightly, with no pressure and no expectations attached.',
      'Today favours being out in the world rather than waiting for love to knock: a group plan, a class, a familiar café. The reading says the day’s mood is social — use it.',
      'The day favours kindness to yourself first: a single reader who feels settled and unhurried is traditionally read as more likely to notice a real connection when it appears. No rush, no forcing.',
    ],
    couple: [
      'Today favours a calm, honest talk with your partner: the kind that clears the air instead of stirring it. Traditionally read as a good day for saying the small thing you have been holding back — gently, and at a quiet moment.',
      'The day favours closeness in ordinary moments: cooking together, a walk, an unhurried evening. Couples are traditionally read as happiest today when they slow down rather than plan something big.',
      'Today is traditionally read as a day to listen first: your partner may be carrying something unsaid, and a patient question is worth more than advice. The day favours understanding over being right.',
      'The day favours a small kindness your partner will actually notice — their favourite food, a message in the middle of the day, help without being asked. Traditionally read as the kind of day where small things land well.',
      'Today favours honesty about a disagreement, but at the right hour: wait for a calm moment, keep it short, and say what you need rather than what they did wrong. The reading favours repair over victory.',
      'The day favours laughter together: a shared joke, an old memory, something silly. Couples are traditionally read as closer today when they play a little instead of managing everything.',
      'Today is traditionally read as a steady day for love: nothing dramatic, and that is the point. The day favours appreciating a partner who shows up, day after day, without a fuss.',
      'The day favours a plan made together: a small trip, a date, a project for the home. Traditionally read as a good day for deciding something as a pair — the deciding matters more than the plan.',
      'Today favours space as well as closeness: a little time apart — an hour to yourself, a friend of your own — is traditionally read as healthy for the relationship today, not a sign of distance.',
      'The day favours saying thank you out loud: for something specific your partner did, not love in general. Traditionally read as a day when gratitude lands better than compliments.',
    ],
  },
  tomorrow: {
    single: [
      'Tomorrow is traditionally read as a better day than today for a first move: the mood favours a message, an invitation, or simply showing up where someone interesting might be. Plan one small step tonight, then take it tomorrow.',
      'Tomorrow favours a fresh eye: if someone has been on your mind, the day ahead is traditionally read as fair for a second look — a reply, a hello, a chance to see them differently.',
      'The day ahead favours meeting someone through other people: a friend’s plan, a group outing, an introduction. Traditionally read as a social tomorrow — say yes to the plan.',
      'Tomorrow is traditionally read as a day to be a little braver than usual: ask the question, send the message, accept the coffee. The reading favours the attempt, whatever the answer.',
      'The day ahead favours patience: if nothing happens tomorrow, that is not a verdict on your love life. Traditionally read as a day to enjoy and observe — the reading says the mood is open, not that an outcome is promised.',
      'Tomorrow favours a clear head about an old crush: the day ahead is traditionally read as good for deciding, one way or the other, instead of circling the same question.',
      'The day ahead favours new places: a different route, a new café, a class you have been meaning to try. Traditionally read as a day when a change of scene helps love along.',
      'Tomorrow is traditionally read as a gentle day for singles: low pressure, good conversation, and the kind of ease that makes a connection possible. Keep it light.',
      'The day ahead favours honesty with yourself about what you want in a partner: write it down tonight, and tomorrow is traditionally read as a good day to notice whether someone fits it.',
      'Tomorrow favours a small risk: compliment someone, start a conversation, or reply to the message you left on read. The reading favours initiative tomorrow.',
    ],
    couple: [
      'Tomorrow is traditionally read as a good day for the conversation you have been postponing: the mood favours calm words and a quiet hour. Plan it for the morning, when you are both fresh.',
      'The day ahead favours doing something together that is not a chore: a walk, a film, a meal out. Couples are traditionally read as closer tomorrow when they make time that belongs to the two of them.',
      'Tomorrow favours a little extra patience: your partner may be tired or distracted, and the day ahead is traditionally read as one where a gentle response works better than a sharp one.',
      'The day ahead is traditionally read as a good day to say something kind that you usually only think: a specific thank you, a noticed effort, a small praise. It lands well tomorrow.',
      'Tomorrow favours sorting out a small disagreement before it grows: the reading says the mood is fair for a short, honest talk — keep it about one thing, not everything.',
      'The day ahead favours closeness in the evening: leave the day’s business at the door and give each other an unhurried hour. Traditionally read as a warm tomorrow night.',
      'Tomorrow is traditionally read as a steady day for couples: no big decisions needed, and the reading favours enjoying what is already good rather than fixing what is not broken.',
      'The day ahead favours a shared laugh or a shared memory: look at old photos, retell a story, revisit a place. Traditionally read as a day that reminds you why you chose each other.',
      'Tomorrow favours a little independence too: time with your own friends or your own thoughts is traditionally read as good for the relationship, not a threat to it.',
      'The day ahead favours planning something to look forward to together — a weekend, a trip, a small celebration. Traditionally read as a day when a shared plan lifts the mood.',
    ],
  },
  weekly: {
    single: [
      'This week is traditionally read as a social one for singles: the best days for meeting someone are the days you are out with others, not the days you wait at home. The week’s theme is initiative — one small step, taken early in the week, sets the tone.',
      'The week ahead favours honesty about what you want: by midweek the mood is traditionally read as clearer, and a decision you have been avoiding — about a crush, a message, a date — gets easier to make.',
      'This week is traditionally read as a slow-burn week: nothing dramatic, but the reading favours steady, small contacts — a reply here, a hello there — that build into something by the weekend.',
      'The week favours a fresh start in love: an old conversation may reopen, or a new person may appear through a familiar place. Traditionally read as a week to stay open and say yes to one new plan.',
      'This week is traditionally read as a good week for letting go of a one-sided hope: the reading favours clarity over waiting, and the second half of the week is the better half for moving on.',
      'The week ahead favours courage midweek: the days around the middle of the week are traditionally read as the best for a first message or a first meeting. Keep the start of the week light.',
      'This week is traditionally read as a week for noticing patterns: who messages first, who makes time, who listens. The reading favours paying attention — the week shows you who is serious.',
      'The week favours fun over pressure: a group outing, a shared hobby, a laugh with strangers. Traditionally read as a week when love, if it comes, arrives sideways — through enjoyment, not effort.',
      'This week is traditionally read as a reflective one: the reading favours sorting out what you actually want before chasing it, and the weekend is the better time for any first move.',
      'The week ahead favours a bold moment near the weekend: by then the mood is traditionally read as warmer and more open, and a direct word lands better than it would on a Monday.',
    ],
    couple: [
      'This week is traditionally read as a good week for the two of you to talk properly: the best days for a real conversation are midweek, when the mood favours calm and honesty. The week’s theme is listening.',
      'The week ahead favours small shared pleasures over grand plans: a meal cooked together, a walk after dinner, an evening without screens. Couples are traditionally read as closer this week when they keep it simple.',
      'This week is traditionally read as a steady week for love: the reading favours routine done with care — the ordinary days, handled kindly, matter more than any single event.',
      'The week favours sorting out one thing that has been nagging: a money question, a family matter, a difference in plans. Traditionally read as a week when a short, honest talk early on saves a bigger one later.',
      'This week is traditionally read as a warm week for couples: the weekend is the best part, so protect it — make one plan together and keep it, even if the week gets busy.',
      'The week ahead favours laughter and lightness: the reading says the mood is best when you do not take every small friction seriously. A joke at the right moment does more than a debate.',
      'This week is traditionally read as a week to appreciate what is working: notice what your partner does well, and say it. The reading favours gratitude as the week’s simplest improvement.',
      'The week favours a little space midweek: time apart — an evening with friends, an hour alone — is traditionally read as healthy this week, and the reunion after it is warmer.',
      'This week is traditionally read as a good week for a shared decision: a holiday, a purchase, a plan for the months ahead. Decide together, and the week favours the decision holding.',
      'The week ahead favours patience on the harder days: if a disagreement comes, the reading says the mood improves by the weekend — wait for the calm day to talk it through.',
    ],
  },
  monthly: {
    single: [
      'This month is traditionally read as a month of new faces for singles: the reading favours meeting people through friends, work, or a new routine rather than waiting for a chance encounter. The month’s theme is showing up.',
      'The month ahead favours clarity: by the middle of the month, the reading says you will know more clearly what you want — and who is worth your time. The first half is for observing, the second for acting.',
      'This month is traditionally read as a slow month for new love but a good month for sorting out old feelings: the reading favours closing one door properly before opening another.',
      'The month favours a brave step in its second half: a message, a meeting, a date you have been putting off. Traditionally read as a month where the bold moment comes later, not sooner.',
      'This month is traditionally read as a social month: group plans, celebrations, and introductions are where the reading says love is most likely to appear — say yes to invitations.',
      'The month ahead favours honesty with yourself: the reading says this is a month to stop chasing what does not chase you back, and to notice who actually shows up.',
      'This month is traditionally read as a month of small beginnings: a conversation that continues, a number exchanged, a second meeting. The reading favours patience — the month plants, it does not harvest.',
      'The month favours a change of scene: a new place, a new habit, a different circle. Traditionally read as a month when love finds you more easily if you are somewhere new.',
      'This month is traditionally read as a good month for a fresh start after a disappointment: the reading favours looking forward, and the last week of the month is the warmest part.',
      'The month ahead favours being yourself without apology: the reading says the right person notices the real you, and this month is traditionally read as a good one for letting that show.',
    ],
    couple: [
      'This month is traditionally read as a month for the two of you to grow closer through small, steady care: the reading favours the everyday — shared meals, honest talks, kept promises — over grand gestures.',
      'The month ahead favours a real conversation about the future: the middle of the month is traditionally read as the best time to talk about plans, money, or family, calmly and together.',
      'This month is traditionally read as a warm month for couples: the reading favours affection shown in ordinary ways, and the month’s theme is appreciation — notice it, say it, repeat it.',
      'The month favours sorting out a long-standing difference: the reading says the mood is fairest in the second half of the month for the talk you have been avoiding.',
      'This month is traditionally read as a month to protect your time together: busy weeks will try to take it, and the reading favours one fixed evening a week that belongs to the two of you.',
      'The month ahead favours fun as a couple: a trip, a celebration, something you both enjoy. Traditionally read as a month when shared pleasure does more for the relationship than shared problem-solving.',
      'This month is traditionally read as a steady month: no big tests, and the reading favours enjoying that — the month rewards couples who appreciate a calm stretch instead of looking for drama.',
      'The month favours patience with each other’s moods: the reading says there will be a tense few days mid-month, and the kindest response is to wait it out rather than escalate it.',
      'This month is traditionally read as a good month for a shared goal: a saving plan, a home project, a fitness habit. The reading favours doing one thing together that you can both see improving.',
      'The month ahead favours remembering why you chose each other: the reading says the month ends warmly for couples who take a moment — a letter, a walk, a quiet evening — to say so.',
    ],
  },
};

// ─── Hindi reading pools: 8 lines per span per mode ────────────────────────

const HI_READINGS: Record<LoveHoroscopeSpan, Record<LoveHoroscopeMode, string[]>> = {
  today: {
    single: [
      'आज का दिन छोटी और सच्ची पहल के लिए अच्छा माना जाता है: जो संदेश आप टाल रहे थे, उसे आज भेजना शुभ समझा जाता है, और एक छोटा सा गर्मजोशी भरा जवाब लंबे सोच-विचार से बेहतर है। अगर कोई नया व्यक्ति अच्छा लगे, तो आज का दिन इंतज़ार करने के बजाय नमस्ते कहने का है।',
      'आज का दिन हल्के-फुल्के अंदाज़ के लिए अच्छा है: एक आसान बातचीत, साझा हंसी, बिना उम्मीद के दी गई तारीफ़। पारंपरिक रूप से आज का दिन किसी साधारण जगह पर किसी से मिलने के लिए अच्छा माना जाता है — दिन का मिज़ाज खुला है, यह कोई वादा नहीं।',
      'आज का दिन यह सोचने के लिए अच्छा माना जाता है कि आप वास्तव में क्या चाहते हैं, न कि आपको क्या चाहना चाहिए। अगर आप किसी के बारे में सोच रहे हैं, तो आज का दिन एक साफ़ संदेश के लिए अच्छा है, हफ़्तों की उलझन से बेहतर।',
      'आज का दिन खुद के साथ धैर्य रखने के लिए अच्छा है: अगर प्रेम धीमा लगे, तो यह इस बात का संकेत नहीं कि वह है ही नहीं। पारंपरिक रूप से अकेले पाठक के लिए आज का दिन अच्छा है — टहलें, दोस्तों से मिलें, और बातचीत को अपने आप होने दें।',
      'आज का दिन छोटी हिम्मत के लिए अच्छा माना जाता है: किसी से कहें कि आपसे बात करके अच्छा लगा, या उस निमंत्रण को स्वीकार करें जिसे आप आमतौर पर ठुकरा देते हैं। दिन प्रयास का पक्षधर है, परिणाम का नहीं।',
      'आज का दिन अपने मन की बात कहने के लिए अच्छा है: अगर भावना सच्ची है, तो एक नरम और सीधा शब्द आज के लिए सही माना जाता है। इसे सरल रखें — आज का दिन बड़े इशारों से ज़्यादा सादे शब्दों का है।',
      'आज का दिन यह देखने के लिए अच्छा माना जाता है कि कौन आपको देख रहा है। कोई स्थिर व्यक्ति पहले से ही छोटे तरीकों से रुचि दिखा रहा हो सकता है — आज का दिन उसे थोड़ा और ध्यान देने का है।',
      'आज का दिन नई शुरुआत के लिए अच्छा है: अगर कोई पुरानी बातचीत ठंडी पड़ गई थी, तो आज उसे हल्के से फिर से शुरू करना उचित माना जाता है — बिना दबाव और बिना उम्मीद के।',
    ],
    couple: [
      'आज का दिन अपने साथी से शांत और ईमानदार बातचीत के लिए अच्छा माना जाता है: ऐसी बातचीत जो हवा साफ़ करे, न कि उसे और बिगाड़े। पारंपरिक रूप से आज छोटी बात को धीरे से कहना अच्छा है — शांत पल में।',
      'आज का दिन साधारण पलों में नज़दीकी के लिए अच्छा है: साथ खाना बनाना, टहलना, बिना जल्दबाज़ी की शाम। पारंपरिक रूप से जोड़े आज सबसे खुश तब होते हैं जब वे धीमे हो जाते हैं, बड़े आयोजन के बजाय।',
      'आज का दिन पहले सुनने के लिए अच्छा माना जाता है: आपका साथी कुछ अनकहा लिए हो सकता है, और एक धैर्य भरा सवाल सलाह से ज़्यादा कीमती है। आज का दिन सही होने से ज़्यादा समझने का है।',
      'आज का दिन एक छोटी सी दयालुता के लिए अच्छा है जो साथी को सचमुच महसूस हो — उनका पसंदीदा खाना, दिन में एक संदेश, बिना कहे मदद। पारंपरिक रूप से आज का दिन ऐसा है जहाँ छोटी चीज़ें अच्छा असर करती हैं।',
      'आज का दिन किसी असहमति पर ईमानदारी से बात करने के लिए अच्छा है, लेकिन सही समय पर: शांत पल का इंतज़ार करें, बात छोटी रखें, और यह कहें कि आपको क्या चाहिए, न कि उन्होंने क्या गलत किया। दिन मरम्मत का पक्षधर है, जीत का नहीं।',
      'आज का दिन साथ हंसने के लिए अच्छा है: साझा मज़ाक, पुरानी याद, कुछ हल्का-फुल्का। पारंपरिक रूप से जोड़े आज तब करीब होते हैं जब वे सब कुछ संभालने के बजाय थोड़ा खेलते हैं।',
      'आज का दिन प्रेम के लिए स्थिर माना जाता है: कुछ नाटकीय नहीं, और यही बात है। आज का दिन उस साथी की कद्र करने का है जो बिना शोर के हर दिन साथ निभाता है।',
      'आज का दिन साथ मिलकर एक योजना बनाने के लिए अच्छा है: छोटी यात्रा, एक मुलाकात, घर का कोई काम। पारंपरिक रूप से आज का दिन जोड़े के रूप में निर्णय लेने के लिए अच्छा है — निर्णय ही मायने रखता है, योजना नहीं।',
    ],
  },
  tomorrow: {
    single: [
      'कल का दिन आज से बेहतर माना जाता है पहली पहल के लिए: दिन का मिज़ाज संदेश, निमंत्रण या वहाँ मौजूद रहने के पक्ष में है जहाँ कोई दिलचस्प व्यक्ति हो सकता है। आज रात एक छोटा कदम तय करें, कल उसे उठाएँ।',
      'कल का दिन नए नज़रिए के लिए अच्छा है: अगर कोई आपके मन में है, तो आने वाला दिन उसे दोबारा देखने के लिए उचित माना जाता है — एक जवाब, एक नमस्ते, एक नई नज़र।',
      'आने वाला दिन दूसरों के ज़रिए मिलने के लिए अच्छा माना जाता है: दोस्त की योजना, सामूहिक सैर, कोई परिचय। पारंपरिक रूप से कल सामाजिक दिन है — योजना को हाँ कहें।',
      'कल का दिन सामान्य से थोड़ा ज़्यादा साहस के लिए अच्छा माना जाता है: सवाल पूछें, संदेश भेजें, कॉफ़ी स्वीकार करें। दिन प्रयास का पक्षधर है, जवाब चाहे जो हो।',
      'आने वाला दिन धैर्य के लिए अच्छा है: अगर कल कुछ न हो, तो यह आपके प्रेम जीवन पर फैसला नहीं है। पारंपरिक रूप से यह दिन आनंद और अवलोकन का है — मिज़ाज खुला है, परिणाम का वादा नहीं।',
      'कल का दिन पुराने आकर्षण पर स्पष्ट निर्णय के लिए अच्छा माना जाता है: आने वाला दिन एक तरफ या दूसरी तरफ फैसला करने के लिए अच्छा है, एक ही सवाल पर घूमने के बजाय।',
      'आने वाला दिन नई जगहों के लिए अच्छा है: अलग रास्ता, नई कॉफ़ी की दुकान, कोई कक्षा जिसे आप आज़माना चाहते थे। पारंपरिक रूप से यह दिन दृश्य बदलने पर प्रेम के लिए सहायक माना जाता है।',
      'कल का दिन अकेले लोगों के लिए सौम्य माना जाता है: कम दबाव, अच्छी बातचीत, और वह सहजता जो संबंध को संभव बनाती है। इसे हल्का रखें।',
    ],
    couple: [
      'कल का दिन उस बातचीत के लिए अच्छा माना जाता है जिसे आप टाल रहे थे: दिन का मिज़ाज शांत शब्दों और शांत समय के पक्ष में है। इसे सुबह के लिए तय करें, जब आप दोनों तरोताज़ा हों।',
      'आने वाला दिन साथ में कुछ ऐसा करने के लिए अच्छा है जो काम न हो: टहलना, फिल्म, बाहर खाना। पारंपरिक रूप से जोड़े कल तब करीब होते हैं जब वे समय निकालते हैं जो सिर्फ़ दोनों का हो।',
      'कल का दिन थोड़े ज़्यादा धैर्य के लिए अच्छा है: आपका साथी थका या विचलित हो सकता है, और आने वाला दिन पारंपरिक रूप से ऐसा है जहाँ नरम जवाब तीखे जवाब से बेहतर काम करता है।',
      'आने वाला दिन पारंपरिक रूप से उस दयालु बात को कहने के लिए अच्छा है जो आप आमतौर पर सिर्फ़ सोचते हैं: एक खास धन्यवाद, देखी गई मेहनत, छोटी तारीफ़। कल यह अच्छा असर करता है।',
      'कल का दिन छोटी असहमति को बढ़ने से पहले सुलझाने के लिए अच्छा माना जाता है: दिन का मिज़ाज एक छोटी, ईमानदार बातचीत के लिए उचित है — एक ही बात पर रखें, सब कुछ पर नहीं।',
      'आने वाला दिन शाम की नज़दीकी के लिए अच्छा है: दिन का काम दरवाज़े पर छोड़ दें और एक-दूसरे को बिना जल्दबाज़ी का एक घंटा दें। पारंपरिक रूप से कल की रात गर्म मानी जाती है।',
      'कल का दिन जोड़ों के लिए स्थिर माना जाता है: कोई बड़ा निर्णय ज़रूरी नहीं, और दिन का मिज़ाज जो अच्छा है उसका आनंद लेने के पक्ष में है, जो टूटा नहीं उसे ठीक करने के बजाय।',
      'आने वाला दिन साझा हंसी या साझा याद के लिए अच्छा है: पुरानी तस्वीरें देखें, कोई कहानी दोहराएँ, किसी जगह जाएँ। पारंपरिक रूप से यह दिन याद दिलाता है कि आपने एक-दूसरे को क्यों चुना।',
    ],
  },
  weekly: {
    single: [
      'यह सप्ताह अकेले लोगों के लिए सामाजिक माना जाता है: किसी से मिलने के सबसे अच्छे दिन वे हैं जब आप दूसरों के साथ बाहर हों, न कि घर पर इंतज़ार करें। सप्ताह का विषय पहल है — सप्ताह की शुरुआत में उठाया गया एक छोटा कदम सुर तय करता है।',
      'आने वाला सप्ताह यह जानने के लिए अच्छा है कि आप क्या चाहते हैं: सप्ताह के बीच तक दिन का मिज़ाज पारंपरिक रूप से स्पष्ट माना जाता है, और जिस निर्णय को आप टाल रहे थे — किसी आकर्षण, संदेश या मुलाकात के बारे में — वह आसान हो जाता है।',
      'यह सप्ताह धीमी आंच वाला माना जाता है: कुछ नाटकीय नहीं, लेकिन दिन का मिज़ाज स्थिर, छोटे संपर्कों के पक्ष में है — यहाँ एक जवाब, वहाँ एक नमस्ते — जो सप्ताहांत तक कुछ बन जाता है।',
      'सप्ताह नई शुरुआत के पक्ष में है: पुरानी बातचीत फिर खुल सकती है, या कोई नया व्यक्ति किसी परिचित जगह से मिल सकता है। पारंपरिक रूप से यह सप्ताह खुला रहने और एक नई योजना को हाँ कहने का है।',
      'यह सप्ताह एकतरफा उम्मीद को छोड़ने के लिए अच्छा माना जाता है: दिन का मिज़ाज इंतज़ार से ज़्यादा स्पष्टता के पक्ष में है, और सप्ताह का दूसरा भाग आगे बढ़ने के लिए बेहतर है।',
      'आने वाला सप्ताह सप्ताह के बीच में हिम्मत के पक्ष में है: सप्ताह के मध्य के दिन पारंपरिक रूप से पहले संदेश या पहली मुलाकात के लिए सबसे अच्छे माने जाते हैं। सप्ताह की शुरुआत हल्की रखें।',
      'यह सप्ताह पैटर्न देखने के लिए अच्छा माना जाता है: कौन पहले संदेश भेजता है, कौन समय निकालता है, कौन सुनता है। दिन का मिज़ाज ध्यान देने के पक्ष में है — सप्ताह बताता है कि कौन गंभीर है।',
      'सप्ताह मज़े को दबाव से ज़्यादा तरजीह देता है: सामूहिक सैर, साझा शौक, अजनबियों के साथ हंसी। पारंपरिक रूप से यह सप्ताह ऐसा है जब प्रेम, अगर आता है, तो आनंद के ज़रिए आता है — मेहनत से नहीं।',
    ],
    couple: [
      'यह सप्ताह आप दोनों के लिए ठीक से बात करने के लिए अच्छा माना जाता है: वास्तविक बातचीत के सबसे अच्छे दिन सप्ताह के बीच में हैं, जब दिन का मिज़ाज शांत और ईमानदार होता है। सप्ताह का विषय सुनना है।',
      'आने वाला सप्ताह बड़े आयोजन से ज़्यादा छोटे साझा सुखों के पक्ष में है: साथ खाना बनाना, रात के खाने के बाद टहलना, बिना स्क्रीन की शाम। पारंपरिक रूप से जोड़े इस सप्ताह तब करीब होते हैं जब वे इसे सरल रखते हैं।',
      'यह सप्ताह प्रेम के लिए स्थिर माना जाता है: दिन का मिज़ाज दिनचर्या को देखभाल से निभाने के पक्ष में है — साधारण दिन, दयालुता से निभाए गए, किसी एक घटना से ज़्यादा मायने रखते हैं।',
      'सप्ताह एक चीज़ को सुलझाने के पक्ष में है जो परेशान कर रही है: पैसों का सवाल, परिवार का मामला, योजनाओं में अंतर। पारंपरिक रूप से यह सप्ताह ऐसा है जब शुरुआत में एक छोटी, ईमानदार बातचीत बाद में बड़ी बातचीत को बचा लेती है।',
      'यह सप्ताह जोड़ों के लिए गर्म माना जाता है: सप्ताहांत सबसे अच्छा भाग है, इसलिए उसे सुरक्षित रखें — एक साथ एक योजना बनाएँ और उसे निभाएँ, चाहे सप्ताह कितना भी व्यस्त हो।',
      'आने वाला सप्ताह हंसी और हल्केपन के पक्ष में है: दिन का मिज़ाज तब सबसे अच्छा होता है जब आप हर छोटी खटास को गंभीरता से नहीं लेते। सही समय पर एक मज़ाक बहस से ज़्यादा काम करता है।',
      'यह सप्ताह जो अच्छा काम कर रहा है उसकी कद्र करने के लिए अच्छा माना जाता है: देखें कि आपका साथी क्या अच्छा करता है, और कहें। दिन का मिज़ाज कृतज्ञता को सप्ताह का सबसे सरल सुधार मानता है।',
      'सप्ताह सप्ताह के बीच में थोड़ी दूरी के पक्ष में है: अपने दोस्तों के साथ शाम, अकेले एक घंटा — पारंपरिक रूप से इस सप्ताह यह स्वस्थ माना जाता है, और उसके बाद का मिलन और गर्म होता है।',
    ],
  },
  monthly: {
    single: [
      'यह महीना अकेले लोगों के लिए नए चेहरों वाला माना जाता है: दिन का मिज़ाज दोस्तों, काम या नई दिनचर्या के ज़रिए लोगों से मिलने के पक्ष में है, संयोग की प्रतीक्षा के बजाय। महीने का विषय मौजूद रहना है।',
      'आने वाला महीना स्पष्टता के लिए अच्छा है: महीने के बीच तक, दिन का मिज़ाज कहता है कि आपको ज़्यादा स्पष्ट होगा कि आप क्या चाहते हैं — और कौन आपके समय के लायक है। पहला भाग देखने के लिए है, दूसरा कार्य के लिए।',
      'यह महीना नए प्रेम के लिए धीमा माना जाता है लेकिन पुरानी भावनाओं को सुलझाने के लिए अच्छा है: दिन का मिज़ाज एक दरवाज़ा ठीक से बंद करने के पक्ष में है, दूसरा खोलने से पहले।',
      'महीना अपने दूसरे भाग में एक साहसी कदम के पक्ष में है: एक संदेश, एक मुलाकात, एक तारीख जिसे आप टाल रहे थे। पारंपरिक रूप से यह महीना ऐसा है जहाँ साहसी पल बाद में आता है, पहले नहीं।',
      'यह महीना सामाजिक माना जाता है: सामूहिक योजनाएँ, उत्सव और परिचय — दिन का मिज़ाज कहता है कि प्रेम सबसे ज़्यादा यहीं मिलने की संभावना है — निमंत्रणों को हाँ कहें।',
      'आने वाला महीना खुद से ईमानदारी के लिए अच्छा है: दिन का मिज़ाज कहता है कि यह महीना उसका पीछा करना बंद करने का है जो आपका पीछा नहीं करता, और यह देखने का है कि वास्तव में कौन साथ देता है।',
      'यह महीना छोटी शुरुआतों वाला माना जाता है: एक बातचीत जो जारी रहती है, एक नंबर का आदान-प्रदान, दूसरी मुलाकात। दिन का मिज़ाज धैर्य के पक्ष में है — महीना बोता है, काटता नहीं।',
      'महीना दृश्य बदलने के पक्ष में है: नई जगह, नई आदत, अलग दायरा। पारंपरिक रूप से यह महीना ऐसा है जब प्रेम आपको आसानी से मिलता है अगर आप किसी नई जगह पर हों।',
    ],
    couple: [
      'यह महीना आप दोनों के लिए छोटी, स्थिर देखभाल से करीब आने के लिए अच्छा माना जाता है: दिन का मिज़ाज रोज़मर्रा का पक्षधर है — साझा भोजन, ईमानदार बातचीत, निभाए गए वादे — बड़े इशारों से ज़्यादा।',
      'आने वाला महीना भविष्य के बारे में वास्तविक बातचीत के लिए अच्छा है: महीने के बीच का समय पारंपरिक रूप से योजनाओं, पैसों या परिवार पर शांति से और साथ में बात करने के लिए सबसे अच्छा माना जाता है।',
      'यह महीना जोड़ों के लिए गर्म माना जाता है: दिन का मिज़ाज साधारण तरीकों से दिखाए गए स्नेह के पक्ष में है, और महीने का विषय कद्र है — देखें, कहें, दोहराएँ।',
      'महीना लंबे समय से चली आ रही असहमति को सुलझाने के पक्ष में है: दिन का मिज़ाज कहता है कि महीने के दूसरे भाग में उस बातचीत के लिए माहौल सबसे उचित है जिससे आप बच रहे थे।',
      'यह महीना साथ बिताए समय की रक्षा के लिए अच्छा माना जाता है: व्यस्त सप्ताह इसे छीनने की कोशिश करेंगे, और दिन का मिज़ाज सप्ताह में एक तय शाम के पक्ष में है जो सिर्फ़ आप दोनों की हो।',
      'आने वाला महीना जोड़े के रूप में मज़े के पक्ष में है: एक यात्रा, एक उत्सव, कुछ ऐसा जिसका आप दोनों आनंद लें। पारंपरिक रूप से यह महीना ऐसा है जब साझा आनंद साझा समस्या-समाधान से ज़्यादा काम करता है।',
      'यह महीना स्थिर माना जाता है: कोई बड़ी परीक्षा नहीं, और दिन का मिज़ाज उसका आनंद लेने के पक्ष में है — महीना उन जोड़ों को पुरस्कृत करता है जो शांत समय की कद्र करते हैं, नाटक खोजने के बजाय।',
      'महीना एक-दूसरे के मिज़ाज के प्रति धैर्य के पक्ष में है: दिन का मिज़ाज कहता है कि महीने के बीच में कुछ तनाव भरे दिन होंगे, और सबसे दयालु जवाब उन्हें बढ़ाने के बजाय इंतज़ार करना है।',
    ],
  },
};

// ─── Mood / say / avoid pools ───────────────────────────────────────────────

const MOODS: Record<LoveHoroscopeLang, string[]> = {
  en: [
    'Warm & open',
    'Calm & thoughtful',
    'Playful & light',
    'Tender & honest',
    'Hopeful & patient',
    'Bold & direct',
    'Quiet & reflective',
    'Joyful & easy',
  ],
  hi: [
    'गर्म और खुला',
    'शांत और विचारशील',
    'खिलंदड़ा और हल्का',
    'कोमल और ईमानदार',
    'आशावान और धैर्यवान',
    'साहसी और सीधा',
    'मौन और चिंतनशील',
    'प्रसन्न और सहज',
  ],
};

const SAY: Record<LoveHoroscopeLang, Record<LoveHoroscopeMode, string[]>> = {
  en: {
    single: [
      'Say it plainly — “I enjoyed talking to you” is enough.',
      'Ask a real question, then actually listen to the answer.',
      'A short, warm message beats a long, careful one.',
      'Compliment something specific, not something generic.',
      'Say yes to the plan — the coffee, the walk, the group outing.',
      'Be honest about what you want, gently and early.',
      'Thank them for their time — it is rarer than you think.',
      'If you feel it, say so; if you don’t, say that kindly too.',
    ],
    couple: [
      'Say what you need, not what they did wrong.',
      'A specific thank you lands better than “I love you” on repeat.',
      'Ask how their day really was — and wait for the real answer.',
      'Say the small thing now, before it becomes a big thing.',
      'Tell them one thing you noticed and liked today.',
      'Ask for what you want plainly; hints rarely work.',
      'Say sorry first when you are wrong — it costs nothing.',
      'Remind them of a good memory you share.',
    ],
  },
  hi: {
    single: [
      'साफ़ कहें — “आपसे बात करके अच्छा लगा” ही काफी है।',
      'एक सच्चा सवाल पूछें, फिर उसका जवाब सच में सुनें।',
      'छोटा, गर्मजोशी भरा संदेश लंबे, सोच-विचार वाले संदेश से बेहतर है।',
      'किसी खास चीज़ की तारीफ़ करें, सामान्य चीज़ की नहीं।',
      'योजना को हाँ कहें — कॉफ़ी, टहलना, सामूहिक सैर।',
      'आप क्या चाहते हैं, यह नरमी से और जल्दी ईमानदारी से कहें।',
      'उनके समय के लिए धन्यवाद कहें — यह जितना आप सोचते हैं, उससे दुर्लभ है।',
      'अगर महसूस होता है, तो कहें; अगर नहीं, तो वह भी दयालुता से कहें।',
    ],
    couple: [
      'कहें कि आपको क्या चाहिए, न कि उन्होंने क्या गलत किया।',
      'एक खास धन्यवाद “मैं तुमसे प्यार करता हूँ” की दोहराव से बेहतर असर करता है।',
      'पूछें कि उनका दिन वास्तव में कैसा था — और असली जवाब का इंतज़ार करें।',
      'छोटी बात अभी कहें, इससे पहले कि वह बड़ी हो जाए।',
      'उन्हें बताएँ कि आज आपने एक चीज़ देखी और पसंद की।',
      'जो चाहते हैं, उसे साफ़ कहें; इशारे शायद ही काम करते हैं।',
      'जब आप गलत हों, तो पहले माफ़ी माँगें — इसमें कुछ नहीं जाता।',
      'उन्हें कोई अच्छी साझा याद दिलाएँ।',
    ],
  },
};

const AVOID: Record<LoveHoroscopeLang, Record<LoveHoroscopeMode, string[]>> = {
  en: {
    single: [
      'Avoid overthinking one message — reply, then move on.',
      'Avoid chasing someone who never replies.',
      'Avoid big promises on a first conversation.',
      'Avoid comparing your love life to anyone else’s.',
      'Avoid reading too much into a single look or like.',
      'Avoid waiting for a perfect moment — it rarely arrives.',
      'Avoid pretending to be someone you are not.',
      'Avoid double-texting when the first message went unanswered.',
    ],
    couple: [
      'Avoid bringing up old fights in a new disagreement.',
      'Avoid deciding what your partner meant — ask instead.',
      'Avoid the silent treatment; it solves nothing.',
      'Avoid big talks when either of you is tired or hungry.',
      'Avoid keeping score — love is not a ledger.',
      'Avoid joking about something that genuinely hurts them.',
      'Avoid making decisions for both of you alone.',
      'Avoid saying “you always” or “you never” — both are rarely true.',
    ],
  },
  hi: {
    single: [
      'एक संदेश पर ज़्यादा सोचने से बचें — जवाब दें, फिर आगे बढ़ें।',
      'उसका पीछा करने से बचें जो कभी जवाब नहीं देता।',
      'पहली बातचीत में बड़े वादों से बचें।',
      'अपने प्रेम जीवन की तुलना किसी और से करने से बचें।',
      'एक नज़र या पसंद पर ज़्यादा अर्थ निकालने से बचें।',
      'सही पल का इंतज़ार करने से बचें — वह शायद ही आता है।',
      'वह बनने का दिखावा करने से बचें जो आप नहीं हैं।',
      'पहला संदेश अनुत्तरित रहने पर दोबारा संदेश भेजने से बचें।',
    ],
    couple: [
      'नई असहमति में पुरानी लड़ाइयों को लाने से बचें।',
      'यह तय करने से बचें कि साथी का क्या मतलब था — पूछें।',
      'चुप्पी साधने से बचें; इससे कुछ हल नहीं होता।',
      'जब आप में से कोई थका या भूखा हो, तो बड़ी बातचीत से बचें।',
      'हिसाब रखने से बचें — प्रेम खाता-बही नहीं है।',
      'उस बात पर मज़ाक करने से बचें जो उन्हें सच में दुख देती है।',
      'दोनों के लिए अकेले निर्णय लेने से बचें।',
      '“तुम हमेशा” या “तुम कभी नहीं” कहने से बचें — दोनों शायद ही सच होते हैं।',
    ],
  },
};

// ─── Public API ─────────────────────────────────────────────────────────────

function buildSpan(
  span: LoveHoroscopeSpan,
  periodKey: string,
  dateLabel: string,
  sign: ZodiacSignDetails,
  mode: LoveHoroscopeMode,
  lang: LoveHoroscopeLang
): SpanReading {
  const key = `${periodKey}|${sign.id}|${mode}|${lang}`;
  const seed = hashKey(key);
  const readings = (lang === 'hi' ? HI_READINGS : EN_READINGS)[span][mode];
  return {
    reading: pick(readings, seed, 0),
    mood: pick(MOODS[lang], seed, 3),
    say: pick(SAY[lang][mode], seed, 5),
    avoid: pick(AVOID[lang][mode], seed, 7),
    dateLabel,
  };
}

/**
 * Get the full love horoscope for a sign: today, tomorrow, weekly and
 * monthly readings, in English or Hindi, for singles or couples.
 * Deterministic per period — the same inputs always give the same reading
 * within the day / week / month, and a fresh one when the period changes.
 */
export function getLoveHoroscope(
  signId: string,
  mode: LoveHoroscopeMode,
  lang: LoveHoroscopeLang
): LoveHoroscopeResult {
  const sign = ALL_ZODIAC_SIGNS.find((s) => s.id === signId) ?? ALL_ZODIAC_SIGNS[0];
  const now = new Date();
  const tomorrowDate = addDays(now, 1);
  const week = isoWeek(now);
  const weekStartDate = weekStart(now);
  const weekEndDate = addDays(weekStartDate, 6);

  const todayLabel = lang === 'hi' ? `आज, ${formatLong(now, lang)}` : `Today, ${formatLong(now, lang)}`;
  const tomorrowLabel = lang === 'hi' ? `कल, ${formatLong(tomorrowDate, lang)}` : `Tomorrow, ${formatLong(tomorrowDate, lang)}`;
  const weeklyLabel =
    lang === 'hi'
      ? `सप्ताह: ${formatLong(weekStartDate, lang)} – ${formatLong(weekEndDate, lang)}`
      : `Week of ${formatLong(weekStartDate, lang)} – ${formatLong(weekEndDate, lang)}`;
  const monthlyLabel = now.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return {
    sign,
    mode,
    lang,
    spans: {
      today: buildSpan('today', getLocalIsoDate(now), todayLabel, sign, mode, lang),
      tomorrow: buildSpan('tomorrow', getLocalIsoDate(tomorrowDate), tomorrowLabel, sign, mode, lang),
      weekly: buildSpan(
        'weekly',
        `${week.year}-W${String(week.week).padStart(2, '0')}`,
        weeklyLabel,
        sign,
        mode,
        lang
      ),
      monthly: buildSpan(
        'monthly',
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
        monthlyLabel,
        sign,
        mode,
        lang
      ),
    },
    bestMatches: sign.bestMatches,
  };
}

/** Derive the sun sign from a date of birth (YYYY-MM-DD). */
export function signFromDob(dob: string): ZodiacSignDetails {
  return getSunSignByDob(dob);
}
