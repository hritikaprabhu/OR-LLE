import React from 'react';
import { ArrowRight, Compass, FlaskConical, Gift, Ticket } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-16 lg:py-20 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
                <span>Haute Parfumerie · India Atelier</span>
                <span aria-hidden="true">·</span>
                <span>Kannauj & Grasse Heritage</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-[1.1] tracking-tight text-balance">
                Fragrance as an intimate form of self-expression.
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] font-light leading-relaxed max-w-xl text-balance">
                Designed for those who refuse to smell like the crowd. Discover your true signature scent through our interactive consultation, blend your bespoke formulation in our digital lab, craft custom hampers, or join our hands-on workshops across India.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('scent-finder')}
                className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-[13px] tracking-[0.14em] uppercase font-medium rounded-none transition-all flex items-center gap-3 cursor-pointer shadow-sm hover:shadow"
              >
                <span>Find Your Signature Scent</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>

              <button
                onClick={() => onNavigate('collection')}
                className="px-6 py-3.5 bg-transparent hover:bg-[#F4F0EA] border border-[#1C1917] text-[#1C1917] text-[13px] tracking-[0.14em] uppercase font-medium rounded-none transition-all cursor-pointer"
              >
                Shop Collection
              </button>
            </div>

            {/* Quick Interactive Pathway Strips (4 pathways) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE4DC]">
              <button
                onClick={() => onNavigate('scent-finder')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-1.5 text-[#9E8055] mb-1">
                  <Compass className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1C1917]">01. Scent Quiz</span>
                </div>
                <p className="text-[11px] text-[#78716C] leading-snug">Personality profiling</p>
              </button>

              <button
                onClick={() => onNavigate('perfume-lab')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-1.5 text-[#9E8055] mb-1">
                  <FlaskConical className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1C1917]">02. Create</span>
                </div>
                <p className="text-[11px] text-[#78716C] leading-snug">Blend custom flacon</p>
              </button>

              <button
                onClick={() => onNavigate('hamper-builder')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-1.5 text-[#9E8055] mb-1">
                  <Gift className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1C1917]">03. Hampers</span>
                </div>
                <p className="text-[11px] text-[#78716C] leading-snug">Wax-sealed gifting</p>
              </button>

              <button
                onClick={() => onNavigate('workshops')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-1.5 text-[#9E8055] mb-1">
                  <Ticket className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1C1917]">04. Workshops</span>
                </div>
                <p className="text-[11px] text-[#78716C] leading-snug">Mumbai & Delhi ateliers</p>
              </button>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[#F4F0EA] border border-[#EAE4DC] shadow-xl">
              <img
                src="/src/assets/images/hero_orel_perfume_1791988839425.jpg"
                alt="ORÉLLE Signature Perfume Bottle on Ivory Travertine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              
              {/* Subtle Luxury Scrim & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Editorial Badge (Zero-pill clean text) */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF8F5]/95 backdrop-blur-sm border border-[#EAE4DC] flex items-center justify-between text-xs text-[#1C1917]">
                <div>
                  <p className="font-serif text-base tracking-wide font-medium">Aura Nocturna & Santal</p>
                  <p className="text-[11px] text-[#78716C] tracking-wider uppercase mt-0.5">
                    Extrait de Parfum · Grasse Harvest
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('collection')}
                  className="text-[11px] tracking-widest uppercase font-semibold text-[#9E8055] hover:text-[#1C1917] transition-colors underline decoration-[#C5A880] underline-offset-4"
                >
                  Explore Flacons
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Ethical Commitment Strip */}
        <div className="mt-16 pt-8 border-t border-[#EAE4DC] flex flex-wrap items-center justify-between gap-6 text-[12px] text-[#78716C] tracking-wide">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>Ethically Foraged Botanicals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>100% Cruelty-Free & Vegan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>Refillable French Crystal Glass</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>Complimentary 24k Gold Engraving</span>
          </div>
        </div>
      </div>
    </section>
  );
};
