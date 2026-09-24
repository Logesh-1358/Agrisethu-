import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateSmartSplitSale } from '../../utils/profitEngine';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Warehouse, 
  ShieldCheck, 
  Coins, 
  ArrowRight,
  PieChart,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { speakText } from '../../utils/speechUtils';

export const SmartSellWindowView: React.FC = () => {
  const { t, language, lots, selectedLotId } = useApp();
  const [splitPct, setSplitPct] = useState<number>(60); // 60% now, 40% later
  const [daysHold, setDaysHold] = useState<number>(3);

  const currentLot = lots.find((l) => l.lot_id === selectedLotId) || lots[0];
  const totalWeight = currentLot ? currentLot.quantity_kg : 1000;
  const currentPrice = 24.0;
  const forecastPrice = 27.5;
  const storageCostDay = 1.0;

  const splitResult = calculateSmartSplitSale(
    totalWeight,
    currentPrice,
    forecastPrice,
    storageCostDay,
    daysHold,
    splitPct
  );

  const handleReadAloud = () => {
    const text = language === 'ta'
      ? `ஸ்மார்ட் விற்பனை வழிகாட்டி: அடுத்த 3 நாட்களில் தக்காளி விலை 24 ரூபாயிலிருந்து 27 ரூபாய் வரை உயரும் என கணிக்கப்பட்டுள்ளது. எனவே 60 சதவீதத்தை இன்றே விற்று உடனடி பணத் தேவையை பூர்த்தி செய்யுங்கள், 40 சதவீதத்தை 3 நாட்கள் சேமித்து விற்றால் 4,000 ரூபாய் கூடுதல் லாபம் கிடைக்கும்!`
      : `Smart Sell Window: Tomato prices are projected to rise from ₹24 to ₹27.50/kg over 3 days. We recommend Smart Partial Selling: Sell 60% today to protect cash flow, and hold 40% in cold storage to capture an estimated +₹${splitResult.additionalGain.toLocaleString('en-IN')} upside!`;
    speakText(text, language);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-agri-primary to-emerald-950 text-white p-5 sm:p-6 shadow-elevated border border-white/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-agri-accent text-agri-ink text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-current" /> {t.sellWindowHeader}
            </div>
            <h2 className="font-headline font-black text-2xl text-white">
              Should I Sell Today or Wait?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              AGRISETU AI models price trajectories, perishable decay risk, cold storage rental fees, and regional demand to optimize your selling date.
            </p>
          </div>

          <button
            onClick={handleReadAloud}
            className="farmer-tap-btn !min-h-[44px] px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-xs border border-white/30 whitespace-nowrap self-start md:self-auto"
          >
            <span>{t.readAloudBtn}</span>
          </button>
        </div>

        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 3 Decision Scenarios Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scenario 1: Sell 100% Now */}
        <div className="agri-card p-5 bg-white border border-agri-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-agri-muted uppercase tracking-wider">Scenario A</span>
              <span className="text-xs bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded-full">Zero Risk</span>
            </div>
            <h3 className="font-headline font-bold text-base text-agri-ink">Sell 100% Today</h3>
            <p className="text-xs text-agri-muted mt-1">
              Dispatch entire {totalWeight} kg lot at current spot price (₹{currentPrice}/kg).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-agri-border">
            <span className="text-[10px] font-bold text-agri-muted uppercase">Gross Cash Today</span>
            <div className="text-2xl font-black text-agri-ink mt-0.5">
              ₹{splitResult.allNowRevenue.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Scenario 2: Wait 3 Days (100% Hold) */}
        <div className="agri-card p-5 bg-white border border-agri-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-agri-muted uppercase tracking-wider">Scenario B</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Medium Risk</span>
            </div>
            <h3 className="font-headline font-bold text-base text-agri-ink">{t.waitDaysTitle(3)}</h3>
            <p className="text-xs text-agri-muted mt-1">
              Hold full lot in cold storage. Storage fee: ₹{storageCostDay}/kg/day.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-agri-border">
            <span className="text-[10px] font-bold text-agri-muted uppercase">Net After Storage</span>
            <div className="text-2xl font-black text-amber-700 mt-0.5">
              ₹{(totalWeight * forecastPrice - totalWeight * storageCostDay * daysHold).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Scenario 3: Recommended Smart Partial Selling (WOW MOMENT #2) */}
        <div className="agri-card p-5 bg-emerald-50 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-[9px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            🥇 AI RECOMMENDED
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 pt-1">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Scenario C</span>
            </div>
            <h3 className="font-headline font-extrabold text-base text-agri-ink">{t.partialSellTitle}</h3>
            <p className="text-xs text-emerald-900 mt-1 font-medium">
              Sell {splitResult.qtyNow} kg today + hold {splitResult.qtyLater} kg for 3 days.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200">
            <span className="text-[10px] font-extrabold text-emerald-900 uppercase">Combined Realized Cash</span>
            <div className="text-2xl font-black text-emerald-800 mt-0.5">
              ₹{splitResult.splitTotalEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-700 font-extrabold mt-1">
              +₹{splitResult.additionalGain.toLocaleString('en-IN')} Extra Profit!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Partial Selling Simulator Slider */}
      <div className="bg-white rounded-3xl border border-agri-border shadow-soft p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-agri-accent/20 text-agri-ink">
              <Sliders className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-agri-ink">
                Interactive Smart Split Simulator
              </h3>
              <p className="text-xs text-agri-muted">
                Adjust how much you want to sell today versus hold in certified storage
              </p>
            </div>
          </div>

          <span className="text-xs font-black bg-agri-primary text-white px-3 py-1 rounded-xl">
            {splitPct}% NOW / {100 - splitPct}% LATER
          </span>
        </div>

        {/* Slider Input */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-stone-600">
            <span>Sell Today: {splitResult.qtyNow} kg (₹{splitResult.revenueNow.toLocaleString('en-IN')})</span>
            <span>Store for 3 Days: {splitResult.qtyLater} kg</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            step="10"
            value={splitPct}
            onChange={(e) => setSplitPct(Number(e.target.value))}
            className="w-full h-3 bg-agri-sand rounded-lg appearance-none cursor-pointer accent-agri-primary"
          />
          <div className="flex justify-between text-[10px] text-agri-muted">
            <span>20% (Max Risk/Upside)</span>
            <span>50% (Balanced)</span>
            <span>60% (Recommended)</span>
            <span>80% (Max Liquidity)</span>
          </div>
        </div>

        {/* Rationale and Strategy Explanation */}
        <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-agri-primary">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Why Smart Partial Selling is a Game Changer:</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {splitResult.recommendation}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => alert(`✅ Smart Split Order strategy recorded: ${splitResult.qtyNow} kg booked for dispatch today, ${splitResult.qtyLater} kg scheduled for Pollachi cold storage holding.`)}
            className="farmer-tap-btn !min-h-[46px] px-6 py-2.5 bg-agri-primary hover:bg-agri-primaryDark text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <span>{t.partialSellBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
