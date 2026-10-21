import ShowroomBooking from '@/components/ShowroomBooking';

export const metadata = {
  title: 'Concierge & Showrooms — Sarkin Agogo Watches',
  description: 'Visit our private watch viewing lounges in Abuja CBD and Kano GRA.',
};

export default function ContactPage() {
  return (
    <main className="bg-obsidian min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto text-center mb-16 space-y-4">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold">VIP Concierge Desk</p>
        <h1 
          className="text-5xl md:text-7xl font-light text-ivory"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Connect With A <span className="italic text-gold-gradient">Watch Specialist</span>
        </h1>
        <p className="text-ivory/60 text-sm max-w-xl mx-auto">
          Direct consultations, private viewing reservations, and custom commission requests.
        </p>
      </section>

      {/* Direct Contact Cards */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-onyx border border-ivory/10 p-8 text-center space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-gold">Direct Phone / WhatsApp</p>
          <p className="text-lg text-ivory font-light">+234 702 571 2293</p>
          <p className="text-xs text-ivory/40">Available 24/7 for VIP inquiries</p>
        </div>

        <div className="bg-onyx border border-ivory/10 p-8 text-center space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-gold">Abuja Showroom</p>
          <p className="text-lg text-ivory font-light">CBD, Abuja, Nigeria</p>
          <p className="text-xs text-ivory/40">By Private Appointment Only</p>
        </div>

        <div className="bg-onyx border border-ivory/10 p-8 text-center space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-gold">Kano Showroom</p>
          <p className="text-lg text-ivory font-light">GRA District, Kano, Nigeria</p>
          <p className="text-xs text-ivory/40">By Private Appointment Only</p>
        </div>
      </section>

      {/* Showroom Reservation Form */}
      <ShowroomBooking />
    </main>
  );
}