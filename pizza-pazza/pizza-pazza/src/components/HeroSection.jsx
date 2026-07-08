import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection({ ready }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 40, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden bg-forno flex flex-col items-center justify-center text-center px-6"
    >
      {/* Bagliore d'ambra sullo sfondo, come il portello aperto di un forno a legna */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 62%, rgba(232,93,47,0.22), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain-dots bg-grain-size opacity-40" />

      <p className="hero-eyebrow relative font-sans text-[11px] sm:text-xs uppercase tracking-widest2 text-crosta/90 mb-6">
        Lurago D'Erba · Forno a legna dal quartiere
      </p>

      <h1 className="relative font-display italic text-crema leading-[0.95] text-[15vw] sm:text-[9rem] md:text-[10rem]">
        <span className="hero-title-line block">Pizza</span>
        <span className="hero-title-line block text-ember">Pazza</span>
      </h1>

      <p className="hero-sub relative mt-8 max-w-md font-sans text-sm sm:text-base text-crema/60 leading-relaxed">
        Non una pizza qualunque: un impasto che nasce due giorni prima,
        montato strato su strato fino alla follia.
      </p>

      <div className="hero-cue absolute bottom-10 flex flex-col items-center gap-3 text-crema/40">
        <span className="text-[10px] uppercase tracking-widest2">Scorri</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <rect
            x="1"
            y="1"
            width="12"
            height="20"
            rx="6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle className="scroll-dot" cx="7" cy="6" r="1.6" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
