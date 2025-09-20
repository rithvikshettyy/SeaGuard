// Constants for multi-language support for all screens
export const getAvailableLanguages = () => {
  return ['en', 'hi', 'ta', 'te', 'ml'];
};

export const getLanguageNames = () => {
  return {
    en: 'English',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    ml: 'മലയാളം'
  };
};

export const screenTexts = {
  PurposeOnboardingScreen: {
    en: {
      title: "How do you plan to use SeaGuard?",
      subtitle: "Choose your fishing style so we can customize your catch monitoring, analytics, and features to match your goals.",
      hobbyTitle: "Hobby Fisher",
      hobbyDescription: "Track your catches, explore new spots, and celebrate your fishing journey. Ideal for casual or weekend fishing.",
      commercialTitle: "Commercial Fisher",
      commercialDescription: "Monitor catch volumes, manage quotas, and optimize your yield. Perfect for full-time or small business fishing.",
      proceed: "Proceed",
      chooseLanguage: "Choose Language (Default: English IN)"
    },
    hi: {
      title: "आप सीगार्ड का उपयोग कैसे करना चाहते हैं?",
      subtitle: "अपनी मछली पकड़ने की शैली चुनें ताकि हम आपके लक्ष्यों के अनुरूप आपकी पकड़ निगरानी, विश्लेषण और सुविधाओं को अनुकूलित कर सकें।",
      hobbyTitle: "शौकिया मछुआरा",
      hobbyDescription: "अपनी पकड़ को ट्रैक करें, नए स्थान खोजें और अपनी मछली पकड़ने की यात्रा का जश्न मनाएं। आकस्मिक या सप्ताहांत मछली पकड़ने के लिए आदर्श।",
      commercialTitle: "वाणिज्यिक मछुआरा",
      commercialDescription: "पकड़ की मात्रा की निगरानी करें, कोटा प्रबंधित करें और अपनी उपज को अनुकूलित करें। पूर्णकालिक या छोटे व्यवसाय मछली पकड़ने के लिए उपयुक्त।",
      proceed: "आगे बढ़ें",
      chooseLanguage: "भाषा चुनें (डिफ़ॉल्ट: हिंदी)"
    },
    ta: {
      title: "SeaGuard-ஐ எவ்வாறு பயன்படுத்த திட்டமிடுகிறீர்கள்?",
      subtitle: "உங்கள் இலக்குகளுக்கு ஏற்ப உங்கள் பிடிப்பு கண்காணிப்பு, பகுப்பாய்வு மற்றும் அம்சங்களை தனிப்பயனாக்க உங்கள் மீன்பிடி பாணியைத் தேர்வு செய்யவும்.",
      hobbyTitle: "பொழுதுபோக்கு மீனவர்",
      hobbyDescription: "உங்கள் பிடிப்புகளைக் கண்காணிக்கவும், புதிய இடங்களை ஆராயவும், உங்கள் மீன்பிடி பயணத்தை கொண்டாடவும். சாதாரண அல்லது வார இறுதி மீன்பிடிக்கு ஏற்றது.",
      commercialTitle: "வணிக மீனவர்",
      commercialDescription: "பிடிப்பு அளவுகளை கண்காணிக்கவும், ஒதுக்கீடுகளை நிர்வகிக்கவும், உங்கள் மகசூலை உகந்ததாக்கவும். முழு நேர அல்லது சிறு வணிக மீன்பிடிக்கு சிறந்தது.",
      proceed: "தொடரவும்",
      chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும் (இயல்பு: தமிழ்)"
    },
    te: {
      title: "మీరు సీగార్డ్‌ని ఎలా ఉపయోగించాలనుకుంటున్నారు?",
      subtitle: "మీ లక్ష్యాలకు అనుగుణంగా మీ క్యాచ్ మానిటరింగ్, విశ్లేషణలు మరియు ఫీచర్‌లను అనుకూలీకరించడానికి మీ ఫిషింగ్ శైలిని ఎంచుకోండి.",
      hobbyTitle: "హాబీ ఫిషర్",
      hobbyDescription: "మీ పట్టులను ట్రాక్ చేయండి, కొత్త స్పాట్‌లను అన్వేషించండి మరియు మీ ఫిషింగ్ ప్రయాణాన్ని జరుపుకోండి. క్యాజువల్ లేదా వీకెండ్ ఫిషింగ్ కోసం ఆదర్శం.",
      commercialTitle: "కమర్షియల్ ఫిషర్",
      commercialDescription: "క్యాచ్ వాల్యూమ్‌లను పర్యవేక్షించండి, కోటాలను నిర్వహించండి మరియు మీ దిగుబడిని అనుకూలీకరించండి. ఫుల్-టైమ్ లేదా చిన్న వ్యాపార ఫిషింగ్ కోసం పరిపూర్ణం.",
      proceed: "కొనసాగండి",
      chooseLanguage: "భాషను ఎంచుకోండి (డిఫాల్ట్: తెలుగు)"
    },
    ml: {
      title: "നിങ്ങൾ സീഗാർഡ് എങ്ങനെ ഉപയോഗിക്കാൻ ഉദ്ദേശിക്കുന്നു?",
      subtitle: "നിങ്ങളുടെ ലക്ഷ്യങ്ങൾക്ക് അനുസൃതമായി നിങ്ങളുടെ കാച്ച് മോണിറ്ററിംഗ്, അനലിറ്റിക്സ്, ഫീച്ചറുകൾ എന്നിവ ഇഷ്ടാനുസൃതമാക്കാൻ നിങ്ങളുടെ മത്സ്യബന്ധന ശൈലി തിരഞ്ഞെടുക്കുക.",
      hobbyTitle: "ഹോബി ഫിഷർ",
      hobbyDescription: "നിങ്ങളുടെ പിടിത്തങ്ങൾ ട്രാക്ക് ചെയ്യുക, പുതിയ സ്പോട്ടുകൾ കണ്ടെത്തുക, നിങ്ങളുടെ മീൻപിടിത്ത യാത്ര ആഘോഷിക്കുക. സാധാരണ അല്ലെങ്കിൽ വാരാന്ത്യ മീൻപിടിത്തത്തിന് ഏറ്റവും അനുയോജ്യം.",
      commercialTitle: "കൊമേഴ്‌സ്യൽ ഫിഷർ",
      commercialDescription: "പിടിച്ച അളവുകൾ നിരീക്ഷിക്കുക, ക്വോട്ടകൾ കൈകാര്യം ചെയ്യുക, നിങ്ങളുടെ വിളവ് ഒപ്റ്റിമൈസ് ചെയ്യുക. ഫുൾ-ടൈം അല്ലെങ്കിൽ ചെറുകിട ബിസിനസ് മത്സ്യബന്ധനത്തിന് പറ്റിയത്.",
      proceed: "തുടരുക",
      chooseLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക (ഡിഫോൾട്ട്: മലയാളം)"
    }
  },
  LoginScreen: {
    en: {
      title: "Welcome user!\nGlad to see you again!",
      phone: "Phone Number",
      otp: "Enter OTP",
      resendOtp: "resend OTP",
      login: "Login",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      chooseLanguage: "🌐 Choose Language (Default: English IN)",
      errors: {
        missingFields: "Please enter phone number and OTP."
      }
    },
    hi: {
      title: "स्वागत है!\nआपको दोबारा देखकर खुशी हुई!",
      phone: "फ़ोन नंबर",
      otp: "ओटीपी दर्ज करें",
      resendOtp: "ओटीपी पुनः भेजें",
      login: "लॉग इन",
      noAccount: "खाता नहीं है?",
      signUp: "साइन अप करें",
      chooseLanguage: "🌐 भाषा चुनें (डिफ़ॉल्ट: हिंदी)",
      errors: {
        missingFields: "कृपया फोन नंबर और ओटीपी दर्ज करें।"
      }
    },
    ta: {
      title: "வரவேற்கிறோம்!\nமீண்டும் உங்களைப் பார்த்ததில் மகிழ்ச்சி!",
      phone: "ஃபோன் எண்",
      otp: "OTP ஐ உள்ளிடவும்",
      resendOtp: "OTP ஐ மீண்டும் அனுப்பு",
      login: "உள்நுழைய",
      noAccount: "கணக்கு இல்லையா?",
      signUp: "பதிவு செய்க",
      chooseLanguage: "🌐 மொழியைத் தேர்ந்தெடுக்கவும் (இயல்பு: தமிழ்)",
      errors: {
        missingFields: "தயவுசெய்து ஃபோன் எண் மற்றும் OTP ஐ உள்ளிடவும்."
      }
    },
    te: {
      title: "స్వాగతం!\nమిమ్మల్ని మళ్ళీ చూడటం సంతోషంగా ఉంది!",
      phone: "ఫోన్ నంబర్",
      otp: "OTP ని నమోదు చేయండి",
      resendOtp: "OTP ని మళ్ళీ పంపండి",
      login: "లాగిన్",
      noAccount: "ఖాతా లేదా?",
      signUp: "సైన్ అప్ చేయండి",
      chooseLanguage: "🌐 భాషను ఎంచుకోండి (డిఫాల్ట్: తెలుగు)",
      errors: {
        missingFields: "దయచేసి ఫోన్ నంబర్ మరియు OTP ని నమోదు చేయండి."
      }
    },
    ml: {
      title: "സ്വാഗതം!\nനിങ്ങളെ വീണ്ടും കാണാൻ സന്തോഷം!",
      phone: "ഫോൺ നമ്പർ",
      otp: "OTP നൽകുക",
      resendOtp: "OTP വീണ്ടും അയയ്ക്കുക",
      login: "ലോഗിൻ",
      noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
      signUp: "സൈൻ അപ്പ്",
      chooseLanguage: "🌐 ഭാഷ തിരഞ്ഞെടുക്കുക (ഡിഫോൾട്ട്: മലയാളം)",
      errors: {
        missingFields: "ദയവായി ഫോൺ നമ്പറും OTP യും നൽകുക."
      }
    }
  },
  HomeScreen: {
    en: {
      title: "Home",
      welcome: "Welcome to SeaGuard!",
      common: {
        loading: "Loading...",
        hours: "Hours"
      },
      buttons: {
        emergencySos: "Emergency SOS",
        retry: "Retry"
      },
      location: {
        permissionDenied: "Permission to access location was denied",
        lastUpdate: "Last Update",
        loading: "Loading location..."
      },
      weather: {
        title: "Weather Information",
        feelsLike: "Feels Like",
        humidity: "Humidity",
        chanceOfRain: "Chance of Rain",
        pressure: "Pressure",
        windSpeed: "Wind Speed",
        descriptions: {
          "0": "Clear sky",
          "1": "Mainly clear",
          "2": "Partly cloudy",
          "3": "Overcast",
          "45": "Fog",
          "48": "Depositing rime fog",
          "51": "Light drizzle",
          "53": "Moderate drizzle",
          "55": "Dense drizzle",
          "56": "Light freezing drizzle",
          "57": "Dense freezing drizzle",
          "61": "Slight rain",
          "63": "Moderate rain",
          "65": "Heavy rain",
          "66": "Light freezing rain",
          "67": "Heavy freezing rain",
          "71": "Slight snow fall",
          "73": "Moderate snow fall",
          "75": "Heavy snow fall",
          "77": "Snow grains",
          "80": "Slight rain showers",
          "81": "Moderate rain showers",
          "82": "Violent rain showers",
          "85": "Slight snow showers",
          "86": "Heavy snow showers",
          "95": "Thunderstorm",
          "96": "Thunderstorm with slight hail",
          "99": "Thunderstorm with heavy hail",
          unknown: "Unknown weather condition"
        }
      },
      ocean: {
        title: "Ocean Conditions",
        waveHeight: "Wave Height",
        waveDirection: "Wave Direction",
        windWavePeriod: "Wind Wave Period"
      },
      errors: {
        fetchFailed: "Failed to fetch fishing alert: {error}",
        general: "An error occurred: {error}"
      },
      fishing: {
        status: "Fishing Status",
        conditions: "Fishing Conditions"
      }
    },
    hi: {
      title: "होम",
      welcome: "सीगार्ड में आपका स्वागत है!",
      common: {
        loading: "लोड हो रहा है...",
        hours: "घंटे"
      },
      buttons: {
        emergencySos: "आपातकालीन एसओएस",
        retry: "पुनः प्रयास करें"
      },
      location: {
        permissionDenied: "स्थान तक पहुंच की अनुमति नहीं मिली",
        lastUpdate: "अंतिम अपडेट",
        loading: "स्थान लोड हो रहा है..."
      },
      weather: {
        title: "मौसम की जानकारी",
        feelsLike: "महसूस होता है",
        humidity: "नमी",
        chanceOfRain: "बारिश की संभावना",
        pressure: "वायुदाब",
        windSpeed: "हवा की गति",
        descriptions: {
          "0": "साफ आसमान",
          "1": "मुख्यतः साफ",
          "2": "आंशिक बादल",
          "3": "बादल छाए",
          "45": "कोहरा",
          "48": "तुषार कोहरा",
          "51": "हल्की बूंदाबांदी",
          "53": "मध्यम बूंदाबांदी",
          "55": "घनी बूंदाबांदी",
          "56": "हल्की बर्फीली बूंदाबांदी",
          "57": "घनी बर्फीली बूंदाबांदी",
          "61": "हल्की बारिश",
          "63": "मध्यम बारिश",
          "65": "तेज बारिश",
          "66": "हल्की बर्फीली बारिश",
          "67": "तेज बर्फीली बारिश",
          "71": "हल्की बर्फबारी",
          "73": "मध्यम बर्फबारी",
          "75": "भारी बर्फबारी",
          "77": "बर्फ के कण",
          "80": "हल्की बारिश की बौछारें",
          "81": "मध्यम बारिश की बौछारें",
          "82": "तेज बारिश की बौछारें",
          "85": "हल्की बर्फ की बौछारें",
          "86": "भारी बर्फ की बौछारें",
          "95": "तूफान",
          "96": "हल्के ओलों वाला तूफान",
          "99": "भारी ओलों वाला तूफान",
          unknown: "अज्ञात मौसम स्थिति"
        }
      },
      ocean: {
        title: "समुद्र की स्थिति",
        waveHeight: "लहर की ऊंचाई",
        waveDirection: "लहर की दिशा",
        windWavePeriod: "हवा की लहर अवधि"
      },
      errors: {
        fetchFailed: "मछली पकड़ने की चेतावनी प्राप्त करने में विफल: {error}",
        general: "एक त्रुटि हुई: {error}"
      },
      fishing: {
        status: "मछली पकड़ने की स्थिति",
        conditions: "मछली पकड़ने की परिस्थितियां"
      }
    },
    ta: {
      title: "முகப்பு",
      welcome: "சீகார்டுக்கு வரவேற்கிறோம்!",
      common: {
        loading: "ஏற்றுகிறது...",
        hours: "மணி"
      },
      buttons: {
        emergencySos: "அவசர SOS",
        retry: "மீண்டும் முயற்சி"
      },
      location: {
        permissionDenied: "இருப்பிட அணுகல் மறுக்கப்பட்டது",
        lastUpdate: "கடைசி புதுப்பிப்பு",
        loading: "இருப்பிடத்தை ஏற்றுகிறது..."
      },
      weather: {
        title: "வானிலை தகவல்",
        feelsLike: "உணர்கிறது",
        humidity: "ஈரப்பதம்",
        chanceOfRain: "மழை பெய்ய வாய்ப்பு",
        pressure: "அழுத்தம்",
        windSpeed: "காற்றின் வேகம்",
        descriptions: {
          "0": "தெளிவான வானம்",
          "1": "பெரும்பாலும் தெளிவாக",
          "2": "பகுதி மேகமூட்டம்",
          "3": "மேகமூட்டம்",
          "45": "மூடுபனி",
          "48": "உறைபனி",
          "51": "லேசான தூறல்",
          "53": "மிதமான தூறல்",
          "55": "கனமான தூறல்",
          "56": "லேசான உறைபனி தூறல்",
          "57": "கனமான உறைபனி தூறல்",
          "61": "லேசான மழை",
          "63": "மிதமான மழை",
          "65": "கனமழை",
          "66": "லேசான உறை மழை",
          "67": "கனமான உறை மழை",
          "71": "லேசான பனிப்பொழிவு",
          "73": "மிதமான பனிப்பொழிவு",
          "75": "கனமான பனிப்பொழிவு",
          "77": "பனித்துகள்கள்",
          "80": "லேசான மழைப்பொழிவு",
          "81": "மிதமான மழைப்பொழிவு",
          "82": "கடுமையான மழைப்பொழிவு",
          "85": "லேசான பனிப்பொழிவு",
          "86": "கனமான பனிப்பொழிவு",
          "95": "இடியுடன் கூடிய மழை",
          "96": "லேசான ஆலங்கட்டியுடன் இடி மழை",
          "99": "கனமான ஆலங்கட்டியுடன் இடி மழை",
          unknown: "அறியப்படாத வானிலை நிலை"
        }
      },
      ocean: {
        title: "கடல் நிலைமைகள்",
        waveHeight: "அலை உயரம்",
        waveDirection: "அலை திசை",
        windWavePeriod: "காற்று அலை காலம்"
      },
      errors: {
        fetchFailed: "மீன்பிடி எச்சரிக்கையை பெற முடியவில்லை: {error}",
        general: "பிழை ஏற்பட்டது: {error}"
      },
      fishing: {
        status: "மீன்பிடி நிலை",
        conditions: "மீன்பிடி நிலைமைகள்"
      }
    },
    te: {
      title: "హోమ్",
      welcome: "సీగార్డ్‌కి స్వాగతం!",
      common: {
        loading: "లోడ్ అవుతోంది...",
        hours: "గంటలు"
      },
      buttons: {
        emergencySos: "అత్యవసర SOS",
        retry: "మళ్లీ ప్రయత్నించండి"
      },
      location: {
        permissionDenied: "స్థానాన్ని యాక్సెస్ చేయడానికి అనుమతి నిరాకరించబడింది",
        lastUpdate: "చివరి నవీకరణ",
        loading: "స్థానం లోడ్ అవుతోంది..."
      },
      weather: {
        title: "వాతావరణ సమాచారం",
        feelsLike: "అనిపిస్తుంది",
        humidity: "తేమ",
        chanceOfRain: "వర్షం పడే అవకాశం",
        pressure: "ఒత్తిడి",
        windSpeed: "గాలి వేగం",
        descriptions: {
          "0": "నిర్మలమైన ఆకాశం",
          "1": "ప్రధానంగా నిర్మలం",
          "2": "పాక్షికంగా మేఘావృతం",
          "3": "మేఘావృతం",
          "45": "పొగమంచు",
          "48": "మంచు పొగమంచు",
          "51": "తేలికపాటి జల్లు",
          "53": "మధ్యస్థ జల్లు",
          "55": "దట్టమైన జల్లు",
          "56": "తేలికపాటి మంచు జల్లు",
          "57": "దట్టమైన మంచు జల్లు",
          "61": "తేలికపాటి వర్షం",
          "63": "మధ్యస్థ వర్షం",
          "65": "భారీ వర్షం",
          "66": "తేలికపాటి మంచు వర్షం",
          "67": "భారీ మంచు వర్షం",
          "71": "తేలికపాటి మంచు",
          "73": "మధ్యస్థ మంచు",
          "75": "భారీ మంచు",
          "77": "మంచు రేణువులు",
          "80": "తేలికపాటి వర్షపు జల్లులు",
          "81": "మధ్యస్థ వర్షపు జల్లులు",
          "82": "తీవ్రమైన వర్షపు జల్లులు",
          "85": "తేలికపాటి మంచు జల్లులు",
          "86": "భారీ మంచు జల్లులు",
          "95": "ఉరుములతో కూడిన వర్షం",
          "96": "తేలికపాటి వడగళ్లతో ఉరుములు",
          "99": "భారీ వడగళ్లతో ఉరుములు",
          unknown: "తెలియని వాతావరణ పరిస్థితి"
        }
      },
      ocean: {
        title: "సముద్ర పరిస్థితులు",
        waveHeight: "అల ఎత్తు",
        waveDirection: "అల దిశ",
        windWavePeriod: "గాలి అల కాలం"
      },
      errors: {
        fetchFailed: "చేపల వేట హెచ్చరికను పొందడంలో విఫలం: {error}",
        general: "లోపం సంభవించింది: {error}"
      },
      fishing: {
        status: "చేపల వేట స్థితి",
        conditions: "చేపల వేట పరిస్థితులు"
      }
    },
    ml: {
      title: "ഹോം",
      welcome: "സീഗാർഡിലേക്ക് സ്വാഗതം!",
      common: {
        loading: "ലോഡ് ചെയ്യുന്നു...",
        hours: "മണിക്കൂർ"
      },
      buttons: {
        emergencySos: "അടിയന്തിര SOS",
        retry: "വീണ്ടും ശ്രമിക്കുക"
      },
      location: {
        permissionDenied: "സ്ഥാനം ആക്സസ് ചെയ്യാനുള്ള അനുമതി നിഷേധിച്ചു",
        lastUpdate: "അവസാന അപ്ഡേറ്റ്",
        loading: "സ്ഥാനം ലോഡ് ചെയ്യുന്നു..."
      },
      weather: {
        title: "കാലാവസ്ഥ വിവരങ്ങൾ",
        feelsLike: "അനുഭവപ്പെടുന്നത്",
        humidity: "ആർദ്രത",
        chanceOfRain: "മഴ പെയ്യാനുള്ള സാധ്യത",
        pressure: "മർദ്ദം",
        windSpeed: "കാറ്റിന്റെ വേഗത",
        descriptions: {
          "0": "തെളിഞ്ഞ ആകാശം",
          "1": "പ്രധാനമായും തെളിഞ്ഞത്",
          "2": "ഭാഗികമായി മേഘാവൃതം",
          "3": "മേഘാവൃതം",
          "45": "മൂടൽമഞ്ഞ്",
          "48": "മഞ്ഞുപാളി",
          "51": "നേർത്ത മഴത്തുള്ളി",
          "53": "മിതമായ മഴത്തുള്ളി",
          "55": "കനത്ത മഴത്തുള്ളി",
          "56": "നേർത്ത മഞ്ഞുമഴ",
          "57": "കനത്ത മഞ്ഞുമഴ",
          "61": "നേർത്ത മഴ",
          "63": "മിതമായ മഴ",
          "65": "കനത്ത മഴ",
          "66": "നേർത്ത മഞ്ഞുമഴ",
          "67": "കനത്ത മഞ്ഞുമഴ",
          "71": "നേർത്ത മഞ്ഞുവീഴ്ച",
          "73": "മിതമായ മഞ്ഞുവീഴ്ച",
          "75": "കനത്ത മഞ്ഞുവീഴ്ച",
          "77": "മഞ്ഞുകണങ്ങൾ",
          "80": "നേർത്ത മഴ",
          "81": "മിതമായ മഴ",
          "82": "കനത്ത മഴ",
          "85": "നേർത്ത മഞ്ഞുമഴ",
          "86": "കനത്ത മഞ്ഞുമഴ",
          "95": "ഇടിമിന്നലോടുകൂടിയ മഴ",
          "96": "നേർത്ത ആലിപ്പഴത്തോടുകൂടിയ ഇടിമിന്നൽ",
          "99": "കനത്ത ആലിപ്പഴത്തോടുകൂടിയ ഇടിമിന്നൽ",
          unknown: "അജ്ഞാത കാലാവസ്ഥ"
        }
      },
      ocean: {
        title: "സമുദ്ര അവസ്ഥകൾ",
        waveHeight: "തിരമാല ഉയരം",
        waveDirection: "തിരമാല ദിശ",
        windWavePeriod: "കാറ്റ് തിരമാല കാലയളവ്"
      },
      errors: {
        fetchFailed: "മത്സ്യബന്ധന മുന്നറിയിപ്പ് ലഭ്യമാക്കുന്നതിൽ പരാജയം: {error}",
        general: "പിശക് സംഭവിച്ചു: {error}"
      },
      fishing: {
        status: "മത്സ്യബന്ധന സ്ഥിതി",
        conditions: "മത്സ്യബന്ധന അവസ്ഥകൾ"
      }
    }
  },
  ChatScreen: {
    en: {
      title: "Chat",
      send: "Send",
      placeholder: "Type your message...",
      initialBotMessage: "Hello! I am SeaBot, your AI assistant. How can I help you today?",
      errorMessages: {
        connection: "Sorry, I am having trouble connecting. Please try again later.",
        micPermission: "Permission to access microphone is required!"
      },
      recording: {
        start: "Start Recording",
        stop: "Stop Recording"
      }
    },
    hi: {
      title: "चैट",
      send: "भेजें",
      placeholder: "अपना संदेश लिखें...",
      initialBotMessage: "नमस्ते! मैं सीबॉट हूं, आपका AI सहायक। मैं आज आपकी कैसे मदद कर सकता हूं?",
      errorMessages: {
        connection: "क्षमा करें, मुझे कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।",
        micPermission: "माइक्रोफ़ोन तक पहुंच की अनुमति आवश्यक है!"
      },
      recording: {
        start: "रिकॉर्डिंग शुरू करें",
        stop: "रिकॉर्डिंग रोकें"
      }
    },
    ta: {
      title: "அரட்டை",
      send: "அனுப்பு",
      placeholder: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
      initialBotMessage: "வணக்கம்! நான் சீபாட், உங்கள் AI உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      errorMessages: {
        connection: "மன்னிக்கவும், இணைப்பதில் சிக்கல் உள்ளது. பிறகு முயற்சிக்கவும்.",
        micPermission: "மைக்ரோஃபோன் அணுகல் அனுமதி தேவை!"
      },
      recording: {
        start: "பதிவு தொடங்கு",
        stop: "பதிவை நிறுத்து"
      }
    },
    te: {
      title: "చాట్",
      send: "పంపు",
      placeholder: "మీ సందేశాన్ని టైప్ చేయండి...",
      initialBotMessage: "హలో! నేను సీబాట్, మీ AI సహాయకుడిని. నేను ఈరోజు మీకు ఎలా సహాయం చేయగలను?",
      errorMessages: {
        connection: "క్షమించండి, కనెక్ట్ చేయడంలో సమస్య ఉంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
        micPermission: "మైక్రోఫోన్‌ని యాక్సెస్ చేయడానికి అనుమతి అవసరం!"
      },
      recording: {
        start: "రికార్డింగ్ ప్రారంభించు",
        stop: "రికార్డింగ్ ఆపు"
      }
    },
    ml: {
      title: "ചാറ്റ്",
      send: "അയയ്‌ക്കുക",
      placeholder: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
      initialBotMessage: "ഹലോ! ഞാൻ സീബോട്ട്, നിങ്ങളുടെ AI അസിസ്റ്റന്റ്. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?",
      errorMessages: {
        connection: "ക്ഷമിക്കണം, കണക്റ്റ് ചെയ്യുന്നതിൽ പ്രശ്നമുണ്ട്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",
        micPermission: "മൈക്രോഫോൺ ആക്‌സസ് ചെയ്യാനുള്ള അനുമതി ആവശ്യമാണ്!"
      },
      recording: {
        start: "റെക്കോർഡിംഗ് ആരംഭിക്കുക",
        stop: "റെക്കോർഡിംഗ് നിർത്തുക"
      }
    }
  }
};