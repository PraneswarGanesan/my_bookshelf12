import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img3 from '../my-images/3.png';
import img4 from '../my-images/4.png';
import { GOLD, TEAL, CORAL, CREAM, CREAM_PALETTE, Diamond, Fan, RainbowStrip } from './deco';

gsap.registerPlugin(ScrollTrigger);

const SYNE      = "'Syne', sans-serif";
const CINZEL    = "'DxFiggle', serif";
const CORMORANT = "'Cormorant Garamond', serif";
const CHARCOAL  = '#0A0A0A';
const WHITE     = '#FFFFFF';

const LINKS = [
  { label: 'praneswarganesan@gmail.com', href: 'mailto:praneswarganesan@gmail.com', accent: CORAL },
  { label: 'github.com/praneswar-g',     href: 'https://github.com/praneswar-g',    accent: GOLD  },
  { label: 'LinkedIn / Praneswar Ganesan', href: 'https://linkedin.com/in/praneswar-ganesan', accent: TEAL },
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const linksRef   = useRef(null);
  const imgRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* label + heading stagger */
      gsap.fromTo(
        headRef.current.querySelectorAll('.c-line'),
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.1, duration: 1.3, ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      /* contact links */
      gsap.fromTo(
        linksRef.current.querySelectorAll('.c-link'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          delay: 0.5, immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      );

      /* right photo reveal */
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut',
          delay: 0.2, immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        background: CHARCOAL,
      }}
    >
      <RainbowStrip />

      {/* ── LEFT COLUMN ─────────────────────────────────── */}
      <div style={{
        flex: '0 0 56%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 100px)',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Section label */}
        <div className="c-line overflow-hidden" style={{ marginBottom: 'clamp(20px, 2.5vw, 32px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Diamond size={8} color={GOLD} />
            <span style={{
              fontFamily: SYNE, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD,
            }}>
              Contact
            </span>
            <span style={{ display: 'block', height: 1, width: 48, background: `${GOLD}50` }} />
          </div>
        </div>

        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <div className="overflow-hidden">
            <h2 className="c-line m-0" style={{
              fontFamily: SYNE, fontWeight: 900,
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              lineHeight: 0.88, letterSpacing: '-0.03em',
              color: WHITE, textTransform: 'uppercase',
            }}>
              LET'S
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="c-line m-0" style={{
              fontFamily: SYNE, fontWeight: 900,
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              lineHeight: 0.88, letterSpacing: '-0.03em',
              color: WHITE, textTransform: 'uppercase',
            }}>
              BUILD
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="c-line m-0" style={{
              fontFamily: CINZEL, fontWeight: 700,
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              lineHeight: 0.95, letterSpacing: '-0.02em',
              color: GOLD, textTransform: 'uppercase',
            }}>
              TOGETHER
            </h2>
          </div>
        </div>

        {/* Tagline */}
        <p className="c-line" style={{
          fontFamily: CORMORANT, fontStyle: 'italic',
          fontSize: 'clamp(16px, 1.4vw, 22px)', fontWeight: 400,
          color: `${CREAM}70`, lineHeight: 1.65,
          letterSpacing: '0.03em', maxWidth: 400,
          marginBottom: 'clamp(28px, 4vw, 48px)',
        }}>
          Open to full-time roles, freelance projects, and interesting collaborations.
        </p>

        {/* Divider */}
        <div className="c-line" style={{
          height: 1, width: 'clamp(48px, 6vw, 80px)',
          background: `linear-gradient(to right, ${GOLD}, ${CORAL})`,
          marginBottom: 'clamp(28px, 4vw, 48px)',
        }} />

        {/* Contact links */}
        <div ref={linksRef} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 22px)' }}>
          {LINKS.map(({ label, href, accent }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="c-link group"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                textDecoration: 'none', opacity: 1,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <span style={{
                display: 'block', width: 6, height: 6,
                background: accent, transform: 'rotate(45deg)', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: SYNE, fontSize: 'clamp(13px, 1.1vw, 16px)',
                fontWeight: 500, letterSpacing: '0.04em', color: WHITE,
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: SYNE, fontSize: 12, color: accent,
                opacity: 0, transition: 'opacity 0.25s',
                marginLeft: 4,
              }}
                className="group-hover-arrow"
              >
                →
              </span>
            </a>
          ))}
        </div>

        {/* Footer meta */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          marginTop: 'clamp(40px, 6vw, 72px)',
        }}>
          <Fan width={52} color={GOLD} opacity={0.55} />
          <div>
            <p style={{
              fontFamily: SYNE, fontSize: 9, fontWeight: 700,
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: `${GOLD}90`, margin: 0, marginBottom: 4,
            }}>
              Based in
            </p>
            <p style={{
              fontFamily: SYNE, fontSize: 13, fontWeight: 600,
              letterSpacing: '0.14em', color: `${CREAM}80`, margin: 0,
            }}>
              India · 2026
            </p>
          </div>
        </div>

        {/* img3 — small floating accent portrait */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(32px, 5vw, 60px)',
          right: 'clamp(20px, 4vw, 48px)',
          width: 'clamp(80px, 8vw, 120px)',
          aspectRatio: '3/4',
          overflow: 'hidden',
          border: `1px solid ${GOLD}40`,
          zIndex: 3,
        }}>
          <img
            src={img3}
            alt="Praneswar Ganesan"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(30%)' }}
          />
        </div>
      </div>

      {/* ── RIGHT COLUMN — leather jacket photo ─────────── */}
      <div
        ref={imgRef}
        style={{
          flex: '0 0 44%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={img4}
          alt="Praneswar Ganesan"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Left edge fade into dark */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${CHARCOAL} 0%, transparent 25%)`,
        }} />
        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${CHARCOAL}88 0%, transparent 40%)`,
        }} />

        {/* editorial label on photo */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(28px, 4vw, 52px)',
          right: 'clamp(20px, 3vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
        }}>
          <span style={{
            fontFamily: CORMORANT, fontStyle: 'italic',
            fontSize: 'clamp(11px, 1vw, 14px)', fontWeight: 400,
            letterSpacing: '0.12em', color: `${CREAM}60`,
          }}>
            Praneswar Ganesan
          </span>
          <span style={{
            display: 'block', width: 32, height: 1,
            background: `${GOLD}60`, marginLeft: 'auto',
          }} />
        </div>
      </div>
    </section>
  );
}
