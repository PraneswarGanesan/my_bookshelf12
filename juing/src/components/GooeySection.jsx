import { GooeyFilter } from "./ui/gooey-filter";
import { PixelTrail } from "./ui/pixel-trail";
import { useScreenSize } from "../hooks/use-screen-size";
import DxFiggleFont from "../assets/fonts/Free To Try/Dx Figgle Free to Try.otf";

const GOLD  = '#fff4dd';
const CORAL = '#D4613C';

const fontStyle = `
  @font-face {
    font-family: 'Dx Figgle';
    src: url('${DxFiggleFont}') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default function GooeySection() {
  const screenSize = useScreenSize();

  return (
    <>
      <style>{fontStyle}</style>
      <section className="relative w-full overflow-hidden" style={{ minHeight: '120vh' }}>
      {/* Background — circuit board */}
      <img
        src="https://images.unsplash.com/photo-1775572531461-2c73c91121d1?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.5, filter: 'blur(8px)' }}
      />
      {/* Blur overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(9, 15, 26, 0.3)' }} />

      {/* Rainbow top border */}
      <div className="absolute top-0 left-0 w-full"
           style={{ height: 4, background: `linear-gradient(to right, ${GOLD}, ${CORAL}, #7B3D73, ${GOLD})` }} />

      {/* Gooey filter + gold pixel trail */}
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
      <div
        className="absolute inset-0 z-30"
        style={{ filter: "url(#gooey-filter-pixel-trail)", pointerEvents: 'none' }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 20 : 28}
          fadeDuration={400}
          delay={100}
          pixelClassName="bg-[#C8972A]"
        />
      </div>

      {/* Text */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-8"
           style={{ minHeight: '100vh' }}>
        <p className="text-[20px] tracking-[0.5em] uppercase mb-6"
           style={{ color: `${GOLD}60` }}>
          Philosophy
        </p>
        <h2
          className="text-white leading-[0.88] mb-6 select-none"
          style={{ fontFamily: '"Dx Figgle", serif', fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '0.15em', fontStretch: '85%' }}
        >
          CRAFTING<br />
          <span style={{ color: GOLD }}>MOMENTS.</span>
        </h2>
        <p className="text-[10px] tracking-[0.25em] uppercase mt-4"
           style={{ color: `${CORAL}70` }}>
          Move your cursor · leave a mark
        </p>
      </div>
    </section>
    </>
  );
}
