import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Role, 
  Language, 
  FarmerProfile, 
  Buyer, 
  DigitalLot, 
  Offer, 
  Order, 
  Grievance, 
  FarmerTab, 
  MandiMarket, 
  LogisticsVehicle, 
  StorageFacility, 
  FPOFarmerMember, 
  FormulaWeights, 
  DigitalInvoice,
  AdminChatThread,
  AdminChatMessage 
} from '../types';
import { 
  INITIAL_FARMER, 
  INITIAL_BUYERS, 
  INITIAL_LOTS, 
  INITIAL_OFFERS, 
  INITIAL_ORDERS, 
  INITIAL_GRIEVANCES, 
  MANDI_MARKETS, 
  LOGISTICS_VEHICLES, 
  STORAGE_FACILITIES, 
  FPO_MEMBERS,
  INITIAL_ADMIN_CHAT_THREADS 
} from '../data/mockData';
import { TRANSLATIONS, TranslationDictionary } from '../translations';
import { DEFAULT_WEIGHTS } from '../utils/profitEngine';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  
  // Navigation
  farmerTab: FarmerTab;
  setFarmerTab: (tab: FarmerTab) => void;
  isLandingPageOpen: boolean;
  setIsLandingPageOpen: (open: boolean) => void;
  
  // Data Collections
  farmer: FarmerProfile;
  setFarmer: React.Dispatch<React.SetStateAction<FarmerProfile>>;
  buyers: Buyer[];
  lots: DigitalLot[];
  mandis: MandiMarket[];
  offers: Offer[];
  orders: Order[];
  grievances: Grievance[];
  logisticsVehicles: LogisticsVehicle[];
  storageFacilities: StorageFacility[];
  fpoMembers: FPOFarmerMember[];
  
  // Active demo / selections
  selectedLotId: string;
  setSelectedLotId: (id: string) => void;
  activeInvoice: DigitalInvoice | null;
  setActiveInvoice: (inv: DigitalInvoice | null) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isSIHDemoOpen: boolean;
  setIsSIHDemoOpen: (open: boolean) => void;
  
  // Formula Weights for Judge Mode
  weights: FormulaWeights;
  setWeights: React.Dispatch<React.SetStateAction<FormulaWeights>>;
  resetWeights: () => void;
  
  // Actions
  addLot: (lot: DigitalLot) => void;
  approveBuyerKyc: (buyerId: string) => void;
  rejectBuyerKyc: (buyerId: string) => void;
  acceptOffer: (offerId: string) => void;
  rejectOffer: (offerId: string) => void;
  counterOffer: (offerId: string, counterPrice: number) => void;
  createBuyerOffer: (lotId: string, offeredPrice: number) => void;
  advanceOrderStep: (orderId: string) => void;
  addGrievance: (g: { order_id: string; lot_id: string; raised_by: 'Farmer' | 'Buyer' | 'FPO'; party_name: string; category: any; details: string }) => void;
  resolveGrievance: (grievanceId: string, notes?: string) => void;
  aggregateFPOLot: (memberIds: string[], expectedPrice: number) => void;
  bookLogistics: (vehicleId: string) => void;
  bookStorage: (facilityId: string, days: number) => void;
  
  // Admin Chat & Support Console
  adminChatThreads: AdminChatThread[];
  activeChatThreadId: string;
  setActiveChatThreadId: (id: string) => void;
  sendAdminChatMessage: (threadId: string, text: string) => void;
  markThreadRead: (threadId: string) => void;

  // Demos
  triggerTomatoDemo: () => void;
  triggerOnionDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('farmer');
  const [language, setLanguage] = useState<Language>('ta'); // Default to Tamil as requested in demo story, or user choice
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('home');
  const [isLandingPageOpen, setIsLandingPageOpen] = useState<boolean>(false);
  
  const [farmer, setFarmer] = useState<FarmerProfile>(INITIAL_FARMER);
  const [buyers, setBuyers] = useState<Buyer[]>(INITIAL_BUYERS);
  const [lots, setLots] = useState<DigitalLot[]>(INITIAL_LOTS);
  const [mandis] = useState<MandiMarket[]>(MANDI_MARKETS);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [grievances, setGrievances] = useState<Grievance[]>(INITIAL_GRIEVANCES);
  const [logisticsVehicles] = useState<LogisticsVehicle[]>(LOGISTICS_VEHICLES);
  const [storageFacilities] = useState<StorageFacility[]>(STORAGE_FACILITIES);
  const [fpoMembers, setFpoMembers] = useState<FPOFarmerMember[]>(FPO_MEMBERS);
  
  const [selectedLotId, setSelectedLotId] = useState<string>('LOT10025');
  const [activeInvoice, setActiveInvoice] = useState<DigitalInvoice | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isSIHDemoOpen, setIsSIHDemoOpen] = useState<boolean>(false);
  const [weights, setWeights] = useState<FormulaWeights>(DEFAULT_WEIGHTS);
  
  // Admin Live Chat State
  const [adminChatThreads, setAdminChatThreads] = useState<AdminChatThread[]>(INITIAL_ADMIN_CHAT_THREADS);
  const [activeChatThreadId, setActiveChatThreadId] = useState<string>('CHAT-01');

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const resetWeights = () => setWeights(DEFAULT_WEIGHTS);

  const addLot = (newLot: DigitalLot) => {
    setLots((prev) => [newLot, ...prev]);
    setSelectedLotId(newLot.lot_id);
    
    // Automatically generate realistic candidate buyer offers
    const bestBuyer = buyers.find((b) => b.trust_score >= 90) || buyers[0];
    const generatedOffer: Offer = {
      id: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
      lot_id: newLot.lot_id,
      crop: newLot.crop,
      quantity_kg: newLot.quantity_kg,
      buyer_id: bestBuyer.buyer_id,
      buyer_name: bestBuyer.buyer_name,
      buyer_type: bestBuyer.buyer_type,
      buyer_verified: true,
      buyer_rating: bestBuyer.rating || 4.9,
      trust_score: bestBuyer.trust_score,
      payment_terms: bestBuyer.payment_terms,
      offered_price_per_kg: Math.round(newLot.expected_price * 1.04 * 10) / 10,
      distance_km: 24,
      transport_cost: 600,
      net_profit_estimate: Math.round(newLot.expected_price * newLot.quantity_kg * 0.96),
      risk_level: 'Low',
      status: 'Pending',
      is_best_deal: true,
      created_at: new Date().toISOString().split('T')[0]
    };

    setOffers((prev) => [generatedOffer, ...prev]);
    setFarmerTab('home');
    
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // safe
    }
  };

  const approveBuyerKyc = (buyerId: string) => {
    setBuyers((prev) =>
      prev.map((b) => (b.buyer_id === buyerId ? { ...b, verified: 'Yes' } : b))
    );
  };

  const rejectBuyerKyc = (buyerId: string) => {
    setBuyers((prev) =>
      prev.map((b) => (b.buyer_id === buyerId ? { ...b, verified: 'Rejected' } : b))
    );
  };

  const acceptOffer = (offerId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return;

    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Accepted' } : o))
    );

    setLots((prev) =>
      prev.map((l) => (l.lot_id === offer.lot_id ? { ...l, status: 'Sold' } : l))
    );

    const invoiceId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ORD-${Math.floor(5000 + Math.random() * 5000)}`,
      lot_id: offer.lot_id,
      crop: offer.crop,
      quantity_kg: offer.quantity_kg,
      farmer_name: farmer.name,
      buyer_id: offer.buyer_id,
      buyer_name: offer.buyer_name,
      agreed_price_per_kg: offer.offered_price_per_kg,
      total_value: offer.offered_price_per_kg * offer.quantity_kg,
      current_step: 1, // Step 1: Offer Accepted
      created_at: new Date().toISOString().split('T')[0],
      estimated_delivery: 'In 2 days',
      status: 'In Transit',
      invoice_id: invoiceId,
      transporter_assigned: 'Tata Ace (Chinnasamy)',
      driver_contact: '+91 94431 88201',
      vehicle_number: 'TN 38 DE 1042'
    };

    setOrders((prev) => [newOrder, ...prev]);

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } catch {
      // safe
    }
  };

  const rejectOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Rejected' } : o))
    );
  };

  const counterOffer = (offerId: string, counterPrice: number) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? { ...o, status: 'Countered', counter_price: counterPrice }
          : o
      )
    );
  };

  const createBuyerOffer = (lotId: string, offeredPrice: number) => {
    const targetLot = lots.find((l) => l.lot_id === lotId);
    if (!targetLot) return;

    const newOffer: Offer = {
      id: `OFF-${Math.floor(2000 + Math.random() * 8000)}`,
      lot_id: lotId,
      crop: targetLot.crop,
      quantity_kg: targetLot.quantity_kg,
      buyer_id: 'B002',
      buyer_name: 'Sri Lakshmi Foods',
      buyer_type: 'Processor',
      buyer_verified: true,
      buyer_rating: 4.9,
      trust_score: 94,
      payment_terms: 'Within 48 hours',
      offered_price_per_kg: offeredPrice,
      distance_km: 24,
      transport_cost: 600,
      net_profit_estimate: Math.round(offeredPrice * targetLot.quantity_kg * 0.97),
      risk_level: 'Low',
      status: 'Pending',
      is_best_deal: offeredPrice >= targetLot.expected_price,
      created_at: new Date().toISOString().split('T')[0]
    };

    setOffers((prev) => [newOffer, ...prev]);
  };

  const advanceOrderStep = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const nextStep = Math.min(o.current_step + 1, 7);
          return {
            ...o,
            current_step: nextStep,
            status: nextStep === 7 ? 'Completed' : 'In Transit'
          };
        }
        return o;
      })
    );
  };

  const addGrievance = (g: {
    order_id: string;
    lot_id: string;
    raised_by: 'Farmer' | 'Buyer' | 'FPO';
    party_name: string;
    category: any;
    details: string;
  }) => {
    const newGrievance: Grievance = {
      id: `GRV${Math.floor(10000 + Math.random() * 90000)}`,
      order_id: g.order_id,
      lot_id: g.lot_id,
      raised_by: g.raised_by,
      party_name: g.party_name,
      category: g.category,
      details: g.details,
      status: 'Open',
      created_at: new Date().toISOString().split('T')[0]
    };
    setGrievances((prev) => [newGrievance, ...prev]);
  };

  const resolveGrievance = (id: string, notes?: string) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: 'Resolved', resolution_notes: notes || 'Dispute amicably arbitrated by admin.' }
          : g
      )
    );
  };

  const aggregateFPOLot = (memberIds: string[], expectedPrice: number) => {
    const selectedMembers = fpoMembers.filter((m) => memberIds.includes(m.id));
    const totalQty = selectedMembers.reduce((sum, m) => sum + m.available_qty_kg, 0);

    const fpoLot: DigitalLot = {
      lot_id: `FPO-${Math.floor(2000 + Math.random() * 8000)}`,
      farmer_fpo: 'Kongu Vellalar FPO Consortium',
      crop: 'Tomato (Aggregated Grade A)',
      crop_icon: '🍅',
      quantity_kg: totalQty,
      quantity_tons: totalQty / 1000,
      quality: 'Grade A',
      harvest_date: new Date().toISOString().split('T')[0],
      location: 'Coimbatore District Aggregation Center',
      expected_price: expectedPrice,
      available_from: 'Tomorrow',
      certification: 'GlobalGAP',
      images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'],
      status: 'Available',
      storage_available: true,
      is_fpo_aggregated: true,
      aggregated_farmers_count: selectedMembers.length,
      created_at: new Date().toISOString().split('T')[0]
    };

    setLots((prev) => [fpoLot, ...prev]);
    setSelectedLotId(fpoLot.lot_id);

    // Update members to mark pledged
    setFpoMembers((prev) =>
      prev.map((m) => (memberIds.includes(m.id) ? { ...m, pledged_qty_kg: m.available_qty_kg } : m))
    );

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // safe
    }
  };

  const bookLogistics = (vehicleId: string) => {
    const v = logisticsVehicles.find((veh) => veh.id === vehicleId);
    if (!v) return;
    alert(`🚚 Pickup vehicle confirmed: ${v.name} (${v.driver_name}, ${v.driver_phone}) scheduled.`);
  };

  const bookStorage = (facilityId: string, days: number) => {
    const s = storageFacilities.find((fac) => fac.id === facilityId);
    if (!s) return;
    alert(`🏪 Storage space reserved at ${s.name} for ${days} days at ₹${s.rate_per_kg_per_day}/kg/day.`);
  };

  const triggerTomatoDemo = () => {
    setSelectedLotId('LOT10025');
    setFarmerTab('home');
    setRole('farmer');
  };

  const triggerOnionDemo = () => {
    setSelectedLotId('LOT10009');
    setFarmerTab('home');
    setRole('farmer');
  };

  const markThreadRead = (threadId: string) => {
    setAdminChatThreads((prev) =>
      prev.map((th) => (th.id === threadId ? { ...th, unread_count: 0 } : th))
    );
  };

  const sendAdminChatMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: AdminChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      sender_name: 'State Market Nodal Admin',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAdminChatThreads((prev) =>
      prev.map((th) => {
        if (th.id !== threadId) return th;
        return {
          ...th,
          messages: [...th.messages, newMsg]
        };
      })
    );

    // Simulate an intelligent automated reply after 1.2s to demonstrate interactive messaging
    setTimeout(() => {
      setAdminChatThreads((prev) =>
        prev.map((th) => {
          if (th.id !== threadId) return th;
          let replyText = 'Received and acknowledged by field coordinator. Thank you.';
          let senderName = th.party_name;
          let senderRole: AdminChatMessage['sender'] = 'farmer';

          if (th.party_role === 'Farmer') {
            senderRole = 'farmer';
            replyText = 'சரிங்க அட்மின் ஐயா! தகவல் புரிந்தது. உடனே ஏற்பாடு செய்கிறேன். மிக்க நன்றி!';
          } else if (th.party_role === 'Buyer') {
            senderRole = 'buyer';
            replyText = 'Thank you for the verification update. Trade confirmation receipt processed.';
          } else if (th.party_role === 'Transporter') {
            senderRole = 'transporter';
            replyText = 'Understood Admin. GPS waypoint confirmed. Driver en route.';
          } else if (th.party_role === 'FPO') {
            senderRole = 'fpo';
            replyText = 'FPO வாரியத்திடம் இந்த விவரத்தை பகிர்ந்து உடனே ஒப்புதல் அளிக்கிறோம்.';
          }

          const autoReply: AdminChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: senderRole,
            sender_name: senderName,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          return {
            ...th,
            messages: [...th.messages, autoReply]
          };
        })
      );
    }, 1200);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        farmerTab,
        setFarmerTab,
        isLandingPageOpen,
        setIsLandingPageOpen,
        farmer,
        setFarmer,
        buyers,
        lots,
        mandis,
        offers,
        orders,
        grievances,
        logisticsVehicles,
        storageFacilities,
        fpoMembers,
        selectedLotId,
        setSelectedLotId,
        activeInvoice,
        setActiveInvoice,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isSIHDemoOpen,
        setIsSIHDemoOpen,
        weights,
        setWeights,
        resetWeights,
        addLot,
        approveBuyerKyc,
        rejectBuyerKyc,
        acceptOffer,
        rejectOffer,
        counterOffer,
        createBuyerOffer,
        advanceOrderStep,
        addGrievance,
        resolveGrievance,
        aggregateFPOLot,
        bookLogistics,
        bookStorage,
        adminChatThreads,
        activeChatThreadId,
        setActiveChatThreadId,
        sendAdminChatMessage,
        markThreadRead,
        triggerTomatoDemo,
        triggerOnionDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
