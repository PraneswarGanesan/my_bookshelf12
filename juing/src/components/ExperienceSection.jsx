import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOLD, TEAL, CORAL, CREAM, CREAM_PALETTE, RainbowStrip } from './deco';
import heroVideo from '../stock_video/sec-v1.mp4';

gsap.registerPlugin(ScrollTrigger);

const INK       = '#2c0eb5';
const WHITE     = '#FFFFFF';
const BLUE      = '#1B5E7B';
const CINZEL    = "'DxFiggle', serif";
const CORMORANT = "'Cormorant Garamond', serif";
const SYNE      = "'Syne', sans-serif";

const PORTRAIT  = 'https://images.unsplash.com/photo-1683958467836-6940e0e0691b?q=90&w=900&auto=format&fit=crop';
const ARCH      = 'https://images.unsplash.com/photo-1560131653-63257db002c8?q=90&w=1000&auto=format&fit=crop';
const HOVER_IMG = 'https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/69303aa8cb74b3cac44f56fb_RZ_Clou_Portfolio_Digital_Friends_01_2.avif';

/* ── Image Positioning (Use transform for free movement) ── */
// translateX moves images left/right without cropping
// Example: transform: 'translateX(-80px)' moves left
// Adjust the value in the style below
const IMAGE_TRANSLATE = 0; // Change this number to move images

