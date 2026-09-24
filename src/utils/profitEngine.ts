import { FormulaWeights, NetProfitOption } from '../types';

export const DEFAULT_WEIGHTS: FormulaWeights = {
  netProfit: 40,
  buyerReliability: 20,
  paymentReliability: 10,
  transportCost: 10,
  demandMatch: 10,
  distance: 5,
  risk: 5
};

export interface RawCandidateOption {
  id: string;
  name: string;
  type: 'mandi' | 'buyer';
  location: string;
  distance_km: number;
  price_per_kg: number;
  commission_pct: number;
  forecast: [number, number, number];
  
  // Buyer specifics
  trust_score?: number; // 0-100
  payment_speed?: string; // e.g. "48 hours", "Same day", "15 days"
  risk_level?: 'Low' | 'Medium' | 'High';
  buyer_type?: string;
  demand_match?: number; // 0-100
}

/**
 * Calculates itemized profit, transport deductions, risk penalty,
 * and AI multi-attribute score based on weights.
 */
export function calculateNetProfitAndScore(
  option: RawCandidateOption,
  quantityKg: number,
  weights: FormulaWeights = DEFAULT_WEIGHTS
): Omit<NetProfitOption, 'rank'> {
  const tons = quantityKg / 1000;
  const gross_value = option.price_per_kg * quantityKg;

  // Transport: ₹25 per ton-km, with minimum ₹400
  let transport_cost = Math.round(option.distance_km * 25 * tons);
  if (transport_cost < 400 && option.distance_km > 0) transport_cost = 400;

  // If direct buyer with free pickup, transport is 0
  if (option.type === 'buyer' && option.id === 'B-ABC-FREE') {
    transport_cost = 0;
  }

  // Mandi commission (e.g. 3-5%), 0% for direct buyers
  const commission_cost = Math.round(gross_value * (option.commission_pct / 100));
  const loading_cost = 150; // flat loading / unloading / weighing charge

  // Risk adjustment based on buyer trust score / payment risk
  let risk_adjustment = 0;
  if (option.risk_level === 'High') {
    risk_adjustment = Math.round(gross_value * 0.06); // 6% risk buffer for delay/dispute
  } else if (option.risk_level === 'Medium') {
    risk_adjustment = Math.round(gross_value * 0.025);
  }

  const net_profit = Math.round(
    gross_value - transport_cost - commission_cost - loading_cost
  );

  // 3-Day sale window holding cost (₹1/kg/day or ₹60/ton/day)
  const extra_storage_cost = Math.round(2 * 60 * tons);
  const day2Gross = option.forecast[1] * quantityKg;
  const day2Commission = Math.round(day2Gross * (option.commission_pct / 100));
  const day2_net = Math.round(
    day2Gross - transport_cost - day2Commission - extra_storage_cost - loading_cost
  );

  let sale_window_status: 'SELL_NOW' | 'WAIT_2_DAYS' | 'PRICE_FALLING';
  if (option.forecast[1] < option.forecast[0]) {
    sale_window_status = 'PRICE_FALLING';
  } else if (day2_net > net_profit) {
    sale_window_status = 'WAIT_2_DAYS';
  } else {
    sale_window_status = 'SELL_NOW';
  }

  // --- Sub-scores (Normalized 0 to 100) ---
  // 1. Net profit score (relative benchmark)
  const score_net_profit = Math.min(100, Math.max(10, Math.round((net_profit / (28 * quantityKg)) * 100)));
  
  // 2. Reliability / Trust score
  const score_reliability = option.trust_score || (option.type === 'mandi' ? 85 : 70);

  // 3. Payment Speed score
  let score_payment = 80;
  if (option.payment_speed?.toLowerCase().includes('same day') || option.payment_speed?.toLowerCase().includes('immediate')) {
    score_payment = 100;
  } else if (option.payment_speed?.toLowerCase().includes('24') || option.payment_speed?.toLowerCase().includes('48')) {
    score_payment = 92;
  } else if (option.payment_speed?.toLowerCase().includes('7 days')) {
    score_payment = 65;
  } else if (option.payment_speed?.toLowerCase().includes('15 days') || option.payment_speed?.toLowerCase().includes('delayed')) {
    score_payment = 40;
  }

  // 4. Transport score (inversely proportional to transport cost per ton)
  const costPerTon = transport_cost / (tons || 1);
  const score_transport = Math.max(10, Math.min(100, Math.round(100 - costPerTon * 0.035)));

  // 5. Demand match score
  const score_demand = option.demand_match || 88;

  // 6. Distance score (shorter is better)
  const score_distance = Math.max(10, Math.min(100, Math.round(100 - option.distance_km * 0.7)));

  // 7. Risk score (Low risk = 95, Medium = 65, High = 30)
  const score_risk = option.risk_level === 'Low' ? 95 : option.risk_level === 'Medium' ? 65 : 30;

  // Composite Weighted AI Score
  const total_weight =
    weights.netProfit +
    weights.buyerReliability +
    weights.paymentReliability +
    weights.transportCost +
    weights.demandMatch +
    weights.distance +
    weights.risk;

  const raw_weighted_sum =
    score_net_profit * weights.netProfit +
    score_reliability * weights.buyerReliability +
    score_payment * weights.paymentReliability +
    score_transport * weights.transportCost +
    score_demand * weights.demandMatch +
    score_distance * weights.distance +
    score_risk * weights.risk;

  const total_ai_score = Math.round(raw_weighted_sum / (total_weight || 100));

  // Plain-Language Reason
  let ai_recommendation_reason = '';
  if (option.risk_level === 'Low' && score_transport > 75) {
    ai_recommendation_reason = 'Optimal balance of high take-home profit, lower transport deductions, and 94+ verified buyer trust score.';
  } else if (option.price_per_kg >= 29) {
    ai_recommendation_reason = 'Nominally high quote (₹29/kg), but high transport deductions (-₹3,000) and payment delay risk lower real in-pocket earnings.';
  } else {
    ai_recommendation_reason = 'Standard market rate with moderate travel distance and reliable local settlement.';
  }

  return {
    id: option.id,
    name: option.name,
    type: option.type,
    location: option.location,
    distance_km: option.distance_km,
    price_per_kg: option.price_per_kg,
    commission_pct: option.commission_pct,
    forecast: option.forecast,
    gross_value,
    transport_cost,
    commission_cost,
    loading_cost,
    risk_adjustment,
    net_profit,
    trust_score: option.trust_score,
    payment_speed: option.payment_speed,
    risk_level: option.risk_level,
    buyer_type: option.buyer_type,
    extra_storage_cost,
    day2_net,
    sale_window_status,
    score_net_profit,
    score_reliability,
    score_payment,
    score_transport,
    score_demand,
    score_distance,
    score_risk,
    total_ai_score,
    ai_recommendation_reason
  };
}

