import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { FarmerHome } from './components/farmer/FarmerHome';
import { FarmerOffers } from './components/farmer/FarmerOffers';
import { FarmerProfile } from './components/farmer/FarmerProfile';
import { FarmerNav } from './components/farmer/FarmerNav';
import { LotCreationWizard } from './components/farmer/LotCreationWizard';
import { MarketIntelligenceView } from './components/farmer/MarketIntelligenceView';
import { SmartSellWindowView } from './components/farmer/SmartSellWindowView';
import { LogisticsStorageView } from './components/farmer/LogisticsStorageView';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FPODashboard } from './components/fpo/FPODashboard';
import { JudgeModeView } from './components/judge/JudgeModeView';
import { LandingPage } from './components/landing/LandingPage';
import { AIAssistantModal } from './components/common/AIAssistantModal';
import { SIHDemoRunnerModal } from './components/common/SIHDemoRunnerModal';

const MainContent: React.FC = () => {
  const { role, farmerTab, setFarmerTab, isLandingPageOpen, t } = useApp();

  if (isLandingPageOpen) {
    return (
      <div className="min-h-screen bg-[#FAF7EF] text-[#22281F] flex flex-col font-sans">
        <Header />
        <LandingPage />
        <AIAssistantModal />
        <SIHDemoRunnerModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#22281F] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* FARMER ROLE */}
        {role === 'farmer' && (
          <div>
            {farmerTab === 'home' && <FarmerHome />}
            {farmerTab === 'sell' && (
              <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
                <LotCreationWizard onComplete={() => setFarmerTab('home')} />
              </div>
            )}
            {farmerTab === 'markets' && <MarketIntelligenceView />}
            {farmerTab === 'offers' && <FarmerOffers />}
            {farmerTab === 'sell-window' && <SmartSellWindowView />}
            {farmerTab === 'logistics' && <LogisticsStorageView />}
            {farmerTab === 'profile' && <FarmerProfile />}

            {/* Bottom Nav Bar for Farmer */}
            <FarmerNav />
          </div>
        )}

        {/* FPO ROLE */}
        {role === 'fpo' && <FPODashboard />}

        {/* BUYER ROLE */}
        {role === 'buyer' && <BuyerDashboard />}

        {/* ADMIN ROLE */}
        {role === 'admin' && <AdminDashboard />}

        {/* JUDGE MODE */}
        {role === 'judge' && <JudgeModeView />}
      </main>

      {/* Global Modals */}
      <AIAssistantModal />
      <SIHDemoRunnerModal />

      {/* Footer */}
      <footer className="bg-white border-t border-agri-border py-4 text-center text-xs text-agri-muted mb-16 sm:mb-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-extrabold text-agri-ink flex items-center gap-1.5">
            <span>🌾 + 🔗 {t.appName}</span>
            <span className="text-agri-muted font-normal">• {t.tagline}</span>
          </p>
          <p className="text-[11px] text-stone-500">
            Smart India Hackathon (SIH) 2026 Protocol • Verified Direct Procurement
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
