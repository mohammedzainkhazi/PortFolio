'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['about', 'projects', 'skills', 'certifications', 'experience', 'contact'];

export function useGsapScrollAnimations() {
  useEffect(() => {
    // Hero entrance — wait for lazy-loaded HeroSection to mount
    const heroTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      gsap.timeline()
        .from('.hero-badge',    { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out', clearProps: 'all' })
        .from('.hero-title',    { opacity: 0, y: 30,  duration: 0.7, ease: 'power3.out', clearProps: 'all' }, '-=0.3')
        .from('.hero-subtitle', { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out', clearProps: 'all' }, '-=0.4')
        .from('.hero-skill',    { opacity: 0, scale: 0.8, stagger: 0.07, duration: 0.4, ease: 'back.out(1.7)', clearProps: 'all' }, '-=0.2')
        .from('.hero-action',   { opacity: 0, y: 15,  stagger: 0.1, duration: 0.5, ease: 'power2.out', clearProps: 'all' }, '-=0.2')
        .from('.hero-image',    { opacity: 0, x: 40,  duration: 0.8, ease: 'power3.out', clearProps: 'all' }, '-=0.8');
    }, 300);

    // Hero image scrub parallax
    gsap.to('.hero-image', {
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5 },
      y: 60,
      ease: 'none',
    });

    // 3D parallax depth layers on the hero text while scrolling
    gsap.to('.hero-title', {
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 },
      y: -40, z: 20, ease: 'none',
    });
    gsap.to('.hero-subtitle', {
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.3 },
      y: -25, z: 10, ease: 'none',
    });

    // Section scroll-in with 3D rise — IntersectionObserver catches lazy-mounted sections
    const observed = new Set<string>();

    const animate = (id: string) => {
      if (observed.has(id)) return;
      const el = document.getElementById(id);
      if (!el) return;
      observed.add(id);

      const children = Array.from(el.children) as HTMLElement[];

      // Set perspective on section so rotateX works
      el.style.perspective = '1000px';

      gsap.from(children, {
        opacity: 0,
        y: 60,
        rotateX: 12,
        transformOrigin: 'top center',
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'all',
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) animate(e.target.id); });
      },
      { threshold: 0.1 }
    );

    const observeAll = () => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(id)) io.observe(el);
      });
    };

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(heroTimer);
      io.disconnect();
      mo.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
