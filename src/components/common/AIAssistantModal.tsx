import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText, stopSpeaking, startVoiceRecognition } from '../../utils/speechUtils';
import { Sparkles, Mic, MicOff, Volume2, X, Send, Bot, User, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, language, t, lots, selectedLotId } = useApp();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState<{ stop: () => void } | null>(null);

  const activeLot = lots.find((l) => l.lot_id === selectedLotId) || lots[0];

  const defaultInitialMessages: Record<string, ChatMessage[]> = {
    en: [
      {
        id: 'm1',
        sender: 'ai',
        text: `Hello Farmer! I am your AGRISETU AI assistant. Ask me anything about ${activeLot?.crop || 'your crop'}, market rates, best buyers, or whether to sell now or wait.`,
        timestamp: 'Just now'
      }
    ],
    ta: [
      {
        id: 'm1',
        sender: 'ai',
        text: `வணக்கம் விவசாயி அவர்களே! நான் உங்கள் அக்ரிசேது AI உதவியாளர். ${activeLot?.crop || 'உங்கள் பயிர்'}, மண்டி விலை, சிறந்த வாங்குபவர் அல்லது விற்பனை நேரம் பற்றி எதையும் குரல் மூலம் கேட்கலாம்.`,
        timestamp: 'இப்போது'
      }
    ],
    hi: [
      {
        id: 'm1',
        sender: 'ai',
        text: `नमस्ते किसान भाई! मैं आपका एग्रीसेतु AI सहायक हूँ। ${activeLot?.crop || 'अपनी फसल'}, मंडी भाव, सही खरीदार या आज बेचने की सलाह के बारे में पूछें।`,
        timestamp: 'अभी'
      }
    ],
    te: [
      {
        id: 'm1',
        sender: 'ai',
        text: `నమస్కారం రైతు మిత్రమా! నేను మీ అగ్రిసేతు AI అసిస్టెంట్‌ని. మార్కెట్ ధరలు, ఉత్తమ కొనుగోలుదారు లేదా ఎప్పుడు అమ్మాలో అడగండి.`,
        timestamp: 'ఇప్పుడే'
      }
    ],
    bn: [
      {
        id: 'm1',
        sender: 'ai',
        text: `নমস্কার কৃষক বন্ধু! আমি আপনার এগ্রিসেতু এআই সহকারী। মান্ডি দর, সেরা ক্রেতা বা আজ বিক্রি করবেন কিনা জিজ্ঞেস করুন।`,
        timestamp: 'এইমাত্র'
      }
    ],
    mr: [
      {
        id: 'm1',
        sender: 'ai',
        text: `नमस्कार शेतकरी मित्रांनो! मी तुमचा अॅग्रीसेतू एआय सहाय्यक आहे. ${activeLot?.crop || 'तुमचे पीक'}, बाजारभाव किंवा विक्रीच्या योग्य वेळेबद्दल विचारा.`,
        timestamp: 'आत्ताच'
      }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>(defaultInitialMessages[language] || defaultInitialMessages['en']);

  if (!isAIAssistantOpen) return null;

  const quickPrompts: Record<string, string[]> = {
    en: [
      'Should I sell my tomato today?',
      'Which buyer is best?',
      "What is today's mandi price?",
      'Can I store my crop for 3 days?'
    ],
    ta: [
      'இன்றே தக்காளியை விற்கவா?',
      'எந்த வாங்குபவர் எனக்கு அதிக லாபம் தருவார்?',
      'இன்றைய மண்டி விலை என்ன?',
      'பயிரை 3 நாட்கள் சேமித்து விற்கலாமா?'
    ],
    hi: [
      'क्या आज टमाटर बेचना सही रहेगा?',
      'सबसे अच्छा खरीदार कौन है?',
      'आज का मंडी भाव क्या है?',
      'क्या मैं फसल को 3 दिन रोक सकता हूँ?'
    ],
    te: [
      'ఈరోజు టమోటా అమ్మవచ్చా?',
      'నాకు ఏ కొనుగోలుదారు ఎక్కువ లాభం ఇస్తారు?',
      'నేటి మార్కెట్ ధర ఎంత?'
    ],
    bn: [
      'আজ টমেটো বিক্রি করা কি ঠিক হবে?',
      'কোন ক্রেতা সবচেয়ে ভালো?',
      'আজকের মান্ডি দর কত?'
    ],
    mr: [
      'कांदा आज विकावा की थांबावे?',
      'सर्वात चांगला खरेदीदार कोण आहे?',
      'आजचा बाजारभाव काय आहे?'
    ]
  };

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (language === 'ta') {
      if (q.includes('விற்கவா') || q.includes('இன்றே') || q.includes('விற்பனை')) {
        return 'அக்ரிசேது AI கணிப்பின்படி: அடுத்த 2 நாட்களில் தக்காளி விலை ₹26-லிருந்து ₹28-ஆக உயர வாய்ப்புள்ளது. எனினும் உடனடி பண தேவைக்கு 60% இன்றே விற்றுவிட்டு, மீதி 40%-ஐ 3 நாட்கள் கழித்து விற்றால் ₹4,000 கூடுதல் லாபம் கிடைக்கும்!';
      }
      if (q.includes('வாங்குபவர்') || q.includes('லாபம்') || q.includes('யார்')) {
        return 'உங்களுக்கு ஸ்ரீ லக்ஷ்மி ஃபுட்ஸ் (Buyer B) தான் சிறந்த வாங்குபவர். அவர்கள் ₹27/கிலோ கொடுத்து ₹600 மட்டுமே போக்குவரத்து கட்டணம் எடுப்பதால் உங்கள் கையில் ₹26,400 நிகர லாபம் கிடைக்கும் (94% நம்பிக்கை மதிப்பெண்). மெகாகோ நிறுவனம் ₹29 சொன்னாலும் ₹3,000 போக்குவரத்து கழிந்து ₹25,100 மட்டுமே கிடைக்கும்!';
      }
      return 'இன்றைய கோயம்புத்தூர் மண்டி விலை ₹24/கிலோ (வரத்து 85 டன்), பொள்ளாச்சி சந்தை ₹26/கிலோ. அக்ரிசேது மூலம் நேரடி நிறுவனங்களுக்கு விற்றால் ₹27/கிலோ வரை கையில் பெறலாம்!';
    }

    if (language === 'hi') {
      if (q.includes('बेचूं') || q.includes('आज') || q.includes('रोकें')) {
        return 'एआई सलाह: अगले 2 दिनों में भाव ₹24 से ₹27 तक बढ़ सकता है। हमारा सुझाव है कि स्मार्ट स्प्लिट अपनाएं—60% फसल आज बेचें और 40% फसल 3 दिन रोककर बेचें, जिससे ₹4,000 का अतिरिक्त लाभ होगा!';
      }
      if (q.includes('खरीदार') || q.includes('मुनाफा')) {
        return 'आपके लिए श्री लक्ष्मी फूड्स (खरीदार B) सबसे उत्तम है। नाममात्र का ज्यादा भाव देने वाले खरीदार C (₹29) का भाड़ा ₹3,000 है, जबकि खरीदार B (₹27) से आपके हाथ में ₹26,400 शुद्ध नकद बचेगा!';
      }
      return 'आज का कोयंबटूर/नासिक मंडी भाव ₹24-₹26/किलो है। एग्रीसेतु पर सत्यापित खरीदारों से आप सीधे ₹27/किलो पर बिना दलाली के बेच सकते हैं।';
    }

    if (language === 'mr') {
      if (q.includes('विकावा') || q.includes('थांबावे')) {
        return 'एआय सल्ला: पुढील ३ दिवसांत दर वाढण्याची शक्यता आहे. ६०% माल आज विका आणि ४०% माल ३ दिवस साठवून विका, ज्यामुळे रोख पैशांची गरज भागेल व ₹४,००० जास्तीचा नफा होईल!';
      }
      if (q.includes('खरेदीदार')) {
        return 'श्री लक्ष्मी फूड्स (खरेदीदार B) हा सर्वोत्तम पर्याय आहे. ₹२९ भाव देणारा खरेदीदार C वाहतुकीत ₹३,००० कापतो, तर खरेदीदार B कडून खिशात ₹२६,४०० प्रत्यक्ष नफा पडतो!';
      }
      return 'आजचे नाशिक व पिंपळगाव बाजारभाव ₹१४ ते ₹१६ प्रति किलो आहेत. आवक चांगली असून थेट खरेदीदाराकडून ₹१६.५० पर्यंत भाव उपलब्ध आहे.';
    }

    // Default English
    if (q.includes('sell') || q.includes('today') || q.includes('wait')) {
      return 'AGRISETU Recommendation: Market prices are rising from ₹24 to ₹27/kg over the next 2-3 days. Use Smart Partial Selling: Sell 600 kg now for immediate cash flow, and store 400 kg for 3 days to gain an extra ₹4,000 upside!';
    }
    if (q.includes('buyer') || q.includes('profit') || q.includes('best')) {
      return 'Sri Lakshmi Foods (Buyer B) is your best match! While MegaDist offers ₹29/kg, their ₹3,000 transport fee reduces your take-home cash. Buyer B offers ₹27/kg with only ₹600 transport, yielding ₹26,400 net in your pocket with 94/100 trust rating.';
    }
    return "Today's Coimbatore APMC mandi price is ₹24/kg (85 tons arrival) and Pollachi is ₹26/kg. Direct verified buyers on AGRISETU are offering up to ₹27/kg with 0% commission.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    const aiAnswer = generateAnswer(text);
    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: aiAnswer,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');

    // Automatically speak the response for accessibility
    speakText(aiAnswer, language);
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      if (speechRecognizer) speechRecognizer.stop();
      setIsRecording(false);
      setSpeechRecognizer(null);
    } else {
      setIsRecording(true);
      const recognizer = startVoiceRecognition(
        language,
        (recognizedText) => {
          setIsRecording(false);
          setSpeechRecognizer(null);
          handleSendMessage(recognizedText);
        },
        (error) => {
          console.error(error);
          setIsRecording(false);
          setSpeechRecognizer(null);
        }
      );
      if (recognizer) setSpeechRecognizer(recognizer);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-agri-border shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-agri-primary via-agri-primaryDark to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl backdrop-blur-xs border border-white/20">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-white">
                  AGRISETU Voice Assistant
                </h3>
                <span className="text-[10px] bg-agri-accent text-agri-ink font-extrabold px-2 py-0.5 rounded-full">
                  AI VOICE
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                {activeLot?.crop} • {language.toUpperCase()} Voice Engine
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              setIsAIAssistantOpen(false);
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Strip */}
        <div className="bg-[#FAF7EF] px-3 py-2 border-b border-agri-border overflow-x-auto flex gap-2 scrollbar-none">
          {(quickPrompts[language] || quickPrompts['en']).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-semibold bg-white hover:bg-agri-sand border border-agri-border text-agri-ink px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xs transition-colors"
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FCFBF7]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-agri-ink text-white'
                    : 'bg-agri-primary text-white shadow-xs'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-agri-primary text-white rounded-tr-none'
                    : 'bg-white text-agri-ink border border-agri-border shadow-xs rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                {m.sender === 'ai' && (
                  <div className="mt-2 pt-2 border-t border-agri-border/40 flex items-center justify-between text-[10px] text-agri-muted">
                    <button
                      onClick={() => speakText(m.text, language)}
                      className="hover:text-agri-primary font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> 🔊 {t.readAloudBtn}
                    </button>
                    <span>{m.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isRecording && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-amber-800 text-xs font-semibold animate-pulse">
              <Mic className="w-4 h-4 text-rose-600 animate-bounce" />
              <span>Listening to your voice in {language.toUpperCase()}... Speak now!</span>
            </div>
          )}
        </div>

        {/* Voice & Input Footer */}
        <div className="p-3 bg-white border-t border-agri-border flex items-center gap-2">
          {/* Microphone Tap Button */}
          <button
            onClick={handleToggleVoice}
            className={`p-3 rounded-2xl transition-all ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200'
                : 'bg-agri-primaryLight text-agri-primary hover:bg-emerald-200 border border-agri-primary/30'
            }`}
            title="Tap to speak"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isRecording ? 'Listening...' : 'Type or tap mic to ask...'}
            className="flex-1 px-4 py-2.5 bg-agri-sand border border-agri-border rounded-2xl text-xs text-agri-ink focus:outline-none focus:ring-2 focus:ring-agri-primary/30"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-3 bg-agri-primary hover:bg-agri-primaryDark disabled:opacity-40 text-white rounded-2xl transition-transform active:scale-95 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
