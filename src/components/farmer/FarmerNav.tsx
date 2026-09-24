import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  PlusCircle, 
  TrendingUp, 
  Tag, 
  Clock, 
  Truck, 
  User 
} from 'lucide-react';
import { FarmerTab } from '../../types';

export const FarmerNav: React.FC = () => {
  const { farmerTab, setFarmerTab, t, offers } = useApp();

  const pendingOffersCount = offers.filter((o) => o.status === 'Pending').length;

  const navItems: { id: FarmerTab; label: string; icon: any; badge: number | null }[] = [
    { id: 'home', label: t.navHome, icon: Home, badge: null },
    { id: 'sell', label: t.navSell, icon: PlusCircle, badge: null },
    { id: 'markets', label: t.navMarkets, icon: TrendingUp, badge: null },
    { id: 'offers', label: t.navOffers, icon: Tag, badge: pendingOffersCount > 0 ? pendingOffersCount : null },
    { id: 'sell-window', label: t.navSellWindow, icon: Clock, badge: null },
    { id: 'logistics', label: t.navLogistics, icon: Truck, badge: null },
    { id: 'profile', label: t.navProfile, icon: User, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-agri-border shadow-elevated">
      <div className="max-w-2xl mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = farmerTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setFarmerTab(item.id)}
              className={`farmer-tap-btn !min-h-[54px] flex-1 flex flex-col items-center justify-center relative rounded-2xl transition-all ${
                isActive
                  ? 'text-agri-primary font-bold bg-agri-primaryLight/80'
                  : 'text-agri-muted hover:text-agri-ink'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-agri-red text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 truncate max-w-[65px] ${isActive ? 'font-extrabold text-agri-primary' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
