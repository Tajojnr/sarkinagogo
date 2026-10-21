'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Reveal from '@/components/Reveal';

const START_BID = 14500000;
const MIN_INCREMENT = 100000;
const QUICK_BIDS = [250000, 500000, 1000000];
const START_SECONDS = 4 * 3600 + 12 * 60 + 45;

const fmt = (n) => Math.round(n).toLocaleString('en-US');
const short = (n) => (n >= 1000000 ? `${n / 1000000}M` : `${n / 1000}K`);
const pad = (n) => String(n).padStart(2, '0');

const SEED_BIDS = [
  { id: 'b5', bidder: 'Bidder ••4471', amount: 14500000, when: '12 min ago' },
  { id: 'b4', bidder: 'Bidder ••0928', amount: 14250000, when: '31 min ago' },
  { id: 'b3', bidder: 'Bidder ••7315', amount: 14000000, when: '1 hr ago' },
  { id: 'b2', bidder: 'Bidder ••4471', amount: 13500000, when: '2 hrs ago' },
];

const SPECS = [
  { label: 'Condition', value: '10/10 (Unworn)' },
  { label: 'Box & Papers', value: 'Full Velvet Suite' },
  { label: 'Warranty', value: '2 Year International' },
  { label: 'Viewing', value: 'Abuja VIP Lounge' },
  { label: 'Movement', value: 'Automatic Swiss' },
  { label: 'Delivery', value: 'Armored Escort' },
];

/* Odometer-style number: tweens from old value to new */
function AnimatedNaira({ value }) {
  const ref = useRef(null);
  const shown = useRef(value);

  useEffect(() => {
    const obj = { v: shown.current };
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: () => {
        shown.current = obj.v;
        if (ref.current) ref.current.textContent = fmt(obj.v);
      },
    });
    return () => tween.kill();
  }, [value]);

  return <span ref={ref}>{fmt(value)}</span>;
}

