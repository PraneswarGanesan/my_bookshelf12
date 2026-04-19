import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import resume from '../resume/PraneswarGanesanResume.pdf';

import { GOLD, FOREST, CHARCOAL, Fan } from './deco';
import HeroSection          from './HeroSection';
import AboutSection         from './AboutSection';
import ExperienceSection    from './ExperienceSection';
import FeaturedLinksSection from './FeaturedLinksSection';
import GooeySection         from './GooeySection';
import ProjectsPreviewSection from './ProjectsPreviewSection';
import SkillsSection        from './SkillsSection';
import ContactSection       from './ContactSection';
import ScrollingThing from './scrollingthing';

gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  const navRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    lenis.on('scroll', ({ scroll }) => {
      const nav = navRef.current;
      if (!nav) return;
      const past = scroll > 70;
      nav.style.background        = past ? `rgba(255,253,244,0.97)` : 'transparent';
      nav.style.borderBottomColor = past ? `${GOLD}30`              : 'transparent';
      nav.style.backdropFilter    = past ? 'blur(14px)'             : 'none';
      nav.querySelectorAll('.nl').forEach(el => {
        el.style.color = past ? CHARCOAL : '#ffffff';
      });
    });

    gsap.utils.toArray('.rise').forEach(el => {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });

    gsap.utils.toArray('.para').forEach(el => {
      gsap.to(el, {
        yPercent: -14, ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom', end: 'bottom top', scrub: true,
        },
      });
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* ══════════════ NAV ══════════════ */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 border-b border-transparent"
        style={{ padding: '18px clamp(24px, 5vw, 80px)' }}
      >
        <Link to="/"
              className="nl transition-colors duration-400"
              style={{ fontFamily: "'DxFiggle', serif", fontSize: 'clamp(16px, 1.5vw, 22px)', fontWeight: 700, letterSpacing: '0.12em', color: '#fff' }}>
          PG
        </Link>

        <div className="hidden md:flex items-center" style={{ gap: 'clamp(24px, 3vw, 48px)' }}>
          {['About', 'Work', 'Skills', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
               className="nl hover:opacity-50 transition-opacity duration-300"
               style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#fff' }}>
              {l}
            </a>
          ))}
          <Link to="/projects"
                className="nl hover:opacity-50 transition-opacity duration-300"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#fff' }}>
            Projects
          </Link>
        </div>

        <a href={resume} download
           className="nl hover:opacity-75 transition-all duration-300"
           style={{
             fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700,
             letterSpacing: '0.22em', textTransform: 'uppercase',
             border: '1px solid rgba(255,255,255,0.32)',
             padding: '10px 22px', color: '#fff',
           }}>
          Résumé
        </a>
      </nav>

      {/* ══════════════ SECTIONS ══════════════ */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedLinksSection />
      <GooeySection />
      <ProjectsPreviewSection />
      <SkillsSection />
      <ScrollingThing />
      <ContactSection />

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t py-7 px-8 lg:px-16 flex items-center justify-between"
              style={{ background: FOREST, borderColor: `${GOLD}25` }}>
        <span className="text-sm tracking-widest" style={{ fontFamily: 'DxFiggle, serif', color: `${GOLD}80` }}>
          PG
        </span>
        <span className="text-[10px] tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2026 Praneswar Ganesan
        </span>
        <Fan width={72} opacity={0.35} color={GOLD} />
      </footer>
    </>
  );
}
