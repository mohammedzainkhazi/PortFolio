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
    let mouse = { x: 0, y: 0 };
    let scrollY = 0;
    let raf: number;
    let t = 0;

    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
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

        // Store trail positions (max 18 points)
        tr.trail.push({ x: cx, y: cy });
        if (tr.trail.length > 18) tr.trail.shift();

        const fade = tr.progress < 0.1
          ? tr.progress / 0.1
          : tr.progress > 0.9
          ? (1 - tr.progress) / 0.1
          : 1;
        const alpha = tr.opacity * fade * dim;

        // Draw tail as tapered line
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

        // Glow
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

        // Reset when journey complete
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
