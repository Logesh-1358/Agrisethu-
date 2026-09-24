export type Role = 'farmer' | 'fpo' | 'buyer' | 'admin' | 'judge';
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

export type FarmerTab = 'home' | 'sell' | 'markets' | 'offers' | 'sell-window' | 'logistics' | 'profile';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  land_acres: number;
  status: 'Verified' | 'Pending';
  avatar?: string;
  cropSpeciality?: string[];
  kisanCreditScore?: number;
}

export interface Buyer {
  buyer_id: string;
  buyer_name: string;
  buyer_type: 'Trader' | 'Processor' | 'Institutional' | 'Market' | 'Wholesaler' | 'Exporter' | 'Retail Chain' | 'Hotel';
  location: string;
  district?: string;
  verified: 'Yes' | 'Pending' | 'Rejected';
  phone?: string;
  rating?: number; // e.g. 4.8
  trust_score: number; // 0-100, e.g. 94
  payment_terms: string; // e.g. "Within 48 hours"
  pickup_capability: 'Yes (Free Pickup)' | 'Buyer Arranged (Deducted)' | 'Farmer Delivery Required';
  ordersCompleted?: number;
  requiredCrops?: string[];
  risk_level: 'Low' | 'Medium' | 'High';
}

export interface QualityParameters {
  grade: 'Grade A' | 'Grade B' | 'Grade C';
  moisture_pct: number;
  size_mm?: string;
  color_uniformity: string;
  damage_pct: number;
}

export interface DigitalLot {
  lot_id: string;
  farmer_fpo: string;
  crop: string;
  crop_icon?: string;
  quantity_kg: number;
  quantity_tons: number;
  quality: 'Grade A' | 'Grade B' | 'Grade C';
  quality_details?: QualityParameters;
  harvest_date: string;
  location: string;
  expected_price: number;
  available_from: string;
  certification: 'Jaivik Bharat' | 'Organic India' | 'GlobalGAP' | 'Conventional / None';
  images: string[];
  status: 'Available' | 'Under Offer' | 'Sold';
  storage_available?: boolean;
  is_fpo_aggregated?: boolean;
  aggregated_farmers_count?: number;
  created_at: string;
}

/**
 * MANDI / MARKET: Pure Market Intelligence Source
 * (Prices, arrivals, volume, modal rate, trends)
 */
export interface MandiMarket {
  id: string;
  market_name: string;
  district: string;
  state: string;
  distance_km: number;
  crop: string;
  arrival_tonnes: number;
  min_price: number;
  max_price: number;
  modal_price: number;
  commission_pct: number; // e.g. 3-5% for APMC yard
  trend: 'UP' | 'DOWN' | 'STABLE';
  demand_index: 'High' | 'Moderate' | 'Low';
  forecast_3day: [number, number, number]; // [Day 1, Day 2, Day 3]
  last_updated: string;
}

export interface NetProfitOption {
  id: string;
  name: string;
  type: 'mandi' | 'buyer';
  location: string;
  distance_km: number;
  price_per_kg: number;
  commission_pct: number;
  forecast: [number, number, number];
  
  // Math itemization
  gross_value: number;
  transport_cost: number;
  commission_cost: number;
  loading_cost: number;
  risk_adjustment: number;
  net_profit: number;
  
  // Buyer Trust & Credentials
  trust_score?: number; // 0-100
  payment_speed?: string;
  risk_level?: 'Low' | 'Medium' | 'High';
  buyer_type?: string;
  
  // Timing / Forecast window calculation
  extra_storage_cost: number;
  day2_net: number;
  sale_window_status: 'SELL_NOW' | 'WAIT_2_DAYS' | 'PRICE_FALLING';
  rank: number; // 1, 2, 3...
  
  // Explainable AI Sub-Scores (0-100)
  score_net_profit: number;
  score_reliability: number;
  score_payment: number;
  score_transport: number;
  score_demand: number;
  score_distance: number;
  score_risk: number;
  total_ai_score: number;
  ai_recommendation_reason: string;
}

