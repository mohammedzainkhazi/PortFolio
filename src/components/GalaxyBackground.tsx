'use client';

import { useEffect, useRef } from 'react';
import heroImg from '../images/black_hole_hero.jpg';
import horizonImg from '../images/black_hole_horizon.jpg';
import singularityImg from '../images/black_hole_singularity.jpg';

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

interface InfallParticle {
  angle: number;
  dist: number;
  speed: number;
  size: number;
  opacity: number;
  length: number;
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
    let infallParticles: InfallParticle[] = [];
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let targetScrollY = 0;
    let smoothScrollY = 0;
    let lastScrollY = 0;
    let scrollSpeed = 0;
    let raf: number;
    let t = 0;

    // Load 3-stage Gargantua entry transition images with instant cache check
    let img1Loaded = false, img2Loaded = false, img3Loaded = false;

    const img1 = new Image();
    img1.onload = () => { img1Loaded = true; };
    img1.src = heroImg.src;
    if (img1.complete) img1Loaded = true;

    const img2 = new Image();
    img2.onload = () => { img2Loaded = true; };
    img2.src = horizonImg.src;
    if (img2.complete) img2Loaded = true;

    const img3 = new Image();
    img3.onload = () => { img3Loaded = true; };
    img3.src = singularityImg.src;
    if (img3.complete) img3Loaded = true;


    const createComet = (speedBoost = 1): Comet => {
      const angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.3;
      const baseSpd = (Math.random() * 8 + 6 + scrollSpeed * 0.4) * speedBoost;
      return {
        x: Math.random() * W * 1.3 - W * 0.15,
        y: -60,
        length: (Math.random() * 90 + 50) * Math.min(2.5, speedBoost),
        speed: baseSpd,
        dx: Math.cos(angle) * baseSpd,
        dy: Math.sin(angle) * baseSpd,
        opacity: Math.random() * 0.7 + 0.3,
      };
    };

