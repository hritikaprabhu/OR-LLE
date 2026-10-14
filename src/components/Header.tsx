import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Compass, FlaskConical, Gift, Ticket, Film } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFilm?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenFilm }) => {
  const { cart, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE4DC] transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1C1917] text-[#EFEBE4] text-[11px] py-1.5 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-3">
        <span>Complimentary Pan-India White-Glove Delivery · 2-Vial Discovery Set with Every Order</span>
        <span className="hidden sm:inline text-[#C5A880]">·</span>
        <span className="hidden sm:inline text-[#C5A880]">Code: ORELLE10 for 10% off</span>
      </div>

      {/* Main Navigation Bar - Strictly 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#1C1917] transition-colors group-hover:text-[#9E8055] uppercase">
            ORÉLLE
          </span>
          <span className="block text-[9px] tracking-[0.3em] uppercase text-[#8C827A] font-sans -mt-1">
            Haute Parfumerie · India
          </span>
        </button>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] tracking-[0.12em] uppercase font-medium text-[#57534E]">
          <button
            onClick={() => handleNavClick('collection')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 ${
              activeTab === 'collection' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => handleNavClick('scent-finder')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'scent-finder' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
            Find Your Scent
          </button>
          <button
            onClick={() => handleNavClick('perfume-lab')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'perfume-lab' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-[#C5A880]" />
            Create Perfume
          </button>
          <button
            onClick={() => handleNavClick('hamper-builder')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'hamper-builder' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
            Custom Hamper
          </button>
          <button
            onClick={() => handleNavClick('workshops')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'workshops' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-[#C5A880]" />
            Workshops
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#1C1917] pb-1 border-b-2 ${
              activeTab === 'about' ? 'border-[#C5A880] text-[#1C1917]' : 'border-transparent'
            }`}
          >
            Atelier Story
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Shopping Bag Drawer Trigger) */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={openCart}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#D8CEBE] hover:border-[#1C1917] bg-[#FAF8F5] hover:bg-[#F4F0EA] transition-all text-[#1C1917] cursor-pointer"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#1C1917]" />
            <span className="text-[12px] tracking-wider uppercase font-medium">Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-[11px] font-mono flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1C1917] hover:text-[#9E8055] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE4DC] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-[14px] tracking-widest uppercase font-medium text-[#44403C]">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 border-b border-[#F4F0EA] ${activeTab === 'home' ? 'text-[#9E8055]' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collection')}
              className={`text-left py-2 border-b border-[#F4F0EA] ${activeTab === 'collection' ? 'text-[#9E8055]' : ''}`}
            >
              Shop Perfumes
            </button>
            <button
              onClick={() => handleNavClick('scent-finder')}
              className={`text-left py-2 border-b border-[#F4F0EA] flex items-center justify-between ${
                activeTab === 'scent-finder' ? 'text-[#9E8055]' : ''
              }`}
            >
              <span>Find Your Signature Scent</span>
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
            </button>
            <button
              onClick={() => handleNavClick('perfume-lab')}
              className={`text-left py-2 border-b border-[#F4F0EA] flex items-center justify-between ${
                activeTab === 'perfume-lab' ? 'text-[#9E8055]' : ''
              }`}
            >
              <span>Create Your Own Perfume</span>
              <FlaskConical className="w-4 h-4 text-[#C5A880]" />
            </button>
            <button
              onClick={() => handleNavClick('hamper-builder')}
              className={`text-left py-2 border-b border-[#F4F0EA] flex items-center justify-between ${
                activeTab === 'hamper-builder' ? 'text-[#9E8055]' : ''
              }`}
            >
              <span>Customise Your Hamper</span>
              <Gift className="w-4 h-4 text-[#C5A880]" />
            </button>
            <button
              onClick={() => handleNavClick('workshops')}
              className={`text-left py-2 border-b border-[#F4F0EA] flex items-center justify-between ${
                activeTab === 'workshops' ? 'text-[#9E8055]' : ''
              }`}
            >
              <span>Perfume Workshops</span>
              <Ticket className="w-4 h-4 text-[#C5A880]" />
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 border-b border-[#F4F0EA] ${activeTab === 'about' ? 'text-[#9E8055]' : ''}`}
            >
              About ORÉLLE & Indian Heritage
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
