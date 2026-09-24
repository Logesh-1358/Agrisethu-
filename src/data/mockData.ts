import { 
  Buyer, 
  DigitalLot, 
  FarmerProfile, 
  FPOFarmerMember, 
  Grievance, 
  LogisticsVehicle, 
  MandiMarket, 
  Offer, 
  Order, 
  StorageFacility,
  AdminChatThread 
} from '../types';
import { RawCandidateOption } from '../utils/profitEngine';

export const INITIAL_FARMER: FarmerProfile = {
  id: 'FARM-9021',
  name: 'ராமேஷ்வர் (Rameshwar)',
  phone: '+91 98421 51029',
  village: 'காரமடை (Karamadai)',
  district: 'கோவை (Coimbatore)',
  state: 'Tamil Nadu',
  land_acres: 4.5,
  status: 'Verified',
  kisanCreditScore: 785,
  cropSpeciality: ['Tomato (தக்காளி)', 'Onion (வெங்காயம்)', 'Chilli (பச்சை மிளகாய்)']
};

/**
 * 10+ MANDIS / MARKETS (Pure Market Intelligence Sources)
 * Distinct from commercial buyers!
 */
export const MANDI_MARKETS: MandiMarket[] = [
  {
    id: 'M-COIMBATORE',
    market_name: 'Coimbatore APMC Mandi (கோவை சந்தை)',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    distance_km: 14,
    crop: 'Tomato (தக்காளி)',
    arrival_tonnes: 85,
    min_price: 22,
    max_price: 26,
    modal_price: 24,
    commission_pct: 4.0,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [24, 25.5, 27],
    last_updated: 'Today, 06:30 AM'
  },
  {
    id: 'M-POLLACHI',
    market_name: 'Pollachi Regulated Market (பொள்ளாச்சி)',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    distance_km: 42,
    crop: 'Tomato (தக்காளி)',
    arrival_tonnes: 42,
    min_price: 24,
    max_price: 28,
    modal_price: 26,
    commission_pct: 3.5,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [26, 27, 28],
    last_updated: 'Today, 07:15 AM'
  },
  {
    id: 'M-ERODE',
    market_name: 'Erode Agricultural Produce Market (ஈரோடு)',
    district: 'Erode',
    state: 'Tamil Nadu',
    distance_km: 68,
    crop: 'Tomato (தக்காளி)',
    arrival_tonnes: 63,
    min_price: 23,
    max_price: 27,
    modal_price: 25,
    commission_pct: 4.0,
    trend: 'STABLE',
    demand_index: 'Moderate',
    forecast_3day: [25, 25.2, 25.0],
    last_updated: 'Today, 06:45 AM'
  },
  {
    id: 'M-SALEM',
    market_name: 'Salem Central APMC Yard (சேலம்)',
    district: 'Salem',
    state: 'Tamil Nadu',
    distance_km: 115,
    crop: 'Tomato (தக்காளி)',
    arrival_tonnes: 94,
    min_price: 21,
    max_price: 25,
    modal_price: 23.5,
    commission_pct: 4.5,
    trend: 'DOWN',
    demand_index: 'Moderate',
    forecast_3day: [23.5, 22.8, 22.0],
    last_updated: 'Today, 08:00 AM'
  },
  {
    id: 'M-TIRUPPUR',
    market_name: 'Tiruppur Wholesale Yard (திருப்பூர்)',
    district: 'Tiruppur',
    state: 'Tamil Nadu',
    distance_km: 48,
    crop: 'Tomato (தக்காளி)',
    arrival_tonnes: 52,
    min_price: 23,
    max_price: 26.5,
    modal_price: 24.8,
    commission_pct: 3.5,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [24.8, 26.0, 27.2],
    last_updated: 'Today, 07:00 AM'
  },
  {
    id: 'M-NASHIK',
    market_name: 'Nashik APMC Mandi (नाशिक मंडी)',
    district: 'Nashik',
    state: 'Maharashtra',
    distance_km: 8,
    crop: 'Onion (कांदा)',
    arrival_tonnes: 145,
    min_price: 12,
    max_price: 15.5,
    modal_price: 14,
    commission_pct: 5.0,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [14, 15, 16.2],
    last_updated: 'Today, 06:00 AM'
  },
  {
    id: 'M-PIMPALGAON',
    market_name: 'Pimpalgaon Baswant Market (पिंपळगाव)',
    district: 'Nashik',
    state: 'Maharashtra',
    distance_km: 26,
    crop: 'Onion (कांदा)',
    arrival_tonnes: 280,
    min_price: 13,
    max_price: 16.8,
    modal_price: 15.2,
    commission_pct: 4.5,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [15.2, 16.0, 17.0],
    last_updated: 'Today, 06:15 AM'
  },
  {
    id: 'M-PUNE',
    market_name: 'Pune Gultekdi Market Yard (पुणे)',
    district: 'Pune',
    state: 'Maharashtra',
    distance_km: 92,
    crop: 'Onion (कांदा)',
    arrival_tonnes: 190,
    min_price: 14.5,
    max_price: 18,
    modal_price: 16.5,
    commission_pct: 5.0,
    trend: 'STABLE',
    demand_index: 'Moderate',
    forecast_3day: [16.5, 16.5, 16.8],
    last_updated: 'Today, 07:30 AM'
  },
  {
    id: 'M-AURANGABAD',
    market_name: 'Aurangabad Jadhavwadi Mandi (औरंगाबाद)',
    district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    distance_km: 35,
    crop: 'Onion (कांदा)',
    arrival_tonnes: 88,
    min_price: 13.5,
    max_price: 16.5,
    modal_price: 15.0,
    commission_pct: 3.5,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [15.0, 15.8, 16.5],
    last_updated: 'Today, 07:45 AM'
  },
  {
    id: 'M-LASALGAON',
    market_name: 'Lasalgaon APMC (आशियातील सर्वात मोठी कांदा बाजारपेठ)',
    district: 'Nashik',
    state: 'Maharashtra',
    distance_km: 55,
    crop: 'Onion (कांदा)',
    arrival_tonnes: 420,
    min_price: 13.8,
    max_price: 17.2,
    modal_price: 15.8,
    commission_pct: 4.0,
    trend: 'UP',
    demand_index: 'High',
    forecast_3day: [15.8, 16.8, 17.5],
    last_updated: 'Today, 05:45 AM'
  }
];

