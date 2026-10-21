'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 90;
const STATIC_FRAME = 45; // single frame used on mobile / reduced motion

const frameSrc = (i) =>
  `/frames/auction/frame_${String(i + 1).padStart(3, '0')}.jpg`;

const SHADOW = '[text-shadow:0_2px_40px_rgba(0,0,0,0.7)]';

export default function AuctionCanvasHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);

  const [mode, setMode] = useState('pending'); // pending | scrub | static
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Decide once: phones and reduced-motion users get a single still frame
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

    // object-fit: cover on canvas; falls back to nearest earlier loaded frame
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
      img.onerror = done; // one missing frame must never hang the preloader
      img.src = frameSrc(idx);
    });

    const onResize = () => {
      sizeCanvas();
      draw(Math.round(frameState.frame));
    };
    window.addEventListener('resize', onResize);

    if (mode === 'scrub') {
      ctx = gsap.context(() => {
        gsap.set([phase2Ref.current, phase3Ref.current], { opacity: 0, y: 32 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=350%',
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

        // duration: 1 so the frames span the ENTIRE scroll, not just half
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

        tl.to(phase1Ref.current, { opacity: 0, y: -40, duration: 0.2 }, 0.1);
        tl.to(phase2Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.3);
        tl.to(phase2Ref.current, { opacity: 0, y: -40, duration: 0.2 }, 0.65);
        tl.to(phase3Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.8);
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
    <div
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
    >
      {/* Preloader: gold line instead of a spinner */}
      <div
        aria-hidden={ready}
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-obsidian transition-opacity duration-1000 ${
          ready ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <p className="eyebrow mb-6">Opening the Vault</p>
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
        aria-label="Sarkin Agogo skeleton watch, movement in detail"
        className="absolute inset-0 h-full w-full"
      />

      {/* Vignettes + soft gold light behind the text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_60%)]" />

      {/* Live badge */}
      <div className="absolute left-5 top-28 z-20 flex items-center gap-3 border border-gold/30 bg-obsidian/70 px-4 py-2 backdrop-blur-md md:left-16 md:top-36">
        <span className="live-dot" aria-hidden="true" />
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/90">
          Live Auction · Lot #001
        </span>
      </div>

      {/* Phase 1 */}
      <div
        ref={phase1Ref}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="eyebrow mb-6">The Royal Vault</p>
        <h1 className={`display-xl max-w-5xl ${SHADOW}`}>
          Sarkin Agogo <em>Skeleton</em>
        </h1>
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-ivory/60">
          {mode === 'static' ? 'Lot #001 · 1 of 1 Commission' : 'Scroll to inspect the movement'}
        </p>
        {mode === 'static' && (
          <a href="#bidding-console" className="btn-gold pointer-events-auto mt-8">
            View Lot &amp; Bid
          </a>
        )}
      </div>

      {mode !== 'static' && (
        <>
          {/* Phase 2 */}
          <div
            ref={phase2Ref}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="eyebrow mb-6">Precision Engineering</p>
            <h2 className={`display-lg max-w-4xl ${SHADOW}`}>
              Exhibition Caseback &amp; <em>Automatic</em> Tourbillon
            </h2>
            <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-ivory/60">
              1 of 1 Custom Commission Piece
            </p>
          </div>

          {/* Phase 3 */}
          <div
            ref={phase3Ref}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="eyebrow mb-6">Bidding Is Active</p>
            <h2 className={`display-lg max-w-4xl ${SHADOW}`}>
              Reserve Price <em>Met</em>
            </h2>
            <a href="#bidding-console" className="btn-gold pointer-events-auto mt-10">
              Place Your Bid Below
            </a>
          </div>

          {/* Scroll cue + progress line */}
          <div className="absolute bottom-8 right-5 z-20 flex items-center gap-4 md:right-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Scroll</span>
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
    </div>
  );
}