import Link from 'next/link';
import HeritageBanner from '@/components/HeritageBanner';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Our Heritage',
  description:
    'The story behind Sarkin Agogo: bringing royalty, prestige, and high horology to Nigeria.',
};

const PILLARS = [
  {
    n: '01',
    title: 'Royal Authority',
    body: 'In Hausa culture, “Sarkin Agogo” translates to “The Ruler of Watches”. Every piece we curate carries an aura of leadership and distinction.',
  },
  {
    n: '02',
    title: 'Uncompromising Standards',
    body: 'From mechanical tourbillons to rare diamond-set custom commissions, every timepiece undergoes rigorous multi-point verification before presentation.',
  },
  {
    n: '03',
    title: 'Private Discretion',
    body: 'We offer private viewing appointments in our Abuja and Kano suites, complete with armored delivery services across West Africa.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-obsidian">
      {/* ───────── Hero ───────── */}
      <section className="relative isolate overflow-hidden page-top pb-20 md:pb-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.16),transparent_65%)]"
        />

        <div className="container-luxe max-w-5xl text-center">
          <p className="eyebrow fade-up mb-8">The Royalty of Time</p>

          <h1 className="display-xl fade-up stagger-1">
            Where Heritage Meets <br className="hidden md:block" />
            <em>Precision Horology</em>
          </h1>

          <p className="fade-up stagger-2 mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
            Founded in Northern Nigeria, Sarkin Agogo was established to cater to sovereigns,
            statesmen, and watch connoisseurs who value heritage, authority, and meticulous
            craftsmanship.
          </p>
        </div>
      </section>

      {/* ───────── Editorial ───────── */}
      <section className="border-t border-gold/15 py-20 md:py-28">
        <div className="container-luxe grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Our Story</p>
            <blockquote className="display-lg">
              A watch is never just <em>a watch</em>. It is a statement of{' '}
              <em>lineage</em>.
            </blockquote>
          </Reveal>

          <Reveal delay={150} className="space-y-6 lg:col-span-7">
            <p className="drop-cap text-base leading-[1.9] text-ivory/75">
              Sarkin Agogo was born in Northern Nigeria, a region where authority has always been
              expressed through dignity, discretion, and taste. The name carries that tradition.
              In Hausa, it speaks of rulership, and we hold ourselves to it: every piece we
              present must earn its place in the vault.
            </p>
            <p className="text-base leading-[1.9] text-ivory/75">
              From mechanical tourbillons to rare diamond-set commissions, our pieces are
              verified before they are ever shown. Clients are received privately in our Abuja
              and Kano suites, and each acquisition travels under armored escort, insured from
              the vault door to yours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Pillars ───────── */}
      <section className="border-t border-gold/15 py-20 md:py-28">
        <div className="container-luxe max-w-6xl">
          <Reveal className="mb-14 text-center md:mb-20">
            <p className="eyebrow mb-5">What We Stand For</p>
            <h2 className="display-lg">
              Three <em>principles</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 130}>
                <article className="group panel panel-noise h-full p-8 transition-colors duration-700 hover:border-gold/50 md:p-10">
                  <span className="font-display text-6xl font-light italic text-gold/50 transition-colors duration-700 group-hover:text-gold">
                    {p.n}
                  </span>
                  <span
                    aria-hidden="true"
                    className="my-6 block h-px w-12 origin-left bg-gold/60 transition-all duration-700 group-hover:w-full"
                  />
                  <h3 className="display-md mb-4">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ivory/60">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Brand banner ───────── */}
      <HeritageBanner />

      {/* ───────── Call to action ───────── */}
      <section className="relative isolate overflow-hidden py-24 text-center md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(197,160,89,0.14),transparent_60%)]"
        />

        <Reveal className="container-luxe">
          <div className="gold-divider mx-auto mb-10 max-w-md" aria-hidden="true">
            <span>◆</span>
          </div>

          <h2 className="display-lg mb-10">
            Experience <em>Sarkin Agogo</em>
          </h2>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/collections" className="btn-gold">
              View Collections
            </Link>
            <Link href="/contact" className="btn-outline">
              Book Private Visit
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}