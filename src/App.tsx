/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Compass, 
  Search as SearchIcon, 
  Bookmark, 
  User, 
  Menu, 
  ChevronRight, 
  Star, 
  Edit, 
  Settings, 
  Bell, 
  ShieldCheck, 
  LogOut,
  MapPin,
  Plus,
  Camera,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'discover' | 'search' | 'favorites' | 'profile' | 'detail' | 'rate' | 'add-restaurant';

const IMAGES = {
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs_VlYV0WsfcQ0GpzSn_Z6Xp6CtLoz0Mm4gj9_n0xJzRNtUSe8W2RatWHuqYjOQtHSPurxBvYQCCAF3yE1S7l3xVeRHkrlRpuG1iCKED-MxCDG8dcsipGfV5eidN49Ew7YWHNc6DsBGmfgN-oBUINPm13-T27xRVLCyDgPFk8n58vtuH71TfIF7mBX214qhz0j4IAt2YQMdudVCzqjmzke_3zuZqEAOBVqPl5hI3sdIz1lVDW5nnP3A_JWuUAwxMPzxD6P2nmBco0R",
  goldenWhisk: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrlIbbc8-sDuA-QwJ4HCRP__wzc_FjOu1B3rammALDthM80HtfQy6O2caKzj45oEmGXO37tA-PWkpOP9AeA3RbO9lMXNHKOClyMVC8ofsxpUDhkmibMlbqWzaNNgcW-zICa8is18fUNruRHo7R-eNaBICdHEIwDmOdIK1COhbDZjjkokjor5AqDZkUrx5h88qOChWdxKQzogzBQCMu95ZY4Xp4eMtso1XBDuQa_Ytj3iwlYBmzlFpUcxQuuu7JtnkdZXrcUIgQtTD",
  omeletteLab: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvarL-uH_W2KmQ6W15Y1DybsMJQsKGevywao67KIsdmMAaIePY3rgUArXQ1OpFu0sBjYdYPLB7gXkPeDTiSS4Ivr4s5POEYTuaFxEuc5IOJ3exFSnpMQzVSl3r4nsCcSoi5f7eUVwuk8pXSWFJhfT-fswTEP7MiDiP1wV1-hTpJJlQI6snmMH2vbkgyzwgiNbmyF-ZdE8DdXYrNOPYv2erYHRLDEIwhS-amsq7ah4NazUfpUU0IhOzCBxriaxtHnp3OhypPndTnzgj",
  roastRitual: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmrmBQEIhW8nXLQr5m51xG3av5oW6Pgx9J7A84YnMmBSochCyugOj03h5Zegw_KyzmOXrBcQzAPjaquUPPZ2rU_gHLbab_72yfMSpf9-yR0XotrOLChhJX7ELxEtZgE9kBV6rbX-cUqOMlI4SOw89DSIueGfTqaLWe_vC6isLxTR--OTjmyW1nYMz8bfZBUjm9G1zSEcZL8uPTqpvdmqnwE1M_pXk-6tYJB_QOJGR0cpLrhfCtFVB-NRd2iYoGP8D-bo8Sdh8BtQy7",
  amberRoast: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB1m0U9n-toADv52El2ATPitxcaapumpN4k48guoqxo22iO3et1Gm9VkoHPoKOuOaWbgUqLajlMTWX3OHcHV_-E4Yy0WehTVkN6MpKnfU-vSl-yymHPLFjKTH8rTxgcicNOr8LTL3XJPwAkZOaUJojIrxufrRtEpGe_3ohcXWpFk1EFLXVsEfZdDETBwaApTl9ebqvrB-2zMEc1JrB4JKX9Dy9RMrTs_TVu1MzSnYwqyZhLgqlc6-yXDzAmJiUmGc4c-GFjL3Da3wy",
  gildedEgg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO0LZ00wRNEcU-2YI1Nt2WivvJucoMZiO8M3Ii8vTbLnNh6ZIMF8pERXNaXJ8arrELZ7vaQG8iU11xtbttL6zPnNF9p3eMyZJ7essBxS2uRUMR5R4fL38lvKNBVMjOt0vTQARIoLlP8mkGid7VoAFq0j70GFCNCod9YSMObZmhOwurpxxdh9CFk4UNpp9W-s-Cr08PhK_XaagGdG7Rq4vsszQk7HKjGyU1dOSwtu05TwTRP02XaK7MffLATe1rIpHumP0GASRiwhZy",
  petiteBoulangerie: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrRaoOp8ALljqyodvGnO3DqsA0V61akErH3o3jp9Ohd3uI4cgiFKoiHUUnUfllA3cXDt_NROvuN6T__AwZLaGAkIE6m4A7-Clzs_E3e6sDDzhK-R4omoQUKDssuu7g4g9LzLo9G-QTl1QS0jCqjmgsW-bG-qUtfNPKt1UHEN16EtQLOiAAcoKLM4BlStbsYcrW0hv4VwkY0Dx_8nWghUBJudqQkC88PNM1taWMxHv3M1ZUnLEb4LXuq7Vl7SRq2wpMiwMjr7LZk62G",
  originsBar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOYw7Q3ZOyV1ZkZzQxHa1e0HYFgjcjj-2n1YSuw8Roo3iYpP6goWNKyyOaTafnRcpOuZ-OeK2dojkxS1vokzsnPbQmooR6D-jwXGIWtsyd7XNnFwdhVM0REFMqJdK88zKiQ9TwiVw4bJlUQtCqtvr5EvoId_r_B3FSuEE3dU5FlU1WuM3-CPyNDPXMtbr2VPb2ayPznKtC-Q8Y7WEyXdJDKEZq7jqLdQahTl8brd4zcQs9D74CosPpcU9U0S4L3r8kea30i5Ykxr1S",
  lumiereHero: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_Ye7E6PUf3W1SUzXeGO9TmIGM6EpAAwhm-YTzsd2QodS0BqhlIoZm9wLe7kQbHFyJdcrhmOYjEOxenrrY-syhB3V1xMB0P-aqldEiRKURW0tncC1SywW6GDF9_JRbgMAirUcwaM8dJBvO3IDj8y1d0EKAgM_aaCihano0mz3KcwHqcDww84UiUvwTDjskgUVVJeFNOvfDwQhxF1GB_rHfFB2MdMqx79kL9t5OuqRi8PsgUSNqNDyElrTgmRiCBQpJG74Ko8lVG3-u",
  poachedEgg: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-KCFPWmEjDwKdKMcTBJ5WEkx189x6rHioACwnxO9XB0wXWWmdal8OfqKIqkselCf_15D5New_z4Z6Fbzyq2XgddcWfKTEYUumWDnBcdDSUWluT3x9fmzXcKmyAh5dj7ueSdTH-dR4bew0JbqzRE1XzZAUEeGrDXG1pC0TLCAWpCjYZ67W23dAPVChrVOedaYaZFnHStpzIWDCDX2DOT8immafTwRb-TA66D75U9jl0Ah9BiYXr08uJ_FEgGm_2LwsxE8HgJ9LZzMR",
  userElena: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZFRnbo_pXjRvRDquvTKxVs9_lIym9Ovsnq4Yx0vgPVWqIBe7fq-W5r1ZzeUdw8TgEKq7nwhXvCg0Vqa74AhtOwfoe_HuG-RXdxJA9JUIG5XosL0GvyD3Y9c2szgXKjUS5tstO9jNiGBXSsjCVSURmwYTf_6sE-xm0-_Tcu37E7pCvHCQ0nsxLM6e16xgVrfkFu9HEMD57guzDsdXMkErdpCFqlPk_4uhW6i83GUwM86FQeZ_veEz8lSQOeel7foJX7tQcd2aWFv8K",
  userMarcus: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvZLD_GV_rZ4nzdFeJqXRXEBhHs7t5VSELg37cCNFIIoShSzDVYISD70pnvXq0RK2rKRUayBEnbYf6XT3KM0BcX1vAg1C97bBnOFVfeP6A6ka-IeDHVIKiOL6Oq1H-EcPJTkfg29wL62H9bZVW7jjBwRGRBmFn7ECAvgFwHCZXno6OxAaP9orCyLHxtWpL6m3coTyiYK81McdSbWy2EEftluziYBwGn6kqi5FsPZvgT75uxBAM_S0gKgbN4nthAK0rTbqIKbulT9FK",
  lAube: "https://lh3.googleusercontent.com/aida-public/AB6AXuCft4HoRO9QvQNmZlwkwUX2twOjFe2j8ONRJ5NCiS93WIxxxxOcgNRY9hcLDbbAhCKwPTkRTmLScjo4vm7bxlnWPIOWYHiGrGEmLqQP1wrNYvSKobd3W6j4M7fkuqjrbndoX2rhywPEIA8VuIUJJvackEcUAP1ppuC09d4PIU_XyavcUdVIKtmOexZXaquFr17R74aEGlhPLiS8H5S9FXvuCIB3ooW0Yz_rVy7uDXSym8dkEWu-sfwnOyrFfq3YaBSz1BZUgOHRG6Po",
  alchemist: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsf12qMcj_IWu5dJvOLoWVVxYhnKkuYpq8CRmwHRMlPUbFCSGjmFnSE_IKY30_bbTaCniP9dlrmC12-MNEZnBEGHKS7s9FKlzByObeIyfriFnpEagGzxS1gx-rVQPCR0gyt93b3pQKNVBrcZsom3g1jP4KE6rTLPi0nURFMM13_qhyq-Z7eb7Tp-G0Jp4uJ3y7HuwKcLBh_3Eq_E7GIIhfMQopsBg-RAHyQ5koLYLiAJ83XSY8Q46_JxNtoiufl_s3SkNrJbM_Fty_",
  botanical: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkbwHroxRbLNXBf5NOheFzM0nq0aZmKC4scSLLgkrAv9onbMc0PFLp-9jstEBwv7RyYwSZoIiboKyN7MXTSfEHscDCRajSIvLBcZ_2aPJgyqyObDFXX145gR78wqKV1xIDQYfnXKl7crdJ6KmyqPjuyblkk7HWJlpAisyfEA159eWpNirXqHi4Tm9_FnZVDCONGqpivClJxProuLfo3fuzQ_p7oZ1ZQUsn3T7DRO8TJdla8jV1_p-K9lgwn45q6CXXO8CQHOa4E8dm",
  ironEmber: "https://lh3.googleusercontent.com/aida-public/AB6AXuD--SZZQxKTcEkM5hw_JYcCl6-y_bfsHjqjDtPQFFwklNVXP30FovUCTdX5bCVrqEy6h_hKfDbs1JOjFaMbyC0NY95aI3mjCdkxTWwenfku49ClWQ6Z3IL-UagFyi9GnN9wgUnbX8ukaSCPPkjb0U8vig4HYiu5fwvfk6cb1xRioPicmHWeI7UekU_HZcjbvwn4oyKFmfvibTjwUCNXPdoouB5GetaBw08HArxEuxJwIAg-yZXs2ArUq0LWRi1plLGFn_UqqiZK9YSi"
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('discover');

  const renderContent = () => {
    switch (currentView) {
      case 'discover': return <DiscoverView onSelect={() => setCurrentView('detail')} />;
      case 'search': return <SearchView onSelect={() => setCurrentView('detail')} />;
      case 'profile': return <ProfileView />;
      case 'favorites': return <FavoritesView />;
      case 'detail': return <DetailView onBack={() => setCurrentView('discover')} onRate={() => setCurrentView('rate')} />;
      case 'rate': return <RateView onBack={() => setCurrentView('detail')} />;
      case 'add-restaurant': return <AddRestaurantView onBack={() => setCurrentView('discover')} />;
      default: return <DiscoverView onSelect={() => setCurrentView('detail')} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-center">
        <div className="max-w-[1100px] w-full px-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-primary cursor-pointer active:scale-95 transition-transform" />
            <h1 className="text-2xl font-headline font-bold text-primary">Frühstücksmäuse</h1>
          </div>
          {currentView === 'discover' && (
            <button 
              onClick={() => setCurrentView('add-restaurant')}
              className="bg-primary-container text-on-primary-container p-2 rounded-xl active:scale-90 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1100px] pt-24 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-5"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container/90 backdrop-blur-xl border-t border-white/5 pb-6 pt-3 flex justify-center">
        <div className="max-w-[1100px] w-full flex justify-around items-center px-4">
          <NavItem 
            active={currentView === 'discover'} 
            icon={Compass} 
            label="Discover" 
            onClick={() => setCurrentView('discover')} 
          />
          <NavItem 
            active={currentView === 'search'} 
            icon={SearchIcon} 
            label="Search" 
            onClick={() => setCurrentView('search')} 
          />
          <NavItem 
            active={currentView === 'favorites'} 
            icon={Bookmark} 
            label="Favorites" 
            onClick={() => setCurrentView('favorites')} 
          />
          <NavItem 
            active={currentView === 'profile'} 
            icon={User} 
            label="Profile" 
            onClick={() => setCurrentView('profile')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 ${active ? 'text-primary-container bg-white/5 rounded-xl px-4 py-1' : 'text-on-surface-variant opacity-60'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
      <span className="text-[10px] font-bold tracking-wider uppercase font-sans">{label}</span>
    </button>
  );
}

function DiscoverView({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold">Wo die Mäuse waren</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border-dashed">
        <div className="bg-primary-container/10 p-6 rounded-full mb-6">
          <MapPin className="w-12 h-12 text-primary-container opacity-40" />
        </div>
        <h3 className="text-xl font-headline font-bold">Keine Rituale gefunden</h3>
        <p className="text-on-surface-variant max-w-[280px] mt-2">
          Sei die erste Maus! Füge ein neues Lokal hinzu und teile dein Frühstücks-Ritual.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">In deiner Nähe</h2>
        <p className="text-on-surface-variant italic text-sm">Suche nach Lokalen um zu starten...</p>
      </div>
    </div>
  );
}

function SearchView({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Find your morning flavor..." 
          className="w-full h-14 pl-12 pr-4 bg-surface-container rounded-2xl border border-white/5 outline-none focus:border-primary-container/50 transition-all text-lg"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {['Nearby', 'Top Rated', 'Open Now', 'Patisserie', 'Modern', 'Healthy'].map((chip, i) => (
          <button 
            key={i} 
            className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all glass-card text-on-surface-variant`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <SearchIcon className="w-12 h-12 text-on-surface-variant opacity-20 mb-4" />
        <p className="text-on-surface-variant">Hier gibt es noch nichts zu sehen.</p>
        <p className="text-xs text-on-surface-variant/50 mt-1 uppercase font-bold tracking-widest">Suche nach einem Ort oder füge einen hinzu</p>
      </div>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container p-1 bg-surface-container-highest shadow-2xl">
            <img src={IMAGES.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <button className="absolute bottom-1 right-1 bg-primary-container text-on-primary-container p-2 rounded-full shadow-lg active:scale-90 transition-transform">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-3xl font-headline font-bold">Julian Thorne</h2>
        <p className="text-on-surface-variant tracking-wide mt-1 uppercase text-xs font-bold">Artisanal Breakfast Connoisseur</p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-headline font-bold text-primary-container">0</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">Reviews</span>
        </div>
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-headline font-bold text-primary-container">0</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">Favorites</span>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-headline font-bold px-1">Account Settings</h3>
        <div className="space-y-2">
          {[
            { icon: Settings, label: "Account Preferences" },
            { icon: Bell, label: "Notifications" },
            { icon: ShieldCheck, label: "Privacy & Security" },
          ].map((item, i) => (
            <button key={i} className="w-full glass-card p-4 rounded-2xl flex items-center justify-between group active:scale-98 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-surface-container-high p-2 rounded-xl text-primary-container">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
          <button className="w-full glass-card p-4 rounded-2xl flex items-center text-error mt-4 active:scale-98 transition-all">
             <div className="bg-red-500/10 p-2 rounded-xl text-red-400 mr-4">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold text-red-400">Logout</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function FavoritesView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-headline font-bold">Your Favorites</h2>
      <div className="flex flex-col items-center justify-center py-32 text-center glass-card rounded-3xl">
        <Bookmark className="w-16 h-16 text-on-surface-variant opacity-10 mb-6" />
        <h3 className="text-xl font-headline font-bold">Noch keine Favoriten</h3>
        <p className="text-on-surface-variant mt-2 max-w-[240px]">
          Markiere ein Lokal mit dem Lesezeichen um es hier zu speichern.
        </p>
      </div>
    </div>
  );
}

function DetailView({ onBack, onRate }: { onBack: () => void, onRate: () => void }) {
  return (
    <div className="-mt-24 -mx-5 space-y-8 relative">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-5 h-16 pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto glass-card p-2 rounded-full text-on-surface active:scale-90 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
        <button className="pointer-events-auto glass-card p-2 rounded-full text-on-surface active:scale-90 transition-transform">
          <Bookmark className="w-6 h-6" />
        </button>
      </header>

      <section className="h-[50vh] relative overflow-hidden">
        <img src={IMAGES.lumiereHero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-6 left-5 space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary-container bg-primary-container/10 px-3 py-1 rounded-full">Artisanal Bakery & Cafe</span>
          <h2 className="text-4xl font-headline font-bold">Lumière Breakfast Club</h2>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <MapPin className="w-4 h-4" />
            <span>Copenhagen, Denmark</span>
          </div>
        </div>
      </section>

      <div className="px-5 space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
            <span className="text-5xl font-headline font-bold text-primary-container">4.9</span>
            <div className="flex gap-1 text-primary-container">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">248 REVIEWS</span>
          </div>
          
          <div className="glass-card p-6 rounded-2xl md:col-span-2 space-y-4 flex flex-col justify-center">
            {[
              { label: "Food Quality", score: 4.9, pct: '98%' },
              { label: "Service", score: 4.6, pct: '92%' },
              { label: "Ambiance", score: 4.8, pct: '96%' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold shrink-0 w-24">{stat.label}</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: stat.pct }} />
                </div>
                <span className="text-xs font-bold text-primary-container w-6 text-right">{stat.score}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold">Experience Lumière?</h3>
            <p className="text-on-surface-variant text-sm">Share your morning ritual with the community.</p>
          </div>
          <button 
            onClick={onRate}
            className="w-full md:w-auto bg-primary-container text-on-primary-container px-8 py-4 rounded-2xl font-bold tracking-[0.1em] uppercase shadow-lg shadow-primary-container/20 active:scale-95 transition-all"
          >
            Rate Now
          </button>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-headline font-bold">Latest Rituals</h3>
            <button className="text-primary-container font-bold text-sm flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Elena Thorne", img: IMAGES.userElena, time: "2 days ago", txt: "The cloud eggs here are transformative. The way the yolk breaks over the whipped whites is pure morning poetry. Exceptional service and the minimalist decor creates such a peaceful atmosphere.", rating: 5 },
              { name: "Marcus Chen", img: IMAGES.userMarcus, time: "1 week ago", txt: "A bit of a wait for a table on Saturdays, but absolutely worth it for the cold brew alone. The sourdough is fermented to perfection.", rating: 4 },
            ].map((review, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full border border-white/10" />
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{review.name}</h4>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-primary-container">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : 'opacity-20'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">{review.txt}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RateView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-10 pb-20">
       <div className="-mx-5 -mt-4 mb-8">
        <button onClick={onBack} className="p-4 flex items-center gap-2 text-primary active:scale-95 transition-all">
          <X className="w-6 h-6" />
          <span className="font-headline font-bold text-xl">Cancel Ritual</span>
        </button>
      </div>

      <header className="space-y-2">
        <h2 className="text-4xl font-headline font-bold text-primary">Submit Your Ritual</h2>
        <p className="text-on-surface-variant text-lg">Reviewing: <span className="text-primary-container font-semibold">Lumière Breakfast Club</span></p>
      </header>

      <form className="glass-card p-6 rounded-2xl space-y-12" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
        <section className="space-y-6">
          <h3 className="text-xl font-headline font-bold border-b border-white/5 pb-2 text-primary">1. Das Lokal</h3>
          <RateItem label="Ambiente" />
          <RateItem label="Geräuschpegel" />
          <RateItem label="Sitzkomfort & Platz" />
          <RateItem label="Hygiene" />
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-headline font-bold border-b border-white/5 pb-2 text-primary">2. Das Personal</h3>
          <RateItem label="Freundlichkeit" />
          <RateItem label="Kompetenz" />
          <RateItem label="Geschwindigkeit" />
          <RateItem label="Bezahlung" />
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-headline font-bold border-b border-white/5 pb-2 text-primary">3. Die Auswahl</h3>
          <RateItem label="Getränke" />
          <RateItem label="Backwaren" />
          <RateItem label="Warme Gerichte" />
          <RateItem label="Kalte Gerichte" />
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-headline font-bold border-b border-white/5 pb-2 text-primary">4. Die Qualität</h3>
          <RateItem label="Getränke" />
          <RateItem label="Backwaren" />
          <RateItem label="Aufschnitt" />
          <RateItem label="Kalte Gerichte" />
          <RateItem label="Warme Gerichte" />
          <RateItem label="Obst & Gemüse" />
          <RateItem label="Süßes (z.B. Marmelade)" />
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-headline font-bold border-b border-white/5 pb-2 text-primary">5. Das Fazit</h3>
          <RateItem label="Menge / Bist Du satt?" />
          <RateItem label="Preis - Leistung" />
        </section>

        <section className="space-y-4">
          <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest block">Write your review</label>
          <textarea 
            placeholder="Describe your breakfast experience... the textures, the flavors, the morning mood."
            className="w-full h-40 bg-surface-container-lowest border border-white/10 rounded-2xl p-4 text-on-surface outline-none focus:border-primary-container transition-all"
          />
        </section>

        <section className="space-y-4">
           <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest block">Add to the Gallery</label>
           <div className="flex flex-wrap gap-4">
              <button type="button" className="w-28 h-28 glass-card border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors group">
                <Camera className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Upload</span>
              </button>
              <div className="w-28 h-28 rounded-2xl overflow-hidden relative">
                <img src={IMAGES.poachedEgg} alt="Upload preview" className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 bg-surface/80 p-1 rounded-lg backdrop-blur">
                  <X className="w-4 h-4" />
                </button>
              </div>
           </div>
        </section>

        <button 
          type="submit"
          className="w-full bg-primary-container text-on-primary-container py-5 rounded-2xl font-headline font-bold text-xl tracking-[0.2em] uppercase shadow-xl shadow-primary-container/10 active:scale-98 transition-all"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
}

function AddRestaurantView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-10 pb-20">
      <div className="-mx-5 -mt-4 mb-8">
        <button onClick={onBack} className="p-4 flex items-center gap-2 text-primary active:scale-95 transition-all">
          <X className="w-6 h-6" />
          <span className="font-headline font-bold text-xl">Cancel</span>
        </button>
      </div>

      <header className="space-y-2">
        <h2 className="text-4xl font-headline font-bold text-primary">Add New Spot</h2>
        <p className="text-on-surface-variant text-lg">Found a new breakfast gem? Share it with the group!</p>
      </header>

      <form className="glass-card p-6 rounded-2xl space-y-6" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Restaurant Name</label>
            <input 
              type="text" 
              placeholder="e.g. The Sourdough Sanctuary" 
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl p-4 text-on-surface outline-none focus:border-primary-container transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant pointer-events-none" />
              <input 
                type="text" 
                placeholder="City, District" 
                className="w-full bg-surface-container-lowest border border-white/10 rounded-xl p-4 pl-12 text-on-surface outline-none focus:border-primary-container transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Category</label>
            <div className="flex gap-2 flex-wrap">
              {['Bakery', 'Cafe', 'Bistro', 'Brunch', 'Fine Dining'].map((cat, i) => (
                <button 
                  key={i} 
                  type="button"
                  className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:border-primary transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Main Attraction</label>
            <input 
              type="text" 
              placeholder="e.g. Best Croissants in Town" 
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl p-4 text-on-surface outline-none focus:border-primary-container transition-all"
            />
          </div>
        </div>

        <section className="space-y-4 pt-4">
           <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Cover Photo</label>
           <div className="flex flex-wrap gap-4">
              <button type="button" className="w-full h-48 glass-card border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors group">
                <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest mt-2">Upload Restaurant Photo</span>
              </button>
           </div>
        </section>

        <button 
          type="submit"
          className="w-full bg-primary-container text-on-primary-container py-5 rounded-2xl font-headline font-bold text-xl tracking-[0.2em] uppercase shadow-xl shadow-primary-container/10 active:scale-98 transition-all mt-4"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
}

function RateItem({ label }: { label: string }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{label}</label>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <Star 
            key={i} 
            onClick={() => setRating(i)}
            className={`w-6 h-6 cursor-pointer transition-all ${i <= rating ? 'fill-primary-container text-primary-container scale-110' : 'text-on-surface-variant/30 hover:text-primary-container/50'}`} 
          />
        ))}
      </div>
    </div>
  );
}
