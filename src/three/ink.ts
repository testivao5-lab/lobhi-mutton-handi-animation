import * as THREE from 'three';

/*
 * Ink & Toon style engine (SKILL.md house style).
 - One ink colour #351f22 for every outline (inverted hull + edge lines)
 - 3-band toon shading, warm key light upper-left, hemisphere fill
 - Per-location fog, painted flat colours with procedural wear
 * All procedural — zero external assets (STRICT no-AI-image rule).
 */

export const INK = '#351f22';

/** Palette — village Bengal, warm golden hour base (ART_DIRECTION_BIBLE) */
export const PAL = {
  plasterCream: '#f3e4c8',
  plasterOchre: '#e2c188',
  plasterRose: '#dfa081',
  plasterSage: '#b9c69a',
  wood: '#a8743e',
  woodDark: '#7a4a26',
  woodDeep: '#5e3a18',
  brick: '#b5562d',
  brickDark: '#8a3e1e',
  roofTile: '#c67b3c',
  roofTileDark: '#a35e2a',
  awningRed: '#c6402f',
  awningCream: '#f3e4c8',
  road: '#c09058',
  roadDark: '#a87848',
  mud: '#d9b478',
  mudDark: '#c4a062',
  brass: '#caa53d',
  brassHi: '#e3c458',
  terracotta: '#b5562d',
  terracottaHi: '#d97f45',
  steel: '#b9c2cc',
  green: '#8faf3e',
  sky: '#ffe0a8',
  skyFogMarket: '#f7c268',
  skyFogShop: '#e8d3ae',
  skin: '#f2c89b',
  skinShade: '#d9a06c',
};

/** 3-band gradient map for MeshToonMaterial (SKILL: three-band gradient) */
export function makeGradientMap(): THREE.DataTexture {
  const bands = new Uint8Array([90, 180, 255]); // shadow / mid / lit
  const tex = new THREE.DataTexture(bands, bands.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

let gradientMap: THREE.DataTexture | null = null;

/** Toon material with ink-consistent flat colour. */
export function toon(color: string, opts?: {emissive?: string}): THREE.MeshToonMaterial {
  if (!gradientMap) gradientMap = makeGradientMap();
  const m = new THREE.MeshToonMaterial({color: new THREE.Color(color)});
  m.gradientMap = gradientMap;
  if (opts?.emissive) m.emissive = new THREE.Color(opts.emissive);
  return m;
}

const inkMat = () => new THREE.MeshBasicMaterial({color: new THREE.Color(INK), side: THREE.BackSide});

/** Inverted-hull ink outline around any geometry (SKILL outline technique 1). */
export function withHull(mesh: THREE.Mesh, thickness = 0.035): THREE.Mesh {
  const hull = new THREE.Mesh(mesh.geometry, inkMat());
  hull.scale.setScalar(1 + thickness);
  mesh.add(hull);
  return mesh;
}

/** Edge lines for crisp box edges (SKILL outline technique 2). */
export function withEdges(mesh: THREE.Mesh, opacity = 0.55): THREE.LineSegments {
  const edges = new THREE.EdgesGeometry(mesh.geometry, 28);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({color: new THREE.Color(INK), transparent: true, opacity}),
  );
  mesh.add(line);
  return line;
}

export function inked(mesh: THREE.Mesh, opts?: {hull?: number; edges?: boolean}): THREE.Mesh {
  withHull(mesh, opts?.hull ?? 0.035);
  if (opts?.edges !== false) withEdges(mesh);
  return mesh;
}

export function box(
  w: number,
  h: number,
  d: number,
  color: string,
  opts?: {hull?: number; edges?: boolean},
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), toon(color));
  m.castShadow = true;
  m.receiveShadow = true;
  return inked(m, opts);
}

/** Painted flat-colour canvas texture with procedural wear (stains/chips/scratches). */
export function paintCanvas(
  base: string,
  size: [number, number],
  paint: (ctx: CanvasRenderingContext2D) => void,
): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = size[0];
  c.height = size[1];
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size[0], size[1]);
  paint(ctx);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Deterministic pseudo-random (no Math.random — frame/determinism safe). */
