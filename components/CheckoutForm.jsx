'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const STEPS = [
  { num: 1, label: 'Shipping' },
  { num: 2, label: 'Schedule' },
  { num: 3, label: 'Review' },
];

const CITIES = {
  Abuja: 'FCT',
  Kano: 'Kano',
  Lagos: 'Lagos',
  'Port Harcourt': 'Rivers',
  Kaduna: 'Kaduna',
  Other: '',
};

const WINDOWS = [
  'Morning (9:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 7:00 PM)',
];

const fmt = (n) => Number(n || 0).toLocaleString('en-US');

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M2 4l4 4 4-4" />
  </svg>
);

function Field({ id, label, error, optional, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal text-ivory/30">optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Summary({ watch, compact = false }) {
  if (!watch) return null;

  if (compact) {
    return (
      <div className="panel flex items-center gap-4 p-4 lg:hidden">
        <div className="relative h-16 w-16 shrink-0 bg-obsidian">
          <Image src={watch.image} alt="" fill sizes="64px" className="object-contain p-2" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="eyebrow !text-[9px]">{watch.category}</p>
          <p className="truncate font-display text-lg text-ivory">{watch.name}</p>
        </div>
        <p className="mono-num text-sm text-gold">₦{fmt(watch.price)}</p>
      </div>
    );
  }

  return (
    <aside aria-label="Order summary" className="panel panel-noise sticky top-32 space-y-6 p-8">
      <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
        <span className="eyebrow">Selected Specification</span>
        <span className="mono-num text-[9px] uppercase tracking-widest text-emerald">
          ● Verified Authentic
        </span>
      </div>

      <div className="relative aspect-square w-full border border-ivory/10 bg-obsidian">
        <Image
          src={watch.image}
          alt={watch.name}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
        />
      </div>

      <div>
        <p className="eyebrow mb-2 !text-gold/80">{watch.category}</p>
        <h3 className="font-display text-3xl font-light leading-snug text-ivory">{watch.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs text-ivory/50">{watch.specs}</p>
      </div>

      <dl className="space-y-3 border-t border-ivory/10 pt-6 text-xs">
        <div className="flex justify-between">
          <dt className="text-ivory/50">Item Value</dt>
          <dd className="mono-num text-ivory">₦ {fmt(watch.price)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ivory/50">Armored Courier Escort</dt>
          <dd className="text-emerald">Complimentary</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ivory/50">Transit Insurance</dt>
          <dd className="text-emerald">100% Covered</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-ivory/10 pt-5">
          <dt className="text-[10px] uppercase tracking-[0.2em] text-ivory">Total Investment</dt>
          <dd className="font-display text-3xl font-light text-gold-gradient">₦ {fmt(watch.price)}</dd>
        </div>
      </dl>

      <p className="border-t border-ivory/5 pt-4 text-[10px] leading-relaxed text-ivory/40">
        Vault Order Desk. Payment instructions are confirmed directly via VIP Concierge prior to
        courier departure.
      </p>
    </aside>
  );
}

export default function CheckoutForm({ watch }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [dates, setDates] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Abuja',
    state: 'FCT',
    deliveryDate: '',
    deliveryWindow: WINDOWS[0],
  });

  const topRef = useRef(null);
  const firstRender = useRef(true);

  // Next four delivery days (skipping Sundays), generated from today's date
  useEffect(() => {
    const out = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (out.length < 4) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) {
        out.push(
          d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
        );
      }
    }
    setDates(out);
  }, []);

  // Bring the form back into view whenever the step changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, submitted]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city') {
      setForm((f) => ({ ...f, city: value, state: CITIES[value] ?? f.state }));
      return;
    }
    setField(name, value);
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (form.fullName.trim().length < 2) e.fullName = 'Please enter the recipient’s full name.';
      if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number.';
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.';
      if (form.address.trim().length < 5) e.address = 'Please enter the delivery address.';
      if (!form.state.trim()) e.state = 'Please enter the state.';
    }
    if (s === 2 && !form.deliveryDate) e.deliveryDate = 'Please choose a handover date.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(step)) return;
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setOrderRef(`SA-ORD-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const goTo = (n) => {
    setErrors({});
    setStep(n);
  };

  const input = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange,
    className: 'field',
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  /* ───────────── SUCCESS ───────────── */
  if (submitted) {
    return (
      <div ref={topRef} className="panel panel-noise fade-up mx-auto max-w-2xl px-6 py-16 text-center md:px-12 md:py-20">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="eyebrow mb-4">Order Reference № {orderRef}</p>
        <h1 className="display-lg mb-6">
          Acquisition <em>Requested</em>
        </h1>

        <div className="gold-divider mx-auto mb-6 max-w-xs" aria-hidden="true">
          <span>◆</span>
        </div>

        <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-ivory/70">
          Thank you, <span className="text-gold">{form.fullName}</span>. Your request for the{' '}
          <span className="text-gold">{watch?.name}</span> has been logged. Our VIP concierge will
          reach you on WhatsApp (<span className="text-gold">{form.phone}</span>) to verify payment
          and schedule armored dispatch for{' '}
          <span className="text-gold">{form.deliveryDate}</span>.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/collections" className="btn-gold">Return to Vault</Link>
          <a
            href={`https://wa.me/2347025712293?text=${encodeURIComponent(
              `Hello Sarkin Agogo, I have initiated an order request (${orderRef}) for ${watch?.name}. Name: ${form.fullName}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Direct Concierge Chat
          </a>
        </div>
      </div>
    );
  }

  /* ───────────── FORM ───────────── */
  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <div ref={topRef} className="space-y-8 lg:col-span-7">
        <Summary watch={watch} compact />

        {/* Step indicator */}
        <nav aria-label="Checkout progress">
          <ol className="grid grid-cols-3 gap-3">
            {STEPS.map((s) => {
              const done = step > s.num;
              const current = step === s.num;
              return (
                <li key={s.num}>
                  <button
                    type="button"
                    disabled={!done}
                    onClick={() => goTo(s.num)}
                    aria-current={current ? 'step' : undefined}
                    className={`block w-full text-left disabled:cursor-default ${done ? 'group' : ''}`}
                  >
                    <span
                      className={`mb-3 block h-px w-full transition-colors duration-700 ${
                        current || done ? 'bg-gold' : 'bg-ivory/15'
                      }`}
                    />
                    <span
                      className={`block text-[10px] uppercase tracking-[0.25em] transition-colors ${
                        current ? 'text-gold' : done ? 'text-ivory/70 group-hover:text-gold' : 'text-ivory/30'
                      }`}
                    >
                      <span className="mono-num mr-2">0{s.num}</span>
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          <div key={step} className="fade-up space-y-8">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <header>
                  <h1 className="display-lg">Destination <em>Details</em></h1>
                  <p className="mt-3 text-sm text-ivory/50">
                    Enter the recipient and location for insured escort delivery.
                  </p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field id="fullName" label="Full Name" error={errors.fullName} className="sm:col-span-2">
                    <input {...input('fullName')} autoComplete="name" placeholder="Alh. Ibrahim Bello" />
                  </Field>

                  <Field id="phone" label="Phone / WhatsApp Number" error={errors.phone}>
                    <input {...input('phone')} type="tel" autoComplete="tel" placeholder="+234 800 000 0000" />
                  </Field>

                  <Field id="email" label="Email Address" error={errors.email} optional>
                    <input {...input('email')} type="email" autoComplete="email" placeholder="you@domain.com" />
                  </Field>

                  <Field id="address" label="Street Address / Residence" error={errors.address} className="sm:col-span-2">
                    <input {...input('address')} autoComplete="street-address" placeholder="e.g. 12 Ahmadu Bello Way, Maitama" />
                  </Field>

                  <Field id="city" label="City">
                    <div className="relative">
                      <select {...input('city')} className="field appearance-none pr-10">
                        {Object.keys(CITIES).map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
                        <ChevronDown />
                      </span>
                    </div>
                  </Field>

                  <Field id="state" label="State" error={errors.state}>
                    <input {...input('state')} autoComplete="address-level1" placeholder="FCT" />
                  </Field>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <header>
                  <h1 className="display-lg">Armored Dispatch <em>Schedule</em></h1>
                  <p className="mt-3 text-sm text-ivory/50">
                    Select your preferred handover window. Deliveries are made by secure courier.
                  </p>
                </header>

                <fieldset>
                  <legend className="field-label">Select Date Slot</legend>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {dates.length === 0
                      ? [0, 1, 2, 3].map((i) => (
                          <div key={i} className="h-[5.5rem] animate-pulse border border-ivory/10 bg-ivory/[0.02]" />
                        ))
                      : dates.map((date) => {
                          const selected = form.deliveryDate === date;
                          return (
                            <button
                              key={date}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => setField('deliveryDate', date)}
                              className={`min-h-[5.5rem] border p-5 text-left transition-all duration-500 ${
                                selected
                                  ? 'border-gold bg-gold/10 text-gold shadow-[0_0_30px_rgba(197,160,89,0.12)]'
                                  : 'border-ivory/15 text-ivory/70 hover:border-gold/50'
                              }`}
                            >
                              <span className="mb-2 block text-[9px] uppercase tracking-[0.3em] text-gold/60">
                                Secure Window
                              </span>
                              <span className="font-display text-xl">{date}</span>
                            </button>
                          );
                        })}
                  </div>
                  {errors.deliveryDate && (
                    <p role="alert" className="mt-3 text-xs text-red-300">{errors.deliveryDate}</p>
                  )}
                </fieldset>

                <Field id="deliveryWindow" label="Preferred Time Slot">
                  <div className="relative">
                    <select {...input('deliveryWindow')} className="field appearance-none pr-10">
                      {WINDOWS.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
                      <ChevronDown />
                    </span>
                  </div>
                </Field>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <header>
                  <h1 className="display-lg">Verification &amp; <em>Authorization</em></h1>
                  <p className="mt-3 text-sm text-ivory/50">
                    Please review the order before submitting it to the concierge.
                  </p>
                </header>

                <dl className="panel panel-noise divide-y divide-ivory/10 text-sm">
                  {[
                    { label: 'Recipient', value: `${form.fullName} · ${form.phone}`, edit: 1 },
                    {
                      label: 'Destination',
                      value: `${form.address}, ${form.city}, ${form.state}`,
                      edit: 1,
                    },
                    {
                      label: 'Handover Slot',
                      value: `${form.deliveryDate} · ${form.deliveryWindow}`,
                      edit: 2,
                      gold: true,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                      <dt className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">{row.label}</dt>
                      <dd className="flex flex-1 items-start justify-between gap-4 sm:justify-end">
                        <span className={`${row.gold ? 'text-gold' : 'text-ivory'} sm:text-right`}>
                          {row.value}
                        </span>
                        <button
                          type="button"
                          onClick={() => goTo(row.edit)}
                          className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold/70 transition-colors hover:text-gold"
                        >
                          Edit
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 border-t border-ivory/10 pt-8">
            {step > 1 && (
              <button type="button" onClick={() => goTo(step - 1)} className="btn-outline">
                Previous
              </button>
            )}
            <button type="submit" className="btn-gold flex-1 sm:flex-none">
              {step === 3 ? 'Authorize Acquisition Request' : 'Proceed →'}
            </button>
          </div>
        </form>
      </div>

      {/* Desktop summary */}
      <div className="hidden lg:col-span-5 lg:block">
        <Summary watch={watch} />
      </div>
    </div>
  );
}