import AuctionCanvasHero from '@/components/AuctionCanvasHero';
import AuctionBiddingCard from '@/components/AuctionBiddingCard';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'The Royal Vault',
  description:
    'Bid on exclusive, rare, and commission-only luxury timepieces from Sarkin Agogo.',
};

const STEPS = [
  {
    n: '01',
    title: 'Secure your place',
    body: 'A 10% refundable security hold confirms you as a serious bidder.',
  },
  {
    n: '02',
    title: 'Bid with confidence',
    body: 'Place instant increments or set your own bid. Every bid is legally binding.',
  },
  {
    n: '03',
    title: 'Settle & receive',
    body: 'Payment is confirmed privately with your VIP concierge, then your piece travels under armored escort.',
  },
];

export default function AuctionsPage() {
  return (
    <div className="bg-obsidian">
      <AuctionCanvasHero />
      <AuctionBiddingCard />

      <section className="relative border-t border-gold/20 py-24 md:py-32">
        <div className="container-luxe">
          <Reveal className="text-center mb-16 md:mb-20">
            <p className="eyebrow mb-5">The Vault Protocol</p>
            <h2 className="display-lg">
              How the <em>Vault</em> works
            </h2>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className="text-center md:text-left">
                <span className="font-display text-6xl font-light italic text-gold/40">
                  {s.n}
                </span>
                <div className="gold-divider my-5 md:hidden" aria-hidden="true">
                  <span>◆</span>
                </div>
                <h3 className="display-md mt-2 mb-3">{s.title}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed max-w-sm mx-auto md:mx-0">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}