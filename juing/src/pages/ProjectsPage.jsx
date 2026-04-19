import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { projects } from '../data/Projects';
import resume from '../resume/PraneswarGanesanResume.pdf';

gsap.registerPlugin(ScrollTrigger);

function Fan({ width = 96, opacity = 1, light = false }) {
  const color = light ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)';
  const h = width / 2;
  const cx = width / 2;
  const cy = h;
  const R = h - 1;
  return (
    <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h} fill="none" aria-hidden style={{ opacity }}>
      {Array.from({ length: 9 }, (_, i) => {
        const a = (Math.PI * i) / 8;
        return (
          <line key={i} x1={cx} y1={cy}
            x2={cx + R * Math.cos(Math.PI - a)} y2={cy - R * Math.sin(a)}
            stroke={color} strokeWidth="0.6" />
        );
      })}
      {[0.88, 0.63, 0.37].map((f, i) => (
        <path key={i}
          d={`M${cx - R * f} ${cy} A${R * f} ${R * f} 0 0 1 ${cx + R * f} ${cy}`}
          stroke={color} strokeWidth="0.6" fill="none" />
      ))}
      <line x1={0} y1={cy} x2={width} y2={cy} stroke={color} strokeWidth="0.6" opacity="0.35" />
    </svg>
  );
}

const statusColors = {
  Production: 'text-emerald-400 border-emerald-400/30',
  Active: 'text-blue-400 border-blue-400/30',
  Completed: 'text-stone-400 border-stone-400/30',
  'Open Source': 'text-purple-400 border-purple-400/30',
};

export default function ProjectsPage() {
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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
      const past = scroll > 60;
      nav.style.background = past ? 'rgba(10,10,10,0.96)' : 'transparent';
      nav.style.borderBottomColor = past ? 'rgba(255,255,255,0.06)' : 'transparent';
      nav.style.backdropFilter = past ? 'blur(14px)' : 'none';
    });

    gsap.utils.toArray('.rise').forEach(el => {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      );
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* ── Nav ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5
                   flex items-center justify-between transition-all duration-500
                   border-b border-transparent"
      >
        <Link to="/"
          className="text-xl tracking-widest text-white/70 hover:text-white transition-colors"
          style={{ fontFamily: 'DxFiggle, serif' }}>
          PG
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[10px] tracking-[0.28em] uppercase text-white/40 hover:text-white transition-colors">
            ← Back Home
          </Link>
          <a href={resume} download
             className="text-[10px] tracking-[0.22em] uppercase border px-5 py-2.5
                        text-white border-white/25 hover:bg-white hover:text-black
                        transition-all duration-300">
            Résumé
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 px-8 lg:px-16 overflow-hidden">
        <div aria-hidden
             className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden">
          <span style={{ fontFamily: 'DxFiggle, serif', fontSize: '28vw', lineHeight: 1,
                         color: 'rgba(255,255,255,0.02)', whiteSpace: 'nowrap' }}>
            WORK
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="rise text-[10px] tracking-[0.4em] uppercase mb-6 text-white/30">
            Selected Work · {projects.length} Projects
          </p>
          <h1 className="rise text-white leading-[0.88]"
              style={{ fontFamily: 'DxFiggle, serif', fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            ALL<br />
            <span className="text-white/40">PROJECTS</span>
          </h1>
          <div className="rise mt-10 flex items-center gap-5">
            <span className="block w-12 h-px bg-white/20" />
            <p className="text-white/30 text-[10px] tracking-[0.38em] uppercase">
              Full-stack · Cloud · AI · Open Source
            </p>
          </div>
        </div>
      </section>

      {/* ── GitHub Stats Banner ── */}
      <section className="px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto border border-white/08 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects', value: projects.length },
            { label: 'Technologies', value: '20+' },
            { label: 'Open Source', value: '4' },
            { label: 'Production', value: '2' },
          ].map(({ label, value }) => (
            <div key={label} className="rise text-center">
              <p className="text-white text-4xl mb-1" style={{ fontFamily: 'DxFiggle, serif' }}>
                {value}
              </p>
              <p className="text-[10px] tracking-[0.28em] uppercase text-white/25">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="px-8 lg:px-16 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-1">
            {projects.map((project, i) => (
              <article
                key={project.id}
                className="rise group relative overflow-hidden border border-white/06
                           hover:border-white/15 transition-colors duration-500 cursor-default"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700
                               group-hover:scale-105"
                    style={{ filter: 'brightness(0.7)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[9px] tracking-[0.25em] uppercase border px-3 py-1
                                     ${statusColors[project.status] ?? 'text-white/40 border-white/20'}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* GitHub link */}
                  {project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity
                                 bg-white text-black text-[9px] tracking-widest uppercase px-4 py-2
                                 hover:bg-black hover:text-white border border-transparent
                                 hover:border-white transition-all duration-300"
                    >
                      GitHub →
                    </a>
                  )}

                  {/* Project number */}
                  <div className="absolute bottom-4 right-4 text-white/10 text-6xl leading-none select-none"
                       style={{ fontFamily: 'DxFiggle, serif' }}>
                    0{i + 1}
                  </div>
                </div>

                {/* Info */}
                <div className="p-7 bg-black/60">
                  <h2 className="text-white text-3xl mb-3 group-hover:text-white/80 transition-colors"
                      style={{ fontFamily: 'DxFiggle, serif' }}>
                    {project.title}
                  </h2>
                  <p className="text-white/40 text-[14px] leading-[1.8] mb-6">
                    {project.fullDescription}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-white/20 text-[8px] mt-1.5 shrink-0">◆</span>
                        <span className="text-white/35 text-[12px] leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.split(' · ').map(tech => (
                      <span key={tech}
                            className="text-[9px] tracking-widest uppercase text-white/25
                                       border border-white/08 px-2.5 py-1 hover:border-white/20
                                       hover:text-white/50 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/06 py-10 px-8 lg:px-16 flex items-center justify-between"
              style={{ background: '#0a0a0a' }}>
        <Link to="/"
              className="text-white/30 text-sm tracking-widest hover:text-white/60 transition-colors"
              style={{ fontFamily: 'DxFiggle, serif' }}>
          PG
        </Link>
        <span className="text-[10px] tracking-[0.28em] uppercase text-white/15">
          © 2026 Praneswar Ganesan
        </span>
        <Fan width={72} opacity={0.2} light />
      </footer>
    </div>
  );
}
