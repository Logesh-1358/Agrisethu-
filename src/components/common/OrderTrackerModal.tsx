import React, { useState } from 'react';
import { Order, GrievanceCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Truck, 
  CreditCard, 
  CheckSquare, 
  Package, 
  DollarSign, 
  Send,
  AlertTriangle
} from 'lucide-react';

interface OrderTrackerModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ order, onClose }) => {
  const { advanceOrderStep, addGrievance, farmer, role } = useApp();
  const [showComplaintForm, setShowComplaintForm] = useState<boolean>(false);
  const [category, setCategory] = useState<GrievanceCategory>('Payment Delayed');
  const [complaintDetails, setComplaintDetails] = useState<string>('');
  const [submittedComplaint, setSubmittedComplaint] = useState<boolean>(false);

  const steps = [
    { num: 1, title: 'Offer Accepted', title_mr: 'ऑफर मंजूर केली', icon: '🤝' },
    { num: 2, title: 'Confirmed', title_mr: 'सौदा पक्का झाला', icon: '📋' },
    { num: 3, title: 'Advance Paid', title_mr: 'अ‍ॅडव्हान्स जमा झाला', icon: '💳' },
    { num: 4, title: 'Pickup Scheduled', title_mr: 'गाडी लोड झाली', icon: '🚚' },
    { num: 5, title: 'Quality Check', title_mr: 'गुणवत्ता तपासणी', icon: '🔍' },
    { num: 6, title: 'Delivered to Buyer', title_mr: 'माल पोहोचला', icon: '📦' },
    { num: 7, title: 'Final Payment', title_mr: 'अंतिम खात्यात जमा', icon: '💰' }
  ];

  const handleRaiseComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDetails.trim()) return;

    addGrievance({
      order_id: order.id,
      lot_id: order.lot_id,
      raised_by: role === 'farmer' ? 'Farmer' : 'Buyer',
      party_name: role === 'farmer' ? farmer.name : order.buyer_name,
      category: category,
      details: complaintDetails
    });

    setSubmittedComplaint(true);
    setTimeout(() => {
      setShowComplaintForm(false);
      setSubmittedComplaint(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-agri-border shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-agri-sand via-white to-agri-sand border-b border-agri-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agri-primary text-white flex items-center justify-center text-xl shadow-xs">
              🚚
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-agri-ink">
                ऑर्डर ट्रॅकर #{order.id}
              </h3>
              <p className="text-xs text-agri-muted">
                {order.crop} ({order.quantity_kg} kg) • {order.buyer_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Order Summary Pill */}
          <div className="bg-agri-primaryLight/70 border border-agri-primary/30 p-3.5 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-agri-muted">एकूण किंमत (Value):</span>
              <p className="font-headline font-extrabold text-lg text-agri-primary">
                ₹{order.total_value.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-agri-muted">अपेक्षित डिलिव्हरी:</span>
              <p className="font-bold text-agri-ink">{order.estimated_delivery}</p>
            </div>
          </div>

          {/* 7-Step Stepper Timeline */}
          <div>
            <h4 className="text-xs font-bold text-agri-muted uppercase tracking-wider mb-4">
              ऑर्डर प्रवासाचे टप्पे (7-Step Lifecycle)
            </h4>

            <div className="space-y-3">
              {steps.map((s) => {
                const isPassed = s.num < order.current_step;
                const isCurrent = s.num === order.current_step;
                const isPending = s.num > order.current_step;

                return (
                  <div
                    key={s.num}
                    className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : isPassed
                        ? 'bg-white border-agri-border opacity-90'
                        : 'bg-stone-50 border-stone-200 opacity-50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold shadow-xs ${
                        isPassed
                          ? 'bg-agri-primary text-white'
                          : isCurrent
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline font-bold text-sm text-agri-ink">
                          {s.num}. {s.title_mr}
                        </span>
                        {isCurrent && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            सध्याचा टप्पा
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[11px] font-semibold text-agri-primary">
                            पूर्ण झाले ✅
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-agri-muted">{s.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advance Step Action Button (Simulate workflow progress) */}
          {order.current_step < 7 && (
            <button
              onClick={() => advanceOrderStep(order.id)}
              className="farmer-tap-btn !min-h-[48px] w-full bg-agri-sand hover:bg-agri-border border border-agri-border text-agri-ink text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <span>पुढील टप्पा अपडेट करा (Advance to Step {order.current_step + 1})</span>
            </button>
          )}

          {/* Grievance / Raise Complaint Button */}
          {!showComplaintForm ? (
            <div className="pt-2 border-t border-dashed border-agri-border">
              <button
                onClick={() => setShowComplaintForm(true)}
                className="farmer-tap-btn !min-h-[48px] w-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>तक्रार नोंदवा (Raise Complaint)</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleRaiseComplaint} className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> तक्रार विषय निवडा
                </span>
                <button
                  type="button"
                  onClick={() => setShowComplaintForm(false)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  रद्द करा
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['Payment Delayed', 'Quantity Mismatch', 'Quality Dispute', 'Late Transport'] as GrievanceCategory[]).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`p-2 rounded-xl text-[11px] font-bold border text-left transition-all ${
                      category === cat
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  तक्रारीचे तपशील (Details):
                </label>
                <textarea
                  rows={3}
                  value={complaintDetails}
                  onChange={(e) => setComplaintDetails(e.target.value)}
                  placeholder="उदा. पैसे जमा होण्यास उशीर झाला किंवा मालाचे वजन कमी दाखवले..."
                  className="w-full p-2.5 bg-white border border-rose-200 rounded-xl text-xs text-agri-ink focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittedComplaint}
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                {submittedComplaint ? (
                  <span>तक्रार नोंदवली! Admin तपासत आहे...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>तक्रार Admin कडे पाठवा</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
