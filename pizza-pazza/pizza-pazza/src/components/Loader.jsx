import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ progress, loaded, onExited }) {
  const rootRef = useRef(null);
  const pctRef = useRef(null);

  useLayoutEffect(() => {
    if (pctRef.current) {
      pctRef.current.textContent = `${Math.round(progress * 100)}`;
    }
  }, [progress]);

  useLayoutEffect(() => {
    if (!loaded || !rootRef.current) return;
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => onExited?.(),
    });
    tl.to(rootRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    }).set(rootRef.current, { display: "none" });
  }, [loaded, onExited]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forno text-crema"
      aria-hidden={loaded}
    >
      <div className="font-display italic text-2xl tracking-wide mb-6 text-crosta">
        Pizza Pazza
      </div>
      <div className="flex items-baseline gap-1 font-sans">
        <span ref={pctRef} className="text-5xl font-semibold tabular-nums">
          0
        </span>
        <span className="text-lg text-crema/50">%</span>
      </div>
      <div className="mt-6 h-px w-40 bg-crema/10 overflow-hidden">
        <div
          className="h-full bg-ember transition-[width] duration-200 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="mt-6 text-xs uppercase tracking-widest2 text-crema/40">
        stiamo scaldando il forno
      </p>
    </div>
  );
}
