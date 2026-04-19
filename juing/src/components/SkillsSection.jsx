import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOLD, CREAM } from './deco';
import gifBg from '../stock_video/cosmos_1726548166.gif';

gsap.registerPlugin(ScrollTrigger);

const SYNE = "'Syne', sans-serif";

const CATEGORIES = [
  { num: '01', name: 'LANGUAGES',     items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { num: '02', name: 'BACKEND',       items: ['Spring Boot', 'Express.js', 'Node.js', 'REST APIs'] },
  { num: '03', name: 'FRONTEND',      items: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'] },
  { num: '04', name: 'CLOUD / AWS',   items: ['EC2 · S3 · Lambda', 'VPC · RDS', 'CloudWatch'] },
  { num: '05', name: 'DEVOPS',        items: ['Docker · Kubernetes', 'CI/CD', 'GitHub Actions'] },
  { num: '06', name: 'DATABASES',     items: ['PostgreSQL · MySQL', 'MongoDB · Redis'] },
  { num: '07', name: 'OBSERVABILITY', items: ['Splunk', 'OpenTelemetry', 'ServiceNow · Grafana'] },
  { num: '08', name: 'AI / ML',       items: ['LLM APIs', 'Prompt Engineering', 'AI Integration'] },
  { num: '09', name: 'ARCHITECTURE',  items: ['Microservices', 'System Design', 'Cloud-Native', 'Event-Driven'] },
  { num: '10', name: 'MESSAGING',     items: ['RabbitMQ', 'Message Queuing', 'Event Streams'] },
  { num: '11', name: 'PRACTICES',     items: ['Git · GitHub', 'Agile · Scrum', 'Code Review'] },
  { num: '12', name: 'TESTING',       items: ['Unit Testing', 'Integration Testing', 'TDD · Jest'] },
];

export default function SkillsSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const labelRef    = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      gsap.fromTo(headingRef.current,
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      );

      gsap.utils.toArray('.skill-cat').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
            delay: (i % 4) * 0.07,
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 90%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 120px)',
      }}
    >
      {/* GIF background */}
      <img
        src={gifBg}
        alt=""
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay — warm tint to honour the fire palette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(6,3,1,0.82) 0%, rgba(10,5,1,0.76) 60%, rgba(14,8,2,0.80) 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 96px)' }}>

          {/* Label */}
          <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(20px, 2.5vw, 32px)' }}>
            <span style={{ display: 'block', width: 36, height: 1, background: GOLD }} />
            <span style={{ fontFamily: SYNE, fontSize: 11, fontWeight: 700, letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD }}>
              Technical Arsenal
            </span>
          </div>

          {/* ARSENAL mega-heading */}
          <div style={{ overflow: 'hidden' }}>
            <h2
              ref={headingRef}
              style={{
                fontFamily: SYNE, fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 14rem)',
                lineHeight: 0.87, letterSpacing: '-0.04em',
                color: CREAM, margin: 0, textTransform: 'uppercase',
              }}
            >
              ARSENAL
            </h2>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 'clamp(24px, 3vw, 40px)' }}>
            <span style={{ display: 'block', width: 'clamp(48px, 6vw, 80px)', height: 1, background: `${GOLD}55`, flexShrink: 0 }} />
            <p style={{
              fontFamily: SYNE, fontSize: 'clamp(13px, 1.05vw, 15px)', fontWeight: 400,
              color: `${CREAM}80`, letterSpacing: '0.04em', margin: 0, maxWidth: 480, lineHeight: 1.7,
            }}>
              A curated collection of technologies and methodologies
              refined through years of craftsmanship.
            </p>
          </div>
        </div>

        {/* ── Skills grid ────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${GOLD}28`,
          borderLeft: `1px solid ${GOLD}28`,
        }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.num}
              className="skill-cat"
              style={{
                padding: 'clamp(20px, 2.5vw, 32px)',
                borderRight: `1px solid ${GOLD}28`,
                borderBottom: `1px solid ${GOLD}28`,
                transition: 'background 0.35s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}14`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Number */}
              <div style={{
                fontFamily: SYNE, fontSize: 10, fontWeight: 800,
                letterSpacing: '0.25em', color: GOLD,
                marginBottom: 10,
              }}>
                {cat.num}
              </div>

              {/* Category name */}
              <div style={{
                fontFamily: SYNE, fontWeight: 800,
                fontSize: 'clamp(12px, 1.1vw, 15px)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: CREAM, marginBottom: 14,
                borderBottom: `1px solid ${GOLD}30`,
                paddingBottom: 10,
              }}>
                {cat.name}
              </div>

              {/* Skill items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {cat.items.map((item, j) => (
                  <span key={j} style={{
                    fontFamily: SYNE, fontSize: 'clamp(10px, 0.85vw, 12px)',
                    fontWeight: 400, color: `${CREAM}70`,
                    letterSpacing: '0.02em', lineHeight: 1.65,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
