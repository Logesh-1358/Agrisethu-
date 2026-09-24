import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Maximize2, 
  Edit3, 
  Check, 
  Globe,
  Award
} from 'lucide-react';
import { Language } from '../../types';

export const FarmerProfile: React.FC = () => {
  const { farmer, setFarmer, language, setLanguage, t } = useApp();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState(farmer.name);
  const [editPhone, setEditPhone] = useState(farmer.phone);
  const [editVillage, setEditVillage] = useState(farmer.village);
  const [editLand, setEditLand] = useState(farmer.land_acres);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇮🇳' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmer((prev) => ({
      ...prev,
      name: editName,
      phone: editPhone,
      village: editVillage,
      land_acres: Number(editLand)
    }));
    setIsEditing(false);
  };

  const toggleVerification = () => {
    setFarmer((prev) => ({
      ...prev,
      status: prev.status === 'Verified' ? 'Pending' : 'Verified'
    }));
  };

  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto px-4 pt-4">
      {/* Profile Header & KYC Badge */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-agri-primary to-emerald-900 text-white flex items-center justify-center text-3xl shadow-md border-2 border-white">
            👨‍🌾
          </div>

          <div className="space-y-1">
            <h2 className="font-headline font-black text-xl text-agri-ink">
              {farmer.name}
            </h2>
            <div className="flex items-center gap-2">
              {farmer.status === 'Verified' ? (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-0.5 rounded-full text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> ✅ {t.verifiedBadge}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full text-xs font-bold shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-700" /> ⏳ {t.pendingBadge}
                </span>
              )}

              <button
                onClick={toggleVerification}
                className="text-[10px] text-agri-muted underline hover:text-agri-ink ml-1"
                title="Status toggle for testing"
              >
                (Toggle KYC)
              </button>
            </div>
          </div>
        </div>

        {/* Verification Alert Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-agri-sand/60 border border-agri-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-agri-primary" />
            <span className="text-agri-ink font-semibold">
              Farmer ID: <strong className="font-mono">{farmer.id}</strong>
            </span>
          </div>
          <span className="text-emerald-700 font-extrabold">✓ 7/12 Land Record Linked</span>
        </div>
      </div>

      {/* Profile Details Form / Display */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-base text-agri-ink">
            Farmer KYC Record
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-agri-primary font-bold flex items-center gap-1 hover:underline"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {!isEditing ? (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-agri-sand/40 border border-agri-border">
              <span className="text-agri-muted flex items-center gap-2">
                <MapPin className="w-4 h-4 text-agri-primary" /> Village & District:
              </span>
              <span className="font-bold text-agri-ink">{farmer.village}, {farmer.district}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-agri-sand/40 border border-agri-border">
              <span className="text-agri-muted flex items-center gap-2">
                <Phone className="w-4 h-4 text-agri-primary" /> Mobile Number:
              </span>
              <span className="font-bold text-agri-ink font-mono">{farmer.phone}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-agri-sand/40 border border-agri-border">
              <span className="text-agri-muted flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-agri-primary" /> Registered Farmland:
              </span>
              <span className="font-bold text-agri-ink text-sm">{farmer.land_acres} Acres</span>
            </div>

            {farmer.cropSpeciality && (
              <div className="p-3 rounded-xl bg-agri-sand/40 border border-agri-border space-y-1">
                <span className="text-agri-muted block">Speciality Crops:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {farmer.cropSpeciality.map((crp, idx) => (
                    <span key={idx} className="bg-white border border-agri-border text-agri-ink px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                      {crp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block text-agri-muted font-bold mb-1">Full Name:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-agri-border bg-white text-xs font-bold text-agri-ink"
                required
              />
            </div>

            <div>
              <label className="block text-agri-muted font-bold mb-1">Mobile:</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-agri-border bg-white text-xs font-bold text-agri-ink"
                required
              />
            </div>

            <div>
              <label className="block text-agri-muted font-bold mb-1">Village:</label>
              <input
                type="text"
                value={editVillage}
                onChange={(e) => setEditVillage(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-agri-border bg-white text-xs font-bold text-agri-ink"
                required
              />
            </div>

            <div>
              <label className="block text-agri-muted font-bold mb-1">Land (Acres):</label>
              <input
                type="number"
                step="0.1"
                value={editLand}
                onChange={(e) => setEditLand(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl border border-agri-border bg-white text-xs font-bold text-agri-ink"
                required
              />
            </div>

            <button
              type="submit"
              className="farmer-tap-btn !min-h-[48px] w-full bg-agri-primary text-white font-bold rounded-xl mt-2 flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Details</span>
            </button>
          </form>
        )}
      </div>

      {/* 6-Language Preference Card */}
      <div className="bg-white p-5 rounded-3xl border border-agri-border shadow-soft space-y-3">
        <h3 className="font-headline font-bold text-base text-agri-ink flex items-center gap-2">
          <Globe className="w-4 h-4 text-agri-primary" /> Choose Language / மொழி தேர்வு
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`farmer-tap-btn !min-h-[48px] rounded-xl text-xs font-bold border transition-all ${
                language === l.code
                  ? 'bg-agri-primary text-white border-agri-primary shadow-xs'
                  : 'bg-white text-agri-ink border-agri-border hover:bg-agri-sand'
              }`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kisan Helpline Assistance */}
      <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <div className="font-bold">Kisan Call Centre (Toll-Free)</div>
            <div className="text-[11px] text-emerald-800">1800-180-1551 (06:00 AM to 10:00 PM)</div>
          </div>
        </div>
        <a
          href="tel:18001801551"
          className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl font-bold text-[11px] shadow-xs"
        >
          Call Now
        </a>
      </div>
    </div>
  );
};
