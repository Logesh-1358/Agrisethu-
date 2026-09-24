import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalLot, Order } from '../../types';
import { OrderTrackerModal } from '../common/OrderTrackerModal';
import { 
  Building2, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Send, 
  Truck, 
  Eye, 
  ChevronRight,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { lots, buyers, offers, orders, createBuyerOffer } = useApp();

  const [activeBuyerId, setActiveBuyerId] = useState<string>('B005');
  const [selectedLotForOffer, setSelectedLotForOffer] = useState<DigitalLot | null>(null);
  const [offeredRate, setOfferedRate] = useState<number>(0);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentBuyer = buyers.find((b) => b.buyer_id === activeBuyerId) || buyers[0];

  const filteredLots = lots.filter((lot) => {
    const matchesCrop = filterCrop === 'all' || lot.crop.toLowerCase().includes(filterCrop.toLowerCase());
    const matchesSearch = lot.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lot.farmer_fpo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  const myOffers = offers.filter((o) => o.buyer_id === currentBuyer.buyer_id);
  const myOrders = orders.filter((ord) => ord.buyer_id === currentBuyer.buyer_id);

  const openOfferModal = (lot: DigitalLot) => {
    setSelectedLotForOffer(lot);
    setOfferedRate(lot.expected_price);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLotForOffer || offeredRate <= 0) return;
    createBuyerOffer(selectedLotForOffer.lot_id, offeredRate);
    setSelectedLotForOffer(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 pb-20">
      {/* Buyer Header Banner & Persona Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-agri-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-agri-ink text-white flex items-center justify-center text-xl">
            💼
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-bold text-xl text-agri-ink">
                Buyer Marketplace & Procurement Portal
              </h2>
              {currentBuyer.verified === 'Yes' ? (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Verified Buyer
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-700" /> KYC Pending
                </span>
              )}
            </div>
            <p className="text-xs text-agri-muted">
              Logged in as: <strong className="text-agri-ink">{currentBuyer.buyer_name}</strong> ({currentBuyer.buyer_type} • {currentBuyer.location})
            </p>
          </div>
        </div>

        {/* Switch Buyer Persona */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-agri-muted whitespace-nowrap">Switch Account:</span>
          <select
            value={activeBuyerId}
            onChange={(e) => setActiveBuyerId(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-agri-sand border border-agri-border rounded-xl text-agri-ink focus:outline-none focus:ring-1 focus:ring-agri-primary"
          >
            {buyers.map((b) => (
              <option key={b.buyer_id} value={b.buyer_id}>
                {b.buyer_name} ({b.buyer_type} - {b.location}) [{b.verified}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Procurement Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-agri-border shadow-xs">
          <span className="text-xs text-agri-muted">Available Farm Lots</span>
          <p className="font-headline text-2xl font-bold text-agri-ink mt-1">
            {lots.filter((l) => l.status === 'Available').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-agri-border shadow-xs">
          <span className="text-xs text-agri-muted">My Active Bids</span>
          <p className="font-headline text-2xl font-bold text-amber-600 mt-1">
            {myOffers.filter((o) => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-agri-border shadow-xs">
          <span className="text-xs text-agri-muted">Live Orders In Transit</span>
          <p className="font-headline text-2xl font-bold text-emerald-700 mt-1">
            {myOrders.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-agri-border shadow-xs">
          <span className="text-xs text-agri-muted">Mandi Commission Saved</span>
          <p className="font-headline text-2xl font-bold text-agri-primary mt-1">
            0% (Direct)
          </p>
        </div>
      </div>

      {/* Active Orders Quick Access Strip */}
      {myOrders.length > 0 && (
        <div className="bg-emerald-50/70 border border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-700" />
            <div>
              <span className="font-bold text-sm text-emerald-950">
                You have {myOrders.length} active delivery in transit
              </span>
              <p className="text-xs text-emerald-800">
                Order #{myOrders[0].id}: {myOrders[0].crop} ({myOrders[0].quantity_kg} kg) from {myOrders[0].farmer_name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(myOrders[0])}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap"
          >
            Track Order #{myOrders[0].id}
          </button>
        </div>
      )}

      {/* Digital Lots Marketplace Table (Exact Schema) */}
      <div className="bg-white rounded-2xl border border-agri-border shadow-soft overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-4 border-b border-agri-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline font-bold text-lg text-agri-ink">
              Digital Farm Lots (Direct Sourcing)
            </h3>
            <p className="text-xs text-agri-muted">
              Browse lots verified by FPOs and farmers across Maharashtra
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-agri-muted absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search crop, location, FPO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-agri-sand border border-agri-border rounded-xl text-agri-ink focus:outline-none focus:ring-1 focus:ring-agri-primary w-48 sm:w-60"
              />
            </div>

            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-3 py-1.5 text-xs bg-agri-sand border border-agri-border rounded-xl text-agri-ink focus:outline-none"
            >
              <option value="all">All Crops</option>
              <option value="onion">Onion</option>
              <option value="tomato">Tomato</option>
              <option value="soybean">Soybean</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-agri-ink">
            <thead className="bg-agri-sand/70 text-agri-muted font-bold uppercase tracking-wider border-b border-agri-border">
              <tr>
                <th className="p-3">Lot ID</th>
                <th className="p-3">Farmer / FPO</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Quality</th>
                <th className="p-3">Harvest Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Expected Price</th>
                <th className="p-3">Available From</th>
                <th className="p-3">Certification</th>
                <th className="p-3 text-center">Photo</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-agri-border">
              {filteredLots.map((lot) => (
                <tr key={lot.lot_id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-agri-primary">
                    {lot.lot_id}
                  </td>
                  <td className="p-3 font-medium">
                    {lot.farmer_fpo}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span>{lot.crop_icon || '🌾'}</span>
                      <span>{lot.crop}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">
                    {lot.quantity_tons} Tons ({lot.quantity_kg} kg)
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {lot.quality}
                    </span>
                  </td>
                  <td className="p-3 text-agri-muted">
                    {lot.harvest_date}
                  </td>
                  <td className="p-3 text-agri-muted">
                    {lot.location}
                  </td>
                  <td className="p-3 font-extrabold text-emerald-800 text-sm">
                    ₹{lot.expected_price}/kg
                  </td>
                  <td className="p-3 text-agri-muted">
                    {lot.available_from}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {lot.certification}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {lot.images && lot.images[0] ? (
                      <img
                        src={lot.images[0]}
                        alt="Produce"
                        className="w-9 h-9 object-cover rounded-lg mx-auto border border-agri-border"
                      />
                    ) : (
                      <span className="text-base">📷</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lot.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lot.status === 'Sold'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lot.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {lot.status === 'Available' ? (
                      <button
                        onClick={() => openOfferModal(lot)}
                        className="px-3 py-1.5 bg-agri-primary hover:bg-agri-primaryDark text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Make Offer
                      </button>
                    ) : (
                      <span className="text-xs text-agri-muted italic">Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Submitted Offers Section */}
      <div className="bg-white rounded-2xl border border-agri-border shadow-soft p-5">
        <h3 className="font-headline font-bold text-lg text-agri-ink mb-3">
          My Submitted Offers ({myOffers.length})
        </h3>
        {myOffers.length === 0 ? (
          <p className="text-xs text-agri-muted">You have not submitted any offers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-agri-sand/60 text-agri-muted font-bold uppercase">
                <tr>
                  <th className="p-2.5">Offer ID</th>
                  <th className="p-2.5">Lot ID</th>
                  <th className="p-2.5">Crop</th>
                  <th className="p-2.5">Quantity</th>
                  <th className="p-2.5">Offered Rate</th>
                  <th className="p-2.5">Total Offer Value</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-agri-border">
                {myOffers.map((off) => (
                  <tr key={off.id}>
                    <td className="p-2.5 font-mono font-bold text-agri-primary">{off.id}</td>
                    <td className="p-2.5 font-mono">{off.lot_id}</td>
                    <td className="p-2.5 font-bold">{off.crop}</td>
                    <td className="p-2.5">{off.quantity_kg} kg</td>
                    <td className="p-2.5 font-bold text-emerald-800">₹{off.offered_price_per_kg}/kg</td>
                    <td className="p-2.5 font-bold">₹{(off.offered_price_per_kg * off.quantity_kg).toLocaleString('en-IN')}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        off.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : off.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {off.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submit Offer Modal */}
      {selectedLotForOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-agri-border shadow-modal p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-agri-border pb-3">
              <div>
                <h3 className="font-headline font-bold text-lg text-agri-ink">
                  Submit Offer for {selectedLotForOffer.lot_id}
                </h3>
                <p className="text-xs text-agri-muted">
                  {selectedLotForOffer.crop} • {selectedLotForOffer.farmer_fpo}
                </p>
              </div>
              <button
                onClick={() => setSelectedLotForOffer(null)}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-4">
              <div className="p-3 rounded-2xl bg-agri-sand/60 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-agri-muted">Lot Quantity:</span>
                  <span className="font-bold text-agri-ink">{selectedLotForOffer.quantity_kg} kg ({selectedLotForOffer.quantity_tons} tons)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agri-muted">Farmer's Expected Rate:</span>
                  <span className="font-bold text-agri-primary">₹{selectedLotForOffer.expected_price}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agri-muted">Quality Grade:</span>
                  <span className="font-bold">{selectedLotForOffer.quality}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-agri-muted uppercase tracking-wider mb-1.5">
                  Your Offered Price (₹ per kg):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={offeredRate}
                    onChange={(e) => setOfferedRate(Number(e.target.value))}
                    className="flex-1 h-12 px-4 rounded-xl border border-agri-border text-lg font-bold text-agri-ink focus:outline-none focus:ring-2 focus:ring-agri-primary"
                    required
                  />
                  <span className="text-xs font-bold text-agri-muted">₹/kg</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">Total Contract Value:</span>
                <span className="font-headline font-extrabold text-lg text-emerald-800">
                  ₹{(offeredRate * selectedLotForOffer.quantity_kg).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLotForOffer(null)}
                  className="w-1/3 py-2.5 rounded-xl border border-agri-border text-xs font-bold text-agri-ink hover:bg-agri-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-agri-primary hover:bg-agri-primaryDark text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Offer to Farmer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
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
