import Reveal from '@/components/Reveal';

const STATS = [
  { value: '100%', label: 'Authenticity Guaranteed' },
  { value: '2 Lounges', label: 'Abuja & Kano Showrooms' },
  { value: 'Armored', label: 'Insured Delivery Nationwide' },
];

export default function HeritageBanner() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gold/20 bg-onyx py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.12),transparent_60%)]"
      />

      <div className="container-luxe max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow mb-8">The Meaning of Sarkin Agogo</p>
          <h2 className="display-lg">
            From Hausa, <em>The King of Watches</em>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
            Every watch is inspected for perfection and presented in our signature velvet
            packaging, for statesmen, executives, and collectors across Abuja, Kano, and beyond.
          </p>
        </Reveal>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="panel panel-noise h-full px-6 py-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-light text-gold-gradient">
                  {s.value}
                </dd>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}