export default function AuctionBiddingCard() {
  const [currentBid, setCurrentBid] = useState(START_BID);
  const [bidCount, setBidCount] = useState(18);
  const [bids, setBids] = useState(SEED_BIDS);
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  const [custom, setCustom] = useState('');
  const [notice, setNotice] = useState(null); // { type: 'success' | 'error', text }
  const noticeTimer = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const closed = secondsLeft === 0;
  const minNext = currentBid + MIN_INCREMENT;
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const flash = (type, text) => {
    clearTimeout(noticeTimer.current);
    setNotice({ type, text });
    noticeTimer.current = setTimeout(() => setNotice(null), 4500);
  };

  const placeBid = (amount) => {
    if (closed) return flash('error', 'Bidding has closed for this lot.');
    if (!Number.isFinite(amount) || amount < minNext) {
      return flash('error', `Minimum bid is ₦${fmt(minNext)}.`);
    }
    setCurrentBid(amount);
    setBidCount((c) => c + 1);
    setBids((prev) =>
      [{ id: `b${Date.now()}`, bidder: 'You', amount, when: 'Just now', mine: true }, ...prev].slice(0, 6)
    );
    setCustom('');
    flash('success', `Bid of ₦${fmt(amount)} recorded successfully.`);
  };

  const onCustomSubmit = (e) => {
    e.preventDefault();
    placeBid(Number(custom));
  };

  return (
    <section
      id="bidding-console"
      className="relative isolate border-t border-gold/20 py-24 md:py-32"
    >
      <div className="container-luxe grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
        {/* LEFT: provenance */}
        <div className="space-y-10 lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-5">Lot Reference № SA-9902-ICE</p>
            <h2 className="display-lg">
              The Presidential <em>Royal Oak</em> Skeleton
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-2xl text-sm leading-relaxed text-ivory/70">
              An ultra-rare piece from the Sarkin Agogo private vault. Crafted with 18k brushed
              rose gold, a sapphire skeleton dial showcasing the balance wheel mechanism, and a
              custom diamond-paved bezel.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="gold-divider mb-8" aria-hidden="true">
              <span>◆</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {SPECS.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-xl text-gold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* RIGHT: bidding console */}
        <div className="relative lg:sticky lg:top-32 lg:col-span-5">
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(197,160,89,0.18),transparent_65%)]"
          />

          <Reveal delay={150}>
            <div className="glass panel-noise relative p-8 shadow-2xl md:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/60 to-transparent"
              />

              {/* Timer */}
              <div className="flex items-center justify-between border-b border-ivory/10 pb-6">
                <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
                  {!closed && <span className="live-dot" aria-hidden="true" />}
                  {closed ? 'Auction Closed' : 'Time Remaining'}
                </span>
                <span
                  className="mono-num text-lg tracking-widest text-gold"
                  role="timer"
                  aria-label={`${hours} hours ${minutes} minutes ${seconds} seconds remaining`}
                >
                  {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
                </span>
              </div>

              {/* Current bid */}
              <div className="border-b border-ivory/10 py-10 text-center">
                <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-ivory/50">
                  Current Highest Bid
                </span>
                <div className="font-display text-5xl font-light tracking-tight text-gold-gradient md:text-6xl">
                  ₦ <AnimatedNaira value={currentBid} />
                </div>
                <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-emerald">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" aria-hidden="true" />
                  Reserve Price Met ({bidCount} bids placed)
                </p>
              </div>

              {/* Quick bids */}
              <div className="space-y-5 pt-8">
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-ivory/60">
                  Place Instant Increment
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {QUICK_BIDS.map((inc, i) => (
                    <button
                      key={inc}
                      type="button"
                      disabled={closed}
                      onClick={() => placeBid(currentBid + inc)}
                      className={`${i === 1 ? 'btn-gold' : 'btn-outline'} px-2 disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      + ₦{short(inc)}
                    </button>
                  ))}
                </div>

                {/* Custom bid */}
                <form onSubmit={onCustomSubmit} className="pt-3">
                  <label htmlFor="custom-bid" className="field-label">
                    Or name your bid
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold">
                        ₦
                      </span>
                      <input
                        id="custom-bid"
                        inputMode="numeric"
                        autoComplete="off"
                        disabled={closed}
                        value={custom ? fmt(Number(custom)) : ''}
                        onChange={(e) => setCustom(e.target.value.replace(/\D/g, ''))}
                        placeholder={fmt(minNext)}
                        className="field mono-num pl-9"
                      />
                    </div>
                    <button type="submit" disabled={closed || !custom} className="btn-gold px-6 disabled:cursor-not-allowed disabled:opacity-40">
                      Bid
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-ivory/40">
                    Minimum next bid: ₦{fmt(minNext)}
                  </p>
                </form>

                {/* Notice */}
                <div role="status" aria-live="polite" className="min-h-[2.75rem]">
                  {notice && (
                    <p
                      className={`border px-4 py-3 text-center text-xs ${
                        notice.type === 'success'
                          ? 'border-gold/30 bg-gold/10 text-gold'
                          : 'border-crimson/40 bg-crimson/10 text-red-300'
                      }`}
                    >
                      {notice.text}
                    </p>
                  )}
                </div>

                <p className="text-center text-[10px] text-ivory/40">
                  Requires 10% refundable security hold. Bids are legally binding.
                </p>
              </div>

              {/* Bid history */}
              <div className="mt-8 border-t border-ivory/10 pt-6">
                <h3 className="eyebrow mb-4 !font-body">Bid History</h3>
                <ul className="space-y-3">
                  {bids.map((b, i) => (
                    <li key={b.id} className="flex items-baseline justify-between gap-4 text-xs">
                      <span className={b.mine ? 'text-gold' : 'text-ivory/60'}>
                        {b.bidder}
                        <span className="ml-2 text-ivory/30">{b.when}</span>
                      </span>
                      <span className={`mono-num ${i === 0 ? 'text-gold' : 'text-ivory/70'}`}>
                        ₦{fmt(b.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}