import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PizzaCanvas from "./PizzaCanvas";
import StorySteps from "./StorySteps";
import {
  pizzaLayers,
  COMPLETION_THRESHOLD,
  SCROLL_LENGTH_VH,
} from "../data/pizzaLayers";
import {
  segmentProgress,
  easeOutElastic,
  easeOutCubic,
  easeInOutSine,
  lerp,
  clamp,
} from "../utils/easing";

gsap.registerPlugin(ScrollTrigger);

export default function PizzaScrollytelling({ ready }) {
  const sectionRef = useRef(null);
  const stageWrapRef = useRef(null);
  const canvasApiRef = useRef(null);
  const stepsApiRef = useRef(null);
  const outroRef = useRef(null);
  const tickRefs = useRef([]);
  const floatTweenRef = useRef(null);
  const isFloatingRef = useRef(false);

  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const layerEls = canvasApiRef.current?.layers ?? [];
      const groupEl = canvasApiRef.current?.group;
      const stepEls = stepsApiRef.current ?? [];

      // Stato iniziale: strati sospesi in aria, testi tutti smorzati tranne il primo.
      pizzaLayers.forEach((layer, i) => {
        if (!layerEls[i]) return;
        gsap.set(layerEls[i], {
          y: layer.suspended.y,
          z: layer.suspended.z,
          rotateX: layer.suspended.rotateX,
          scale: layer.suspended.scale,
          opacity: layer.suspended.opacity,
          filter: `blur(${layer.suspended.blur}px)`,
        });
      });
      gsap.set(layerEls[0], {
        y: 0,
        z: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      });

      const updateScene = (progress) => {
        // --- 1. Caduta e atterraggio di ciascuno strato ---
        pizzaLayers.forEach((layer, i) => {
          const el = layerEls[i];
          if (!el) return;
          const [start, end] = layer.range;
          const local = segmentProgress(progress, start, end);
          const bounceT = easeOutElastic(local);
          const fadeT = easeOutCubic(local);

          gsap.set(el, {
            y: lerp(layer.suspended.y, layer.landed.y, bounceT),
            z: lerp(layer.suspended.z, layer.landed.z, bounceT),
            rotateX: lerp(layer.suspended.rotateX, layer.landed.rotateX, bounceT),
            scale: lerp(layer.suspended.scale, layer.landed.scale, bounceT),
            opacity: lerp(layer.suspended.opacity, layer.landed.opacity, fadeT),
            filter: `blur(${lerp(layer.suspended.blur, layer.landed.blur, fadeT)}px)`,
          });
        });

        // --- 2. Illuminazione del testo corrispondente ---
        pizzaLayers.forEach((layer, i) => {
          const el = stepEls[i];
          if (!el) return;
          const [start, end] = layer.range;
          const center = (start + end) / 2;
          const halfWidth = (end - start) / 2 + 0.06;
          const dist = Math.abs(progress - center);
          const focus = clamp(1 - dist / (halfWidth * 1.5));
          const eased = easeInOutSine(focus);

          gsap.set(el, {
            opacity: lerp(0.22, 1, eased),
            y: lerp(14, 0, eased),
            letterSpacing: `${lerp(2, 0, eased)}px`,
            filter: `blur(${lerp(2, 0, eased)}px)`,
          });
        });

        // --- 3. Rail dei tick (indicatore ingredienti) ---
        pizzaLayers.forEach((layer, i) => {
          const tick = tickRefs.current[i];
          if (!tick) return;
          const done = progress >= layer.range[1] - 0.001;
          const active = progress >= layer.range[0] && progress <= layer.range[1];
          gsap.set(tick, {
            backgroundColor: done || active ? "#E85D2F" : "rgba(243,233,216,0.18)",
            scale: active ? 1.3 : 1,
          });
        });

        // --- 4. Testo finale ("outro") ---
        if (outroRef.current) {
          const outroT = segmentProgress(progress, 0.9, 1);
          gsap.set(outroRef.current, {
            opacity: outroT,
            y: lerp(16, 0, outroT),
          });
        }

        // --- 5. Floating idle quando la pizza è completa ---
        const isComplete = progress >= COMPLETION_THRESHOLD;
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (isComplete && !isFloatingRef.current && groupEl && !prefersReducedMotion) {
          isFloatingRef.current = true;
          stageWrapRef.current?.classList.add("is-floating");
          floatTweenRef.current = gsap.to(groupEl, {
            rotateY: 7,
            rotateZ: 1.5,
            y: -10,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        } else if (!isComplete && isFloatingRef.current) {
          isFloatingRef.current = false;
          stageWrapRef.current?.classList.remove("is-floating");
          floatTweenRef.current?.kill();
          if (groupEl) gsap.set(groupEl, { rotateY: 0, rotateZ: 0, y: 0 });
        }
      };

      // Stato iniziale coerente prima di qualsiasi scroll
      updateScene(0);

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => updateScene(self.progress),
      });

      return () => {
        floatTweenRef.current?.kill();
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-forno"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row">
        {/* Colonna sinistra — storytelling testuale */}
        <div className="relative order-2 md:order-1 w-full md:w-1/2 h-1/2 md:h-full flex items-center px-8 sm:px-12 md:px-16 lg:px-24">
          <StorySteps ref={stepsApiRef} />

          <div
            ref={outroRef}
            className="story-step absolute inset-x-8 sm:inset-x-12 md:inset-x-16 lg:inset-x-24 bottom-10 md:bottom-16 opacity-0"
          >
            <span className="font-sans text-[11px] uppercase tracking-widest2 text-ember">
              Pizza Pazza
            </span>
            <p className="font-display italic text-2xl sm:text-3xl text-crema mt-2">
              La vera follia? Assaggiarla.
            </p>
          </div>

          {/* Rail verticale con un tick per ingrediente */}
          <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2">
            {pizzaLayers.map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => (tickRefs.current[i] = el)}
                className="w-1.5 h-1.5 rounded-full bg-crema/20"
              />
            ))}
          </div>
        </div>

        {/* Colonna destra — stage 2.5D della pizza */}
        <div
          ref={stageWrapRef}
          className="pizza-stage relative order-1 md:order-2 w-full md:w-1/2 h-1/2 md:h-full"
        >
          <PizzaCanvas ref={canvasApiRef} />
        </div>
      </div>
    </section>
  );
}
