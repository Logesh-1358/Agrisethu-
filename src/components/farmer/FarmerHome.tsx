import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NetProfitCard } from './NetProfitCard';
import { FarmerSellWindowWidget } from './FarmerSellWindowWidget';
import { rankProfitOptions } from '../../utils/profitEngine';
import { TOMATO_SIH_DEMO_CANDIDATES, ONION_DEMO_CANDIDATES } from '../../data/mockData';
import { OrderTrackerModal } from '../common/OrderTrackerModal';
import { 
  Sparkles, 
  PlusCircle, 
  ArrowRight, 
  Truck,
  ShieldCheck,
  TrendingUp,
  Store,
  Package,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { DigitalLot, Order } from '../../types';
import { speakText } from '../../utils/speechUtils';

export const FarmerHome: React.FC = () => {
  const { 
    t, 
    language,
    lots, 
    orders, 
    farmer, 
    setFarmerTab, 
    triggerTomatoDemo, 
    triggerOnionDemo, 
    selectedLotId,
    setSelectedLotId,
    weights
  } = useApp();

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  const currentLot = lots.find((l) => l.lot_id === selectedLotId) || lots[0];

  const getCandidatesForLot = (lot: DigitalLot) => {
    if (!lot) return TOMATO_SIH_DEMO_CANDIDATES;
    if (lot.crop.toLowerCase().includes('onion') || lot.crop.toLowerCase().includes('कांदा') || lot.crop.toLowerCase().includes('வெங்காயம்')) {
      return ONION_DEMO_CANDIDATES;
    }
    return TOMATO_SIH_DEMO_CANDIDATES;
  };

  const calculatedOptions = rankProfitOptions(
    getCandidatesForLot(currentLot),
    currentLot ? currentLot.quantity_kg : 1000,
    weights
  );

  const activeOrders = orders.filter((o) => o.status !== 'Completed');

  const handleReadGreeting = () => {
    const text = `${t.greeting} ${t.greetingSub} ${t.locationLabel}. ${t.bestNearbyPriceBadge}. ${t.marketDisclaimer}`;
    speakText(text, language);
  };

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto px-4 pt-4">
      {/* 1. TOP FARMER GREETING & LOCATION STRIP */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-primary to-emerald-900 text-white flex items-center justify-center text-3xl shadow-sm border border-white/20 shrink-0">
            👨‍🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-black text-xl sm:text-2xl text-agri-ink">
                {t.greeting} {farmer.name}
              </h1>
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" /> {t.verifiedBadge}
              </span>
            </div>
            <p className="text-xs text-agri-muted font-medium flex items-center gap-1 mt-0.5">
              <span>{t.locationLabel}</span>
              <span>•</span>
              <span>Land: {farmer.land_acres} Acres</span>
            </p>
          </div>
        </div>

        {/* Read Aloud & Active Shipment tracker */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadGreeting}
            className="p-2.5 bg-agri-sand hover:bg-agri-border rounded-xl text-agri-ink text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Read aloud"
          >
            <Volume2 className="w-4 h-4 text-agri-primary" />
            <span className="hidden sm:inline">{t.readAloudBtn}</span>
          </button>

          {activeOrders.length > 0 && (
            <button
              onClick={() => setActiveTrackingOrder(activeOrders[0])}
              className="farmer-tap-btn !min-h-[44px] px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-xs transition-all"
            >
              <Truck className="w-4 h-4 text-emerald-700 animate-bounce" />
              <span>{t.orderTrackerBtn(activeOrders[0].current_step)}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TODAY'S MARKET MANDI TICKER (Section 6 & 8) */}
      <div className="bg-[#FAF7EF] p-4 rounded-3xl border border-agri-border space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <div>
              <span className="font-extrabold text-xs text-agri-ink tracking-wide uppercase">
                {t.todayMarketHeader}: 🍅 Tomato (தக்காளி)
              </span>
              <div className="text-[11px] text-emerald-700 font-bold">
                {t.bestNearbyPriceBadge}
              </div>
            </div>
          </div>

          <button
            onClick={() => setFarmerTab('markets')}
            className="text-xs font-bold text-agri-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>All APMC Mandis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Nearby Mandis Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="bg-white p-3 rounded-2xl border border-agri-border flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-agri-ink">Coimbatore Market</span>
              <div className="text-[10px] text-agri-muted">Arrival: 85 Tonnes</div>
            </div>
            <div className="text-right">
              <span className="font-black text-sm text-agri-primary">₹24/kg</span>
              <div className="text-[10px] text-emerald-700 font-bold">Trend ↑</div>
            </div>
          </div>

          <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-300 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-emerald-950">Pollachi Market ⭐</span>
              <div className="text-[10px] text-emerald-800">Arrival: 42 Tonnes</div>
            </div>
            <div className="text-right">
              <span className="font-black text-base text-emerald-800">₹26/kg</span>
              <div className="text-[10px] text-emerald-700 font-bold">Best Nearby ↑</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-agri-border flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-agri-ink">Erode APMC Mandi</span>
              <div className="text-[10px] text-agri-muted">Arrival: 63 Tonnes</div>
            </div>
            <div className="text-right">
              <span className="font-black text-sm text-agri-ink">₹25/kg</span>
              <div className="text-[10px] text-stone-500 font-bold">Stable →</div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-stone-600 italic pt-1">
          💡 {t.marketDisclaimer}
        </p>
      </div>

      {/* 3. 7 LARGE FARMER-FRIENDLY DASHBOARD CARDS (Section 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Card 1: SELL MY CROP */}
        <button
          onClick={() => setFarmerTab('sell')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-gradient-to-br from-agri-primary to-emerald-800 text-white rounded-3xl text-left shadow-soft hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🌾</span>
            <PlusCircle className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm text-white">
              {t.quickSellCrop}
            </h3>
            <p className="text-[10px] text-emerald-100 mt-0.5 line-clamp-1">
              {t.quickSellCropSub}
            </p>
          </div>
        </button>

        {/* Card 2: MARKET PRICES */}
        <button
          onClick={() => setFarmerTab('markets')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-white border border-agri-border hover:border-agri-primary/40 rounded-3xl text-left shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📊</span>
            <TrendingUp className="w-5 h-5 text-agri-muted group-hover:text-agri-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm text-agri-ink">
              {t.quickMarketPrices}
            </h3>
            <p className="text-[10px] text-agri-muted mt-0.5 line-clamp-1">
              {t.quickMarketPricesSub}
            </p>
          </div>
        </button>

        {/* Card 3: AI SELL GUIDE */}
        <button
          onClick={() => setFarmerTab('sell-window')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-agri-ink rounded-3xl text-left shadow-soft hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🤖</span>
            <Sparkles className="w-5 h-5 text-agri-ink/60 group-hover:text-agri-ink transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm text-agri-ink">
              {t.quickSellGuide}
            </h3>
            <p className="text-[10px] text-agri-ink/80 mt-0.5 line-clamp-1 font-semibold">
              {t.quickSellGuideSub}
            </p>
          </div>
        </button>

        {/* Card 4: MY OFFERS & BEST BUYER */}
        <button
          onClick={() => setFarmerTab('offers')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-white border border-agri-border hover:border-agri-primary/40 rounded-3xl text-left shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🥇</span>
            <Store className="w-5 h-5 text-agri-muted group-hover:text-agri-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm text-agri-ink">
              {t.navOffers}
            </h3>
            <p className="text-[10px] text-agri-muted mt-0.5 line-clamp-1">
              Compare binding offers
            </p>
          </div>
        </button>

        {/* Card 5: LOGISTICS & STORAGE */}
        <button
          onClick={() => setFarmerTab('logistics')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-white border border-agri-border hover:border-agri-primary/40 rounded-3xl text-left shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🚚</span>
            <Truck className="w-5 h-5 text-agri-muted group-hover:text-agri-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm text-agri-ink">
              {t.quickLogistics}
            </h3>
            <p className="text-[10px] text-agri-muted mt-0.5 line-clamp-1">
              {t.quickLogisticsSub}
            </p>
          </div>
        </button>

        {/* Card 6: MY LOTS */}
        <button
          onClick={() => setFarmerTab('sell')}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-white border border-agri-border hover:border-agri-primary/40 rounded-3xl text-left shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">📦</span>
            <Package className="w-5 h-5 text-agri-muted group-hover:text-agri-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm text-agri-ink">
              {t.quickMyLots}
            </h3>
            <p className="text-[10px] text-agri-muted mt-0.5 line-clamp-1">
              {lots.length} registered lots
            </p>
          </div>
        </button>

        {/* Card 7: HELP & GRIEVANCE */}
        <button
          onClick={() => {
            alert('🆘 Farmer Support Helpline: 1800-180-1551 (Toll-Free). You can also raise dispute tickets in the Help tab.');
          }}
          className="farmer-tap-btn !min-h-[110px] p-4 bg-rose-50 border border-rose-200 hover:border-rose-400 text-rose-900 rounded-3xl text-left shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🆘</span>
            <HelpCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h3 className="font-headline font-black text-sm text-rose-950">
              {t.quickHelp}
            </h3>
            <p className="text-[10px] text-rose-800 mt-0.5 line-clamp-1 font-semibold">
              {t.quickHelpSub}
            </p>
          </div>
        </button>
      </div>

      {/* 4. ACTIVE DIGITAL LOT SELECTOR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-agri-muted uppercase tracking-wider flex items-center gap-1.5">
            <span>{t.activeLotsHeader}:</span>
          </label>
          <button
            onClick={() => setFarmerTab('sell')}
            className="text-xs font-bold text-agri-primary hover:underline flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" /> {t.addNewLotBtn}
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {lots.map((lot) => {
            const isSelected = lot.lot_id === selectedLotId;
            return (
              <button
                key={lot.lot_id}
                onClick={() => setSelectedLotId(lot.lot_id)}
                className={`farmer-tap-btn !min-h-[58px] px-4 py-2 rounded-2xl border-2 flex items-center gap-2.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'border-agri-primary bg-agri-primaryLight ring-2 ring-agri-primary/20 shadow-sm'
                    : 'border-agri-border bg-white text-agri-muted hover:border-agri-primary/40'
                }`}
              >
                <span className="text-2xl">{lot.crop_icon || '🌾'}</span>
                <div className="text-left">
                  <div className="font-headline font-bold text-sm text-agri-ink leading-tight">
                    {lot.crop}
                  </div>
                  <div className="text-[10px] text-agri-muted font-semibold">
                    {lot.lot_id} • {lot.quantity_tons} {t.tonsUnit} ({lot.quality})
                  </div>
                </div>
                {isSelected && (
                  <span className="w-5 h-5 bg-agri-primary text-white rounded-full flex items-center justify-center text-[10px] ml-1">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. THE AI SMART SELL WINDOW & PRICE TIMING FORECAST */}
      <FarmerSellWindowWidget />

      {/* 6. THE CENTERPIECE WOW MOMENT: NET PROFIT CARD */}
      {currentLot && (
        <NetProfitCard
          lot={currentLot}
          options={calculatedOptions}
        />
      )}

      {/* Order Tracker Modal */}
      {activeTrackingOrder && (
        <OrderTrackerModal
          order={activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
        />
      )}
    </div>
  );
};
