# Pizza Pazza — Scrollytelling 3D/2.5D

Sito "product launch" per Pizza Pazza: una pizza artigianale che si compone
strato su strato mentre si scorre la pagina.

## Avvio rapido

```bash
npm install
npm run dev       # sviluppo, http://localhost:5173
npm run build     # build di produzione in /dist
npm run preview   # anteprima della build di produzione
```

## Sostituire gli asset reali

I 5 layer placeholder generati per la demo si trovano in `public/pizza/`.
Basta sovrascriverli con i tuoi PNG ad alta risoluzione, **stessi nomi file**:

```
public/pizza/pizza1.png   → impasto
public/pizza/pizza2.png   → salsa di pomodoro
public/pizza/pizza3.png   → mozzarella
public/pizza/pizza4.png   → würstel e patatine
public/pizza/pizza5.png   → finitura (olio, sale)
```

Non serve toccare il codice: essendo referenziati da `public/`, non passano
dalla pipeline di build/import di Vite, quindi la sostituzione è immediata
anche dopo il deploy.

## Struttura dei componenti

Vedi la spiegazione dettagliata nella risposta della chat. In breve:

- `App.jsx` — precarica gli asset, mostra il Loader, monta le 3 sezioni
- `components/Loader.jsx` — schermata di caricamento con percentuale
- `components/HeroSection.jsx` — apertura a schermo intero
- `components/PizzaScrollytelling.jsx` — la sezione sticky, cuore del sito
- `components/PizzaCanvas.jsx` — lo stage 2.5D con i 5 layer impilati
- `components/StorySteps.jsx` / `StoryStep.jsx` — il testo a sinistra
- `components/CTASection.jsx` — sezione finale con il bottone di chiamata
- `data/pizzaLayers.js` — unica fonte di verità: copy, range di scroll, transform 3D
- `utils/easing.js` — funzioni di math/easing (incluso il rimbalzo elastico)
- `hooks/usePreloadImages.js` — preload dei 5 PNG prima di rivelare il sito

## Stack

React 19 + Vite, Tailwind CSS 3, GSAP 3 + ScrollTrigger. Nessuna dipendenza 3D
(three.js/R3F) perché i 5 asset hanno già la prospettiva "bruciata" nel PNG:
il 2.5D via CSS transform (`perspective`, `translateZ`, `rotateX`) restituisce
lo stesso effetto "esploso" con un frame budget molto più basso.
