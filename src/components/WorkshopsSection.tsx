import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Users, Check, ArrowRight, X, ShieldCheck, Ticket } from 'lucide-react';
import { WORKSHOPS, Workshop } from '../data/workshops';

export const WorkshopsSection: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [bookingCity, setBookingCity] = useState<string>('Mumbai');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>('Rhea Kapoor');
  const [guestEmail, setGuestEmail] = useState<string>('rhea.kapoor@example.com');
  const [guestPhone, setGuestPhone] = useState<string>('+91 98201 44521');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [reservationId, setReservationId] = useState<string>('');

  const handleOpenBooking = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    const defaultLoc = workshop.locations[0];
    setBookingCity(defaultLoc.city);
    setBookingDate(defaultLoc.nextDates[0]);
    setBookingSuccess(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `WS-${bookingCity.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationId(generatedId);
    setBookingSuccess(true);
  };

  return (
    <section id="workshops" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#9E8055] font-semibold">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Masterclasses & Atelier Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            ORÉLLE Perfume Workshops
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Step behind the perfumer&apos;s organ. Discover the science of scent design, sample over 40 rare Indian and French botanical absolutes, and blend your own custom 50ml flacon to take home.
          </p>
        </div>

        {/* Masterclass Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {WORKSHOPS.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white border border-[#EAE4DC] hover:border-[#C5A880] transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md group"
            >
              {/* Image & Tier Tag */}
              <div className="relative aspect-[16/10] bg-[#F4F0EA] overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-[#FAF8F5] text-[10px] tracking-[0.16em] uppercase px-2.5 py-1">
                  {workshop.tier}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C1917] text-xs font-mono font-semibold px-2.5 py-1 border border-[#EAE4DC] tabular-nums">
                  ₹{workshop.pricePerSeat.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Workshop Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1C1917] font-normal leading-snug">
                      {workshop.title}
                    </h3>
                    <p className="text-xs text-[#78716C] italic font-serif mt-1">
                      {workshop.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716C] pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9E8055]" />
                      <span>{workshop.duration}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#9E8055]" />
                      <span>{workshop.groupSize}</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {workshop.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-[#F4F0EA]">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                      What You Will Create:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#57534E]">
                      {workshop.curriculum.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#9E8055] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Available Cities */}
                  <div className="space-y-1 text-xs text-[#78716C]">
                    <span className="uppercase tracking-wider text-[10px] font-semibold text-[#1C1917] block">
                      Atelier Locations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {workshop.locations.map((loc) => (
                        <span
                          key={loc.city}
                          className="text-[11px] px-2 py-0.5 bg-[#F4F0EA] text-[#44403C] border border-[#EAE4DC]"
                        >
                          {loc.city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE4DC]">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(workshop)}
                    className="w-full py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Reserve Atelier Seat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private & Corporate Masterclass Banner */}
        <div className="mt-16 p-8 sm:p-10 bg-[#F4F0EA] border border-[#EAE4DC] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#9E8055] font-semibold">
              Private Events & Gifting
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Host a Private Scent Atelier for Your Occasion
            </h4>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              We curate private fragrance creation parties for birthdays, bridal showers, intimate gatherings, and luxury corporate retreats across Mumbai, Delhi, Bengaluru, and destination weddings in Rajasthan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenBooking(WORKSHOPS[2])}
            className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-semibold transition-colors shrink-0"
          >
            Inquire for Private Booking
          </button>
        </div>
      </div>

      {/* Interactive Reservation Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <div
            className="relative bg-[#FAF8F5] max-w-xl w-full border border-[#D8CEBE] shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-white border-b border-[#EAE4DC] flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
                  Atelier Reservation
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] font-normal">
                  {selectedWorkshop.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWorkshop(null)}
                className="p-2 text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmReservation} className="p-6 sm:p-8 space-y-6">
                {/* City & Venue Selection */}
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    01. Select Atelier City & Studio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedWorkshop.locations.map((loc) => (
                      <button
                        key={loc.city}
                        type="button"
                        onClick={() => {
                          setBookingCity(loc.city);
                          setBookingDate(loc.nextDates[0]);
                        }}
                        className={`py-2 px-3 text-xs uppercase tracking-wider font-medium border text-center transition-all ${
                          bookingCity === loc.city
                            ? 'border-[#1C1917] bg-[#1C1917] text-white font-semibold'
                            : 'border-[#EAE4DC] text-[#57534E] hover:border-[#C5A880]'
                        }`}
                      >
                        {loc.city}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#78716C] italic font-serif">
                    Venue: {selectedWorkshop.locations.find((l) => l.city === bookingCity)?.venue}
                  </p>
                </div>

                {/* Date & Time Slot Selection */}
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    02. Upcoming Scheduled Sessions
                  </label>
                  <div className="space-y-2">
                    {selectedWorkshop.locations
                      .find((l) => l.city === bookingCity)
                      ?.nextDates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBookingDate(d)}
                          className={`w-full p-3 text-left border text-xs flex items-center justify-between transition-all ${
                            bookingDate === d
                              ? 'border-[#1C1917] bg-[#F4F0EA] text-[#1C1917] font-semibold'
                              : 'border-[#EAE4DC] text-[#57534E] hover:border-[#D8CEBE]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#9E8055]" />
                            <span>{d}</span>
                          </span>
                          <span className="text-[10px] text-[#9E8055] uppercase tracking-wider">
                            Available Seats
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Attendee Info */}
                <div className="space-y-3 pt-2 border-t border-[#EAE4DC]">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                    03. Guest Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone (+91)"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D8CEBE] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                {/* Pricing & Confirmation */}
                <div className="pt-4 border-t border-[#EAE4DC] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#1C1917]">Seat Investment</div>
                      <div className="text-[10px] text-[#78716C]">Includes bespoke 50ml flacon & refreshments</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-[#1C1917] tabular-nums">
                      ₹{selectedWorkshop.pricePerSeat.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1C1917] hover:bg-[#332F2C] text-[#FAF8F5] text-xs tracking-wider uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-[#C5A880]" />
                    <span>Confirm Atelier Seat Reservation</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success Receipt */
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#9E8055]">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#9E8055] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h4 className="font-serif text-3xl text-[#1C1917]">
                    Welcome to the Atelier, {guestName}
                  </h4>
                  <p className="text-xs text-[#57534E] max-w-sm mx-auto">
                    A formal invitation docket with studio access details and prep materials has been sent to {guestEmail}.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#EAE4DC] text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#F4F0EA] pb-1.5">
                    <span className="text-[#78716C]">RESERVATION ID:</span>
                    <span className="font-bold text-[#1C1917]">{reservationId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F4F0EA] pb-1.5">
                    <span className="text-[#78716C]">WORKSHOP:</span>
                    <span className="text-[#1C1917]">{selectedWorkshop.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F4F0EA] pb-1.5">
                    <span className="text-[#78716C]">CITY & VENUE:</span>
                    <span className="text-[#1C1917]">{bookingCity} Atelier</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F4F0EA] pb-1.5">
                    <span className="text-[#78716C]">SESSION DATE:</span>
                    <span className="text-[#1C1917]">{bookingDate}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold">
                    <span>SEAT PASS:</span>
                    <span>₹{selectedWorkshop.pricePerSeat.toLocaleString('en-IN')} (Confirmed)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedWorkshop(null)}
                  className="px-8 py-3.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#332F2C]"
                >
                  Close & Return to Atelier
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
