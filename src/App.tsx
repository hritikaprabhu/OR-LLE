/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PerfumeCatalog } from './components/PerfumeCatalog';
import { ScentQuiz } from './components/ScentQuiz';
import { CustomPerfumeLab } from './components/CustomPerfumeLab';
import { HamperBuilder } from './components/HamperBuilder';
import { WorkshopsSection } from './components/WorkshopsSection';
import { BrandStory } from './components/BrandStory';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Perfume, PERFUMES } from './data/perfumes';
import {
  heroPerfumeImg,
  nocturneOudImg,
  soleilDoreImg,
  hamperBespokeImg,
} from './assets/images';
import { Compass, FlaskConical, Gift, ArrowRight } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Top Bar Header */}
      <Header activeTab={activeTab} setActiveTab={navigateTo} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onNavigate={navigateTo} />

            {/* Featured Fragrances Section */}
            <PerfumeCatalog
              onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
              onNavigateToQuiz={() => navigateTo('scent-finder')}
              onNavigateToLab={() => navigateTo('perfume-lab')}
            />

            {/* Interactive Feature Spotlight: Find Scent */}
            <section className="py-20 bg-[#F4F0EA] border-y border-[#EAE4DC]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
                      <Compass className="w-4 h-4 text-[#C5A880]" />
                      <span>Signature Scent Consultation</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight text-balance">
                      A perfume that speaks when words cannot.
                    </h2>
                    <p className="text-base text-[#57534E] font-light leading-relaxed text-balance">
                      Our interactive questionnaire decodes your sensory memories, favorite moods, intensity desires, and lifestyle moments to uncover the fragrance that seamlessly feels like your own second skin.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('scent-finder')}
                        className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all flex items-center gap-3 cursor-pointer shadow-sm"
                      >
                        <span>Start Diagnostic Questionnaire</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-[3/4] bg-white border border-[#EAE4DC] p-2 overflow-hidden shadow-sm">
                        <img
                          src={nocturneOudImg}
                          alt="Nocturne Oud"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 bg-white border border-[#EAE4DC] text-xs text-center">
                        <span className="font-serif text-base block text-[#1C1917]">Woody & Amber</span>
                        <span className="text-[10px] text-[#78716C] uppercase tracking-wider">For Enigmatic Auras</span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-8">
                      <div className="aspect-[3/4] bg-white border border-[#EAE4DC] p-2 overflow-hidden shadow-sm">
                        <img
                          src={soleilDoreImg}
                          alt="Soleil Dore"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 bg-white border border-[#EAE4DC] text-xs text-center">
                        <span className="font-serif text-base block text-[#1C1917]">Citrus Solar</span>
                        <span className="text-[10px] text-[#78716C] uppercase tracking-wider">For Radiant Spirits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom Perfume Lab Spotlight */}
            <section className="py-20 bg-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 order-2 lg:order-1">
                    <div className="aspect-[4/3] bg-[#F4F0EA] border border-[#EAE4DC] overflow-hidden shadow-xl">
                      <img
                        src={heroPerfumeImg}
                        alt="Custom Perfume Flacon with Champagne Cap"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                    <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
                      <FlaskConical className="w-4 h-4 text-[#C5A880]" />
                      <span>Formulation Studio</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight text-balance">
                      Craft your bespoke olfactory signature.
                    </h2>
                    <p className="text-base text-[#57534E] font-light leading-relaxed text-balance">
                      Why settle for a mass-market flacon when you can formulate your own? Select your favorite raw botanical notes, choose Eau de Parfum or concentrated Extrait, pick your magnetic cap, and personalize the gold label with your name.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('perfume-lab')}
                        className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all flex items-center gap-3 cursor-pointer shadow-sm"
                      >
                        <span>Enter Perfume Lab</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bespoke Hamper Gifting Spotlight */}
            <section className="py-20 bg-[#F4F0EA] border-t border-[#EAE4DC]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
                      <Gift className="w-4 h-4 text-[#C5A880]" />
                      <span>Bespoke Gifting Suites</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight text-balance">
                      Gifts that transcend ordinary gestures.
                    </h2>
                    <p className="text-base text-[#57534E] font-light leading-relaxed text-balance">
                      Curate a tailored gift hamper in our rigid alabaster or velvet chest. Combine luxury flacons with hand-poured botanical candles, silk scarves, and personalized gold-foil calligraphy sealed with authentic stamped wax.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('hamper-builder')}
                        className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all flex items-center gap-3 cursor-pointer shadow-sm"
                      >
                        <span>Customise a Gift Hamper</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="aspect-[4/3] bg-white border border-[#EAE4DC] overflow-hidden shadow-xl">
                      <img
                        src={hamperBespokeImg}
                        alt="Bespoke Hamper Gift Box with Gold Card"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Perfume Workshops Section */}
            <WorkshopsSection />

            {/* Brand Story Preview & Concierge */}
            <BrandStory />
          </>
        )}

        {activeTab === 'collection' && (
          <PerfumeCatalog
            onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
            onNavigateToQuiz={() => navigateTo('scent-finder')}
            onNavigateToLab={() => navigateTo('perfume-lab')}
          />
        )}

        {activeTab === 'scent-finder' && (
          <ScentQuiz onSelectPerfume={(perfume) => setSelectedPerfume(perfume)} />
        )}

        {activeTab === 'perfume-lab' && <CustomPerfumeLab />}

        {activeTab === 'hamper-builder' && <HamperBuilder />}

        {activeTab === 'workshops' && <WorkshopsSection />}

        {activeTab === 'about' && <BrandStory />}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout & Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
