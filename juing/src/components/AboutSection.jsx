import img1 from '../my-images/1.png';
import img2 from '../my-images/2.jpeg';
import img3 from '../my-images/3.png';
import img4 from '../my-images/4.png';

import { GOLD, TEAL, CORAL, CREAM, CHARCOAL, Fan, Diamond, RainbowStrip } from './deco';
import {
  ContainerStagger,
  ContainerAnimated,
  GalleryGrid,
  GalleryGridCell,
} from './blocks/cta-section-with-gallery';

const SYNE = "'Syne', sans-serif";

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-[120vh] overflow-hidden flex items-center"
             style={{ background: CREAM, padding: 'clamp(48px, 7vw, 112px) clamp(24px, 6vw, 120px)' }}>
      <RainbowStrip />

      {/* Art Deco fan watermark */}
      <div aria-hidden className="absolute bottom-0 left-0 pointer-events-none opacity-[0.05]">
        <Fan width={380} color={TEAL} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full
                      grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <ContainerStagger>
          <ContainerAnimated>
            <div className="flex items-center gap-3 mb-6">
              <Diamond size={8} color={GOLD} />
              <span style={{ fontFamily: SYNE, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD }}>
                About Me
              </span>
              <span className="block h-px flex-1 max-w-16" style={{ background: `${GOLD}50` }} />
            </div>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2 className="leading-[0.9] mb-6"
                style={{ fontFamily: SYNE, fontWeight: 900, fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)', color: CHARCOAL }}>
              ENGINEERING<br />
              <span style={{ color: TEAL }}>WITH INTENT</span>
            </h2>
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="h-0.5 w-20 mb-8"
                 style={{ background: `linear-gradient(to right, ${GOLD}, ${CORAL})` }} />
          </ContainerAnimated>

          <ContainerAnimated>
            <p className="leading-[1.9] max-w-md mb-5"
               style={{ fontFamily: SYNE, fontSize: 'clamp(14px, 1.1vw, 17px)', color: CHARCOAL }}>
              I'm Praneswar Ganesan — a full-stack engineer who builds systems that survive
              contact with production. I architect cloud-native platforms, AI deployment
              pipelines, and enterprise tools that scale from zero to thousands of requests.
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <p className="leading-[1.9] max-w-md mb-10"
               style={{ fontFamily: SYNE, fontSize: 'clamp(14px, 1.1vw, 17px)', color: CHARCOAL }}>
              Interned at Accenture's Cloud Manager &amp; Optimizer division, designing APIs
              and observability dashboards used by real teams. Completing my CS degree while
              actively contributing to open source.
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="flex items-center gap-6 flex-wrap">
              <a href="#work"
                 className="inline-flex items-center gap-3 text-white transition-all duration-300 hover:opacity-85"
                 style={{ fontFamily: SYNE, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '14px 32px', background: TEAL }}>
                View My Work <span>→</span>
              </a>
              <div className="flex items-center gap-3">
                <Fan width={48} color={GOLD} opacity={0.8} />
                <div>
                  <p className="mb-0.5" style={{ fontFamily: SYNE, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>Based in</p>
                  <p style={{ fontFamily: SYNE, fontSize: 14, letterSpacing: '0.18em', fontWeight: 600, color: CHARCOAL }}>India · 2026</p>
                </div>
              </div>
            </div>
          </ContainerAnimated>
        </ContainerStagger>

        {/* Gallery grid — 4 personal photos */}
        <GalleryGrid>
          {[img1, img2, img3, img4].map((src, index) => (
            <GalleryGridCell index={index} key={index}>
              <img className="w-full h-full object-cover object-center"
                   src={src} alt={`Praneswar Ganesan ${index + 1}`} />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
}
