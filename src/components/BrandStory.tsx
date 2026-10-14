import React, { useState } from 'react';
import { Sparkles, Shield, Send, CheckCircle2, Leaf, Clock, HeartHandshake } from 'lucide-react';
import { fleurSoieImg } from '../assets/images';

export const BrandStory: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Bespoke Formulation');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setSentSuccess(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Brand Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
              The ORÉLLE Manifesto · India & Grasse
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal leading-tight">
              A rebellion against mass-market uniformity.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
              <p>
                Founded on the belief that scent is your most intimate signature, ORÉLLE bridges India&apos;s 4,000-year sacred attar distillation heritage with modern French precision and clean minimalist aesthetics.
              </p>
              <p>
                Every ORÉLLE creation harmonizes legendary Indian terroirs—baked clay Mitti Attar and Damascena roses from Kannauj, royal Santalum album from Mysore, wild-harvested agarwood from Assam, and Ruh Khus vetiver—with morning harvests from Grasse and Calabrian citrus.
              </p>
              <p>
                Whether discovering your signature aura through our diagnostic engine, formulating an original blend in our digital lab, or joining a live masterclass in Mumbai or Delhi, ORÉLLE is an invitation to wear your truth.
              </p>
            </div>

            {/* Unboxed Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EAE4DC]">
              <div className="space-y-1">
                <span className="font-serif text-2xl text-[#1C1917]">Kannauj</span>
                <p className="text-xs text-[#78716C]">Sacred Deg-Bhapka hydro-distilled roses & baked earth.</p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-2xl text-[#1C1917]">Mysore & Assam</span>
                <p className="text-xs text-[#78716C]">Government-certified royal sandalwood & aged wild agarwood.</p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-2xl text-[#1C1917]">Clean & Refillable</span>
                <p className="text-xs text-[#78716C]">100% vegan, cruelty-free crystal flacons with refills.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#F4F0EA] border border-[#EAE4DC] overflow-hidden shadow-xl">
              <img
                src={fleurSoieImg}
                alt="ORÉLLE Fragrance Lab Bottling in Grasse"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF8F5] p-6 border border-[#EAE4DC] shadow-md hidden sm:block max-w-xs">
              <p className="font-serif italic text-base text-[#1C1917]">
                &ldquo;Your fragrance should arrive before you speak, and remain long after you depart.&rdquo;
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#9E8055] mt-2 font-mono">
                — Master Parfumeur, ORÉLLE
              </p>
            </div>
          </div>
        </div>

        {/* The Scent Notes Pyramid Education */}
        <div className="p-8 sm:p-12 bg-white border border-[#EAE4DC] shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
              Fragrance Education
            </span>
            <h3 className="font-serif text-3xl text-[#1C1917]">
              Understanding Olfactory Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C]">
              A perfume is a musical composition unfolding across hours on warm skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
              <div className="text-xs font-mono text-[#9E8055] uppercase">01 / The Top Notes</div>
              <h4 className="font-serif text-xl text-[#1C1917]">The Spark of First Impression</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Volatile citrus, herbs, and vibrant pink pepper that introduce the scent upon the first mist. Lasts 15 to 30 minutes.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
              <div className="text-xs font-mono text-[#9E8055] uppercase">02 / The Heart Notes</div>
              <h4 className="font-serif text-xl text-[#1C1917]">The True Soul of the Flacon</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Rich florals, ceremonial matcha, spices, and green woods that develop as the top notes soften. Lasts 4 to 6 hours.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
              <div className="text-xs font-mono text-[#9E8055] uppercase">03 / The Base Notes</div>
              <h4 className="font-serif text-xl text-[#1C1917]">The Lingering Memory</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Sandalwood, dark oud, bourbon vanilla, and ambergris that fuse with your natural skin warmth for 8 to 14+ hours.
              </p>
            </div>
          </div>
        </div>

        {/* Concierge & Consultation Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#F4F0EA] p-8 sm:p-12 border border-[#EAE4DC]">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
              Private Fragrance Concierge · India
            </span>
            <h3 className="font-serif text-3xl text-[#1C1917]">
              Have a question or bespoke fragrance request?
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              Our master scent curators in Mumbai and New Delhi are available for bespoke event hampers, wedding trousseau gifting, workshop inquiries, and personalized formulation consultations.
            </p>
            <div className="text-xs text-[#78716C] space-y-1.5 pt-2 font-mono">
              <div>Mumbai Atelier: Colaba Heritage Precinct, Mumbai 400001</div>
              <div>Delhi Suite: The Chanakya Arcade, Chanakyapuri, New Delhi 110021</div>
              <div>Bengaluru Studio: Lavelle Road, Shanthala Nagar, Bengaluru 560001</div>
              <div>Direct: concierge@orelle.in · +91 (0) 22 4589 7700</div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#EAE4DC]">
            {sentSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#9E8055] mx-auto" />
                <h4 className="font-serif text-2xl text-[#1C1917]">Inquiry Received</h4>
                <p className="text-xs text-[#57534E] max-w-sm mx-auto">
                  An ORÉLLE senior fragrance concierge will review your request and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="inquiry-full-name" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                      Your Name
                    </label>
                    <input
                      id="inquiry-full-name"
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Camille Laurent"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="inquiry-email-address" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                      Email Address
                    </label>
                    <input
                      id="inquiry-email-address"
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g. camille@example.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-subject" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    Inquiry Topic
                  </label>
                  <select
                    id="inquiry-subject"
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  >
                    <option value="Bespoke Formulation">Bespoke Flacon Formulation Assistance</option>
                    <option value="Custom Hamper">Bulk / Wedding / Event Gifting Hampers</option>
                    <option value="Fragrance Consultation">Private 1-on-1 Virtual Consultation</option>
                    <option value="Sample Discovery">Discovery Set Scent Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-message-content" className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    How May We Assist You?
                  </label>
                  <textarea
                    id="inquiry-message-content"
                    rows={3}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us about the scent, occasion, or recipient..."
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
