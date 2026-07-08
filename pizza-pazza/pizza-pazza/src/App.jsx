import { useMemo, useState } from "react";
import Loader from "./components/Loader";
import HeroSection from "./components/HeroSection";
import PizzaScrollytelling from "./components/PizzaScrollytelling";
import CTASection from "./components/CTASection";
import { pizzaLayers } from "./data/pizzaLayers";
import { usePreloadImages } from "./hooks/usePreloadImages";

export default function App() {
  const sources = useMemo(() => pizzaLayers.map((l) => l.src), []);
  const { progress, loaded } = usePreloadImages(sources);
  const [loaderExited, setLoaderExited] = useState(false);

  return (
    <div className="relative bg-forno">
      {!loaderExited && (
        <Loader
          progress={progress}
          loaded={loaded}
          onExited={() => setLoaderExited(true)}
        />
      )}
      <HeroSection ready={loaded} />
      <PizzaScrollytelling ready={loaded} />
      <CTASection ready={loaded} />
    </div>
  );
}
