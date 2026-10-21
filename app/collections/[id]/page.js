import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LuxuryWatchCardModal from '@/components/LuxuryWatchCardModal';
import { ALL_WATCHES } from '@/data/watches';

export function generateStaticParams() {
  return ALL_WATCHES.map((w) => ({ id: String(w.id) }));
}

async function ProductContent({ params }) {
  const { id } = await params;
  const watch = ALL_WATCHES.find((w) => w.id === Number.parseInt(id, 10));
  if (!watch) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-ivory/50">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li>
              <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/collections" className="transition-colors hover:text-gold">Collections</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="max-w-[10rem] truncate text-gold sm:max-w-none">
              {watch.name}
            </li>
          </ol>
        </nav>

        <Link href="/collections" className="hidden shrink-0 transition-colors hover:text-gold sm:block">
          ← Back to Catalog
        </Link>
      </div>

      <LuxuryWatchCardModal watch={watch} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-5xl animate-pulse">
      <div className="mb-6 h-3 w-64 bg-ivory/10" />
      <div className="grid min-h-[480px] grid-cols-1 overflow-hidden rounded-[28px] border border-ivory/10 md:min-h-[580px] md:grid-cols-2">
        <div className="bg-[#FAF9F6]/90" />
        <div className="bg-onyx" />
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  return (
    <div className="min-h-screen bg-obsidian px-4 pb-24 page-top md:px-8">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}