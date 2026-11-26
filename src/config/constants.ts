// Global production constants — see docs/style-guide.md for the full bible.

export const FPS = 24;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Bengali display font family (loaded via @remotion/google-fonts). */
export const FONT_STACK = "'Noto Sans Bengali', sans-serif";

/** Act-based color moods from the art direction (storyboard §1.2). */
export const PALETTE = {
  market: {primary: '#8a5a2b', secondary: '#c8a44a', green: '#5e7d4a'},
  shopOriginal: {primary: '#b5562d', accent: '#e8933f', dark: '#4a2c1a'},
  house: {primary: '#d9c3a3', accent: '#8a5a2b', amber: '#c97f2a'},
  fraudKitchen: {primary: '#7a2e22', secondary: '#6b4a35'},
  fatik: {primary: '#2e4a34', charcoal: '#33342f', maroon: '#6b2230'},
  ceremony: {primary: '#d9a527', cream: '#f3e8cf', red: '#a92e2a'},
  scandal: {primary: '#7d7d78', brown: '#6b5b4a'},
  police: {primary: '#4a5f7d', grey: '#8a9099'},
  redemption: {primary: '#5e8a4a', yellow: '#e3c458'},
} as const;

export const toFrames = (seconds: number): number => Math.round(seconds * FPS);
