import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection({ ready }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-reveal",
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={rootRef}
      className="relative bg-forno min-h-screen w-full flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 20%, rgba(232,93,47,0.16), transparent 70%)",
        }}
      />

      <p className="cta-reveal font-sans text-[11px] uppercase tracking-widest2 text-crosta mb-6">
        La pizza è pronta. Manca solo tu.
      </p>

      <h2 className="cta-reveal font-display italic text-crema text-4xl sm:text-6xl md:text-7xl leading-[1.05] max-w-3xl mb-12">
        Ordina la tua Pizza Pazza
      </h2>

      <a
        href="tel:+390316998829"
        className="cta-reveal cta-button group relative inline-flex items-center gap-4 rounded-full bg-ember px-10 py-6 sm:px-14 sm:py-8 font-sans text-lg sm:text-2xl font-semibold text-forno overflow-hidden"
      >
        <span className="relative z-10">Chiama ora · 031 699829</span>
        <svg
          className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="cta-shine absolute inset-0" />
      </a>

      <div className="cta-reveal mt-14 flex flex-col items-center gap-2 font-sans text-sm text-crema/50">
        <span>Via Dante Alighieri, 12 — Lurago D'Erba (CO)</span>
        <span className="text-crema/30">Aperti dal martedì alla domenica, dalle 18:30</span>
      </div>

      <footer className="cta-reveal mt-24 font-sans text-[11px] uppercase tracking-widest2 text-crema/25">
        © {new Date().getFullYear()} Pizza Pazza — Forno a legna artigianale
      </footer>
    </section>
  );
}
