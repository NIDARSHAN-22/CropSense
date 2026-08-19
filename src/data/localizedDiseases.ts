/**
 * Comprehensive Multilingual Diagnostic Dictionary for 7 Indian Languages
 * English (en), Hindi (hi), Tamil (ta), Telugu (te), Kannada (kn), Marathi (mr), Bengali (bn)
 */

export interface LocalizedDiseaseContent {
  cropName: string;
  diseaseName: string;
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionTips: string[];
}

export const LOCALIZED_DISEASE_DATA: Record<string, Record<string, LocalizedDiseaseContent>> = {
  'Tomato___Early_blight': {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Early Blight',
      symptoms: [
        'Dark brown to black spots with concentric rings (target pattern) on older leaves',
        'Yellow halo surrounding the leaf lesions',
        'Premature leaf drop starting from lower canopy moving upward',
      ],
      organicRemedies: [
        'Remove and burn infected lower leaves to stop spore transmission',
        'Spray cold-pressed Neem oil (5ml/L) mixed with mild soap water every 7 days',
        'Apply Trichoderma viride bio-fungicide to soil and foliage',
      ],
      chemicalRemedies: [
        'Spray Mancozeb 75% WP @ 2.5g/L water at first sign of target spots',
        'Azoxystrobin 23% SC @ 1ml/L for persistent infection (Observe 7-day pre-harvest wait)',
      ],
      preventionTips: [
        'Rotate crops for 3 years (avoid potato/brinjal in same soil)',
        'Maintain 60cm plant spacing for good airflow',
      ],
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'अगेती झुलसा (अर्ली ब्लाइट)',
      symptoms: [
        'निचली पुरानी पत्तियों पर गहरे भूरे रंग के छल्लेदार (टारगेट जैसे) धब्बे',
        'धब्बों के चारों ओर पीला घेरा बनना',
        'पत्तियां पीली होकर नीचे से ऊपर की ओर सूखकर गिरना',
      ],
      organicRemedies: [
        'संक्रमित निचली पत्तियों को तुरंत तोड़कर खेत से दूर नष्ट करें',
        '5 मिली/लीटर नीम का तेल हल्के साबुन के घोल में मिलाकर हर 7 दिन में छिड़कें',
        'ट्राइकोडर्मा विरिडी जैव-फफूंदनाशी का छिड़काव करें',
      ],
      chemicalRemedies: [
        'मैंकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें',
        'एज़ोक्सिस्ट्रोबिन 23% SC @ 1 मिली प्रति लीटर का उपयोग करें (7 दिन तुड़ाई न करें)',
      ],
      preventionTips: [
        'फसल चक्र अपनाएं (टमाटर के बाद आलू या बैंगन न लगाएं)',
        'पौधों के बीच 60 सेमी की दूरी रखें ताकि हवा और धूप मिल सके',
      ],
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'முன்கூட்டிய கருகல் நோய் (Early Blight)',
      symptoms: [
        'அடிப்பகுதி பழைய இலைகளில் வட்ட வளைய வடிவ கரும்பழுப்பு நிறப் புள்ளிகள்',
        'புள்ளிகளைச் சுற்றி மஞ்சள் நிற வளையம் தோன்றுதல்',
        'கீழ் இலைகள் மஞ்சள் நிறமாகி உதிர்ந்து நோய் மேல்நோக்கிப் பரவுதல்',
      ],
      organicRemedies: [
        'பாதிக்கப்பட்ட அடி இலைகளைப் பறித்து அப்புறப்படுத்தி எரிக்கவும்',
        'வேப்பெண்ணெய் (5 மி.லி/லிட்டர்) சோப்பு நீரில் கலந்து 7 நாட்களுக்கு ஒருமுறை தெளிக்கவும்',
        'டிரைக்கோடெர்மா விரிடி (Trichoderma viride) உயிரி பூஞ்சாணக் கொல்லியைப் பயன்படுத்தவும்',
      ],
      chemicalRemedies: [
        'மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்',
        'அசாக்ஸிஸ்ட்ரோபின் 23% SC @ 1 மி.லி/லிட்டர் தெளிக்கவும் (7 நாட்கள் அறுவடை இடைவெளி)',
      ],
      preventionTips: [
        '3 ஆண்டு பயிர் சுழற்சி முறையைப் பின்பற்றவும் (உருளை/கத்தரி பயிரிட வேண்டாம்)',
        'செடிகளுக்கு இடையே 60 செ.மீ இடைவெளி விட்டு காற்றோட்டத்தை அதிகரிக்கவும்',
      ],
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'ముందస్తు ఎండు తెగులు (Early Blight)',
      symptoms: [
        'క్రింది పాత ఆకులపై వలయాకారపు నల్లటి మచ్చలు',
        'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడటం',
        'ఆకులు పసుపు రంగులోకి మారి రాలిపోవడం',
      ],
      organicRemedies: [
        'సోకిన క్రింది ఆకులను తుంచి నాశనం చేయండి',
        'వేప నూనె (5మి.లీ/లీటరు) సబ్బు నీటితో కలిపి ప్రతి 7 రోజులకు పిచికారీ చేయండి',
        'ట్రైకోడెర్మా విరిడే జీవ శిలీంద్రనాశినిని వాడండి',
      ],
      chemicalRemedies: [
        'మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీటరు నీటిలో కలిపి పిచికారీ చేయండి',
        'అజోక్సిస్ట్రోబిన్ 23% SC @ 1 మి.లీ/లీటరు పిచికారీ చేయండి',
      ],
      preventionTips: [
        'పంట మార్పిడిని పాటించండి (టమోటా తర్వాత బంగాళాదుంప వేయవద్దు)',
        'మొక్కల మధ్య 60 సెం.మీ దూరం ఉంచండి',
      ],
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಮುಂಚಿತ ರೋಗ (Early Blight)',
      symptoms: [
        'ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಕಂದು-ಕಪ್ಪು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು',
        'ಕಲೆಗಳ ಸುತ್ತಲೂ ಹಳದಿ ಬಣ್ಣದ ಹೊದಿಕೆ',
        'ಕೆಳಗಿನ ಎಲೆಗಳು ಉದುರಿ ರೋಗ ಮೇಲಕ್ಕೆ ಹರಡುವುದು',
      ],
      organicRemedies: [
        'ಸೋಂಕಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ',
        'ಬೇವಿನ ಎಣ್ಣೆ (5ಮಿ.ಲೀ/ಲೀಟರ್) ಸಾಬೂನು ನೀರಿನೊಂದಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ',
        'ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ',
      ],
      chemicalRemedies: [
        'ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ',
      ],
      preventionTips: [
        'ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ (ಆಲೂಗಡ್ಡೆ ಬೆಳೆಯಬೇಡಿ)',
        'ಗಿಡಗಳ ನಡುವೆ 60 ಸೆಂ.ಮೀ ಅಂತರ ಕಾಪಾಡಿ',
      ],
    },
    mr: {
      cropName: 'टोमॅटो',
      diseaseName: 'लवकर येणारा करपा (Early Blight)',
      symptoms: [
        'खालच्या जुन्या पानांवर काळे-तपकिरी गोलाकार चक्राकार डाग',
        'डागांच्या भोवती पिवळसर कडा निर्माण होणे',
        'खालची पाने वाळून गळणे',
      ],
      organicRemedies: [
        'बाधित खालची पाने तोडून नष्ट करा',
        '५ मिली/लिटर कडुनिंब तेल साबणाच्या पाण्यात मिसळून फवारा',
        'ट्रायकोडर्मा व्हिरिडी जैविक बुरशीनाशक वापरा',
      ],
      chemicalRemedies: [
        'मॅनकोझेब ७५% WP @ २.५ ग्रॅम/लिटर पाण्यात मिसळून फवारा',
      ],
      preventionTips: [
        '३ वर्षांचे पीक फेरपालट करा',
        'झाडांमध्ये ६० सेमी अंतर ठेवा',
      ],
    },
    bn: {
      cropName: 'টমেটো',
      diseaseName: 'আগাম ধসা রোগ (Early Blight)',
      symptoms: [
        'নিচের পুরনো পাতায় গাঢ় বাদামী বলয়যুক্ত দাগ',
        'দাগের চারপাশে হলুদ বলয় তৈরি হওয়া',
        'পাতা হলুদ হয়ে ঝরে পড়া',
      ],
      organicRemedies: [
        'আক্রান্ত নিচের পাতাগুলো ছিঁড়ে পুড়িয়ে ফেলুন',
        'নিম তেল (৫ মিলি/লিটার) সাবান পানিতে মিশিয়ে স্প্রে করুন',
        'ট্রাইকোডার্মা ভিরিডি জৈব ছত্রাকনাশক ব্যবহার করুন',
      ],
      chemicalRemedies: [
        'ম্যানকোজেব ৭৫% WP @ ২.৫ গ্রাম/লিটার পানিতে মিশিয়ে স্প্রে করুন',
      ],
      preventionTips: [
        'ফসল পরিবর্তন করুন এবং চারা ৬০ সেমি দূরত্বে লাগান',
      ],
    },
  },

  'Tomato___Late_blight': {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Late Blight',
      symptoms: [
        'Water-soaked dark lesions rapidly spreading across leaves and stems',
        'White fuzzy mold underneath leaves during humid mornings',
        'Large dark brown firm rot on tomato fruits',
      ],
      organicRemedies: [
        'Immediately destroy infected plants to prevent field-wide devastation',
        'Apply 1% Bordeaux mixture before monsoon rain starts',
        'Spray Bacillus subtilis bio-control agent every 5 days',
      ],
      chemicalRemedies: [
        'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5g/L immediately',
        'Cymoxanil 8% + Mancozeb 64% WP @ 2g/L during heavy rainfall',
      ],
      preventionTips: [
        'Avoid overhead sprinkler irrigation; keep foliage dry',
        'Ensure proper ridge drainage in tomato beds',
      ],
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'पिछेती झुलसा (लेट ब्लाइट)',
      symptoms: [
        'पत्तियों और तनों पर तेजी से फैलने वाले पानी जैसे काले-भूरे धब्बे',
        'नम मौसम में पत्तियों के नीचे सफेद फफूंद की परत',
        'फलों पर कठोर भूरे रंग का सड़ाव',
      ],
      organicRemedies: [
        'गंभीर रूप से प्रभावित पौधों को तुरंत उखाड़कर नष्ट करें',
        'बारिश से पहले 1% बोर्डो मिश्रण (Bordeaux mixture) का सुरक्षात्मक छिड़काव करें',
        'बैसिलस सबटिलिस (Bacillus subtilis) जैव-नियंत्रक का छिड़काव करें',
      ],
      chemicalRemedies: [
        'मेटालैक्सिल 8% + मैंकोजेब 64% WP (रिडोमिल) @ 2.5 ग्राम प्रति लीटर छिड़कें',
        'साइमोक्सानिल 8% + मैंकोजेब 64% WP @ 2 ग्राम प्रति लीटर पानी में मिलाएं',
      ],
      preventionTips: [
        'फव्वारा सिंचाई से बचें, केवल जड़ों में ड्रिप से पानी दें',
        'खेत में जल निकासी की उचित व्यवस्था रखें',
      ],
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'பின்கூட்டிய கருகல் நோய் (Late Blight)',
      symptoms: [
        'இலைகள் மற்றும் தண்டுகளில் விரைவாகப் பரவும் ஈரமான கரும்பழுப்பு நிறப் புள்ளிகள்',
        'ஈரப்பதமான காலங்களில் இலைகளின் அடிப்பகுதியில் வெள்ளை நிறப் பூஞ்சாணப் படலம்',
        'காய்களில் கடினமான பழுப்பு நிற அழுகல் ஏற்படுதல்',
      ],
      organicRemedies: [
        'நோய் தாக்கப்பட்ட செடிகளை உடனடியாகப் பிடுங்கி எரிக்கவும்',
        'மழைக்காலத்திற்கு முன் 1% போர்டோ கலவை (Bordeaux mixture) தெளிக்கவும்',
        'பேசில்லஸ் சப்டிலிஸ் (Bacillus subtilis) உயிரி பூஞ்சாணக் கொல்லியைப் பயன்படுத்தவும்',
      ],
      chemicalRemedies: [
        'மெட்டலாக்ஸில் 8% + மேன்கோசெப் 64% WP (ரிடோமில்) @ 2.5 கிராம்/லிட்டர் தெளிக்கவும்',
        'சைமோக்சானில் 8% + மேன்கோசெப் 64% WP @ 2 கிராம்/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்',
      ],
      preventionTips: [
        'மேலிருந்து தண்ணீர் தெளிப்பதைத் தவிர்க்கவும், சொட்டுநீர் பாசனம் அமைக்கவும்',
        'வயலில் தண்ணீர் தேங்காமல் பார்த்துக் கொள்ளவும்',
      ],
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'ఆలస్యపు ఎండు తెగులు (Late Blight)',
      symptoms: [
        'ఆకులు మరియు కొమ్మలపై నీటితో తడిసిన నల్లటి మచ్చలు వేగంగా వ్యాపించడం',
        'ఆకుల క్రింద తెల్లటి బూజు పొర కనిపించడం',
        'కాయలపై గట్టి బ్రౌన్ కుళ్లు మచ్చలు',
      ],
      organicRemedies: [
        'సోకిన మొక్కలను వెంటనే పీకి నాశనం చేయండి',
        'వర్షాలకు ముందు 1% బోర్డో మిశ్రమాన్ని పిచికారీ చేయండి',
      ],
      chemicalRemedies: [
        'మెటలాక్సిల్ 8% + మాంకోజెబ్ 64% WP (రిడోమిల్) @ 2.5 గ్రా/లీటర్ వాడండి',
      ],
      preventionTips: [
        'డ్రిప్ ద్వారా మాత్రమే నీరు అందించండి',
      ],
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ತಡವಾದ ಅಂಗಮಾರಿ ರೋಗ (Late Blight)',
      symptoms: [
        'ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡಗಳ ಮೇಲೆ ವೇಗವಾಗಿ ಹರಡುವ ಕಪ್ಪು ಕಲೆಗಳು',
        'ಎಲೆಗಳ ಕೆಳಗೆ ಬಿಳಿ ಶಿಲೀಂಧ್ರ ಪದರ',
        'ಕಾಯಿಗಳ ಮೇಲೆ ಕಂದು ಕೊಳೆತ',
      ],
      organicRemedies: [
        'ಬಾಧಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ನಾಶಮಾಡಿ',
        '1% ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ',
      ],
      chemicalRemedies: [
        'ಮೆಟಾಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ',
      ],
      preventionTips: [
        'ಹನಿ ನೀರಾವರಿ ಬಳಸಿ, ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಬೀಳದಂತೆ ನೋಡಿಕೊಳ್ಳಿ',
      ],
    },
    mr: {
      cropName: 'टोमॅटो',
      diseaseName: 'उशिरा येणारा करपा (Late Blight)',
      symptoms: [
        'पानांवर व खोडावर वेगाने पसरणारे काळपट ओलसर डाग',
        'पानांच्या खाली पांढऱ्या बुरशीची लव',
        'फळांवर कडक तपकिरी सड',
      ],
      organicRemedies: [
        'बाधित झाडे मुळासकट उपटून नष्ट करा',
        '१% बोर्डो मिश्रण फवारा',
      ],
      chemicalRemedies: [
        'मेटालॅक्सिल + मॅनकोझेब (रिडोमिल) @ २.५ ग्रॅम/लिटर फवारा',
      ],
      preventionTips: [
        'तुषार सिंचन टाळा, फक्त ठिबक सिंचन वापरा',
      ],
    },
    bn: {
      cropName: 'টমেটো',
      diseaseName: 'নাবী ধসা রোগ (Late Blight)',
      symptoms: [
        'পাতা ও কাণ্ডে ভেজা কালচে দাগ দ্রুত ছড়িয়ে পড়া',
        'পাতার নিচে সাদা ছত্রাকের আস্তরণ',
        'টমেটো ফলে শক্ত বাদামী পচন',
      ],
      organicRemedies: [
        'আক্রান্ত গাছ তুলে পুড়িয়ে ফেলুন',
        '১% বোর্দো মিশ্রণ স্প্রে করুন',
      ],
      chemicalRemedies: [
        'মেটালাক্সিল + ম্যানকোজেব @ ২.৫ গ্রাম/লিটার স্প্রে করুন',
      ],
      preventionTips: [
        'গাছের পাতায় পানি ছিটানো বন্ধ রাখুন',
      ],
    },
  },

  'Tomato___Septoria_leaf_spot': {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Septoria Leaf Spot',
      symptoms: [
        'Numerous small circular spots (1-3mm) with dark borders and grayish-white centers',
        'Tiny black speckling (pycnidia) inside lesion centers',
        'Rapid yellowing and defoliation starting from ground up',
      ],
      organicRemedies: [
        'Pick off infected lower leaves immediately at first sighting',
        'Apply liquid seaweed fertilizer to reinforce cell wall strength',
        'Spray bio-fungicide Bacillus pumilus @ 4g/L',
      ],
      chemicalRemedies: [
        'Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L',
        'Tebuconazole 25.9% EC @ 1.5ml/L for heavy spread',
      ],
      preventionTips: [
        'Mulch heavily to block soil splash',
        'Stake plants off the ground to improve airflow',
      ],
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'सेप्टोरिया पत्ती धब्बा रोग (Septoria Leaf Spot)',
      symptoms: [
        'पत्तियों पर छोटे गोल धब्बे (1-3 मिमी) जिनके केंद्र भूरे-सफेद और किनारे काले होते हैं',
        'धब्बों के बीच में छोटे काले बिंदु (बीजाणु) दिखाई देना',
        'पत्तियों का तेजी से पीला होकर नीचे से ऊपर की ओर झड़ना',
      ],
      organicRemedies: [
        'संक्रमित निचली पत्तियों को तुरंत तोड़कर नष्ट करें',
        'पौधों की प्रतिरोधक क्षमता बढ़ाने हेतु समुद्री शैवाल (Seaweed) अर्क का छिड़काव करें',
        'बैसिलस प्युमिलस जैव-फफूंदनाशी 4 ग्राम प्रति लीटर छिड़कें',
      ],
      chemicalRemedies: [
        'क्लोरोथैलोनिल 75% WP @ 2 ग्राम या मैंकोजेब @ 2.5 ग्राम प्रति लीटर छिड़कें',
        'टेबुकोनाज़ोल 25.9% EC @ 1.5 मिली प्रति लीटर का उपयोग करें',
      ],
      preventionTips: [
        'मिट्टी पर पुआल की मल्चिंग करें ताकि मिट्टी के छींटे पत्तों पर न पड़ें',
        'पौधों को लकड़ी के सहारे ऊपर बांधें',
      ],
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'செப்டோரியா இலைப்புள்ளி நோய் (Septoria Leaf Spot)',
      symptoms: [
        'இலைகளில் சாம்பல் கலந்த வெள்ளை மையப்பகுதியும் கருமையான ஓரங்களும் கொண்ட சிறிய வட்டப் புள்ளிகள் (1-3 மி.மீ)',
        'புள்ளிகளின் மையத்தில் சிறிய கரும்புள்ளிகள் தோன்றுதல்',
        'கீழ் இலைகள் வேகமாக மஞ்சள் நிறமாகி உதிர்ந்து போதல்',
      ],
      organicRemedies: [
        'நோய் தாக்கப்பட்ட கீழ் இலைகளை உடனடியாகப் பறித்து அப்புறப்படுத்தவும்',
        'கடற்பாசி திரவ உரத்தைத் தெளித்து இலைகளின் நோய் எதிர்ப்புத் திறனை அதிகரிக்கவும்',
        'பேசில்லஸ் பியூமிலஸ் (Bacillus pumilus) உயிரி பூஞ்சாணக் கொல்லியைத் தெளிக்கவும்',
      ],
      chemicalRemedies: [
        'குளோரோதலோனில் 75% WP @ 2 கிராம் அல்லது மேன்கோசெப் @ 2.5 கிராம்/லிட்டர் தண்ணீரில் தெளிக்கவும்',
        'டெபுகோனசோல் 25.9% EC @ 1.5 மி.லி/லிட்டர் தெளிக்கவும்',
      ],
      preventionTips: [
        'மண் சிதறலைத் தடுக்க வைக்கோல் கொண்டு நிலப்போர்வை (Mulching) இடவும்',
        'செடிகளைக் குச்சிகளில் கட்டி நிமிர்த்தி காற்றோட்டத்தை அதிகரிக்கவும்',
      ],
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'సెప్టోరియా ఆకు మచ్చ తెగులు (Septoria Leaf Spot)',
      symptoms: [
        'నల్లటి అంచులతో చిన్న బూడిద రంగు గుండ్రని మచ్చలు',
        'మచ్చల మధ్యలో చిన్న నల్లటి చుక్కలు',
        'ఆకులు వేగంగా పసుపు రంగులోకి మారి రాలడం',
      ],
      organicRemedies: [
        'సోకిన ఆకులను వెంటనే తొలగించండి',
        'జీవ శిలీంద్రనాశిని పిచికారీ చేయండి',
      ],
      chemicalRemedies: [
        'క్లోరోథలోనిల్ @ 2 గ్రా/లీ లేదా మాంకోజెబ్ @ 2.5 గ్రా/లీటర్ పిచికారీ చేయండి',
      ],
      preventionTips: [
        'మొక్కలను కర్రలతో కట్టి నిలబెట్టండి',
      ],
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಸೆಪ್ಟೋರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (Septoria Leaf Spot)',
      symptoms: [
        'ಕಪ್ಪು ಅಂಚುಗಳುಳ್ಳ ಸಣ್ಣ ಬೂದು ಬಣ್ಣದ ದುಂಡಗಿನ ಕಲೆಗಳು',
        'ಎಲೆಗಳು ಬೇಗನೆ ಹಳದಿಯಾಗಿ ಉದುರುವುದು',
      ],
      organicRemedies: [
        'ಬಾಧಿತ ಎಲೆಗಳನ್ನು ಕಿತ್ತುಹಾಕಿ',
      ],
      chemicalRemedies: [
        'ಮ್ಯಾಂಕೋಜೆಬ್ @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ',
      ],
      preventionTips: [
        'ಮಣ್ಣಿನ ಮಲ್ಚಿಂಗ್ ಮಾಡಿ',
      ],
    },
    mr: {
      cropName: 'टोमॅटो',
      diseaseName: 'सेप्टोरिया पानांवरील ठिपके (Septoria Leaf Spot)',
      symptoms: [
        'काळ्या कडा असलेले लहान करडे गोलाकार डाग',
        'पाने पिवळी पडून गळणे',
      ],
      organicRemedies: [
        'बाधित पाने काढून टाका',
      ],
      chemicalRemedies: [
        'मॅनकोझेब @ २.५ ग्रॅम/लिटर फवारा',
      ],
      preventionTips: [
        'झाडांना बांबूचा आधार द्या',
      ],
    },
    bn: {
      cropName: 'টমেটো',
      diseaseName: 'সেপ্টোরিয়া পাতার দাগ (Septoria Leaf Spot)',
      symptoms: [
        'ধূসর কেন্দ্র ও কালো সীমানা বিশিষ্ট ছোট গোলাকার দাগ',
        'পাতা হলুদ হয়ে ঝরে পড়া',
      ],
      organicRemedies: [
        'আক্রান্ত পাতা ছিঁড়ে ফেলুন',
      ],
      chemicalRemedies: [
        'ম্যানকোজেব @ ২.৫ গ্রাম/লিটার স্প্রে করুন',
      ],
      preventionTips: [
        'মালচিং করুন এবং চারা বেঁধে রাখুন',
      ],
    },
  },

  'Tomato___healthy': {
    en: {
      cropName: 'Tomato',
      diseaseName: 'Healthy Leaf',
      symptoms: ['Vibrant, deep green leaf color with clean veins and no necrotic spots'],
      organicRemedies: ['Maintain regular vermicompost top-dressing and Panchagavya foliar spray (30ml/L)'],
      chemicalRemedies: ['No chemical fungicides needed; continue balanced NPK 19:19:19 fertigation'],
      preventionTips: ['Maintain uniform drip watering and regular morning field scouting'],
    },
    hi: {
      cropName: 'टमाटर',
      diseaseName: 'स्वस्थ पत्ती (रोगमुक्त)',
      symptoms: ['गहरा हरा रंग, चमकदार पत्तियां और किसी भी प्रकार के धब्बों या सड़ाव की अनुपस्थिति'],
      organicRemedies: ['वर्मीकम्पोस्ट और पंचगव्य (30 मिली/लीटर) का नियमित फोलियर स्प्रे करें'],
      chemicalRemedies: ['किसी रासायनिक कीटनाशक की आवश्यकता नहीं है; संतुलित 19:19:19 खाद दें'],
      preventionTips: ['नियमित सिंचाई बनाए रखें और सुबह के समय कीटों की निगरानी करते रहें'],
    },
    ta: {
      cropName: 'தக்காளி',
      diseaseName: 'ஆரோக்கியமான இலை (நோய் இல்லை)',
      symptoms: ['அடர் பச்சை நிறம், புள்ளிகள் அற்ற ஆரோக்கியமான இலை அமைப்பு'],
      organicRemedies: ['மண்புழு உரம் மற்றும் பஞ்சகவ்யா (30 மி.லி/லிட்டர்) தெளித்து செழிப்பை அதிகரிக்கவும்'],
      chemicalRemedies: ['ரசாயன மருந்துகள் தேவையில்லை; சமச்சீர் NPK உரமிடுதலைத் தொடரவும்'],
      preventionTips: ['சொட்டுநீர் பாசனத்தை சீராகப் பராமரித்து தினமும் காலையில் ஆய்வு செய்யவும்'],
    },
    te: {
      cropName: 'టమోటా',
      diseaseName: 'ఆరోగ్యకరమైన ఆకు (తెగుళ్లు లేవు)',
      symptoms: ['ఆకుపచ్చని నిగారింపు, ఎటువంటి మచ్చలు లేని ఆకులు'],
      organicRemedies: ['వర్మీకంపోస్ట్ మరియు పంచగవ్య (30 మి.లీ/లీ) పిచికారీ చేయండి'],
      chemicalRemedies: ['రసాయనాలు అవసరం లేదు'],
      preventionTips: ['క్రమం తప్పకుండా నీరు అందించండి'],
    },
    kn: {
      cropName: 'ಟೊಮೆಟೊ',
      diseaseName: 'ಆರೋಗ್ಯಕರ ಎಲೆ (ರೋಗ ಮುಕ್ತ)',
      symptoms: ['ದಟ್ಟ ಹಸಿರು ಬಣ್ಣ, ಯಾವುದೇ ಕಲೆಗಳಿಲ್ಲದ ಎಲೆ'],
      organicRemedies: ['ಎರೆಹುಳು ಗೊಬ್ಬರ ಮತ್ತು ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ'],
      chemicalRemedies: ['ಯಾವುದೇ ರಾಸಾಯನಿಕ ಅಗತ್ಯವಿಲ್ಲ'],
      preventionTips: ['ನಿಯಮಿತವಾಗಿ ತೋಟವನ್ನು ವೀಕ್ಷಿಸಿ'],
    },
    mr: {
      cropName: 'टोमॅटो',
      diseaseName: 'निरोगी पान (रोगमुक्त)',
      symptoms: ['गडद हिरवा रंग व कोणताही डाग नसलेली पाने'],
      organicRemedies: ['गांडूळ खत आणि पंचगव्य (३० मिली/लिटर) फवारा'],
      chemicalRemedies: ['रासायनिक औषधांची गरज नाही'],
      preventionTips: ['नियमित पाणी व्यवस्थापन ठेवा'],
    },
    bn: {
      cropName: 'টমেটো',
      diseaseName: 'সুস্থ পাতা (রোগমুক্ত)',
      symptoms: ['গাঢ় সবুজ সতেজ পাতা, কোনো দাগ বা পচন নেই'],
      organicRemedies: ['ভার্মিকম্পোস্ট এবং জৈব সার প্রয়োগ করুন'],
      chemicalRemedies: ['কোনো রাসায়নিক প্রয়োগের প্রয়োজন নেই'],
      preventionTips: ['নিয়মিত সকালবেলা ফসলের মাঠ পর্যবেক্ষণ করুন'],
    },
  },

  'Potato___Early_blight': {
    en: {
      cropName: 'Potato',
      diseaseName: 'Early Blight',
      symptoms: ['Circular to angular dark brown target spots on bottom leaves', 'Leaves turn yellow and drop crisp'],
      organicRemedies: ['Spray Pseudomonas fluorescens @ 5g/L', 'Apply Copper Oxychloride 50% WP @ 2.5g/L'],
      chemicalRemedies: ['Mancozeb 75% WP @ 2.5g/L or Tebuconazole @ 1ml/L'],
      preventionTips: ['Plant certified disease-free seed tubers', 'Avoid moisture stress during tuber bulking'],
    },
    hi: {
      cropName: 'आलू',
      diseaseName: 'अगेती झुलसा (अर्ली ब्लाइट)',
      symptoms: ['निचले पत्तों पर गोल छल्लेदार गहरे भूरे धब्बे', 'पत्तियां पीली होकर सूखने लगती हैं'],
      organicRemedies: ['स्यूडोमोनास फ्लोरोसेंस @ 5 ग्राम प्रति लीटर छिड़कें', 'कॉपर ऑक्सीक्लोराइड 50% WP @ 2.5 ग्राम छिड़कें'],
      chemicalRemedies: ['मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर पानी में छिड़कें'],
      preventionTips: ['प्रमाणित रोगमुक्त आलू कंद बोएं', 'कंद बनने के समय पर्याप्त नमी रखें'],
    },
    ta: {
      cropName: 'உருளைக்கிழங்கு',
      diseaseName: 'முன்கூட்டிய கருகல் நோய் (Early Blight)',
      symptoms: ['அடி இலைகளில் வட்ட வளைய கரும்பழுப்பு நிறப் புள்ளிகள்', 'இலைகள் மஞ்சள் நிறமாகி உதிர்ந்து போதல்'],
      organicRemedies: ['சூடோமோனாஸ் ஃப்ளோரசன்ஸ் @ 5 கிராம்/லிட்டர் தெளிக்கவும்', 'காப்பர் ஆக்ஸிகுளோரைடு @ 2.5 கிராம் தெளிக்கவும்'],
      chemicalRemedies: ['மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தண்ணீரில் தெளிக்கவும்'],
      preventionTips: ['சான்றளிக்கப்பட்ட நல்விதைக் கிழங்குகளைப் பயிரிடவும்'],
    },
    te: {
      cropName: 'బంగాళాదుంప',
      diseaseName: 'ముందస్తు ఎండు తెగులు (Early Blight)',
      symptoms: ['క్రింది ఆకులపై వలయాకారపు నల్లటి మచ్చలు', 'ఆకులు ఎండి రాలిపోవడం'],
      organicRemedies: ['సూడోమోనాస్ @ 5 గ్రా/లీటర్ పిచికారీ చేయండి'],
      chemicalRemedies: ['మాంకోజెబ్ @ 2.5 గ్రా/లీటర్ పిచికారీ చేయండి'],
      preventionTips: ['ధృవీకరించిన విత్తన దుంపలను వాడండి'],
    },
    kn: {
      cropName: 'ಆಲೂಗಡ್ಡೆ',
      diseaseName: 'ಮುಂಚಿತ ಅಂಗಮಾರಿ (Early Blight)',
      symptoms: ['ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು'],
      organicRemedies: ['ಸ್ಯೂಡೋಮೊನಾಸ್ @ 5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ'],
      chemicalRemedies: ['ಮ್ಯಾಂಕೋಜೆಬ್ @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ'],
      preventionTips: ['ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಬೀಜಗೆಡ್ಡೆ ಬಳಸಿ'],
    },
    mr: {
      cropName: 'बटाटा',
      diseaseName: 'लवकर येणारा करपा (Early Blight)',
      symptoms: ['पानांवर तपकिरी चक्राकार डाग', 'पाने वाळणे'],
      organicRemedies: ['स्यूडोमोनास @ ५ ग्रॅम/लिटर फवारा'],
      chemicalRemedies: ['मॅनकोझेब @ २.५ ग्रॅम/लिटर फवारा'],
      preventionTips: ['प्रमाणित बटाटा बेणे वापरा'],
    },
    bn: {
      cropName: 'আলু',
      diseaseName: 'আগাম ধসা রোগ (Early Blight)',
      symptoms: ['পাতায় বলয়াকার গাঢ় বাদামী দাগ', 'পাতা শুকিয়ে ঝরে পড়া'],
      organicRemedies: ['সিউডোমোনাস @ ৫ গ্রাম/লিটার স্প্রে করুন'],
      chemicalRemedies: ['ম্যানকোজেব @ ২.৫ গ্রাম/লিটার স্প্রে করুন'],
      preventionTips: ['রোগমুক্ত বীজ আলু রোপণ করুন'],
    },
  },

  'Potato___Late_blight': {
    en: {
      cropName: 'Potato',
      diseaseName: 'Late Blight',
      symptoms: ['Water-soaked dark lesions spreading rapidly on leaf margins', 'White downy mold on leaf undersides in wet mornings'],
      organicRemedies: ['Apply 1% Bordeaux mixture before monsoon rain', 'Burn infected haulms immediately'],
      chemicalRemedies: ['Cymoxanil + Mancozeb (Curzate) @ 2g/L or Dimethomorph @ 1.5g/L'],
      preventionTips: ['Earth up potato ridges deeply to protect tubers from spore wash'],
    },
    hi: {
      cropName: 'आलू',
      diseaseName: 'पिछेती झुलसा (लेट ब्लाइट)',
      symptoms: ['पत्तियों के किनारों पर तेजी से फैलने वाले काले-भूरे धब्बे', 'पत्तियों के नीचे सफेद फफूंद'],
      organicRemedies: ['1% बोर्डो मिश्रण का छिड़काव करें', 'संक्रमित पौधों को तुरंत नष्ट करें'],
      chemicalRemedies: ['साइमोक्सानिल + मैंकोजेब (Curzate) @ 2 ग्राम प्रति लीटर छिड़कें'],
      preventionTips: ['आलू के पौधों पर मिट्टी अच्छी तरह चढ़ाएं (Earthing-up) ताकि कंद सुरक्षित रहें'],
    },
    ta: {
      cropName: 'உருளைக்கிழங்கு',
      diseaseName: 'பின்கூட்டிய கருகல் நோய் (Late Blight)',
      symptoms: ['இலை ஓரங்களில் விரைவாகப் பரவும் கரும்பழுப்பு அழுகல்', 'இலைகளின் அடியில் வெள்ளை நிறப் பூஞ்சாணம்'],
      organicRemedies: ['1% போர்டோ கலவை தெளிக்கவும்', 'பாதிக்கப்பட்ட செடிகளை அப்புறப்படுத்தவும்'],
      chemicalRemedies: ['சைமோக்சானில் + மேன்கோசெப் @ 2 கிராம்/லிட்டர் தெளிக்கவும்'],
      preventionTips: ['கிழங்குகள் வெளித்தெரியாதவாறு மண்ணை நன்றாக அணைக்கவும்'],
    },
    te: {
      cropName: 'బంగాళాదుంప',
      diseaseName: 'ఆలస్యపు ఎండు తెగులు (Late Blight)',
      symptoms: ['ఆకులపై నల్లటి కుళ్లు మచ్చలు వేగంగా వ్యాపించడం'],
      organicRemedies: ['1% బోర్డో మిశ్రమం పిచికారీ చేయండి'],
      chemicalRemedies: ['సైమోక్సానిల్ + మాంకోజెబ్ @ 2 గ్రా/లీటర్ వాడండి'],
      preventionTips: ['మొక్క మొదళ్లలో మట్టిని ఎగదోయండి'],
    },
    kn: {
      cropName: 'ಆಲೂಗಡ್ಡೆ',
      diseaseName: 'ತಡವಾದ ಅಂಗಮಾರಿ (Late Blight)',
      symptoms: ['ಎಲೆಗಳ ಅಂಚಿನಲ್ಲಿ ವೇಗವಾಗಿ ಹರಡುವ ಕಪ್ಪು ಕಲೆಗಳು'],
      organicRemedies: ['1% ಬೋರ್ಡೋ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ'],
      chemicalRemedies: ['ಸೈಮೋಕ್ಸಾನಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ @ 2 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ'],
      preventionTips: ['ಗೆಡ್ಡೆಗಳಿಗೆ ಮಣ್ಣು ಮುಚ್ಚಿ'],
    },
    mr: {
      cropName: 'बटाटा',
      diseaseName: 'उशिरा येणारा करपा (Late Blight)',
      symptoms: ['पानांच्या कडांवर वेगाने पसरणारे काळे डाग'],
      organicRemedies: ['१% बोर्डो मिश्रण फवारा'],
      chemicalRemedies: ['सायमोक्सानिल + मॅनकोझेब @ २ ग्रॅम/लिटर फवारा'],
      preventionTips: ['बटाट्याच्या झाडांना चांगली माती लावा'],
    },
    bn: {
      cropName: 'আলু',
      diseaseName: 'নাবী ধসা রোগ (Late Blight)',
      symptoms: ['পাতার কিনারায় দ্রুত বিস্তারশীল ভেজা কালচে দাগ'],
      organicRemedies: ['১% বোর্দো মিশ্রণ স্প্রে করুন'],
      chemicalRemedies: ['সাইমোক্সানিল + ম্যানকোজেব @ ২ গ্রাম/লিটার স্প্রে করুন'],
      preventionTips: ['গাছের গোড়ায় ভালোভাবে মাটি তুলে দিন'],
    },
  },

  'Corn_(maize)___Common_rust_': {
    en: {
      cropName: 'Corn (Maize)',
      diseaseName: 'Common Rust',
      symptoms: ['Golden-brown to cinnamon powdery pustules on both leaf surfaces', 'Leaves turn yellow and dry'],
      organicRemedies: ['Spray Wettable Sulphur 80% WP @ 3g/L', 'Spray fermented butter milk solution'],
      chemicalRemedies: ['Propiconazole 25% EC (Tilt) @ 1ml/L or Azoxystrobin @ 1ml/L'],
      preventionTips: ['Plant rust-resistant hybrid maize varieties', 'Early sowing before humid season'],
    },
    hi: {
      cropName: 'मक्का',
      diseaseName: 'गेरुआ / रतुआ रोग (Common Rust)',
      symptoms: ['पत्तियों के दोनों तरफ सुनहरे-भूरे रंग के दानेदार फफोले (Pustules)', 'पत्तियां पीली होकर सूखने लगती हैं'],
      organicRemedies: ['घुलनशील गंधक (Wettable Sulphur 80%) @ 3 ग्राम प्रति लीटर छिड़कें', 'खट्टी छाछ का घोल छिड़कें'],
      chemicalRemedies: ['प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1 मिली प्रति लीटर छिड़कें'],
      preventionTips: ['रोग प्रतिरोधी संकर मक्का किस्में बोएं', 'समय पर बुवाई करें'],
    },
    ta: {
      cropName: 'மக்காச்சோளம்',
      diseaseName: 'துரு நோய் (Common Rust)',
      symptoms: ['இலைகளின் இருபுறமும் தோன்றும் பொடி போன்ற துருவண்ணப் புள்ளிகள்', 'இலைகள் காய்ந்து போதல்'],
      organicRemedies: ['நனையும் கந்தகம் (Wettable Sulphur) @ 3 கிராம்/லிட்டர் தெளிக்கவும்', 'புளித்த மோர் கரைசல் தெளிக்கவும்'],
      chemicalRemedies: ['புரோபிகோனசோல் 25% EC @ 1 மி.லி/லிட்டர் தண்ணீரில் தெளிக்கவும்'],
      preventionTips: ['நோய் எதிர்ப்புத் திறன் கொண்ட கலப்பின விதைகளைப் பயிரிடவும்'],
    },
    te: {
      cropName: 'మొక్కజొన్న',
      diseaseName: 'తుప్పు తెగులు (Common Rust)',
      symptoms: ['ఆకులపై తుప్పు రంగు పొడి బొబ్బలు'],
      organicRemedies: ['గంధకం (Wettable Sulphur) @ 3 గ్రా/లీ పిచికారీ చేయండి'],
      chemicalRemedies: ['ప్రొపికొనజోల్ @ 1 మి.లీ/లీటర్ పిచికారీ చేయండి'],
      preventionTips: ['రస్ట్ నిరోధక విత్తనాలను ఎంచుకోండి'],
    },
    kn: {
      cropName: 'ಮೆಕ್ಕೆಜೋಳ',
      diseaseName: 'ತುಕ್ಕು ರೋಗ (Common Rust)',
      symptoms: ['ಎಲೆಗಳ ಮೇಲೆ ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ ಪುಡಿಯಂತಹ ಕಲೆಗಳು'],
      organicRemedies: ['ಗಂಧಕದ ಪುಡಿ @ 3 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ'],
      chemicalRemedies: ['ಪ್ರೊಪಿಕೊನಾಜೋಲ್ @ 1 ಮಿ.ಲೀ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ'],
      preventionTips: ['ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಿತ್ತಿ'],
    },
    mr: {
      cropName: 'मका',
      diseaseName: 'तांबेरा रोग (Common Rust)',
      symptoms: ['पानांवर तांबूस-तपकिरी रंगाचे फोड', 'पाने पिवळी पडणे'],
      organicRemedies: ['विद्राव्य गंधक @ ३ ग्रॅम/लिटर फवारा'],
      chemicalRemedies: ['प्रोपिकोनाझोल @ १ मिली/लिटर फवारा'],
      preventionTips: ['रोगप्रतिकारक संकरित वाण पेरा'],
    },
    bn: {
      cropName: 'ভুট্টা',
      diseaseName: 'মরিচা রোগ (Common Rust)',
      symptoms: ['পাতায় সোনালী-বাদামী রঙের মরিচার মতো ফোসকা'],
      organicRemedies: ['সালফার পাউডার @ ৩ গ্রাম/লিটার স্প্রে করুন'],
      chemicalRemedies: ['প্রপিকোনাজল @ ১ মিলি/লিটার স্প্রে করুন'],
      preventionTips: ['উন্নত রোগ প্রতিরোধী জাতের বীজ বপন করুন'],
    },
  },
};

/**
 * Gets fully translated disease content for the selected language.
 * Falls back gracefully to English if a specific regional phrase is unavailable.
 */
export function getLocalizedDiseaseContent(
  diseaseKey: string,
  langCode: string
): LocalizedDiseaseContent | null {
  const diseaseMap = LOCALIZED_DISEASE_DATA[diseaseKey];
  if (!diseaseMap) return null;

  return diseaseMap[langCode] || diseaseMap['en'] || null;
}