/**
 * Runs the net profit & multi-attribute AI scoring across all candidates,
 * sorting by total AI score (or net profit if weights tie).
 */
export function rankProfitOptions(
  options: RawCandidateOption[],
  quantityKg: number,
  weights: FormulaWeights = DEFAULT_WEIGHTS
): NetProfitOption[] {
  const evaluated = options.map((opt) =>
    calculateNetProfitAndScore(opt, quantityKg, weights)
  );

  // Sort descending primarily by total_ai_score, then net_profit
  evaluated.sort((a, b) => {
    if (b.total_ai_score !== a.total_ai_score) {
      return b.total_ai_score - a.total_ai_score;
    }
    return b.net_profit - a.net_profit;
  });

  const currentBestNet = evaluated.length > 0 ? evaluated[0].net_profit : 0;

  return evaluated.map((item, idx) => {
    let sale_window_status = item.sale_window_status;
    if (idx === 0) {
      if (item.forecast[1] < item.forecast[0]) {
        sale_window_status = 'PRICE_FALLING';
      } else if (item.day2_net > currentBestNet + 100) {
        sale_window_status = 'WAIT_2_DAYS';
      } else {
        sale_window_status = 'SELL_NOW';
      }
    }

    return {
      ...item,
      sale_window_status,
      rank: idx + 1
    };
  });
}

/**
 * Smart Split-Selling Calculator (Partial Sell innovation)
 * E.g. 1000 kg -> 600 kg sold now at today's rate + 400 kg held for 3 days
 */
export function calculateSmartSplitSale(
  totalKg: number,
  currentPrice: number,
  forecastPrice: number,
  storageCostPerKgPerDay: number = 1.0,
  daysToHold: number = 3,
  splitPctNow: number = 60
) {
  const qtyNow = Math.round(totalKg * (splitPctNow / 100));
  const qtyLater = totalKg - qtyNow;

  // Selling 100% now
  const allNowRevenue = totalKg * currentPrice;

  // Split strategy
  const revenueNow = qtyNow * currentPrice;
  const grossLater = qtyLater * forecastPrice;
  const storageCostLater = qtyLater * storageCostPerKgPerDay * daysToHold;
  const netLater = grossLater - storageCostLater;
  const splitTotalEarnings = revenueNow + netLater;

  // Comparison
  const additionalGain = splitTotalEarnings - allNowRevenue;

  return {
    qtyNow,
    qtyLater,
    splitPctNow,
    splitPctLater: 100 - splitPctNow,
    revenueNow,
    grossLater,
    storageCostLater,
    netLater,
    splitTotalEarnings,
    allNowRevenue,
    additionalGain,
    recommendation:
      additionalGain > 0
        ? `Sell ${qtyNow} kg today to protect immediate liquidity and lock in ₹${revenueNow.toLocaleString('en-IN')}. Store ${qtyLater} kg for ${daysToHold} days to capture estimated +₹${additionalGain.toLocaleString('en-IN')} upside after storage costs.`
        : `Market upside does not exceed storage costs. Recommended to sell full lot now.`
  };
}
