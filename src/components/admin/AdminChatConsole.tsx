import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Search, 
  ShieldCheck, 
  Clock, 
  FileText, 
  PhoneCall, 
  Paperclip, 
  CheckCheck, 
  Sparkles, 
  Filter,
  ArrowUpRight,
  HelpCircle,
  Truck,
  Building2,
  Users
} from 'lucide-react';
import { AdminChatThread } from '../../types';

export const AdminChatConsole: React.FC = () => {
  const { 
    adminChatThreads, 
    activeChatThreadId, 
    setActiveChatThreadId, 
    sendAdminChatMessage, 
    markThreadRead 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Farmer' | 'Buyer' | 'FPO' | 'Transporter'>('All');
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = adminChatThreads.find((th) => th.id === activeChatThreadId) || adminChatThreads[0];

  useEffect(() => {
    if (activeThread && activeThread.unread_count > 0) {
      markThreadRead(activeThread.id);
    }
  }, [activeChatThreadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const filteredThreads = adminChatThreads.filter((th) => {
    const matchesRole = roleFilter === 'All' || th.party_role === roleFilter;
    const matchesSearch = 
      th.party_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      th.party_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (th.linked_ref && th.linked_ref.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendAdminChatMessage(activeThread.id, inputText);
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    if (!activeThread) return;
    sendAdminChatMessage(activeThread.id, text);
  };

  return (
    <div className="bg-white rounded-3xl border border-agri-border shadow-soft overflow-hidden flex flex-col md:flex-row h-[720px]">
      {/* LEFT SIDEBAR: THREADS LIST */}
      <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-agri-border flex flex-col bg-stone-50/50 shrink-0">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-agri-border space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <div>
                <h3 className="font-headline font-black text-base text-agri-ink">
                  Support & Dispute Desk
                </h3>
                <span className="text-[11px] text-agri-muted font-medium">
                  {adminChatThreads.length} active multi-party channels
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Online
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-agri-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, lot or order ref..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 border border-stone-200 rounded-xl text-agri-ink placeholder-agri-muted focus:outline-none focus:ring-2 focus:ring-agri-primary/20 focus:border-agri-primary"
            />
          </div>

          {/* Role Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {(['All', 'Farmer', 'Buyer', 'FPO', 'Transporter'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                  roleFilter === role
                    ? 'bg-agri-primary text-white shadow-xs'
                    : 'bg-white text-agri-muted hover:bg-stone-200/70 border border-stone-200'
                }`}
              >
                {role === 'All' ? 'All Chats' : role}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-agri-border/60">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThread?.id;
            const lastMsg = thread.messages[thread.messages.length - 1];

            return (
              <button
                key={thread.id}
                onClick={() => setActiveChatThreadId(thread.id)}
                className={`w-full p-3.5 text-left transition-all flex items-start gap-3 relative ${
                  isSelected
                    ? 'bg-emerald-50/70 border-l-4 border-l-agri-primary shadow-xs'
                    : 'hover:bg-stone-100/60'
                }`}
              >
                {/* Avatar with status indicator */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-xl">
                    {thread.avatar}
                  </div>
                  {thread.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-headline font-bold text-xs text-agri-ink truncate">
                      {thread.party_name}
                    </h4>
                    <span className="text-[10px] text-agri-muted shrink-0">
                      {lastMsg ? lastMsg.timestamp : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      thread.party_role === 'Farmer'
                        ? 'bg-emerald-100 text-emerald-800'
                        : thread.party_role === 'Buyer'
                        ? 'bg-blue-100 text-blue-800'
                        : thread.party_role === 'FPO'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {thread.party_role}
                    </span>
                    {thread.linked_ref && (
                      <span className="text-[10px] text-stone-500 font-mono truncate">
                        #{thread.linked_ref}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-agri-muted truncate">
                    {lastMsg ? lastMsg.text : 'No messages yet'}
                  </p>
                </div>

                {thread.unread_count > 0 && !isSelected && (
                  <span className="w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ml-1 shadow-xs animate-pulse">
                    {thread.unread_count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT MAIN CHAT AREA */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-stone-50/30">
          {/* Active Chat Header */}
          <div className="p-4 bg-white border-b border-agri-border flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-2xl shadow-xs">
                {activeThread.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-black text-base text-agri-ink">
                    {activeThread.party_name}
                  </h3>
                  {activeThread.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      <ShieldCheck className="w-3 h-3" /> Verified {activeThread.party_role}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-agri-muted font-medium mt-0.5">
                  <span>📍 {activeThread.party_location}</span>
                  {activeThread.linked_ref && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-agri-primary font-bold">
                        Linked: {activeThread.linked_ref}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`📞 Dialing verified contact for ${activeThread.party_name}: +91 98421 51029 via State Toll-Free Gateway`)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-agri-ink rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-agri-primary" />
                <span className="hidden sm:inline">Call Gateway</span>
              </button>
              <button
                onClick={() => alert(`📑 Linked Dossier: Case #GRV10021 / Lot ${activeThread.linked_ref || 'LOT10025'} verified on Tamil Nadu Agrinet e-Pramaan database.`)}
                className="px-3 py-1.5 bg-agri-primaryLight hover:bg-emerald-100 text-agri-primary rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-agri-primary/20"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Dossier</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            <div className="text-center my-2">
              <span className="text-[10px] bg-stone-200/80 text-stone-600 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🛡️ End-to-End Logged Official State Mediation Channel
              </span>
            </div>

            {activeThread.messages.map((msg) => {
              const isAdmin = msg.sender === 'admin';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-bold text-agri-muted">
                      {isAdmin ? '🏛️ State Nodal Admin' : msg.sender_name}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      • {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                      isAdmin
                        ? 'bg-gradient-to-r from-agri-primary to-emerald-800 text-white rounded-br-none border border-emerald-600/30'
                        : 'bg-white text-agri-ink rounded-bl-none border border-stone-200 shadow-soft'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">
                      {msg.text}
                    </p>
                  </div>

                  {isAdmin && (
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1 pr-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Delivered & Digitally Signed
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pre-canned Responses */}
          <div className="p-3 bg-white/90 border-t border-agri-border flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-agri-muted uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Replies:
            </span>
            <button
              onClick={() => handleQuickReply('✅ Escrow Release Approved: ₹21,400 balance released to farmer bank account via instantaneous NEFT.')}
              className="text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
            >
              ✅ Approve Escrow Release
            </button>
            <button
              onClick={() => handleQuickReply('📄 Digital Invoice #INV-2026-9901 authenticated. Goods Receipt Note (GRN) confirmed.')}
              className="text-[11px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
            >
              📄 Issue Digital Invoice
            </button>
            <button
              onClick={() => handleQuickReply('🚚 Transporter Van TN-38-BZ-4412 telemetry locked. ETA to delivery point is 45 minutes.')}
              className="text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
            >
              🚚 Confirm GPS Waybill
            </button>
            <button
              onClick={() => handleQuickReply('🏪 AGRISETU Advisory: Apply 60/40 Split Sale strategy to hedge against spot volatility.')}
              className="text-[11px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 px-2.5 py-1 rounded-lg shrink-0 transition-colors"
            >
              🌾 Send Split Sale Advisory
            </button>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 bg-white border-t border-agri-border flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => alert('📎 Document upload: Attach digital inspection certificate or weighbridge slip (PDF/JPG)')}
              className="p-2 text-agri-muted hover:text-agri-ink hover:bg-stone-100 rounded-xl transition-colors shrink-0"
              title="Attach document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Reply to ${activeThread.party_name} as State Nodal Admin...`}
              className="flex-1 px-4 py-2.5 text-xs bg-stone-100 border border-stone-200 rounded-xl text-agri-ink placeholder-agri-muted focus:outline-none focus:ring-2 focus:ring-agri-primary/20 focus:border-agri-primary font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-agri-primary hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-agri-muted">
          Select a chat thread from the left to start communication
        </div>
      )}
    </div>
  );
};