    const createInfallParticle = (): InfallParticle => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 0.5 + 0.4, // Percentage from center
      speed: Math.random() * 0.008 + 0.004,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      length: Math.random() * 40 + 20,
    });

    // Persistent offscreen canvas instance to eliminate DOM allocation & GC thrashing in 60fps loop
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    let dpr = 1;
    let isMobile = false;

    const init = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      isMobile = W < 768;

      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2.0);

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // Set offscreen canvas to max potential size ONCE to prevent buffer-clear flickering
      const maxOffW = Math.floor(W * (isMobile ? 2.5 : 4.0) * dpr);
      const maxOffH = Math.floor(H * (isMobile ? 2.5 : 4.0) * dpr);
      if (offscreenCanvas.width < maxOffW || offscreenCanvas.height < maxOffH) {
        offscreenCanvas.width = maxOffW;
        offscreenCanvas.height = maxOffH;
      }

      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';

      // Mobile adaptive particle scaling for ultra-fast 60fps scrolling
      const starCount = isMobile ? 130 : 340;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));

      comets = Array.from({ length: isMobile ? 3 : 5 }, () => createComet());
      infallParticles = Array.from({ length: isMobile ? 18 : 45 }, () => createInfallParticle());
    };

    const draw = () => {
      // Read current scroll position without layout trashing
      targetScrollY = window.scrollY;

      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';
      t += 0.004;

      // Smooth mouse & scroll lerp for silky 60fps parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      smoothScrollY += (targetScrollY - smoothScrollY) * 0.1;
      scrollSpeed = Math.abs(smoothScrollY - lastScrollY);
      lastScrollY = smoothScrollY;

      // Calculate scroll progress (0 at top, 1 at bottom)
      const maxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - H);
      const progress = Math.min(1, Math.max(0, smoothScrollY / maxScroll));

      const dim = darkRef.current ? 1 : 0.25;
      const offsetX = (mouse.x / W - 0.5) * (isMobile ? 20 : 45);
      const offsetY = (mouse.y / H - 0.5) * (isMobile ? 20 : 45);
      const centerX = W * 0.5 + offsetX * 0.5;
      const centerY = H * 0.50 + offsetY * 0.5;

      // --- 1. Draw Deep Space Stars with Relativistic Warp ---
      for (const s of stars) {
        const starSpeedMult = 1 + progress * 2.0;
        const px = (s.x + offsetX * s.z + W) % W;
        const py = (s.y + offsetY * s.z + smoothScrollY * s.z * 0.1 * starSpeedMult) % H;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.6 + s.twinkle);
        const alpha = s.opacity * (0.5 + 0.5 * tw) * Math.max(0.1, 1 - progress * 0.8) * dim;

        ctx.beginPath();
        ctx.arc(px, py, s.r * (1 + progress * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
        ctx.fill();
      }

      // --- 2. Draw Shooting Star Comets with Gravitational Speed Surge ---
      if (dim > 0.4) {
        const cometSpeedMult = 1.0 + progress * 3.5 + (scrollSpeed > 3 ? 0.8 : 0);
        const maxCometCount = isMobile ? Math.floor(3 + progress * 4) : Math.floor(5 + progress * 8);

        if (comets.length < maxCometCount && Math.random() < 0.15) {
          comets.push(createComet(cometSpeedMult));
        }

        for (let i = comets.length - 1; i >= 0; i--) {
          const c = comets[i];
          c.x += c.dx * (1 + progress * 0.8);
          c.y += c.dy * (1 + progress * 0.8);

          const alpha = c.opacity * dim;
          const currentLength = c.length * (1 + progress * 1.2);
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
          ctx.lineWidth = 1.8 + progress * 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();

          if (c.y > H + 120 || c.x > W + 120) {
            comets[i] = createComet(cometSpeedMult);
          }
        }
      }

      // --- 3. Render 3-Stage Dynamic Gargantua Entry Engine ---
      if (dim > 0.3) {
        const aspect = 16 / 9;
        const baseW = Math.max(W * 1.15, H * aspect * 1.15);

        let alpha1 = 1;
        if (progress > 0.25) {
          alpha1 = Math.max(0, 1 - (progress - 0.25) / 0.20);
        }

        let alpha2 = 0;
        if (progress >= 0.18 && progress <= 0.40) {
          alpha2 = (progress - 0.18) / 0.22;
        } else if (progress > 0.40 && progress <= 0.60) {
          alpha2 = 1;
        } else if (progress > 0.60 && progress <= 0.78) {
          alpha2 = Math.max(0, 1 - (progress - 0.60) / 0.18);
        }

        let alpha3 = 0;
        if (progress >= 0.50 && progress <= 0.82) {
          alpha3 = Math.min(1, (progress - 0.50) / 0.25);
        } else if (progress > 0.82) {
          alpha3 = Math.max(0, 1 - (progress - 0.82) / 0.15);
        }

        // Ultra-clean high-speed layer renderer
        const drawLayer = (imageObj: HTMLImageElement, layerAlpha: number, layerZoom: number, rotationAngle = 0) => {
          if (layerAlpha <= 0.01 || !offscreenCtx) return;

          ctx.save();
          const imgW = baseW * layerZoom;
          const imgH = imgW / aspect;
          const imgX = centerX - imgW / 2;
          const imgY = centerY - imgH / 2;
          const radius = Math.max(imgW, imgH) * 0.48;

          const w = Math.ceil(imgW);
          const h = Math.ceil(imgH);

          if (offscreenCanvas.width !== w || offscreenCanvas.height !== h) {
            offscreenCanvas.width = w;
            offscreenCanvas.height = h;
          }

          offscreenCtx.setTransform(1, 0, 0, 1, 0, 0);
          offscreenCtx.clearRect(0, 0, w, h);
          offscreenCtx.imageSmoothingEnabled = true;
          offscreenCtx.imageSmoothingQuality = isMobile ? 'medium' : 'high';

          offscreenCtx.save();
          if (rotationAngle !== 0) {
            offscreenCtx.translate(w / 2, h / 2);
            offscreenCtx.rotate(rotationAngle);
            offscreenCtx.translate(-w / 2, -h / 2);
          }
          offscreenCtx.drawImage(imageObj, 0, 0, w, h);
          offscreenCtx.restore();

          // Soft Radial Vignette Mask
          const grad = offscreenCtx.createRadialGradient(
            w / 2, h / 2, radius * 0.3,
            w / 2, h / 2, radius
          );
          grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.85)');
          grad.addColorStop(0.94, 'rgba(0, 0, 0, 0.25)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          offscreenCtx.globalCompositeOperation = 'destination-in';
          offscreenCtx.fillStyle = grad;
          offscreenCtx.beginPath();
          offscreenCtx.ellipse(w / 2, h / 2, radius, radius * 0.7, 0, 0, Math.PI * 2);
          offscreenCtx.fill();

          ctx.globalAlpha = layerAlpha * dim;
          ctx.drawImage(offscreenCanvas, imgX, imgY, imgW, imgH);

          ctx.restore();
        };





        // Render Stage 1: Approach View (Zooming up to 3.5x)
        if ((img1Loaded || img1.complete) && alpha1 > 0) {
          const zoom1 = 1.0 + Math.pow(progress, 1.2) * 3.5;
          drawLayer(img1, alpha1, zoom1);
        }

        // Render Stage 2: Event Horizon View (Zooming up to 5.5x)
        if ((img2Loaded || img2.complete) && alpha2 > 0) {
          const zoom2 = 1.0 + Math.pow(Math.max(0, progress - 0.15), 1.25) * 5.5;
          drawLayer(img2, alpha2, zoom2);
        }

        // Render Stage 3: Singularity Core Dive -> Empty Void (Deep zoom up to 9.5x!)
        if ((img3Loaded || img3.complete) && alpha3 > 0) {
          const zoom3 = 1.0 + Math.pow(Math.max(0, progress - 0.45), 1.35) * 9.5;
          const rot3 = t * 0.12 + (progress - 0.45) * 0.6;
          drawLayer(img3, alpha3, zoom3, rot3);
        }

      }


      // --- 4. Relativistic Singularity Infall Particles ($p > 0.4$) ---
      if (progress > 0.4 && dim > 0.3) {
        ctx.save();
        const maxDist = Math.max(W, H) * 0.6;
        const particleAlpha = Math.min(1, (progress - 0.4) / 0.4) * dim;

        for (const p of infallParticles) {
          p.dist -= p.speed * (1 + progress * 2);
          p.angle += 0.003 * (1 + progress * 2);

          if (p.dist < 0.05) {
            p.dist = Math.random() * 0.4 + 0.5;
            p.angle = Math.random() * Math.PI * 2;
          }

          const currentDist = p.dist * maxDist;
          const tailDist = currentDist + p.length * (1 + progress * 1.5);

          const headX = centerX + Math.cos(p.angle) * currentDist;
          const headY = centerY + Math.sin(p.angle) * currentDist;
          const tailX = centerX + Math.cos(p.angle) * tailDist;
          const tailY = centerY + Math.sin(p.angle) * tailDist;

          const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * particleAlpha})`);
          grad.addColorStop(0.4, `rgba(226, 232, 240, ${p.opacity * particleAlpha * 0.6})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size * (1 + progress * 0.8);
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Singularity Energy Core Glow
        if (progress > 0.65) {
          const coreGlowRadius = (progress - 0.65) * 180;
          const coreGrad = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, coreGlowRadius
          );
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${(progress - 0.65) * 0.4 * dim})`);
          coreGrad.addColorStop(0.5, `rgba(226, 232, 240, ${(progress - 0.65) * 0.2 * dim})`);
          coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(centerX, centerY, coreGlowRadius, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();
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




