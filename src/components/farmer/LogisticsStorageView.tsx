import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  Warehouse, 
  Phone, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Navigation, 
  ShieldCheck,
  Thermometer,
  Clock,
  ArrowRight
} from 'lucide-react';

export const LogisticsStorageView: React.FC = () => {
  const { logisticsVehicles, storageFacilities, bookLogistics, bookStorage, t } = useApp();
  const [activeTab, setActiveTab] = useState<'transport' | 'storage'>('transport');
  const [storageDays, setStorageDays] = useState<number>(3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-6 pb-24">
      {/* Header & Tab Toggle */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline font-black text-2xl text-agri-ink">
            {t.quickLogistics}
          </h2>
          <p className="text-xs text-agri-muted mt-1">
            Verified farm-gate transportation and temperature-controlled storage discovery
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="flex bg-agri-sand p-1 rounded-2xl border border-agri-border self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'transport'
                ? 'bg-agri-primary text-white shadow-xs'
                : 'text-agri-muted hover:text-agri-ink'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Vehicles ({logisticsVehicles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'storage'
                ? 'bg-agri-primary text-white shadow-xs'
                : 'text-agri-muted hover:text-agri-ink'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Storage ({storageFacilities.length})</span>
          </button>
        </div>
      </div>

      {/* 1. TRANSPORT VEHICLES */}
      {activeTab === 'transport' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-agri-muted uppercase tracking-wider">
              Available Farm Pickup Fleets (Coimbatore Cluster)
            </h3>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> GPS Tracked & Verified Drivers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logisticsVehicles.map((v) => (
              <div
                key={v.id}
                className="agri-card p-5 bg-white border border-agri-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full">
                        {v.type}
                      </span>
                      <h4 className="font-headline font-bold text-base text-agri-ink mt-2">
                        {v.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-agri-primary">₹{v.base_fare}</span>
                      <span className="text-[10px] text-agri-muted"> base fare</span>
                      <div className="text-[10px] text-stone-500 font-semibold">+₹{v.per_km_rate}/km</div>
                    </div>
                  </div>

                  {/* Driver Info Strip */}
                  <div className="mt-4 p-3 bg-agri-sand/60 rounded-2xl border border-agri-border space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-agri-ink">Driver: {v.driver_name}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-current" /> {v.rating}
                      </span>
                    </div>
                    <div className="flex justify-between text-agri-muted text-[11px]">
                      <span>Capacity: {v.capacity_kg} kg</span>
                      <span className="text-emerald-700 font-semibold">{v.available_time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-600 pt-1 font-mono">
                      <Phone className="w-3 h-3 text-agri-primary" /> {v.driver_phone}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-agri-border flex items-center justify-between">
                  <span className="text-[11px] text-agri-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-agri-primary" /> 20 min pickup arrival
                  </span>
                  <button
                    onClick={() => bookLogistics(v.id)}
                    className="farmer-tap-btn !min-h-[40px] px-4 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <span>Book Pickup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STORAGE FACILITIES */}
      {activeTab === 'storage' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-agri-muted uppercase tracking-wider">
              Nearby Certified Cold Storages & Warehouses
            </h3>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <Thermometer className="w-4 h-4" /> Spoilage Protection Included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageFacilities.map((s) => (
              <div
                key={s.id}
                className="agri-card p-5 bg-white border border-agri-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        s.type === 'Cold Storage' ? 'bg-cyan-100 text-cyan-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {s.type}
                      </span>
                      <h4 className="font-headline font-bold text-base text-agri-ink mt-2">
                        {s.name}
                      </h4>
                      <p className="text-xs text-agri-muted mt-0.5">
                        📍 {s.location} • {s.distance_km} km away
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-emerald-700">₹{s.rate_per_kg_per_day}</span>
                      <div className="text-[10px] text-agri-muted">/ kg / day</div>
                    </div>
                  </div>

                  {/* Conditions Details */}
                  <div className="mt-4 p-3 bg-agri-sand/60 rounded-2xl border border-agri-border space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-agri-muted">Temperature:</span>
                      <span className="font-bold text-agri-ink">{s.temperature_celsius}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-muted">Humidity:</span>
                      <span className="font-bold text-agri-ink">{s.humidity_pct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agri-muted">Available Space:</span>
                      <span className="font-extrabold text-emerald-700">{s.available_capacity_tonnes} Tonnes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-agri-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-agri-muted">
                    <span>Days:</span>
                    <select
                      value={storageDays}
                      onChange={(e) => setStorageDays(Number(e.target.value))}
                      className="bg-agri-sand border border-agri-border rounded-lg px-2 py-1 text-xs font-bold text-agri-ink focus:outline-none"
                    >
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={5}>5 Days</option>
                      <option value={7}>7 Days</option>
                    </select>
                  </div>

                  <button
                    onClick={() => bookStorage(s.id, storageDays)}
                    className="farmer-tap-btn !min-h-[40px] px-4 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <span>Reserve Space</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
