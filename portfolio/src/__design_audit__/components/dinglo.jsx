import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import arch1  from '../assets/herosection/arch-1.jpg';
import arch2  from '../assets/herosection/arch-2.jpg';
import arch3  from '../assets/herosection/arch-3.jpg';
import arch4  from '../assets/herosection/arch-4.jpg';
import arch5  from '../assets/herosection/arch-5.jpg';
import car    from '../assets/herosection/car.jpg';
import laptop from '../assets/herosection/laptop.jpg';
import myImg1 from '../assets/herosection/my-img1.jpeg';
import myImg2 from '../assets/herosection/my-img2.png';

gsap.registerPlugin(ScrollTrigger);

// ── Story chapters ─────────────────────────────────────────────────────────
const CHAPTERS = [
  { bg: arch1,  word: 'SPACE',     sub: 'Where architecture meets vision'   },
  { bg: arch2,  word: 'FORM',      sub: 'Design as a language of thought'   },
  { bg: arch3,  word: 'STRUCTURE', sub: 'Building with quiet intention'      },
  { bg: arch4,  word: 'DEPTH',     sub: 'Layers beneath the surface'         },
  { bg: arch5,  word: 'LIGHT',     sub: 'Illuminating ideas into reality'    },
  { bg: car,    word: 'MOTION',    sub: 'Driven by relentless energy'         },
  { bg: laptop, word: 'CODE',      sub: 'Engineering elegant experiences'     },
  // Portrait finale — two personal photos, one section
  { portrait: true, word: 'PRANESWAR', sub: 'Developer  ·  Designer  ·  Artist' },
];

