export type AartiKind = "aarti" | "stotra" | "mantra" | "gajar" | "prayer" | "schedule";

export type AartiLayer = "original" | "iast" | "english" | "meaning";

export interface AartiVerse {
  number: number;
  original: string;
  iast: string;
  english: string;
  meaning: string;
}

export interface AartiItem {
  slug: string;
  title: string;
  titleMr: string;
  kind: AartiKind;
  deity: string;
  composer: string;
  bookletPages: string;
  inBooklet: boolean;
  onSiteBefore: boolean;
  audioUrl?: string;
  audioLabel?: string;
  summary: string;
  iconography: string;
  verses: AartiVerse[];
}

const v = (
  number: number,
  original: string,
  iast: string,
  english: string,
  meaning: string
): AartiVerse => ({ number, original, iast, english, meaning });

/**
 * Texts transcribed from the Dagdusheth Halwai Trust booklet photos
 * (used only as a reference; the PDF/photos are not hosted) and
 * cross-checked with the public Marathi aarti tradition.
 */
export const GANESH_AARTI_SANGRAH: AartiItem[] = [
  {
    slug: "sukhakarta-dukhaharta",
    title: "Ganpati Aarti — Sukhakarta Dukhaharta",
    titleMr: "श्री गणपतीची आरती",
    kind: "aarti",
    deity: "Ganesha",
    composer: "Samarth Ramdas",
    bookletPages: "14",
    inBooklet: true,
    onSiteBefore: true,
    audioUrl: "https://archive.org/download/SukhakartaDukhaharta/SukhakartaDukhaharta.mp3",
    audioLabel: "Archive.org recording",
    summary:
      "The opening Marathi aarti of almost every Maharashtrian puja. The booklet prints the same three stanzas used in the existing unused site data.",
    iconography:
      "Lambodara in yellow silk, sindoor on the body, pearl necklace, jewelled crown, jingling anklets, a serpent at the waist, a straight trunk with a curved face, and three eyes — the form described in the verses themselves.",
    verses: [
      v(
        1,
        "सुखकर्ता दुःखहर्ता वार्ता विघ्नाची । नुरवी पुरवी प्रेम कृपा जयाची ॥\nसर्वांगी सुंदर उटी शेंदुराची । कंठी झळके माळ मुक्ताफळांची ॥",
        "sukhakartā duḥkhahartā vārtā vighnācī | nuravī puravī prema kṛpā jayācī ||\nsarvāṅgī sundara uṭī śendurācī | kaṇṭhī jhaḷake māḷa muktāphaḷāñcī ||",
        "Creator of joy, remover of sorrow, who stills the news of obstacles. Love and grace fill us first. The whole body is beautiful with red sindoor; a pearl-garland shines at the throat.",
        "गणपती सुख देतो, दुःख आणि विघ्न हरतो. शेंदूर आणि मोत्यांची माळ ही त्याच्या मंगल रूपाची ओळख आहे."
      ),
      v(
        2,
        "जय देव जय देव जय मंगलमूर्ती । दर्शनमात्रे मनःकामना पुरती ॥ जय देव जय देव ॥",
        "jaya deva jaya deva jaya maṅgalamūrtī | darśanamātre manaḥkāmanā puratī || jaya deva jaya deva ||",
        "Victory to the Lord, victory to the auspicious form. Mere darshan fulfills the heart's wish.",
        "हे ध्रुवपद प्रत्येक कडव्यानंतर गातात."
      ),
      v(
        3,
        "रत्नखचित फरा तूज गौरीकुमरा । चंदनाची उटी कुंकुमकेशरा ॥\nहिरेजडित मुकुट शोभतो बरा । रुणझुणती नूपुरे चरणी घागरिया ॥",
        "ratnakhacita pharā tūja gaurīkumarā | candanācī uṭī kuṃkumakeśarā ||\nhīrejaḍita mukuṭa śobhato barā | ruṇajhuṇatī nūpure caraṇī ghāgariyā ||",
        "O son of Gauri, your pedestal is set with gems. Sandal, kumkum, and saffron anoint you. A diamond crown sits well, and anklets jingle at your feet.",
        "गौरीपुत्र गणेशाच्या सिंहासनाची आणि मुकुटाची वर्णने पूजेतील अलंकार दाखवतात."
      ),
      v(
        4,
        "लंबोदर पीतांबर फणिवरबंधना । सरळ सोंड वक्रतुंड त्रिनयना ॥\nदास रामाचा वाट पाहे सदना । संकटी पावावे निर्वाणी रक्षावे सुरवरवंदना ॥",
        "lambodara pītāmbara phaṇivarabandhanā | saraḷa soṃḍa vakratuṇḍa trinayanā ||\ndāsa rāmācā vāṭa pāhe sadanā | saṅkaṭī pāvāve nirvāṇī rakṣāve suravaravandanā ||",
        "Large-bellied, yellow-robed, bound with the best of serpents; straight trunk, curved face, three-eyed. Ramdas waits at the door: come in trouble, protect at the last hour, O Lord praised by the gods.",
        "समर्थ रामदासांनी ही आरती लिहिली. शेवटच्या ओळीत ते स्वतःची वाट पाहतात."
      ),
    ],
  },
  {
    slug: "durge-durghat-bhari",
    title: "Devi Aarti — Durge Durghat Bhari",
    titleMr: "श्री देवीची आरती",
    kind: "aarti",
    deity: "Durga",
    composer: "Narhari",
    bookletPages: "15",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "Sung immediately after Ganpati aarti in Maharashtrian evening worship. The booklet prints three stanzas with the Mahishasuramardini refrain.",
    iconography:
      "Durga as Mahishasuramardini: the goddess who slays the buffalo-demon, not a generic smiling mother image. Weapons and a lion or the fallen Mahisha belong to this hymn.",
    verses: [
      v(
        1,
        "दुर्गे दुर्घट भारी तुजविण संसारी । अनाथनाथे अंबे करुणा विस्तारी ॥\nवारी वारी जन्ममरणांते वारी । हारी पडलो आता संकट नीवारी ॥",
        "durge durghaṭa bhārī tujaviṇa saṃsārī | anāthanāthe ambe karuṇā vistārī ||\nvārī vārī janmamaraṇānte vārī | hārī paḍalo ātā saṅkaṭa nīvārī ||",
        "O Durga, this world is a hard pass without you. Mother of the helpless, spread compassion. Turn birth and death aside again and again. I have fallen exhausted; now remove this crisis.",
        "दुर्गा म्हणजे दुःख आणि संकट दूर करणारी. आरतीची पहिली ओळ तीच अर्थ सांगते."
      ),
      v(
        2,
        "जय देवी जय देवी जय महिषासुरमर्दनी । सुरवर ईश्वर वरदे तारक संजीवनी ॥",
        "jaya devī jaya devī jaya mahiṣāsuramardanī | suravara īśvara varade tāraka saṃjīvanī ||",
        "Victory to the Goddess, slayer of Mahisha. Bestower of boons to the gods, the life-giving saviour.",
        "महिषासुरमर्दनी हे दुर्गेचे शास्त्रोक्त रूप आहे."
      ),
      v(
        3,
        "त्रिभुवनभुवनी पाहता तुजऐसी नाही । चारी श्रमले परंतु न बोलवे काही ॥\nसाही विवाद करिता पडलो प्रवाही । ते तू भक्तांलागी पावसि लवलाही ॥",
        "tribhuvanabhuvanī pāhatā tujaaisī nāhī | cārī śramale paraṃtu na bolave kāhī ||\nsāhī vivāda karitā paḍalo pravāhī | te tū bhaktāṃlāgī pāvasī lavalāhī ||",
        "In the three worlds none is like you. The four Vedas laboured and could not speak it. The six schools argued and fell into the stream. Yet you reach your devotees at once.",
        "वेदांनाही तिचे पूर्ण वर्णन जमत नाही, पण भक्ताला ती लगेच पावते."
      ),
      v(
        4,
        "प्रसन्नवदने प्रसन्न होसी निजदासा । क्लेशापासूनि सोडी तोडी भवपाशा ॥\nअंबे तुजवाचून कोण पुरविल आशा । नरहरी तल्लीन झाला पदपंकजलेशा ॥",
        "prasannavadane prasanna hosī nijadāsā | kleśāpāsūni soḍī toḍī bhavapāśā ||\nambe tujavācūna koṇa puravila āśā | naraharī tallīna jhālā padapaṃkajaleśā ||",
        "O gracious-faced one, be pleased with your servant. Free us from affliction and cut the snare of becoming. Mother, who else can fulfill this hope? Narhari is absorbed in a speck of your lotus feet.",
        "रचनाकार नरहरी शेवटच्या कडव्यात नाव घालतात."
      ),
    ],
  },
  {
    slug: "lavthavti-vikrala",
    title: "Shiva Aarti — Lavthavti Vikrala",
    titleMr: "श्री शंकराची आरती",
    kind: "aarti",
    deity: "Shiva",
    composer: "Samarth Ramdas",
    bookletPages: "16",
    inBooklet: true,
    onSiteBefore: false,
    summary: "Marathi Shiva aarti from the same Ramdas tradition as Sukhakarta.",
    iconography:
      "Karpurgaura (camphor-white) body, blue throat, three eyes, Ganga in the matted hair, Parvati as half, vibhuti, tiger skin, serpent, and five faces in the last stanza — not a generic meditating yogi without these marks.",
    verses: [
      v(
        1,
        "लवथवती विक्राळा ब्रह्मांडी माळा । विषें कंठ काळा त्रिनेत्री ज्वाळा ॥\nलावण्यसुंदर मस्तकीं बाळा । तेथुनिया जल निर्मळ वाहे झुळझुळा ॥",
        "lavathavatī vikrāḷā brahmāṇḍī māḷā | viṣeṃ kaṇṭha kāḷā trinetrī jvāḷā ||\nlāvaṇyasundara mastakīṃ bāḷā | tethuniyā jala nirmaḷa vāhe jhuḷajhuḷā ||",
        "Terribly vast, a garland for the cosmos. The throat is dark with poison, three eyes flame. Beauty sits on the head, and from there clear water flows in ripples.",
        "गंगेचे झुळझुळ वाहणे आणि नीलकंठ हे शंकराची शास्त्रोक्त चिन्हे आहेत."
      ),
      v(
        2,
        "जय देव जय देव जय श्रीशंकरा । आरती ओवाळू तुज कर्पूरगौरा ॥",
        "jaya deva jaya deva jaya śrīśaṅkarā | āratī ovāḷū tuja karpūragaurā ||",
        "Victory to Shankara. We wave this aarti to you who are white as camphor.",
        "कर्पूरगौर हे शिवस्तोत्रातील प्रसिद्ध विशेषण आहे."
      ),
      v(
        3,
        "कर्पूरगौरा भोळा नयनी विशाळा । अर्धांगी पार्वती सुमनांच्या माळा ॥\nविभूतीचे उधळण शितिकंठ निळा । ऐसा शंकर शोभे उमावेल्हाळा ॥",
        "karpūragaurā bhoḷā nayanī viśāḷā | ardhāṅgī pārvatī sumanāñcyā māḷā ||\nvibhūtīce udhaḷaṇa śitikaṇṭha niḷā | aisā śaṅkara śobhe umāvelhāḷā ||",
        "Camphor-white, simple-hearted, wide-eyed. Parvati is his half, with flower garlands. Ash is strewn, the cool throat is blue. So Shankara shines, absorbed in Uma.",
        "अर्धनारीश्वर आणि उमा-महेश्वर एकत्र वर्णले आहेत."
      ),
      v(
        4,
        "देवीं दैत्यी सागरमंथन पै केले । त्यामाजी अवचित हलाहल उठिले ॥\nते त्वां असुरपणे प्राशन केले । नीळकंठ नाम प्रसिद्ध झाले ॥",
        "devīṃ daityīṃ sāgaramanthana pai kele | tyāmājī avacita halāhala uṭhile ||\nte tvāṃ asurapaṇe prāśana kele | nīlakaṇṭha nāma prasiddha jhāle ||",
        "Gods and daityas churned the ocean. Suddenly halahala rose. You drank it in fierce compassion, and the name Nilkantha became famous.",
        "समुद्रमंथनातील विषपान हा शिवपुराणातील केंद्रकथा आहे."
      ),
      v(
        5,
        "व्याघ्रांबर फणिवरधर सुंदर मदनारी । पंचानन मनमोहन मुनिजनसुखकारी ॥\nशतकोटीचे बीज वाचे उच्चारी । रघुकुलतिलक रामदास अंतरी ॥",
        "vyāghrāmbara phaṇivaradhara sundara madanārī | pañcānana manamohana munijanasukhakārī ||\nśatakoṭīce bīja vāce uccārī | raghukulatilaka rāmadāsa antarī ||",
        "Tiger-skin, best of serpents, beautiful destroyer of Kama. Five-faced, mind-enchanting, delight of sages. The seed of a hundred crores is uttered; Ramdas, mark of the Raghu line, holds you within.",
        "शेवटचे कडवे रामदासांचे नाव आणि पंचानन रूप एकत्र आणते."
      ),
    ],
  },
  {
    slug: "yuge-atthavis",
    title: "Vitthal Aarti — Yuge Atthavis",
    titleMr: "श्री विठ्ठलाची आरती",
    kind: "aarti",
    deity: "Vitthal / Panduranga",
    composer: "Namdev",
    bookletPages: "17",
    inBooklet: true,
    onSiteBefore: false,
    summary: "Pandharpur aarti that follows Shiva in the booklet sequence.",
    iconography:
      "Dark Vitthal standing on a brick, hands on hips, yellow pitambara, tulsi garland, Rukmini (Rakhumai) to the left, Garuda and Hanuman in front — the Pandharpur murti, not a flute-playing Vrindavan Krishna.",
    verses: [
      v(
        1,
        "युगे अठ्ठावीस विटेवरी उभा । वामांगी रखुमाई दिसे दिव्य शोभा ॥\nपुंडलिकाचे भेटी परब्रह्म आले गा । चरणी वाहे भीमा उद्धरी जगा ॥",
        "yuge aṭṭhāvīsa viṭevarī ubhā | vāmāṅgī rakhumāī dise divya śobhā ||\npuṇḍalikāce bheṭī parabrahma āle gā | caraṇī vāhe bhīmā uddharī jagā ||",
        "For twenty-eight ages he stands on the brick. On the left Rakhumai shines. Brahman itself came to meet Pundalik. The Bhima flows at his feet and lifts the world.",
        "पुंडलीकासाठी विठ्ठल विटेवर थांबला, ही पंढरपूरची मूळ कथा आहे."
      ),
      v(
        2,
        "जय देव जय देव जय पांडुरंगा । रखुमाईवल्लभा राहीच्या वल्लभा पावे जिवलगा ॥",
        "jaya deva jaya deva jaya pāṇḍuraṅgā | rakhumāīvallabhā rāhīcyā vallabhā pāve jivalagā ||",
        "Victory to Panduranga, beloved of Rakhumai and Rahi. Come, O life of my life.",
        "राही आणि रखुमाई या विठ्ठलाच्या महिषी पंढरपूर परंपरेत गातल्या जातात."
      ),
      v(
        3,
        "तुळसीमाळा गळा कर ठेवुनि कटी । कासे पीतांबर कस्तुरी लल्लाटी ॥\nदेव सुरवर नित्य येती भेटी । गरुड हनुमंत पुढे उभे राहती ॥",
        "tuḷasīmāḷā gaḷā kara ṭhevuni kaṭī | kāse pītāmbara kasturī lallāṭī ||\ndeva suravara nitya yetī bheṭī | garuḍa hanumaṃta puḍhe ubhe rāhatī ||",
        "Tulsi at the neck, hands on the waist, yellow silk at the hip, musk on the brow. Gods come daily. Garuda and Hanuman stand in front.",
        "कटीवर हात ठेवलेले रूप हे विठ्ठलमूर्तीचे निश्चित लक्षण आहे."
      ),
      v(
        4,
        "आषाढी कार्तिकी भक्तजन येती । चंद्रभागेमध्ये स्नान जे करिती ॥\nदर्शनहेळामात्रे तया होय मुक्ति । केशवासी नामदेव भावे ओवाळिती ॥",
        "āṣāḍhī kārtikī bhaktajana yetī | candrabhāgemadhye snāna je karitī ||\ndarśanaheḷāmātre tayā hoya mukti | keśavāsī nāmadeva bhāve ovāḷitī ||",
        "In Ashadha and Kartika devotees come, bathe in the Chandrabhaga, and by a moment of darshan gain liberation. Namdev of Keshava waves the lamps with love.",
        "आषाढी-कार्तिकी वारी आणि संत नामदेव हे आरतीचे ऐतिहासिक स्थान दाखवतात."
      ),
    ],
  },
  {
    slug: "datta-aarti",
    title: "Datta Aarti — Trigunatmak Trimurti",
    titleMr: "श्री दत्ताची आरती",
    kind: "aarti",
    deity: "Dattatreya",
    composer: "Eka Janardani / Varkari tradition",
    bookletPages: "18–19",
    inBooklet: true,
    onSiteBefore: false,
    summary: "Datta aarti in the evening set. The booklet drawing shows three heads and six arms.",
    iconography:
      "Dattatreya as trimurti: three heads (Brahma-Vishnu-Shiva), six arms, often with cow, dogs, and a begging bowl. A one-headed sadhu image would be the wrong deity for this hymn.",
    verses: [
      v(
        1,
        "त्रिगुणात्मक त्रिमूर्ती दत्त हा जाणा । त्रिगुणी अवतार त्रैलोक्यराणा ॥\nनेती नेती शब्द न ये अनुमाना । सुरवर मुनिजन योगी समाधी न ये ध्याना ॥",
        "triguṇātmaka trimūrtī datta hā jāṇā | triguṇī avatāra trailokyarāṇā ||\nneti neti śabda na ye anumānā | suravara munijana yogī samādhī na ye dhyānā ||",
        "Know Datta as the three-guna trimurti, king of the three worlds. 'Not this, not this' cannot measure him; gods, sages, and yogis cannot hold him in samadhi.",
        "दत्त हे ब्रह्म-विष्णु-शिव एकत्र. तीन मुखे ही त्याची शास्त्रोक्त प्रतिमा आहे."
      ),
      v(
        2,
        "जय देव जय देव जय श्री गुरुदत्ता । आरती ओवाळिता हरली भवचिंता ॥",
        "jaya deva jaya deva jaya śrī gurudattā | āratī ovāḷitā haralī bhavaciṃtā ||",
        "Victory to Guru Datta. Waving this aarti lifts the worry of becoming.",
        "दत्त येथे गुरुरूपाने गावले जातात."
      ),
      v(
        3,
        "सबाह्य अभ्यंतरी तू एक दत्त । अभाग्यासी कैची कळेल ही मात ॥\nपराही परतली तेथे कैचा हा हेत । जन्ममरणाचाही पुरलासे अंत ॥",
        "sabāhya abhyantarī tū eka datta | abhāgyāsī kaicī kaḷela hī māta ||\nparāhī paratalī tethe kaicā hā heta | janmamaraṇācāhī puralāse aṃta ||",
        "Outside and inside you alone are Datta. How would the unfortunate know this measure? Where even the highest turns back, what motive remains? Birth and death themselves are finished.",
        "अद्वैत दत्तभक्ती: दत्त हाच अंतर्बाह्य एक तत्त्व."
      ),
      v(
        4,
        "दत्त दत्त ऐसे लागले ध्यान । हरपले मन झाले उन्मन ॥\nमी तू पणाची झाली बोळवण । एका जनार्दनी श्रीदत्तध्यान ॥",
        "datta datta aise lāgale dhyāna | harapale mana jhāle unmana ||\nmī tū paṇācī jhālī boḷavaṇa | ekā janārdanī śrīdattadhyāna ||",
        "The mind rests on 'Datta, Datta' and is stolen into stillness. I and you are washed away. So says Eka Janardani in Datta-dhyana.",
        "एका जनार्दनी हे वारकरी हस्ताक्षर आहे."
      ),
    ],
  },
  {
    slug: "ghalin-lotangan",
    title: "Closing prayers — Ghalin Lotangan",
    titleMr: "प्रार्थना",
    kind: "prayer",
    deity: "Ishta / Narayana",
    composer: "Namdev and Vedic/Puranic closing verses",
    bookletPages: "19",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "The booklet ends the aarti set with prostration, Tvameva Mata, Kayena Vacha, Achyutam Keshavam, the Hare Rama mantra, then Mangalmurti Morya / Ganpati Bappa Morya.",
    iconography: "No separate murti. These are surrender verses after the lamps are waved.",
    verses: [
      v(
        1,
        "घालीन लोटांगण, वंदीन चरण । डोळ्यांनी पाहीन रूप तुझे ॥\nप्रेमें आलिंगीन आनंदे पूजिन । भावें ओवाळीन म्हणे नामा ॥",
        "ghālīna loṭāṅgaṇa, vaṃdīna caraṇa | ḍoḷyāṃnī pāhīna rūpa tujhe ||\npremeṃ āliṃgīna ānaṃde pūjina | bhāveṃ ovāḷīna mhaṇe nāmā ||",
        "I will fall full-length, bow to your feet, look at your form with my eyes, embrace with love, worship with joy, and wave the lamps with feeling, says Nama.",
        "संत नामदेवांची समर्पण प्रार्थना, आरतीच्या शेवटी."
      ),
      v(
        2,
        "त्वमेव माता च पिता त्वमेव । त्वमेव बन्धुश्च सखा त्वमेव ॥\nत्वमेव विद्या द्रविणं त्वमेव । त्वमेव सर्वं मम देवदेव ॥",
        "tvameva mātā ca pitā tvameva | tvameva bandhuśca sakhā tvameva ||\ntvameva vidyā draviṇaṃ tvameva | tvameva sarvaṃ mama devadeva ||",
        "You alone are mother and father, kin and friend, learning and wealth. You are all, O God of gods.",
        "पांडुरंगाच्या भक्तीत रूढ झालेले संस्कृत श्लोक."
      ),
      v(
        3,
        "कायेन वाचा मनसेंद्रियैर्वा । बुद्ध्यात्मना वा प्रकृतेः स्वभावात् ॥\nकरोमि यद्यत् सकलं परस्मै । नारायणायेति समर्पयामि ॥",
        "kāyena vācā manasendriyairvā | buddhyātmanā vā prakṛteḥ svabhāvāt ||\nkaromi yadyat sakalaṃ parasmai | nārāyaṇāyeti samarpayāmi ||",
        "Whatever I do with body, speech, mind, senses, intellect, self, or nature, I offer it all to Narayana.",
        "कर्मसमर्पणाचा वैदिक श्लोक."
      ),
      v(
        4,
        "अच्युतं केशवं रामनारायणं । कृष्णदामोदरं वासुदेवं हरिम् ॥\nश्रीधरं माधवं गोपिकावल्लभं । जानकीनायकं रामचन्द्रं भजे ॥",
        "acyutaṃ keśavaṃ rāmanārāyaṇaṃ | kṛṣṇadāmodaraṃ vāsudevaṃ harim ||\nśrīdharaṃ mādhavaṃ gopikāvallabhaṃ | jānakīnāyakaṃ rāmacandraṃ bhaje ||",
        "I worship Acyuta, Keshava, Rama-Narayana, Krishna Damodara, Vasudeva, Hari, Shridhara, Madhava, beloved of the gopis, and Ramachandra, lord of Janaki.",
        "विष्णूच्या नामावलीने आरती बंद होते."
      ),
      v(
        5,
        "हरे राम हरे राम राम राम हरे हरे । हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ॥\n॥ मंगलमूर्ती मोरया ॥ ॥ गणपती बाप्पा मोरया ॥",
        "hare rāma hare rāma rāma rāma hare hare | hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare ||\nmaṅgalamūrtī moryā || gaṇapatī bāppā moryā ||",
        "The sixteen-name Hare Rama mantra, then the Maharashtrian Ganpati calls.",
        "पुस्तकात हा गजर अनेक वेळा लिहिलेला आहे. गणेशोत्सवात मोरया हा मोरया गोसावींच्या परंपरेतील जयघोष आहे."
      ),
    ],
  },
  {
    slug: "dagdusheth-ganpati-aarti",
    title: "Dagdusheth Halwai Ganpati Aarti",
    titleMr: "श्रीमंत दगडूशेठ हलवाई गणपती आरती",
    kind: "aarti",
    deity: "Ganesha (Dagdusheth murti, Pune)",
    composer: "Temple tradition, Shrimant Dagdusheth Halwai Ganpati Trust",
    bookletPages: "7",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "Temple-specific aarti for the gold-plated Pune murti. The site had no Dagdusheth hymn before this.",
    iconography:
      "The booklet cover photo is the genuine Dagdusheth Halwai idol: seated, gold-finished, heavy crown and jewellery, mushaka at the feet. That photo is the Trust's, so this site uses an original drawing of the same shastric marks instead of copying the print.",
    verses: [
      v(
        1,
        "जय गणेश दगडूशेठ गणपती देवा । स्वीकार कर लो भक्तांची सेवा ॥",
        "jaya gaṇeśa dagaḍūśeṭha gaṇapatī devā | svīkāra kara lo bhaktāñcī sevā ||",
        "Victory to Ganesha, Lord of Dagdusheth. Please accept your devotees' service.",
        "पुणे शहर आणि दगडूशेठ परंपरेला उद्देशून गावलेली आरती."
      ),
      v(
        2,
        "गजमुखधारी मूषक वाहना । तीनही लोकी कीर्ती तुझी गाणा ॥",
        "gajamukhadhārī mūṣaka vāhanā | tīnahī lokī kīrtī tujhī gāṇā ||",
        "Elephant-faced, with the mouse as mount. Your fame is sung in all three worlds.",
        "गजमुख आणि मूषक ही शास्त्रोक्त चिन्हे पुस्तकाच्या मूर्तीशी जुळतात."
      ),
      v(
        3,
        "श्रेष्ठ सुंदर कृपासुधापाला । एकदंता चरणी जीवन समर्पणा ॥",
        "śreṣṭha sundara kṛpāsudhāpālā | ekadaṃtā caraṇī jīvana samarpaṇā ||",
        "Supreme, beautiful guardian of the nectar of grace. O Ekadanta, life is offered at your feet.",
        "एकदंत म्हणजे एक दात — गणेशाचे पुराणकथित रूप."
      ),
      v(
        4,
        "मुक्तिदाता देवो के देवा । दगडूशेठ गणपती देवा ॥",
        "muktidātā devo ke devā | dagaḍūśeṭha gaṇapatī devā ||",
        "Giver of liberation, God of gods, Dagdusheth Ganpati.",
        "मंदिर परंपरेत ही आरती महामंगळ आरतीच्या वेळी ऐकू येते."
      ),
    ],
  },
  {
    slug: "shej-aarti",
    title: "Dagdusheth Shej Aarti",
    titleMr: "श्रीमंत दगडूशेठ हलवाई — शेजआरती",
    kind: "aarti",
    deity: "Ganesha (Dagdusheth murti, Pune)",
    composer: "Temple tradition",
    bookletPages: "21",
    inBooklet: true,
    onSiteBefore: false,
    summary: "Night rest aarti. Official temple shejarti is 10:30–10:45 PM.",
    iconography: "Same seated gold Ganpati murti, now as the Lord being laid to rest.",
    verses: [
      v(
        1,
        "आता स्वामी निद्रा करा मोरया बाप्पा । बाप्पा मोरया ॥",
        "ātā svāmī nidrā karā moryā bāppā | bāppā moryā ||",
        "Now, Lord, take rest, Morya Bappa. Bappa Morya.",
        "शेजआरती रात्री मूर्तीला विश्रांती देण्याची महाराष्ट्रीय पद्धत आहे."
      ),
      v(
        2,
        "जय देव जय देव जय मंगलमूर्ती । हो श्री मंगलमूर्ती ॥",
        "jaya deva jaya deva jaya maṅgalamūrtī | ho śrī maṅgalamūrtī ||",
        "Victory to the auspicious form.",
        "सुखकर्ताच्या ध्रुवपदाशी नाते असलेला मंदिरजयघोष."
      ),
    ],
  },
  {
    slug: "ganapati-atharvashirsha",
    title: "Ganapati Atharvashirsha",
    titleMr: "गणपति-अथर्वशीर्षम्",
    kind: "stotra",
    deity: "Ganesha",
    composer: "Atharva Veda tradition (Ganapati Upanishad)",
    bookletPages: "8–10",
    inBooklet: true,
    onSiteBefore: false,
    audioUrl: "https://archive.org/download/GanapatiAtharvashirsha/GanapatiAtharvashirsha.mp3",
    audioLabel: "Archive.org chant (if the file is present)",
    summary:
      "The booklet places this Upanishad before the aartis, with a note to recite 1, 5, 11, 21, 100, or 1000 times, then japa of ॐ गं गणपतये नमः 108 times.",
    iconography:
      "The text itself lists red hue, ekadanta, large ears, and the weapons. Recite facing a four-armed Ganapati, not a modern cartoon.",
    verses: [
      v(
        1,
        "ॐ भद्रं कर्णेभिः शृणुयाम देवाः । भद्रं पश्येमाक्षभिर्यजत्राः ॥\nस्थिरैरङ्गैस्तुष्टुवांसस्तनूभिः । व्यशेम देवहितं यदायुः ॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
        "om bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ | bhadraṃ paśyemākṣabhiryajatrāḥ ||\nsthirairaṅgaistuṣṭuvāṃsastanūbhiḥ | vyaśema devahitaṃ yadāyuḥ || om śāntiḥ śāntiḥ śāntiḥ ||",
        "Om. Gods, may we hear what is auspicious; may we see what is auspicious. With steady limbs may we praise you and live the life the gods intend. Peace, peace, peace.",
        "पुस्तकाच्या सुरुवातीचा शान्तिपाठ."
      ),
      v(
        2,
        "ॐ नमस्ते गणपतये । त्वमेव प्रत्यक्षं तत्त्वमसि । त्वमेव केवलं कर्ताऽसि । त्वमेव केवलं धर्ताऽसि । त्वमेव केवलं हर्ताऽसि । त्वमेव सर्वं खल्विदं ब्रह्मासि । त्वं साक्षादात्माऽसि नित्यम् ॥",
        "om namaste gaṇapataye | tvameva pratyakṣaṃ tattvamasi | tvameva kevalaṃ kartāsi | tvameva kevalaṃ dhartāsi | tvameva kevalaṃ hartāsi | tvameva sarvaṃ khalvidaṃ brahmāsi | tvaṃ sākṣādātmāsi nityam ||",
        "Salutation to Ganapati. You alone are the visible Reality, the only creator, sustainer, and dissolver. You are all this Brahman. You are the eternal Self.",
        "अथर्वशीर्षाचा केंद्रभाव: गणपती हे प्रत्यक्ष तत्त्व."
      ),
      v(
        3,
        "ऋतं वच्मि । सत्यं वच्मि । अव त्वं माम् । अव वक्तारम् । अव श्रोतारम् । अव दातारम् । अव धातारम् । अवानूचानमव शिष्यम् । अव पुरस्तात् । अव दक्षिणात्तात् । अव पश्चात्तात् । अवोत्तरात्तात् । अव चोर्ध्वात्तात् । अवाधस्तात् । सर्वतो मां पाहि पाहि समन्तात् ॥",
        "ṛtaṃ vacmi | satyaṃ vacmi | ava tvaṃ mām | ava vaktāram | ava śrotāram | ava dātāram | ava dhātāram | avānūcānamava śiṣyam | ava purastāt | ava dakṣiṇāttāt | ava paścāttāt | avottarāttāt | ava cordhvāttāt | avādhastāt | sarvato māṃ pāhi pāhi samantāt ||",
        "I speak rita, I speak satya. Protect me, the speaker, the hearer, the giver, the supporter, the teacher, and the student, from front, south, behind, north, above, and below. Guard me on every side.",
        "दिशांनी रक्षण मागणे हे उपनिषदाचे वैदिक अंग आहे."
      ),
      v(
        4,
        "त्वं वाङ्मयस्त्वं चिन्मयः । त्वमानन्दमयस्त्वं ब्रह्ममयः । त्वं सच्चिदानन्दाद्वितीयोऽसि । त्वं प्रत्यक्षं ब्रह्मासि । त्वं ज्ञानमयो विज्ञानमयोऽसि ॥",
        "tvaṃ vāṅmayastvaṃ cinmayaḥ | tvamānandamayastvaṃ brahmamayaḥ | tvaṃ saccidānandādvītīyo'si | tvaṃ pratyakṣaṃ brahmāsi | tvaṃ jñānamayo vijñānamayo'si ||",
        "You are made of speech and consciousness, of bliss and Brahman. You are non-dual being-awareness-bliss. You are visible Brahman, knowledge and realized knowledge.",
        "गणपती येथे वेदान्त तत्त्व म्हणून स्तुत्य आहे, केवळ विघ्नहर्ता नाही."
      ),
      v(
        5,
        "सर्वं जगदिदं त्वत्तो जायते । सर्वं जगदिदं त्वत्तस्तिष्ठति । सर्वं जगदिदं त्वयि लयमेष्यति । सर्वं जगदिदं त्वयि प्रत्येति । त्वं भूमिरापोऽनलोऽनिलो नभः । त्वं चत्वारि वाक्पदानि ॥",
        "sarvaṃ jagadidaṃ tvatto jāyate | sarvaṃ jagadidaṃ tvattastiṣṭhati | sarvaṃ jagadidaṃ tvayi layameṣyati | sarvaṃ jagadidaṃ tvayi pratyeti | tvaṃ bhūmirāpo'nalo'nilo nabhaḥ | tvaṃ catvāri vākpadāni ||",
        "This whole world is born from you, stands in you, dissolves in you, and returns to you. You are earth, water, fire, wind, and sky. You are the four paces of speech.",
        "पंचमहाभूते आणि वाक् हे गणेशाचे विश्वात्मक रूप."
      ),
      v(
        6,
        "त्वं चतुर्धा वर्णसे । त्वं गुणत्रयातीतः । त्वं देहत्रयातीतः । त्वं कालत्रयातीतः । त्वं मूलाधारस्थितोऽसि नित्यम् । त्वं शक्तित्रयात्मकः । त्वां योगिनो ध्यायन्ति नित्यम् । त्वं ब्रह्मा त्वं विष्णुस्त्वं रुद्रस्त्वं इन्द्रस्त्वं अग्निस्त्वं वायुस्त्वं सूर्यस्त्वं चन्द्रमास्त्वं ब्रह्म भूर्भुवः स्वरोम् ॥",
        "tvaṃ caturdhā varṇase | tvaṃ guṇatrayātītaḥ | tvaṃ dehatrayātītaḥ | tvaṃ kālatrayātītaḥ | tvaṃ mūlādhārasthito'si nityam | tvaṃ śaktitrayātmakaḥ | tvāṃ yogino dhyāyanti nityam | tvaṃ brahmā tvaṃ viṣṇustvaṃ rudrastvaṃ indrastvaṃ agnistvaṃ vāyustvaṃ sūryastvaṃ candramāstvaṃ brahma bhūrbhuvaḥ svarom ||",
        "You appear in four ways, beyond the three gunas, three bodies, and three times. You abide in muladhara. Yogis meditate on you. You are Brahma, Vishnu, Rudra, Indra, Agni, Vayu, Surya, Chandra, and the three worlds as Om.",
        "मूलाधारातील गणेशध्यान तन्त्र आणि वेदान्त एकत्र आणते."
      ),
      v(
        7,
        "गणादिं पूर्वमुच्चार्य वर्णादिं तदनन्तरम् । अनुस्वारः परतरः । अर्धेन्दुलसितम् । तारेण ऋद्धम् । एतत्तव मनुस्वरूपम् । गकारः पूर्वरूपम् । अकारो मध्यरूपम् । अनुस्वारश्चान्त्यरूपम् । बिन्दुरुत्तररूपम् । नादः संधानम् । संहिता संधिः । सैषा गणेशविद्या । गणक ऋषिः । निचृद्गायत्री च्छन्दः । गणपतिर्देवता । ॐ गं गणपतये नमः ॥",
        "gaṇādiṃ pūrvamuccārya varṇādiṃ tadanantaram | anusvāraḥ parataraḥ | ardhendulasitam | tāreṇa ṛddham | etattava manusvarūpam | gakāraḥ pūrvarūpam | akāro madhyarūpam | anusvāraścāntyarūpam | binduruttararūpam | nādaḥ saṃdhānam | saṃhitā saṃdhiḥ | saiṣā gaṇeśavidyā | gaṇaka ṛṣiḥ | nicṛdgāyatrī cchandaḥ | gaṇapatirdevatā | om gaṃ gaṇapataye namaḥ ||",
        "Utter ga first, then the vowel, then the anusvara, moon-dot, and Om. This is your mantra-form. This is Ganesha-vidya. Rishi Ganaka, metre nicrd-gayatri, deity Ganapati. Om gam ganapataye namah.",
        "पुस्तक येथे १०८ जपाची सूचना देते."
      ),
      v(
        8,
        "एकदन्ताय विद्महे । वक्रतुण्डाय धीमहि । तन्नो दन्ती प्रचोदयात् ॥",
        "ekadantāya vidmahe | vakratuṇḍāya dhīmahi | tanno dantī pracodayāt ||",
        "We know the one-tusked; we meditate on the curved-trunked. May that tusked one impel us.",
        "गणेश गायत्री. मंत्रपुष्पांजली पृष्ठावरही तीच आहे."
      ),
      v(
        9,
        "एतदथर्वशीर्षं योऽधीते स ब्रह्मभूयाय कल्पते । स सर्वविघ्नैर्न बाध्यते । स सर्वत्र सुखमेधते । स पञ्चमहापापात् प्रमुच्यते ॥",
        "etadatharvaśīrṣaṃ yo'dhīte sa brahmabhūyāya kalpate | sa sarvavighnairna bādhyate | sa sarvatra sukhamedhate | sa pañcamahāpāpāt pramucyate ||",
        "Whoever studies this Atharvashirsha becomes fit for oneness with Brahman, is not blocked by obstacles, grows in happiness, and is freed from the five great sins.",
        "पुस्तकातील फलाश्रुति विभाग."
      ),
    ],
  },
  {
    slug: "gajars",
    title: "Gajars — Gajanana and Morya",
    titleMr: "गजर",
    kind: "gajar",
    deity: "Ganesha",
    composer: "Maharashtrian festival tradition",
    bookletPages: "11",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "The booklet repeats each gajar in numbered lines and asks that Morya be sung for ten minutes.",
    iconography: "Processional Ganesha with dhol-tasha, not a silent shrine image.",
    verses: [
      v(
        1,
        "गजानना गजानना पार्वतीनंदन गजानना ॥",
        "gajānanā gajānanā pārvatīnandana gajānanā ||",
        "Gajanana, son of Parvati.",
        "पुस्तकात १ ते ५ वेळा लिहिलेले."
      ),
      v(
        2,
        "गजानना गजानना गौरीनंदन गजानना ॥",
        "gajānanā gajānanā gaurīnandana gajānanā ||",
        "Gajanana, son of Gauri.",
        "गौरी आणि पार्वती एकच माता, दोन संबोधनं."
      ),
      v(
        3,
        "गजानना गजानना शिवनंदनश्री गजानना ॥",
        "gajānanā gajānanā śivanandanaśrī gajānanā ||",
        "Gajanana, blessed son of Shiva.",
        "शिवपुत्र म्हणून गजर."
      ),
      v(
        4,
        "मोरया रे बाप्पा मोरया रे ॥",
        "moryā re bāppā moryā re ||",
        "Morya! Bappa Morya!",
        "पुस्तक: हा गजर १० मिनिटे करावा. मोरया हे मोरया गोसावी आणि चिंचावड चिंतामणी परंपरेतील आवाहन आहे."
      ),
    ],
  },
  {
    slug: "mantra-pushpanjali",
    title: "Mantra Pushpanjali",
    titleMr: "मंत्रपुष्पांजली",
    kind: "prayer",
    deity: "Vedic deities / Ganesha",
    composer: "Veda",
    bookletPages: "20",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "Closing flower-offering mantras, Ganesh Gayatri, and dharma slogans as printed in the booklet.",
    iconography: "Flowers offered at the close of puja; no extra murti.",
    verses: [
      v(
        1,
        "ॐ यज्ञेन यज्ञमयजन्त देवास्तानि धर्माणि प्रथमान्यासन् ।\nते ह नाकं महिमानः सचन्त यत्र पूर्वे साध्याः सन्ति देवाः ॥",
        "om yajñena yajñamayajanta devāstāni dharmāṇi prathamānyāsan |\nte ha nākaṃ mahimānaḥ sacanta yatra pūrve sādhyāḥ santi devāḥ ||",
        "The gods worshipped the sacrifice by sacrifice; those were the first dharmas. They reached the sky of glory where the ancient Sadhyas dwell.",
        "ऋग्वेदातील प्रसिद्ध पुष्पांजली मंत्र."
      ),
      v(
        2,
        "एकदंताय विद्महे । वक्रतुण्डाय धीमहि । तन्नो दन्ती प्रचोदयात् ॥",
        "ekadantāya vidmahe | vakratuṇḍāya dhīmahi | tanno dantī pracodayāt ||",
        "Ganesh Gayatri: we know Ekadanta, meditate on Vakratunda; may the tusked one impel us.",
        "अथर्वशीर्ष आणि पुष्पांजली दोन्हीकडे हाच गायत्री मंत्र आहे."
      ),
      v(
        3,
        "धर्म की जय हो । अधर्म का नाश हो । प्राणियों में सद्भावना हो । विश्व का कल्याण हो ॥ बोला हर हर महादेव ॥",
        "dharma kī jaya ho | adharma kā nāśa ho | prāṇiyoṃ meṃ sadbhāvanā ho | viśva kā kalyāṇa ho || bolā hara hara mahādeva ||",
        "Victory to dharma, destruction of adharma, goodwill among beings, welfare of the world. Speak Har Har Mahadev.",
        "पुस्तकाच्या शेवटच्या घोषणा."
      ),
    ],
  },
  {
    slug: "nabh-bhairava-stotra",
    title: "Shri Nabh Bhairava Raja Stotra",
    titleMr: "श्रीनभभैरवराज स्तोत्र",
    kind: "stotra",
    deity: "Nabh Bhairava (companion of Dagdusheth Ganpati)",
    composer: "Temple / Ganapatya tradition",
    bookletPages: "22–23",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "A Dagdusheth-specific stotra: Bhairava as Ganesha's pranasakha. Not a generic aarti, but printed in this sangrah.",
    iconography:
      "Bhairava as fierce Kala Bhairava, often with a dog, not a gentle Shiva. Verse 4 calls him Ganesha's true companion, which matches the Pune temple's paired worship.",
    verses: [
      v(
        1,
        "श्रीनवचैतन्य देवा, नमस्कार असो तुला । कृपा करुनी रक्षावा, दयाळा दास आपुला ॥",
        "śrīnavacaitanya devā, namaskāra aso tulā | kṛpā karunī rakṣāvā, dayāḷā dāsa āpulā ||",
        "O Lord of new consciousness, namaskar. Kindly protect your own servant.",
        "भैरव येथे दयाळ संरक्षक आहे, केवळ भयप्रद नाही."
      ),
      v(
        2,
        "प्रचंड भीमरूपा हे भैरवा परमेश्वरा । सुटलो ऐकुनी कंप, त्वदवा करभेश्वरा ॥",
        "pracaṇḍa bhīmarūpā he bhairavā parameśvarā | suṭalo aikunī kaṃpa, tvadavā karabheśvarā ||",
        "O Bhairava of huge terrible form, Supreme Lord, I trembled hearing of you, elephant-lord of refuge.",
        "भीमरूप आणि करुणा एकत्र."
      ),
      v(
        3,
        "गणेशाचा प्राणसखा, एकला तूंचि बा खरा । रक्षिसी पुढतीं मागें, मायेचा स्वीय लेकरां ॥",
        "gaṇeśācā prāṇasakhā, ekalā tūñci bā kharā | rakṣisī puḍhatīṃ māgeṃ, māyecā svīya lekarāṃ ||",
        "You alone are Ganesha's true life-friend. You guard his children of Maya from front and behind.",
        "दगडूशेठ परिसरातील भैरव-गणेश नाते या ओळीत स्पष्ट आहे."
      ),
      v(
        4,
        "जय जय गणराज समर्थ ॥ इति श्रीनभभैरवराजार्पणमस्तु ॥",
        "jaya jaya gaṇarāja samartha || iti śrīnabhabhairavarājārpaṇamastu ||",
        "Victory to capable Ganaraja. This is offered to Nabh Bhairava Raja.",
        "स्तोत्र गणेशासमर्पित भैरवस्तुती आहे."
      ),
    ],
  },
  {
    slug: "sankatnashana-stotra",
    title: "Sankatnashana Maha Ganapati Stotram",
    titleMr: "संकटनाशन महागणपति स्तोत्रम्",
    kind: "stotra",
    deity: "Ganesha",
    composer: "Narada Purana",
    bookletPages: "24",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "The twelve names of Ganapati. Present in the booklet; absent from the old stotra cards.",
    iconography:
      "The twelve names are a sequence of forms (Vakratunda through Gajanana), not twelve random clip-arts. Recite them as one Vinayaka with those aspects.",
    verses: [
      v(
        1,
        "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् । भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥",
        "praṇamya śirasā devaṃ gaurīputraṃ vināyakam | bhaktāvāsaṃ smarennityamāyuḥkāmārthasiddhaye ||",
        "Bowing the head to Gauri's son Vinayaka, the home of devotees, remember him daily for life, desire, and purpose.",
        "नारदपुराणातील संकटनाशन स्तोत्राची प्रथम ओळ."
      ),
      v(
        2,
        "प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् । तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम् ॥",
        "prathamaṃ vakratuṇḍaṃ ca ekadantaṃ dvitīyakam | tṛtīyaṃ kṛṣṇapiṅgākṣaṃ gajavaktraṃ caturthakam ||",
        "First Vakratunda, second Ekadanta, third Krishnapingaksha, fourth Gajavaktra.",
        "बारा नामांची सुरुवात."
      ),
      v(
        3,
        "लम्बोदरं पञ्चमं च षष्ठं विकटमेव च । सप्तमं विघ्नराजं च धूम्रवर्णं तथाष्टमम् ॥",
        "lambodaraṃ pañcamaṃ ca ṣaṣṭhaṃ vikaṭameva ca | saptamaṃ vighnarājaṃ ca dhūmravarṇaṃ tathāṣṭamam ||",
        "Fifth Lambodara, sixth Vikata, seventh Vighnaraja, eighth Dhumravarna.",
        "मध्यची चार नावे."
      ),
      v(
        4,
        "नवमं भालचन्द्रं च दशमं तु विनायकम् । एकादशं गणपतिं द्वादशं तु गजाननम् ॥",
        "navamaṃ bhālacandraṃ ca daśamaṃ tu vināyakam | ekādaśaṃ gaṇapatiṃ dvādaśaṃ tu gajānanam ||",
        "Ninth Bhalachandra, tenth Vinayaka, eleventh Ganapati, twelfth Gajanana.",
        "बारा नामांची पूर्ती."
      ),
      v(
        5,
        "विद्यार्थी लभते विद्यां धनार्थी लभते धनम् । पुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम् ॥",
        "vidyārthī labhate vidyāṃ dhanārthī labhate dhanam | putrārthī labhate putrān mokṣārthī labhate gatim ||",
        "The student gains learning, the seeker of wealth gains wealth, the seeker of children gains children, the seeker of liberation gains the path.",
        "फलाश्रुति: नामांचे नित्य पठण."
      ),
    ],
  },
  {
    slug: "ganesh-namavali",
    title: "Forty names of Ganesha",
    titleMr: "श्री गणेश चालीसा — नामावली",
    kind: "mantra",
    deity: "Ganesha",
    composer: "Dagdusheth Trust namavali (not the Hindi Chalisa of 40 dohas)",
    bookletPages: "25",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "The booklet labels this गणेश चालीसा but prints forty namah-mantras, including Ashtavinayak names, not Tulsidas-style couplets.",
    iconography:
      "Each name is a shrine-form (Siddhivinayaka, Moreshwar, Chintamani…) rather than one extra illustration.",
    verses: [
      v(
        1,
        "ॐ श्री सिद्धिविनायकाय नमः । ॐ श्री गजाननाय नमः । ॐ श्री मोरेश्वराय नमः । ॐ श्री चिंतामणये नमः ।",
        "om śrī siddhivināyakāya namaḥ | om śrī gajānanāya namaḥ | om śrī moreśvarāya namaḥ | om śrī ciṃtāmaṇaye namaḥ |",
        "Salutations to Siddhivinayaka, Gajanana, Moreshwar, and Chintamani.",
        "अष्टविनायकातील प्रमुख क्षेत्रनामे."
      ),
      v(
        2,
        "ॐ श्री वक्रतुण्डाय नमः । ॐ श्री एकदन्ताय नमः । ॐ श्री कृष्णपिङ्गाक्षाय नमः । ॐ श्री गजवक्त्राय नमः ।",
        "om śrī vakratuṇḍāya namaḥ | om śrī ekadantāya namaḥ | om śrī kṛṣṇapiṅgākṣāya namaḥ | om śrī gajavaktrāya namaḥ |",
        "The first four of the twelve sankata-nashana names.",
        "संकटनाशन स्तोत्राशी जुळणारी नामावली."
      ),
      v(
        3,
        "ॐ श्री लम्बोदराय नमः । ॐ श्री विकटाय नमः । ॐ श्री विघ्नराजाय नमः । ॐ श्री धूम्रवर्णाय नमः ।",
        "om śrī lambodarāya namaḥ | om śrī vikaṭāya namaḥ | om śrī vighnarājāya namaḥ | om śrī dhūmravarṇāya namaḥ |",
        "Lambodara, Vikata, Vighnaraja, Dhumravarna.",
        "बारा नामांची पुढची श्रेणी."
      ),
      v(
        4,
        "ॐ श्री भालचन्द्राय नमः । ॐ श्री विनायकाय नमः । ॐ श्री गणपतये नमः । ॐ ॐ ॐ गं गणपतये नमः ।",
        "om śrī bhālacandrāya namaḥ | om śrī vināyakāya namaḥ | om śrī gaṇapataye namaḥ | om om om gaṃ gaṇapataye namaḥ |",
        "Bhalachandra, Vinayaka, Ganapati, and the triple seed-mantra that closes the booklet page.",
        "पुस्तकाच्या शेवटच्या ओळीतील त्रिगुण ॐ गं."
      ),
    ],
  },
  {
    slug: "temple-schedule",
    title: "Dagdusheth daily aarti hours",
    titleMr: "श्री मंदिर दैनंदिन आरती वेळापत्रक",
    kind: "schedule",
    deity: "Ganesha (Dagdusheth murti, Pune)",
    composer: "Shrimant Dagdusheth Halwai Ganpati Trust",
    bookletPages: "6",
    inBooklet: true,
    onSiteBefore: false,
    summary:
      "The photo-booklet times differ slightly from the live temple site. Hind AI keeps the official website schedule and notes the printed pamphlet as a snapshot.",
    iconography: "Live murti hours, not a decorative calendar image.",
    verses: [
      v(
        1,
        "सकाळ ५:०० ते रात्री १०:३० (मंगळवारी रात्री ११:०० पर्यंत).",
        "sakāḷa 5:00 te rātrī 10:30 (maṅgaḷavārī rātrī 11:00 paryaṃta).",
        "Temple open 5:00 AM–10:30 PM; Tuesdays until 11:00 PM. Source: dagdushethganpati.com, checked against the booklet.",
        "पुस्तकात ६ ते ११ असा उल्लेख होता; अधिकृत संकेतस्थळ वेगळे आहे म्हणून संकेतस्थळाला प्राधान्य."
      ),
      v(
        2,
        "सुप्रभातम आरती ७:३०–७:४५ · नैवेद्य १:३०–१:४५ · माध्यान्ह आरती ३:००–३:१५ · महामंगळ आरती ८:००–९:०० · शेजआरती १०:३०–१०:४५.",
        "suprabhātama āratī 7:30–7:45 · naivedya 1:30–1:45 · mādhyānha āratī 3:00–3:15 · mahāmaṅgaḷa āratī 8:00–9:00 · śejāratī 10:30–10:45.",
        "Official aarti slots from the Trust site. Always reconfirm before travel.",
        "पत्ता: गणपती भवन, २५० बुधवार पेठ, पुणे. https://www.dagdushethganpati.com/"
      ),
    ],
  },
];

export const GANESH_AARTI_BY_SLUG: Record<string, AartiItem> = Object.fromEntries(
  GANESH_AARTI_SANGRAH.map((item) => [item.slug, item])
);

export function getGaneshAarti(slug: string): AartiItem | undefined {
  return GANESH_AARTI_BY_SLUG[slug];
}

export function listGaneshAartiSlugs(): string[] {
  return GANESH_AARTI_SANGRAH.map((item) => item.slug);
}

export function aartiKindLabel(kind: AartiKind): string {
  switch (kind) {
    case "aarti":
      return "Aarti";
    case "stotra":
      return "Stotra";
    case "mantra":
      return "Mantra";
    case "gajar":
      return "Gajar";
    case "prayer":
      return "Prayer";
    case "schedule":
      return "Temple hours";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}
