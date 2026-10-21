'use client';

export default function WhatsAppWidget() {
  const whatsappUrl = `https://wa.me/2347025712293?text=${encodeURIComponent('Hello Sarkin Agogo Watches, I would like to speak with a watch specialist.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-obsidian border border-gold/40 hover:border-gold px-4 py-3 rounded-full shadow-2xl backdrop-blur-md group transition-all duration-300 hover:scale-105"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
      </span>
      <span className="text-[11px] tracking-[0.2em] uppercase text-ivory group-hover:text-gold transition-colors font-medium">
        VIP Concierge
      </span>
    </a>
  );
}