import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Coins, 
  Sliders, 
  Play, 
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { DecisionTraceStep } from '../../types';

export const JudgeModeView: React.FC = () => {
  const { weights, setWeights, resetWeights, triggerTomatoDemo, setRole } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const decisionTrace: DecisionTraceStep[] = [
    {
      stepNumber: 1,
      title: 'Collect Real-Time Mandi Intelligence',
      description: 'Pulls arrivals & modal rates: Coimbatore APMC (₹24/kg, 85T), Pollachi (₹26/kg, 42T), Erode (₹25/kg, 63T). Computes regional baseline benchmark.',
      status: activeStepIndex >= 0 ? 'completed' : 'pending',
      outputBadge: 'Baseline Spot: ₹24-₹26/kg'
    },
    {
      stepNumber: 2,
      title: 'Standardize & Validate Farmer Digital Lot',
      description: 'Ingests LOT10025 parameters: 1,000 kg Tomato, Grade A, 12.5% moisture, 60mm uniform red, Jaivik Bharat organic certification.',
      status: activeStepIndex >= 1 ? 'completed' : 'pending',
      outputBadge: 'Quality Validated: Grade A'
    },
    {
      stepNumber: 3,
      title: 'Filter Candidate Institutional Buyers',
      description: 'Queries 15+ registered commercial buyers. Filters for tomato requirement, minimum 1,000 kg procurement capacity, and active KYC compliance.',
      status: activeStepIndex >= 2 ? 'completed' : 'pending',
      outputBadge: '3 Matched Bids'
    },
    {
      stepNumber: 4,
      title: 'Calculate Gross Revenue per Buyer',
      description: 'Buyer A quote: ₹28,000 | Buyer B quote: ₹27,000 | Buyer C quote: ₹29,000 (Nominal Highest Quote).',
      status: activeStepIndex >= 3 ? 'completed' : 'pending',
      outputBadge: 'Gross Range: ₹27k-₹29k'
    },
    {
      stepNumber: 5,
      title: 'Logistics Optimization & Dead-Mileage Deduction',
      description: 'Calculates ton-km transport deductions: Buyer B (24 km = -₹600) vs Buyer A (80 km = -₹2,000) vs Buyer C (120 km = -₹3,000).',
      status: activeStepIndex >= 4 ? 'completed' : 'pending',
      outputBadge: 'Transport: ₹600 - ₹3,000'
    },
    {
      stepNumber: 6,
      title: 'Buyer Credit Risk & Trust Evaluation',
      description: 'Evaluates settlement track record & dispute rates. Buyer B has 94/100 trust score (48-hr payment). Buyer C has 78/100 (15-day delay risk).',
      status: activeStepIndex >= 5 ? 'completed' : 'pending',
      outputBadge: 'Trust Penalty: -₹725 (Buyer C)'
    },
    {
      stepNumber: 7,
      title: 'Expected Net Farmer Profit Synthesis',
      description: 'Applies net formula: Gross - Transport - Commission - Risk. Buyer B yields ₹26,400 in-pocket cash vs Buyer C ₹25,100 vs Buyer A ₹24,800.',
      status: activeStepIndex >= 6 ? 'completed' : 'pending',
      outputBadge: 'Net Winner: Buyer B (₹26,400)'
    },
    {
      stepNumber: 8,
      title: 'Multi-Attribute Decision Matrix Ranking',
      description: 'Weights (40% Profit, 20% Trust, 10% Payment, 10% Transport, 10% Demand, 5% Dist, 5% Risk). Buyer B achieves 96.2 composite score.',
      status: activeStepIndex >= 7 ? 'completed' : 'pending',
      outputBadge: 'Rank 1: Sri Lakshmi Foods'
    },
    {
      stepNumber: 9,
      title: 'Smart Sell Window & Perishability Forecast',
      description: '3-Day forecast indicates +₹2.50/kg price surge. Storage fee ₹1.00/kg/day. AI advises Smart Partial Selling (60% now / 40% in 3 days).',
      status: activeStepIndex >= 8 ? 'completed' : 'pending',
      outputBadge: 'Recommendation: Smart Split'
    },
    {
      stepNumber: 10,
      title: 'Explainable Advice Dispatch to Farmer',
      description: 'Dispatches simplified card & voice audio: "Highest Price ≠ Highest Profit. Sell to Buyer B for ₹26,400 in-pocket earnings."',
      status: activeStepIndex >= 9 ? 'completed' : 'pending',
      outputBadge: 'FARMER EMPOWERED ✅'
    }
  ];

  // Auto-play animation cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < decisionTrace.length - 1 ? prev + 1 : 0));
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoPlaying, decisionTrace.length]);

  const problemSolutionMatrix = [
    {
      problem: 'Limited price visibility across nearby mandis',
      solution: 'Real-time multi-market intelligence & arrival volume tracking'
    },
    {
      problem: 'Fragmented buyer information & untrusted intermediaries',
      solution: 'Verified buyer network with transparent 0-100 trust scores'
    },
    {
      problem: 'Weak bargaining power for smallholder lots',
      solution: 'Digital Produce Lots + FPO pooling + direct binding bids'
    },
    {
      problem: 'Farmers sell immediately due to cash constraints',
      solution: 'Smart Sell Window with Partial Selling (Sell 60% now / 40% later)'
    },
    {
      problem: 'High and opaque transport costs eating into profits',
      solution: 'Direct farm-gate logistics booking & ton-km route pricing'
    },
    {
      problem: 'Perishable post-harvest losses & lack of storage',
      solution: 'Nearby cold storage discovery with rental factored into pricing'
    },
    {
      problem: 'Uncertain payments & prolonged credit default',
      solution: '7-Step transaction escrow tracking + verified e-Invoices'
    },
    {
      problem: 'Arbitrary quality rejection disputes at delivery',
      solution: 'Standardized digital grade parameters + audited grievance arbitration'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6 pb-24">
      {/* Judge Mode Header */}
      <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-950 text-white p-6 rounded-3xl border border-stone-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30">
            <Scale className="w-4 h-4" /> SMART INDIA HACKATHON 2026 — JUDGE EVALUATION CONSOLE
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl text-white">
            Architecture, Decision Trace & Mathematical Validation
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-3xl">
            This specialized view demonstrates AGRISETU’s algorithmic pipeline: proving how multi-attribute optimization eliminates rural information asymmetry and transaction overheads.
          </p>
        </div>

        <button
          onClick={() => {
            triggerTomatoDemo();
            setRole('farmer');
          }}
          className="farmer-tap-btn !min-h-[44px] px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap self-start md:self-auto"
        >
          <span>View in Farmer Mode</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 1. ANIMATED 10-STEP AI DECISION TRACE (Section 34) */}
      <div className="bg-white p-6 rounded-3xl border border-agri-border shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-agri-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900">
              <BrainCircuit className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="font-headline font-black text-xl text-agri-ink">
                10-Step Explainable AI Decision Trace
              </h2>
              <p className="text-xs text-agri-muted">
                Step-by-step audit showing how AGRISETU synthesizes mandi intelligence, logistics, and credit risk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 bg-agri-sand hover:bg-agri-border text-agri-ink text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-agri-border"
            >
              <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? 'text-emerald-600' : 'text-stone-600'}`} />
              <span>{isAutoPlaying ? 'Pause Trace' : 'Auto Play'}</span>
            </button>
            <button
              onClick={() => setActiveStepIndex(0)}
              className="p-1.5 text-agri-muted hover:text-agri-ink"
              title="Reset Trace"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {decisionTrace.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = activeStepIndex >= idx;

            return (
              <div
                key={step.stepNumber}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStepIndex(idx);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isActive
                    ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/30'
                    : isCompleted
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-agri-border bg-[#FAF7EF] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      isActive ? 'bg-amber-500 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'
                    }`}>
                      {step.stepNumber}
                    </span>
                    <h3 className="font-bold text-xs text-agri-ink">{step.title}</h3>
                  </div>

                  {step.outputBadge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {step.outputBadge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed pl-8">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. INTERACTIVE AI WEIGHT CALIBRATION (Section 14) */}
      <div className="bg-white p-6 rounded-3xl border border-agri-border shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-agri-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-900">
              <Sliders className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-headline font-black text-xl text-agri-ink">
                Configurable Multi-Attribute Decision Model
              </h2>
              <p className="text-xs text-agri-muted">
                Adjust scoring factor weights to test mathematical sensitivity and decision ranking robustness
              </p>
            </div>
          </div>

          <button
            onClick={resetWeights}
            className="text-xs font-bold text-agri-primary hover:underline self-start sm:self-auto"
          >
            Reset to Default Weights
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Slider: Net Profit */}
          <div className="p-3.5 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span>Net In-Pocket Profit:</span>
              <span className="text-emerald-700 font-mono font-black">{weights.netProfit}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.netProfit}
              onChange={(e) => setWeights({ ...weights, netProfit: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Slider: Buyer Reliability */}
          <div className="p-3.5 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span>Buyer Reliability:</span>
              <span className="text-blue-700 font-mono font-black">{weights.buyerReliability}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.buyerReliability}
              onChange={(e) => setWeights({ ...weights, buyerReliability: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Slider: Payment Speed */}
          <div className="p-3.5 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span>Payment Reliability:</span>
              <span className="text-amber-700 font-mono font-black">{weights.paymentReliability}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.paymentReliability}
              onChange={(e) => setWeights({ ...weights, paymentReliability: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Slider: Transport Cost */}
          <div className="p-3.5 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span>Transport Cost Weight:</span>
              <span className="text-purple-700 font-mono font-black">{weights.transportCost}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.transportCost}
              onChange={(e) => setWeights({ ...weights, transportCost: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 font-medium">
          💡 <strong>Judges note:</strong> Even if you adjust the weights within realistic market ranges, Buyer B consistently ranks #1 because the transport overhead of Buyer C (-₹3,000) creates a 12% drag on take-home profits.
        </div>
      </div>

      {/* 3. SIH PROBLEM → SOLUTION MAPPING (Section 51) */}
      <div className="bg-white p-6 rounded-3xl border border-agri-border shadow-soft space-y-4">
        <h2 className="font-headline font-black text-xl text-agri-ink">
          SIH Problem Statement → AGRISETU Direct Solution Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {problemSolutionMatrix.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF7EF] border border-agri-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                <span>❌ Problem:</span>
                <span>{item.problem}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-black pl-2 border-l-2 border-emerald-500">
                <span>✓ AGRISETU:</span>
                <span>{item.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
