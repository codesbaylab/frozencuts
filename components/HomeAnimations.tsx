"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(".fade-up", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 })
        .from(".fade-in-scale", { scale: 0.95, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.6")
        .from(".floating-card", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.8");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
