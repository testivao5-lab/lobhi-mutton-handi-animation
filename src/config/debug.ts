/*
 * Production safeguard (V6 Control Brief §8):
 * Debug overlays are ONLY rendered when DEBUG_MODE is true.
 * Production compositions must never show technical labels.
 * A render containing debug overlays in production mode = automatic rejection.
 */
export const DEBUG_MODE = false;
