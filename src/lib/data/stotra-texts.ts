export interface Verse {
  number: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
}

export interface StotraTextData {
  id: string;
  name: string;
  sanskrit: string;
  deity: string;
  description: string;
  audioUrl: string;
  verses: Verse[];
}

export const STOTRA_TEXTS: Record<string, StotraTextData> = {
  "hanuman-chalisa": {
    id: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    sanskrit: "हनुमान चालीसा",
    deity: "Hanuman",
    description: "The 40-verse hymn praising Lord Hanuman, composed by Goswami Tulsidas.",
    audioUrl:
      "https://archive.org/download/hanuman-chalisa-i-gulshan-kumar-i-hariharan-full-hd-video-i-shree-hanuman-chalisa/%E0%A4%B9%E0%A4%A8%E0%A4%AE%E0%A4%A8%20%E0%A4%9A%E0%A4%B2%E0%A4%B8%20Hanuman%20Chalisa%20I%20GULSHAN%20KUMAR%20I%20HARIHARAN%2C%20Full%20HD%20Video%20I%20Shree%20Hanuman%20Chalisa.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।\nबरनउं रघूबर बिमल जसु जो दायकु फल चारि ॥",
        transliteration:
          "śrīguru carana saroja raja nija manu mukuru sudhāri |\nbaranauṃ raghubara bimala jasu jo dāyaku phala cāri ||",
        translation:
          "Having cleansed the mirror of my mind with the dust of my Guru's lotus feet, I sing the pure glory of the greatest of the Raghu dynasty (Rama), which bestows the four fruits of life (Dharma, Artha, Kama, Moksha).",
      },
      {
        number: 2,
        sanskrit:
          "बुद्धिहीन तनु जानिके सुमिरौ पवन-कुमार ।\nबल बुधि बिद्या देहु मोहि हरहु कलेस बिकार ॥",
        transliteration:
          "buddhihīna tanu jānike sumirau pavana-kumāra |\nbala budhi bidyā dehu mohi harahu kalesa bikāra ||",
        translation:
          "Knowing myself to be devoid of intelligence, I remember the Son of Wind (Hanuman). Please grant me strength, wisdom, and knowledge, and remove all my miseries and impurities.",
      },
      {
        number: 3,
        sanskrit: "जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुं लोक उजागर ॥",
        transliteration: "jaya hanumāna jñāna guna sāgara | jaya kapīsa tihuṃ loka ujāgara ||",
        translation:
          "Victory to Hanuman, who is an ocean of wisdom and virtue. Victory to the Lord of Monkeys, who enlightens the three worlds.",
      },
      {
        number: 4,
        sanskrit: "राम दूत अतुलित बल धामा । अंजनि-पुत्र पवनसुत नामा ॥",
        transliteration: "rāma dūta atulita bala dhāmā | añjani-putra pavanasuta nāmā ||",
        translation:
          "Messenger of Lord Rama, the abode of incomparable power, son of Mother Anjani, you are known as the Son of the Wind.",
      },
      {
        number: 5,
        sanskrit: "महाबीर बिक्रम बजरंगी । कुमति निवार सुमति के संगी ॥",
        transliteration: "mahābīra bikrama bajaraṅgī | kumati nivāra sumati ke saṅgī ||",
        translation:
          "O great hero of exceptional valor, with limbs as strong as thunderbolt, you dispel evil thoughts and associate with the wise.",
      },
      {
        number: 6,
        sanskrit: "कंचन बरन बिराज सुबेसा । कानन कुंडल कुंचित केसा ॥",
        transliteration: "kañcana barana birāja subesā | kānana kuṃḍala kuṃcita kesā ||",
        translation:
          "Having a golden complexion, you are beautifully adorned with earrings and curly hair.",
      },
      {
        number: 7,
        sanskrit: "हाथ बज्र औ ध्वजा बिराजै । कांधे मूंज जनेऊ साजै ॥",
        transliteration: "hātha bajra au dhvajā birājai | kāṃdhe mūṃja janeū sājai ||",
        translation:
          "In your hands shine a thunderbolt and a flag, while a sacred thread of munja grass adorns your shoulder.",
      },
      {
        number: 8,
        sanskrit: "शंकर सुवन केसरीनंदन । तेज प्रताप महा जग बंदन ॥",
        transliteration: "śaṅkara suvana kesarīnandana | teja pratāpa mahā jaga bandana ||",
        translation:
          "Reincarnation of Lord Shiva and son of Kesari, your radiant glory is worshipped by the entire world.",
      },
      {
        number: 9,
        sanskrit: "बिद्यावान गुनी अति चातुर । राम काज करिबे को आतुर ॥",
        transliteration: "bidyāvāna gunī ati cātura | rāma kāja karibe ko ātura ||",
        translation:
          "You are highly learned, virtuous, and wise, always eager to perform the works of Lord Rama.",
      },
      {
        number: 10,
        sanskrit: "प्रभु चरित्र सुनिबे को रसिया । राम लखन सीता मन बसिया ॥",
        transliteration: "prabhu caritra sunibe ko rasiyā | rāma lakhana sītā mana basiyā ||",
        translation:
          "You delight in listening to the stories of the Lord. Rama, Lakshmana, and Sita reside in your heart.",
      },
      {
        number: 11,
        sanskrit: "सूक्ष्म रूप धरि सियहिं दिखावा । बिकट रूप धरि लंक जरावा ॥",
        transliteration: "sūkṣma rūpa dhari siyahiṃ dikhāvā | bikaṭ rūpa dhari laṅka jarāvā ||",
        translation:
          "You appeared before Sita in a tiny form, but assumed a colossal form to burn down the city of Lanka.",
      },
      {
        number: 12,
        sanskrit: "भीम रूप धरि असुर संहारे । रामचंद्र के काज सवारे ॥",
        transliteration: "bhīma rūpa dhari asura saṃhāre | rāmacaṃdra ke kāja savāre ||",
        translation:
          "Assuming a gigantic form, you destroyed the demons and successfully executed Lord Rama's tasks.",
      },
      {
        number: 13,
        sanskrit: "लाय सजीवन लखन जियाये । श्रीरघुबीर हरषि उर लाये ॥",
        transliteration: "lāya sajīvana lakhana jiyāye | śrīraghubīra haraṣi ura lāye ||",
        translation:
          "You brought the Sanjeevani herb and revived Lakshmana. Lord Rama embraced you joyfully in deep affection.",
      },
      {
        number: 14,
        sanskrit: "रघुपति कीन्ही बहुत बड़ाई । तुम मम प्रिय भरतहि सम भाई ॥",
        transliteration: "raghupati kīnhī bahuta baḍāī | tuma mama priya bharatahi sama bhāī ||",
        translation:
          "The Lord of Raghus praised you highly, saying: 'You are as dear to me as my brother Bharata.'",
      },
      {
        number: 15,
        sanskrit: "सहस बदन तुम्हरो जस गावैं । अस कहि श्रीपति कंठ लगावैं ॥",
        transliteration: "sahasa badana tumharo jasa gāvaiṃ | asa kahi śrīpati kaṃṭha lagāvaiṃ ||",
        translation:
          "'May the thousand-mouthed Shesha sing your glory,' saying this, the Lord of Lakshmi (Rama) embraced you.",
      },
      {
        number: 16,
        sanskrit: "सनकादिक ब्रह्मादि मुनीसा । नारद सारद सहित अहीसा ॥",
        transliteration: "sanakādika brahmādi munīsā | nārada sārada sahita ahīsā ||",
        translation:
          "Sages like Sanaka, Brahma, Narada, Saraswati, and Sheshanaga sing your praise.",
      },
      {
        number: 17,
        sanskrit: "जम कुबेर दिगपाल जहां ते । कबि कोबिद कहि सके कहां ते ॥",
        transliteration: "jama kubera digapāla jahāṃ te | kabi kobida kahi sake kahāṃ te ||",
        translation:
          "Yama, Kubera, and the guardians of directions, as well as poets and scholars, fail to describe your glory adequately.",
      },
      {
        number: 18,
        sanskrit: "तुम उपकार सुग्रीवहिं कीन्हा । राम मिलाय राज पद दीन्हा ॥",
        transliteration: "tuma upakāra sugrīvahiṃ kīnhā | rāma milāya rāja pada dīnhā ||",
        translation:
          "You rendered great service to Sugreeva by introducing him to Rama and securing his royal throne.",
      },
      {
        number: 19,
        sanskrit: "तुम्हरो मंत्र बिभीषन माना । लंकेस्वर भए सब जग जाना ॥",
        transliteration: "tumharo maṃtra bibhīṣana mānā | laṅkesvara bhae saba jaga jānā ||",
        translation:
          "Vibhishana followed your advice and became the king of Lanka, as the whole world knows.",
      },
      {
        number: 20,
        sanskrit: "जुग सहस्र जोजन पर भानू । लील्यो ताहि मधुर फल जानू ॥",
        transliteration: "juga sahasra jojana para bhānū | līlyo tāhi madhura phala jānū ||",
        translation:
          "The sun was thousands of leagues away, yet you leaped and swallowed it, thinking it to be a sweet fruit.",
      },
      {
        number: 21,
        sanskrit: "प्रभु मुद्रिका मेलि मुख माहीं । जलधि लांघि गये अचरज नाहीं ॥",
        transliteration: "prabhu mudrikā meli mukha māhīṃ | jaladhi lāṅghi gaye acaraja nāhīṃ ||",
        translation:
          "Placing the Lord's ring in your mouth, you leaped across the ocean; this was no surprise for you.",
      },
      {
        number: 22,
        sanskrit: "दुर्गम काज जगत के जेते । सुगम अनुग्रह तुम्हरे तेते ॥",
        transliteration: "durgama kāja jagata ke jete | sugama amugraha tumhare tete ||",
        translation: "All difficult tasks in this world become easy by your grace.",
      },
      {
        number: 23,
        sanskrit: "राम दुआरे तुम रखवारे । होत न आग्या बिनु पैसारे ॥",
        transliteration: "rāma duāre tuma rakhavāre | hota na āgyā binu paisāre ||",
        translation:
          "You are the sentinel at the gateway of Rama's abode. No one can enter without your permission.",
      },
      {
        number: 24,
        sanskrit: "सब सुख लहै तुम्हारी सरना । तुम रक्षक काहू को डरना ॥",
        transliteration: "saba sukha lahai tumhārī saranā | tuma rakṣaka kāhū ko daranā ||",
        translation:
          "All happiness is obtained in your refuge. With you as our protector, what is there to fear?",
      },
      {
        number: 25,
        sanskrit: "आपन तेज सम्हारो आपै । तीनों लोक हांक तें कांपै ॥",
        transliteration: "āpana teja samhāro āpai | tīnoṃ loka hāṃka teṃ kāṃpai ||",
        translation:
          "You alone can control your immense radiance. The three worlds tremble when you roar.",
      },
      {
        number: 26,
        sanskrit: "भूत पिसाच निकट नहिं आवै । महाबीर जब नाम सुनावै ॥",
        transliteration: "bhūta pisāca nikaṭa nahiṃ āvai | mahābīra jaba nāma sunāvai ||",
        translation:
          "Ghosts and evil spirits do not venture near when your name, Mahabira, is chanted.",
      },
      {
        number: 27,
        sanskrit: "नासै रोग हरै सब पीरा । जपत निरंतर हनुमत बीरा ॥",
        transliteration: "nāsai roga harai saba pīrā | japata niraṃtara hanumata bīrā ||",
        translation:
          "All diseases are destroyed and all pains removed by constantly chanting the name of the brave Hanuman.",
      },
      {
        number: 28,
        sanskrit: "संकट तें हनुमान छुड़ावै । मन क्रम बचन ध्यान जो लावै ॥",
        transliteration: "saṅkaṭa teṃ hanumāna chuḍāvai | mana krama bacana dhyāna jo lāvai ||",
        translation:
          "Hanuman delivers from all distress those who contemplate him in thought, word, and deed.",
      },
      {
        number: 29,
        sanskrit: "सब पर राम तपस्वी राजा । तिन के काज सकल तुम साजा ॥",
        transliteration: "saba para rāma tapasvī rājā | tina ke kāja sakala tuma sājā ||",
        translation: "Lord Rama is the ascetic king supreme, yet you accomplished all his tasks.",
      },
      {
        number: 30,
        sanskrit: "और मनोरथ जो कोई लावै । सोइ अमित जीवन फल पावै ॥",
        transliteration: "aura manoratha jo koī lāvai | soi amita jīvana phala pāvai ||",
        translation:
          "Whoever brings any sincere desire before you attains the limitless fruit of life.",
      },
      {
        number: 31,
        sanskrit: "चारों जुग परताप तुम्हारा । है परसिद्ध जगत उजियारा ॥",
        transliteration: "cāroṃ juga paratāpa tumhārā | hai parasiddha jagata ujiyārā ||",
        translation:
          "Your glory shines across all four cosmic ages, and your light is famous throughout the universe.",
      },
      {
        number: 32,
        sanskrit: "साधु संत के तुम रखवारे । असुर निकंदन राम दुलारे ॥",
        transliteration: "sādhu saṃta ke tuma rakhavāre | asura nikaṃdana rāma dulāre ||",
        translation:
          "You are the protector of saints and sages, the destroyer of demons, and the beloved of Rama.",
      },
      {
        number: 33,
        sanskrit: "अष्ट सिद्धि नौ निधि के दाता । अस बर दीन जानकी माता ॥",
        transliteration: "aṣṭa siddhi nau nidhi ke dātā | asa bara dīna jānakī mātā ||",
        translation:
          "You are the bestower of the eight supernatural powers and nine treasures, as blessed by Mother Janaki.",
      },
      {
        number: 34,
        sanskrit: "राम रसायन तुम्हरे पासा । सदा रहो रघुपति के दासा ॥",
        transliteration: "rāma rasāyana tumhare pāsā | sadā raho raghupati ke dāsā ||",
        translation:
          "You possess the healing elixir of Rama's devotion; may you always remain the servant of the Lord of Raghus.",
      },
      {
        number: 35,
        sanskrit: "तुम्हरे भजन राम को पावै । जनम जनम के दुख बिसरावै ॥",
        transliteration: "tumhare bhajana rāma ko pāvai | janama janama ke dukha bisarāvai ||",
        translation:
          "Through devotion to you, one finds Rama and escapes the suffering of many births.",
      },
      {
        number: 36,
        sanskrit: "अंत काल रघुबर पुर जाई । जहां जन्म हरि-भक्त कहाई ॥",
        transliteration: "aṃta kāla raghubara pura jāī | jahāṃ janma hari-भक्त कहाई ||",
        translation:
          "At the end of life, such a devotee goes to the divine abode of Rama, and is known as a devotee of Hari in subsequent births.",
      },
      {
        number: 37,
        sanskrit: "और देवता चित्त न धरई । हनुमत सेइ सर्ब सुख करई ॥",
        transliteration: "aura devatā citta na dharaī | hanumata sei sarba sukha karaī ||",
        translation:
          "Without harboring any other deity in mind, serving Hanuman alone yields all happiness.",
      },
      {
        number: 38,
        sanskrit: "संकट कटै मिटै सब पीरा । जो सुमिरै हनुमत बलबीरा ॥",
        transliteration: "saṅkaṭa kaṭai miṭai saba pīra | jo sumirai hanumata balabīrā ||",
        translation:
          "Difficulties vanish and all pain is erased for those who remember the strong and brave Hanuman.",
      },
      {
        number: 39,
        sanskrit: "जय जय जय हनुमान गोसाईं । कृपा करहु गुरुदेव की नाईं ॥",
        transliteration: "jaya jaya jaya hanumāna gosāīṃ | kṛpā karahu gurudeva kī nāīṃ ||",
        translation:
          "Victory, victory, victory to Lord Hanuman! Bless me in the manner of a divine spiritual preceptor.",
      },
      {
        number: 40,
        sanskrit: "जो सत बार पाठ कर कोई । छूटहि बंदि महा सुख होई ॥",
        transliteration: "jo sata bāra pāṭha kara koī | chūṭahi baṃdi mahā sukha hoī ||",
        translation:
          "Whoever recites this one hundred times is freed from all bondage and experiences supreme bliss.",
      },
      {
        number: 41,
        sanskrit: "जो यह पढ़ै हनुमान चालीसा । होय सिद्धि साखी गौरीसा ॥",
        transliteration: "jo yaha paḍhai hanumāna cālīsā | hoya siddhi sākhī gaurīsā ||",
        translation:
          "Whoever reads this Hanuman Chalisa attains success, as witnessed by Lord Shiva (consort of Gauri).",
      },
      {
        number: 42,
        sanskrit: "तुलसीदास सदा हरि चेरा । कीजै नाथ हृदय मंह डेरा ॥",
        transliteration: "tulasīdāsa sadā hari cerā | kījai nātha hṛdaya maṃha ḍerā ||",
        translation:
          "Tulsidas is always the servant of Hari. O Lord, please make your dwelling in my heart.",
      },
      {
        number: 43,
        sanskrit: "पवनतनय संकट हरन मंगल मूरति रूप ।\nराम लखन सीता सहित हृदय बसहु सुर भूप ॥",
        transliteration:
          "pavanatanaya saṅkaṭa harana maṅgala mūrati rūpa |\nrāma lakhana sītā sahita hṛdaya basahu sura bhūpa ||",
        translation:
          "O Son of Wind, destroyer of difficulties, embodiment of auspiciousness! Please dwell in my heart along with Rama, Lakshmana, and Sita, O King of Gods.",
      },
    ],
  },
  "ganesha-aarti": {
    id: "ganesha-aarti",
    name: "Ganesha Aarti (Sukhakarta Dukhaharta)",
    sanskrit: "गणेश आरती (सुखकर्ता दुखहर्ता)",
    deity: "Ganesha",
    description:
      "The traditional Marathi Aarti praising Lord Ganesha, written by Saint Samarth Ramdas.",
    audioUrl:
      "https://archive.org/download/01-shri-ganpati-chi-aarti/01%20shri%20ganpati%20chi%20aarti.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "सुखकर्ता दुखहर्ता वार्ता विघ्नाची । नुरवी पूर्वी प्रेम कृपा जयाची ॥\nसर्वांगी सुंदर उटी शेंदुराची । कंठी झळके माळ मुक्ताफळांची ॥\nजय देव जय देव जय मंगलमूर्ती । दर्शनमात्रे मनकामना पुरती ॥",
        transliteration:
          "sukhakartā dukhahartā vārtā vighnācī | nuravī pūrvī prema kṛpā jayācī ||\nsarvāṅgī sundara uṭī śendurācī | kaṇṭhī jhaḷake māḷa muktāphaḷāñcī ||\njaya deva jaya deva jaya maṅgalamūrtī | darśanamātre manakāmanā puratī ||",
        translation:
          "Lord Ganesha is the creator of happiness and destroyer of sorrows, who dispels all obstacles. He fills us with love and grace. His beautiful body is anointed with red vermilion, and a pearl necklace shines around his neck. Victory to the Lord, victory to the auspicious form, whose mere sight fulfills all desires.",
      },
      {
        number: 2,
        sanskrit:
          "रत्नखचित फरा तूज गौरीकुमरा । चंदनाची उटी कुमकुमकेशरा ॥\nहीरेजडित मुकुट शोभतो बरा । रुणझुणती नुपुरे चरणी घागरिया ॥\nजय देव जय देव जय मंगलमूर्ती । दर्शनमात्रे मनकामना पुरती ॥",
        transliteration:
          "ratnakhacita pharā tūja gaurīkumarā | candanācī uṭī kumakumakeśarā ||\nhīrejadita mukuṭa śobhato barā | ruṇajuṇatī nupure caraṇī ghāgariyā ||\njaya deva jaya deva jaya maṅgalamūrtī | darśanamātre manakāmanā puratī ||",
        translation:
          "O Son of Gauri, you wear a jewel-studded pedestal. You are anointed with sandalwood paste, saffron, and vermilion. A crown studded with diamonds sits beautifully on your head, and anklets make a sweet jingling sound at your feet. Victory to the Lord, victory to the auspicious form, whose mere sight fulfills all desires.",
      },
      {
        number: 3,
        sanskrit:
          "लंबोदर पीतांबर फणिवरबंधना । सरळ सोंड वक्रतुंड त्रिनयना ॥\nदास रामाचा वाट पाहे सदना । संकटी पावावे निर्वाणी रक्षावे सुरवरवंदना ॥\nजय देव जय देव जय मंगलमूर्ती । दर्शनमात्रे मनकामना पुरती ॥",
        transliteration:
          "laṃbodara pītāmbara phaṇivarabandhanā | saraḷa soṃḍa vakratuṇḍa trinayanā ||\ndāsa rāmācā vāṭa pāhe sadanā | saṅkaṭī pāvāve nirvāṇī rakṣāve suravaravandanā ||\njaya deva jaya deva jaya maṅgalamūrtī | darśanamātre manakāmanā puratī ||",
        translation:
          "You have a large belly, wear yellow silk clothes, and have a serpent tied around your waist. You have a straight trunk, a curved face, and three eyes. The servant Ramdas awaits you at his home. O worshipful Lord of gods, rescue me in times of trouble and protect me at the moment of final departure. Victory to the Lord, victory to the auspicious form, whose mere sight fulfills all desires.",
      },
    ],
  },
  "shiva-aarti": {
    id: "shiva-aarti",
    name: "Shiva Aarti (Om Jai Shiv Omkara)",
    sanskrit: "शिव आरती (ॐ जय शिव ओंकारा)",
    deity: "Shiva",
    description:
      "The traditional Hindi Aarti dedicated to Lord Shiva, honoring his cosmic form and attributes.",
    audioUrl: "https://archive.org/download/om-jai-shiv-omkara/Om%20Jai%20Shiv%20Omkara.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा ।\nब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "om jai shiv omkārā, svāmī jai shiv omkārā |\nbrahmā, viṣṇu, sadāśiv, arddhāṅgī dhārā || om jai shiv omkārā ||",
        translation:
          "Glory to Lord Shiva, the embodiment of the sacred syllable Om! Lord of all, Brahma, Vishnu, and Shiva are one, and Parvati resides as his half-form.",
      },
      {
        number: 2,
        sanskrit: "एकानन चतुरानन पंचानन राजे ।\nहंसानन गरुड़ासन वृषवाहन साजे ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "ekānan caturānan pañcānan rāje |\nhansānan garuḍāsan vṛṣavāhan sāje || om jai shiv omkārā ||",
        translation:
          "You appear with one face (Vishnu), four faces (Brahma), and five faces (Shiva). The swan (Brahma's vehicle), Garuda (Vishnu's vehicle), and Nandi the Bull (Shiva's vehicle) are all beautifully adorned.",
      },
      {
        number: 3,
        sanskrit:
          "दो भुज चार चतुर्भुज दस भुज अति सोहे ।\nत्रिगुण रूप निरखते त्रिभुवन जन मोहे ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "do bhuj cār caturbhuj das bhuj ati sohe |\ntriguṇ rūp nirakhate tribhuvan jan mohe || om jai shiv omkārā ||",
        translation:
          "Adorned with two, four, or ten arms, you look highly majestic. Looking at your forms possessing the three cosmic qualities (Sattva, Rajas, Tamas), the inhabitants of all three worlds are enchanted.",
      },
      {
        number: 4,
        sanskrit:
          "अक्षमाला वनमाला मुण्डमाला धारी ।\nत्रिपुरारी कंसारी कर माला धारी ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "akṣamālā vanamālā muṇḍamālā dhārī |\ntripurārī kansārī kar mālā dhārī || om jai shiv omkārā ||",
        translation:
          "You wear a rosary of Rudraksha, a garland of forest flowers, and a necklace of skulls. O destroyer of Tripura and Kansa, you hold a sacred rosary in your hands.",
      },
      {
        number: 5,
        sanskrit:
          "श्वेताम्बर पीताम्बर बाघम्बर अंगे ।\nसनकादिक गरुणादिक भूतादिक संगे ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "śvetāmbar pītāmbar bāghambar aṅge |\nsanakādik garuṇādik bhūtādik saṅge || om jai shiv omkārā ||",
        translation:
          "Your body is clad in white robes, yellow silks, and tiger skin. Sages like Sanaka, divine beings like Garuda, and spirits are always in your company.",
      },
      {
        number: 6,
        sanskrit:
          "कर के मध्य कमण्डलु चक्र त्रिशूल धर्ता ।\nजगकर्ता जगभर्ता जग संहारकर्ता ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "kar ke madhya kamaṇḍalu cakra triśūl dhartā |\njagakartā jagabhartā jag saṃhārakartā || om jai shiv omkārā ||",
        translation:
          "In your hands you hold the Kamandalu (water pot), Chakra (discus), and Trishul (trident). You are the Creator, Preserver, and Destroyer of the universe.",
      },
      {
        number: 7,
        sanskrit:
          "ब्रह्मा, विष्णु, सदाशिव, जानत अविवेका ।\nप्रणवाक्षर मध्य ये तीनों एका ॥ ॐ जय शिव ओंकारा ॥",
        transliteration:
          "brahmā, viṣṇu, sadāśiv, jānat avivekā |\npraṇavākṣar madhya ye tīnoṃ ekā || om jai shiv omkārā ||",
        translation:
          "Brahma, Vishnu, and Shiva seem separate to the ignorant, but in the heart of the sacred letter 'Om', all three are one.",
      },
    ],
  },
  "lakshmi-aarti": {
    id: "lakshmi-aarti",
    name: "Lakshmi Aarti (Om Jai Lakshmi Mata)",
    sanskrit: "लक्ष्मी आरती (ॐ जय लक्ष्मी माता)",
    deity: "Lakshmi",
    description:
      "The beloved Aarti dedicated to Mother Lakshmi, sung for prosperity, wisdom, and well-being.",
    audioUrl: "https://archive.org/download/OmJaiLakshmiMata_201807/Om%20Jai%20Lakshmi%20Mata.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता ।\nतुमको निशदिन सेवत, हरि विष्णु विधाता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "om jai lakṣmī mātā, maiyā jai lakṣmī mātā |\ntumko niśidin sevat, hari viṣṇu vidhātā || om jai lakṣmī mātā ||",
        translation:
          "Glory to Mother Lakshmi! Goddess of fortune, you are served day and night by Lord Vishnu and Lord Brahma.",
      },
      {
        number: 2,
        sanskrit:
          "उमा, रमा, ब्रह्माणी, तुम ही जग-माता ।\nसूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "umā, ramā, brahmāṇī, tum hī jag-mātā |\nsūrya-candramā dhyāvat, nārad ṛṣi gātā || om jai lakṣmī mātā ||",
        translation:
          "You are the forms of Uma (Parvati), Rama (Lakshmi), and Brahmani (Saraswati), and you are the Mother of the Universe. The Sun and Moon meditate on you, and Sage Narada sings your glories.",
      },
      {
        number: 3,
        sanskrit:
          "दुर्गा रूप निरंजनी, सुख-सम्पति दाता ।\nजो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "durgā rūp nirañjanī, sukh-sampati dātā |\njo koī tumko dhyāvat, ṛddhi-siddhi dhan pātā || om jai lakṣmī mātā ||",
        translation:
          "You are Durga, pure and untouched by worldliness, the giver of happiness and wealth. Whoever meditates on you obtains success, wisdom, and prosperity.",
      },
      {
        number: 4,
        sanskrit:
          "जिस घर में तुम रहतीं, सब सद्गुण आता ।\nसब सम्भव हो जाता, मन नहीं घबराता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "jis ghar meṃ tum rahtī, sab sadguṇ ātā |\nsab sambhav ho jātā, man nahīṃ ghabrātā || om jai lakṣmī mātā ||",
        translation:
          "All good virtues enter the home in which you reside. Everything becomes possible, and the mind is freed from anxiety.",
      },
      {
        number: 5,
        sanskrit:
          "तुम बिन यज्ञ न होते, वस्त्र न कोई पाता ।\nखान-पान का वैभव, सब तुमसे आता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "tum bin yagya na hote, vastra na koī pātā |\nkhān-pān kā vaibhav, sab tumse ātā || om jai lakṣmī mātā ||",
        translation:
          "Without you, no sacred rituals (Yagya) can succeed, and no one can acquire garments. All the abundance of food and drink comes from you alone.",
      },
      {
        number: 6,
        sanskrit:
          "शुभ-गुण मन्दिर सुन्दर, क्षीरोदधि-जाता ।\nरत्न चतुर्दश तुम बिन, कोई नहीं पाता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "śubh-guṇ mandir sundar, kṣīrodadhi-jātā |\nratna caturdaś tum bin, koī nahīṃ pātā || om jai lakṣmī mātā ||",
        translation:
          "You are the beautiful temple of auspicious qualities, born of the Ocean of Milk. Without your grace, no one can obtain the fourteen precious gems of life.",
      },
      {
        number: 7,
        sanskrit:
          "महालक्ष्मीजी की आरती, जो कोई नर गाता ।\nउर आनन्द समाता, पाप उतर जाता ॥ ॐ जय लक्ष्मी माता ॥",
        transliteration:
          "mahālakṣmījī kī āratī, jo koī nar gātā |\nur ānand samātā, pāp utar jātā || om jai lakṣmī mātā ||",
        translation:
          "Whoever sings this Aarti of Maha Lakshmi feels their heart fill with bliss, and all their sins are washed away.",
      },
    ],
  },
  "durga-aarti": {
    id: "durga-aarti",
    name: "Durga Aarti (Jai Ambe Gauri)",
    sanskrit: "दुर्गा आरती (जय अम्बे गौरी)",
    deity: "Durga",
    description:
      "The traditional Aarti dedicated to Goddess Durga, describing her divine victories over demons.",
    audioUrl: "https://archive.org/download/JaiAmbeGauriAarti/Jai%20Ambe%20Gauri%20Aarti.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "ॐ जय अम्बे गौरी, मैया जय श्यामा गौरी ।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "om jai ambe gaurī, maiyā jai śyāmā gaurī |\ntumko niśidin dhyāvat, hari brahmā śivarī || om jai ambe gaurī ||",
        translation:
          "Victory to Mother Durga (Ambe), the fair one, and Shyama, the dark goddess! Lord Vishnu, Brahma, and Shiva meditate upon you day and night.",
      },
      {
        number: 2,
        sanskrit:
          "मांग सिंदूर विराजत, टीको मृगमद को ।\nउज्जवल से दोउ नैना, चन्द्रवदन नीको ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "māṅg siṃdūr virājat, ṭīko mṛgamad ko |\nujjaval se dou nainā, candravadan nīko || om jai ambe gaurī ||",
        translation:
          "Red vermilion adorns the parting of your hair, and a musk tilak is on your forehead. Your two eyes are bright, and your moon-like face is beautiful.",
      },
      {
        number: 3,
        sanskrit:
          "केहरि वाहन राजत, खड्ग खप्परधारी ।\nसुर-नर-मुनि-जन सेवत, तिनके दुखहारी ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "kehari vāhan rājat, khaḍga khapparadhārī |\nsur-nar-muni-jan sevat, tinake dukhahārī || om jai ambe gaurī ||",
        translation:
          "You ride a lion and hold a sword and a skull-cup in your hands. Gods, humans, and sages serve you, and you take away their sorrows.",
      },
      {
        number: 4,
        sanskrit:
          "शुम्भ-निशुम्भ बिदारे, महिषासुर घाती ।\nधूम्र विलोचन नैना, निशिदिन मदमाती ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "śumbh-niśumbh bidāre, mahiṣāsur ghātī |\ndhūmra vilocan nainā, niśidin madamātī || om jai ambe gaurī ||",
        translation:
          "You tore apart the demons Shumbha and Nishumbha, and slew Mahishasura. Your eyes are like those of the destroyer of Dhumralochana, intoxicated with divine power.",
      },
      {
        number: 5,
        sanskrit:
          "चण्ड-मुण्ड संहारे, शोणित बीज हरे ।\nमधु-कैटभ दोउ मारे, सुर भयहीन करे ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "caṇḍ-muṇḍ saṃhāre, śoṇit bīj hare |\nmadhu-kaiṭabh dou māre, sur bhayahīn kare || om jai ambe gaurī ||",
        translation:
          "You destroyed Chanda and Munda, and consumed the blood of Raktabija. You killed the twin demons Madhu and Kaitabha, making the gods free from fear.",
      },
      {
        number: 6,
        sanskrit:
          "ब्रह्माणी, रुद्राणी, तुम कमला रानी ।\nआगम-निगम बखानी, तुम शिव पटरानी ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "brahmāṇī, rudrāṇī, tum kamalā rānī |\nāgam-nigam bakhānī, tum śiv paṭarānī || om jai ambe gaurī ||",
        translation:
          "You are Brahmani (Saraswati), Rudrani (Parvati), and Queen Kamala (Lakshmi). The scriptures describe your glories; you are the chief consort of Lord Shiva.",
      },
      {
        number: 7,
        sanskrit:
          "श्री अम्बेजी की आरती, जो कोई नर गावै ।\nकहत शिवानन्द स्वामी, सुख सम्पत्ति पावै ॥ ॐ जय अम्बे गौरी ॥",
        transliteration:
          "śrī ambejī kī āratī, jo koī nar gāvai |\nkahat śivānand svāmī, sukh sampatti pāvai || om jai ambe gaurī ||",
        translation:
          "Whoever sings this Aarti of Mother Durga, Swami Shivananda says, they will surely attain happiness and prosperity.",
      },
    ],
  },
  "krishna-aarti": {
    id: "krishna-aarti",
    name: "Krishna Aarti (Aarti Kunj Bihari Ki)",
    sanskrit: "कृष्ण आरती (आरती कुंजबिहारी की)",
    deity: "Krishna",
    description:
      "The beautiful Hindi Aarti dedicated to Lord Krishna, describing his form, music, and Vrindavan pastimes.",
    audioUrl: "https://archive.org/download/aarti-kunj-bihari-ki/Aarti%20Kunj%20Bihari%20Ki.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥\nगले में बैजंती माला, बजावै मुरली मधुर बाला ।\nश्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला ॥",
        transliteration:
          "āratī kuñjabihārī kī, śrī giridhara kṛṣṇa murārī kī ||\ngale meṃ baijaṃtī mālā, bajāvai muralī madhura bālā |\nśravaṇa meṃ kuṇḍala jhalakālā, naṃda ke ānaṃda naṃdalālā ||",
        translation:
          "We perform the Aarti of the one who wanders in the groves (Krishna), who held the mountain (Giridhar), the slayer of Mura. He wears a garland of Vaijanti flowers, plays his sweet flute, and his ear-studs shimmer. He is Nandalala, the joy of Nanda.",
      },
      {
        number: 2,
        sanskrit:
          "गगन सम अंग कांति काली, राधिका चमक रही आली ।\nलतन में ठाढ़े बनमाली; भ्रमर सी अलक, कस्तूरी तिलक, चन्द्र सी झलक;\nललित छवि श्यामा प्यारी की ॥ श्री गिरिधर कृष्ण मुरारी की ॥",
        transliteration:
          "gagana sama aṅga kāṃti kālī, rādhikā camaka rahī ālī |\nlatana meṃ ṭhāḍhe banamālī; bhramara sī alaka, kastūrī tilaka, candra sī jhalaka;\nlalita chabi śyāmā pyārī kī || śrī giridhara kṛṣṇa murārī kī ||",
        translation:
          "His dark complexion resembles the clouds, and Radha shines brightly beside him. He stands among the creeping vines, wearing a musk tilak and having hair curls like bees. Behold the beautiful form of our beloved Krishna!",
      },
      {
        number: 3,
        sanskrit:
          "कनकमय मोर मुकुट बिलसै, देवता दरसन को तरसैं ।\nगगन सों सुमन रासि बरसै; बजे मुरचंग, मधुर मिरदंग, ग्वालिन संग;\nअतुल रति गोप कुमारी की ॥ श्री गिरिधर कृष्ण मुरारी की ॥",
        transliteration:
          "kanakamaya mora mukuṭa bilasai, devatā darasana ko tarasaiṃ |\ngagana soṃ sumana rāsi barasai; baje muracaṅga, madhura miradaṅga, gvālina saṅga;\natula rati gopa kumārī kī || śrī giridhara kṛṣṇa murārī kī ||",
        translation:
          "His golden peacock crown shines beautifully, and even the gods yearn for a glimpse of him. Flowers rain down from the sky as sweet instruments play in the company of cowherd maidens (Gopis).",
      },
      {
        number: 4,
        sanskrit:
          "जहां ते प्रकट भई गंगा, कलुष कलि हारिणि श्रीगंगा ।\nस्मरन ते होत मोह भंगा; बसी सिव सीस, जटा के बीच, हरै अघ कीच;\nचरन छवि श्रीबनवारी की ॥ श्री गिरिधर कृष्ण मुरारी की ॥",
        transliteration:
          "jahāṃ te prakaṭa bhaī gaṃgā, kaluṣa kali hāriṇi śrīgaṃgā |\nsmarana te hota moha bhaṅgā; basī siva sīsa, jaṭā ke bīca, harai agha kīca;\ncarana chabi śrībanavārī kī || śrī giridhara kṛṣṇa murārī kī ||",
        translation:
          "The holy river Ganga, which destroys the sins of Kali Yuga, emerged from his feet. Remembering him breaks all attachments of illusion. She resides in Shiva's matted hair, cleansing all impurities of the world.",
      },
    ],
  },
  "gayatri-mantra": {
    id: "gayatri-mantra",
    name: "Gayatri Mantra",
    sanskrit: "गायत्री मन्त्र",
    deity: "Savitr (Solar Deity)",
    description:
      "The sacred mother of Vedic mantras, chanted for wisdom, light, and spiritual enlightenment.",
    audioUrl: "https://archive.org/download/GayatriMantra-TinaMaliaShimshai/01-GayatriMantra.mp3",
    verses: [
      {
        number: 1,
        sanskrit:
          "ॐ भूर्भुवः स्वः ।\nतत्सवितुर्वरेण्यं ।\nभर्गो देवस्य धीमहि ।\nधियो यो नः प्रचोदयात् ॥",
        transliteration:
          "oṃ bhūr bhuvaḥ svaḥ |\ntat savitur vareṇyaṃ |\nbhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||",
        translation:
          "We meditate on the adorable, supreme light of the divine sun (creator). May that divine light illuminate and guide our intellects in the right direction.",
      },
    ],
  },
  "ramaraksha-stotra": {
    id: "ramaraksha-stotra",
    name: "Ramaraksha Stotra",
    sanskrit: "रामरक्षा स्तोत्र",
    deity: "Rama",
    description:
      "The protective Sanskrit hymn dedicated to Lord Rama, composed by Sage Budha Kaushika.",
    audioUrl: "https://archive.org/download/ramraksha-stotra/ramraksha-stotra.mp3",
    verses: [
      {
        number: 1,
        sanskrit: "चरितं रघुनाथस्य शतकोटिप्रविस्तरम् ।\nएकैकमक्षरं पुंसां महापातकनाशनम् ॥",
        transliteration:
          "caritaṃ raghunāthasya śatakoṭipravistaram |\nekaikamakṣaraṃ puṃsāṃ mahāpātakanāśanam ||",
        translation:
          "The life story of Lord Rama is vast, containing a hundred crore (one billion) verses. Even a single letter of it is capable of destroying the greatest of human sins.",
      },
      {
        number: 2,
        sanskrit:
          "ध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम् ।\nजानकीलक्ष्मणोपेतं जटामुकुटमण्डितम् ॥",
        transliteration:
          "dhyātvā nīlotpalaśyāmaṃ rāmaṃ rājīvalocanam |\njānakīlakṣmaṇopetaṃ jaṭāmukuṭamaṇḍitam ||",
        translation:
          "Meditating on Rama, who is dark blue like a blue lotus, lotus-eyed, accompanied by Sita and Lakshmana, and adorned with a crown of matted hair.",
      },
      {
        number: 3,
        sanskrit:
          "सासितूणधनुर्बाणपाणिं नक्तंचरान्तकम् ।\nस्वलीलया जगत्त्रातुमाविर्भूतं अजं विभुम् ॥",
        transliteration:
          "sāsitūṇadhanurbāṇapāṇiṃ naktaṃcarāntakam |\nsvalīlayā jagattrātumāvirbhūtaṃ ajaṃ vibhum ||",
        translation:
          "Holding a sword, a quiver, and a bow and arrows, the destroyer of demons, who manifested through his own play to protect the world - the unborn, all-pervading Lord.",
      },
      {
        number: 4,
        sanskrit:
          "रामरक्षां पठेत्प्राज्ञः पापघ्नीं सर्वकामदाम् ।\nशिरो मे राघवः पातु भालं दशरथात्मजः ॥",
        transliteration:
          "rāmarakṣāṃ paṭhetprājñaḥ pāpaghnīṃ sarvakāmadām |\nśiro me rāghavaḥ pātu bhālaṃ daśarathātmajaḥ ||",
        translation:
          "The wise should recite the Ramaraksha Stotra, which destroys sins and fulfills all desires. May Raghava (Rama) protect my head, and the son of Dasharatha protect my forehead.",
      },
      {
        number: 5,
        sanskrit:
          "कौसल्येयो दृशौ पातु विश्वामित्रप्रियः श्रुती ।\nघ्राणं पातु मखत्राता मुखं सौमित्रिवत्सलः ॥",
        transliteration:
          "kausalyeyo dṛśau pātu viśvāmitrapriyaḥ śrutī |\nghrāṇaṃ pātu makhatrātā mukhaṃ saumitrivatsalaḥ ||",
        translation:
          "May the son of Kausalya protect my eyes, and he who is dear to Vishvamitra protect my ears. May the protector of sacrifices protect my nose, and he who is affectionate to Lakshmana protect my face.",
      },
      {
        number: 6,
        sanskrit:
          "करौ सीतापतिः पातु हृदयं जामदग्न्यजित् ।\nमध्यं पातु खरध्वंसी नाभिं जाम्बवदाश्रयः ॥",
        transliteration:
          "karau sītāpatiḥ pātu hṛdayaṃ jāmadagnyajit |\nmadhyaṃ pātu kharadhvaṃsī nābhiṃ jāmbavadāśrayaḥ ||",
        translation:
          "May the Lord of Sita protect my hands, and the conqueror of Parashurama protect my heart. May the slayer of the demon Khara protect my torso, and the refuge of Jambavan protect my navel.",
      },
      {
        number: 7,
        sanskrit:
          "जानुनी सेतुकृत् पातु जङ्घे दशमुखान्तकः ।\nपादौ बिभीषणश्रीदः पातु रामोऽखिलं वपुः ॥",
        transliteration:
          "jānunī setukṛt pātu jaṅghe daśamukhāntakaḥ |\npādau bibhīṣaṇaśrīdaḥ pātu rāmo'khilaṃ vapuḥ ||",
        translation:
          "May the builder of the bridge protect my knees, and the destroyer of Ravana protect my shanks. May he who gave prosperity to Vibhishana protect my feet, and may Rama protect my entire body.",
      },
      {
        number: 8,
        sanskrit:
          "एतां रामबलोपेतां रक्षां यः सुकृती पठेत् ।\nस चिरायुः सुखी पुत्री विजयी विनयी भवेत् ॥",
        transliteration:
          "etāṃ rāmabalopetāṃ rakṣāṃ yaḥ sukṛtī paṭhet |\nsa cirāyuḥ sukhī putrī vijayī vinayī bhavet ||",
        translation:
          "The virtuous person who recites this protective hymn, which is filled with the power of Rama, will become long-lived, happy, blessed with children, victorious, and humble.",
      },
    ],
  },
};
