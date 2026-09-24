import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Filter, 
  Search, 
  Clock, 
  Sparkles, 
  Info,
  Calendar,
  Layers
} from 'lucide-react';

export const MarketIntelligenceView: React.FC = () => {
  const { mandis, t, language } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('all');

  const filteredMandis = mandis.filter((m) => {
    const matchesCrop = selectedCrop === 'all' || m.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesDistrict = !searchDistrict || m.district.toLowerCase().includes(searchDistrict.toLowerCase()) || m.market_name.toLowerCase().includes(searchDistrict.toLowerCase());
    const matchesState = selectedState === 'all' || m.state.toLowerCase() === selectedState.toLowerCase();
    return matchesCrop && matchesDistrict && matchesState;
  });

  const getTrendBadge = (trend: 'UP' | 'DOWN' | 'STABLE') => {
    switch (trend) {
      case 'UP':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-xs">
            <TrendingUp className="w-3.5 h-3.5" /> Rising ↑
          </span>
        );
      case 'DOWN':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full text-xs">
            <TrendingDown className="w-3.5 h-3.5" /> Falling ↓
          </span>
        );
      case 'STABLE':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-xs">
            <Minus className="w-3.5 h-3.5" /> Stable →
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Title & Principle Header */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-agri-primaryLight text-agri-primary font-bold text-xs px-3 py-1 rounded-full mb-2">
            <Layers className="w-3.5 h-3.5" /> MANDI PRICE INTELLIGENCE (NOT A BUYER)
          </div>
          <h2 className="font-headline font-black text-2xl text-agri-ink">
            {t.todayMarketHeader}
          </h2>
          <p className="text-xs text-agri-muted mt-1 leading-relaxed max-w-2xl">
            {t.marketDisclaimer}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-300">
            {t.bestNearbyPriceBadge}
          </span>
        </div>
      </div>

      {/* Location & Crop Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-agri-border shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-agri-sand px-3 py-1.5 rounded-xl text-xs font-bold text-agri-ink">
            <MapPin className="w-4 h-4 text-agri-primary" />
            <span>State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All States</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-agri-sand px-3 py-1.5 rounded-xl text-xs font-bold text-agri-ink">
            <span>Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Crops</option>
              <option value="tomato">Tomato (தக்காளி)</option>
              <option value="onion">Onion (வெங்காயம்/कांदा)</option>
            </select>
          </div>
        </div>

        {/* Search District */}
        <div className="flex items-center gap-2 bg-agri-sand px-3 py-1.5 rounded-xl border border-agri-border text-xs w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-agri-muted" />
          <input
            type="text"
            placeholder="Search district or mandi..."
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
            className="bg-transparent w-full text-xs text-agri-ink focus:outline-none"
          />
        </div>
      </div>

      {/* Mandi Price Comparison Table */}
      <div className="bg-white rounded-3xl border border-agri-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100 text-stone-700 font-extrabold text-[11px] uppercase tracking-wider border-b border-agri-border">
                <th className="p-3.5">Mandi / Market</th>
                <th className="p-3.5">Distance</th>
                <th className="p-3.5">Today's Arrival</th>
                <th className="p-3.5">Min - Max</th>
                <th className="p-3.5 font-black text-agri-primary">Modal Rate (₹/kg)</th>
                <th className="p-3.5">Trend</th>
                <th className="p-3.5">3-Day Forecast</th>
                <th className="p-3.5">Mandi Comm.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-agri-border/60">
              {filteredMandis.map((m) => (
                <tr key={m.id} className="hover:bg-[#FAF7EF] transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-sm text-agri-ink">{m.market_name}</div>
                    <div className="text-[11px] text-agri-muted">{m.district}, {m.state} • {m.crop}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-agri-muted">
                    {m.distance_km} km
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-agri-ink">{m.arrival_tonnes} T</span>
                    <div className="text-[10px] text-emerald-700 font-semibold">{m.demand_index} Demand</div>
                  </td>
                  <td className="p-3.5 text-agri-muted font-mono">
                    ₹{m.min_price} - ₹{m.max_price}
                  </td>
                  <td className="p-3.5">
                    <span className="text-base font-black text-agri-primary">
                      ₹{m.modal_price}
                    </span>
                    <span className="text-[10px] text-agri-muted"> / kg</span>
                  </td>
                  <td className="p-3.5">
                    {getTrendBadge(m.trend)}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 font-mono font-bold text-xs">
                      <span>₹{m.forecast_3day[0]}</span>
                      <span>→</span>
                      <span className={m.forecast_3day[1] >= m.forecast_3day[0] ? 'text-emerald-700' : 'text-rose-600'}>
                        ₹{m.forecast_3day[1]}
                      </span>
                      <span>→</span>
                      <span>₹{m.forecast_3day[2]}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-rose-700 font-semibold">
                    {m.commission_pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distinction Reminder for SIH Judges */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-900">
          <p className="font-bold">
            Key Architecture Principle: Market Intelligence vs Commercial Buyer
          </p>
          <p className="text-amber-800 leading-relaxed">
            Market prices shown above are reported APMC reference rates from regulated yards. They do NOT represent guaranteed purchase contracts. AGRISETU connects farmers directly to verified institutional buyers who provide binding contracts, scheduled pickup, and escrow payments.
          </p>
        </div>
      </div>
    </div>
  );
};
