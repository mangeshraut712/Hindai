import type { AartiVerse } from "./ganesh-aarti-sangrah";
import { transliterateToIast } from "../sanskrit/transliteration";

// Source: user-supplied photographs of booklet pages 8–10, checked 2026-09-21.
// Preserve this edition's spellings and printed line breaks; do not normalize
// against other recensions. English and Marathi are explanatory, not book text.
const entries: Array<Omit<AartiVerse, "iast">> = [
  {
    number: 0,
    label: "॥ श्री गणेशाय नमः॥",
    original:
      "ॐ भद्रं कर्णेभिः शृणुयाम देवाः । भद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरंगैस्तुष्टुवांसस्तनूभिः व्यशेम देवहितं यदायुः ।\nॐ स्वस्ति न इन्द्रो वृद्धश्रवाः । स्वस्ति नः पूषा विश्ववेदाः ।\nस्वस्ति नस्तार्क्ष्यो अरिष्टनेमिः । स्वस्ति नो बृहस्पतिर्दधातु ।\nॐ शान्तिः ! शान्तिः ! शान्तिः !!!",
    english:
      "Om. May we hear and see what is auspicious, and with steady limbs live our allotted life in praise. May Indra of great renown, all-knowing Pushan, Tarkshya of unharmed wheels, and Brihaspati grant us well-being. Peace, peace, peace.",
    meaning: "पुस्तकातील प्रारंभीचा शान्तिपाठ; हा क्रमांकित मंत्र नाही.",
  },
  {
    number: 1,
    original:
      "ॐ नमस्ते गणपतये । त्वमेव प्रत्यक्षं तत्त्वमसि ॥\nत्वमेव केवलं कर्तासि । त्वमेव केवलं धर्तासि ।\nत्वमेव केवलं हर्तासि । त्वमेव सर्वं खल्विदं ब्रह्मासि ।\nत्वं साक्षादात्मासि नित्यम् ॥१॥",
    english:
      "Salutations to Ganapati. You alone are the manifest Reality, the creator, sustainer, and dissolver. All this is Brahman in you; you are eternally the directly present Self.",
    meaning: "गणपतीला प्रत्यक्ष तत्त्व, ब्रह्म आणि नित्य आत्मा म्हणून नमस्कार.",
  },
  {
    number: 2,
    original: "ऋतं वच्मि ॥ सत्यं वच्मि ॥२॥",
    english: "I speak cosmic truth. I speak truth.",
    meaning: "ऋत आणि सत्य बोलण्याची प्रतिज्ञा.",
  },
  {
    number: 3,
    original:
      "अव त्वं माम् । अव वक्तारम् । अव श्रोतारम् । अव दातारम् ।\nअव धातारम् । अवानूचानमव शिष्यम् ।\nअव पश्चात्तात् । अव पुरस्तात् । अवोत्तरात्तात् । अव दक्षिणात्तात् ।\nअव चोर्ध्वात्तात् । अवाधरात्तात् । सर्वतो मां पाहि पाहि समंतात् ॥३॥",
    english:
      "Protect me, the speaker, listener, giver, supporter, learned teacher, and student. Protect from behind, in front, north, south, above, and below. Guard me on every side.",
    meaning: "वक्ता, श्रोता, दाता, धाता, शिक्षक आणि शिष्य यांचे सर्व दिशांनी रक्षण मागितले आहे.",
  },
  {
    number: 4,
    original:
      "त्वं वाङ्मयस्त्वं चिन्मयः। त्वमानंदमयस्त्वं ब्रह्ममयः।\nत्वं सच्चिदानंदाद्वितीयोसि । त्वं प्रत्यक्षं ब्रह्मासि ।\nत्वं ज्ञानमयो विज्ञानमयोसि ॥४॥",
    english:
      "You are speech and consciousness, bliss and Brahman. You are nondual being, consciousness, and bliss; manifest Brahman, knowledge, and realized knowledge.",
    meaning: "गणेशाचे वाङ्मय, चिन्मय आणि सच्चिदानंद स्वरूप.",
  },
  {
    number: 5,
    original:
      "सर्वं जगदिदं त्वत्तो जायते । सर्वं जगदिदं त्वत्तस्तिष्ठति ।\nसर्वं जगदिदं त्वयि लयमेष्यति । सर्वं जगदिदं त्वयि प्रत्येति ।\nत्वं भूमिरापोऽनलोऽनिलो नभः। त्वं चत्वारि वाक्पदानि ॥५॥",
    english:
      "The whole world arises from you, is sustained by you, dissolves in you, and returns to you. You are earth, water, fire, air, space, and the four stages of speech.",
    meaning: "विश्वाची उत्पत्ती, स्थिती आणि लय; पंचमहाभूते व वाणीची चार पदे.",
  },
  {
    number: 6,
    original:
      "त्वं गुणत्रयातीतः। त्वं देहत्रयातीतः। त्वं कालत्रयातीतः ।\nत्वं अवस्थात्रयातीतः । त्वं मूलाधारस्थितोऽसि नित्यम् ।\nत्वं शक्तित्रयात्मकः । त्वां योगिनो ध्यायंति नित्यम्।\nत्वं ब्रह्मा त्वं विष्णुस्त्वं रुद्रस्त्वमिन्द्रस्त्वमग्निस्त्वं\nवायुस्त्वं सूर्यस्त्वं चंद्रमास्त्वं ब्रह्मभूर्भुवः स्वरोम् ॥६॥",
    english:
      "You transcend the three qualities, three bodies, three times, and three states of consciousness. You abide in the muladhara and embody the three powers. Yogis meditate on you always. You are Brahma, Vishnu, Rudra, Indra, Agni, Vayu, Surya, Chandra, and Brahman—bhur, bhuvah, svar, Om.",
    meaning: "हा मंत्र पान ८ वर सुरू होऊन पान ९ वर पूर्ण होतो.",
  },
  {
    number: 7,
    original:
      "गणादिं पूर्वमुच्चार्य वर्णादिं तदनन्तरम् । अनुस्वारः परतरः। अर्धेन्दुलसितम् ।\nतारेण ऋद्धम् । एतत्तव मनुस्वरूपम् । गकारः पूर्वरूपम् ।\nअकारो मध्यमरूपम् । अनुस्वारश्चान्त्यरूपम् । बिन्दुरुत्तररूपम् ।\nनादः संधानम् । संहिता संधिः । सैषा गणेशविद्या ।\nगणक ऋषिः। निचृद्गायत्री छंदः । गणपतिर्देवता ॐ गं गणपतये नमः ॥७॥",
    english:
      "Utter ga, then the first vowel, followed by anusvara, adorned with the crescent and enriched by Om. This is your mantra form: ga first, a in the middle, anusvara at the end, and the dot above. Sound joins them. This is Ganesha knowledge; Ganaka is the seer, nicrid Gayatri the metre, Ganapati the deity. Om gam ganapataye namah.",
    meaning: "गं बीजमंत्राची रचना, ऋषी, छंद आणि देवता.",
  },
  {
    number: 8,
    original: "एकदंताय विद्महे वक्रतुंडाय धीमहि । तन्नो दंती प्रचोदयात् ॥८॥",
    english:
      "We seek to know the one-tusked Lord and meditate on the curved-trunked Lord. May that tusked one inspire us.",
    meaning: "गणेश गायत्री मंत्र.",
  },
  {
    number: 9,
    original:
      "एकदंतं चतुर्हस्तं पाशमंकुशधारिणम् । रदं च वरदं हस्तैर्बिभ्राणं मूषकध्वजम् ।\nरक्तं लंबोदरं शूर्पकर्णकं रक्तवाससम् ।\nरक्तगंधानुलिप्तांगं रक्तपुष्पैः सुपूजितम् ।\nभक्तानुकंपिनं देवं जगत्कारणमच्युतम् ।\nआविर्भूतं च सृष्ट्यादौ प्रकृतेः पुरुषात्परम् ।\nएवं ध्यायति यो नित्यं स योगी योगिनां वरः ॥९॥",
    english:
      "Meditate on the one-tusked, four-armed Lord holding noose, goad, tusk, and the boon-giving gesture, with a mouse on his banner; red, large-bellied, with broad ears, red clothes, red sandal paste, and red flowers. Compassionate to devotees, unfailing cause of the world, manifest at creation and beyond prakriti and purusha. One who meditates thus daily is foremost among yogis.",
    meaning: "एकदंत, चार हात, पाश, अंकुश, दात आणि वरदमुद्रा असलेल्या गणेशाचे ध्यान.",
  },
  {
    number: 10,
    original:
      "नमो व्रातपतये। नमो गणपतये । नमः प्रमथपतये ।\nनमस्तेऽस्तु लंबोदरायैकदंताय विघ्ननाशिने\nशिवसुताय श्रीवरदमूर्तये नमः ॥१०॥",
    english:
      "Salutations to the lord of hosts, lord of the ganas, and lord of the pramathas. Salutations to the large-bellied, one-tusked destroyer of obstacles, son of Shiva, auspicious giver of boons.",
    meaning: "लंबोदर, एकदंत, विघ्ननाशक शिवपुत्राला नमस्कार.",
  },
  {
    number: 11,
    label: "फलश्रुती · ११",
    original:
      "एतदथर्वशीर्ष योऽधीते स ब्रह्मभूयाय कल्पते।\nस सर्वविघ्नैर्न बाध्यते स सर्वतः सुखमेधते।\nस पंचमहापापात् प्रमुच्यते।\nसायमधीयानो दिवसकृतं पापं नाशयति।\nप्रातरधीयानो रात्रिकृतं पापं नाशयति।\nसायंप्रातः प्रयुञ्जानो अपापो भवति।\nसर्वत्राधीयानोऽपविघ्नो भवति।\nधर्मार्थकाममोक्षं च विंदति।\nइदम् अथर्वशीर्षमशिष्याय न देयम्।\nयो यदि मोहाद् दास्यति स पापीयान् भवति।\nसहस्रावर्तनात् यं यं काममधीते तं तमनेन साधयेत् ॥११॥",
    english:
      "The text says that studying this Atharvashirsha prepares one for Brahman, removes obstacles and the five great sins, and brings well-being. Evening study removes the day’s wrongs; morning study the night’s. Practice morning and evening brings freedom from wrongdoing, and study everywhere freedom from obstacles, with dharma, prosperity, desire, and liberation. It cautions against giving this teaching to an unprepared pupil and describes a thousand recitations for the intended wish.",
    meaning: "येथून फलश्रुती सुरू होते. फळांचे वर्णन हे मूळ ग्रंथातील धार्मिक विधान आहे.",
  },
  {
    number: 12,
    original:
      "अनेन गणपतिमभिषिञ्चति\nस वाग्मी भवति। चतुर्थ्यामनश्नन् जपति।\nस विद्यावान् भवति। इत्यथर्वणवाक्यम्।\nब्रह्माद्यावरणं विद्यात्।\nन बिभेति कदाचनेति ॥१२॥",
    english:
      "The text says that one who anoints Ganapati with this recitation becomes eloquent; one who recites while fasting on Chaturthi becomes learned. Such is Atharvan’s statement. Know the covering beginning with Brahman; one does not fear at any time.",
    meaning: "अभिषेक, चतुर्थीचा जप आणि विद्येविषयी पुस्तकातील फलश्रुती.",
  },
  {
    number: 13,
    original:
      "यो दूर्वाङ्कुरैर्यजति। स वैश्रवणोपमो भवति। यो लाजैर्यजति।\nस यशोवान् भवति। स मेधावान् भवति।\nयो मोदकसहस्रेण यजति। स वाञ्छितफलमवाप्नोति।\nयः साज्यसमिद्भिर्यजति। स सर्वं लभते स सर्वं लभते॥१३॥",
    english:
      "The text says that worship with durva shoots brings prosperity like Vaishravana; with parched grain, fame and intelligence; with a thousand modakas, the desired fruit; and with ghee-soaked fuel sticks, attainment of all.",
    meaning: "दूर्वा, लाह्या, मोदक आणि तुपातील समिधा यांच्या अर्पणाचे ग्रंथात सांगितलेले फळ.",
  },
  {
    number: 14,
    original:
      "अष्टौ ब्राह्मणान् सम्यग् ग्राहयित्वा सूर्यवर्चस्वी भवति।\nसूर्यग्रहे महानद्यां प्रतिमासंनिधौ वा जप्त्वा।\nसिद्धमन्त्रो भवति। महाविघ्नात् प्रमुच्यते। महादोषात् प्रमुच्यते। महापापात् प्रमुच्यते।\nस सर्वविद् भवति स सर्वविद् भवति य एवं वेद। इत्युपनिषत्॥१४॥",
    english:
      "The text describes teaching eight Brahmins properly as conferring radiance like the sun. Reciting during a solar eclipse, in a great river, or near the deity’s image is said to perfect the mantra and free one from great obstacles, faults, and sins. Whoever knows thus becomes a knower of all. Thus ends the Upanishad.",
    meaning: "आठ ब्राह्मणांना शिकविणे आणि जपाचे फलवर्णन; येथे उपनिषदाची समाप्ती.",
  },
  {
    number: 15,
    label: "समापन शान्तिपाठ",
    original:
      "ॐ सह नाववतु। सह नौ भुनक्तु सहवीर्यं करवावहै ।\nतेजस्वि नावधीतमस्तु । मा विद्विषावहै ।\nॐ शान्तिः शान्तिः शान्तिः ॥",
    english:
      "May we both be protected and nourished. May we work together with strength. May our study be radiant. May we not hate one another. Om, peace, peace, peace.",
    meaning: "पान १० वरील समापन शान्तिपाठ; हा क्रमांकित मंत्र नाही.",
  },
];

export const GANAPATI_BOOKLET_VERSES: AartiVerse[] = entries.map((entry) => ({
  ...entry,
  iast: transliterateToIast(entry.original),
}));
