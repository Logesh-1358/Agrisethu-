import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { X, Printer, Download, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

interface DigitalInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({ order, onClose }) => {
  const { farmer } = useApp();

  const invoiceNumber = order.invoice_id || `INV-2026-${order.id.replace('ORD-', '')}`;
  const totalAmount = order.total_value;
  const advanceAmount = Math.round(totalAmount * 0.3); // 30% advance escrow
  const transportDeduction = 600;
  const balanceDue = totalAmount - advanceAmount - transportDeduction;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-agri-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-4 bg-agri-ink text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧾</span>
            <div>
              <h3 className="font-headline font-bold text-base text-white">
                AGRISETU Direct Procurement Invoice
              </h3>
              <p className="text-[11px] text-gray-300">
                Verified e-Invoice #{invoiceNumber} • Escrow Guaranteed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-agri-ink bg-white font-sans text-xs">
          {/* Top Brand & Status */}
          <div className="flex justify-between items-start border-b border-agri-border pb-4">
            <div>
              <div className="flex items-center gap-1.5 font-headline font-extrabold text-lg text-agri-primary">
                <span>🌾 + 🔗 AGRISETU</span>
              </div>
              <p className="text-[11px] text-agri-muted">
                National Direct Farmer-Buyer Linkage Protocol
              </p>
              <p className="text-[10px] text-agri-muted mt-1">
                CIN: U01100TN2026PTC109281 • GSTIN: 33AAACG0921P1Z5
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3 h-3" /> VERIFIED TRANSACTION
              </span>
              <p className="font-mono text-xs font-bold text-agri-ink">
                Date: {order.created_at}
              </p>
              <p className="text-[10px] text-agri-muted font-mono">
                Order Ref: {order.id}
              </p>
            </div>
          </div>

          {/* Parties: Farmer & Buyer */}
          <div className="grid grid-cols-2 gap-4 bg-[#FAF7EF] p-4 rounded-2xl border border-agri-border">
            <div>
              <span className="text-[10px] font-bold text-agri-muted uppercase tracking-wider">
                Seller (Farmer / FPO):
              </span>
              <p className="font-bold text-sm text-agri-ink mt-0.5">{order.farmer_name}</p>
              <p className="text-agri-muted">{farmer.village}, {farmer.district}</p>
              <p className="text-agri-muted">Mobile: {farmer.phone}</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">✓ 7/12 Land Record Verified</p>
            </div>

            <div className="border-l border-agri-border pl-4">
              <span className="text-[10px] font-bold text-agri-muted uppercase tracking-wider">
                Buyer (Institutional Purchaser):
              </span>
              <p className="font-bold text-sm text-agri-ink mt-0.5">{order.buyer_name}</p>
              <p className="text-agri-muted">Pollachi Highway, Coimbatore</p>
              <p className="text-agri-muted">Buyer ID: {order.buyer_id} (Verified)</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">✓ Escrow Balance Deposited</p>
            </div>
          </div>

          {/* Produce Details Table */}
          <table className="w-full text-left border-collapse border border-agri-border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-stone-100 text-stone-700 text-[11px] font-bold">
                <th className="p-2.5 border border-agri-border">Item / Crop</th>
                <th className="p-2.5 border border-agri-border">Quality Grade</th>
                <th className="p-2.5 border border-agri-border text-right">Quantity</th>
                <th className="p-2.5 border border-agri-border text-right">Rate / kg</th>
                <th className="p-2.5 border border-agri-border text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2.5 border border-agri-border font-bold">
                  {order.crop}
                </td>
                <td className="p-2.5 border border-agri-border">
                  Grade A (Certified)
                </td>
                <td className="p-2.5 border border-agri-border text-right font-mono font-bold">
                  {order.quantity_kg.toLocaleString('en-IN')} kg
                </td>
                <td className="p-2.5 border border-agri-border text-right font-mono font-bold">
                  ₹{order.agreed_price_per_kg}
                </td>
                <td className="p-2.5 border border-agri-border text-right font-mono font-bold text-agri-primary">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment Breakdown & Escrow Settlement */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 border-t border-agri-border pt-4">
            {/* QR Code and verification seal */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-agri-border">
              <div className="w-16 h-16 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-center text-stone-600">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="space-y-0.5 text-[10px]">
                <p className="font-bold text-agri-ink">Scan to Verify Transaction</p>
                <p className="text-agri-muted">UPI / Escrow Ref: AGRI-TXN-882194</p>
                <p className="text-emerald-700 font-semibold">✓ Smart Contract Signed</p>
              </div>
            </div>

            {/* Calculations summary */}
            <div className="w-full sm:w-64 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-agri-muted">
                <span>Gross Produce Value:</span>
                <span className="font-bold text-agri-ink">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Advance Paid (30% Escrow):</span>
                <span className="font-bold">₹{advanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Direct Transport Deduction:</span>
                <span className="font-bold">-₹{transportDeduction.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-agri-muted">
                <span>APMC / Platform Commission:</span>
                <span className="font-bold text-emerald-700">₹0 (0% Free Direct)</span>
              </div>
              <div className="border-t border-dashed border-agri-border pt-1.5 flex justify-between text-sm font-extrabold text-agri-primary">
                <span>Final Settlement Balance:</span>
                <span>₹{balanceDue.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-right text-agri-muted">
                Due upon delivery verification
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-agri-sand/60 border-t border-agri-border flex items-center justify-between">
          <span className="text-[11px] text-agri-muted flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Legally valid digital receipt under IT Act 2000
          </span>

          <button
            onClick={handlePrint}
            className="farmer-tap-btn !min-h-[44px] px-5 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download e-Invoice / Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
