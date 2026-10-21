'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 91;
const STATIC_FRAME = 0; // still frame used on phones / reduced motion; change if another looks better

const frameSrc = (i) => `/frames/hero/frame_${String(i + 1).padStart(3, '0')}.jpg`;
const SHADOW = '[text-shadow:0_2px_40px_rgba(0,0,0,0.7)]';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);

  const [mode, setMode] = useState('pending'); // pending | scrub | static
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const isStatic = window.matchMedia(
      '(max-width: 767px), (prefers-reduced-motion: reduce)'
    ).matches;
    setMode(isStatic ? 'static' : 'scrub');
  }, []);

  useEffect(() => {
    if (mode === 'pending') return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const indices =
      mode === 'static'
        ? [STATIC_FRAME]
        : Array.from({ length: TOTAL_FRAMES }, (_, i) => i);

    const images = [];
    const frameState = { frame: mode === 'static' ? STATIC_FRAME : 0 };
    let loaded = 0;
    let finished = false;
    let ctx;

    const sizeCanvas = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    const draw = (index) => {
      let img = images[index];
      let i = index;
      while ((!img || !img.complete || img.naturalWidth === 0) && i > 0) {
        i -= 1;
        img = images[i];
      }
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * ratio;
      const h = img.naturalHeight * ratio;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      setReady(true);
    };
    const safetyTimer = setTimeout(finish, 4000);

    sizeCanvas();

    indices.forEach((idx) => {
      const img = new Image();
      images[idx] = img;
      const done = () => {
        loaded += 1;
        setLoadProgress(Math.round((loaded / indices.length) * 100));
        if (idx === indices[0]) draw(frameState.frame);
        if (loaded >= indices.length) {
          clearTimeout(safetyTimer);
          finish();
        }
      };
      img.onload = done;
      img.onerror = done;
      img.src = frameSrc(idx);
    });

    const onResize = () => {
      sizeCanvas();
      draw(Math.round(frameState.frame));
    };
    window.addEventListener('resize', onResize);

    if (mode === 'scrub') {
      ctx = gsap.context(() => {
        gsap.set([phase2Ref.current, phase3Ref.current], { opacity: 0, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        tl.to(
          frameState,
          {
            frame: TOTAL_FRAMES - 1,
            duration: 1,
            ease: 'none',
            onUpdate: () => draw(Math.round(frameState.frame)),
          },
          0
        );

        tl.to(phase1Ref.current, { opacity: 0, y: -50, duration: 0.15 }, 0.15);
        tl.to(phase2Ref.current, { opacity: 1, y: 0, duration: 0.15 }, 0.25);
        tl.to(phase2Ref.current, { opacity: 0, y: -50, duration: 0.15 }, 0.55);
        tl.to(phase3Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.7);
      }, containerRef);
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', onResize);
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
      if (ctx) ctx.revert();
    };
  }, [mode]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
    >
      {/* Preloader */}
      <div
        aria-hidden={ready}
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-obsidian transition-opacity duration-1000 ${
          ready ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <p className="eyebrow mb-6">Sarkin Agogo</p>
        <div className="relative h-px w-48 overflow-hidden bg-gold/20">
          <span
            className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <p className="mono-num mt-4 text-[10px] tracking-[0.3em] text-ivory/40">
          {String(loadProgress).padStart(3, '0')}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A luxury Sarkin Agogo timepiece, revealed in detail"
        className="absolute inset-0 h-full w-full"
      />

      {/* Vignettes + gold light behind the text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/70 via-transparent to-obsidian" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.1),transparent_60%)]" />

      {/* Phase 1 */}
      <div
        ref={phase1Ref}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="eyebrow fade-up mb-8">Est. Northern Nigeria</p>
        <h1 className={`display-xl fade-up stagger-1 max-w-5xl ${SHADOW}`}>
          Wear The <em>Crown</em>
          <br />
          of Time
        </h1>

        {mode === 'static' ? (
          <div className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/collections" className="btn-gold">Explore Collection</Link>
            <Link href="/auctions" className="btn-outline">Enter The Royal Vault</Link>
          </div>
        ) : (
          <p className="fade-up stagger-2 mt-10 text-[11px] uppercase tracking-[0.3em] text-ivory/50">
            Scroll to reveal
          </p>
        )}
      </div>

      {mode !== 'static' && (
        <>
          {/* Phase 2 */}
          <div
            ref={phase2Ref}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="eyebrow mb-6">Sarkin Agogo</p>
            <h2 className={`display-lg max-w-4xl ${SHADOW}`}>
              Where Heritage Meets
              <br />
              <em>Horology</em>
            </h2>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-ivory/60">
              Rare timepieces curated for sovereigns, executives, and connoisseurs.
            </p>
          </div>

          {/* Phase 3 */}
          <div
            ref={phase3Ref}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="eyebrow mb-6">The Watch Emporium</p>
            <h2 className={`display-lg mb-12 max-w-3xl ${SHADOW}`}>
              Timeless · Refined · <em>Trusted</em>
            </h2>
            <div className="pointer-events-auto flex flex-col gap-4 sm:flex-row">
              <Link href="/collections" className="btn-gold">Explore Collection</Link>
              <Link href="/auctions" className="btn-outline">Enter The Royal Vault</Link>
            </div>
          </div>

          {/* Scroll cue + progress line */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.35em] text-ivory/40">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-gold/30">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2s_ease-in-out_infinite] bg-gold" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-ivory/10">
            <span
              ref={progressRef}
              className="block h-full origin-left bg-gold"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </>
      )}
    </section>
  );
}