import { useEffect, useRef, useState } from "react";

/**
 * Precarica una lista di immagini e riporta lo stato di avanzamento.
 * Il sito resta coperto dal Loader finché loaded non è true, così il primo
 * frame di scroll trova già tutti gli asset decodificati in cache.
 */
export function usePreloadImages(sources) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    loadedCountRef.current = 0;
    setProgress(0);
    setLoaded(false);

    if (!sources || sources.length === 0) {
      setLoaded(true);
      setProgress(1);
      return;
    }

    const handleOne = () => {
      if (cancelled) return;
      loadedCountRef.current += 1;
      const pct = loadedCountRef.current / sources.length;
      setProgress(pct);
      if (loadedCountRef.current >= sources.length) {
        setLoaded(true);
      }
    };

    const images = sources.map((src) => {
      const img = new Image();
      img.onload = handleOne;
      // Anche in caso di errore (es. asset non ancora sostituito) non blocchiamo
      // il caricamento del sito: contiamo comunque l'asset come "gestito".
      img.onerror = handleOne;
      img.src = src;
      return img;
    });

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [sources]);

  return { progress, loaded };
}