export function srand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Wear layer: stains, chips, scratches on any painted surface. */
export function addWear(ctx: CanvasRenderingContext2D, w: number, h: number, seed: number, amount = 14): void {
  const rnd = srand(seed);
  for (let i = 0; i < amount; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = 4 + rnd() * 22;
    ctx.globalAlpha = 0.05 + rnd() * 0.09;
    ctx.fillStyle = rnd() > 0.5 ? '#8a6a48' : '#fff6e0';
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.4 + rnd() * 0.6), rnd() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  for (let i = 0; i < amount * 2; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    ctx.globalAlpha = 0.06 + rnd() * 0.08;
    ctx.strokeStyle = rnd() > 0.6 ? '#6e4a28' : '#fff2d8';
    ctx.lineWidth = 1 + rnd() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rnd() - 0.5) * 60, y + (rnd() - 0.5) * 26);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

/** In-world signboard texture (Bengali) — labels live inside the world, never floating. */
export function signTexture(
  lines: {text: string; size: number; color: string; font?: string}[],
  bg: string,
  px: [number, number],
  seed = 7,
): THREE.CanvasTexture {
  return paintCanvas(bg, px, (ctx) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lh = px[1] / (lines.length + 0.6);
    lines.forEach((l, i) => {
      ctx.font = `700 ${l.size}px ${l.font ?? "'Noto Sans Bengali', 'Hind Siliguri', sans-serif"}`;
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, px[0] / 2, lh * (i + 0.9), px[0] * 0.86);
    });
    // frame + wear
    ctx.strokeStyle = INK;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, px[0] - 6, px[1] - 6);
    addWear(ctx, px[0], px[1], seed, 8);
  });
}

/** House lighting rig: warm key upper-left + hemisphere fill (SKILL). */
export function lightingRig(scene: THREE.Scene, opts: {fog: string; near: number; far: number; keyIntensity?: number}) {
  scene.fog = new THREE.Fog(opts.fog, opts.near, opts.far);
  const key = new THREE.DirectionalLight(0xffe2b0, opts.keyIntensity ?? 1.5);
  key.position.set(-14, 22, 10); // upper-left
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 90;
  key.shadow.camera.left = -34;
  key.shadow.camera.right = 34;
  key.shadow.camera.top = 30;
  key.shadow.camera.bottom = -10;
  key.shadow.bias = -0.0008;
  scene.add(key);
  const hemi = new THREE.HemisphereLight(0xfff2d8, 0xb98a54, 0.85);
  scene.add(hemi);
  const bounce = new THREE.DirectionalLight(0xffd9a0, 0.35);
  bounce.position.set(8, 6, -12);
  scene.add(bounce);
  return {key, hemi, bounce};
}

/** Soft contact-shadow blob under characters/props. */
export function contactShadow(r = 0.55): THREE.Mesh {
  const tex = paintCanvas('rgba(0,0,0,1)', [128, 128], (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
    g.addColorStop(0, 'rgba(30,15,8,0.55)');
    g.addColorStop(1, 'rgba(30,15,8,0)');
    ctx.clearRect(0, 0, 128, 128);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  });
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(r * 2, r * 2),
    new THREE.MeshBasicMaterial({map: tex, transparent: true, depthWrite: false}),
  );
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 1;
  return m;
}

/** Monotone cubic time-warp (SKILL E): zero-speed at first/last key, no straight blending. */
export function warpU(T: number[], t: number): number {
  const n = T.length;
  if (t <= T[0]) return 0;
  if (t >= T[n - 1]) return 1;
  const sec: number[] = [];
  for (let i = 0; i < n - 1; i++) sec.push(1 / (n - 1) / (T[i + 1] - T[i]));
  const m: number[] = [0];
  for (let i = 1; i < n - 1; i++) m.push((2 * sec[i - 1] * sec[i]) / (sec[i - 1] + sec[i]));
  m.push(0);
  let i = 0;
  while (t > T[i + 1]) i++;
  const h = T[i + 1] - T[i];
  const x = (t - T[i]) / h;
  const x2 = x * x;
  const x3 = x2 * x;
  return (
    (2 * x3 - 3 * x2 + 1) * (i / (n - 1)) +
    (x3 - 2 * x2 + x) * h * m[i] +
    (-2 * x3 + 3 * x2) * ((i + 1) / (n - 1)) +
    (x3 - x2) * h * m[i + 1]
  );
}

/** Project a 3D ground point to normalized screen coords [-1..1] via a camera. */
export function project(camera: THREE.Camera, p: THREE.Vector3): {x: number; y: number; dist: number} {
  const v = p.clone().project(camera);
  return {x: v.x, y: v.y, dist: camera.position.distanceTo(p)};
}
