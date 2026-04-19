import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { projects } from '../data/Projects';
import { GOLD, TEAL, CORAL, CREAM, CHARCOAL, Diamond, RainbowStrip } from './deco';

import vid1 from '../stock_video/pf-1.mp4';
import vid2 from '../stock_video/pf-2.mp4';
import vid3 from '../stock_video/pf-3.mp4';
import vid4 from '../stock_video/pf-4.mp4';
import cursorImg from '../stock-images/dawid-zawila-v4QjWQKfX4o-unsplash.jpg';
import pfImg1 from '../stock-images/pf-1.webp';
import pfImg2 from '../stock-images/pf-2.webp';
import pfImg3 from '../stock-images/pf-3.webp';
import pfImg4 from '../stock-images/pf-4.webp';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS  = [vid1, vid2, vid3, vid4];
const IMAGES  = [pfImg1, pfImg2, pfImg3, pfImg4];
const ACCENTS = [TEAL, CORAL, GOLD, '#6B3D73'];

function ProjectCard({ project, index, image, video, accent, cardRef }) {
  const videoRef = useRef(null);
  const imgRef   = useRef(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    gsap.to(v,       { opacity: 1, duration: 0.45, ease: 'power2.out' });
    gsap.to(imgRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' });
  };

  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    gsap.to(v, { opacity: 0, duration: 0.45, ease: 'power2.in',
      onComplete: () => v.pause() });
    gsap.to(imgRef.current, { opacity: 1, duration: 0.45, ease: 'power2.in' });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'none', background: '#111', width: '100%', height: '100%' }}
    >
      {/* Static image */}
      <img
        ref={imgRef}
        src={image}
        alt={project.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s ease',
        }}
      />

      {/* Hover video */}
      <video
        ref={videoRef}
        src={video}
        muted loop playsInline preload="none"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0,
        }}
      />

      {/* Accent top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 4, background: accent, zIndex: 2,
      }} />

      {/* Bottom info overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '48px 28px 28px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: accent, marginBottom: 8,
            }}>
              {project.status}
            </p>
            <h3 style={{
              fontFamily: 'DxFiggle, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              color: '#fff', lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}>
              {project.title}
            </h3>
          </div>
          <p style={{
            fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', textAlign: 'right', flexShrink: 0,
            maxWidth: 120, lineHeight: 1.7,
          }}>
            {project.stack.split(' · ').slice(0, 3).join('\n')}
          </p>
        </div>

        {project.link !== '#' && (
          <a
            href={project.link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: accent, borderBottom: `1px solid ${accent}50`,
              paddingBottom: 2,
            }}
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPreviewSection() {
  const sectionRef  = useRef(null);
  const cursorRef   = useRef(null);
  const headerRef   = useRef(null);
  const cardRefs    = useRef([]);

  useEffect(() => {
    const cursor  = cursorRef.current;
    const section = sectionRef.current;
    if (!cursor || !section) return;

    /* ── Smooth cursor follow ── */
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.55, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.55, ease: 'power3' });

    const onMove = (e) => { xTo(e.clientX - 45); yTo(e.clientY - 45); };
    const onEnterSection = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
    const onLeaveSection = () => gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.3 });

    window.addEventListener('mousemove', onMove);
    section.addEventListener('mouseenter', onEnterSection);
    section.addEventListener('mouseleave', onLeaveSection);

    /* ── Header scroll-in ── */
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%' } }
      );
    }

    /* ── Cards stagger scroll-in ── */
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          delay: (i % 2) * 0.18,
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseenter', onEnterSection);
      section.removeEventListener('mouseleave', onLeaveSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ position: 'relative', background: CREAM, overflow: 'hidden', cursor: 'none' }}
    >
      <RainbowStrip />

      {/* ── Custom cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 90, height: 90,
          borderRadius: 25,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'scale(0.6)',
          willChange: 'transform',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      >
        <img src={cursorImg} alt=""
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* ── Section header ── */}
      <div ref={headerRef} style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,64px) 48px',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Diamond size={10} color={CORAL} />
            <span style={{
              fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: CORAL,
            }}>Selected Work</span>
          </div>
          <h2 style={{
            fontFamily: 'DxFiggle, serif',
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            color: CHARCOAL, lineHeight: 0.88,
            letterSpacing: '-0.02em', margin: 0,
          }}>
            SELECTED<br />
            <span style={{ color: TEAL }}>WORK</span>
          </h2>
        </div>
        <Link
          to="/projects"
          style={{
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#fff', background: TEAL,
            padding: '14px 28px', textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}
        >
          All Projects →
        </Link>
      </div>

      {/* ── Cards grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 3,
        padding: '0 3px 3px',
      }}>
        {projects.map((project, i) => (
          <div key={project.id} style={{ aspectRatio: '4/3' }}>
            <ProjectCard
              project={project}
              index={i}
              image={IMAGES[i % IMAGES.length]}
              video={VIDEOS[i % VIDEOS.length]}
              accent={ACCENTS[i % ACCENTS.length]}
              cardRef={el => cardRefs.current[i] = el}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(48px,6vw,72px) 24px',
      }}>
        <Link
          to="/projects"
          style={{
            fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: TEAL, borderBottom: `1px solid ${TEAL}`,
            paddingBottom: 3, textDecoration: 'none',
          }}
        >
          View All Projects &amp; GitHub Stats →
        </Link>
      </div>
    </section>
  );
}
