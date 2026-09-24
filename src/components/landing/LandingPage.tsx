import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle
} from 'lucide-react';
import { SIMULATED_IMPACT_METRICS } from '../../data/mockData';

export const LandingPage: React.FC = () => {
  const { setRole, setIsLandingPageOpen, setIsSIHDemoOpen, t } = useApp();

  const handleStartFarmer = () => {
    setIsLandingPageOpen(false);
    setRole('farmer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-agri-ink flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-agri-accent/20 border border-agri-accent/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-agri-ink shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600 fill-current" />
            Smart India Hackathon (SIH) 2026 Solution
          </div>

          <h1 className="font-headline font-black text-4xl sm:text-6xl text-agri-ink tracking-tight">
            🌾 AGRI<span className="text-agri-primary">SETU</span>
          </h1>

          <p className="text-xl sm:text-2xl font-black text-agri-primary font-headline max-w-2xl mx-auto">
            "{t.tagline}"
          </p>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            An AI-powered agricultural market intelligence and transaction platform connecting smallholder farmers and FPOs with transparent APMC prices, verified commercial buyers, and intelligent selling time recommendations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartFarmer}
              className="farmer-tap-btn !min-h-[50px] px-8 py-3.5 bg-agri-primary hover:bg-agri-primaryDark text-white font-black text-sm rounded-2xl shadow-elevated flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>🌾 {t.quickSellCrop}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSIHDemoOpen(true)}
              className="farmer-tap-btn !min-h-[50px] px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm rounded-2xl shadow-elevated flex items-center gap-2 transition-transform active:scale-95 animate-pulse"
            >
              <PlayCircle className="w-5 h-5 fill-white text-amber-600" />
              <span>{t.startSihDemoBtn}</span>
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. CORE VALUE PROPOSITION BANNER */}
      <section className="bg-gradient-to-r from-agri-primary via-emerald-800 to-emerald-950 text-white py-12 px-4 shadow-elevated">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-3xl font-black text-amber-400">#1</div>
            <h3 className="font-headline font-bold text-base text-white">
              Highest Price ≠ Highest Profit
            </h3>
            <p className="text-xs text-emerald-100/80">
              AI factors transport, commissions, and payment reliability so farmers keep the most cash.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-3xl font-black text-amber-400">#2</div>
            <h3 className="font-headline font-bold text-base text-white">
              AI Recommends. Farmer Decides.
            </h3>
            <p className="text-xs text-emerald-100/80">
              Full transparency with explainable score breakdowns. No automatic forced executions.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-3xl font-black text-amber-400">#3</div>
            <h3 className="font-headline font-bold text-base text-white">
              Smart Sell Window & Partial Sell
            </h3>
            <p className="text-xs text-emerald-100/80">
              Sell 60% now for cash liquidity, hold 40% in storage to capture market surge.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIMULATED IMPACT METRICS */}
      <section className="py-14 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-1 mb-8">
          <span className="text-xs font-black text-agri-primary uppercase tracking-wider">
            Prototype & Simulated Impact Metrics
          </span>
          <h2 className="font-headline font-black text-2xl text-agri-ink">
            Quantifiable Transformation for Smallholders
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-xs text-center">
            <span className="text-3xl font-black text-agri-primary">{SIMULATED_IMPACT_METRICS.farmersConnected}</span>
            <p className="text-xs text-agri-muted font-bold mt-1">Farmers Connected</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-xs text-center">
            <span className="text-3xl font-black text-amber-600">{SIMULATED_IMPACT_METRICS.avgPriceImprovementPct}</span>
            <p className="text-xs text-agri-muted font-bold mt-1">Avg Price Improvement</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-xs text-center">
            <span className="text-3xl font-black text-blue-600">{SIMULATED_IMPACT_METRICS.avgTransportSavings}</span>
            <p className="text-xs text-agri-muted font-bold mt-1">Transport Cost Savings</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-xs text-center">
            <span className="text-3xl font-black text-emerald-700">{SIMULATED_IMPACT_METRICS.completedTransactions}</span>
            <p className="text-xs text-agri-muted font-bold mt-1">Settled Transactions</p>
          </div>
        </div>
      </section>

      {/* 4. CHOOSE YOUR PERSONA */}
      <section className="py-10 px-4 bg-white border-t border-agri-border">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="font-headline font-black text-2xl text-agri-ink">
              Experience the Complete Protocol by Role
            </h2>
            <p className="text-xs text-agri-muted mt-1">
              Select any persona to test their end-to-end interface
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleStartFarmer}
              className="p-5 rounded-3xl border-2 border-agri-primary bg-agri-primaryLight/40 hover:bg-agri-primaryLight text-left transition-all group"
            >
              <span className="text-3xl">🌾</span>
              <h3 className="font-headline font-bold text-base text-agri-ink mt-2">Farmer Dashboard</h3>
              <p className="text-xs text-agri-muted mt-1">Low-literacy UX, voice assistant, best buyer matching, and sale window</p>
            </button>

            <button
              onClick={() => {
                setIsLandingPageOpen(false);
                setRole('fpo');
              }}
              className="p-5 rounded-3xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 text-left transition-all group"
            >
              <span className="text-3xl">👥</span>
              <h3 className="font-headline font-bold text-base text-agri-ink mt-2">FPO Aggregation</h3>
              <p className="text-xs text-agri-muted mt-1">Aggregate smallholder quantities (500kg+700kg+800kg) into bulk lots</p>
            </button>

            <button
              onClick={() => {
                setIsLandingPageOpen(false);
                setRole('buyer');
              }}
              className="p-5 rounded-3xl border-2 border-stone-400 bg-stone-50 hover:bg-stone-100 text-left transition-all group"
            >
              <span className="text-3xl">💼</span>
              <h3 className="font-headline font-bold text-base text-agri-ink mt-2">Buyer Marketplace</h3>
              <p className="text-xs text-agri-muted mt-1">Procure verified produce, send bids, counter-offers, and track delivery</p>
            </button>

            <button
              onClick={() => {
                setIsLandingPageOpen(false);
                setRole('judge');
              }}
              className="p-5 rounded-3xl border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 text-left transition-all group"
            >
              <span className="text-3xl">⚖️</span>
              <h3 className="font-headline font-bold text-base text-agri-ink mt-2">Judge Mode</h3>
              <p className="text-xs text-agri-muted mt-1">10-step AI Decision Trace, SIH problem mapping, and weight calibration</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
