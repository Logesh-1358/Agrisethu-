import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Truck,
  TrendingUp,
  Award
} from 'lucide-react';

interface DemoStep {
  step: number;
  title: string;
  badge: string;
  summary: string;
  keyAction: string;
  insight: string;
  targetTab?: 'home' | 'sell' | 'markets' | 'offers' | 'sell-window' | 'logistics';
}

export const SIHDemoRunnerModal: React.FC = () => {
  const { 
    isSIHDemoOpen, 
    setIsSIHDemoOpen, 
    setFarmerTab, 
    setRole, 
    setLanguage, 
    triggerTomatoDemo 
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  if (!isSIHDemoOpen) return null;

  const demoSteps: DemoStep[] = [
    {
      step: 1,
      title: '1. Farmer Profile & Locale Selection',
      badge: 'FARMER CONTEXT',
      summary: 'Farmer Rameshwar opens AGRISETU in Karamadai, Coimbatore. The interface is in Tamil with large voice-first tap targets.',
      keyAction: 'Set language to Tamil (தமிழ்) & load 1,000 kg Grade A Tomato farm profile.',
      insight: 'Designed for village farmers: large buttons, no jargon, complete local language i18n.'
    },
    {
      step: 2,
      title: '2. Market Intelligence Discovery',
      badge: 'MARKET VS BUYER',
      summary: 'AGRISETU pulls real-time mandi prices: Coimbatore (₹24/kg, 85 T arrival), Pollachi (₹26/kg), Erode (₹25/kg).',
      keyAction: 'Examines APMC arrival volumes and price trends.',
      insight: 'Principle 1: Market data provides price intelligence, while buyers provide actual binding contracts.',
      targetTab: 'markets'
    },
    {
      step: 3,
      title: '3. Digital Produce Lot Creation',
      badge: 'STANDARDIZED LOT',
      summary: 'Lot LOT10025 created: 1,000 kg Tomato, Grade A, 12.5% moisture, 60mm uniform red, Jaivik Bharat certified.',
      keyAction: 'Digital lot published to verified buyer network.',
      insight: 'Solves buyer quality verification and aggregation bottlenecks with instant digital traceability.',
      targetTab: 'sell'
    },
    {
      step: 4,
      title: '4. AI Multi-Buyer Matching & Net Profit Engine',
      badge: 'THE CORE ENGINE',
      summary: 'Three buyers submit offers: Buyer A (₹28/kg, transport ₹2,000), Buyer B (₹27/kg, transport ₹600), Buyer C (₹29/kg, transport ₹3,000).',
      keyAction: 'AI calculates Gross - Transport - Deductions - Risk Penalty.',
      insight: 'Multi-attribute formula: 40% Net Profit, 20% Reliability, 10% Payment, 10% Transport, 10% Demand, 5% Distance, 5% Risk.',
      targetTab: 'home'
    },
    {
      step: 5,
      title: '5. WOW MOMENT #1: Highest Price ≠ Highest Profit',
      badge: 'CRITICAL SIH PROOF',
      summary: 'Buyer C offers the highest nominal price (₹29/kg), but high transport and risk leaves less cash. Buyer B (Sri Lakshmi Foods) yields ₹26,400 in pocket!',
      keyAction: 'AGRISETU highlights 🥇 Best Choice: Buyer B.',
      insight: 'Judges see: Transparent mathematical proof that highest quoted price often deceives rural farmers without logistics calculation.',
      targetTab: 'home'
    },
    {
      step: 6,
      title: '6. WOW MOMENT #2: Smart Sell Window & Partial Sell',
      badge: 'SMART TIMING',
      summary: '3-Day forecast predicts price rise from ₹24 to ₹27/kg. Storage is ₹1/kg/day. AI recommends: 🟢 WAIT 2 DAYS or SMART SPLIT.',
      keyAction: 'Farmer executes Smart Split: Sell 600 kg NOW (liquidity) + Keep 400 kg for 3 days (capture +₹4,000 upside).',
      insight: 'Solves distress selling due to cash-flow needs without sacrificing future price surge potential.',
      targetTab: 'sell-window'
    },
    {
      step: 7,
      title: '7. Logistics Pickup Booking & Cold Storage',
      badge: 'LOGISTICS LINKAGE',
      summary: 'Mini Truck (Tata Ace) booked with driver Chinnasamy for ₹600 directly linked to the buyer order.',
      keyAction: 'Driver dispatched, GPS pickup window scheduled.',
      insight: 'Eliminates intermediary vehicle brokerage and empty dead-mileage costs.',
      targetTab: 'logistics'
    },
    {
      step: 8,
      title: '8. 7-Step Payment Tracker & Digital Invoice',
      badge: 'ESCROW SETTLEMENT',
      summary: 'Order created with 30% advance escrow secured. Digital invoice generated with QR code and dispute coverage under IT Act.',
      keyAction: 'Advance received, produce loaded, balance paid upon delivery.',
      insight: 'Completely eliminates payment uncertainty, verbal reneging, and quality rejection defaults.',
      targetTab: 'offers'
    }
  ];

  const currentStep = demoSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = demoSteps[nextIndex];
      if (nextStep.targetTab) {
        setFarmerTab(nextStep.targetTab);
      }
    } else {
      setIsSIHDemoOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevStep = demoSteps[prevIndex];
      if (prevStep.targetTab) {
        setFarmerTab(prevStep.targetTab);
      }
    }
  };

  const startFullDemo = () => {
    setRole('farmer');
    setLanguage('ta');
    triggerTomatoDemo();
    setCurrentStepIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-2 border-agri-accent shadow-2xl overflow-hidden flex flex-col">
        {/* Top SIH Header */}
        <div className="p-4 bg-gradient-to-r from-agri-primary via-agri-primaryDark to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-agri-accent text-agri-ink font-extrabold flex items-center justify-center text-lg shadow-sm">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-white">
                  Smart India Hackathon 2026 — 3-Minute Live Script
                </h3>
                <span className="text-[10px] bg-agri-accent text-agri-ink font-extrabold px-2 py-0.5 rounded-full">
                  STEP {currentStep.step} OF {demoSteps.length}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                Story: Farmer Rameshwar (Tomato 1,000 kg, Coimbatore)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSIHDemoOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-agri-sand h-2 overflow-hidden">
          <div
            className="bg-agri-accent h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-agri-primary tracking-wider uppercase bg-agri-primaryLight px-3 py-1 rounded-full border border-agri-primary/20">
              {currentStep.badge}
            </span>
            <span className="text-xs text-agri-muted font-bold font-mono">
              Progress: {Math.round(((currentStepIndex + 1) / demoSteps.length) * 100)}%
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-bold text-agri-ink">
            {currentStep.title}
          </h2>

          <p className="text-sm text-stone-700 leading-relaxed font-medium">
            {currentStep.summary}
          </p>

          {/* Action Box */}
          <div className="p-3.5 bg-agri-sand/60 rounded-2xl border border-agri-border flex items-start gap-3">
            <div className="p-1.5 rounded-xl bg-white text-agri-primary font-bold shrink-0 mt-0.5 shadow-2xs">
              ⚡
            </div>
            <div className="text-xs">
              <span className="font-bold text-agri-ink">System Execution: </span>
              <span className="text-agri-muted">{currentStep.keyAction}</span>
            </div>
          </div>

          {/* Judge Insight Box */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <div className="p-1.5 rounded-xl bg-emerald-600 text-white font-bold shrink-0 mt-0.5 shadow-2xs">
              🎯
            </div>
            <div className="text-xs">
              <span className="font-bold text-emerald-900">SIH Evaluator Takeaway: </span>
              <span className="text-emerald-800">{currentStep.insight}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-agri-border flex items-center justify-between">
          <button
            onClick={startFullDemo}
            className="text-xs font-bold text-agri-muted hover:text-agri-ink underline"
          >
            Restart from Step 1
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="farmer-tap-btn !min-h-[44px] px-4 py-2 border border-agri-border bg-white hover:bg-agri-sand disabled:opacity-40 rounded-xl text-xs font-bold text-agri-ink flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              className="farmer-tap-btn !min-h-[44px] px-5 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <span>{currentStepIndex === demoSteps.length - 1 ? 'Finish Demo' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
