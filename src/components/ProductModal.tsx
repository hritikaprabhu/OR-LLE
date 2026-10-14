import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Heart, ArrowRight } from 'lucide-react';
import { Perfume } from '../data/perfumes';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onOpenLabWithPerfume?: (perfume: Perfume) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ perfume, onClose, onOpenLabWithPerfume }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [engraving, setEngraving] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!perfume) return null;

  const currentPrice = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;

  const handleAddToCart = () => {
    addToCart({
      type: 'perfume',
      title: perfume.name,
      subtitle: `${perfume.subtitle} (${selectedSize})`,
      price: currentPrice,
      image: perfume.image,
      details: {
        size: selectedSize,
        engraving: engraving.trim() || undefined,
        perfumeId: perfume.id,
      },
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div
        className="relative bg-[#FAF8F5] max-w-4xl w-full border border-[#D8CEBE] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#78716C] hover:text-[#1C1917] bg-[#FAF8F5]/80 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery & Engraving Preview */}
          <div className="relative bg-[#F4F0EA] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EAE4DC]">
            <div className="relative w-full aspect-[4/3] max-w-sm overflow-hidden border border-[#D8CEBE] bg-[#FAF8F5] shadow-md group">
              <img
                src={perfume.image}
                alt={perfume.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Optional live bottle engraving watermark */}
              {engraving.trim() && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1C1917]/80 backdrop-blur-sm border border-[#C5A880] text-[#EFEBE4] text-[11px] font-serif tracking-[0.2em] uppercase shadow-lg">
                  {engraving.trim()}
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
                {perfume.categoryLabel}
              </span>
              <p className="text-[12px] text-[#78716C] mt-1 font-mono">
                {perfume.concentration} · {perfume.longevity} Sillage
              </p>
            </div>
          </div>

          {/* Right: Product Story, Notes Pyramid & Purchasing */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-3xl text-[#1C1917] font-normal tracking-tight">
                    {perfume.name}
                  </h2>
                  <span className="text-xl font-mono text-[#1C1917] font-medium tabular-nums">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-[#78716C] italic font-serif mt-1">{perfume.subtitle}</p>
                <p className="text-xs text-[#57534E] leading-relaxed mt-3">{perfume.description}</p>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-[#1C1917] mb-2">
                  Select Flacon Volume
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('50ml')}
                    className={`py-2.5 px-4 text-left border transition-all ${
                      selectedSize === '50ml'
                        ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                        : 'border-[#EAE4DC] hover:border-[#A8A29E] text-[#57534E]'
                    }`}
                  >
                    <div className="text-xs font-semibold">50ml Standard Flacon</div>
                    <div className="text-[11px] text-[#78716C] font-mono mt-0.5 tabular-nums">₹{perfume.price50ml.toLocaleString('en-IN')}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('100ml')}
                    className={`py-2.5 px-4 text-left border transition-all ${
                      selectedSize === '100ml'
                        ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917]'
                        : 'border-[#EAE4DC] hover:border-[#A8A29E] text-[#57534E]'
                    }`}
                  >
                    <div className="text-xs font-semibold">100ml Grand Flacon</div>
                    <div className="text-[11px] text-[#78716C] font-mono mt-0.5 tabular-nums">₹{perfume.price100ml.toLocaleString('en-IN')}</div>
                  </button>
                </div>
              </div>

              {/* Olfactory Notes Pyramid */}
              <div className="p-4 bg-[#F4F0EA]/70 border border-[#EAE4DC] space-y-3">
                <div className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#1C1917]">
                  Olfactory Architecture
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-[#1C1917] min-w-[75px] text-[11px] uppercase tracking-wider">
                      Top Notes:
                    </span>
                    <span className="text-[#57534E]">{perfume.topNotes.join(' · ')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-[#9E8055] min-w-[75px] text-[11px] uppercase tracking-wider">
                      Heart Notes:
                    </span>
                    <span className="text-[#57534E]">{perfume.heartNotes.join(' · ')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-[#1C1917] min-w-[75px] text-[11px] uppercase tracking-wider">
                      Base Notes:
                    </span>
                    <span className="text-[#57534E]">{perfume.baseNotes.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Complimentary 24k Gold Engraving Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="engraving" className="text-[11px] tracking-[0.14em] uppercase font-semibold text-[#1C1917] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Complimentary Gold Engraving</span>
                  </label>
                  <span className="text-[10px] text-[#78716C]">Max 16 characters</span>
                </div>
                <input
                  id="engraving"
                  type="text"
                  maxLength={16}
                  placeholder="e.g. S.D. 2026 or MAISON CHLOE"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917] transition-colors placeholder:text-[#A8A29E]"
                />
              </div>

              {/* Occasions tags */}
              <div className="text-[11px] text-[#78716C] flex items-center gap-2">
                <span className="uppercase tracking-wider font-semibold text-[#1C1917]">Best Suited For:</span>
                <span>{perfume.occasions.join(' · ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#EAE4DC] space-y-2 mt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className="w-full py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#C5A880]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag — ₹{currentPrice.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-[#78716C] text-center tracking-wide">
                Includes 2 complimentary discovery vials & luxury ribbon box packaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
