import { forwardRef, useImperativeHandle, useRef } from "react";
import StoryStep from "./StoryStep";
import { pizzaLayers } from "../data/pizzaLayers";

const StorySteps = forwardRef(function StorySteps(_props, ref) {
  const stepRefs = useRef([]);

  useImperativeHandle(ref, () => stepRefs.current);

  return (
    <div className="relative w-full h-full max-w-md">
      {pizzaLayers.map((layer, i) => (
        <StoryStep
          key={layer.id}
          ref={(el) => (stepRefs.current[i] = el)}
          kicker={layer.kicker}
          title={layer.title}
          description={layer.description}
        />
      ))}
    </div>
  );
});

export default StorySteps;
