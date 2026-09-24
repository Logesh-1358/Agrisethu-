import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { POPULAR_CROPS } from '../../data/mockData';
import { DigitalLot } from '../../types';
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  MapPin
} from 'lucide-react';

interface LotCreationWizardProps {
  onComplete?: () => void;
}

export const LotCreationWizard: React.FC<LotCreationWizardProps> = ({ onComplete }) => {
  const { t, language, farmer, addLot } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedCrop, setSelectedCrop] = useState(POPULAR_CROPS[0]);
  const [quantityKg, setQuantityKg] = useState<number>(1000);
  const [grade, setGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');
  const [moisturePct, setMoisturePct] = useState<number>(12);
  const [damagePct, setDamagePct] = useState<number>(1.5);
  const [harvestDate, setHarvestDate] = useState<string>('2026-09-07');
  const [availableFrom, setAvailableFrom] = useState<string>('2026-09-08');
  const [pickupLocation, setPickupLocation] = useState<string>(`${farmer.village}, ${farmer.district}`);
  const [selectedImage, setSelectedImage] = useState<string>(POPULAR_CROPS[0].photo);
  const [expectedPrice, setExpectedPrice] = useState<number>(POPULAR_CROPS[0].defaultPrice);
  const [storageAvailable, setStorageAvailable] = useState<boolean>(false);
  const [certification, setCertification] = useState<'Jaivik Bharat' | 'Organic India' | 'GlobalGAP' | 'Conventional / None'>('Jaivik Bharat');

  const totalSteps = 8;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinalSubmit = () => {
    const lotId = `LOT${Math.floor(10020 + Math.random() * 8900)}`;

    const newLot: DigitalLot = {
      lot_id: lotId,
      farmer_fpo: farmer.name,
      crop: `${selectedCrop.name_en} (${(selectedCrop as any)[`name_${language}`] || selectedCrop.name_en})`,
      crop_icon: selectedCrop.icon,
      quantity_kg: quantityKg,
      quantity_tons: Math.round((quantityKg / 1000) * 10) / 10,
      quality: grade,
      quality_details: {
        grade: grade,
        moisture_pct: moisturePct,
        size_mm: 'Standard Uniform',
        color_uniformity: 'Prime Quality',
        damage_pct: damagePct
      },
      harvest_date: harvestDate,
      location: pickupLocation,
      expected_price: expectedPrice,
      available_from: availableFrom,
      certification: certification,
      images: [selectedImage],
      status: 'Available',
      storage_available: storageAvailable,
      created_at: new Date().toISOString().split('T')[0]
    };

    addLot(newLot);
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-agri-border shadow-elevated p-5 sm:p-7 space-y-6">
      {/* Step Progress Header */}
      <div>
        <div className="flex items-center justify-between text-xs font-black text-agri-muted mb-2 uppercase tracking-wider">
          <span>Step {step} of {totalSteps}</span>
          <span className="text-agri-primary font-black">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-agri-sand h-3 rounded-full overflow-hidden border border-agri-border">
          <div 
            className="bg-gradient-to-r from-agri-primary to-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: WHAT DID YOU GROW? */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              🌾 Step 1: What did you grow?
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Select the harvested agricultural produce
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {POPULAR_CROPS.map((crop) => {
              const isSelected = selectedCrop.id === crop.id;
              const localizedName = (crop as any)[`name_${language}`] || crop.name_en;

              return (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCrop(crop);
                    setExpectedPrice(crop.defaultPrice);
                    setSelectedImage(crop.photo);
                  }}
                  className={`farmer-tap-btn !min-h-[110px] p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                    isSelected
                      ? 'border-agri-primary bg-agri-primaryLight ring-2 ring-agri-primary/20 shadow-sm'
                      : 'border-agri-border bg-[#FAF7EF] hover:border-agri-primary/40'
                  }`}
                >
                  <span className="text-3xl mb-1">{crop.icon}</span>
                  <span className="font-headline font-bold text-xs text-agri-ink">{crop.name_en}</span>
                  <span className="text-[10px] text-agri-muted font-semibold">{localizedName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: HOW MUCH QUANTITY? */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              ⚖️ Step 2: How much quantity?
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Enter harvest quantity in kilograms (1,000 kg = 1 Ton)
            </p>
          </div>

          <div className="p-6 bg-[#FAF7EF] rounded-3xl border border-agri-border flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantityKg(Math.max(100, quantityKg - 250))}
                className="w-12 h-12 rounded-2xl bg-white border border-agri-border shadow-xs text-xl font-bold flex items-center justify-center hover:bg-stone-50"
              >
                <Minus className="w-5 h-5 text-agri-primary" />
              </button>

              <div className="text-center">
                <input
                  type="number"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-36 text-center font-headline font-black text-4xl text-agri-ink bg-transparent focus:outline-none"
                />
                <span className="text-sm font-bold text-agri-muted block mt-1">
                  KILOGRAMS ({Math.round((quantityKg / 1000) * 10) / 10} Tons)
                </span>
              </div>

              <button
                onClick={() => setQuantityKg(quantityKg + 250)}
                className="w-12 h-12 rounded-2xl bg-white border border-agri-border shadow-xs text-xl font-bold flex items-center justify-center hover:bg-stone-50"
              >
                <Plus className="w-5 h-5 text-agri-primary" />
              </button>
            </div>

            <div className="flex gap-2">
              {[500, 1000, 2000, 5000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setQuantityKg(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    quantityKg === preset
                      ? 'bg-agri-primary text-white border-agri-primary'
                      : 'bg-white text-stone-600 border-agri-border hover:bg-agri-sand'
                  }`}
                >
                  {preset} kg
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: QUALITY & GRADE */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              ⭐ Step 3: Produce Quality & Grade
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Grade determines matching institutional buyer pricing
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['Grade A', 'Grade B', 'Grade C'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  grade === g
                    ? 'border-agri-primary bg-agri-primaryLight ring-2 ring-agri-primary/20 shadow-sm'
                    : 'border-agri-border bg-[#FAF7EF]'
                }`}
              >
                <div className="text-xl mb-1">{g === 'Grade A' ? '🥇' : g === 'Grade B' ? '🥈' : '🥉'}</div>
                <div className="font-black text-sm text-agri-ink">{g}</div>
                <div className="text-[10px] text-agri-muted mt-0.5">
                  {g === 'Grade A' ? 'Premium Export' : g === 'Grade B' ? 'Standard Wholesale' : 'Processing Grade'}
                </div>
              </button>
            ))}
          </div>

          {/* Quality Sliders */}
          <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-stone-700">
                <span>Moisture Content (%):</span>
                <span>{moisturePct}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="25"
                value={moisturePct}
                onChange={(e) => setMoisturePct(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg accent-agri-primary mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-700">
                <span>Damage / Blemish Tolerance (%):</span>
                <span>{damagePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={damagePct}
                onChange={(e) => setDamagePct(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg accent-agri-primary mt-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: HARVEST DATES */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              📅 Step 4: Harvest & Dispatch Dates
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              When was it harvested and when is it ready for vehicle pickup?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-2">
              <label className="text-xs font-bold text-agri-muted uppercase">Harvest Date</label>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-agri-border rounded-xl font-bold text-sm text-agri-ink focus:outline-none"
              />
            </div>

            <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-2">
              <label className="text-xs font-bold text-agri-muted uppercase">Ready for Pickup</label>
              <input
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full p-2.5 bg-white border border-agri-border rounded-xl font-bold text-sm text-agri-ink focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: PICKUP LOCATION */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              📍 Step 5: Farm Pickup Location
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Driver will arrive at this farm gate coordinate
            </p>
          </div>

          <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-agri-border space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-agri-primary" />
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2.5 bg-white border border-agri-border rounded-xl font-bold text-sm text-agri-ink focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold">
              ✓ GPS Location tagged to your registered land parcel
            </p>
          </div>
        </div>
      )}

      {/* STEP 6: CROP PHOTOS */}
      {step === 6 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              📷 Step 6: Produce Photos
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Transparent photos build buyer trust score and reduce rejection
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-dashed border-agri-border relative bg-stone-100 flex items-center justify-center">
              <img src={selectedImage} alt="Crop" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                Verified Photo
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedImage(selectedCrop.photo)}
                className="px-3 py-1.5 bg-agri-sand hover:bg-agri-border text-agri-ink text-xs font-bold rounded-xl border border-agri-border"
              >
                Sample Harvest
              </button>
              <button
                onClick={() => setSelectedImage('https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80')}
                className="px-3 py-1.5 bg-agri-sand hover:bg-agri-border text-agri-ink text-xs font-bold rounded-xl border border-agri-border"
              >
                Crates Pack
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: EXPECTED PRICE */}
      {step === 7 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              💰 Step 7: Expected Price (₹/kg)
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Minimum acceptable price per kilogram
            </p>
          </div>

          <div className="p-6 bg-[#FAF7EF] rounded-3xl border border-agri-border flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 font-headline font-black text-4xl text-agri-primary">
              <span>₹</span>
              <input
                type="number"
                step="0.5"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(Number(e.target.value))}
                className="w-28 text-center bg-transparent border-b-2 border-agri-primary focus:outline-none"
              />
              <span className="text-sm font-bold text-agri-muted">/ kg</span>
            </div>

            <p className="text-xs text-agri-muted font-bold">
              Total Expected Value: ₹{(expectedPrice * quantityKg).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* STEP 8: STORAGE & CONFIRMATION */}
      {step === 8 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-black text-xl text-agri-ink">
              🏪 Step 8: Storage & Confirmation
            </h3>
            <p className="text-xs text-agri-muted mt-0.5">
              Do you have farm storage available if price is rising?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStorageAvailable(true)}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${
                storageAvailable ? 'border-agri-primary bg-agri-primaryLight font-black' : 'border-agri-border bg-[#FAF7EF]'
              }`}
            >
              <span className="text-2xl block mb-1">🏪</span>
              <span className="text-xs font-bold">YES, I have storage</span>
            </button>
            <button
              onClick={() => setStorageAvailable(false)}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${
                !storageAvailable ? 'border-agri-primary bg-agri-primaryLight font-black' : 'border-agri-border bg-[#FAF7EF]'
              }`}
            >
              <span className="text-2xl block mb-1">🚚</span>
              <span className="text-xs font-bold">NO, direct pickup needed</span>
            </button>
          </div>

          {/* Review Summary */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-1.5 text-xs">
            <span className="font-extrabold text-emerald-950 uppercase">Lot Summary Preview:</span>
            <div className="flex justify-between">
              <span>Crop:</span>
              <span className="font-bold">{selectedCrop.name_en} ({grade})</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-bold">{quantityKg.toLocaleString('en-IN')} kg ({Math.round(quantityKg/1000)} Tons)</span>
            </div>
            <div className="flex justify-between">
              <span>Expected Rate:</span>
              <span className="font-bold">₹{expectedPrice}/kg</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup:</span>
              <span className="font-bold">{pickupLocation}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-agri-border">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className="farmer-tap-btn !min-h-[46px] px-5 py-2 border border-agri-border rounded-xl text-xs font-bold text-agri-ink hover:bg-stone-50 disabled:opacity-30 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="farmer-tap-btn !min-h-[46px] px-6 py-2 bg-agri-primary hover:bg-agri-primaryDark text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <span>{step === totalSteps ? 'Publish Digital Lot 🚀' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
