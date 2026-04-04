# Design Audit — Intro Section

---

## Iteration 1 — Full Intro Overhaul

### Observations
- Original felt like a template: flat parallax, default fade-ins, basic hover (scale only)
- No atmospheric depth — images were raw, no vignette, no grain, no layering
- Japanese text used `rotate-90` (wrong axis, bad UX) instead of `writing-mode: vertical-rl`
- "wait....." was a single opacity fade — no visual tension
- Hover on final section was just `whileHover: { scale: 1.2 }` with no physicality
- Role reveal used a generic easeOut — no cinematic rhythm

### Problems Identified
- Zero depth layers — no bg / mid / fg separation
- Default Framer Motion easing (`easeOut`) throughout
- No grain, no vignette, no light leaks
- Stars were static — no animation
- Text reveals: basic `y: 50 → 0` with no mask

### Improvements Applied

**§1 Sculpture Hero**
- Added radial vignette + bottom fog gradient
- Animated warm light leak (top-left, slow pulse scale)
- "wait" → animated dot sequence (staggered scale+opacity pulse per dot)
- Scroll breath line (animated height, cinematic ease)
- All text fades out via `scrollYProgress` transform as user scrolls past

**§2 Flower Black**
- Grayscale parallax image with independent `scale` + `y` transforms
- 6 floating ✦ stars at varied positions, sizes, delays — all animate y/opacity/rotate
- Text reveal: `blur(12px) → blur(0px)` + `y: 28 → 0` (blur-out reveal, not just fade)

**§3 Green Plant**
- `multiply` blend mode dark tint — rich, not flat
- Off-axis vignette (ellipse at 25% 60%) adds dramatic left-to-right depth
- Text slides in from left — matches image composition flow

**§4 Eye + Japanese**
- Eye image has horizontal parallax drift (`x: -6% → 6%`) — subtle but adds dimension
- Edge feathering: linear gradient blends eye into background color (no hard crop)
- Japanese text: `writing-mode: vertical-rl` — proper vertical CJK rendering
- Scale-in on viewport enter (1.18 → 1) with 2.8s cinematic ease

**§5 Role Reveal**
- Mask curtain: `overflow-hidden` wrapper + `y: 115% → 0%` — true text reveal
- Each line has intentional x-offset to break the monotony of pure centering
- 0.12s inter-line stagger — creates rhythm, not dumped all at once
- Hairline divider animates in after roles with 0.7s delay

**§6 Final — Apple-level hover**
- `useMotionValue` + `useSpring` for mouse XY tracking → 3D tilt (`rotateX`, `rotateY`)
- `perspective: 1100` + `transformStyle: preserve-3d` — real depth card
- Specular sheen overlay on hover (diagonal gradient, subtle)
- Glow `boxShadow` animates on hover/leave with spring damping
- Ambient bg radial glow expands on hover
- Name `textShadow` glows when card is hovered

**Global**
- `grain-overlay` CSS class: SVG feTurbulence + animated `grain-shift` keyframes (4 offsets at 0.18s) — live film grain
- `opacity: 0.042` + `mix-blend-mode: overlay` — non-destructive
- Scrollbar hidden globally for clean viewport
- `-webkit-font-smoothing: antialiased` globally

### Scoring

| Category       | Score |
|----------------|-------|
| Visual Depth   |  8.5  |
| Motion Quality |  9.0  |
| Composition    |  8.5  |
| Originality    |  8.5  |

**All scores ≥ 8 — iteration passes threshold.**

### What could push to 10
- Lenis smooth scroll (not yet installed)
- WebGL distortion shader on the eye section
- Cursor follower with lag
- Video texture on sculpture hero

---

## Iteration 2 — Marvel-style Cinematic Motion + Paper Stacking

### Observations
- Text felt static and "floating" — no living quality
- Backgrounds felt frozen between parallax moves
- No physical separation between sections (flat scroll)
- Japanese text was large but not breathing
- Roles section too small and inert
- Camera felt digital, not film-like

### Problems Identified
- No text micro-movement (looping animations)
- No background drift (images only moved on scroll, not constantly alive)
- No paper-stacking card scroll (sections just replaced each other flatly)
- No camera breathing simulation
- `DriftBg` children pattern was structurally broken

### Improvements Applied

**Architecture**
- `Card` component: wraps each section in `position: sticky; top: 0` with `zIndex` 1–6
- Each wrapper is `h-screen` — provides scroll distance; sticky inner is always at viewport top
- `scale: 1 → 0.88` + `borderRadius: 0 → 22px` + shadow as user scrolls past each section
- Sections now physically stack like layered cards — true paper-stack effect

**Text Micro-Movement (all sections)**
- `BreathText` component: `animate={{ y: [0, -amplitude, 0] }}` with 6.5–9s loop
- Each text block has different duration + delay → desynchronised, organic feel
- Mask-curtain entry (`y: 115% → 0%`) + inner `BreathText` for post-reveal life
- `overflow-hidden` with `padding: 4px 0` gives breathing room without clip

**Background Drift (all sections)**
- `DriftBg` component: `animate={{ scale: [1, 1.065, 1], x: [0, 9, 0] }}` + scroll-linked `y`
- All BG images always moving, even when user isn't scrolling
- Duration 14–18s varies per section → no sync between sections

**Camera Breathing (all sections)**
- `CamBreath` component: `animate={{ scale: [1, 1.013, 1] }}` wrapping section content
- Duration 9–14s per section, each with different delay
- Creates the feel of a real camera lens breathing

**Roles Section**
- Each role line: outer `motion.div` handles mask reveal, inner `motion.p` handles breathing
- Breathing: `y: [0, -4, 0]` on inner element — stays within overflow-hidden padding
- x-offsets (−22px, +4px, +16px, −8px) create non-monotonous composition

**Final Section**
- Name text: mask-curtain reveal + `BreathText` post-reveal
- Camera breathing added to section-level overlay

### Scoring

| Category       | Score |
|----------------|-------|
| Visual Depth   |  9.0  |
| Motion Quality |  9.5  |
| Composition    |  8.5  |
| Originality    |  9.0  |

**All scores ≥ 8.5 — iteration passes stop condition.**
