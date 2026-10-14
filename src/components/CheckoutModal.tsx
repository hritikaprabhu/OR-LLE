import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, total, discount, clearCart, isGiftWrapped, selectedSamples } = useCart();

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [name, setName] = useState('Helena Dubois');
  const [email, setEmail] = useState('helena.dubois@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('New York');
  const [postal, setPostal] = useState('10021');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'concierge'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = 'ORELLE-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrder);
    setStep('confirmation');
    clearCart();
  };

  const handleFinish = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className="relative bg-[#FAF8F5] max-w-2xl w-full border border-[#D8CEBE] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#EAE4DC] flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
              Atelier Checkout
            </div>
            <h2 className="font-serif text-2xl text-[#1C1917] font-normal">
              {step === 'details' ? 'Private Client Details' : 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={step === 'details' ? onClose : handleFinish}
            className="p-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            {/* Contact details */}
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                01. Recipient & Contact Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="checkout-full-name" className="text-xs font-semibold text-[#1C1917]">Full Name</label>
                  <input
                    id="checkout-full-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="checkout-email-address" className="text-xs font-semibold text-[#1C1917]">Email for Tracking</label>
                  <input
                    id="checkout-email-address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="checkout-phone-number" className="text-xs font-semibold text-[#1C1917]">Phone Number</label>
                <input
                  id="checkout-phone-number"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                />
              </div>
            </div>

            {/* Delivery destination */}
            <div className="space-y-4 pt-4 border-t border-[#EAE4DC]">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                02. White-Glove Delivery Address
              </span>

              <div className="space-y-1">
                <label htmlFor="checkout-street-address" className="text-xs font-semibold text-[#1C1917]">Street Address</label>
                <input
                  id="checkout-street-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="checkout-city" className="text-xs font-semibold text-[#1C1917]">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="checkout-postal-code" className="text-xs font-semibold text-[#1C1917]">Postal Code</label>
                  <input
                    id="checkout-postal-code"
                    type="text"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="checkout-country" className="text-xs font-semibold text-[#1C1917]">Country</label>
                  <input
                    id="checkout-country"
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-4 border-t border-[#EAE4DC]">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C1917] block">
                03. Payment Preference
              </span>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'apple', label: 'Apple Pay' },
                  { id: 'concierge', label: 'Atelier Invoicing' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`py-3 px-3 text-center border text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-[#1C1917] bg-[#1C1917] text-white'
                        : 'border-[#EAE4DC] hover:border-[#C5A880] text-[#57534E]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#EAE4DC] space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-serif text-lg text-[#1C1917]">Total Amount Due</span>
                <span className="font-mono text-xl font-bold text-[#1C1917] tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Confirm Order (₹{total.toLocaleString('en-IN')})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#78716C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E8055]" />
                <span>256-bit Encrypted SSL · Guaranteed Authenticity from Grasse Atelier</span>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Receipt */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#9E8055]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
                Order Confirmed
              </span>
              <h3 className="font-serif text-3xl text-[#1C1917]">
                Thank you, {name}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto pt-1">
                Your order has been transmitted to our Grasse perfumery studio. Our master artisans are preparing your formulations and hand-embossing your stationery.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-6 bg-white border border-[#EAE4DC] text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#F4F0EA] pb-2">
                <span className="text-[#78716C]">ORDER REFERENCE:</span>
                <span className="font-bold text-[#1C1917]">{orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#F4F0EA] pb-2">
                <span className="text-[#78716C]">DELIVERY TO:</span>
                <span className="text-[#1C1917]">{address}, {city}</span>
              </div>
              <div className="flex justify-between border-b border-[#F4F0EA] pb-2">
                <span className="text-[#78716C]">ESTIMATED ARRIVAL:</span>
                <span className="text-[#1C1917]">3 Business Days (Express Insured)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span>PAID:</span>
                <span>₹{total.toLocaleString('en-IN')} (Settled)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-semibold transition-colors"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
