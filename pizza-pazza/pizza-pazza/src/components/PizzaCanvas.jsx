import { forwardRef, useImperativeHandle, useRef } from "react";
import { pizzaLayers } from "../data/pizzaLayers";

/**
 * Non gestisce da sé le trasformazioni: espone semplicemente i ref dei layer
 * e del gruppo al genitore (PizzaScrollytelling), che li anima in modo
 * imperativo dentro il callback di ScrollTrigger. Questo evita che ogni pixel
 * di scroll causi un re-render React: fondamentale per restare a 60fps.
 */
const PizzaCanvas = forwardRef(function PizzaCanvas(_props, ref) {
  const groupRef = useRef(null);
  const layerRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    group: groupRef.current,
    layers: layerRefs.current,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center [perspective:1600px]">
      {/* Bagliore caldo dietro la pizza: suggerisce calore/forno e lucentezza olio */}
      <div
        className="pizza-glow pointer-events-none absolute w-[70%] aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,93,47,0.35) 0%, rgba(232,93,47,0) 70%)",
          filter: "blur(10px)",
        }}
      />

      <div
        ref={groupRef}
        className="relative w-[min(72vw,42vh,340px)] md:w-[min(34vw,64vh,560px)] aspect-square [transform-style:preserve-3d] will-change-transform"
      >
        {pizzaLayers.map((layer, i) => (
          <img
            key={layer.id}
            ref={(el) => (layerRefs.current[i] = el)}
            src={layer.src}
            alt={layer.title}
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain select-none will-change-transform"
            style={{ zIndex: i + 1 }}
          />
        ))}
      </div>
    </div>
  );
});

export default PizzaCanvas;
