import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users2, 
  Package, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  PlusCircle, 
  ArrowRight, 
  Layers,
  Coins,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const FPODashboard: React.FC = () => {
  const { fpoMembers, aggregateFPOLot, lots, t } = useApp();
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(['MEM-01', 'MEM-02', 'MEM-03']);
  const [expectedRate, setExpectedRate] = useState<number>(27);

  const totalAggregatedQty = fpoMembers
    .filter((m) => selectedMemberIds.includes(m.id))
    .reduce((sum, m) => sum + m.available_qty_kg, 0);

  const toggleMember = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter((x) => x !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleCreateBulkLot = () => {
    if (selectedMemberIds.length === 0) return;
    aggregateFPOLot(selectedMemberIds, expectedRate);
  };

  const aggregatedLots = lots.filter((l) => l.is_fpo_aggregated);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center text-2xl shadow-sm">
            👥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-black text-xl text-agri-ink">
                Kongu Vellalar Farmer Producer Company (FPO Consortium)
              </h2>
              <span className="text-xs bg-blue-100 text-blue-900 font-extrabold px-2.5 py-0.5 rounded-full border border-blue-300">
                NABARD & SFAC Registered
              </span>
            </div>
            <p className="text-xs text-agri-muted mt-0.5">
              Smallholder Produce Aggregation & Institutional Bulk Sourcing Protocol
            </p>
          </div>
        </div>

        <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700" /> Active Aggregation Hub
        </span>
      </div>

      {/* FPO KPI Metric Strip (Section 31) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="agri-card p-4 bg-white border border-agri-border">
          <span className="text-xs text-agri-muted font-bold uppercase">Total Member Farmers</span>
          <p className="font-headline text-3xl font-black text-agri-ink mt-1">124</p>
          <span className="text-[10px] text-emerald-700 font-bold">✓ 100% KYC Verified</span>
        </div>

        <div className="agri-card p-4 bg-white border border-agri-border">
          <span className="text-xs text-agri-muted font-bold uppercase">Available Produce</span>
          <p className="font-headline text-3xl font-black text-agri-primary mt-1">48 T</p>
          <span className="text-[10px] text-agri-muted font-semibold">Tomato, Onion & Chilli</span>
        </div>

        <div className="agri-card p-4 bg-white border border-agri-border">
          <span className="text-xs text-agri-muted font-bold uppercase">Active Bulk Lots</span>
          <p className="font-headline text-3xl font-black text-amber-600 mt-1">{17 + aggregatedLots.length}</p>
          <span className="text-[10px] text-blue-700 font-bold">Open for Institutional Bids</span>
        </div>

        <div className="agri-card p-4 bg-white border border-agri-border">
          <span className="text-xs text-agri-muted font-bold uppercase">Disbursed Payouts</span>
          <p className="font-headline text-3xl font-black text-emerald-700 mt-1">₹4.2L</p>
          <span className="text-[10px] text-emerald-700 font-bold">Zero commission deducted</span>
        </div>
      </div>

      {/* SMALLHOLDER PRODUCE AGGREGATION MODULE (Section 11) */}
      <div className="bg-white rounded-3xl border border-agri-border shadow-soft p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-agri-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> SECTION 11 REQUIREMENT
            </div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              Smallholder Produce Aggregation Pool
            </h3>
            <p className="text-xs text-agri-muted">
              Select smallholder farmer quantities to combine into a unified high-volume bulk lot
            </p>
          </div>

          <div className="bg-[#FAF7EF] px-4 py-2 rounded-2xl border border-agri-border text-right">
            <span className="text-[10px] text-agri-muted uppercase font-bold">Combined Weight:</span>
            <div className="text-2xl font-black text-agri-primary">
              {totalAggregatedQty.toLocaleString('en-IN')} KG ({totalAggregatedQty / 1000} T)
            </div>
          </div>
        </div>

        {/* Member Farmer Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fpoMembers.map((member) => {
            const isSelected = selectedMemberIds.includes(member.id);
            return (
              <div
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-agri-border bg-[#FAF7EF] hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">{member.id}</span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </div>
                <h4 className="font-bold text-xs text-agri-ink">{member.name}</h4>
                <p className="text-[11px] text-agri-muted mt-0.5">📍 {member.village}</p>
                <div className="mt-2 pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-700">{member.crop}:</span>
                  <span className="font-extrabold text-blue-800">{member.available_qty_kg} kg</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aggregation Formulation Bar */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 p-4 rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-extrabold text-sm text-blue-950 flex items-center gap-2">
              <span>Farmer 1 (500 kg) + Farmer 2 (700 kg) + Farmer 3 (800 kg) =</span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono">2,000 KG</span>
            </div>
            <p className="text-xs text-blue-800">
              Institutional processors (ITC, Sri Lakshmi) only bid on minimum 2,000 kg aggregated volume!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span>Target Rate:</span>
              <input
                type="number"
                value={expectedRate}
                onChange={(e) => setExpectedRate(Number(e.target.value))}
                className="w-16 px-2 py-1 bg-white border border-blue-300 rounded-lg font-bold text-center text-agri-ink"
              />
              <span>/ kg</span>
            </div>

            <button
              onClick={handleCreateBulkLot}
              className="farmer-tap-btn !min-h-[44px] px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
            >
              <span>Create FPO Bulk Lot 🚀</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE FPO AGGREGATED LOTS */}
      <div className="space-y-4">
        <h3 className="font-headline font-bold text-base text-agri-ink">
          Published FPO Bulk Lots Available for Bidding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aggregatedLots.map((lot) => (
            <div
              key={lot.lot_id}
              className="agri-card p-5 bg-white border border-agri-border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Aggregated Lot ({lot.aggregated_farmers_count || 3} Farmers)
                    </span>
                    <h4 className="font-headline font-black text-lg text-agri-ink mt-1.5">
                      {lot.crop} — {lot.quantity_kg.toLocaleString('en-IN')} kg
                    </h4>
                  </div>
                  <span className="text-base font-black text-agri-primary">
                    ₹{lot.expected_price}/kg
                  </span>
                </div>

                <div className="mt-3 p-3 bg-agri-sand/60 rounded-xl space-y-1 text-xs text-agri-muted">
                  <div className="flex justify-between">
                    <span>Quality Standard:</span>
                    <span className="font-bold text-agri-ink">{lot.quality} ({lot.certification})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aggregation Hub:</span>
                    <span className="font-bold text-agri-ink">{lot.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-bold text-emerald-700">Open for Institutional Bids</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-agri-border flex items-center justify-between">
                <span className="text-[11px] text-agri-muted font-mono">Lot ID: {lot.lot_id}</span>
                <button
                  onClick={() => alert(`Bidding opened for ${lot.lot_id}. 3 buyers notified (Sri Lakshmi, ITC, ABC Foods).`)}
                  className="px-4 py-1.5 bg-agri-primary text-white font-bold text-xs rounded-xl hover:bg-agri-primaryDark shadow-xs"
                >
                  Manage Offers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
