import { forwardRef } from "react";

const StoryStep = forwardRef(function StoryStep(
  { kicker, title, description },
  ref
) {
  return (
    <div ref={ref} className="story-step absolute inset-0 flex flex-col justify-center opacity-30">
      <span className="font-sans text-[11px] uppercase tracking-widest2 text-ember mb-4">
        {kicker}
      </span>
      <h3 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-crema leading-[1.05] mb-5">
        {title}
      </h3>
      <p className="font-sans text-sm sm:text-base text-crema/60 leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  );
});

export default StoryStep;
