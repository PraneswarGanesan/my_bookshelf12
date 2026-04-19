import { useState, useEffect } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4';

const NAV_LINKS = ['Story', 'Investing', 'Building', 'Advisory'];

function FadeIn({ children, delay = 0, duration = 1000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="transition-opacity"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({ text, initialDelay = 200 }) {
  const charDelay = 30;
  const lines = text.split('\n');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  let globalCharIndex = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const chars = line.split('');
        globalCharIndex += chars.length;

        return (
          <span key={lineIndex} style={{ display: 'block' }}>
            {chars.map((char, charIndex) => {
              const delay =
                lineIndex * lines[lineIndex - 1 >= 0 ? lineIndex - 1 : 0].length * charDelay +
                charIndex * charDelay;

              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateX(0)' : 'translateX(-18px)',
                    transition: `opacity 500ms ${delay}ms, transform 500ms ${delay}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Video Background */}
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full px-6 md:px-12 lg:px-16">
        {/* Navbar */}
        <div className="pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
              Start a Chat
            </button>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left Column */}
            <div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
                style={{ letterSpacing: '-0.04em' }}
              >
                <AnimatedHeading text={"Shaping tomorrow\nwith vision and action."} initialDelay={200} />
              </h1>

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                    Download Resume
                  </button>
                  <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors duration-200">
                    Explore Projects
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