export interface Offer {
  id: string;
  lot_id: string;
  crop: string;
  quantity_kg: number;
  buyer_id: string;
  buyer_name: string;
  buyer_type: string;
  buyer_verified: boolean;
  buyer_rating: number;
  trust_score: number; // 0-100
  payment_terms: string;
  offered_price_per_kg: number;
  distance_km: number;
  transport_cost: number;
  net_profit_estimate: number;
  risk_level: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Accepted' | 'Rejected' | 'In Order' | 'Countered';
  is_best_deal: boolean;
  counter_price?: number;
  created_at: string;
}

export interface Order {
  id: string;
  lot_id: string;
  crop: string;
  quantity_kg: number;
  farmer_name: string;
  buyer_id: string;
  buyer_name: string;
  agreed_price_per_kg: number;
  total_value: number;
  current_step: number; // 1 to 7
  created_at: string;
  estimated_delivery: string;
  status: 'In Transit' | 'Completed' | 'Disputed';
  invoice_id?: string;
  transporter_assigned?: string;
  driver_contact?: string;
  vehicle_number?: string;
}

export type GrievanceCategory = 
  | 'Payment Delayed' 
  | 'Quantity Mismatch' 
  | 'Quality Dispute' 
  | 'Late Transport'
  | 'Buyer Rejected Produce';

export interface Grievance {
  id: string;
  order_id: string;
  lot_id: string;
  raised_by: 'Farmer' | 'Buyer' | 'FPO';
  party_name: string;
  category: GrievanceCategory;
  details: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  resolution_notes?: string;
  created_at: string;
}

export interface LogisticsVehicle {
  id: string;
  name: string;
  type: 'Mini Truck (Tata Ace)' | 'Standard 14ft Truck' | 'Cold Transport Van' | 'E-Loader';
  capacity_kg: number;
  base_fare: number;
  per_km_rate: number;
  available_time: string;
  driver_name: string;
  driver_phone: string;
  rating: number;
}

export interface StorageFacility {
  id: string;
  name: string;
  type: 'Cold Storage' | 'Agro Warehouse' | 'Silo Storage';
  location: string;
  distance_km: number;
  rate_per_kg_per_day: number;
  total_capacity_tonnes: number;
  available_capacity_tonnes: number;
  temperature_celsius?: string;
  humidity_pct?: string;
  phone: string;
}

export interface FPOFarmerMember {
  id: string;
  name: string;
  phone: string;
  village: string;
  crop: string;
  available_qty_kg: number;
  pledged_qty_kg: number;
  grade: 'Grade A' | 'Grade B' | 'Grade C';
}

export interface FormulaWeights {
  netProfit: number;      // default 40
  buyerReliability: number;// default 20
  paymentReliability: number;// default 10
  transportCost: number;   // default 10
  demandMatch: number;     // default 10
  distance: number;        // default 5
  risk: number;            // default 5
}

export interface DecisionTraceStep {
  stepNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  outputBadge?: string;
}

export interface DigitalInvoice {
  invoice_id: string;
  order_id: string;
  lot_id: string;
  date: string;
  farmer_name: string;
  farmer_phone: string;
  farmer_village: string;
  buyer_name: string;
  buyer_type: string;
  buyer_gstin?: string;
  crop: string;
  quality_grade: string;
  quantity_kg: number;
  rate_per_kg: number;
  gross_amount: number;
  advance_paid: number;
  transport_deduction: number;
  platform_fee: number;
  balance_payable: number;
  payment_status: 'Advance Paid' | 'Escrow Secured' | 'Settled';
  escrow_ref: string;
}

export interface AdminChatMessage {
  id: string;
  sender: 'admin' | 'farmer' | 'buyer' | 'fpo' | 'transporter';
  sender_name: string;
  text: string;
  timestamp: string;
}

export interface AdminChatThread {
  id: string;
  party_id: string;
  party_name: string;
  party_role: 'Farmer' | 'Buyer' | 'FPO' | 'Transporter';
  party_location: string;
  avatar: string;
  online: boolean;
  verified: boolean;
  linked_ref?: string; // e.g. "LOT10025", "ORD-9901", "GRV10021"
  unread_count: number;
  messages: AdminChatMessage[];
}