/**
 * 15+ VERIFIED COMMERCIAL BUYERS
 * With trust scores, payment terms, required crops, pickup capability
 */
export const INITIAL_BUYERS: Buyer[] = [
  {
    buyer_id: 'B002',
    buyer_name: 'Sri Lakshmi Foods',
    buyer_type: 'Processor',
    location: 'Pollachi Highway, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 94432 11029',
    rating: 4.9,
    trust_score: 94,
    payment_terms: 'Within 48 hours',
    pickup_capability: 'Buyer Arranged (Deducted)',
    ordersCompleted: 148,
    requiredCrops: ['Tomato', 'Chilli', 'Onion'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B001',
    buyer_name: 'FreshMart Supermarkets',
    buyer_type: 'Retail Chain',
    location: 'Avinashi Road, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 98421 88390',
    rating: 4.2,
    trust_score: 72,
    payment_terms: 'Within 7 days',
    pickup_capability: 'Farmer Delivery Required',
    ordersCompleted: 54,
    requiredCrops: ['Tomato', 'Potato', 'Onion'],
    risk_level: 'High'
  },
  {
    buyer_id: 'B003',
    buyer_name: 'MegaDist Agro Exporters',
    buyer_type: 'Exporter',
    location: 'Chennai Trade Hub',
    district: 'Chennai',
    verified: 'Yes',
    phone: '+91 97500 44102',
    rating: 4.5,
    trust_score: 78,
    payment_terms: 'Within 15 days',
    pickup_capability: 'Farmer Delivery Required',
    ordersCompleted: 92,
    requiredCrops: ['Tomato', 'Onion', 'Grapes'],
    risk_level: 'Medium'
  },
  {
    buyer_id: 'B004',
    buyer_name: 'ABC Foods Pvt Ltd',
    buyer_type: 'Processor',
    location: 'Tiruppur Processing Zone',
    district: 'Tiruppur',
    verified: 'Yes',
    phone: '+91 94862 33918',
    rating: 4.8,
    trust_score: 92,
    payment_terms: 'Within 48 hours',
    pickup_capability: 'Yes (Free Pickup)',
    ordersCompleted: 112,
    requiredCrops: ['Tomato', 'Onion'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B005',
    buyer_name: 'Pune Fresh Produce Co.',
    buyer_type: 'Wholesaler',
    location: 'Gultekdi, Pune',
    district: 'Pune',
    verified: 'Yes',
    phone: '+91 98220 55109',
    rating: 4.9,
    trust_score: 96,
    payment_terms: 'Immediate on Delivery',
    pickup_capability: 'Buyer Arranged (Deducted)',
    ordersCompleted: 230,
    requiredCrops: ['Onion', 'Tomato', 'Soybean'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B006',
    buyer_name: 'Konkan Agro Exports',
    buyer_type: 'Exporter',
    location: 'MIDC, Aurangabad',
    district: 'Chhatrapati Sambhajinagar',
    verified: 'Pending',
    phone: '+91 98601 22910',
    rating: 4.3,
    trust_score: 74,
    payment_terms: 'Within 10 days',
    pickup_capability: 'Farmer Delivery Required',
    ordersCompleted: 28,
    requiredCrops: ['Onion', 'Pomegranate'],
    risk_level: 'Medium'
  },
  {
    buyer_id: 'B007',
    buyer_name: 'ITC Agri Business Division',
    buyer_type: 'Institutional',
    location: 'Erode Industrial Estate',
    district: 'Erode',
    verified: 'Yes',
    phone: '+91 94420 18833',
    rating: 4.9,
    trust_score: 98,
    payment_terms: 'Within 24 hours (Direct Bank)',
    pickup_capability: 'Yes (Free Pickup)',
    ordersCompleted: 340,
    requiredCrops: ['Tomato', 'Wheat', 'Rice'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B008',
    buyer_name: 'Taj Gateway Hotels & Catering',
    buyer_type: 'Hotel',
    location: 'Race Course, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 98430 77112',
    rating: 4.7,
    trust_score: 90,
    payment_terms: 'Within 72 hours',
    pickup_capability: 'Buyer Arranged (Deducted)',
    ordersCompleted: 65,
    requiredCrops: ['Tomato', 'Potato', 'Banana'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B009',
    buyer_name: 'Sahyadri Farmers Producer Co.',
    buyer_type: 'Processor',
    location: 'Mohadi, Nashik',
    district: 'Nashik',
    verified: 'Yes',
    phone: '+91 98230 44900',
    rating: 4.95,
    trust_score: 99,
    payment_terms: 'Same Day UPI Transfer',
    pickup_capability: 'Yes (Free Pickup)',
    ordersCompleted: 410,
    requiredCrops: ['Tomato', 'Grapes', 'Onion'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B010',
    buyer_name: 'Nilgiris Dairy & Agro Retail',
    buyer_type: 'Retail Chain',
    location: 'Mettupalayam Road, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 94440 33819',
    rating: 4.6,
    trust_score: 87,
    payment_terms: 'Within 5 days',
    pickup_capability: 'Farmer Delivery Required',
    ordersCompleted: 82,
    requiredCrops: ['Tomato', 'Potato', 'Pulses'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B011',
    buyer_name: 'Swiggy Instamart Dark Store Hub',
    buyer_type: 'Trader',
    location: 'Saravanampatti, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 99520 88201',
    rating: 4.5,
    trust_score: 89,
    payment_terms: 'Within 48 hours',
    pickup_capability: 'Buyer Arranged (Deducted)',
    ordersCompleted: 95,
    requiredCrops: ['Tomato', 'Onion', 'Chilli'],
    risk_level: 'Low'
  },
  {
    buyer_id: 'B012',
    buyer_name: 'BigBasket Quick Sourcing',
    buyer_type: 'Retail Chain',
    location: 'Singanallur, Coimbatore',
    district: 'Coimbatore',
    verified: 'Yes',
    phone: '+91 98433 11880',
    rating: 4.8,
    trust_score: 93,
    payment_terms: 'Within 48 hours',
    pickup_capability: 'Yes (Free Pickup)',
    ordersCompleted: 175,
    requiredCrops: ['Tomato', 'Onion', 'Potato'],
    risk_level: 'Low'
  }
];

/**
 * SECTION 15 & 16 CRITICAL SIH DEMO CANDIDATES:
 * Farmer: Tomato, 1,000 kg, Grade A, Coimbatore
 * 
 * Buyer A: ₹28/kg, Transport ₹2,000, Low Reliability (Trust 72)
 * Buyer B (Sri Lakshmi Foods): ₹27/kg, Transport ₹600, High Reliability (Trust 94) -> WINNER!
 * Buyer C: ₹29/kg, Transport ₹3,000, Medium Reliability (Trust 78) -> Highest quote, but lower net!
 */
export const TOMATO_SIH_DEMO_CANDIDATES: RawCandidateOption[] = [
  {
    id: 'B-SRI-LAKSHMI',
    name: 'Sri Lakshmi Foods (Buyer B) 🥇',
    type: 'buyer',
    location: 'Pollachi Highway, Coimbatore (24 km)',
    distance_km: 24,
    price_per_kg: 27.0,
    commission_pct: 0, // Direct buyer = 0%
    forecast: [27.0, 27.2, 27.5],
    trust_score: 94,
    payment_speed: 'Within 48 hours',
    risk_level: 'Low',
    buyer_type: 'Processor',
    demand_match: 98
  },
  {
    id: 'B-MEGADIST',
    name: 'MegaDist Agro Exporters (Buyer C) ⚠️',
    type: 'buyer',
    location: 'Chennai Gateway Corridor (120 km)',
    distance_km: 120,
    price_per_kg: 29.0, // Highest Nominal Price
    commission_pct: 0,
    forecast: [29.0, 28.5, 27.5],
    trust_score: 78,
    payment_speed: '15 days',
    risk_level: 'Medium',
    buyer_type: 'Exporter',
    demand_match: 90
  },
  {
    id: 'B-FRESHMART',
    name: 'FreshMart Supermarkets (Buyer A)',
    type: 'buyer',
    location: 'Avinashi Road Hub (80 km)',
    distance_km: 80,
    price_per_kg: 28.0,
    commission_pct: 0,
    forecast: [28.0, 27.5, 27.0],
    trust_score: 72,
    payment_speed: '7 days',
    risk_level: 'High',
    buyer_type: 'Retail Chain',
    demand_match: 85
  },
  {
    id: 'M-POLLACHI-MANDI',
    name: 'Pollachi APMC Mandi (பொள்ளாச்சி)',
    type: 'mandi',
    location: 'Pollachi Market Yard (42 km)',
    distance_km: 42,
    price_per_kg: 26.0,
    commission_pct: 3.5,
    forecast: [26.0, 27.0, 28.0],
    trust_score: 88,
    payment_speed: 'Within 24 hours',
    risk_level: 'Low',
    buyer_type: 'Market Committee',
    demand_match: 92
  },
  {
    id: 'M-COIMBATORE-MANDI',
    name: 'Coimbatore APMC Mandi (கோவை)',
    type: 'mandi',
    location: 'Coimbatore North Yard (14 km)',
    distance_km: 14,
    price_per_kg: 24.0,
    commission_pct: 4.0,
    forecast: [24.0, 25.5, 27.0],
    trust_score: 85,
    payment_speed: 'Same day',
    risk_level: 'Low',
    buyer_type: 'Market Committee',
    demand_match: 88
  }
];

export const ONION_DEMO_CANDIDATES: RawCandidateOption[] = [
  {
    id: 'B-PUNE-FRESH',
    name: 'Pune Fresh Produce Co. (Verified)',
    type: 'buyer',
    location: 'Pune Central Hub (75 km)',
    distance_km: 75,
    price_per_kg: 16.5,
    commission_pct: 0,
    forecast: [16.5, 16.8, 17.0],
    trust_score: 96,
    payment_speed: 'Same day',
    risk_level: 'Low',
    buyer_type: 'Wholesaler',
    demand_match: 96
  },
  {
    id: 'M-PIMPALGAON-MANDI',
    name: 'Pimpalgaon Baswant APMC (नाशिक)',
    type: 'mandi',
    location: 'Pimpalgaon Yard (26 km)',
    distance_km: 26,
    price_per_kg: 15.2,
    commission_pct: 4.5,
    forecast: [15.2, 16.0, 17.0],
    trust_score: 90,
    payment_speed: 'Within 24 hours',
    risk_level: 'Low',
    buyer_type: 'Market Committee',
    demand_match: 94
  },
  {
    id: 'M-NASHIK-MANDI',
    name: 'Nashik APMC Mandi (नाशिक)',
    type: 'mandi',
    location: 'Nashik APMC Yard (8 km)',
    distance_km: 8,
    price_per_kg: 14.0,
    commission_pct: 5.0,
    forecast: [14.0, 15.0, 16.2],
    trust_score: 88,
    payment_speed: 'Same day',
    risk_level: 'Low',
    buyer_type: 'Market Committee',
    demand_match: 86
  }
];

export const INITIAL_LOTS: DigitalLot[] = [
  {
    lot_id: 'LOT10025',
    farmer_fpo: 'ராமேஷ்வர் (Rameshwar)',
    crop: 'Tomato (நாட்டு தக்காளி)',
    crop_icon: '🍅',
    quantity_kg: 1000,
    quantity_tons: 1,
    quality: 'Grade A',
    quality_details: {
      grade: 'Grade A',
      moisture_pct: 12.5,
      size_mm: '60-70 mm (Large)',
      color_uniformity: 'Deep Red (95%)',
      damage_pct: 1.2
    },
    harvest_date: '2026-09-06',
    location: 'Karamadai, Coimbatore',
    expected_price: 26,
    available_from: '2026-09-07',
    certification: 'Jaivik Bharat',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'],
    status: 'Available',
    storage_available: false,
    created_at: '2026-09-06'
  },
  {
    lot_id: 'LOT10018',
    farmer_fpo: 'Kongu Vellalar FPO (உழவர் உற்பத்தியாளர் நிறுவனம்)',
    crop: 'Tomato (Grade A)',
    crop_icon: '🍅',
    quantity_kg: 2000,
    quantity_tons: 2,
    quality: 'Grade A',
    quality_details: {
      grade: 'Grade A',
      moisture_pct: 11.8,
      size_mm: '65 mm',
      color_uniformity: 'Uniform Red (98%)',
      damage_pct: 0.8
    },
    harvest_date: '2026-09-05',
    location: 'Pollachi, Coimbatore',
    expected_price: 27,
    available_from: '2026-09-06',
    certification: 'GlobalGAP',
    images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'],
    status: 'Available',
    storage_available: true,
    is_fpo_aggregated: true,
    aggregated_farmers_count: 3,
    created_at: '2026-09-05'
  },
  {
    lot_id: 'LOT10009',
    farmer_fpo: 'रामेश्वर पाटील (Rameshwar Patil)',
    crop: 'Onion (नाशिक लाल कांदा)',
    crop_icon: '🧅',
    quantity_kg: 1000,
    quantity_tons: 1,
    quality: 'Grade A',
    quality_details: {
      grade: 'Grade A',
      moisture_pct: 14.0,
      size_mm: '55-65 mm',
      color_uniformity: 'Dark Red (92%)',
      damage_pct: 1.5
    },
    harvest_date: '2026-09-06',
    location: 'Pimpalgaon, Nashik',
    expected_price: 15,
    available_from: '2026-09-07',
    certification: 'Conventional / None',
    images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'],
    status: 'Available',
    storage_available: true,
    created_at: '2026-09-06'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'OFF-701',
    lot_id: 'LOT10025',
    crop: 'Tomato (நாட்டு தக்காளி)',
    quantity_kg: 1000,
    buyer_id: 'B002',
    buyer_name: 'Sri Lakshmi Foods',
    buyer_type: 'Processor',
    buyer_verified: true,
    buyer_rating: 4.9,
    trust_score: 94,
    payment_terms: 'Within 48 hours',
    offered_price_per_kg: 27.0,
    distance_km: 24,
    transport_cost: 600,
    net_profit_estimate: 26400, // 27,000 - 600 = 26,400!
    risk_level: 'Low',
    status: 'Pending',
    is_best_deal: true,
    created_at: '2026-09-07'
  },
  {
    id: 'OFF-702',
    lot_id: 'LOT10025',
    crop: 'Tomato (நாட்டு தக்காளி)',
    quantity_kg: 1000,
    buyer_id: 'B003',
    buyer_name: 'MegaDist Agro Exporters',
    buyer_type: 'Exporter',
    buyer_verified: true,
    buyer_rating: 4.5,
    trust_score: 78,
    payment_terms: 'Within 15 days',
    offered_price_per_kg: 29.0, // Nominally higher
    distance_km: 120,
    transport_cost: 3000,
    net_profit_estimate: 25100, // Risk & transport deductions reduce this
    risk_level: 'Medium',
    status: 'Pending',
    is_best_deal: false,
    created_at: '2026-09-07'
  },
  {
    id: 'OFF-703',
    lot_id: 'LOT10025',
    crop: 'Tomato (நாட்டு தக்காளி)',
    quantity_kg: 1000,
    buyer_id: 'B001',
    buyer_name: 'FreshMart Supermarkets',
    buyer_type: 'Retail Chain',
    buyer_verified: true,
    buyer_rating: 4.2,
    trust_score: 72,
    payment_terms: 'Within 7 days',
    offered_price_per_kg: 28.0,
    distance_km: 80,
    transport_cost: 2000,
    net_profit_estimate: 24800,
    risk_level: 'High',
    status: 'Pending',
    is_best_deal: false,
    created_at: '2026-09-07'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9901',
    lot_id: 'LOT10018',
    crop: 'Tomato (Grade A)',
    quantity_kg: 2000,
    farmer_name: 'Kongu Vellalar FPO',
    buyer_id: 'B004',
    buyer_name: 'ABC Foods Pvt Ltd',
    agreed_price_per_kg: 27.0,
    total_value: 54000,
    current_step: 3, // Step 3: Advance Payment Secured
    created_at: '2026-09-06',
    estimated_delivery: '2026-09-09',
    status: 'In Transit',
    invoice_id: 'INV-2026-8801',
    transporter_assigned: 'Kovai Express Logistics (Tata 407)',
    driver_contact: '+91 94432 99011 (Driver: Murugan)',
    vehicle_number: 'TN 38 BX 4109'
  }
];

export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'GRV10021',
    order_id: 'ORD-9901',
    lot_id: 'LOT10018',
    raised_by: 'Farmer',
    party_name: 'Kongu Vellalar FPO',
    category: 'Late Transport',
    details: 'Transport truck scheduled for 09:00 AM arrived at 01:30 PM. Fresh tomato lot exposed to direct heat.',
    status: 'Under Review',
    resolution_notes: 'Transporter fined ₹500 demurrage. Advance released to FPO account.',
    created_at: '2026-09-06'
  },
  {
    id: 'GRV10018',
    order_id: 'ORD-9844',
    lot_id: 'LOT9981',
    raised_by: 'Buyer',
    party_name: 'FreshMart Supermarkets',
    category: 'Quality Dispute',
    details: 'Received 8% split damage in Grade A lot beyond contractual 2% tolerance.',
    status: 'Resolved',
    resolution_notes: 'Digital lot image verified. Compromise rate settled at ₹25.5/kg. Both parties agreed.',
    created_at: '2026-09-04'
  }
];

/**
 * LOGISTICS FLEET (Available Transporters)
 */
export const LOGISTICS_VEHICLES: LogisticsVehicle[] = [
  {
    id: 'VEH-01',
    name: 'Tata Ace (Chhota Hathi)',
    type: 'Mini Truck (Tata Ace)',
    capacity_kg: 1000,
    base_fare: 400,
    per_km_rate: 18,
    available_time: 'Available Today (Immediate)',
    driver_name: 'சின்னசாமி (Chinnasamy)',
    driver_phone: '+91 94431 88201',
    rating: 4.8
  },
  {
    id: 'VEH-02',
    name: 'Eicher 14ft Standard Truck',
    type: 'Standard 14ft Truck',
    capacity_kg: 3500,
    base_fare: 900,
    per_km_rate: 28,
    available_time: 'Available Tomorrow Morning',
    driver_name: 'சரவணன் (Saravanan)',
    driver_phone: '+91 98422 11099',
    rating: 4.9
  },
  {
    id: 'VEH-03',
    name: 'ThermoKing Cold Refrigerated Van',
    type: 'Cold Transport Van',
    capacity_kg: 2000,
    base_fare: 1200,
    per_km_rate: 34,
    available_time: 'Available Today (3 hrs notice)',
    driver_name: 'முத்துவேல் (Muthuvel)',
    driver_phone: '+91 97501 44812',
    rating: 4.95
  },
  {
    id: 'VEH-04',
    name: 'Mahindra Zor Grand Electric Loader',
    type: 'E-Loader',
    capacity_kg: 500,
    base_fare: 250,
    per_km_rate: 12,
    available_time: 'Available Today',
    driver_name: 'கார்த்திக் (Karthik)',
    driver_phone: '+91 96290 55102',
    rating: 4.7
  }
];

/**
 * STORAGE FACILITIES (Cold storage and warehouses)
 */
export const STORAGE_FACILITIES: StorageFacility[] = [
  {
    id: 'STR-01',
    name: 'Karamadai Central Agro Warehouse',
    type: 'Agro Warehouse',
    location: 'Karamadai, Coimbatore',
    distance_km: 5,
    rate_per_kg_per_day: 0.8,
    total_capacity_tonnes: 800,
    available_capacity_tonnes: 340,
    temperature_celsius: 'Ambient (22°C-26°C)',
    humidity_pct: '65%',
    phone: '+91 422 268 9100'
  },
  {
    id: 'STR-02',
    name: 'Pollachi Controlled Atmosphere Cold Storage',
    type: 'Cold Storage',
    location: 'Udumalpet Road, Pollachi',
    distance_km: 12,
    rate_per_kg_per_day: 1.5,
    total_capacity_tonnes: 1200,
    available_capacity_tonnes: 580,
    temperature_celsius: 'Controlled (4°C - 8°C)',
    humidity_pct: '90%',
    phone: '+91 4259 224 500'
  },
  {
    id: 'STR-03',
    name: 'Erode District Agro Logistics Park',
    type: 'Agro Warehouse',
    location: 'Perundurai, Erode',
    distance_km: 25,
    rate_per_kg_per_day: 0.7,
    total_capacity_tonnes: 2500,
    available_capacity_tonnes: 1100,
    temperature_celsius: 'Ambient / Dry Aerated',
    humidity_pct: '55%',
    phone: '+91 4294 220 880'
  }
];

/**
 * FPO MEMBER FARMERS (Aggregation Pool)
 */
export const FPO_MEMBERS: FPOFarmerMember[] = [
  {
    id: 'MEM-01',
    name: 'விவசாயி 1: ராமசாமி (Ramasamy)',
    phone: '+91 98421 11029',
    village: 'காரமடை (Karamadai)',
    crop: 'Tomato',
    available_qty_kg: 500,
    pledged_qty_kg: 500,
    grade: 'Grade A'
  },
  {
    id: 'MEM-02',
    name: 'விவசாயி 2: முருகேசன் (Murugesan)',
    phone: '+91 94432 77011',
    village: 'பெரியநாயக்கன்பாளையம் (PN Palayam)',
    crop: 'Tomato',
    available_qty_kg: 700,
    pledged_qty_kg: 700,
    grade: 'Grade A'
  },
  {
    id: 'MEM-03',
    name: 'விவசாயி 3: வேலுசாமி (Velusamy)',
    phone: '+91 97500 88912',
    village: 'துடியலூர் (Thudiyalur)',
    crop: 'Tomato',
    available_qty_kg: 800,
    pledged_qty_kg: 800,
    grade: 'Grade A'
  },
  {
    id: 'MEM-04',
    name: 'விவசாயி 4: சின்னதுரை (Chinnadurai)',
    phone: '+91 96291 33409',
    village: 'மேட்டுப்பாளையம் (Mettupalayam)',
    crop: 'Tomato',
    available_qty_kg: 1200,
    pledged_qty_kg: 0,
    grade: 'Grade B'
  }
];

export const POPULAR_CROPS = [
  { id: 'tomato', name_en: 'Tomato', name_ta: 'தக்காளி', name_hi: 'टमाटर', name_te: 'టమోటా', name_bn: 'টমেটো', name_mr: 'टोमॅटो', icon: '🍅', defaultPrice: 26, photo: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' },
  { id: 'onion', name_en: 'Onion', name_ta: 'வெங்காயம்', name_hi: 'प्याज', name_te: 'ఉల్లిపాయ', name_bn: 'পেঁয়াজ', name_mr: 'कांदा', icon: '🧅', defaultPrice: 15, photo: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80' },
  { id: 'potato', name_en: 'Potato', name_ta: 'உருளைக்கிழங்கு', name_hi: 'आलू', name_te: 'బంగాళాదుంప', name_bn: 'আলু', name_mr: 'बटाटा', icon: '🥔', defaultPrice: 22, photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80' },
  { id: 'chilli', name_en: 'Green Chilli', name_ta: 'பச்சை மிளகாய்', name_hi: 'हरी मिर्च', name_te: 'పచ్చిమిర్చి', name_bn: 'কাঁচা লঙ্কা', name_mr: 'हिरवी मिरची', icon: '🌶️', defaultPrice: 48, photo: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80' },
  { id: 'banana', name_en: 'Banana', name_ta: 'வாழைப்பழம்', name_hi: 'केला', name_te: 'అరటిపండు', name_bn: 'কলা', name_mr: 'केळी', icon: '🍌', defaultPrice: 32, photo: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80' },
  { id: 'rice', name_en: 'Paddy / Rice', name_ta: 'நெல் / அரிசி', name_hi: 'धान / चावल', name_te: 'వరి / బియ్యం', name_bn: 'ধান / চাল', name_mr: 'भात / तांदूळ', icon: '🌾', defaultPrice: 36, photo: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80' },
  { id: 'wheat', name_en: 'Wheat', name_ta: 'கோதுமை', name_hi: 'गेहूं', name_te: 'గోధుమలు', name_bn: 'গম', name_mr: 'गहू', icon: '🌾', defaultPrice: 28, photo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80' },
  { id: 'groundnut', name_en: 'Groundnut', name_ta: 'வேர்க்கடலை', name_hi: 'मूंगफली', name_te: 'వేరుశనగ', name_bn: 'চীনাবাদাম', name_mr: 'भुईमूग', icon: '🥜', defaultPrice: 65, photo: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=400&auto=format&fit=crop&q=80' }
];

export const SIMULATED_IMPACT_METRICS = {
  farmersConnected: '1,284+',
  produceMarketedTonnes: '486',
  avgPriceImprovementPct: '8.4%',
  avgTransportSavings: '₹620',
  verifiedBuyers: '126',
  completedTransactions: '2,845',
  fposActive: '18'
};

export const INITIAL_ADMIN_CHAT_THREADS: AdminChatThread[] = [
  {
    id: 'CHAT-01',
    party_id: 'FARM-9021',
    party_name: 'ராமேஷ்வர் (Rameshwar - Farmer)',
    party_role: 'Farmer',
    party_location: 'Karamadai, Coimbatore',
    avatar: '👨‍🌾',
    online: true,
    verified: true,
    linked_ref: 'LOT10025 / ORD-9901',
    unread_count: 1,
    messages: [
      {
        id: 'msg-01',
        sender: 'farmer',
        sender_name: 'ராமேஷ்வர் (Rameshwar)',
        text: 'வணக்கம் அட்மின் ஐயா, என் தக்காளி லாட் LOT10025-க்கு ஸ்ரீ லக்ஷ்மி ஃபுட்ஸ் முன்கூட்டியே ரூ. 5,000 அட்வான்ஸ் கொடுத்திருக்கிறார்கள். மீதித் தொகை எஸ்க்ரோவில் உள்ளதா?',
        timestamp: '10:14 AM'
      },
      {
        id: 'msg-02',
        sender: 'admin',
        sender_name: 'State Market Nodal Admin',
        text: 'வணக்கம் ராமேஷ்வர்! ஆம், மீதி ரூ. 21,400 எஸ்க்ரோ கணக்கில் (Secured Ref #ESC-9021-TM) பத்திரமாக பூட்டப்பட்டுள்ளது. டிரக் எடை சரிபார்ப்பிற்குப் பின் உடனடியாக உங்கள் வங்கிக் கணக்கிற்கு விடுவிக்கப்படும்.',
        timestamp: '10:16 AM'
      },
      {
        id: 'msg-03',
        sender: 'farmer',
        sender_name: 'ராமேஷ்வர் (Rameshwar)',
        text: 'மிக்க நன்றி ஐயா! வாகன ஓட்டுநர் TN-38-BZ-4412 இடம் டிஜிட்டல் வேபில் QR காட்டுகிறேன்.',
        timestamp: '10:20 AM'
      }
    ]
  },
  {
    id: 'CHAT-02',
    party_id: 'B002',
    party_name: 'Sri Lakshmi Agro Foods',
    party_role: 'Buyer',
    party_location: 'Pollachi Industrial Area, Coimbatore',
    avatar: '🏭',
    online: true,
    verified: true,
    linked_ref: 'ORD-9901 (Escrow ₹26,400)',
    unread_count: 0,
    messages: [
      {
        id: 'msg-10',
        sender: 'buyer',
        sender_name: 'Sri Lakshmi Agro Foods',
        text: 'Greetings State Nodal Admin. Quality inspection for order ORD-9901 (Tomato 1,000 kg) completed at our loading dock. Moisture 12.4%, Grade A confirmed.',
        timestamp: '09:45 AM'
      },
      {
        id: 'msg-11',
        sender: 'admin',
        sender_name: 'State Market Nodal Admin',
        text: 'Inspection certificate logged. Jaivik Bharat benchmark cleared. Releasing remaining escrow balance ₹21,400 to Farmer Rameshwar right now.',
        timestamp: '09:48 AM'
      },
      {
        id: 'msg-12',
        sender: 'buyer',
        sender_name: 'Sri Lakshmi Agro Foods',
        text: 'Confirmed receipt of Digital Invoice #INV-2026-9901. Thank you for the smooth escrow facilitation.',
        timestamp: '09:50 AM'
      }
    ]
  },
  {
    id: 'CHAT-03',
    party_id: 'FPO-7701',
    party_name: 'Kongu Vellalar FPO',
    party_role: 'FPO',
    party_location: 'Pollachi, Coimbatore (350+ Member Farmers)',
    avatar: '🏢',
    online: false,
    verified: true,
    linked_ref: 'LOT10018 (2,000 kg Tomato)',
    unread_count: 2,
    messages: [
      {
        id: 'msg-20',
        sender: 'fpo',
        sender_name: 'Kongu Vellalar FPO Lead',
        text: 'வணக்கம் சார், 3 விவசாயிகளின் 2,000 கிலோ தக்காளி லாட் LOT10018 உருவாக்கப்பட்டுள்ளது. சென்னை கோயம்பேடு மொத்த வியாபாரிக்கு ரூ.27/கிலோ விலை நிர்ணயிக்க அரசு பரிந்துரை உள்ளதா?',
        timestamp: 'Yesterday 04:12 PM'
      },
      {
        id: 'msg-21',
        sender: 'admin',
        sender_name: 'State Market Nodal Admin',
        text: 'FPO தரவு சரிபார்க்கப்பட்டது. கோயம்பேடு இன்றைய அதிகபட்ச விலை ரூ.26/கிலோ. ஆனால் உங்கள் GlobalGAP சான்றிதழுக்கு FreshMart ₹28/கிலோ அக்ரிகேட் ஆஃபர் கொடுத்துள்ளது. அந்த ஆஃபரை ஏற்க பரிந்துரைக்கிறோம்.',
        timestamp: 'Yesterday 04:30 PM'
      },
      {
        id: 'msg-22',
        sender: 'fpo',
        sender_name: 'Kongu Vellalar FPO Lead',
        text: 'அருமை சார்! எங்கள் நிர்வாகக் குழுவிடம் FreshMart ஆஃபரை ஒப்புதல் பெறுகிறோம்.',
        timestamp: 'Yesterday 05:01 PM'
      }
    ]
  },
  {
    id: 'CHAT-04',
    party_id: 'TR-04',
    party_name: 'Kovai Express Logistics (Driver: Murugan)',
    party_role: 'Transporter',
    party_location: 'TN-38-BZ-4412 (Tata Ace)',
    avatar: '🚛',
    online: true,
    verified: true,
    linked_ref: 'ORD-9901 Pickup',
    unread_count: 0,
    messages: [
      {
        id: 'msg-30',
        sender: 'transporter',
        sender_name: 'Murugan (Driver)',
        text: 'Van TN-38-BZ-4412 reached Karamadai farm pickup point. Loading 1,000 kg tomato crates right now. E-waybill scanned.',
        timestamp: '10:35 AM'
      },
      {
        id: 'msg-31',
        sender: 'admin',
        sender_name: 'State Market Nodal Admin',
        text: 'GPS live telemetry ping received. Destination: Sri Lakshmi Agro Foods, Pollachi. Proceed with safe transit.',
        timestamp: '10:38 AM'
      }
    ]
  },
  {
    id: 'CHAT-05',
    party_id: 'B001',
    party_name: 'FreshMart Retail Chains',
    party_role: 'Buyer',
    party_location: 'Coimbatore RS Puram Hub',
    avatar: '🛒',
    online: true,
    verified: true,
    linked_ref: 'KYC Upgrade Tier-1',
    unread_count: 1,
    messages: [
      {
        id: 'msg-40',
        sender: 'buyer',
        sender_name: 'FreshMart Procurement Head',
        text: 'Admin team, we have uploaded our newly renewed FSSAI license and bank security guarantee of ₹5,00,000. Please expedite Tier-1 Verified badge.',
        timestamp: '11:05 AM'
      },
      {
        id: 'msg-41',
        sender: 'admin',
        sender_name: 'State Market Nodal Admin',
        text: 'Documents examined and cross-verified with MCA and FSSAI database. Tier-1 badge activated with instant trade priority!',
        timestamp: '11:15 AM'
      }
    ]
  }
];

