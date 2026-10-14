import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Gift, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PERFUMES } from '../data/perfumes';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    selectedSamples,
    toggleSample,
    isGiftWrapped,
    setIsGiftWrapped,
    total,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyPromoCode(inputCode);
    if (!ok) {
      setPromoError('Invalid code. Try "OREL10" for 10% off.');
    } else {
      setPromoError('');
      setInputCode('');
    }
  };

  const sampleOptions = [
    'Aura Nocturna (Smoky Oud)',
    'Fleur de Soie (Jasmine)',
    'Soleil Doré (Solar Bergamot)',
    'Santal & Cachemire (Sandalwood)',
    'Vanille Céleste (Bourbon Vanilla)',
    'Matcha Botanique (Green Tea)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#D8CEBE] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EAE4DC] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#1C1917] font-normal tracking-tight">
                Your Olfactory Bag
              </h2>
              <span className="text-[11px] text-[#78716C] uppercase tracking-wider">
                {cart.length} {cart.length === 1 ? 'Creation' : 'Creations'} Selected
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#9E8055]">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#1C1917]">Your bag is empty</h3>
                <p className="text-xs text-[#78716C] max-w-xs mx-auto">
                  Explore our signature flacons, formulate your own alchemy, or discover your match via our scent quiz.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-[#EAE4DC] flex gap-4 items-start"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover bg-[#F4F0EA] border border-[#EAE4DC] shrink-0"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base text-[#1C1917] leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A8A29E] hover:text-[#DC2626] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#78716C] italic font-serif">
                        {item.subtitle}
                      </div>

                      {/* Details (Engraving or Hamper items) */}
                      {item.details?.engraving && (
                        <div className="text-[10px] text-[#9E8055] font-mono">
                          Engraved: &ldquo;{item.details.engraving}&rdquo;
                        </div>
                      )}

                      {item.details?.notes && (
                        <div className="text-[10px] text-[#78716C] line-clamp-1">
                          Notes: {item.details.notes.top.join(', ')} · {item.details.notes.base.join(', ')}
                        </div>
                      )}

                      {item.details?.giftOccasion && (
                        <div className="text-[10px] text-[#78716C]">
                          For {item.details.recipientName} ({item.details.giftOccasion}) · {item.details.waxSeal}
                        </div>
                      )}

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#EAE4DC] bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#EAE4DC] text-[#78716C] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#EAE4DC] text-[#78716C] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-sm font-mono font-semibold text-[#1C1917] tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Complimentary Discovery Samples (Gen Z favorite touch) */}
                <div className="p-4 bg-[#F4F0EA] border border-[#EAE4DC] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Complimentary Discovery Samples</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#9E8055]">Choose 2 (Free)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    {sampleOptions.map((sample) => {
                      const isPicked = selectedSamples.includes(sample);
                      return (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => toggleSample(sample)}
                          className={`p-2 text-left border transition-all text-[10px] leading-tight flex items-start gap-1.5 ${
                            isPicked
                              ? 'border-[#1C1917] bg-white text-[#1C1917] font-semibold'
                              : 'border-[#D8CEBE] text-[#78716C] hover:border-[#9E8055]'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-xs border shrink-0 mt-0.5 flex items-center justify-center ${
                              isPicked ? 'bg-[#1C1917] border-[#1C1917] text-white' : 'border-[#A8A29E]'
                            }`}
                          >
                            {isPicked && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span>{sample}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complimentary Gift Box & Card Toggle */}
                <div className="p-3 bg-white border border-[#EAE4DC] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#9E8055]" />
                    <div>
                      <div className="text-xs font-medium text-[#1C1917]">Signature Gift Packaging</div>
                      <div className="text-[10px] text-[#78716C]">Gold-embossed box & silk ribbon</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGiftWrapped(!isGiftWrapped)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-wider font-semibold border transition-all ${
                      isGiftWrapped ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'border-[#D8CEBE] text-[#78716C]'
                    }`}
                  >
                    {isGiftWrapped ? 'Included ✓' : 'Add Free'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Calculations */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE4DC] space-y-4">
              {/* Promo code field */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 bg-[#F4F0EA] border border-[#C5A880] text-xs">
                    <span className="font-mono text-[#1C1917]">Promo &quot;{promoCode}&quot; (-10%)</span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#DC2626] hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ORELLE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-[#D8CEBE] uppercase font-mono focus:outline-none focus:border-[#1C1917]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FAF8F5] border border-[#1C1917] text-xs tracking-wider uppercase font-semibold text-[#1C1917] hover:bg-[#F4F0EA]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[10px] text-[#DC2626] mt-1">{promoError}</p>}
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-1.5 text-xs text-[#57534E] pt-2 border-t border-[#F4F0EA]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1C1917]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#9E8055]">
                    <span>Atelier Privilege (10%)</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Insured Delivery</span>
                  <span className="font-mono text-[#1C1917]">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1917] pt-2 border-t border-[#EAE4DC]">
                  <span className="font-serif">Total</span>
                  <span className="font-mono tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onOpenCheckout();
                }}
                className="w-full py-4 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout — ₹{total.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
