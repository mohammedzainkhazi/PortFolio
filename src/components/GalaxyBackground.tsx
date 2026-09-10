'use client';

import { useEffect, useRef } from 'react';
import heroImg from '../images/black_hole_hero.jpg';

interface Star {
  x: number; y: number; z: number;
  r: number; opacity: number; twinkle: number;
}

interface Comet {
  x: number; y: number;
  length: number;
  speed: number;
  dx: number; dy: number;
  opacity: number;
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
    let comets: Comet[] = [];
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let targetScrollY = 0;
    let smoothScrollY = 0;
    let lastScrollY = 0;
    let scrollSpeed = 0;
    let raf: number;
    let t = 0;

    // Load Gargantua image asset
    const img = new Image();
    img.src = heroImg.src;
    let imgLoaded = false;
    img.onload = () => { imgLoaded = true; };

    const createComet = (speedBoost = 1): Comet => {
      const angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.3;
      const baseSpd = (Math.random() * 8 + 6 + scrollSpeed * 0.4) * speedBoost;
      return {
        x: Math.random() * W * 1.3 - W * 0.15,
        y: -60,
        length: (Math.random() * 90 + 50) * Math.min(2, speedBoost),
        speed: baseSpd,
        dx: Math.cos(angle) * baseSpd,
        dy: Math.sin(angle) * baseSpd,
        opacity: Math.random() * 0.7 + 0.3,
      };
    };

    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      // Deep space stars
      const starCount = W < 768 ? 200 : 380;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));

      comets = Array.from({ length: 5 }, () => createComet());
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      // Smooth mouse & scroll lerp for silky 60fps parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      smoothScrollY += (targetScrollY - smoothScrollY) * 0.08;
      scrollSpeed = Math.abs(smoothScrollY - lastScrollY);
      lastScrollY = smoothScrollY;

      // Calculate scroll progress (0 at top, 1 at bottom)
      const maxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - H);
      const progress = Math.min(1, Math.max(0, smoothScrollY / maxScroll));

      const dim = darkRef.current ? 1 : 0.25;
      const offsetX = (mouse.x / W - 0.5) * 45;
      const offsetY = (mouse.y / H - 0.5) * 45;

      // --- 1. Draw Deep Space Stars with Warp Parallax ---
      for (const s of stars) {
        const starSpeedMult = 1 + progress * 1.5;
        const px = (s.x + offsetX * s.z + W) % W;
        const py = (s.y + offsetY * s.z + smoothScrollY * s.z * 0.1 * starSpeedMult) % H;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.6 + s.twinkle);
        const alpha = s.opacity * (0.5 + 0.5 * tw) * dim;

        ctx.beginPath();
        ctx.arc(px, py, s.r * (1 + progress * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
        ctx.fill();
      }

      // --- 2. Draw Shooting Star Comets with Gravitational Speed Surge ---
      if (dim > 0.4) {
        // Accelerate comet speed and density as you get close to Gargantua
        const cometSpeedMult = 1.0 + progress * 3.5 + (scrollSpeed > 3 ? 0.6 : 0);
        const maxCometCount = Math.floor(5 + progress * 8);

        if (comets.length < maxCometCount && Math.random() < 0.15) {
          comets.push(createComet(cometSpeedMult));
        }

        for (let i = comets.length - 1; i >= 0; i--) {
          const c = comets[i];
          c.x += c.dx * (1 + progress * 0.8);
          c.y += c.dy * (1 + progress * 0.8);

          const alpha = c.opacity * dim;
          const currentLength = c.length * (1 + progress * 0.8);
          const tailX = c.x - (c.dx / c.speed) * currentLength;
          const tailY = c.y - (c.dy / c.speed) * currentLength;

          const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(0.3, `rgba(226, 232, 240, ${alpha * 0.7})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8 + progress * 1.2;
          ctx.lineCap = 'round';
          ctx.stroke();

          if (c.y > H + 120 || c.x > W + 120) {
            comets[i] = createComet(cometSpeedMult);
          }
        }
      }

      // --- 3. Render Scroll-Driven Gargantua Entry Zoom ("Going Inside Gargantua") ---
      if (imgLoaded && dim > 0.3) {
        ctx.save();

        // Maintain true 16:9 Gargantua proportions while zooming in on scroll down
        const aspect = 16 / 9;
        const zoomFactor = 1.0 + Math.pow(progress, 1.15) * 2.2; // Smoothly zooms up to 3.2x as you scroll down into Gargantua!
        const baseSize = Math.max(W * 1.15, H * aspect * 1.15);
        let imgW = baseSize * zoomFactor;
        let imgH = imgW / aspect;

        const imgX = W * 0.5 + offsetX * (0.4 + progress * 0.4) - imgW / 2;
        const imgY = H * 0.42 + offsetY * (0.4 + progress * 0.4) - imgH / 2;
        const radius = Math.max(imgW, imgH) * 0.48;

        // Create Radial Vignette Mask to blend outer edges seamlessly into deep space
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = imgW;
        maskCanvas.height = imgH;
        const maskCtx = maskCanvas.getContext('2d');

        if (maskCtx) {
          maskCtx.drawImage(img, 0, 0, imgW, imgH);

          // Feather edges softly to background color
          const grad = maskCtx.createRadialGradient(
            imgW / 2, imgH / 2, radius * (0.35 - progress * 0.1),
            imgW / 2, imgH / 2, radius
          );
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.85)');
          grad.addColorStop(0.94, 'rgba(0, 0, 0, 0.25)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          maskCtx.globalCompositeOperation = 'destination-in';
          maskCtx.fillStyle = grad;
          maskCtx.beginPath();
          maskCtx.ellipse(imgW / 2, imgH / 2, radius, radius * 0.7, 0, 0, Math.PI * 2);
          maskCtx.fill();

          // Render scaled Gargantua backdrop
          ctx.globalAlpha = Math.min(0.9, 0.75 + progress * 0.15) * dim;
          ctx.drawImage(maskCanvas, imgX, imgY);
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const onScroll = () => { targetScrollY = window.scrollY; };

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



