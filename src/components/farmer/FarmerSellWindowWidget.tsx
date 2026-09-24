import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Warehouse, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Volume2, 
  SlidersHorizontal,
  Coins
} from 'lucide-react';
import { speakText } from '../../utils/speechUtils';
import confetti from 'canvas-confetti';

export const FarmerSellWindowWidget: React.FC = () => {
  const { t, language, lots, selectedLotId, setFarmerTab } = useApp();
  const [selectedStrategy, setSelectedStrategy] = useState<'split' | 'wait' | 'now'>('split');
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const currentLot = lots.find((l) => l.lot_id === selectedLotId) || lots[0];
  const lotQty = currentLot ? currentLot.quantity_kg : 1000;
  const cropName = currentLot ? currentLot.crop : 'Tomato';

  const spotPrice = 24.0;
  const peakPrice = 27.5;
  const storageCostPerDay = 1.0; // ₹1/kg for 3 days or ₹0.33/kg/day
  const waitDays = 3;

  // Financial calculations
  const sellNowRevenue = lotQty * spotPrice; // ₹24,000
  const waitAllRevenue = lotQty * peakPrice - (lotQty * storageCostPerDay); // ₹27,500 - ₹1,000 = ₹26,500
  
  // 60% now / 40% later
  const splitNowQty = Math.round(lotQty * 0.6);
  const splitHoldQty = lotQty - splitNowQty;
  const splitNowRev = splitNowQty * 27.0; // Sri Lakshmi Foods @ ₹27/kg
  const splitHoldRev = (splitHoldQty * peakPrice) - (splitHoldQty * storageCostPerDay);
  const splitTotalRev = splitNowRev + splitHoldRev;
  const splitExtraGain = splitTotalRev - sellNowRevenue;

  const handleReadAdvisory = () => {
    const text = language === 'ta'
      ? `ஸ்மார்ட் விற்பனை சாளரம்: அடுத்த 3 நாட்களில் தக்காளி விலை 24 ரூபாயில் இருந்து 27 ரூபாய் 50 காசு வரை உயரும் என கணிக்கப்பட்டுள்ளது. பரிந்துரை: 60 சதவீதத்தை இன்றே விற்று 16,200 ரூபாய் உடனடி பணத்தைப் பெறுங்கள். மீதி 40 சதவீதத்தை 3 நாட்கள் குளிர்பதனக் கிடங்கில் சேமித்து விற்றால் 3,880 ரூபாய் கூடுதல் லாபம் கிடைக்கும்!`
      : `Smart Sell Window Advisory: Tomato prices are forecasted to rise from ₹24 to ₹27.50 per kg over 3 days. AI recommends Smart Split: sell 60% today for ₹16,200 immediate cash flow, and hold 40% in cold storage for ₹3,880 additional profit!`;
    speakText(text, language);
  };

  const handleApplyStrategy = () => {
    setIsApplied(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // safe
    }
    setTimeout(() => {
      setIsApplied(false);
    }, 4500);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-agri-ink to-emerald-900 text-white rounded-3xl p-5 sm:p-6 border border-emerald-500/30 shadow-elevated relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-agri-ink flex items-center justify-center text-2xl font-black shadow-md shrink-0">
            ⏳
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {t.sellWindowHeader}
              </span>
              <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live 4-Day Price Trajectory
              </span>
            </div>
            <h2 className="font-headline font-black text-lg sm:text-xl text-white mt-1">
              Should You Sell {cropName} Today or Wait {waitDays} Days?
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleReadAdvisory}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
            title="Read advisory aloud"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">{t.readAloudBtn}</span>
          </button>
          <button
            onClick={() => setFarmerTab('sell-window')}
            className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-agri-ink rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4-Day Trajectory Curve Strip */}
      <div className="relative z-10 py-5">
        <div className="flex items-center justify-between text-xs text-emerald-200 mb-2 font-medium">
          <span>Regional Price Trend (Coimbatore & Mandis)</span>
          <span className="text-amber-300 font-bold">Peak Expected on Day +2</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          {/* Day -1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between">
            <span className="text-[11px] text-emerald-200/70 font-semibold">Yesterday</span>
            <div className="my-1.5">
              <span className="text-sm sm:text-base font-extrabold text-white/70">₹22.00</span>
              <span className="text-[10px] text-white/50 block">/ kg</span>
            </div>
            <span className="text-[10px] text-stone-400 bg-white/5 rounded-md py-0.5">Past Baseline</span>
          </div>

          {/* Day 0 (Today Spot) */}
          <div className="bg-white/10 border-2 border-emerald-400/60 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between relative shadow-sm">
            <span className="text-[11px] text-emerald-300 font-bold flex items-center justify-center gap-1">
              Today Spot
            </span>
            <div className="my-1.5">
              <span className="text-base sm:text-lg font-black text-emerald-300">₹24.00</span>
              <span className="text-[10px] text-emerald-200/80 block">/ kg</span>
            </div>
            <span className="text-[10px] text-emerald-200 bg-emerald-500/20 rounded-md py-0.5 font-bold">
              Active Now
            </span>
          </div>

          {/* Day +2 (Projected Peak) */}
          <div className="bg-amber-500/15 border-2 border-amber-400 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between relative shadow-md">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-agri-ink text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
              🚀 Projected Peak
            </div>
            <span className="text-[11px] text-amber-200 font-bold mt-1">Day +2 (Wed)</span>
            <div className="my-1.5">
              <span className="text-base sm:text-lg font-black text-amber-300">₹27.50</span>
              <span className="text-[10px] text-amber-200/80 block">/ kg (+14.5%)</span>
            </div>
            <span className="text-[10px] text-amber-300 bg-amber-400/20 rounded-md py-0.5 font-bold">
              Supply Gap
            </span>
          </div>

          {/* Day +4 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between">
            <span className="text-[11px] text-emerald-200/70 font-semibold">Day +4 (Fri)</span>
            <div className="my-1.5">
              <span className="text-sm sm:text-base font-extrabold text-white/70">₹23.00</span>
              <span className="text-[10px] text-white/50 block">/ kg (-16%)</span>
            </div>
            <span className="text-[10px] text-rose-300 bg-rose-500/20 rounded-md py-0.5">
              Mysuru Influx
            </span>
          </div>
        </div>
      </div>

      {/* 3 Strategy Decision Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Strategy 1: Sell 100% Today */}
        <button
          onClick={() => setSelectedStrategy('now')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            selectedStrategy === 'now'
              ? 'bg-white/15 border-white/60 ring-2 ring-white/30'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-stone-300">{t.sellNowTitle}</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-stone-300">100% Now</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-snug">
              Instant cash flow, zero holding or cold storage charge.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-stone-400">Total Net:</span>
            <span className="font-black text-sm text-white">₹{sellNowRevenue.toLocaleString('en-IN')}</span>
          </div>
        </button>

        {/* Strategy 2: Smart Split (Recommended) */}
        <button
          onClick={() => setSelectedStrategy('split')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative ${
            selectedStrategy === 'split'
              ? 'bg-emerald-500/20 border-amber-400 ring-2 ring-amber-400/40 shadow-md'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-agri-ink text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            ⭐ Recommended
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-300">{t.partialSellTitle}</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                60% Now / 40% Hold
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 leading-snug">
              {splitNowQty} kg sold today @ ₹27 + {splitHoldQty} kg held in Cold Storage for peak!
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-amber-300 font-bold">Extra Gain:</span>
            <span className="font-black text-sm text-emerald-300">
              ₹{splitTotalRev.toLocaleString('en-IN')} (+₹{splitExtraGain.toLocaleString('en-IN')})
            </span>
          </div>
        </button>

        {/* Strategy 3: Wait 3 Days (100% Hold) */}
        <button
          onClick={() => setSelectedStrategy('wait')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            selectedStrategy === 'wait'
              ? 'bg-white/15 border-white/60 ring-2 ring-white/30'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-stone-300">{t.waitDaysTitle(waitDays)}</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-stone-300">100% Hold</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-snug">
              Hold all produce in Cold Storage for peak day. Requires waiting.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-stone-400">Total Net:</span>
            <span className="font-black text-sm text-white">₹{waitAllRevenue.toLocaleString('en-IN')}</span>
          </div>
        </button>
      </div>

      {/* Action CTA Bar */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-emerald-200/90 flex items-center gap-1.5 font-medium">
          <Warehouse className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            Nearby: <strong>Karamadai Agro Cold Storage</strong> (3.8 km away • ₹0.20/kg/day • 40 T available)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isApplied ? (
            <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>Strategy Locked & Stored!</span>
            </div>
          ) : (
            <button
              onClick={handleApplyStrategy}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-agri-ink rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Coins className="w-4 h-4 fill-current" />
              <span>
                {selectedStrategy === 'split' ? 'Apply Smart 60/40 Split' : selectedStrategy === 'wait' ? 'Book Cold Storage' : 'Proceed with 100% Sale'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
