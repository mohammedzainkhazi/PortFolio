'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['about', 'projects', 'skills', 'certifications', 'experience', 'contact'];

export function useGsapScrollAnimations() {
  useEffect(() => {
    // Hero entrance sequence
    const heroTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      gsap.timeline()
        .from('.hero-badge',    { opacity: 0, y: -15, duration: 0.5, ease: 'power3.out', clearProps: 'all' })
        .from('.hero-title',    { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out', clearProps: 'all' }, '-=0.2')
        .from('.hero-subtitle', { opacity: 0, y: 15,  duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.3')
        .from('.hero-skill',    { opacity: 0, scale: 0.85, stagger: 0.05, duration: 0.35, ease: 'back.out(1.5)', clearProps: 'all' }, '-=0.2')
        .from('.hero-action',   { opacity: 0, y: 10,  stagger: 0.08, duration: 0.4, ease: 'power2.out', clearProps: 'all' }, '-=0.2')
        .from('.hero-image',    { opacity: 0, x: 30,  duration: 0.6, ease: 'power3.out', clearProps: 'all' }, '-=0.6');
    }, 200);

    // Lightweight Section scroll-in via IntersectionObserver (zero scroll thrashing)
    const observed = new Set<string>();

    const animate = (id: string) => {
      if (observed.has(id)) return;
      const el = document.getElementById(id);
      if (!el) return;
      observed.add(id);

      const children = Array.from(el.children) as HTMLElement[];
      gsap.from(children, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target.id);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      clearTimeout(heroTimer);
      io.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

