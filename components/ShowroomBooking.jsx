'use client';

import { useState } from 'react';

export default function ShowroomBooking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-obsidian py-24 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-[10px] tracking-[0.5em] text-gold uppercase">Private Viewing</p>
          <h2 
            className="text-4xl md:text-6xl text-ivory font-light leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Experience Horror In Person. <br />
            <span className="italic text-gold-gradient">Book A Showroom Visit.</span>
          </h2>
          <p className="text-ivory/60 text-sm leading-relaxed font-light">
            Enjoy a private, one-on-one consultation in our VIP suites in Abuja or Kano. 
            Sample rare timepieces over premium coffee or champagne in total discretion.
          </p>

          <div className="space-y-4 pt-4 border-t border-ivory/10">
            <div>
              <p className="text-gold text-xs uppercase tracking-widest">Abuja VIP Suite</p>
              <p className="text-ivory/50 text-xs mt-0.5">Central Business District, Abuja, Nigeria</p>
            </div>
            <div>
              <p className="text-gold text-xs uppercase tracking-widest">Kano Lounge</p>
              <p className="text-ivory/50 text-xs mt-0.5">GRA District, Kano, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-6 bg-onyx border border-gold/20 p-8 md:p-10 rounded-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-2xl text-gold font-serif">Appointment Requested</h3>
              <p className="text-xs text-ivory/70 max-w-md mx-auto">
                Our concierge desk will reach out via WhatsApp / Call within 2 hours to confirm your private viewing time slot.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl text-ivory font-serif mb-4">Request Consultation</h3>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-ivory/60 block mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Alh. Ibrahim Bello"
                  className="w-full bg-obsidian border border-ivory/15 p-3 text-xs text-ivory focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-ivory/60 block mb-2">Phone Number / WhatsApp</label>
                <input 
                  required
                  type="tel" 
                  placeholder="+234 800 000 0000"
                  className="w-full bg-obsidian border border-ivory/15 p-3 text-xs text-ivory focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-ivory/60 block mb-2">Location</label>
                  <select className="w-full bg-obsidian border border-ivory/15 p-3 text-xs text-ivory focus:border-gold outline-none">
                    <option>Abuja Lounge</option>
                    <option>Kano Lounge</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-ivory/60 block mb-2">Preferred Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-obsidian border border-ivory/15 p-3 text-xs text-ivory focus:border-gold outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold w-full text-center mt-4">
                Confirm Private Viewing
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}