import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GOLD, CREAM, Diamond } from './deco';
import bgVideo     from '../stock_video/video.mp4';
import cursorVideo from '../stock_video/sec-v2.mp4';
import portrait    from '../my-images/3.png';

const SYNE   = "'Syne', sans-serif";
const CINZEL = "'DxFiggle', serif";
const COR    = "'Cormorant Garamond', serif";

export default function HeroSection() {
  const sectionRef  = useRef(null);
  const cursorRef   = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const portraitRef = useRef(null);
  const metaRef     = useRef(null);
  const labelRef    = useRef(null);

  /* cursor follower */
  useEffect(() => {
    const cursor  = cursorRef.current;
    const section = sectionRef.current;
    if (!cursor || !section) return;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.55, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.55, ease: 'power3' });
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right
                  && e.clientY >= r.top  && e.clientY <= r.bottom;
      xTo(e.clientX - 110);
      yTo(e.clientY - 75);
      gsap.to(cursor, { opacity: inside ? 1 : 0, duration: 0.3 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* entrance */
  useEffect(() => {
    gsap.fromTo(labelRef.current,    { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 });
    gsap.fromTo(line1Ref.current,    { yPercent: 110 },     { yPercent: 0,  duration: 1.3, ease: 'expo.out',   delay: 0.15 });
    gsap.fromTo(line2Ref.current,    { yPercent: 110 },     { yPercent: 0,  duration: 1.3, ease: 'expo.out',   delay: 0.27 });
    gsap.fromTo(portraitRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.55 });
    gsap.fromTo(metaRef.current,     { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.8  });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
      style={{ cursor: 'none' }}
    >
      {/* bg video — brightness only, zero gradients */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={bgVideo}
        style={{ filter: 'brightness(0.4)' }}
      />

      {/* cursor follower */}
      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0, width: 200, height: 140,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 9999, opacity: 0,
        border: `1px solid ${GOLD}60`, transform: 'translate(0px,0px)',
      }}>
        <video autoPlay muted loop playsInline src={cursorVideo}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ padding: '0 clamp(24px,6vw,100px) clamp(48px,6vw,80px)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>

          {/* label */}
          <div ref={labelRef} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 'clamp(8px,0.2vw,10px)',
          }}>
            <Diamond size={6} color={GOLD} />
            <span style={{
              fontFamily: SYNE, fontSize: 15, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD,
            }}>
              Full-Stack Engineer · Cloud Infrastructure · AI Systems
            </span>
          </div>

          {/* name + portrait in one row, portrait flush to baseline */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 'clamp(20px,3vw,40px)',
          }}>

            {/* name column */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="overflow-hidden">
                <div ref={line1Ref}>
                  <h1 className="m-0" style={{
                    fontFamily: SYNE, fontWeight: 900,
                    fontSize: 'clamp(2.6rem,6vw,7rem)',
                    lineHeight: 0.85, letterSpacing: '-0.02em',
                    color: '#fff', textTransform: 'uppercase',
                  }}>
                    PRANESWAR
                  </h1>
                </div>
              </div>
              <div className="overflow-hidden">
                <div ref={line2Ref}>
                  <h1 className="m-0" style={{
                    fontFamily: CINZEL, fontWeight: 700,
                    fontSize: 'clamp(2.6rem,6.8vw,7rem)',
                    lineHeight: 0.9, letterSpacing: '-0.01em',
                    color: GOLD, textTransform: 'uppercase',
                  }}>
                    GANESAN
                  </h1>
                </div>
              </div>
            </div>

            {/* portrait column — right side, baseline-aligned */}
            <div ref={portraitRef} style={{ flexShrink: 0, paddingBottom: 2 }}>
              <div style={{
                width: 'clamp(200px,10vw,350px)',
                aspectRatio: '3/4',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={portrait}
                  alt="Praneswar"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                    filter: 'grayscale(10%)',
                    display: 'block',
                  }}
                />
                {/* corner brackets — CSS only, no gradient */}
                <span style={{
                  position: 'absolute', top: 7, left: 7,
                  width: 16, height: 16,
                  borderTop: `1.5px solid ${GOLD}`,
                  borderLeft: `1.5px solid ${GOLD}`,
                  pointerEvents: 'none',
                }} />
                <span style={{
                  position: 'absolute', bottom: 7, right: 7,
                  width: 16, height: 16,
                  borderBottom: `1.5px solid ${GOLD}`,
                  borderRight: `1.5px solid ${GOLD}`,
                  pointerEvents: 'none',
                }} />
              </div>
              <p style={{
                fontFamily: SYNE, fontStyle: 'italic',
                fontSize: 'clamp(10px,0.85vw,12px)',
                color: `${GOLD}80`,
                letterSpacing: '0.14em',
                margin: '7px 0 0',
                textAlign: 'right',
              }}>
                Portfolio 2026
              </p>
            </div>
          </div>

          {/* thin gold rule */}
          <div style={{
            height: 1,
            background: `${GOLD}22`,
            margin: 'clamp(14px,2vw,22px) 0 0',
          }} />

          {/* meta strip */}
          <div ref={metaRef} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 'clamp(12px,1.6vw,18px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ display: 'block', width: 32, height: 1, background: `${GOLD}55` }} />
              <p style={{
                fontFamily: SYNE, fontSize: 'clamp(12px,1.1vw,15px)', fontWeight: 700,
                letterSpacing: '0.42em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.32)', margin: 0,
              }}>
                Building what scales · India · 2026
              </p>
            </div>
            <p style={{
              fontFamily: SYNE, fontStyle: 'italic',
              fontSize: 'clamp(20px,1.1vw,25px)',
              color: 'rgba(255,255,255,0.32)', margin: 0, letterSpacing: '0.04em',
            }}>
              Systems that survive contact with production.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}