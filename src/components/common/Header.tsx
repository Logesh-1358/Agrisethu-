import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  UserCog, 
  Sprout, 
  Sparkles, 
  Users2, 
  Scale, 
  Mic, 
  PlayCircle,
  Globe,
  LayoutTemplate
} from 'lucide-react';
import { Language, Role } from '../../types';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    t, 
    farmer, 
    setIsAIAssistantOpen, 
    setIsSIHDemoOpen, 
    isLandingPageOpen, 
    setIsLandingPageOpen 
  } = useApp();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇮🇳' }
  ];

  const roles: { code: Role; label: string; icon: React.ReactNode }[] = [
    { code: 'farmer', label: t.roleFarmer, icon: <Sprout className="w-4 h-4" /> },
    { code: 'fpo', label: t.roleFPO, icon: <Users2 className="w-4 h-4" /> },
    { code: 'buyer', label: t.roleBuyer, icon: <Building2 className="w-4 h-4" /> },
    { code: 'admin', label: t.roleAdmin, icon: <UserCog className="w-4 h-4" /> },
    { code: 'judge', label: t.roleJudge, icon: <Scale className="w-4 h-4 text-amber-500" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EF]/95 backdrop-blur-md border-b border-agri-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Brand Logo & Setu Meaning */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => {
              setIsLandingPageOpen(false);
              setRole('farmer');
            }}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-agri-primary to-emerald-900 flex items-center justify-center text-white text-2xl shadow-md border border-white/20">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-extrabold text-2xl text-agri-primary tracking-tight flex items-center gap-1">
                  AGRI<span className="text-agri-accent">SETU</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] bg-agri-accent/20 text-agri-ink font-extrabold px-2.5 py-0.5 rounded-full items-center gap-1 border border-agri-accent/40">
                  <Sparkles className="w-3 h-3 fill-current text-amber-600" /> SIH PROTOCOL
                </span>
              </div>
              <p className="text-[11px] text-agri-muted font-semibold hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center Action: SIH Guided Demo & AI Voice Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSIHDemoOpen(true)}
              className="farmer-tap-btn !min-h-[40px] px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
            >
              <PlayCircle className="w-4 h-4 fill-white text-amber-600" />
              <span>{t.startSihDemoBtn}</span>
            </button>

            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="farmer-tap-btn !min-h-[40px] px-3 py-1.5 bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
              title="Voice AI Assistant"
            >
              <Mic className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{t.voiceAssistantBtn}</span>
            </button>

            {/* Landing Page Showcase Toggle */}
            <button
              onClick={() => setIsLandingPageOpen(!isLandingPageOpen)}
              className={`farmer-tap-btn !min-h-[40px] px-3 py-1.5 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isLandingPageOpen
                  ? 'bg-agri-ink text-white border-agri-ink shadow-xs'
                  : 'bg-white hover:bg-agri-sand border-agri-border text-agri-muted hover:text-agri-ink'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{isLandingPageOpen ? 'Back to App' : 'Landing Showcase'}</span>
            </button>
          </div>

          {/* Right Controls: 6-Language Dropdown & Roles */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 6-Language Selector Dropdown */}
            <div className="relative flex items-center bg-white rounded-xl border border-agri-border shadow-xs px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-agri-muted mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-agri-ink focus:outline-none cursor-pointer py-1 pr-1"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Global Role Switcher */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-agri-border shadow-xs overflow-x-auto max-w-[280px] sm:max-w-none">
              {roles.map((r) => (
                <button
                  key={r.code}
                  onClick={() => {
                    setIsLandingPageOpen(false);
                    setRole(r.code);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    role === r.code && !isLandingPageOpen
                      ? 'bg-agri-ink text-white shadow-xs'
                      : 'text-agri-muted hover:text-agri-ink hover:bg-agri-sand'
                  }`}
                >
                  {r.icon}
                  <span className="hidden sm:inline">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile tagline display */}
        <div className="md:hidden mt-1 text-center">
          <p className="text-[10px] text-agri-muted font-medium">
            🌾 {t.tagline}
          </p>
        </div>
      </div>
    </header>
  );
};
