import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminChatConsole } from './AdminChatConsole';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Check, 
  X,
  MessageSquare,
  ClipboardList,
  Scale
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    farmer, 
    buyers, 
    lots, 
    grievances, 
    approveBuyerKyc, 
    rejectBuyerKyc, 
    resolveGrievance,
    adminChatThreads
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'chat' | 'grievances'>('overview');
  const [grievanceFilter, setGrievanceFilter] = useState<string>('all');
  const [buyerKycFilter, setBuyerKycFilter] = useState<string>('all');

  const verifiedFarmersCount = farmer.status === 'Verified' ? 142 : 141;
  const verifiedBuyersCount = buyers.filter((b) => b.verified === 'Yes').length;
  const activeLotsCount = lots.filter((l) => l.status === 'Available').length;
  const avgProfitLiftPct = '+13.8%';

  const totalUnreadChatCount = adminChatThreads.reduce((acc, th) => acc + th.unread_count, 0);

  const filteredBuyers = buyers.filter((b) => {
    if (buyerKycFilter === 'all') return true;
    return b.verified.toLowerCase() === buyerKycFilter.toLowerCase();
  });

  const filteredGrievances = grievances.filter((g) => {
    if (grievanceFilter === 'all') return true;
    return g.category.toLowerCase().includes(grievanceFilter.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 pb-20">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-primary to-emerald-950 text-white flex items-center justify-center text-2xl shadow-sm border border-white/20 shrink-0">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-black text-xl sm:text-2xl text-agri-ink">
                AGRISETU State Agricultural Administration
              </h1>
              <span className="text-xs bg-agri-primaryLight text-agri-primary font-bold px-2.5 py-0.5 rounded-full border border-agri-primary/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Nodal Active
              </span>
            </div>
            <p className="text-xs text-agri-muted font-medium mt-0.5">
              Live market intelligence monitoring, multi-party dispute resolution, and buyer KYC accreditation
            </p>
          </div>
        </div>

        {/* Quick Chat Shortcut Badge */}
        <button
          onClick={() => setActiveAdminTab('chat')}
          className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs shrink-0 self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>Live Support Desk</span>
          {totalUnreadChatCount > 0 && (
            <span className="px-2 py-0.5 bg-rose-600 text-white rounded-full text-[10px] font-black animate-pulse">
              {totalUnreadChatCount} new
            </span>
          )}
        </button>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 border-b border-agri-border pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeAdminTab === 'overview'
              ? 'bg-agri-primary text-white shadow-soft'
              : 'bg-white text-agri-muted hover:text-agri-ink border border-agri-border'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Registry & KYC Approvals</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('chat')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap relative ${
            activeAdminTab === 'chat'
              ? 'bg-agri-primary text-white shadow-soft'
              : 'bg-white text-agri-muted hover:text-agri-ink border border-agri-border'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Support & Dispute Chat</span>
          {totalUnreadChatCount > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeAdminTab === 'chat'
                ? 'bg-amber-400 text-agri-ink'
                : 'bg-rose-600 text-white animate-pulse'
            }`}>
              {totalUnreadChatCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('grievances')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeAdminTab === 'grievances'
              ? 'bg-agri-primary text-white shadow-soft'
              : 'bg-white text-agri-muted hover:text-agri-ink border border-agri-border'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Dispute Redressal ({grievances.length})</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: OVERVIEW & KYC */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Verified Farmers */}
            <div className="agri-card border-l-6 border-l-agri-primary p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-agri-muted">Verified Farmers</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="font-headline text-3xl font-extrabold text-agri-ink mt-2">
                {verifiedFarmersCount}
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 98% 7/12 land record cleared
              </span>
            </div>

            {/* KPI 2: Verified Buyers */}
            <div className="agri-card border-l-6 border-l-agri-accent p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-agri-muted">Verified Buyers</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <p className="font-headline text-3xl font-extrabold text-agri-ink mt-2">
                {verifiedBuyersCount}
              </p>
              <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 mt-1">
                1 Pending accreditation review
              </span>
            </div>

            {/* KPI 3: Active Digital Lots */}
            <div className="agri-card border-l-6 border-l-blue-600 p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-agri-muted">Active Lots</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-sm font-bold">
                  📦
                </div>
              </div>
              <p className="font-headline text-3xl font-extrabold text-agri-ink mt-2">
                {activeLotsCount}
              </p>
              <span className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-1">
                Tomato, Onion, Chilli & Banana
              </span>
            </div>

            {/* KPI 4: Avg Net Profit Lift */}
            <div className="agri-card border-l-6 border-l-emerald-600 p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-agri-muted">Avg Net Profit Lift</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="font-headline text-3xl font-extrabold text-emerald-700 mt-2">
                {avgProfitLiftPct}
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                Driven by AI Smart Net-Profit Engine
              </span>
            </div>
          </div>

          {/* Buyer KYC Approval Queue */}
          <div className="bg-white rounded-3xl border border-agri-border shadow-soft overflow-hidden">
            <div className="p-4 border-b border-agri-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-headline font-bold text-lg text-agri-ink">
                  Buyer KYC Approval Queue
                </h3>
                <p className="text-xs text-agri-muted">
                  Approve or reject institutional buyers, traders, and food processors
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={buyerKycFilter}
                  onChange={(e) => setBuyerKycFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-agri-sand border border-agri-border rounded-xl text-agri-ink focus:outline-none font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending Only</option>
                  <option value="yes">Verified Only</option>
                  <option value="rejected">Rejected Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-agri-ink">
                <thead className="bg-agri-sand/60 text-agri-muted font-bold uppercase tracking-wider border-b border-agri-border">
                  <tr>
                    <th className="p-3">Buyer ID</th>
                    <th className="p-3">Buyer Name</th>
                    <th className="p-3">Buyer Type</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Verified Status</th>
                    <th className="p-3 text-right">KYC Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-agri-border">
                  {filteredBuyers.map((b) => (
                    <tr key={b.buyer_id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-agri-primary">
                        {b.buyer_id}
                      </td>
                      <td className="p-3 font-semibold text-agri-ink">
                        {b.buyer_name}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                          {b.buyer_type}
                        </span>
                      </td>
                      <td className="p-3 text-agri-muted">
                        {b.location}
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          b.verified === 'Yes'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : b.verified === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}>
                          {b.verified === 'Yes' && '✅ Verified'}
                          {b.verified === 'Pending' && '⏳ Pending Review'}
                          {b.verified === 'Rejected' && '❌ Rejected'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {b.verified === 'Pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => approveBuyerKyc(b.buyer_id)}
                              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                              title="Approve KYC"
                            >
                              <Check className="w-3.5 h-3.5" /> Approve ✅
                            </button>
                            <button
                              onClick={() => rejectBuyerKyc(b.buyer_id)}
                              className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                              title="Reject KYC"
                            >
                              <X className="w-3.5 h-3.5" /> Reject ❌
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => approveBuyerKyc(b.buyer_id)}
                            className="text-[11px] text-agri-muted hover:text-agri-ink underline"
                          >
                            Reset Status
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Farmer KYC Verification Table */}
          <div className="bg-white rounded-3xl border border-agri-border shadow-soft overflow-hidden">
            <div className="p-4 border-b border-agri-border flex items-center justify-between">
              <div>
                <h3 className="font-headline font-bold text-lg text-agri-ink">
                  Farmer KYC Records (Land & Identity)
                </h3>
                <p className="text-xs text-agri-muted">
                  Authenticated land titles (7/12 & Chitta Adangal) and Aadhaar contact verification
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-agri-ink">
                <thead className="bg-agri-sand/60 text-agri-muted font-bold uppercase tracking-wider border-b border-agri-border">
                  <tr>
                    <th className="p-3">Farmer ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Village / Taluka</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Land (Acres)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-agri-border">
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-agri-primary">{farmer.id}</td>
                    <td className="p-3 font-bold">{farmer.name}</td>
                    <td className="p-3 font-mono">{farmer.phone}</td>
                    <td className="p-3">{farmer.village}</td>
                    <td className="p-3">{farmer.district}</td>
                    <td className="p-3 font-bold">{farmer.land_acres} Acres</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        farmer.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {farmer.status === 'Verified' ? '✅ Verified' : '⏳ Pending'}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-agri-primary">FARM-8820</td>
                    <td className="p-3 font-bold">விவசாயி முருகேசன் (Murugesan)</td>
                    <td className="p-3 font-mono">+91 94432 77011</td>
                    <td className="p-3">PN Palayam</td>
                    <td className="p-3">Coimbatore</td>
                    <td className="p-3 font-bold">5.2 Acres</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        ✅ Verified
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-agri-primary">FARM-7701</td>
                    <td className="p-3 font-bold">Kongu Vellalar FPO (350 Farmers)</td>
                    <td className="p-3 font-mono">+91 98421 99018</td>
                    <td className="p-3">Pollachi</td>
                    <td className="p-3">Coimbatore</td>
                    <td className="p-3 font-bold">480 Acres</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        ✅ Verified
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE ADMIN CHAT & DISPUTE DESK */}
      {activeAdminTab === 'chat' && (
        <AdminChatConsole />
      )}

      {/* TAB 3: GRIEVANCES & DISPUTES */}
      {activeAdminTab === 'grievances' && (
        <div className="bg-white rounded-3xl border border-agri-border shadow-soft overflow-hidden">
          <div className="p-4 border-b border-agri-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-headline font-bold text-lg text-agri-ink">
                Grievance & Dispute Resolution Queue
              </h3>
              <p className="text-xs text-agri-muted">
                Categories: Payment Delayed • Quantity Mismatch • Quality Dispute • Late Transport
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={grievanceFilter}
                onChange={(e) => setGrievanceFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-agri-sand border border-agri-border rounded-xl text-agri-ink focus:outline-none font-semibold"
              >
                <option value="all">All Categories</option>
                <option value="payment">Payment Delayed</option>
                <option value="quantity">Quantity Mismatch</option>
                <option value="quality">Quality Dispute</option>
                <option value="transport">Late Transport</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-agri-ink">
              <thead className="bg-agri-sand/60 text-agri-muted font-bold uppercase tracking-wider border-b border-agri-border">
                <tr>
                  <th className="p-3">Dispute ID</th>
                  <th className="p-3">Order / Lot ID</th>
                  <th className="p-3">Raised By</th>
                  <th className="p-3">Dispute Category</th>
                  <th className="p-3">Issue Description</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-agri-border">
                {filteredGrievances.map((g) => (
                  <tr key={g.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-agri-red">
                      {g.id}
                    </td>
                    <td className="p-3 font-mono text-agri-muted">
                      {g.order_id} ({g.lot_id})
                    </td>
                    <td className="p-3 font-semibold">
                      {g.party_name} ({g.raised_by})
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-200">
                        {g.category}
                      </span>
                    </td>
                    <td className="p-3 text-agri-ink max-w-xs">
                      {g.details}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        g.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : g.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {g.status !== 'Resolved' ? (
                        <button
                          onClick={() => resolveGrievance(g.id)}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          Mark Resolved ✅
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
