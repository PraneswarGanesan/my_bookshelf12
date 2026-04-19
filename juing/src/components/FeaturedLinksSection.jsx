import { LinkPreview } from "./ui/link-preview";

const GOLD   = '#C8972A';
const TEAL   = '#1B5E7B';
const CORAL  = '#D4613C';
const AMBER_BG = '#F5E8C8';

export default function FeaturedLinksSection() {
  return (
    <section
      className="relative px-8 lg:px-16 overflow-hidden flex items-center"
      style={{ minHeight: '120vh', paddingLeft: 'clamp(48px, 7vw, 112px)', background: AMBER_BG }}
    >
      {/* Rainbow top border */}
      <div className="absolute top-0 left-0 w-full"
           style={{ height: 4, background: `linear-gradient(to right, ${CORAL}, ${GOLD}, ${TEAL})` }} />

      {/* Art Deco diagonal stripe watermark */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            ${GOLD}08 40px,
            ${GOLD}08 41px
          )`,

        }}
      />

      {/* Fan watermark bottom-right */}
      <div aria-hidden
           className="absolute bottom-0 right-0 pointer-events-none opacity-[0.08]"
           style={{ transform: 'rotate(180deg)' }}>
        {/* inline fan SVG so we don't need an import */}
        <svg viewBox="0 0 380 190" width="380" height="190" fill="none">
          {Array.from({ length: 9 }, (_, i) => {
            const a = (Math.PI * i) / 8;
            const R = 189;
            const cx = 190;
            const cy = 189;
            return (
              <line key={i} x1={cx} y1={cy}
                x2={cx + R * Math.cos(Math.PI - a)} y2={cy - R * Math.sin(a)}
                stroke={CORAL} strokeWidth="1.2" />
            );
          })}
          {[0.88, 0.63, 0.37].map((f, i) => (
            <path key={i}
              d={`M${190 - 189 * f} 189 A${189 * f} ${189 * f} 0 0 1 ${190 + 189 * f} 189`}
              stroke={CORAL} strokeWidth="1.2" fill="none" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full py-24">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span style={{ display:'inline-block', width:8, height:8, background:CORAL, transform:'rotate(45deg)' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: CORAL }}>
            Presence
          </span>
          <span className="block h-px flex-1 max-w-16" style={{ background: `${CORAL}50` }} />
        </div>

        <div className="space-y-12">
          <div
            className="font-light leading-[1.5]"
            style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)', color: '#4A3A1A' }}
          >
            I build enterprise systems at{" "}
            <LinkPreview
              url="https://www.accenture.com"
              imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
              isStatic
              className="font-bold border-b-2 pb-0.5 transition-colors"
              style={{ color: TEAL, borderColor: `${TEAL}60` }}
            >
              Corporate
            </LinkPreview>{" "}
            and ship open-source on{" "}
            <LinkPreview
              url="https://github.com/praneswar-g"
              imageSrc="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80"
              isStatic
              className="font-bold border-b-2 pb-0.5 transition-colors"
              style={{ color: CORAL, borderColor: `${CORAL}60` }}
            >
              GitHub
            </LinkPreview>
            .
          </div>

          <div
            className="font-light leading-[1.5]"
            style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)', color: '#4A3A1A' }}
          >
            I power AI pipelines with{" "}
            <LinkPreview
              url="https://deepmind.google/technologies/gemini/"
              imageSrc="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80"
              isStatic
              className="font-bold border-b-2 pb-0.5 transition-colors"
              style={{ color: '#7B3D73', borderColor: '#7B3D7360' }}
            >
              Gemini
            </LinkPreview>{" "}
            and deploy production workloads on{" "}
            <LinkPreview
              url="https://aws.amazon.com"
              imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
              isStatic
              className="font-bold border-b-2 pb-0.5 transition-colors"
              style={{ color: GOLD, borderColor: `${GOLD}60` }}
            >
              AWS
            </LinkPreview>
            .
          </div>

          <div
            className="font-light leading-[1.5]"
            style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)', color: '#4A3A1A' }}
          >
            Let's connect on{" "}
            <LinkPreview
              url="https://linkedin.com/in/praneswar-ganesan"
              imageSrc="https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&q=80"
              isStatic
              className="font-bold border-b-2 pb-0.5 transition-colors"
              style={{ color: TEAL, borderColor: `${TEAL}60` }}
            >
              LinkedIn
            </LinkPreview>
            {" "}— I'm always open to building something great.
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-20 flex items-center gap-4">
          <span className="block w-8 h-px" style={{ background: `${CORAL}50` }} />
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: `${CORAL}70` }}>
            Hover the links above
          </p>
        </div>
      </div>
    </section>
  );
}
