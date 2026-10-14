import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#332F2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Brand Vision Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[#332F2C]">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] font-medium text-[#FAF8F5] uppercase">
              ORÉLLE
            </span>
            <p className="text-xs sm:text-sm text-[#A8A29E] font-light max-w-md leading-relaxed">
              Personalised luxury fragrance formulated in Grasse. Receive private invitations to seasonal cask releases, private formulation previews, and olfactory masterclasses.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-[#332F2C] border border-[#9E8055] text-xs text-[#C5A880] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C5A880]" />
                <span>You have been added to the ORÉLLE Atelier Private Client Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-4 py-3 bg-[#292524] border border-[#44403C] text-[#FAF8F5] placeholder:text-[#78716C] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#B89B72] text-[#1C1917] text-xs tracking-wider uppercase font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Join Gazette</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#A8A29E]">
          <div className="space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#FAF8F5]">
              Atelier Collections
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  The Signature Flacons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Extrait de Parfum Formulations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Discovery Sample Trios
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#FAF8F5]">
              Bespoke Experiences
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('scent-finder')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Find Your Signature Scent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perfume-lab')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Create Your Own Perfume
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hamper-builder')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Customise Your Hamper
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshops')}
                  className="hover:text-[#FAF8F5] text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <span>Perfume Workshops & Masterclasses</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#FAF8F5]">
              Heritage & Atelier
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Kannauj & Grasse Botanical Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Sustainable Harvests & Vegan Ethics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  24k Gold Engraving & Refills
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#FAF8F5]">
              India Concierge
            </div>
            <div className="space-y-1 text-[#78716C] font-mono text-[11px]">
              <p>concierge@orelle.in</p>
              <p>+91 (0) 22 4589 7700</p>
              <p>Monday–Saturday · 10am–8pm IST</p>
              <p className="text-[10px] text-[#A8A29E] pt-1">Mumbai · Delhi · Bengaluru Ateliers</p>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright & Notice */}
        <div className="pt-8 border-t border-[#332F2C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
          <p>© 2026 ORÉLLE Haute Parfumerie India. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px]">
            <span>Mumbai</span>
            <span>·</span>
            <span>New Delhi</span>
            <span>·</span>
            <span>Bengaluru</span>
            <span>·</span>
            <span>Kannauj</span>
            <span>·</span>
            <span>Grasse</span>
            <span>·</span>
            <span>Paris</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
