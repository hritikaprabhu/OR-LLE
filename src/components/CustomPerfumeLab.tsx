import React, { useState } from 'react';
import { FlaskConical, Check, Sparkles, Sliders, ShieldCheck, Heart, Info, ArrowRight } from 'lucide-react';
import { FRAGRANCE_NOTES, FragranceNote } from '../data/perfumes';
import { heroPerfumeImg } from '../assets/images';
import { useCart } from '../context/CartContext';

export const CustomPerfumeLab: React.FC = () => {
  const { addToCart } = useCart();

  // Step 1: Base family
  const [baseFamily, setBaseFamily] = useState<'woody' | 'floral' | 'citrus' | 'gourmand' | 'fresh'>('woody');

  // Step 2: Selected notes
  const [selectedTop, setSelectedTop] = useState<string[]>(['bergamot']);
  const [selectedHeart, setSelectedHeart] = useState<string[]>(['orris']);
  const [selectedBase, setSelectedBase] = useState<string[]>(['sandalwood']);

  // Step 3: Intensity & Hardware
  const [concentration, setConcentration] = useState<'edp' | 'extrait'>('edp');
  const [capStyle, setCapStyle] = useState<'champagne' | 'brass' | 'obsidian'>('champagne');
  const [volume, setVolume] = useState<'50ml' | '100ml'>('50ml');

  // Step 4: Personalization
  const [customName, setCustomName] = useState('Maison Privée');
  const [engravedMonogram, setEngravedMonogram] = useState('OP. 2026');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Toggle helpers (max 2 per tier)
  const toggleNote = (tier: 'top' | 'heart' | 'base', noteId: string) => {
    if (tier === 'top') {
      setSelectedTop((prev) =>
        prev.includes(noteId) ? prev.filter((id) => id !== noteId) : prev.length < 2 ? [...prev, noteId] : [prev[1], noteId]
      );
    } else if (tier === 'heart') {
      setSelectedHeart((prev) =>
        prev.includes(noteId) ? prev.filter((id) => id !== noteId) : prev.length < 2 ? [...prev, noteId] : [prev[1], noteId]
      );
    } else {
      setSelectedBase((prev) =>
        prev.includes(noteId) ? prev.filter((id) => id !== noteId) : prev.length < 2 ? [...prev, noteId] : [prev[1], noteId]
      );
    }
  };

  // Base pricing
  const basePrice = (volume === '50ml' ? 5500 : 8200) + (concentration === 'extrait' ? 1500 : 0);

  // Note lookups
  const topNotesObj = FRAGRANCE_NOTES.filter((n) => selectedTop.includes(n.id));
  const heartNotesObj = FRAGRANCE_NOTES.filter((n) => selectedHeart.includes(n.id));
  const baseNotesObj = FRAGRANCE_NOTES.filter((n) => selectedBase.includes(n.id));

  const handleCreateAndAdd = () => {
    addToCart({
      type: 'bespoke_perfume',
      title: customName || 'Bespoke Atelier Flacon',
      subtitle: `${concentration === 'extrait' ? 'Extrait de Parfum (28%)' : 'Eau de Parfum (18%)'} · ${volume}`,
      price: basePrice,
      image: heroPerfumeImg,
      details: {
        size: volume,
        engraving: engravedMonogram,
        baseFamily,
        concentration: concentration === 'extrait' ? 'Extrait de Parfum (28%)' : 'Eau de Parfum (18%)',
        capStyle:
          capStyle === 'champagne'
            ? 'Brushed Champagne Gold'
            : capStyle === 'brass'
            ? 'Polished Brass'
            : 'Matte Obsidian',
        notes: {
          top: topNotesObj.map((n) => n.name),
          heart: heartNotesObj.map((n) => n.name),
          base: baseNotesObj.map((n) => n.name),
        },
      },
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const familyDescriptions = {
    woody: 'Deep, grounding and velvety with warm resins and noble timbers.',
    floral: 'Luminous, romantic blossoms with sheer silk textures.',
    citrus: 'Solar, sparkling Italian bergamot and refreshing zest.',
    gourmand: 'Intoxicating, dark bourbon vanilla, espresso and caramel.',
    fresh: 'Botanical clarity, ceremonial tea, and tranquil Hinoki woods.',
  };

  return (
    <section id="perfume-lab" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            <FlaskConical className="w-4 h-4 text-[#C5A880]" />
            <span>The OREL Formulation Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            Create Your Own Perfume
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Step into the role of Master Parfumeur. Select your foundational family, blend pure botanical essences, choose your concentration, and engrave your creation with a personal title.
          </p>
        </div>

        {/* 2-Column Lab Layout: Controls Left, Live Flacon Mockup Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Column (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Base Olfactory Family */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                  01. Select Olfactory Architecture
                </span>
                <span className="text-[11px] text-[#78716C] uppercase tracking-wider">Required</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'woody', label: 'Woody' },
                  { id: 'floral', label: 'Floral' },
                  { id: 'citrus', label: 'Citrus' },
                  { id: 'gourmand', label: 'Gourmand' },
                  { id: 'fresh', label: 'Zen Fresh' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBaseFamily(item.id as any)}
                    className={`py-2.5 px-3 text-center border text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                      baseFamily === item.id
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                        : 'border-[#EAE4DC] hover:border-[#C5A880] text-[#57534E]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <p className="text-xs text-[#78716C] italic font-serif pt-1">
                {familyDescriptions[baseFamily]}
              </p>
            </div>

            {/* Step 2: Note Blending (Top, Heart, Base) */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                  02. Blend Essence Notes (Choose up to 2 per tier)
                </span>
                <span className="text-[11px] text-[#9E8055] font-mono">
                  {selectedTop.length + selectedHeart.length + selectedBase.length} Notes Chosen
                </span>
              </div>

              {/* Top Notes */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                    Top Notes (First Impression · 15–30 min)
                  </span>
                  <span className="text-[11px] text-[#78716C]">{selectedTop.length}/2 selected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAGRANCE_NOTES.filter((n) => n.tier === 'top').map((note) => {
                    const active = selectedTop.includes(note.id);
                    return (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => toggleNote('top', note.id)}
                        className={`p-3 text-left border text-xs transition-all cursor-pointer ${
                          active
                            ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                            : 'border-[#EAE4DC] hover:border-[#D8CEBE] text-[#57534E]'
                        }`}
                      >
                        <div className="font-semibold flex items-center justify-between">
                          <span>{note.name}</span>
                          {active && <Check className="w-3.5 h-3.5 text-[#9E8055]" />}
                        </div>
                        <div className="text-[10px] text-[#78716C] mt-0.5">{note.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Heart Notes */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#9E8055] uppercase tracking-wider text-[11px]">
                    Heart Notes (Core Personality · 4–6 hours)
                  </span>
                  <span className="text-[11px] text-[#78716C]">{selectedHeart.length}/2 selected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAGRANCE_NOTES.filter((n) => n.tier === 'heart').map((note) => {
                    const active = selectedHeart.includes(note.id);
                    return (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => toggleNote('heart', note.id)}
                        className={`p-3 text-left border text-xs transition-all cursor-pointer ${
                          active
                            ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                            : 'border-[#EAE4DC] hover:border-[#D8CEBE] text-[#57534E]'
                        }`}
                      >
                        <div className="font-semibold flex items-center justify-between">
                          <span>{note.name}</span>
                          {active && <Check className="w-3.5 h-3.5 text-[#9E8055]" />}
                        </div>
                        <div className="text-[10px] text-[#78716C] mt-0.5">{note.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Base Notes */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                    Base Notes (Enduring Drydown · 8–12 hours)
                  </span>
                  <span className="text-[11px] text-[#78716C]">{selectedBase.length}/2 selected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAGRANCE_NOTES.filter((n) => n.tier === 'base').map((note) => {
                    const active = selectedBase.includes(note.id);
                    return (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => toggleNote('base', note.id)}
                        className={`p-3 text-left border text-xs transition-all cursor-pointer ${
                          active
                            ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                            : 'border-[#EAE4DC] hover:border-[#D8CEBE] text-[#57534E]'
                        }`}
                      >
                        <div className="font-semibold flex items-center justify-between">
                          <span>{note.name}</span>
                          {active && <Check className="w-3.5 h-3.5 text-[#9E8055]" />}
                        </div>
                        <div className="text-[10px] text-[#78716C] mt-0.5">{note.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Intensity & Hardware Selection */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-6">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                03. Concentration, Volume & Magnetic Cap
              </span>

              {/* Concentration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setConcentration('edp')}
                  className={`p-4 text-left border transition-all cursor-pointer ${
                    concentration === 'edp'
                      ? 'border-[#1C1917] bg-[#F4F0EA]'
                      : 'border-[#EAE4DC] hover:border-[#D8CEBE]'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#1C1917]">Eau de Parfum (18%)</div>
                  <div className="text-[11px] text-[#78716C] mt-1">Balanced, radiant diffusion for 8–10 hours.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConcentration('extrait')}
                  className={`p-4 text-left border transition-all cursor-pointer ${
                    concentration === 'extrait'
                      ? 'border-[#1C1917] bg-[#F4F0EA]'
                      : 'border-[#EAE4DC] hover:border-[#D8CEBE]'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#1C1917] flex items-center justify-between">
                    <span>Extrait de Parfum (28%)</span>
                    <span className="text-[10px] font-mono text-[#9E8055]">+₹1,500</span>
                  </div>
                  <div className="text-[11px] text-[#78716C] mt-1">Rich, pure oil concentration with 14+ hour trail.</div>
                </button>
              </div>

              {/* Cap Style & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                    Magnetic Cap Finish
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'champagne', label: 'Champagne' },
                      { id: 'brass', label: 'Brass Gold' },
                      { id: 'obsidian', label: 'Obsidian' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCapStyle(c.id as any)}
                        className={`py-2 px-2 text-[10px] uppercase tracking-wider font-semibold border transition-all text-center ${
                          capStyle === c.id
                            ? 'border-[#1C1917] bg-[#1C1917] text-white'
                            : 'border-[#EAE4DC] text-[#57534E]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                    Flacon Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVolume('50ml')}
                      className={`py-2 px-2 text-[11px] uppercase tracking-wider font-semibold border transition-all text-center ${
                        volume === '50ml'
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-[#EAE4DC] text-[#57534E]'
                      }`}
                    >
                      50ml Flacon
                    </button>
                    <button
                      type="button"
                      onClick={() => setVolume('100ml')}
                      className={`py-2 px-2 text-[11px] uppercase tracking-wider font-semibold border transition-all text-center ${
                        volume === '100ml'
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-[#EAE4DC] text-[#57534E]'
                      }`}
                    >
                      100ml Grand Flacon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Custom Naming & Engraving */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-4">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                04. Title & Gold Monogram
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="custom-perfume-name" className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                    Creation Name (Appears on Front Flacon)
                  </label>
                  <input
                    id="custom-perfume-name"
                    type="text"
                    maxLength={24}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Aura d'Or or Midnight Silk"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="monogram-code" className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                    Gold Monogram / Year
                  </label>
                  <input
                    id="monogram-code"
                    type="text"
                    maxLength={12}
                    value={engravedMonogram}
                    onChange={(e) => setEngravedMonogram(e.target.value)}
                    placeholder="e.g. AL 2026"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Flacon Mockup & Order Summary (Right 5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white border border-[#EAE4DC] p-8 shadow-sm text-center relative overflow-hidden">
              {/* Flacon Graphic Frame */}
              <div className="relative mx-auto w-48 sm:w-56 py-8 flex flex-col items-center">
                {/* Magnetic Cap Graphic */}
                <div
                  className={`w-16 h-10 border transition-all shadow-sm ${
                    capStyle === 'champagne'
                      ? 'bg-gradient-to-r from-[#D8CEBE] via-[#EFEBE4] to-[#C5A880] border-[#B89B72]'
                      : capStyle === 'brass'
                      ? 'bg-gradient-to-r from-[#B5915F] via-[#DFBF82] to-[#99743D] border-[#8A6732]'
                      : 'bg-gradient-to-r from-[#292524] via-[#1C1917] to-[#0C0A09] border-[#1C1917]'
                  }`}
                />

                {/* Bottle Neck Collar */}
                <div className="w-8 h-3 bg-[#EFEBE4] border-x border-[#D8CEBE]" />

                {/* Glass Flacon Body */}
                <div className="w-full aspect-[4/5] bg-gradient-to-b from-[#FAF8F5]/90 via-[#F4F0EA]/70 to-[#EAE4DC]/80 border-2 border-[#D8CEBE] shadow-xl p-4 flex flex-col justify-between items-center relative backdrop-blur-xs">
                  {/* Glass reflections */}
                  <div className="absolute top-2 left-2 w-1 h-3/4 bg-white/60 blur-[1px]" />
                  <div className="absolute top-2 right-2 w-1 h-3/4 bg-white/30 blur-[1px]" />

                  {/* Top brand stamp */}
                  <div className="text-[9px] tracking-[0.3em] uppercase text-[#8C827A] pt-1">
                    ORÉLLE ATELIER
                  </div>

                  {/* Center Flacon Custom Label (24k foil style) */}
                  <div className="w-5/6 p-3 bg-white/95 border border-[#C5A880] shadow-sm text-center space-y-1 my-auto">
                    <div className="font-serif text-lg font-normal tracking-wide text-[#1C1917] leading-tight">
                      {customName || 'Your Scent'}
                    </div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#9E8055]">
                      {concentration === 'extrait' ? 'Extrait de Parfum' : 'Eau de Parfum'}
                    </div>
                    <div className="text-[9px] font-mono text-[#78716C] pt-0.5">
                      {engravedMonogram || 'PARIS · GRASSE'}
                    </div>
                  </div>

                  {/* Volume bottom stamp */}
                  <div className="text-[9px] font-mono text-[#78716C] tracking-widest pb-1">
                    {volume} · 100% BOTANICAL
                  </div>
                </div>
              </div>

              {/* Formulation Formula Breakdown */}
              <div className="mt-4 pt-6 border-t border-[#EAE4DC] text-left space-y-3">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                  Formula Architecture:
                </div>
                <div className="text-xs space-y-1 text-[#57534E]">
                  <div>
                    <span className="font-medium text-[#1C1917]">Top:</span>{' '}
                    {topNotesObj.map((n) => n.name).join(' + ') || 'None selected'}
                  </div>
                  <div>
                    <span className="font-medium text-[#9E8055]">Heart:</span>{' '}
                    {heartNotesObj.map((n) => n.name).join(' + ') || 'None selected'}
                  </div>
                  <div>
                    <span className="font-medium text-[#1C1917]">Base:</span>{' '}
                    {baseNotesObj.map((n) => n.name).join(' + ') || 'None selected'}
                  </div>
                </div>
              </div>

              {/* Pricing & Craft CTA */}
              <div className="mt-6 pt-6 border-t border-[#EAE4DC] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                    Bespoke Formulation Total:
                  </span>
                  <span className="text-2xl font-mono text-[#1C1917] font-medium tabular-nums">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCreateAndAdd}
                  className="w-full py-4 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A880]" />
                      <span>Formula Saved to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Formulate & Add to Bag — ₹{basePrice.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[#78716C] leading-normal text-center">
                  Hand-blended upon order in Grasse. Shipped in our velvet-padded keepsake gift case with certificate of authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
