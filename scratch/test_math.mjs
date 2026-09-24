// Test AGRISETU Net-Profit Math Engine

function calculateNetProfit(option, quantityKg) {
  const tons = quantityKg / 1000;
  const gross_value = option.price_per_kg * quantityKg;
  const transport_cost = Math.round(option.distance_km * 25 * tons);
  const commission_cost = Math.round(gross_value * (option.commission_pct / 100));
  const loading_cost = 150;

  const net_profit = Math.round(
    gross_value - transport_cost - commission_cost - loading_cost
  );

  const extra_storage_cost = Math.round(2 * 60 * tons);
  const day2Gross = option.forecast[1] * quantityKg;
  const day2Commission = Math.round(day2Gross * (option.commission_pct / 100));
  
  const day2_net = Math.round(
    day2Gross - transport_cost - day2Commission - extra_storage_cost - loading_cost
  );

  let sale_window_status;
  if (option.forecast[1] < option.forecast[0]) {
    sale_window_status = 'PRICE_FALLING';
  } else if (day2_net > net_profit) {
    sale_window_status = 'WAIT_2_DAYS';
  } else {
    sale_window_status = 'SELL_NOW';
  }

  return {
    name: option.name,
    gross_value,
    transport_cost,
    commission_cost,
    loading_cost,
    net_profit,
    day2_net,
    sale_window_status
  };
}

const ONION_DEMO = [
  {
    name: 'Nashik Mandi',
    distance_km: 5,
    price_per_kg: 8.0,
    commission_pct: 5.0,
    forecast: [8.0, 8.6, 9.1]
  },
  {
    name: 'Aurangabad Mandi',
    distance_km: 30,
    price_per_kg: 9.5,
    commission_pct: 3.0,
    forecast: [9.5, 9.6, 9.4]
  },
  {
    name: 'Pune Buyer (verified)',
    distance_km: 90,
    price_per_kg: 10.5,
    commission_pct: 0,
    forecast: [10.5, 10.5, 10.6]
  }
];

console.log("=== AGRISETU 1-TON ONION MATH CHECK ===");
const results = ONION_DEMO.map(opt => calculateNetProfit(opt, 1000));
results.sort((a, b) => b.net_profit - a.net_profit);

results.forEach((r, idx) => {
  console.log(`#${idx + 1} ${r.name}`);
  console.log(`   Gross Value: ₹${r.gross_value}`);
  console.log(`   Transport:   -₹${r.transport_cost}`);
  console.log(`   Commission:  -₹${r.commission_cost}`);
  console.log(`   Loading:     -₹${r.loading_cost}`);
  console.log(`   NET PROFIT:  ₹${r.net_profit}`);
  console.log(`   Day 2 Net:   ₹${r.day2_net}`);
  console.log(`   Sale Window: ${r.sale_window_status}`);
});

const passed = results[0].name === 'Aurangabad Mandi' && 
               results[0].net_profit === 8315 &&
               results[1].name === 'Pune Buyer (verified)' && 
               results[1].net_profit === 8100 &&
               results[2].name === 'Nashik Mandi' && 
               results[2].net_profit === 7325 &&
               results[0].sale_window_status === 'SELL_NOW';

console.log("\nALL EXACT REQUIREMENTS PASSED:", passed);
