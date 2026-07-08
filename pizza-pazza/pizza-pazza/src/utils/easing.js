// Piccola libreria di funzioni matematiche per guidare le animazioni in modo
// imperativo dentro il callback di scroll di GSAP, senza passare da re-render
// di React (fondamentale per restare a 60fps durante lo scrub).

export const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export const lerp = (start, end, t) => start + (end - start) * t;

/**
 * Converte il progresso globale (0-1) di tutta la sequenza in un progresso
 * locale (0-1) relativo a una finestra [start, end], con clamp ai due estremi.
 * Sotto "start" resta a 0, sopra "end" resta fermo a 1 (lo strato è "atterrato").
 */
export const segmentProgress = (globalProgress, start, end) =>
  clamp((globalProgress - start) / (end - start));

/**
 * Ease elastico in uscita: crea l'effetto "rimbalzo morbido" richiesto per
 * l'atterraggio di ogni strato. t=0 -> 0, t=1 -> 1, con overshoot nel mezzo.
 */
export const easeOutElastic = (t) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

// Ease più contenuto, usato per opacità/blur (non deve "rimbalzare", solo
// dissolvere in modo pulito mentre lo strato cade).
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
