import Link from 'next/link';
import Image from 'next/image';

const fmt = (n) => Number(n || 0).toLocaleString('en-US');
const serial = (id) => `SA-2026-${String(id).padStart(4, '0')}`;

export default function WatchCard({ watch }) {
  return (
    <article className="watch-card group panel panel-noise relative flex h-full flex-col overflow-hidden">
      {/* Badge */}
      {watch.badge && (
        <span className="absolute left-4 top-4 z-20 rounded-full border border-gold/40 bg-obsidian/80 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.25em] text-gold backdrop-blur-md">
          {watch.badge}
        </span>
      )}

      {/* Serial number */}
      <span className="mono-num absolute right-4 top-4 z-20 text-[9px] tracking-[0.2em] text-ivory/30">
        № {serial(watch.id)}
      </span>

      {/* Image stage (decorative; the title link names the card) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-obsidian/40 to-onyx">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(197,160,89,0.14),transparent_60%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        />
        <Image
          src={watch.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 90vw"
          className="watch-img object-contain p-10 drop-shadow-[0_24px_30px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Details */}
      <div className="relative flex flex-1 flex-col justify-between border-t border-gold/10 bg-obsidian/40 p-6">
        <div>
          <p className="eyebrow mb-3 !text-[9px] !text-gold/70">{watch.category}</p>

          <h3 className="font-display text-2xl font-light leading-tight text-ivory transition-colors duration-500 group-hover:text-gold">
            {/* Stretched link: the whole card is clickable */}
            <Link
              href={`/collections/${watch.id}`}
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {watch.name}
            </Link>
          </h3>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ivory/50">
            {watch.specs}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-ivory/10 pt-5">
          <div>
            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-ivory/40">
              Price
            </span>
            <span className="mono-num text-lg tracking-tight text-gold-gradient">
              ₦ {fmt(watch.price)}
            </span>
          </div>

          {/* Sits above the stretched link */}
          <Link
            href={`/checkout?watch=${watch.id}`}
            className="group/acquire relative z-20 inline-flex min-h-12 items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ivory/80 transition-colors hover:text-gold"
          >
            <span className="relative">
              Acquire Piece
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-30 bg-gold/60 transition-transform duration-500 group-hover/acquire:scale-x-100"
              />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover/acquire:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}