import { Suspense } from 'react';
import Link from 'next/link';
import CheckoutForm from '@/components/CheckoutForm';
import { ALL_WATCHES } from '@/data/watches';

export const metadata = {
  title: 'Acquisition',
  description: 'Complete your luxury timepiece acquisition.',
};

/* Reads searchParams, so it must live inside <Suspense> */
async function CheckoutContent({ searchParams }) {
  const params = await searchParams;
  const id = Number.parseInt(params?.watch, 10);
  const watch = ALL_WATCHES.find((w) => w.id === id) || ALL_WATCHES[0];

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-10 flex flex-col gap-4 border-b border-ivory/10 pb-6 md:mb-14 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
            <li>
              <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/collections" className="transition-colors hover:text-gold">Collections</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="max-w-[12rem] truncate sm:max-w-none">
              <Link href={`/collections/${watch.id}`} className="transition-colors hover:text-gold">
                {watch.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gold">Acquisition</li>
          </ol>
        </nav>

        <p className="eyebrow">Private Order Desk</p>
      </div>

      <CheckoutForm watch={watch} />
    </>
  );
}

/* Placeholder shown while the watch is resolved */
function CheckoutSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="mb-10 flex items-center justify-between border-b border-ivory/10 pb-6 md:mb-14">
        <div className="h-3 w-64 bg-ivory/10" />
        <div className="hidden h-3 w-32 bg-gold/20 md:block" />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-8 lg:col-span-7">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-8 border-t border-ivory/15" />
            ))}
          </div>
          <div className="h-12 w-3/4 bg-ivory/10" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 border border-ivory/10 bg-ivory/[0.03]" />
            ))}
          </div>
        </div>
        <div className="hidden h-[34rem] border border-gold/20 bg-onyx lg:col-span-5 lg:block" />
      </div>
    </div>
  );
}

export default function CheckoutPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-obsidian page-top pb-24 md:pb-32">
      <div className="container-luxe">
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}