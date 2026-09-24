import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderTrackerModal } from '../common/OrderTrackerModal';
import { DigitalInvoiceModal } from '../common/DigitalInvoiceModal';
import { Offer, Order } from '../../types';
import { 
  Check, 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const FarmerOffers: React.FC = () => {
  const { 
    t, 
    offers, 
    orders, 
    acceptOffer, 
    rejectOffer, 
    counterOffer, 
    setActiveInvoice, 
    activeInvoice 
  } = useApp();

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [counterOfferId, setCounterOfferId] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(28);

  const pendingOffers = offers.filter((o) => o.status === 'Pending' || o.status === 'Countered');
  const pastOffers = offers.filter((o) => o.status === 'Accepted' || o.status === 'Rejected');

  const handleSendCounter = (offerId: string) => {
    counterOffer(offerId, counterPriceInput);
    setCounterOfferId(null);
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex items-center justify-between">
        <div>
          <h2 className="font-headline text-xl sm:text-2xl font-bold text-agri-ink">
            {t.offersTitle}
          </h2>
          <p className="text-xs text-agri-muted mt-0.5">
            {t.offersSub}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl">
          🏷️
        </div>
      </div>

      {/* Active Ongoing Orders & Step Tracker */}
      {orders.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-agri-muted uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-agri-primary" /> Active Orders & Shipments ({orders.length})
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="agri-card border-l-8 border-l-emerald-600 p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Order #{ord.id}
                    </span>
                    <span className="text-xs text-agri-muted">
                      {ord.created_at}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-base text-agri-ink">
                    {ord.crop} • {ord.buyer_name}
                  </h4>
                  <div className="text-xs text-agri-muted mt-0.5 flex flex-wrap items-center gap-3">
                    <span>Qty: {ord.quantity_kg} kg</span>
                    <span>Rate: ₹{ord.agreed_price_per_kg}/kg</span>
                    <span className="font-bold text-agri-primary">Total: ₹{ord.total_value.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedInvoiceOrder(ord)}
                    className="farmer-tap-btn !min-h-[44px] px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-agri-ink font-bold text-xs rounded-xl flex items-center gap-1.5 border border-stone-300 transition-all"
                  >
                    <FileText className="w-4 h-4 text-stone-600" />
                    <span>e-Invoice</span>
                  </button>

                  <button
                    onClick={() => setActiveTrackingOrder(ord)}
                    className="farmer-tap-btn !min-h-[44px] px-4 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-transform active:scale-95"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{t.orderTrackerBtn(ord.current_step)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Offers List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-agri-muted uppercase tracking-wider">
          Direct Commercial Bids ({pendingOffers.length})
        </h3>

        {pendingOffers.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-agri-border text-agri-muted space-y-2">
            <span className="text-4xl">🌾</span>
            <p className="font-bold text-sm text-agri-ink">No pending offers currently</p>
            <p className="text-xs">Create a new produce lot to receive bids from verified institutional buyers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingOffers.map((offer) => (
              <div
                key={offer.id}
                className={`agri-card p-5 bg-white border ${
                  offer.is_best_deal ? 'border-2 border-emerald-500 shadow-soft ring-2 ring-emerald-500/20' : 'border-agri-border'
                } rounded-3xl space-y-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-agri-ink">
                      {offer.buyer_name}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Trust: {offer.trust_score}/100
                    </span>
                    {offer.is_best_deal && (
                      <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                        🥇 Best Expected Profit
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-agri-muted">
                    Payment: <strong>{offer.payment_terms}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7EF] p-3 rounded-2xl border border-agri-border text-xs">
                  <div>
                    <span className="text-agri-muted text-[10px] uppercase font-bold">Offered Price</span>
                    <p className="text-base font-black text-agri-ink">₹{offer.offered_price_per_kg}/{t.kgUnit}</p>
                  </div>
                  <div>
                    <span className="text-agri-muted text-[10px] uppercase font-bold">Transport Cost</span>
                    <p className="text-base font-bold text-rose-600">-₹{offer.transport_cost}</p>
                  </div>
                  <div>
                    <span className="text-agri-muted text-[10px] uppercase font-bold">Risk Level</span>
                    <p className={`text-base font-bold ${offer.risk_level === 'Low' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {offer.risk_level} Risk
                    </p>
                  </div>
                  <div>
                    <span className="text-agri-muted text-[10px] uppercase font-bold">Net in Pocket</span>
                    <p className="text-base font-black text-emerald-700">₹{offer.net_profit_estimate.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {offer.status === 'Countered' && (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-semibold flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>Counter-offer of ₹{offer.counter_price}/kg submitted to buyer. Awaiting confirmation.</span>
                  </div>
                )}

                {/* Actions: Accept, Reject, Counter */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-agri-border">
                  <button
                    onClick={() => rejectOffer(offer.id)}
                    className="farmer-tap-btn !min-h-[44px] px-4 py-2 border border-agri-border hover:bg-stone-100 rounded-xl text-xs font-bold text-agri-muted flex items-center gap-1"
                  >
                    <X className="w-4 h-4 text-rose-600" />
                    <span>{t.rejectBtn}</span>
                  </button>

                  <button
                    onClick={() => setCounterOfferId(counterOfferId === offer.id ? null : offer.id)}
                    className="farmer-tap-btn !min-h-[44px] px-4 py-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-700" />
                    <span>{t.counterBtn}</span>
                  </button>

                  <button
                    onClick={() => acceptOffer(offer.id)}
                    className="farmer-tap-btn !min-h-[44px] px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.acceptBtn}</span>
                  </button>
                </div>

                {/* Counter Offer Drawer */}
                {counterOfferId === offer.id && (
                  <div className="p-3 bg-white rounded-2xl border border-amber-300 shadow-sm flex items-center gap-3">
                    <span className="text-xs font-bold text-agri-ink">Enter your counter rate (₹/kg):</span>
                    <input
                      type="number"
                      step="0.5"
                      value={counterPriceInput}
                      onChange={(e) => setCounterPriceInput(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 bg-agri-sand border border-agri-border rounded-xl font-mono font-bold text-sm text-agri-ink focus:outline-none"
                    />
                    <button
                      onClick={() => handleSendCounter(offer.id)}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-agri-ink font-bold text-xs rounded-xl shadow-xs"
                    >
                      Submit Counter-Offer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Tracker Modal */}
      {activeTrackingOrder && (
        <OrderTrackerModal
          order={activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
        />
      )}

      {/* Digital Invoice Modal */}
      {selectedInvoiceOrder && (
        <DigitalInvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
