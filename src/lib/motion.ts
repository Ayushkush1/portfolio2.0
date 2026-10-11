// Shared motion settings — every section pulls easing, timing and reveal behaviour from here
// so the whole site moves with one consistent rhythm.

type Bezier = [number, number, number, number];

export const EASE: { out: Bezier; in: Bezier; inOut: Bezier } = {
  out: [0.16, 1, 0.3, 1], // fast start, long soft landing — entrances
  in: [0.4, 0, 1, 1], // quick exit
  inOut: [0.65, 0, 0.35, 1], // state changes
};

export const DURATION = {
  fast: 0.3, // hovers, small UI state
  base: 0.7, // text & element reveals
  slow: 1.1, // headline mask reveals, large surfaces
};

export const STAGGER = 0.08;

// Reveal once, when a third of the element is on screen
export const VIEWPORT = { once: true, amount: 0.3 } as const;

// Standard on-scroll entrance for body copy, buttons and small blocks
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.base, ease: EASE.out, delay },
});

// Fade only — for large decorative elements where movement would distract
export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEWPORT,
  transition: { duration: DURATION.slow, ease: EASE.out, delay },
});