const Hero = () => {
  const heroRef    = useRef(null);
  const slideRefs  = useRef([]);
  const bgRefs     = useRef([]);
  const wordRefs   = useRef([]);
  const subRefs    = useRef([]);
  const p1Ref      = useRef(null);
  const p2Ref      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current;
      const bgs    = bgRefs.current;
      const words  = wordRefs.current;
      const subs   = subRefs.current;
      const n      = CHAPTERS.length;
      const pd     = 3; // timeline units per chapter

      // ── Initial states ──────────────────────────────────────────────────
      gsap.set(slides,                          { opacity: 0 });
      gsap.set(slides[0],                       { opacity: 1 });
      gsap.set(bgs.filter(Boolean),             { scale: 1   });
      gsap.set(words,                           { scale: 1, filter: 'blur(0px)' });
      gsap.set(subs,                            { opacity: 0, y: 12 });
      gsap.set([p1Ref.current, p2Ref.current],  { opacity: 0 });

      // ── Entrance (chapter 0) ────────────────────────────────────────────
      gsap.timeline({ delay: 0.4 })
        .to(subs[0], { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out' });

      // ── Main scroll timeline ────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end:   `+=${n * 110}%`,
          scrub: 1.5,
          pin:   true,
        },
      });

      for (let i = 0; i < n; i++) {
        const ps     = i * pd;
        const isLast = i === n - 1;

        // Subtitle appears at chapter start
        tl.to(subs[i], {
          opacity: 1, y: 0,
          duration: pd * 0.22,
          ease: 'power2.out',
        }, ps + pd * 0.06);

        // ── Chapters with zoom-through ──────────────────────────────────
        if (!isLast) {
          const zs = ps + pd * 0.44;   // zoom start (44% into phase)
          const ze = ps + pd * 0.88;   // zoom peak
          const ts = ps + pd * 0.70;   // slide crossfade start
          const te = ps + pd;          // phase end / next phase start
          const cd = te - ts;          // crossfade duration

          // Background: slow parallax push
          if (bgs[i]) {
            tl.fromTo(bgs[i],
              { scale: 1 },
              { scale: 1.14, ease: 'none', duration: pd * 0.80 },
              ps,
            );
          }

          // Sub fades out just before zoom
          tl.to(subs[i], {
            opacity: 0, y: -12,
            duration: pd * 0.18,
            ease: 'power2.in',
          }, zs - pd * 0.04);

          // ── WORD ZOOM: the portal ───────────────────────────────────────
          // Hollow outlined text grows enormous → blurs → becomes the transition
          tl.fromTo(words[i],
            { scale: 1,  filter: 'blur(0px)' },
            { scale: 24, filter: 'blur(36px)', ease: 'power3.in', duration: ze - zs },
            zs,
          );
          // Opacity bleeds out near peak — word dissolves through the blur
          tl.to(words[i], {
            opacity: 0,
            duration: pd * 0.10,
            ease: 'power1.in',
          }, ps + pd * 0.82);

          // Slide crossfade (hidden behind the zooming word)
          tl.to(slides[i], {
            opacity: 0,
            duration: cd,
            ease: 'power2.inOut',
          }, ts);
          tl.fromTo(slides[i + 1],
            { opacity: 0 },
            { opacity: 1, duration: cd * 0.72, ease: 'power2.out' },
            ts + cd * 0.30,
          );

        // ── Portrait finale ─────────────────────────────────────────────
        } else {
          // "PRANESWAR" arrives — reverse journey: zoom FROM nothing TOWARD viewer
          // (All other words zoom away; this one zooms toward you — you've arrived)
          tl.fromTo(words[i],
            { scale: 0.06, opacity: 0, filter: 'blur(28px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'expo.out', duration: pd * 0.58 },
            ps + pd * 0.16,
          );

          // Two portraits slide in from edges
          tl.fromTo(p1Ref.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: pd * 0.48 },
            ps + pd * 0.10,
          );
          tl.fromTo(p2Ref.current,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: pd * 0.48 },
            ps + pd * 0.20,
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">

      {/* SVG grain filter */}
      <svg style={{ position:'absolute', width:0, height:0, overflow:'hidden' }} aria-hidden="true">
        <defs>
          <filter id="hgrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* ── Chapters ── */}
      {CHAPTERS.map((ch, i) => (
        <div key={i} ref={el => slideRefs.current[i] = el} className="slide">

          {!ch.portrait ? (
            <>
              <img
                ref={el => bgRefs.current[i] = el}
                src={ch.bg}
                alt=""
                className="slide-bg"
              />
              <div className="vignette" />
            </>
          ) : (
            /* Portrait split — both personal images in one section */
            <div className="portrait-split">
              <img ref={p1Ref} src={myImg1} alt="Praneswar" className="portrait-img" />
              <img ref={p2Ref} src={myImg2} alt="Praneswar" className="portrait-img" />
              <div className="portrait-merge" />
            </div>
          )}

          {/* Chapter text */}
          <div className="chapter-ui">
            <span
              ref={el => wordRefs.current[i] = el}
              className={`chapter-word${ch.portrait ? ' word-name' : ''}`}
            >
              {ch.word}
            </span>
            <p ref={el => subRefs.current[i] = el} className="chapter-sub">
              {ch.sub}
            </p>
          </div>

        </div>
      ))}

      {/* Global film grain */}
      <div className="grain" />

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* ── Section ──────────────────────────────────────── */
        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #080808;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── Slide ────────────────────────────────────────── */
        .slide {
          position: absolute;
          inset: 0;
          will-change: opacity;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform-origin: center;
          will-change: transform;
          display: block;
        }

        /* Cinematic vignette: heavy edges, open center */
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.50) 0%,
              rgba(0,0,0,0.04) 32%,
              rgba(0,0,0,0.04) 62%,
              rgba(0,0,0,0.72) 100%
            ),
            radial-gradient(
              ellipse at 50% 50%,
              transparent 25%,
              rgba(0,0,0,0.58) 100%
            );
        }

        /* ── Portrait finale ──────────────────────────────── */
        .portrait-split {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top; /* prefer face */
          display: block;
          will-change: opacity, transform;
        }

        /* Blend the two photos: dark centre band where text lives */
        .portrait-merge {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            /* horizontal: transparent edges → dark center */
            linear-gradient(
              to right,
              rgba(8,8,8,0.12) 0%,
              rgba(8,8,8,0.88) 40%,
              rgba(8,8,8,0.88) 60%,
              rgba(8,8,8,0.12) 100%
            ),
            /* vertical: soften top, heavy dark at bottom */
            linear-gradient(
              to bottom,
              rgba(8,8,8,0.28) 0%,
              rgba(8,8,8,0.00) 22%,
              rgba(8,8,8,0.00) 60%,
              rgba(8,8,8,0.88) 100%
            );
        }

        /* ── Chapter text ─────────────────────────────────── */
        .chapter-ui {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          text-align: center;
          padding: 0 6vw;
        }

        /*
          The word is HOLLOW — outlined, not filled.
          You see the image *through* the letterforms.
          As it zooms, the opening grows enormous — you fall through it.
          This is what makes the text feel like a portal, not a label.
        */
        .chapter-word {
          font-size: clamp(52px, 10.5vw, 172px);
          font-weight: 200;
          letter-spacing: 0.26em;
          color: #ffffff;
          -webkit-text-stroke: 0px;
          text-shadow: 0 0 60px rgba(0,0,0,0.5);

          /* Hollow: transparent fill, white stroke */
          color: transparent;
          -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.80);

          transform-origin: center center;
          will-change: transform, filter, opacity;
          margin-bottom: 0.6em;

          /* Depth via text-shadow (safe with transparent color + stroke) */
          text-shadow:
            0 0 80px rgba(255,255,255,0.08),
            0 0 200px rgba(255,255,255,0.04);
        }

        /*
          The finale word is FILLED — you've arrived.
          Solid white; the journey is over; this is the person.
        */
        .word-name {
          font-size: clamp(52px, 10.5vw, 172px);
          font-weight: 200;
          letter-spacing: 0.26em;
          color: #ffffff;
          -webkit-text-stroke: 0px;
          text-shadow: 0 0 60px rgba(0,0,0,0.5);
        }

        .chapter-sub {
          font-size: clamp(10px, 1.1vw, 14px);
          font-weight: 300;
          letter-spacing: 0.52em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
          will-change: opacity, transform;
        }

        /* ── Film grain ───────────────────────────────────── */
        .grain {
          position: absolute;
          inset: -120%;
          width: 340%;
          height: 340%;
          z-index: 30;
          opacity: 0.055;
          pointer-events: none;
          filter: url(#hgrain);
          animation: grainShift 0.38s steps(1) infinite;
        }

        @keyframes grainShift {
          0%   { transform: translate(  0%,   0%); }
          12%  { transform: translate( -5%,  -7%); }
          25%  { transform: translate(  9%,   4%); }
          37%  { transform: translate( -4%,  13%); }
          50%  { transform: translate( 14%,  -5%); }
          62%  { transform: translate( -7%,   9%); }
          75%  { transform: translate(  6%, -12%); }
          88%  { transform: translate(-10%,   2%); }
          100% { transform: translate(  4%,  -8%); }
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 768px) {
          .chapter-word {
            font-size: clamp(48px, 20vw, 130px);
            -webkit-text-stroke: 0.8px rgba(255,255,255,0.75);
            letter-spacing: 0.06em;
          }
          .word-name {
            font-size: clamp(36px, 14vw, 80px);
            letter-spacing: 0.14em;
          }
          .chapter-sub {
            font-size: 9px;
            letter-spacing: 0.32em;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import arch1  from '../assets/herosection/arch-1.jpg';
import arch2  from '../assets/herosection/arch-2.jpg';
import arch3  from '../assets/herosection/arch-3.jpg';
import arch4  from '../assets/herosection/arch-4.jpg';
import arch5  from '../assets/herosection/arch-5.jpg';
import car    from '../assets/herosection/car.jpg';
import laptop from '../assets/herosection/laptop.jpg';
import myImg1 from '../assets/herosection/my-img1.jpeg';
import myImg2 from '../assets/herosection/my-img2.png';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   DEFAULTS — fallback for any field not specified in a chapter
   ═══════════════════════════════════════════════════════════════════════════ */
const D_ANIM = {
  scale:     24,
  blur:      36,
  bgScale:   1.14,
  enterFrom: 'depth',   // 'depth' | 'left' | 'right' | 'top' | 'bottom'
  tiltX:     2,         // camera rotateX during portal (degrees)
  tiltZ:     0.5,       // camera rotateZ during portal (degrees)
  ease:      'power3.in',
};

const D_STYLE = {
  fontSize:      'clamp(52px, 10.5vw, 172px)',
  letterSpacing: '0.26em',
  fontWeight:    200,
  color:         'transparent',
  stroke:        '1.2px rgba(255,255,255,0.80)',
};

const D_ATM = {
  tint: 'rgba(0,0,0,0)',
  glow: 'rgba(255,255,255,0.05)',
};

/* ═══════════════════════════════════════════════════════════════════════════
   CHAPTERS — edit this array to reconfigure the entire experience.
   Supported fields per chapter:
     word, sub, bg, position, style, animation, atmosphere, elements,
     customClass, portrait (bool, for the finale)
   ═══════════════════════════════════════════════════════════════════════════ */
const CHAPTERS = [
  {
    word:      'SPACE',
    sub:       'Where architecture meets vision',
    bg:        arch1,
    position:  'top-center',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.26em',
      fontWeight:    600,
    },
    animation: {
      scale:     28,
      blur:      42,
      bgScale:   1.18,
      enterFrom: 'depth',
      tiltX:     3,
      tiltZ:     0.8,
    },
    atmosphere: { tint: 'rgba(10,20,60,0.25)',  glow: 'rgba(80,120,255,0.14)' },
    elements:   [],
  },
  {
    word:      'FORM',
    sub:       'Design as a language of thought',
    bg:        arch2,
    position:  'top-left',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.30em',
      fontWeight:    100,
    },
    animation: {
      scale:     22,
      blur:      30,
      bgScale:   1.12,
      enterFrom: 'left',
      tiltX:     -2,
      tiltZ:     1.2,
    },
    atmosphere: { tint: 'rgba(30,10,10,0.20)',   glow: 'rgba(255,100,60,0.12)' },
    elements:   [],
  },
  {
    word:      'STRUCTURE',
    sub:       'Building with quiet intention',
    bg:        arch3,
    position:  'bottom-right',
    style: {
      fontSize:      'clamp(40px, 8.5vw, 140px)',
      letterSpacing: '0.18em',
      fontWeight:    300,
    },
    animation: {
      scale:     20,
      blur:      28,
      bgScale:   1.10,
      enterFrom: 'right',
      tiltX:     1,
      tiltZ:     -0.6,
    },
    atmosphere: { tint: 'rgba(5,20,15,0.22)',    glow: 'rgba(60,200,120,0.12)' },
    elements:   [],
  },
  {
    word:      'DEPTH',
    sub:       'Layers beneath the surface',
    bg:        arch4,
    position:  'center',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.24em',
      fontWeight:    200,
    },
    animation: {
      scale:     26,
      blur:      38,
      bgScale:   1.16,
      enterFrom: 'depth',
      tiltX:     4,
      tiltZ:     -1,
    },
    atmosphere: { tint: 'rgba(0,5,30,0.30)',     glow: 'rgba(40,80,200,0.16)' },
    elements:   [],
  },
  {
    word:      'LIGHT',
    sub:       'Illuminating ideas into reality',
    bg:        arch5,
    position:  'top-right',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.28em',
      fontWeight:    100,
    },
    animation: {
      scale:     30,
      blur:      44,
      bgScale:   1.20,
      enterFrom: 'top',
      tiltX:     -3,
      tiltZ:     0.4,
    },
    atmosphere: { tint: 'rgba(40,30,0,0.20)',    glow: 'rgba(255,200,60,0.18)' },
    elements:   [],
  },
  {
    word:      'MOTION',
    sub:       'Driven by relentless energy',
    bg:        car,
    position:  'bottom-left',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.22em',
      fontWeight:    200,
    },
    animation: {
      scale:     24,
      blur:      32,
      bgScale:   1.14,
      enterFrom: 'bottom',
      tiltX:     2,
      tiltZ:     1.5,
    },
    atmosphere: { tint: 'rgba(20,0,30,0.22)',    glow: 'rgba(180,60,255,0.14)' },
    elements:   [],
  },
  {
    word:      'CODE',
    sub:       'Engineering elegant experiences',
    bg:        laptop,
    position:  'center',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.26em',
      fontWeight:    200,
    },
    animation: {
      scale:     22,
      blur:      34,
      bgScale:   1.12,
      enterFrom: 'left',
      tiltX:     -1,
      tiltZ:     -0.8,
    },
    atmosphere: { tint: 'rgba(0,15,10,0.24)',    glow: 'rgba(40,255,150,0.14)' },
    elements:   [],
  },
  {
    portrait:  true,
    word:      'PRANESWAR',
    sub:       'Developer  ·  Designer  ·  Artist',
    position:  'center',
    style: {
      fontSize:      'clamp(52px, 10.5vw, 172px)',
      letterSpacing: '0.26em',
      fontWeight:    200,
      color:         '#ffffff',
      stroke:        '0px',
      textShadow:    '0 0 60px rgba(0,0,0,0.5)',
    },
    animation: { enterFrom: 'depth', tiltX: 0, tiltZ: 0 },
    atmosphere: { tint: 'rgba(0,0,0,0)',          glow: 'rgba(255,255,255,0.10)' },
    elements:   [],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   POSITION MAP — translate position string → absolute style object
   Also supports custom { x, y } object for pixel-perfect placement
   ═══════════════════════════════════════════════════════════════════════════ */
const POS_MAP = {
  center: {
    inset:          0,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    textAlign:      'center',
    padding:        '0 6vw',
  },
  'top-left': {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-start',
    textAlign:     'left',
    top:           '10%',
    left:          '6vw',
    padding:       '0 3vw',
  },
  'top-right': {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-end',
    textAlign:     'right',
    top:           '10%',
    right:         '6vw',
    padding:       '0 3vw',
  },
  'bottom-left': {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-start',
    textAlign:     'left',
    bottom:        '12%',
    left:          '6vw',
    padding:       '0 3vw',
  },
  'bottom-right': {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-end',
    textAlign:     'right',
    bottom:        '12%',
    right:         '6vw',
    padding:       '0 3vw',
  },
};

function resolvePosition(pos) {
  const base = { position: 'absolute', zIndex: 10, pointerEvents: 'none' };
  if (pos && typeof pos === 'object') {
    return {
      ...base,
      left:          pos.x ?? 'auto',
      top:           pos.y ?? 'auto',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'flex-start',
      textAlign:     'left',
      padding:       '0 3vw',
    };
  }
  return { ...base, ...(POS_MAP[pos] || POS_MAP.center) };
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLES — canvas dust, 3 depth layers, scroll-velocity turbulence
   ═══════════════════════════════════════════════════════════════════════════ */
const Particles = () => {
  const cvRef = useRef(null);

  useEffect(() => {
    const cv  = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const mob = window.innerWidth < 768;

    let W = (cv.width  = window.innerWidth);
    let H = (cv.height = window.innerHeight);

    const onResize = () => {
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Three depth layers: far / mid / near
    const LAYERS = mob
      ? [
          { n: 15, r: [0.3, 0.7], spd: 0.06, op: [0.05, 0.15] },
          { n: 10, r: [0.6, 1.2], spd: 0.12, op: [0.08, 0.22] },
        ]
      : [
          { n: 30, r: [0.3, 0.8], spd: 0.06, op: [0.06, 0.16] },
          { n: 22, r: [0.7, 1.4], spd: 0.14, op: [0.10, 0.25] },
          { n: 14, r: [1.2, 2.1], spd: 0.25, op: [0.16, 0.36] },
        ];

    const pts = [];
    LAYERS.forEach(l => {
      for (let i = 0; i < l.n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = l.spd * (0.5 + Math.random() * 0.5);
        pts.push({
          x:  Math.random() * W,
          y:  Math.random() * H,
          r:  l.r[0] + Math.random() * (l.r[1] - l.r[0]),
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          op: l.op[0] + Math.random() * (l.op[1] - l.op[0]),
          tw: Math.random() * Math.PI * 2,   // twinkle phase
          ts: 0.003 + Math.random() * 0.006, // twinkle speed
        });
      }
    });

    let scrollVel = 0;
    let lastY     = window.scrollY;
    const onScroll = () => {
      scrollVel = Math.min(Math.abs(window.scrollY - lastY) * 0.06, 3.5);
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      scrollVel *= 0.93;

      pts.forEach(p => {
        p.tw += p.ts;
        p.x  += p.vx * (1 + scrollVel);
        p.y  += p.vy * (1 + scrollVel * 0.35);

        if (p.x < -2) p.x = W + 2;
        if (p.x > W + 2) p.x = -2;
        if (p.y < -2) p.y = H + 2;
        if (p.y > H + 2) p.y = -2;

        const fl = 0.72 + 0.28 * Math.sin(p.tw);
        ctx.globalAlpha = p.op * fl;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={cvRef}
      style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — main cinematic controller
   ═══════════════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const heroRef   = useRef(null);
  const cameraRef = useRef(null);   // receives GSAP scroll-driven rotateX/Z tilt
  const slideRefs = useRef([]);
  const bgRefs    = useRef([]);
  const wordRefs  = useRef([]);
  const subRefs   = useRef([]);
  const p1Ref     = useRef(null);
  const p2Ref     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current;
      const bgs    = bgRefs.current;
      const words  = wordRefs.current;
      const subs   = subRefs.current;
      const cam    = cameraRef.current;
      const n      = CHAPTERS.length;
      const pd     = 3;     // timeline units per chapter
      const mob    = window.innerWidth < 768;

      /* ── Initial states ─────────────────────────────────────────────── */
      gsap.set(slides,                         { opacity: 0, xPercent: 0, yPercent: 0, scale: 1 });
      gsap.set(slides[0],                      { opacity: 1 });
      gsap.set(bgs.filter(Boolean),            { scale: 1, filter: 'brightness(1) saturate(1)' });
      gsap.set(words,                          { scale: 1, filter: 'blur(0px)', opacity: 1 });
      gsap.set(subs,                           { opacity: 0, y: 12 });
      gsap.set([p1Ref.current, p2Ref.current], { opacity: 0, x: 0 });
      gsap.set(cam,                            { rotateX: 0, rotateZ: 0 });

      /* ── Entrance ───────────────────────────────────────────────────── */
      gsap.timeline({ delay: 0.4 })
        .to(subs[0], { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out' });

      /* ── Main scroll timeline ───────────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start:   'top top',
          end:     `+=${n * 110}%`,
          scrub:   1.8,
          pin:     true,
        },
      });

      for (let i = 0; i < n; i++) {
        const ps     = i * pd;
        const isLast = i === n - 1;
        const anim   = { ...D_ANIM, ...(CHAPTERS[i].animation || {}) };

        // Mobile scale-down for intense effects
        const mScale = mob ? anim.scale * 0.58 : anim.scale;
        const mBlur  = mob ? anim.blur  * 0.52 : anim.blur;
        const mTiltX = mob ? anim.tiltX * 0.45 : anim.tiltX;
        const mTiltZ = mob ? anim.tiltZ * 0.45 : anim.tiltZ;

        /* Subtitle in — universal for all chapters */
        tl.to(subs[i], {
          opacity: 1, y: 0,
          duration: pd * 0.22,
          ease:     'power2.out',
        }, ps + pd * 0.06);

        if (!isLast) {
          const zs = ps + pd * 0.44;   // zoom/portal start
          const ze = ps + pd * 0.88;   // zoom peak
          const ts = ps + pd * 0.70;   // crossfade start
          const te = ps + pd;          // chapter end
          const cd = te - ts;          // crossfade duration
          const zm = ze - zs;          // zoom duration

          /* Background: slow parallax push */
          if (bgs[i]) {
            tl.fromTo(bgs[i],
              { scale: 1 },
              { scale: anim.bgScale, ease: 'none', duration: pd * 0.80 },
              ps,
            );
          }

          /* Background: brightness flash at portal peak — "light gate" feel */
          if (bgs[i]) {
            tl.to(bgs[i], {
              filter:   'brightness(1.24) saturate(1.14)',
              duration: pd * 0.05,
              ease:     'power1.in',
            }, ps + pd * 0.76);
            tl.to(bgs[i], {
              filter:   'brightness(1) saturate(1)',
              duration: pd * 0.13,
              ease:     'power1.out',
            }, ps + pd * 0.81);
          }

          /* Subtitle out just before zoom */
          tl.to(subs[i], {
            opacity: 0, y: -12,
            duration: pd * 0.18,
            ease:     'power2.in',
          }, zs - pd * 0.04);

          /* Word: portal zoom — hollow text becomes a tunnel you fly through */
          tl.fromTo(words[i],
            { scale: 1,      filter: 'blur(0px)' },
            { scale: mScale, filter: `blur(${mBlur}px)`, ease: anim.ease || D_ANIM.ease, duration: zm },
            zs,
          );
          tl.to(words[i], {
            opacity:  0,
            duration: pd * 0.10,
            ease:     'power1.in',
          }, ps + pd * 0.82);

          /* Camera tilt: scene banks as you fly through the portal */
          if (mTiltX !== 0 || mTiltZ !== 0) {
            tl.to(cam, {
              rotateX: mTiltX,
              rotateZ: mTiltZ,
              duration: zm * 0.42,
              ease:     'power2.inOut',
            }, zs);
            tl.to(cam, {
              rotateX: 0,
              rotateZ: 0,
              duration: zm * 0.58,
              ease:     'expo.out',
            }, zs + zm * 0.42);
          }

          /* Current slide fades out */
          tl.to(slides[i], {
            opacity:  0,
            duration: cd,
            ease:     'power2.inOut',
          }, ts);

          /* Next slide enters from its configured direction */
          const nxt  = { ...D_ANIM, ...(CHAPTERS[i + 1]?.animation || {}) };
          const from = { opacity: 0 };
          if (nxt.enterFrom === 'left')   from.xPercent = -5;
          if (nxt.enterFrom === 'right')  from.xPercent =  5;
          if (nxt.enterFrom === 'top')    from.yPercent = -3;
          if (nxt.enterFrom === 'bottom') from.yPercent =  3;
          if (nxt.enterFrom === 'depth')  from.scale    = 1.06;   // zooms slightly toward viewer

          tl.fromTo(slides[i + 1],
            from,
            { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, duration: cd * 0.72, ease: 'power2.out' },
            ts + cd * 0.30,
          );

        } else {
          /* ── Portrait finale: the journey's destination ──────────────── */
          // Word arrives from behind — reverse of the portal (you've arrived)
          tl.fromTo(words[i],
            { scale: 0.06, opacity: 0, filter: 'blur(28px)' },
            { scale: 1,    opacity: 1, filter: 'blur(0px)',  ease: 'expo.out', duration: pd * 0.58 },
            ps + pd * 0.16,
          );
          // Two portraits slide in from opposing edges
          tl.fromTo(p1Ref.current,
            { x: -80, opacity: 0 },
            { x:   0, opacity: 1, ease: 'power3.out', duration: pd * 0.48 },
            ps + pd * 0.10,
          );
          tl.fromTo(p2Ref.current,
            { x:  80, opacity: 0 },
            { x:   0, opacity: 1, ease: 'power3.out', duration: pd * 0.48 },
            ps + pd * 0.20,
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <section ref={heroRef} className="hero">

      {/* SVG grain filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="hgrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/*
        Jitter layer: micro-motion CSS animation (translate only).
        Also supplies the perspective() for camera-rig's 3D rotation.
      */}
      <div className="jitter-layer">

        {/*
          Camera rig: GSAP-driven rotateX/Z scroll tilt.
          Receives perspective from parent — creates "camera banking" effect.
        */}
        <div ref={cameraRef} className="camera-rig">

          {CHAPTERS.map((ch, i) => {
            const atm  = { ...D_ATM,   ...ch.atmosphere };
            const sty  = { ...D_STYLE, ...ch.style };
            const posS = resolvePosition(ch.position);

            return (
              <div
                key={i}
                ref={el => (slideRefs.current[i] = el)}
                className={`slide${ch.customClass ? ` ${ch.customClass}` : ''}`}
              >

                {/* ── Layer 0: Background ──────────────────────────── */}
                {!ch.portrait ? (
                  <>
                    <img
                      ref={el => (bgRefs.current[i] = el)}
                      src={ch.bg}
                      alt=""
                      className="slide-bg"
                    />
                    <div className="vignette" />
                    <div className="depth-haze" />
                  </>
                ) : (
                  /* Portrait split — two personal photos, one section */
                  <div className="portrait-split">
                    <img ref={p1Ref} src={myImg1} alt="Praneswar" className="portrait-img" />
                    <img ref={p2Ref} src={myImg2} alt="Praneswar" className="portrait-img" />
                    <div className="portrait-merge" />
                  </div>
                )}

                {/* ── Layer 1: Atmospheric mid (fog / color tint / glow) ── */}
                <div
                  className="atm-layer"
                  style={{ '--atm-tint': atm.tint, '--atm-glow': atm.glow }}
                />

                {/* ── Layer 1.5: Volumetric light rays ──────────────── */}
                <div className="light-rays" aria-hidden="true" />

                {/* ── Layer 2: Foreground text + custom elements ─────── */}
                <div className="chapter-ui" style={posS}>
                  <span
                    ref={el => (wordRefs.current[i] = el)}
                    className="chapter-word"
                    style={{
                      fontSize:         sty.fontSize,
                      letterSpacing:    sty.letterSpacing,
                      fontWeight:       sty.fontWeight,
                      color:            sty.color,
                      WebkitTextStroke: sty.stroke,
                      ...(sty.textShadow && { textShadow: sty.textShadow }),
                    }}
                  >
                    {ch.word}
                  </span>

                  <p ref={el => (subRefs.current[i] = el)} className="chapter-sub">
                    {ch.sub}
                  </p>

                  {/* Custom JSX elements — buttons, cards, icons etc. */}
                  {ch.elements?.length > 0 && (
                    <div className="chapter-elements">{ch.elements}</div>
                  )}
                </div>

              </div>
            );
          })}

        </div>{/* /camera-rig */}
      </div>{/* /jitter-layer */}

      {/* Floating dust particles — outside camera rig, unaffected by tilt */}
      <Particles />

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* ── Hero section ──────────────────────────────────── */
        .hero {
          position:    relative;
          height:      100vh;
          overflow:    hidden;
          background:  #040404;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── Jitter layer ──────────────────────────────────── */
        /*
          Provides: (1) perspective so camera-rig's 3D rotation has depth,
                    (2) a very subtle micro-jitter to make the scene feel alive.
          Uses translate only — no conflict with camera-rig's rotation.
        */
        .jitter-layer {
          position:          absolute;
          inset:             0;
          perspective:       1100px;
          perspective-origin: 50% 50%;
          animation:         microJitter 14s ease-in-out infinite;
        }

        @keyframes microJitter {
          0%,  100% { transform: translate( 0.0px,  0.0px); }
          14%        { transform: translate(-1.0px,  0.8px); }
          28%        { transform: translate( 0.9px, -1.2px); }
          43%        { transform: translate(-0.7px,  1.0px); }
          57%        { transform: translate( 1.1px, -0.6px); }
          72%        { transform: translate(-0.8px,  0.9px); }
          86%        { transform: translate( 0.7px, -0.8px); }
        }

        /* ── Camera rig ────────────────────────────────────── */
        /*
          GSAP animates rotateX + rotateZ on this element during each portal
          transition, simulating a camera that banks and tilts as you fly through.
        */
        .camera-rig {
          position:     absolute;
          inset:        0;
          will-change:  transform;
        }

        /* ── Slide ─────────────────────────────────────────── */
        .slide {
          position:    absolute;
          inset:       0;
          will-change: opacity;
        }

        /* ── Background image ──────────────────────────────── */
        .slide-bg {
          position:        absolute;
          inset:           0;
          width:           100%;
          height:          100%;
          object-fit:      cover;
          object-position: center;
          transform-origin: center;
          will-change:     transform, filter;
          display:         block;
        }

        /* ── Cinematic vignette ────────────────────────────── */
        .vignette {
          position:   absolute;
          inset:      0;
          z-index:    1;
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.54) 0%,
              rgba(0,0,0,0.04) 28%,
              rgba(0,0,0,0.04) 66%,
              rgba(0,0,0,0.74) 100%
            ),
            radial-gradient(
              ellipse at 50% 50%,
              transparent 20%,
              rgba(0,0,0,0.62) 100%
            );
        }

        /* ── Depth haze ────────────────────────────────────── */
        /*
          A radial darkening toward the edges that reinforces the sensation
          of 3D depth — your eyes are drawn to the luminous center.
        */
        .depth-haze {
          position:        absolute;
          inset:           0;
          z-index:         2;
          pointer-events:  none;
          background: radial-gradient(
            ellipse 88% 78% at 50% 50%,
            transparent 28%,
            rgba(0,0,0,0.16) 60%,
            rgba(0,0,0,0.46) 100%
          );
        }

        /* ── Atmospheric mid-layer ─────────────────────────── */
        /*
          Per-section color tint + central glow via CSS custom properties.
          Creates unique mood / color signature for each scene.
        */
        .atm-layer {
          position:       absolute;
          inset:          0;
          z-index:        3;
          pointer-events: none;
          background:
            radial-gradient(
              ellipse 66% 60% at 50% 46%,
              var(--atm-glow, transparent) 0%,
              transparent 70%
            ),
            linear-gradient(
              180deg,
              var(--atm-tint, transparent) 0%,
              transparent 80%
            );
        }

        /* ── Volumetric light rays ─────────────────────────── */
        /*
          A slowly rotating conic-gradient simulates diffuse light shafts /
          god-rays bleeding into the scene. Barely visible — works subconsciously.
        */
        .light-rays {
          position:       absolute;
          top:            -50%;
          left:           -50%;
          width:          200%;
          height:         200%;
          z-index:        4;
          pointer-events: none;
          opacity:        0.55;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent                    0deg,
            rgba(255,255,255,0.018)        12deg,
            transparent                   24deg,
            transparent                   50deg,
            rgba(255,255,255,0.012)        62deg,
            transparent                   74deg,
            transparent                   96deg,
            rgba(255,255,255,0.022)       110deg,
            transparent                  124deg,
            transparent                  156deg,
            rgba(255,255,255,0.014)       168deg,
            transparent                  181deg,
            transparent                  216deg,
            rgba(255,255,255,0.018)       229deg,
            transparent                  242deg,
            transparent                  272deg,
            rgba(255,255,255,0.010)       286deg,
            transparent                  299deg,
            transparent                  333deg,
            rgba(255,255,255,0.016)       347deg,
            transparent                  360deg
          );
          animation: raysRotate 30s linear infinite;
        }

        @keyframes raysRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Portrait finale ───────────────────────────────── */
        .portrait-split {
          position:              absolute;
          inset:                 0;
          display:               grid;
          grid-template-columns: 1fr 1fr;
        }

        .portrait-img {
          width:           100%;
          height:          100%;
          object-fit:      cover;
          object-position: center top;
          display:         block;
          will-change:     opacity, transform;
        }

        /* Centre band where text lives: dark horizontal gradient */
        .portrait-merge {
          position:   absolute;
          inset:      0;
          z-index:    1;
          background:
            linear-gradient(
              to right,
              rgba(8,8,8,0.12)  0%,
              rgba(8,8,8,0.88) 38%,
              rgba(8,8,8,0.88) 62%,
              rgba(8,8,8,0.12) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(8,8,8,0.30)  0%,
              rgba(8,8,8,0.00) 20%,
              rgba(8,8,8,0.00) 62%,
              rgba(8,8,8,0.88) 100%
            );
        }

        /* ── Text UI ───────────────────────────────────────── */
        /*
          Base class — all positioning/sizing comes from inline styles
          resolved by resolvePosition() per chapter.
        */
        .chapter-ui {
          position:       absolute;
          z-index:        10;
          pointer-events: none;
        }

        /*
          The word is HOLLOW — transparent fill, stroke outline.
          You see the image *through* the letterforms.
          As it scales to 20-30×, the letterform opening becomes enormous —
          the viewer "falls through" the text as though it were a portal.

          Typography (size, weight, letter-spacing, color, stroke) is set
          per-section via inline styles — only structural CSS lives here.
        */
        .chapter-word {
          display:          block;
          line-height:      1;
          transform-origin: center center;
          will-change:      transform, filter, opacity;
          margin-bottom:    0.6em;
          /* Default glow for outlined (transparent) words */
          text-shadow:
            0 0 80px  rgba(255,255,255,0.08),
            0 0 220px rgba(255,255,255,0.04);
        }

        .chapter-sub {
          font-size:      clamp(10px, 1.1vw, 14px);
          font-weight:    300;
          letter-spacing: 0.52em;
          text-transform: uppercase;
          color:          rgba(255,255,255,0.42);
          will-change:    opacity, transform;
        }

        /* Container for injected custom elements (buttons, cards, icons) */
        .chapter-elements {
          display:         flex;
          gap:             1rem;
          margin-top:      2rem;
          flex-wrap:       wrap;
          pointer-events:  all;
          align-items:     center;
        }

        /* ── Film grain ────────────────────────────────────── */
        .grain {
          position:       absolute;
          inset:          -120%;
          width:          340%;
          height:         340%;
          z-index:        30;
          opacity:        0.055;
          pointer-events: none;
          filter:         url(#hgrain);
          animation:      grainShift 0.38s steps(1) infinite;
        }

        @keyframes grainShift {
          0%   { transform: translate(  0%,   0%); }
          12%  { transform: translate( -5%,  -7%); }
          25%  { transform: translate(  9%,   4%); }
          37%  { transform: translate( -4%,  13%); }
          50%  { transform: translate( 14%,  -5%); }
          62%  { transform: translate( -7%,   9%); }
          75%  { transform: translate(  6%, -12%); }
          88%  { transform: translate(-10%,   2%); }
          100% { transform: translate(  4%,  -8%); }
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 768px) {
          .jitter-layer {
            perspective: 800px;
            animation-duration: 18s;
          }
          .chapter-word {
            font-size:      clamp(34px, 15vw, 96px) !important;
            letter-spacing: 0.10em !important;
          }
          .chapter-sub {
            font-size:      9px;
            letter-spacing: 0.28em;
          }
          .light-rays  { opacity: 0.28; }
          .depth-haze  { opacity: 0.75; }
          .chapter-ui  { padding: 0 4vw !important; }
        }

        @media (max-width: 480px) {
          .chapter-word {
            font-size:      clamp(28px, 12vw, 72px) !important;
            letter-spacing: 0.06em !important;
          }
          .portrait-split {
            grid-template-columns: 1fr;
          }
          .portrait-img:last-of-type {
            display: none;
          }
        }
      `}</style>

    </section>
  );
};

export default Hero;
