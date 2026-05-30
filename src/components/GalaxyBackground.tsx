'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; z: number;
  r: number; opacity: number; twinkle: number;
}

interface Traveller {
  x: number; y: number;
  tx: number; ty: number;
  speed: number;
  r: number; opacity: number;
  progress: number;
  trail: { x: number; y: number }[];
}

// Each planet is pinned at a scroll-depth (scrollAt = pageY to appear)
interface Planet {
  x: number;        // 0–1 fraction of W
  scrollAt: number; // pageY at which it's centered
  r: number;
  color1: string;   // base color
  color2: string;   // highlight
  ringColor: string;
  hasRing: boolean;
  tilt: number;
}

function makeTraveller(W: number, H: number): Traveller {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    tx: Math.random() * W,
    ty: Math.random() * H,
    speed: Math.random() * 0.003 + 0.001,
    r: Math.random() * 1.2 + 0.4,
    opacity: Math.random() * 0.7 + 0.3,
    progress: 0,
    trail: [],
  };
}

// Fixed planet definitions — scroll position is set in init() relative to page height
const PLANET_DEFS: Omit<Planet, 'scrollAt' | 'x'>[] = [
  { r: 42, color1: '#c2a46d', color2: '#f5b078', ringColor: 'rgba(180,140,255,0.35)', hasRing: true,  tilt: 0.42 },
  { r: 28, color1: '#2a6a9e', color2: '#5ab0e0', ringColor: '',                        hasRing: false, tilt: 0 },
  { r: 55, color1: '#c4622d', color2: '#e88a50', ringColor: 'rgba(230,160,80,0.3)',    hasRing: true,  tilt: 0.28 },
  { r: 22, color1: '#3a8a4a', color2: '#72d48a', ringColor: '',                        hasRing: false, tilt: 0 },
];

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  px: number, py: number,
  planet: Planet,
  alpha: number,
  t: number
) {
  const { r, color1, color2, hasRing, ringColor, tilt } = planet;

  ctx.save();
  ctx.globalAlpha = alpha;

  // Atmospheric glow
  const glow = ctx.createRadialGradient(px, py, r * 0.6, px, py, r * 2.2);
  glow.addColorStop(0, color2 + '44');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(px, py, r * 2.2, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Planet body
  const body = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.1, px, py, r);
  body.addColorStop(0, color2);
  body.addColorStop(0.6, color1);
  body.addColorStop(1, '#050510');
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Surface shimmer bands
  ctx.save();
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.clip();
  for (let i = 0; i < 3; i++) {
    const by = py - r * 0.6 + i * r * 0.55 + Math.sin(t * 0.3 + i) * 2;
    ctx.fillStyle = `rgba(255,255,255,${0.04 - i * 0.01})`;
    ctx.fillRect(px - r, by, r * 2, r * 0.18);
  }
  ctx.restore();

  // Ring
  if (hasRing) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(tilt);
    ctx.scale(1, 0.3);
    // back half (behind planet)
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.85, Math.PI, Math.PI * 2);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = r * 0.38;
    ctx.stroke();
    ctx.restore();

    // redraw planet to cover front ring overlap
    const body2 = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.1, px, py, r);
    body2.addColorStop(0, color2);
    body2.addColorStop(0.6, color1);
    body2.addColorStop(1, '#050510');
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = body2;
    ctx.fill();

    // front half of ring (in front of planet)
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(tilt);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.85, 0, Math.PI);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = r * 0.38;
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

export default function GalaxyBackground({ darkMode = true }: { darkMode?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(darkMode);
  darkRef.current = darkMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let stars: Star[] = [];
    let travellers: Traveller[] = [];
    let planets: Planet[] = [];
    let mouse = { x: 0, y: 0 };
    let scrollY = 0;
    let raf: number;
    let t = 0;

    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      const pageH = document.body.scrollHeight || H * 4;
      const xPositions = [0.12, 0.82, 0.68, 0.22];
      planets = PLANET_DEFS.map((def, i) => ({
        ...def,
        x: xPositions[i],
        // spread planets evenly through the scroll depth, starting after first viewport
        scrollAt: H * 0.6 + (pageH - H) * (i / (PLANET_DEFS.length - 1 || 1)) * 0.85,
      }));

      const count = W < 768 ? 120 : 220;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random(),
        r: Math.random() * 1.6 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));
      travellers = Array.from({ length: 12 }, () => makeTraveller(W, H));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      const mx = mouse.x / W - 0.5;
      const my = mouse.y / H - 0.5;
      const dim = darkRef.current ? 1 : 0.25;

      // Planets — appear/disappear based on scroll position
      if (dim > 0.5) {
        for (const p of planets) {
          // distance from center of screen to this planet's scroll position
          const dy = p.scrollAt - (scrollY + H / 2);
          const fadeRange = H * 0.55;
          if (Math.abs(dy) > fadeRange) continue;
          const alpha = 1 - Math.abs(dy) / fadeRange;
          const px = p.x * W;
          const py = H / 2 + dy * 0.18; // slight parallax
          drawPlanet(ctx, px, py, p, alpha, t);
        }
      }

      // Static stars
      for (const s of stars) {
        const px = s.x + mx * s.z * 40;
        const py = s.y + my * s.z * 40 + scrollY * s.z * 0.15;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + s.twinkle);
        const alpha = s.opacity * (0.6 + 0.4 * tw) * dim;

        if (s.z > 0.6) {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, s.r * 3);
          grad.addColorStop(0, `rgba(200, 210, 255, ${alpha})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 255, ${alpha})`;
        ctx.fill();
      }

      // Travelling stars
      for (let i = 0; i < travellers.length; i++) {
        const tr = travellers[i];
        tr.progress = Math.min(tr.progress + tr.speed, 1);

        const cx = tr.x + (tr.tx - tr.x) * tr.progress;
        const cy = tr.y + (tr.ty - tr.y) * tr.progress;

        tr.trail.push({ x: cx, y: cy });
        if (tr.trail.length > 18) tr.trail.shift();

        const fade = tr.progress < 0.1
          ? tr.progress / 0.1
          : tr.progress > 0.9
          ? (1 - tr.progress) / 0.1
          : 1;
        const alpha = tr.opacity * fade * dim;

        if (tr.trail.length > 1) {
          for (let j = 1; j < tr.trail.length; j++) {
            const t0 = tr.trail[j - 1];
            const t1 = tr.trail[j];
            const ratio = j / tr.trail.length;
            ctx.beginPath();
            ctx.moveTo(t0.x, t0.y);
            ctx.lineTo(t1.x, t1.y);
            ctx.strokeStyle = `rgba(180, 220, 255, ${alpha * ratio * 0.6})`;
            ctx.lineWidth = tr.r * ratio * 1.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, tr.r * 4);
        grad.addColorStop(0, `rgba(180, 220, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, tr.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, tr.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();

        if (tr.progress >= 1) travellers[i] = makeTraveller(W, H);
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onScroll = () => { scrollY = window.scrollY; };

    init();
    draw();
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
