export const GOLD     = '#C8972A';
export const TEAL     = '#1B5E7B';
export const CORAL    = '#D4613C';
export const CREAM    = '#FFFDF4';
export const FOREST   = '#0E2A1E';
export const NAVY     = '#0A2540';
export const CHARCOAL = '#1A1A1A';

// Global cream color palette for consistent hardcoded values
export const CREAM_PALETTE = {
  ee: '#FFFDF4EE', // ~93% opacity
  cc: '#FFFDF4CC', // ~80% opacity
  aa: '#FFFDF4AA', // ~67% opacity
  88: '#FFFDF488', // ~53% opacity
  66: '#FFFDF466', // ~40% opacity
  44: '#FFFDF444', // ~27% opacity
};

export function Fan({ width = 96, opacity = 1, color = GOLD }) {
  const h  = width / 2;
  const cx = width / 2;
  const cy = h;
  const R  = h - 1;
  return (
    <svg viewBox={`0 0 ${width} ${h}`} width={width} height={h} fill="none" aria-hidden style={{ opacity }}>
      {Array.from({ length: 9 }, (_, i) => {
        const a = (Math.PI * i) / 8;
        return (
          <line key={i} x1={cx} y1={cy}
            x2={cx + R * Math.cos(Math.PI - a)} y2={cy - R * Math.sin(a)}
            stroke={color} strokeWidth="0.9" />
        );
      })}
      {[0.88, 0.63, 0.37].map((f, i) => (
        <path key={i}
          d={`M${cx - R * f} ${cy} A${R * f} ${R * f} 0 0 1 ${cx + R * f} ${cy}`}
          stroke={color} strokeWidth="0.9" fill="none" />
      ))}
      <line x1={0} y1={cy} x2={width} y2={cy} stroke={color} strokeWidth="0.9" opacity="0.5" />
    </svg>
  );
}

export function Diamond({ size = 8, color = GOLD }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size,
      height: size,
      background: color,
      transform: 'rotate(45deg)',
      flexShrink: 0,
    }} />
  );
}

export function RainbowStrip() {
  return (
    <div className="absolute top-0 left-0 w-full" style={{
      height: 4,
      background: `linear-gradient(to right, ${GOLD}, ${CORAL}, ${TEAL}, ${GOLD})`,
    }} />
  );
}
