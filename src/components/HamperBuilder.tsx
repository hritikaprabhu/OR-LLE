import React, { useState } from 'react';
import { Gift, Check, Sparkles, Heart, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import {
  HAMPER_BOXES,
  HAMPER_COMPLEMENTS,
  PERFUMES,
  HamperBoxOption,
  HamperComplement,
  Perfume,
} from '../data/perfumes';
import { useCart } from '../context/CartContext';

export const HamperBuilder: React.FC = () => {
  const { addToCart } = useCart();

  // Step 1: Selected Box
  const [selectedBox, setSelectedBox] = useState<HamperBoxOption>(HAMPER_BOXES[0]);

  // Step 2: Selected Perfumes (1 or 2 perfumes)
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState<string[]>([
    'aura-nocturna',
    'fleur-de-soie',
  ]);

  // Step 3: Selected Complements (multi-select)
  const [selectedComplementIds, setSelectedComplementIds] = useState<string[]>([
    'discovery-trio',
  ]);

  // Step 4: Personalization
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [recipientName, setRecipientName] = useState<string>('Eleanor');
  const [senderName, setSenderName] = useState<string>('Julian');
  const [giftMessage, setGiftMessage] = useState<string>(
    'May this bespoke alchemy bring warmth and quiet beauty to your every day. Happy Birthday!'
  );
  const [waxSeal, setWaxSeal] = useState<string>('Champagne Gold');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const occasions = [
    'Birthday',
    'Anniversary',
    'Celebration & Milestone',
    'With All My Love',
    'Gratitude & Thanks',
    'Just Because',
  ];

  const waxSeals = ['Champagne Gold', 'Antique Bronze', 'Royal Burgundy'];

  // Toggle helpers
  const togglePerfume = (id: string) => {
    setSelectedPerfumeIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least 1 perfume
        if (prev.length <= 1) return prev;
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const toggleComplement = (id: string) => {
    setSelectedComplementIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  // Calculate total price
  const chosenPerfumes = PERFUMES.filter((p) => selectedPerfumeIds.includes(p.id));
  const chosenComplements = HAMPER_COMPLEMENTS.filter((c) => selectedComplementIds.includes(c.id));

  const perfumesCost = chosenPerfumes.reduce((sum, p) => sum + p.price50ml, 0);
  const complementsCost = chosenComplements.reduce((sum, c) => sum + c.price, 0);
  const totalCost = selectedBox.basePrice + perfumesCost + complementsCost;

  const handleAddHamperToBag = () => {
    addToCart({
      type: 'bespoke_hamper',
      title: `${selectedBox.name}`,
      subtitle: `Curated for ${recipientName || 'Someone Special'} (${occasion})`,
      price: totalCost,
      image: '/src/assets/images/hamper_bespoke_luxury_1791988842618.jpg',
      details: {
        box: selectedBox,
        perfumes: chosenPerfumes.map((p) => ({ name: p.name, size: '50ml' })),
        complements: chosenComplements,
        recipientName,
        giftOccasion: occasion,
        giftMessage,
        waxSeal,
      },
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section id="hamper-builder" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            <Gift className="w-4 h-4 text-[#C5A880]" />
            <span>The OREL Bespoke Gifting Suite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            Customise Your Hamper
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Move beyond generic gift baskets. Select hand-crafted presentation cases, tailor perfume pairings, add artisanal lifestyle treasures, and seal with custom handwritten calligraphy and stamped wax.
          </p>
        </div>

        {/* 2-Column Split: Configurator on Left, Live Hamper Presentation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Configurator Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Box Style */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                  01. Choose Presentation Case
                </span>
                <span className="text-[11px] text-[#78716C]">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HAMPER_BOXES.map((box) => (
                  <button
                    key={box.id}
                    type="button"
                    onClick={() => setSelectedBox(box)}
                    className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedBox.id === box.id
                        ? 'border-[#1C1917] bg-[#F4F0EA]'
                        : 'border-[#EAE4DC] hover:border-[#D8CEBE]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#1C1917]">{box.name}</div>
                      <div className="text-[10px] text-[#78716C] mt-1 leading-snug">{box.material}</div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#EAE4DC]/60 flex items-center justify-between">
                      <span className="text-[11px] text-[#9E8055] font-semibold">{box.color}</span>
                      <span className="text-xs font-mono font-medium">₹{box.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Perfumes Selection (1 or 2) */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                  02. Select 1 or 2 Flacons (50ml Flacons Included)
                </span>
                <span className="text-[11px] text-[#9E8055] font-mono">
                  {selectedPerfumeIds.length}/2 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERFUMES.map((perfume) => {
                  const isSelected = selectedPerfumeIds.includes(perfume.id);
                  return (
                    <button
                      key={perfume.id}
                      type="button"
                      onClick={() => togglePerfume(perfume.id)}
                      className={`p-3.5 text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#F4F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#D8CEBE]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5">
                          <span>{perfume.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#9E8055]" />}
                        </div>
                        <div className="text-[10px] text-[#78716C] italic font-serif">
                          {perfume.subtitle}
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#1C1917] tabular-nums shrink-0">
                        ₹{perfume.price50ml.toLocaleString('en-IN')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Artisanal Complements */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917]">
                  03. Curate Luxury Additions (Optional)
                </span>
                <span className="text-[11px] text-[#78716C]">Multi-select</span>
              </div>

              <div className="space-y-2.5">
                {HAMPER_COMPLEMENTS.map((item) => {
                  const isChecked = selectedComplementIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleComplement(item.id)}
                      className={`w-full p-3.5 text-left border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-[#1C1917] bg-[#F4F0EA]'
                          : 'border-[#EAE4DC] hover:border-[#D8CEBE]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[#1C1917] flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[9px] uppercase tracking-wider text-[#9E8055] font-normal">
                            · {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#57534E]">{item.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono font-medium text-[#1C1917] tabular-nums">
                          +₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-[#1C1917] border-[#1C1917] text-white' : 'border-[#D8CEBE]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Personalised Card, Wax Seal & Occasion */}
            <div className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-6">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                04. Occasion, Handwritten Message & Wax Seal
              </span>

              {/* Occasion Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                  Occasion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`py-2 px-3 text-[11px] tracking-wider uppercase font-medium border text-center transition-all ${
                        occasion === occ
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-[#EAE4DC] text-[#57534E]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient & Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="hamper-recipient-name" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    Recipient Name
                  </label>
                  <input
                    id="hamper-recipient-name"
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="hamper-sender-name" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    From (Your Name)
                  </label>
                  <input
                    id="hamper-sender-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Julian"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Gift Message */}
              <div className="space-y-1">
                <label htmlFor="calligraphy-message" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                  Calligraphy Stationery Message
                </label>
                <textarea
                  id="calligraphy-message"
                  rows={3}
                  maxLength={180}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a heartfelt personal note..."
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                />
                <span className="text-[10px] text-[#A8A29E] block text-right">
                  {giftMessage.length}/180 characters
                </span>
              </div>

              {/* Wax Seal Choice */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                  Embossed Wax Seal Stamp
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {waxSeals.map((seal) => (
                    <button
                      key={seal}
                      type="button"
                      onClick={() => setWaxSeal(seal)}
                      className={`p-2.5 text-center border text-[11px] tracking-wider uppercase font-semibold transition-all ${
                        waxSeal === seal
                          ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                          : 'border-[#EAE4DC] text-[#78716C]'
                      }`}
                    >
                      {seal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Hamper Presentation & Cart Summary (Right 5 cols sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white border border-[#EAE4DC] shadow-sm overflow-hidden">
              {/* High-res Image of Hamper Suite */}
              <div className="relative aspect-[4/3] bg-[#F4F0EA]">
                <img
                  src="/src/assets/images/hamper_bespoke_luxury_1791988842618.jpg"
                  alt="Bespoke Luxury Gift Hamper"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-[#FAF8F5] text-[10px] tracking-widest uppercase px-2.5 py-1">
                  Bespoke Gift Edition
                </div>
              </div>

              {/* Card Calligraphy Preview */}
              <div className="p-6 bg-[#FAF8F5] border-b border-[#EAE4DC] space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9E8055]">
                  <span>Gold-Foil Stationery Preview</span>
                  <span>{waxSeal} Seal</span>
                </div>

                <div className="p-4 bg-white border border-[#D8CEBE] shadow-xs space-y-2">
                  <div className="text-[11px] text-[#78716C] uppercase tracking-wider">
                    For {recipientName || 'Recipient'} · {occasion}
                  </div>
                  <p className="font-serif italic text-sm text-[#1C1917] leading-relaxed">
                    &ldquo;{giftMessage || 'A bespoke fragrance gift from ORÉLLE'}&rdquo;
                  </p>
                  <div className="text-right text-[11px] font-serif text-[#9E8055]">
                    — With love, {senderName || 'Sender'}
                  </div>
                </div>
              </div>

              {/* Itemized Contents Breakdown */}
              <div className="p-6 space-y-4">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                  Hamper Inclusions:
                </div>

                <div className="space-y-2 text-xs text-[#57534E]">
                  <div className="flex justify-between items-center pb-1 border-b border-[#F4F0EA]">
                    <span>{selectedBox.name}</span>
                    <span className="font-mono tabular-nums">₹{selectedBox.basePrice.toLocaleString('en-IN')}</span>
                  </div>

                  {chosenPerfumes.map((perfume) => (
                    <div key={perfume.id} className="flex justify-between items-center pb-1 border-b border-[#F4F0EA]">
                      <span>{perfume.name} (50ml Flacon)</span>
                      <span className="font-mono tabular-nums">₹{perfume.price50ml.toLocaleString('en-IN')}</span>
                    </div>
                  ))}

                  {chosenComplements.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-1 border-b border-[#F4F0EA]">
                      <span>{item.name}</span>
                      <span className="font-mono tabular-nums">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EAE4DC] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                    Total Bespoke Hamper:
                  </span>
                  <span className="text-2xl font-mono text-[#1C1917] font-medium tabular-nums">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddHamperToBag}
                  className="w-full py-4 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A880]" />
                      <span>Hamper Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4 text-[#C5A880]" />
                      <span>Add Curated Hamper to Bag — ₹{totalCost.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[#78716C] text-center leading-normal">
                  Ships in double-layered protective shipping crate. Includes hand-tied silk ribbon and personalized certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