const DATA = [
  {
    id: 1, num: '01', period: '2022 \u2013 2026',
    name: 'University', role: 'B.E. Computer Science & Engineering',
    type: 'Education', accent: TEAL,
    tags: ['Java', 'Python', 'React', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    id: 2, num: '02', period: 'May \u2013 July 2025',
    name: 'Accenture', role: 'Package Application Development Associate Intern',
    type: 'Internship', accent: CORAL,
    tags: ['Spring Boot', 'React', 'Splunk', 'OpenTelemetry', 'ServiceNow'],
  }
];

function GoldRule({ style: s }) {
  return (
    <div className="flex items-center gap-2.5" style={s}>
      <div style={{ flex: 1, height: 1, background: GOLD, opacity: 0.4 }} />
      <svg width={7} height={7} viewBox="0 0 7 7">
        <rect x={3.5} y={0} width={4.95} height={4.95}
          transform="rotate(45 3.5 3.5)" fill={GOLD} opacity={0.7} />
      </svg>
      <div style={{ flex: 1, height: 1, background: GOLD, opacity: 0.4 }} />
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef  = useRef(null);
  const heroRef     = useRef(null);
  const textRef     = useRef(null);
  const entryRefs   = useRef([]);
  const timelineRef = useRef(null);
  const cursorRef   = useRef(null);

  useEffect(() => {
    const cursor  = cursorRef.current;
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    
    if (!cursor || !section || !timeline) return;

    /* ── Smooth cursor follow with GSAP ── */
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.55, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.55, ease: 'power3' });

    const onMove = (e) => {
      const rect = timeline.getBoundingClientRect();
      const inTimeline = e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (inTimeline) {
        xTo(e.clientX - 90);
        yTo(e.clientY - 100);
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* text reveal on hero */
      if (hlRef && textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll('.hero-line'),
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            stagger: 0.08, duration: 1.2, ease: 'expo.out',
            immediateRender: false,
            scrollTrigger: { trigger: heroRef.current, start: 'top 70%' },
          }
        );
      }

      /* timeline entries */
      entryRefs.current.forEach((el) => {
        if (!el) return;
        const rule    = el.querySelector('.e-rule');
        const diamond = el.querySelector('.e-diamond');
        const metas   = el.querySelectorAll('.e-meta');
        const name    = el.querySelector('.e-name');
        const role    = el.querySelector('.e-role');
        const tags    = el.querySelectorAll('.e-tag');
        const st = { trigger: el, start: 'top 82%' };

        gsap.fromTo(rule, { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          immediateRender: false, transformOrigin: 'left center',
          scrollTrigger: st,
        });
        gsap.fromTo(diamond, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.5)',
          immediateRender: false, scrollTrigger: st, delay: 0.28,
        });
        gsap.fromTo(metas, { opacity: 0, x: -14 }, {
          opacity: 1, x: 0, stagger: 0.07, duration: 0.75, ease: 'power3.out',
          immediateRender: false, scrollTrigger: st, delay: 0.2,
        });
        gsap.fromTo(name, { yPercent: 110 }, {
          yPercent: 0, duration: 1.15, ease: 'expo.out',
          immediateRender: false, scrollTrigger: st, delay: 0.26,
        });
        gsap.fromTo(role, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          immediateRender: false, scrollTrigger: st, delay: 0.44,
        });
        gsap.fromTo(tags, { opacity: 0, y: 10 }, {
          opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power2.out',
          immediateRender: false, scrollTrigger: st, delay: 0.56,
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const hlRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative"
      style={{ background: CREAM }}
    >
      <RainbowStrip />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <div
        ref={heroRef}
        style={{
          minHeight: '50vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* ARCH — full hero background, sits behind everything */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${ARCH}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          zIndex: 0,
        }} />

        {/* CREAM PANEL — steep diagonal right edge */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0,
          width: '58%',
          background: CREAM,
          clipPath: 'polygon(0% 0%, 100% 0%, 58% 100%, 0% 100%)',
          zIndex: 1,
        }} />

        {/* LEFT TEXT — no bg, floats above cream panel */}
        <div
          style={{
            flex: '0 0 58%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 80px)',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* Primary text — INK/BLUE on cream */}
          <div ref={textRef}>
            <div className="overflow-hidden" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
              <div className="hero-line block uppercase" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: BLUE,
              }}>
                Experience & Journey
              </div>
            </div>

            <div style={{ marginBottom: 'clamp(24px, 3.5vw, 48px)' }}>
              <h1 className="hero-line m-0" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: INK,
              }}>
                IN THE
              </h1>
            </div>

            <div style={{ marginBottom: 'clamp(28px, 4vw, 56px)' }}>
              <h1 className="hero-line m-0" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: BLUE,
              }}>
                ARENA
              </h1>
            </div>

            <div style={{
              height: 2,
              background: BLUE,
              width: 'clamp(60px, 10vw, 140px)',
              marginBottom: 'clamp(28px, 4vw, 48px)',
            }} />

            <p className="m-0" style={{
              fontFamily: CINZEL,
              fontSize: 'clamp(18px, 2.2vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.65,
              color: INK,
              maxWidth: '85%',
              letterSpacing: '0.02em',
            }}>
              Where champions emerge through relentless commitment to growth and excellence.
            </p>
          </div>

          {/* White clone — only visible in arch-exposed triangle at bottom-right of column */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(40px, 6vw, 80px)',
              clipPath: 'polygon(100% 0%, 100% 100%, 38% 100%)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
              <div className="block uppercase" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#fff',
              }}>
                Experience & Journey
              </div>
            </div>

            <div style={{ marginBottom: 'clamp(24px, 3.5vw, 48px)' }}>
              <h1 className="m-0" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#fff',
              }}>
                IN THE
              </h1>
            </div>

            <div style={{ marginBottom: 'clamp(28px, 4vw, 56px)' }}>
              <h1 className="m-0" style={{
                fontFamily: SYNE,
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#fff',
              }}>
                ARENA
              </h1>
            </div>

            <div style={{
              height: 2,
              background: '#fff',
              width: 'clamp(60px, 10vw, 140px)',
              marginBottom: 'clamp(28px, 4vw, 48px)',
            }} />

            <p className="m-0" style={{
              fontFamily: CINZEL,
              fontSize: 'clamp(18px, 2.2vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#fff',
              maxWidth: '85%',
              letterSpacing: '0.02em',
            }}>
              Where champions emerge through relentless commitment to growth and excellence.
            </p>
          </div>
        </div>

        {/* RIGHT — video (top clean box) + man portrait (bottom clean box) */}
        <div style={{
          flex: '0 0 42%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* VIDEO — top half, hard rectangle */}
          <div style={{
            flex: '0 0 50%',
            overflow: 'hidden',
          }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>

          {/* MAN PORTRAIT — bottom half, hard rectangle */}
          <div style={{
            flex: 1,
            backgroundImage: `url('${PORTRAIT}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }} />
        </div>
      </div>

      {/* ══════════════════════════════════════
          TIMELINE — Cream editorial with blue accents
      ══════════════════════════════════════ */}
      <div 
        ref={timelineRef}
        className="relative"
        style={{
          background: CREAM,
          padding: 'clamp(60px, 8vw, 100px) clamp(28px, 5vw, 68px)',
          cursor: 'none',
        }}>

        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: 180,
            height: 200,
            backgroundImage: `url('${HOVER_IMG}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0,
            transform: 'scale(0.6)',
            willChange: 'transform',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
            border: `3px solid #FFD700`,
          }}
        />

        {DATA.map((entry, i) => (
          <div
            key={entry.id}
            ref={(el) => (entryRefs.current[i] = el)}
            className="relative"
            style={{
              marginBottom: i < DATA.length - 1 ? 'clamp(56px, 8vw, 96px)' : 0,
              paddingBottom: i < DATA.length - 1 ? 'clamp(40px, 6vw, 80px)' : 0,
              borderBottom: i < DATA.length - 1 ? `1px solid ${BLUE}20` : 'none',
            }}
          >
            {/* num · period · badge */}
            <div className="flex items-center gap-[18px]" style={{ marginBottom: 'clamp(16px, 2.2vw, 28px)' }}>
              <span className="e-meta" style={{
                fontFamily: SYNE, fontWeight: 900,
                fontSize: 'clamp(24px, 3vw, 48px)',
                letterSpacing: '-0.02em', color: BLUE,
              }}>
                {entry.num}
              </span>

              <span className="uppercase" style={{
                fontFamily: CINZEL,
                fontSize: 'clamp(11px, 1.2vw, 14px)',
                letterSpacing: '0.3em', color: `${INK}55`,
              }}>
                {entry.period}
              </span>

              <span className="e-meta ml-auto uppercase" style={{
                fontFamily: SYNE, fontWeight: 700,
                fontSize: 'clamp(10px, 1vw, 12px)',
                letterSpacing: '0.1em', padding: '4px 12px',
                color: entry.accent, border: `1.5px solid ${entry.accent}60`,
              }}>
                {entry.type}
              </span>
            </div>

            {/* company name — clipped reveal */}
            <div className="overflow-hidden" style={{ marginBottom: 'clamp(12px, 2vw, 20px)' }}>
              <p
                className="e-name m-0"
                style={{
                  fontFamily: SYNE, fontWeight: 900,
                  fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                  lineHeight: 0.95, letterSpacing: '-0.03em',
                  color: INK, willChange: 'transform',
                }}
              >
                {entry.name}
              </p>
            </div>

            {/* role */}
            <p
              className="e-role italic"
              style={{
                fontFamily: CORMORANT, fontWeight: 400,
                fontSize: 'clamp(16px, 1.8vw, 24px)',
                letterSpacing: '0.02em', color: `${INK}65`,
                marginBottom: 'clamp(20px, 3vw, 32px)',
                lineHeight: 1.6,
              }}
            >
              {entry.role}
            </p>

            {/* tags */}
            <div className="flex flex-wrap" style={{ gap: 10 }}>
              {entry.tags.map((tag) => (
                <span key={tag} className="e-tag uppercase" style={{
                  fontFamily: SYNE, fontWeight: 700,
                  fontSize: 'clamp(10px, 1vw, 12px)', letterSpacing: '0.08em',
                  padding: '6px 14px',
                  color: `${INK}70`, border: `1px solid ${BLUE}40`,
                  background: `${BLUE}08`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* closing footer */}
        <div className="border-t" style={{ marginTop: 'clamp(60px, 10vw, 120px)', paddingTop: 'clamp(40px, 6vw, 80px)', borderColor: `${BLUE}20` }}>
          <div className="flex justify-between items-end" style={{ gap: 30 }}>
            <div>
              <h3 className="m-0 mb-3" style={{
                fontFamily: SYNE, fontSize: 'clamp(0.5rem, 2vw, 2rem)',
                fontWeight: 900, color: BLUE,
              }}>
                Praneswar Ganesan
              </h3>
              <p className="m-0" style={{
                fontFamily: SYNE, fontSize: 'clamp(30px, 0.2vw,30px)',
                color: `${INK}65`,
              }}>
                Coimbatore · India
              </p>
            </div>
            <p className="m-0 text-right italic" style={{
              fontFamily: CORMORANT, fontSize: 'clamp(20px, 1.3vw, 18px)',
              color: `${INK}55`,
            }}>
              Building excellence through experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
