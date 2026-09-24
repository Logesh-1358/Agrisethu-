import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subTagline: string;
  
  // Roles
  roleFarmer: string;
  roleFPO: string;
  roleBuyer: string;
  roleAdmin: string;
  roleJudge: string;
  
  // Tabs / Navigation
  navHome: string;
  navSell: string;
  navMarkets: string;
  navOffers: string;
  navSellWindow: string;
  navLogistics: string;
  navOrders: string;
  navHelp: string;
  navProfile: string;
  
  // Quick Actions (Farmer Friendly / Low-Literacy)
  quickSellCrop: string;
  quickSellCropSub: string;
  quickMarketPrices: string;
  quickMarketPricesSub: string;
  quickSellGuide: string;
  quickSellGuideSub: string;
  quickMyLots: string;
  quickMyLotsSub: string;
  quickMySales: string;
  quickMySalesSub: string;
  quickLogistics: string;
  quickLogisticsSub: string;
  quickHelp: string;
  quickHelpSub: string;
  
  // Greetings
  greeting: string;
  greetingSub: string;
  locationLabel: string;
  todayMarketHeader: string;
  bestNearbyPriceBadge: string;
  marketDisclaimer: string;
  
  // AI Matching WOW Moment
  aiAnalyzingNotice: string;
  bestBuyerHeader: string;
  highestPriceWarning: string;
  highestPriceSub: string;
  whyAiSelectedThis: string;
  viewAndAcceptOffer: string;
  earnMoreBadge: (amount: number) => string;
  
  // Explainable AI Factors
  factorNetProfit: string;
  factorBuyerReliability: string;
  factorPaymentReliability: string;
  factorTransportCost: string;
  factorDemandMatch: string;
  factorDistance: string;
  factorRisk: string;
  
  // Sell Window
  sellWindowHeader: string;
  sellNowTitle: string;
  sellNowSub: string;
  waitDaysTitle: (days: number) => string;
  waitDaysSub: (gain: number) => string;
  partialSellTitle: string;
  partialSellSub: string;
  partialSellBtn: string;
  
  // Common / Buttons
  verifiedBadge: string;
  pendingBadge: string;
  readAloudBtn: string;
  voiceAssistantBtn: string;
  startSihDemoBtn: string;
  demoDataNotice: string;
  aiEstimateNotice: string;
  tonsUnit: string;
  kgUnit: string;
  perKgUnit: string;
  orderTrackerBtn: (step: number) => string;
  viewAllOffersBtn: string;
  addNewLotBtn: string;
  activeLotsHeader: string;
  offersTitle: string;
  offersSub: string;
  acceptBtn: string;
  rejectBtn: string;
  counterBtn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  // 1. ENGLISH
  en: {
    appName: 'AGRISETU',
    tagline: 'Know the Price. Find the Buyer. Sell at the Right Time.',
    subTagline: 'AI-powered agricultural market intelligence & direct buyer linkage protocol',
    
    roleFarmer: 'Farmer',
    roleFPO: 'FPO Mode',
    roleBuyer: 'Buyer Portal',
    roleAdmin: 'State Admin',
    roleJudge: 'Judge Mode ⚖️',
    
    navHome: 'Home',
    navSell: 'Sell My Crop',
    navMarkets: 'Market Prices',
    navOffers: 'Best Buyer & Deals',
    navSellWindow: 'Sell Guide',
    navLogistics: 'Logistics & Storage',
    navOrders: 'My Sales',
    navHelp: 'Help & Grievance',
    navProfile: 'My Profile',
    
    quickSellCrop: '🌾 SELL MY CROP',
    quickSellCropSub: 'Find the best buyer with direct cash benefit',
    quickMarketPrices: '📊 MARKET PRICES',
    quickMarketPricesSub: "Check today's APMC mandi arrival rates",
    quickSellGuide: '🤖 AI SELL GUIDE',
    quickSellGuideSub: 'Should I sell now or wait for price rise?',
    quickMyLots: '📦 MY CROP LOTS',
    quickMyLotsSub: 'View digital produce cards & photos',
    quickMySales: '💰 MY SALES & PAYMENTS',
    quickMySalesSub: 'Track advances, escrow & final bank settlement',
    quickLogistics: '🚚 LOGISTICS & STORAGE',
    quickLogisticsSub: 'Book nearby pickup trucks & cold storage',
    quickHelp: '🆘 HELP & COMPLAINTS',
    quickHelpSub: 'Instant dispute arbitration & helpline',
    
    greeting: 'Welcome! 👋',
    greetingSub: 'Good morning, Farmer.',
    locationLabel: '📍 Karamadai, Coimbatore',
    todayMarketHeader: "TODAY'S MANDI MARKET INTELLIGENCE",
    bestNearbyPriceBadge: '🟢 Best nearby market price: ₹26/kg (Pollachi)',
    marketDisclaimer: 'Mandi price is not the only factor. AGRISETU AI deducts transport, commission, and payment risk before recommending where to sell.',
    
    aiAnalyzingNotice: 'AGRISETU AI is analyzing market prices, buyer demand, transport cost, storage options, payment history, and net profit...',
    bestBuyerHeader: '🥇 BEST BUYER FOR YOU',
    highestPriceWarning: '⚠️ HIGHEST PRICE ≠ HIGHEST PROFIT',
    highestPriceSub: 'Buyer C offered ₹29/kg, but ₹3,000 transport and high risk leaves you with less money. Buyer B gives the highest in-pocket cash!',
    whyAiSelectedThis: 'Why did AI select this buyer?',
    viewAndAcceptOffer: 'Accept Offer & Schedule Pickup',
    earnMoreBadge: (amount) => `You earn ₹${amount.toLocaleString('en-IN')} more in pocket than the next buyer!`,
    
    factorNetProfit: 'Expected Net Profit',
    factorBuyerReliability: 'Buyer Trust & Verification',
    factorPaymentReliability: 'Payment Speed (48 hrs)',
    factorTransportCost: 'Low Transport Deduction',
    factorDemandMatch: 'Volume & Quality Match',
    factorDistance: 'Proximity (24 km)',
    factorRisk: 'Zero Transaction Risk',
    
    sellWindowHeader: 'SMART SELL WINDOW (TIMING ADVICE)',
    sellNowTitle: 'SELL NOW 🟢',
    sellNowSub: 'Dispatch today. Holding incurs storage cost without matching upside.',
    waitDaysTitle: (days) => `WAIT ${days} DAYS 🟡`,
    waitDaysSub: (gain) => `Expected price rise outpaces storage cost by ₹${gain.toLocaleString('en-IN')}!`,
    partialSellTitle: 'SMART SPLIT / PARTIAL SELL 💡',
    partialSellSub: 'Sell 600 kg NOW (protect cash flow) • Keep 400 kg for 3 days (capture upside)',
    partialSellBtn: 'Apply Smart Split Strategy',
    
    verifiedBadge: 'Verified Producer',
    pendingBadge: 'Pending Verification',
    readAloudBtn: '🔊 Read Aloud',
    voiceAssistantBtn: '🎤 Voice AI',
    startSihDemoBtn: '🎬 START SIH DEMO',
    demoDataNotice: 'DEMO DATA',
    aiEstimateNotice: 'AI ESTIMATE',
    tonsUnit: 'Tons',
    kgUnit: 'kg',
    perKgUnit: 'per kg',
    orderTrackerBtn: (step) => `Track Order (${step}/7)`,
    viewAllOffersBtn: 'View All Offers',
    addNewLotBtn: 'Create New Lot',
    activeLotsHeader: 'Your Active Produce Lots',
    offersTitle: 'Direct Buyer Offers',
    offersSub: 'Commercial bids received from verified wholesale buyers & food processors',
    acceptBtn: 'Accept Offer ✅',
    rejectBtn: 'Decline ❌',
    counterBtn: 'Counter-Offer 🔄'
  },

  // 2. TAMIL (தமிழ்)
  ta: {
    appName: 'அக்ரிசேது (AGRISETU)',
    tagline: 'விலையை அறிவோம். வாங்குபவரை இணைப்போம். சரியான நேரத்தில் விற்போம்.',
    subTagline: 'விவசாயிகளையும் நேரடி கொள்முதல் நிறுவனங்களையும் இணைக்கும் செயற்கை நுண்ணறிவு தளம்',
    
    roleFarmer: 'விவசாயி',
    roleFPO: 'உழவர் உற்பத்தியாளர் (FPO)',
    roleBuyer: 'வாங்குபவர் தளம்',
    roleAdmin: 'மாநில நிர்வாகி',
    roleJudge: 'நடுவர் பார்வை ⚖️',
    
    navHome: 'முகப்பு',
    navSell: 'பயிரை விற்க',
    navMarkets: 'மண்டி விலை',
    navOffers: 'சிறந்த வாங்குபவர்',
    navSellWindow: 'விற்பனை வழிகாட்டி',
    navLogistics: 'போக்குவரத்து & சேமிப்பு',
    navOrders: 'என் விற்பனைகள்',
    navHelp: 'உதவி & புகார்',
    navProfile: 'என் சுயவிவரம்',
    
    quickSellCrop: '🌾 என் பயிரை விற்க',
    quickSellCropSub: 'அதிக லாபம் தரும் சிறந்த வாங்குபவரைக் கண்டறியவும்',
    quickMarketPrices: '📊 இன்றைய மண்டி நிலவரம்',
    quickMarketPricesSub: 'அருகிலுள்ள சந்தைகளின் வரத்து மற்றும் விலைகள்',
    quickSellGuide: '🤖 விற்பனை வழிகாட்டி',
    quickSellGuideSub: 'இன்றே விற்கவா? அல்லது விலை உயரும் வரை காத்திருக்கவா?',
    quickMyLots: '📦 என் விளைபொருட்கள்',
    quickMyLotsSub: 'பதிவு செய்யப்பட்ட பயிர் விபரங்கள் மற்றும் புகைப்படங்கள்',
    quickMySales: '💰 விற்பனை & பணம்',
    quickMySalesSub: 'முன்பணம் மற்றும் வங்கிக் கணக்கு நிலவரம்',
    quickLogistics: '🚚 வண்டி & குளிர்பதன கிடங்கு',
    quickLogisticsSub: 'குறைந்த வாடகை சரக்கு வாகனம் மற்றும் சேமிப்பு கிடங்கு',
    quickHelp: '🆘 உதவி & புகார் மையம்',
    quickHelpSub: 'உடனடி தீர்வு மற்றும் அரசு உதவி எண்',
    
    greeting: 'வணக்கம்! 👋',
    greetingSub: 'காலை வணக்கம், விவசாயி அவர்களே.',
    locationLabel: '📍 காரமடை, கோயம்புத்தூர்',
    todayMarketHeader: 'இன்றைய மண்டி சந்தை நிலவரம்',
    bestNearbyPriceBadge: '🟢 சிறந்த அருகாமை விலை: ₹26/கிலோ (பொள்ளாச்சி)',
    marketDisclaimer: 'சந்தை விலை மட்டுமே முக்கியமல்ல. போக்குவரத்துச் செலவு மற்றும் வாங்குபவரின் நம்பகத்தன்மையை கணக்கிட்டே அக்ரிசேது பரிந்துரைக்கிறது.',
    
    aiAnalyzingNotice: 'அக்ரிசேது AI சந்தை விலை, போக்குவரத்து கட்டணம், குளிர்பதன செலவு மற்றும் நிகர லாபத்தை கணக்கிடுகிறது...',
    bestBuyerHeader: '🥇 உங்களுக்கான சிறந்த வாங்குபவர்',
    highestPriceWarning: '⚠️ அதிகபட்ச விலை = அதிக லாபம் அல்ல!',
    highestPriceSub: 'வாங்குபவர் சி ₹29 கொடுத்தாலும், ₹3,000 போக்குவரத்து கழிந்தால் குறைவான பணமே மிஞ்சும். வாங்குபவர் பி (ஸ்ரீ லக்ஷ்மி ஃபுட்ஸ்) உங்களுக்கு அதிக நிகர லாபம் தருகிறார்!',
    whyAiSelectedThis: 'ஏன் இந்த வாங்குபவரை AI தேர்ந்தெடுத்தது?',
    viewAndAcceptOffer: 'ஒப்பந்தத்தை ஏற்று வண்டியை முன்பதிவு செய்',
    earnMoreBadge: (amount) => `அடுத்த வாங்குபவரை விட உங்கள் கையில் ₹${amount.toLocaleString('en-IN')} கூடுதல் லாபம் கிடைக்கிறது!`,
    
    factorNetProfit: 'உண்மையான நிகர லாபம் (40%)',
    factorBuyerReliability: 'நம்பகத்தன்மை & சான்றிதழ் (20%)',
    factorPaymentReliability: 'வேகமான பணம் தருதல் (48 மணி நேரம்)',
    factorTransportCost: 'குறைந்த போக்குவரத்து செலவு (₹600)',
    factorDemandMatch: 'தரம் மற்றும் அளவு பொருத்தம்',
    factorDistance: 'அருகாமை தொலைவு (24 கி.மீ)',
    factorRisk: 'பண இழப்பு அபாயமின்மை',
    
    sellWindowHeader: 'சரியான விற்பனை நேரம் (ஸ்மார்ட் கணிப்பு)',
    sellNowTitle: 'இன்றே விற்கவும் 🟢',
    sellNowSub: 'இன்றே அனுப்புங்கள். சேமிப்புச் செலவை விட விலை உயர்வு குறைவாக இருக்கும்.',
    waitDaysTitle: (days) => `${days} நாட்கள் காத்திருக்கவும் 🟡`,
    waitDaysSub: (gain) => `விலை உயர்வு மூலம் ₹${gain.toLocaleString('en-IN')} கூடுதல் லாபம் கிடைக்கும்!`,
    partialSellTitle: 'பகுதி விற்பனை முறை (SMART SPLIT) 💡',
    partialSellSub: 'இன்றே 600 கிலோ விற்கவும் (உடனடி பண தேவைக்கு) • 400 கிலோவை 3 நாட்கள் சேமித்து விற்கவும் (அதிக லாபத்திற்கு)',
    partialSellBtn: 'பகுதி விற்பனை முறையை தேர்ந்தெடுக்கவும்',
    
    verifiedBadge: 'சரிபார்க்கப்பட்ட விவசாயி',
    pendingBadge: 'சரிபார்ப்பு நிலுவையில்',
    readAloudBtn: '🔊 வாசிக்கவும்',
    voiceAssistantBtn: '🎤 குரல் AI',
    startSihDemoBtn: '🎬 SIH செயல்விளக்கம் தொடங்கு',
    demoDataNotice: 'மாதிரி தகவல்',
    aiEstimateNotice: 'AI மதிப்பீடு',
    tonsUnit: 'டன்',
    kgUnit: 'கிலோ',
    perKgUnit: 'ஒரு கிலோவுக்கு',
    orderTrackerBtn: (step) => `ஆர்டர் நிலை (படி ${step}/7)`,
    viewAllOffersBtn: 'எல்லா விலைகளையும் காண்க',
    addNewLotBtn: 'புதிய விளைபொருள் பதிவு',
    activeLotsHeader: 'உங்கள் நேரடி விற்பனை விவரங்கள்',
    offersTitle: 'வாங்குபவர்களின் நேரடி விலை சலுகைகள்',
    offersSub: 'சரிபார்க்கப்பட்ட உணவு நிறுவனங்களிடமிருந்து பெறப்பட்ட அதிகாரப்பூர்வ விலைகள்',
    acceptBtn: 'ஏற்கவும் ✅',
    rejectBtn: 'மறுக்கவும் ❌',
    counterBtn: 'மறுவிலை கேட்க 🔄'
  },

  // 3. HINDI (हिन्दी)
  hi: {
    appName: 'एग्रीसेतु (AGRISETU)',
    tagline: 'भाव जानो। खरीदार चुनो। सही समय पर बेचो।',
    subTagline: 'किसानों और व्यापारियों को सीधे जोड़ने वाला एआई डिजिटल प्लेटफॉर्म',
    
    roleFarmer: 'किसान',
    roleFPO: 'एफपीओ मोड',
    roleBuyer: 'खरीदार पोर्टल',
    roleAdmin: 'राज्य व्यवस्थापक',
    roleJudge: 'जज मोड ⚖️',
    
    navHome: 'होम',
    navSell: 'फसल बेचें',
    navMarkets: 'मंडी भाव',
    navOffers: 'सर्वश्रेष्ठ खरीदार',
    navSellWindow: 'बिक्री सलाह',
    navLogistics: 'वाहन व गोदाम',
    navOrders: 'मेरी बिक्री',
    navHelp: 'सहायता व शिकायत',
    navProfile: 'मेरी प्रोफाइल',
    
    quickSellCrop: '🌾 अपनी फसल बेचें',
    quickSellCropSub: 'अपनी फसल के लिए सबसे अधिक मुनाफा देने वाला खरीदार पाएं',
    quickMarketPrices: '📊 आज के मंडी भाव',
    quickMarketPricesSub: 'आसपास की मंडियों में आवक और ताजा भाव देखें',
    quickSellGuide: '🤖 एआई बिक्री सलाह',
    quickSellGuideSub: 'क्या आज फसल बेचें या भाव बढ़ने का इंतजार करें?',
    quickMyLots: '📦 मेरी फसल लॉट',
    quickMyLotsSub: 'तैयार लॉट कार्ड और तस्वीरें देखें',
    quickMySales: '💰 भुगतान ट्रैकर',
    quickMySalesSub: 'अग्रिम राशि, बैंक ट्रांसफर और पूरा हिसाब ट्रैक करें',
    quickLogistics: '🚚 परिवहन व कोल्ड स्टोरेज',
    quickLogisticsSub: 'नजदीकी पिकअप गाड़ी और कोल्ड स्टोरेज बुक करें',
    quickHelp: '🆘 किसान हेल्पलाइन',
    quickHelpSub: 'विवाद समाधान और 24/7 सहायता',
    
    greeting: 'नमस्ते! 👋',
    greetingSub: 'शुभ प्रभात, किसान भाई।',
    locationLabel: '📍 कोयंबटूर, तमिलनाडु / नासिक, महाराष्ट्र',
    todayMarketHeader: 'आज की मंडी भाव सूचना',
    bestNearbyPriceBadge: '🟢 नजदीकी मंडी का सबसे अच्छा भाव: ₹26/किलो',
    marketDisclaimer: 'केवल मंडी का भाव पर्याप्त नहीं है। एग्रीसेतु भाड़ा, दलाली और जोखिम घटाकर शुद्ध मुनाफे की गणना करता है।',
    
    aiAnalyzingNotice: 'एग्रीसेतु एआई मंडी भाव, भाड़ा लागत, खरीदार का रिकॉर्ड और शुद्ध मुनाफे का विश्लेषण कर रहा है...',
    bestBuyerHeader: '🥇 आपके लिए सबसे सही खरीदार',
    highestPriceWarning: '⚠️ सबसे ज्यादा भाव = सबसे ज्यादा मुनाफा नहीं!',
    highestPriceSub: 'खरीदार C ₹29 दे रहा है लेकिन ₹3000 भाड़ा और देरी से आपके हाथ में कम पैसे आएंगे। खरीदार B (श्री लक्ष्मी) सबसे ज्यादा शुद्ध मुनाफा देगा!',
    whyAiSelectedThis: 'एआई ने इस खरीदार को क्यों चुना?',
    viewAndAcceptOffer: 'ऑफ़र स्वीकारें व गाड़ी बुक करें',
    earnMoreBadge: (amount) => `दूसरे खरीदार की तुलना में आपको ₹${amount.toLocaleString('en-IN')} ज्यादा शुद्ध मुनाफा मिलेगा!`,
    
    factorNetProfit: 'वास्तविक शुद्ध मुनाफा (40%)',
    factorBuyerReliability: 'खरीदार का विश्वास स्कोर (94/100)',
    factorPaymentReliability: 'तेज भुगतान (48 घंटे में)',
    factorTransportCost: 'कम भाड़ा खर्च (₹600)',
    factorDemandMatch: 'गुणवत्ता व मात्रा मेल',
    factorDistance: 'नजदीकी दूरी (24 किमी)',
    factorRisk: 'शून्य भुगतान जोखिम',
    
    sellWindowHeader: 'स्मार्ट बिक्री समय (कब बेचना सही है?)',
    sellNowTitle: 'आज ही बेचें 🟢',
    sellNowSub: 'आज ही भेजें। फसल रोकने पर गोदाम खर्च बढ़ेगा लेकिन भाव उतना नहीं बढ़ेगा।',
    waitDaysTitle: (days) => `${days} दिन रुकें 🟡`,
    waitDaysSub: (gain) => `भाव बढ़ने से गोदाम खर्च काटकर ₹${gain.toLocaleString('en-IN')} ज्यादा मिलेंगे!`,
    partialSellTitle: 'स्मार्ट आधा-आधा बेचें (PARTIAL SELL) 💡',
    partialSellSub: '600 किलो आज बेचें (तुरंत नकदी पाएं) • 400 किलो 3 दिन बाद बेचें (बढ़े हुए भाव का लाभ लें)',
    partialSellBtn: 'स्मार्ट स्प्लिट रणनीति चुनें',
    
    verifiedBadge: 'सत्यापित किसान',
    pendingBadge: 'सत्यापन प्रक्रियाधीन',
    readAloudBtn: '🔊 पढ़कर सुनाएं',
    voiceAssistantBtn: '🎤 बोलकर पूछें',
    startSihDemoBtn: '🎬 SIH डेमो शुरू करें',
    demoDataNotice: 'डेमो डेटा',
    aiEstimateNotice: 'एआई अनुमान',
    tonsUnit: 'टन',
    kgUnit: 'किलो',
    perKgUnit: 'प्रति किलो',
    orderTrackerBtn: (step) => `ऑर्डर ट्रैक करें (चरण ${step}/7)`,
    viewAllOffersBtn: 'सभी ऑफ़र देखें',
    addNewLotBtn: 'नया लॉट जोड़ें',
    activeLotsHeader: 'आपके सक्रिय फसल लॉट',
    offersTitle: 'खरीदारों के सीधे ऑफ़र',
    offersSub: 'सत्यापित कंपनियों और थोक खरीदारों से सीधे मिले भाव',
    acceptBtn: 'स्वीकार करें ✅',
    rejectBtn: 'अस्वीकार ❌',
    counterBtn: 'दूसरा भाव भेजें 🔄'
  },

  // 4. TELUGU (తెలుగు)
  te: {
    appName: 'అగ్రిసేతు (AGRISETU)',
    tagline: 'ధర తెలుసుకో. కొనుగోలుదారుని ఎంచుకో. సరైన సమయంలో అమ్ముకో.',
    subTagline: 'రైతులను మార్కెట్లతో అనుసంధానించే ఏఐ ఆధారిత వేదిక',
    
    roleFarmer: 'రైతు',
    roleFPO: 'ఎఫ్.పి.ఓ మోడ్',
    roleBuyer: 'కొనుగోలుదారు',
    roleAdmin: 'రాష్ట్ర అడ్మిన్',
    roleJudge: 'జడ్జ్ మోడ్ ⚖️',
    
    navHome: 'హోమ్',
    navSell: 'పంట అమ్మకం',
    navMarkets: 'మార్కెట్ ధరలు',
    navOffers: 'ఉత్తమ కొనుగోలుదారు',
    navSellWindow: 'అమ్మకపు గైడ్',
    navLogistics: 'రవాణా & నిల్వ',
    navOrders: 'నా అమ్మకాలు',
    navHelp: 'సహాయం & ఫిర్యాదు',
    navProfile: 'నా ప్రొఫైల్',
    
    quickSellCrop: '🌾 నా పంటను అమ్ముకోవాలి',
    quickSellCropSub: 'అత్యధిక లాభం అందించే ఉత్తమ కొనుగోలుదారుని కనుగొనండి',
    quickMarketPrices: '📊 మార్కెట్ ధరలు',
    quickMarketPricesSub: 'చుట్టుపక్కల మార్కెట్లలో తాజా ధరలు మరియు రాకలు',
    quickSellGuide: '🤖 ఏఐ విక్రయ గైడ్',
    quickSellGuideSub: 'ఇప్పుడే అమ్మాలా లేక ధర పెరిగే వరకు ఆగాలా?',
    quickMyLots: '📦 నా పంట లాట్లు',
    quickMyLotsSub: 'డిజిటల్ పంట రికార్డులు & ఫోటోలు',
    quickMySales: '💰 చెల్లింపుల వివరాలు',
    quickMySalesSub: 'అడ్వాన్స్ మరియు బ్యాంక్ జమ వివరాలు',
    quickLogistics: '🚚 రవాణా & కోల్డ్ స్టోరేజ్',
    quickLogisticsSub: 'తక్కువ ఖర్చుతో పికప్ వాహనం మరియు నిల్వ గోదాము',
    quickHelp: '🆘 సహాయ కేంద్రం',
    quickHelpSub: 'సమస్యల పరిష్కారం మరియు రైతు హెల్ప్‌లైన్',
    
    greeting: 'నమస్కారం! 👋',
    greetingSub: 'శుభోదయం, రైతు మిత్రమా.',
    locationLabel: '📍 కోయంబత్తూరు / స్థానిక ప్రాంతం',
    todayMarketHeader: 'నేటి మార్కెట్ సమాచారం',
    bestNearbyPriceBadge: '🟢 దగ్గరలోని ఉత్తమ ధర: ₹26/కేజీ (పొల్లాచ్చి)',
    marketDisclaimer: 'ధర మాత్రమే కాదు; రవాణా ఖర్చు, కమిషన్ మరియు నమ్మకమైన చెల్లింపులను లెక్కించి ఏఐ సిఫార్సు చేస్తుంది.',
    
    aiAnalyzingNotice: 'మార్కెట్ ధరలు, రవాణా ఖర్చులు మరియు వాస్తవ లాభాన్ని అగ్రిసేతు ఏఐ లెక్కిస్తోంది...',
    bestBuyerHeader: '🥇 మీ కోసం ఉత్తమ కొనుగోలుదారు',
    highestPriceWarning: '⚠️ ఎక్కువ ధర = ఎక్కువ లాభం కాదు!',
    highestPriceSub: 'కొనుగోలుదారు C ₹29 ఇచ్చినా, ₹3,000 రవాణా ఖర్చు వల్ల తక్కువ మిగులుతుంది. కొనుగోలుదారు B ఎక్కువ లాభం అందిస్తారు!',
    whyAiSelectedThis: 'ఈ కొనుగోలుదారుని ఏఐ ఎందుకు ఎంచుకుంది?',
    viewAndAcceptOffer: 'ఆఫర్ అంగీకరించి వాహనం బుక్ చేయండి',
    earnMoreBadge: (amount) => `ఇతర కొనుగోలుదారుల కంటే మీ చేతికి ₹${amount.toLocaleString('en-IN')} ఎక్కువ లాభం వస్తుంది!`,
    
    factorNetProfit: 'వాస్తవ నికర లాభం (40%)',
    factorBuyerReliability: 'నమ్మకమైన రేటింగ్ (94/100)',
    factorPaymentReliability: 'వేగవంతమైన చెల్లింపు (48 గంటలు)',
    factorTransportCost: 'తక్కువ రవాణా ఛార్జీ (₹600)',
    factorDemandMatch: 'నాణ్యత సరిపోలిక',
    factorDistance: 'సమీప దూరం (24 కి.మీ)',
    factorRisk: 'రిస్క్ లేని లావాదేవీ',
    
    sellWindowHeader: 'స్మార్ట్ విక్రయ సమయం',
    sellNowTitle: 'ఇప్పుడే అమ్మండి 🟢',
    sellNowSub: 'నిల్వ ఖర్చుల కంటే ధర పెరుగుదల తక్కువగా ఉంది. ఇప్పుడే అమ్మడం మంచిది.',
    waitDaysTitle: (days) => `${days} రోజులు వేచి ఉండండి 🟡`,
    waitDaysSub: (gain) => `ధర పెరగడం వల్ల ₹${gain.toLocaleString('en-IN')} అదనపు లాభం లభిస్తుంది!`,
    partialSellTitle: 'సగభాగం అమ్మకం (SMART SPLIT) 💡',
    partialSellSub: '600 కేజీలు ఇప్పుడే అమ్మండి (నగదు అవసరాలకు) • 400 కేజీలు 3 రోజులు దాచి అమ్మండి (లాభం కోసం)',
    partialSellBtn: 'స్మార్ట్ స్ప్లిట్ వ్యూహం ఎంచుకోండి',
    
    verifiedBadge: 'ధృవీకరించబడిన రైతు',
    pendingBadge: 'ధృవీకరణ పెండింగ్‌లో ఉంది',
    readAloudBtn: '🔊 చదివి వినిపించండి',
    voiceAssistantBtn: '🎤 వాయిస్ ఏఐ',
    startSihDemoBtn: '🎬 SIH డెమో ప్రారంభించండి',
    demoDataNotice: 'డెమో డేటా',
    aiEstimateNotice: 'ఏఐ అంచనా',
    tonsUnit: 'టన్నులు',
    kgUnit: 'కేజీ',
    perKgUnit: 'కేజీకి',
    orderTrackerBtn: (step) => `ఆర్డర్ ట్రాకింగ్ (దశ ${step}/7)`,
    viewAllOffersBtn: 'అన్ని ఆఫర్లు చూడండి',
    addNewLotBtn: 'కొత్త లాట్ జోడించండి',
    activeLotsHeader: 'మీ పంట లాట్లు',
    offersTitle: 'కొనుగోలుదారుల ఆఫర్లు',
    offersSub: 'ధృవీకరించబడిన సంస్థల నుండి నేరుగా వచ్చిన కొనుగోలు ధరలు',
    acceptBtn: 'అంగీకరించండి ✅',
    rejectBtn: 'తిరస్కరించండి ❌',
    counterBtn: 'మరో ధర అడగండి 🔄'
  },

  // 5. BENGALI (বাংলা)
  bn: {
    appName: 'এগ্রিসেতু (AGRISETU)',
    tagline: 'দাম জানুন। ক্রেতা খুঁজুন। সঠিক সময়ে বিক্রি করুন।',
    subTagline: 'কৃষক এবং ব্যবসায়ীদের মধ্যে কৃত্রিম বুদ্ধিমত্তা চালিত সরাসরি সংযোগ',
    
    roleFarmer: 'কৃষক',
    roleFPO: 'এফপিও মোড',
    roleBuyer: 'ক্রেতা পোর্টাল',
    roleAdmin: 'প্রশাসক',
    roleJudge: 'বিচারক মোড ⚖️',
    
    navHome: 'হোম',
    navSell: 'ফসল বিক্রি',
    navMarkets: 'মান্ডি দর',
    navOffers: 'সেরা ক্রেতা',
    navSellWindow: 'বিক্রি গাইড',
    navLogistics: 'পরিবহন ও সংরক্ষণ',
    navOrders: 'আমার বিক্রি',
    navHelp: 'সাহায্য ও অভিযোগ',
    navProfile: 'আমার প্রোফাইল',
    
    quickSellCrop: '🌾 আমার ফসল বিক্রি করি',
    quickSellCropSub: 'সর্বোচ্চ লাভজনক সঠিক ক্রেতা খুঁজুন',
    quickMarketPrices: '📊 আজকের মান্ডি দর',
    quickMarketPricesSub: 'আশেপাশের বাজারের জোগান ও সেরা দর যাচাই করুন',
    quickSellGuide: '🤖 এআই বিক্রি গাইড',
    quickSellGuideSub: 'আজ বিক্রি করবেন নাকি দাম বাড়া পর্যন্ত অপেক্ষা করবেন?',
    quickMyLots: '📦 আমার ফসলের বিবরণ',
    quickMyLotsSub: 'ডিজিটাল লট ও ফসলের ফটো দেখুন',
    quickMySales: '💰 লেনদেন ও পেমেন্ট',
    quickMySalesSub: 'অগ্রিম টাকা ও সরাসরি ব্যাংক জমা ট্র্যাক করুন',
    quickLogistics: '🚚 গাড়ি ও কোল্ড স্টোরেজ',
    quickLogisticsSub: 'কম খরচে পিকআপ গাড়ি ও হিমাগার বুক করুন',
    quickHelp: '🆘 সাহায্য ও সহায়তা',
    quickHelpSub: 'সমস্যা সমাধান ও কৃষক হেল্পলাইন',
    
    greeting: 'নমস্কার! 👋',
    greetingSub: 'সুপ্রভাত, কৃষক বন্ধু।',
    locationLabel: '📍 কোয়েম্বাটোর / স্থানীয় মান্ডি',
    todayMarketHeader: 'আজকের মান্ডি বাজারের তথ্য',
    bestNearbyPriceBadge: '🟢 আশেপাশের সেরা দর: ₹২৬/কেজি',
    marketDisclaimer: 'শুধুমাত্র বাজারের দর নয়, পরিবহন ও নির্ভরযোগ্যতা হিসাব করেই এগ্রিসেতু সেরা পরামর্শ দেয়।',
    
    aiAnalyzingNotice: 'এগ্রিসেতু এআই বাজারের দাম, পরিবহন খরচ এবং আপনার আসল লাভ হিসাব করছে...',
    bestBuyerHeader: '🥇 আপনার জন্য সেরা ক্রেতা',
    highestPriceWarning: '⚠️ সর্বোচ্চ দর মানেই সর্বোচ্চ লাভ নয়!',
    highestPriceSub: 'ক্রেতা C ₹২৯ অফার করলেও ₹৩,০০০ ভাড়ার কারণে আপনার কম লাভ হবে। ক্রেতা B আপনাকে বেশি নগদ লাভ এনে দেবে!',
    whyAiSelectedThis: 'এআই কেন এই ক্রেতাকে বেছে নিল?',
    viewAndAcceptOffer: 'অফার গ্রহণ করুন ও গাড়ি বুক করুন',
    earnMoreBadge: (amount) => `অন্য ক্রেতার তুলনায় আপনার হাতে ₹${amount.toLocaleString('en-IN')} বেশি লাভ থাকবে!`,
    
    factorNetProfit: 'আসল নগদ মুনাফা (৪০%)',
    factorBuyerReliability: 'ক্রেতার বিশ্বাসযোগ্যতা (৯৪/১০০)',
    factorPaymentReliability: 'দ্রুত পেমেন্ট (৪৮ ঘণ্টায়)',
    factorTransportCost: 'কম পরিবহন খরচ (₹৬০০)',
    factorDemandMatch: 'মান ও পরিমাণের মিল',
    factorDistance: 'নিকটবর্তী দূরত্ব (২৪ কিমি)',
    factorRisk: 'ঝুঁকিমুক্ত লেনদেন',
    
    sellWindowHeader: 'স্মার্ট বিক্রির সঠিক সময়',
    sellNowTitle: 'আজই বিক্রি করুন 🟢',
    sellNowSub: 'আজই পাঠানো লাভজনক। রেখে দিলে স্টোরেজ খরচ বেশি হবে।',
    waitDaysTitle: (days) => `${days} দিন অপেক্ষা করুন 🟡`,
    waitDaysSub: (gain) => `দাম বাড়ার কারণে ₹${gain.toLocaleString('en-IN')} বেশি মুনাফা পাবেন!`,
    partialSellTitle: 'অর্ধেক এখন, অর্ধেক পরে (SMART SPLIT) 💡',
    partialSellSub: '৬০০ কেজি আজ বিক্রি করুন (নগদ টাকার জন্য) • ৪০০ কেজি ৩ দিন পর বিক্রি করুন (বেশি লাভের জন্য)',
    partialSellBtn: 'স্মার্ট স্প্লিট পদ্ধতি বেছে নিন',
    
    verifiedBadge: 'যাচাইকৃত কৃষক',
    pendingBadge: 'যাচাই বাকি আছে',
    readAloudBtn: '🔊 পড়ে শোনান',
    voiceAssistantBtn: '🎤 মুখে বলুন',
    startSihDemoBtn: '🎬 SIH ডেমো শুরু করুন',
    demoDataNotice: 'ডেমো ডেটা',
    aiEstimateNotice: 'এআই অনুমান',
    tonsUnit: 'টন',
    kgUnit: 'কেজি',
    perKgUnit: 'প্রতি কেজি',
    orderTrackerBtn: (step) => `অর্ডার ট্র্যাকিং (ধাপ ${step}/৭)`,
    viewAllOffersBtn: 'সব অফার দেখুন',
    addNewLotBtn: 'নতুন ফসল যোগ করুন',
    activeLotsHeader: 'আপনার সক্রিয় ফসলের লট',
    offersTitle: 'ক্রেতাদের সরাসরি অফার',
    offersSub: 'যাচাইকৃত খাদ্য প্রক্রিয়াকরণ সংস্থা ও পাইকারি ক্রেতাদের দর',
    acceptBtn: 'গ্রহণ করুন ✅',
    rejectBtn: 'প্রত্যাখ্যান ❌',
    counterBtn: 'পাল্টা দর দিন 🔄'
  },

  // 6. MARATHI (मराठी)
  mr: {
    appName: 'अॅग्रीसेतू (AGRISETU)',
    tagline: 'भाव जाणा. खरेदीदार निवडा. योग्य वेळी विका.',
    subTagline: 'शेतकरी आणि थेट खरेदीदारांना जोडणारा एआय डिजिटल सेतू',
    
    roleFarmer: 'शेतकरी',
    roleFPO: 'एफपीओ मोड',
    roleBuyer: 'खरेदीदार पोर्टल',
    roleAdmin: 'राज्य प्रशासन',
    roleJudge: 'परीक्षक मोड ⚖️',
    
    navHome: 'मुख्यपृष्ठ',
    navSell: 'पीक विका',
    navMarkets: 'मंडी भाव',
    navOffers: 'सर्वोत्तम खरेदीदार',
    navSellWindow: 'विक्री सल्ला',
    navLogistics: 'वाहतूक व साठवणूक',
    navOrders: 'माझी विक्री',
    navHelp: 'मदत व तक्रार',
    navProfile: 'माझे प्रोफाईल',
    
    quickSellCrop: '🌾 माझे पीक विका',
    quickSellCropSub: 'खिशात जास्तीत जास्त नफा देणारा खरा खरेदीदार शोधा',
    quickMarketPrices: '📊 आजचे मंडी भाव',
    quickMarketPricesSub: 'जवळपासच्या बाजार समित्यांमधील आवक व ताजा भाव तपासा',
    quickSellGuide: '🤖 एआय विक्री मार्गदर्शक',
    quickSellGuideSub: 'माल आज विकावा की भाव वाढण्याची वाट पाहावी?',
    quickMyLots: '📦 माझे पीक लॉट्स',
    quickMyLotsSub: 'तयार डिजिटल लॉट आणि शेतातील फोटो पहा',
    quickMySales: '💰 विक्री व व्यवहार',
    quickMySalesSub: 'अ‍ॅडव्हान्स, बँक पेमेंट आणि संपूर्ण हिशोब तपासा',
    quickLogistics: '🚚 वाहतूक व कोल्ड स्टोरेज',
    quickLogisticsSub: 'कमी खर्चात पिकअप गाडी आणि जवळचे गोदाम बुक करा',
    quickHelp: '🆘 मदत व तक्रार निवारण',
    quickHelpSub: 'तक्रार निवारण आणि २४/७ शेतकरी हेल्पलाइन',
    
    greeting: 'नमस्कार! 👋',
    greetingSub: 'शुभ सकाळ, शेतकरी बांधवांनो.',
    locationLabel: '📍 पिंपळगाव बसवंत, नाशिक / कोइम्बतूर',
    todayMarketHeader: 'आजची थेट बाजार भाव माहिती',
    bestNearbyPriceBadge: '🟢 सर्वोत्तम जवळील भाव: ₹२६/किलो',
    marketDisclaimer: 'फक्त बाजारातील भाव पुरेसा नसतो. वाहतूक खर्च, हमाली, अडत आणि पेमेंटचा धोका वजा करून अॅग्रीसेतू खरा सल्ला देतो.',
    
    aiAnalyzingNotice: 'अॅग्रीसेतू एआय बाजारभाव, वाहतूक खर्च, साठवणूक खर्च आणि प्रत्यक्ष नफ्याचे विश्लेषण करत आहे...',
    bestBuyerHeader: '🥇 तुमच्यासाठी सर्वोत्तम खरेदीदार',
    highestPriceWarning: '⚠️ सर्वाधिक भाव म्हणजे सर्वाधिक नफा नव्हे!',
    highestPriceSub: 'खरेदीदार C ₹२९ भाव देतो पण ₹३००० वाहतूक खर्चामुळे कमी पैसे उरतात. खरेदीदार B (श्री लक्ष्मी) तुम्हाला सर्वाधिक प्रत्यक्ष नफा देतो!',
    whyAiSelectedThis: 'एआयने हाच खरेदीदार का निवडला?',
    viewAndAcceptOffer: 'ऑफर स्वीकारा व गाडी बुक करा',
    earnMoreBadge: (amount) => `इतर खरेदीदारांपेक्षा तुमच्या खिशात ₹${amount.toLocaleString('en-IN')} जास्त नफा पडेल!`,
    
    factorNetProfit: 'प्रत्यक्ष हातात येणारा नफा (४०%)',
    factorBuyerReliability: 'खरेदीदाराचे विश्वासार्हता रेटिंग (९४/१००)',
    factorPaymentReliability: 'जलद पेमेंट (४८ तासांत खात्यात)',
    factorTransportCost: 'कमी वाहतूक खर्च (₹६००)',
    factorDemandMatch: 'प्रत आणि प्रमाणाचा अचूक मेळ',
    factorDistance: 'जवळचे अंतर (२४ किमी)',
    factorRisk: 'शून्य आर्थिक फसवणूक धोका',
    
    sellWindowHeader: 'स्मार्ट विक्री वेळ (योग्य वेळ कोणती?)',
    sellNowTitle: 'आजच माल विका 🟢',
    sellNowSub: 'आजच पाठवा. माल रोखून ठेवल्यास गोदाम खर्च वाढेल पण भाव तेवढा वाढणार नाही.',
    waitDaysTitle: (days) => `${days} दिवस थांबा 🟡`,
    waitDaysSub: (gain) => `भाववाढीमुळे साठवणूक खर्च वजा जाता ₹${gain.toLocaleString('en-IN')} जास्तीचा नफा होईल!`,
    partialSellTitle: 'स्मार्ट विभागून विक्री (SMART SPLIT) 💡',
    partialSellSub: '६०० किलो आज विका (तात्काळ रोख रकमेसाठी) • ४०० किलो ३ दिवसांनी विका (वाढीव भावाचा फायदा घेण्यासाठी)',
    partialSellBtn: 'स्मार्ट स्प्लिट पद्धत वापरा',
    
    verifiedBadge: 'सत्यापित शेतकरी (७/१२ नोंदणीकृत)',
    pendingBadge: 'सत्यापन बाकी आहे',
    readAloudBtn: '🔊 ऐका (Read Aloud)',
    voiceAssistantBtn: '🎤 बोलून विचारा',
    startSihDemoBtn: '🎬 SIH डेमो सुरू करा',
    demoDataNotice: 'डेमो डेटा',
    aiEstimateNotice: 'एआय अंदाज',
    tonsUnit: 'टन',
    kgUnit: 'किलो',
    perKgUnit: 'प्रति किलो',
    orderTrackerBtn: (step) => `ऑर्डर ट्रॅकिंग (पायरी ${step}/७)`,
    viewAllOffersBtn: 'सर्व ऑफर्स पहा',
    addNewLotBtn: 'नवीन लॉट नोंदवा',
    activeLotsHeader: 'तुमचे सक्रिय पीक लॉट्स',
    offersTitle: 'खरेदीदारांचे थेट ऑफर्स',
    offersSub: 'सत्यापित फूड कंपन्या आणि घाऊक व्यापाऱ्यांकडून थेट आलेले दर',
    acceptBtn: 'स्वीकारा ✅',
    rejectBtn: 'नाकारा ❌',
    counterBtn: 'प्रति-दर द्या 🔄'
  }
};
