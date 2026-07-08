// Ogni strato ha:
// - src: percorso dell'asset in /public/pizza (l'utente sostituirà questi 5 PNG
//   con i propri, stessi nomi file, stessa prospettiva a 45°)
// - kicker/title/description: il testo che compare a sinistra
// - range: la finestra di progresso globale [start, end] (0-1) in cui lo
//   strato "cade" e atterra. Fuori da questa finestra resta fermo a inizio o fine.
// - suspended: trasformazione 3D quando lo strato è ancora sospeso in aria
// - landed: trasformazione 3D quando lo strato è atterrato sopra i precedenti

export const pizzaLayers = [
  {
    id: "impasto",
    src: "/pizza/pizza1.png",
    kicker: "L'impasto",
    title: "48 ore di lievitazione lenta",
    description:
      "Farina, acqua, lievito madre e tempo. Nessuna scorciatoia: l'impasto riposa due giorni interi prima di toccare il forno a legna.",
    range: [0, 0.001], // già a terra dall'inizio, è la base
    suspended: { y: 0, z: 0, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
    landed: { y: 0, z: 0, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
  },
  {
    id: "pomodoro",
    src: "/pizza/pizza2.png",
    kicker: "Il pomodoro",
    title: "San Marzano, schiacciato a mano",
    description:
      "Solo pomodoro San Marzano DOP, passato al setaccio e steso a mano, strato dopo strato, fino al bordo.",
    range: [0.0, 0.22],
    suspended: { y: -220, z: 70, rotateX: -18, scale: 1.04, opacity: 0.12, blur: 14 },
    landed: { y: 0, z: 2, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
  },
  {
    id: "mozzarella",
    src: "/pizza/pizza3.png",
    kicker: "La mozzarella",
    title: "Fior di latte che cola nel forno",
    description:
      "Fior di latte fresco, tagliato a mano la mattina stessa. A 430°C si scioglie in trenta secondi, non uno di più.",
    range: [0.22, 0.44],
    suspended: { y: -300, z: 100, rotateX: -20, scale: 1.06, opacity: 0.12, blur: 16 },
    landed: { y: 0, z: 4, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
  },
  {
    id: "condimento",
    src: "/pizza/pizza4.png",
    kicker: "Il condimento",
    title: "Würstel e patatine, la nostra follia",
    description:
      "La combinazione che ha reso pazza la pizzeria: würstel affumicato e patatine croccanti, aggiunti prima della cottura.",
    range: [0.44, 0.66],
    suspended: { y: -380, z: 130, rotateX: -22, scale: 1.08, opacity: 0.12, blur: 18 },
    landed: { y: 0, z: 6, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
  },
  {
    id: "finitura",
    src: "/pizza/pizza5.png",
    kicker: "La finitura",
    title: "Olio EVO e fiocchi di sale",
    description:
      "Un filo d'olio extravergine a crudo e una manciata di fiocchi di sale. L'ultimo tocco, quello che si vede prima di ogni morso.",
    range: [0.66, 0.88],
    suspended: { y: -460, z: 160, rotateX: -24, scale: 1.1, opacity: 0.12, blur: 20 },
    landed: { y: 0, z: 8, rotateX: 0, scale: 1, opacity: 1, blur: 0 },
  },
];

// Punto oltre il quale la pizza è "completa" e parte il floating idle.
export const COMPLETION_THRESHOLD = 0.94;

// Quanti "viewport" di scroll dura l'intera sequenza pinnata.
export const SCROLL_LENGTH_VH = 400;
