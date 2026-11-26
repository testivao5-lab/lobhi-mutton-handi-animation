import * as THREE from 'three';
import {box, inked, toon, paintCanvas, addWear, signTexture, contactShadow, PAL} from './ink';

// re-export the shared kit vocabulary for world builders
export {box, contactShadow, PAL};

/*
 * Procedural prop & architecture kit (SKILL D): extruded walls with window
 * reveals + sills, door panels, awnings, cornices, chimneys, market stalls,
 * handi vessels, counters, shelves, sacks. No door opening touches the bottom
 * edge except real doorways framed by a sill/threshold (triangulation safe).
 */

export function groundStrip(w: number, d: number, y = 0, color = PAL.road): THREE.Mesh {
  const g = new THREE.Mesh(new THREE.PlaneGeometry(w, d), toon(color));
  g.rotation.x = -Math.PI / 2;
  g.position.y = y - 0.02;
  g.receiveShadow = true;
  return g;
}

/** Mud/plaza ground with painted puddles + stones. */
export function mudGround(w: number, d: number): THREE.Mesh {
  const tex = paintCanvas(PAL.mud, [512, 512], (ctx) => {
    addWear(ctx, 512, 512, 11, 26);
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = PAL.mudDark;
    for (const [x, y, r] of [[90, 300, 40], [300, 180, 55], [420, 390, 34], [180, 90, 30]] as const) {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(w / 8, d / 8);
  const g = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshToonMaterial({color: '#ffffff', map: tex}),
  );
  g.rotation.x = -Math.PI / 2;
  g.receiveShadow = true;
  return g;
}

/** Street lamp: pole, arm, lamp glass with warm emissive. */
export function lampPost(): THREE.Group {
  const g = new THREE.Group();
  const pole = box(0.16, 4.6, 0.16, PAL.woodDeep, {hull: 0.05, edges: true});
  pole.position.y = 2.3;
  g.add(pole);
  const arm = box(1.0, 0.12, 0.12, PAL.woodDeep, {edges: true});
  arm.position.set(0.45, 4.5, 0);
  g.add(arm);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 12), toon('#ffe9a8', {emissive: '#ffcf6e'}));
  lamp.position.set(0.92, 4.28, 0);
  g.add(inked(lamp, {edges: false}));
  const shadow = contactShadow(0.5);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}

/** Wooden barrel (lathe, procedurally banded). */
export function barrel(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const r = (0.42 + Math.sin(t * Math.PI) * 0.09) * scale;
    pts.push(new THREE.Vector2(r, t * 1.0 * scale));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 14), toon(PAL.wood));
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(inked(body, {hull: 0.045}));
  for (const y of [0.18, 0.5, 0.85]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.5 * scale * (0.94 + Math.sin(y * Math.PI) * 0.07), 0.028, 6, 18), toon('#6e5438'));
    band.rotation.x = Math.PI / 2;
    band.position.y = y * scale;
    g.add(band);
  }
  const shadow = contactShadow(0.55 * scale);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}

export function crate(s = 0.9): THREE.Group {
  const g = new THREE.Group();
  const c = box(s, s * 0.72, s * 0.72, PAL.wood);
  c.position.y = s * 0.36;
  g.add(c);
  const shadow = contactShadow(0.62 * s);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}

/** Awning: striped slanted canopy over a width. */
export function awning(width: number, depth = 1.3, colors: string[] = [PAL.awningRed, PAL.awningCream]): THREE.Group {
  const g = new THREE.Group();
  const n = Math.max(3, Math.round(width / 0.55));
  const seg = width / n;
  for (let i = 0; i < n; i++) {
    const s = box(seg * 1.02, 0.06, depth, colors[i % colors.length], {edges: true});
    s.position.set(-width / 2 + seg * (i + 0.5), 0, depth / 2 - 0.12);
    s.rotation.x = 0.42;
    g.add(s);
  }
  const bar = box(width, 0.08, 0.08, PAL.woodDeep, {edges: true});
  bar.position.set(0, -depth * 0.42 - 0.05, depth - 0.1);
  bar.rotation.x = 0.42;
  g.add(bar);
  return g;
}

/** Market stall: posts + striped awning + counter + goods. */
export function marketStall(w = 3.2, seed = 3, goods: 'fruit' | 'sweets' | 'fish' = 'fruit'): THREE.Group {
  const g = new THREE.Group();
  for (const px of [-w / 2, w / 2]) {
    const post = box(0.13, 2.6, 0.13, PAL.woodDark, {edges: true});
    post.position.set(px, 1.3, -0.15);
    g.add(post);
  }
  const aw = awning(w, 1.5);
  aw.position.y = 2.55;
  g.add(aw);
  const counter = box(w, 0.9, 1.0, PAL.wood, {edges: true});
  counter.position.set(0, 0.45, 0.3);
  g.add(counter);
  // goods clusters
  const rnd = (() => {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  })();
  const goodColors = goods === 'fruit' ? ['#e8862b', '#c6402f', '#8faf3e'] : goods === 'sweets' ? ['#f2c14e', '#e8aa7a', '#d97f45'] : ['#b9c8d6', '#aebecf'];
  for (let i = 0; i < 7; i++) {
    const r = 0.14 + rnd() * 0.07;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), toon(goodColors[i % goodColors.length]));
    ball.position.set(-w / 2 + 0.35 + rnd() * (w - 0.7), 0.95 + rnd() * 0.22, 0.12 + rnd() * 0.35);
    ball.castShadow = true;
    g.add(inked(ball, {edges: false, hull: 0.08}));
  }
  const shadow = contactShadow(w * 0.55);
  shadow.position.y = 0.021;
  g.add(shadow);
  return g;
}

/** Window with reveal + sill + frame (SKILL: real depth openings). */
export function windowUnit(w = 1.1, h = 1.5): THREE.Group {
  const g = new THREE.Group();
  const frame = box(w + 0.22, h + 0.22, 0.18, PAL.woodDark, {edges: true});
  frame.position.y = h / 2;
  g.add(frame);
  // recessed dark glass
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({color: '#4a3421'}));
  glass.position.set(0, h / 2, 0.095);
  g.add(glass);
  // warm glow pane inside glass
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.7, h * 0.5), new THREE.MeshBasicMaterial({color: '#ffdf9e', transparent: true, opacity: 0.35}));
  glow.position.set(0, h * 0.55, 0.1);
  g.add(glow);
  // cross mullions
  const mv = box(0.06, h, 0.05, PAL.woodDeep, {edges: false});
  mv.position.set(0, h / 2, 0.11);
  g.add(mv);
  const mh = box(w, 0.06, 0.05, PAL.woodDeep, {edges: false});
  mh.position.set(0, h / 2, 0.11);
  g.add(mh);
  // sill protruding
  const sill = box(w + 0.4, 0.12, 0.34, PAL.wood, {edges: true});
  sill.position.set(0, -0.08, 0.14);
  g.add(sill);
  return g;
}

/** Panelled door (skillet-safe: framed, not a bottom-edge hole). */
export function doorUnit(w = 1.15, h = 2.3, open = 0): THREE.Group {
  const g = new THREE.Group();
  const frame = box(w + 0.26, h + 0.2, 0.2, PAL.woodDark, {edges: true});
  frame.position.y = h / 2;
  g.add(frame);
  const dark = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({color: '#241712'}));
  dark.position.set(0, h / 2, 0.1);
  g.add(dark);
  // door leaf, optionally swung open
  const leaf = box(w, h - 0.06, 0.09, PAL.brick, {edges: true});
  leaf.geometry.translate(w / 2, 0, 0);
  leaf.position.set(-w / 2, (h - 0.06) / 2 + 0.03, 0.12);
  leaf.rotation.y = open ? -open : 0;
  g.add(leaf);
  // panels on the leaf
  for (const py of [0.62, 1.62]) {
    const p = box(w * 0.62, 0.72, 0.03, PAL.brickDark, {edges: true});
    p.position.set(w / 2, py, 0.075);
    leaf.add(p);
  }
  // handle
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), toon(PAL.brass));
  knob.position.set(w * 0.86, 1.15, 0.09);
  leaf.add(knob);
  // threshold step
  const step = box(w + 0.5, 0.14, 0.5, PAL.wood, {edges: true});
  step.position.set(0, 0.07, 0.28);
  g.add(step);
  return g;
}

/** Cornice strip along the top of a facade. */
export function cornice(width: number): THREE.Mesh {
  const c = box(width, 0.34, 0.42, PAL.plasterOchre, {edges: true});
  return c;
}

/** Chimney with cap. */
export function chimney(): THREE.Group {
  const g = new THREE.Group();
  const body = box(0.6, 1.3, 0.6, PAL.brick, {edges: true});
  body.position.y = 0.65;
  g.add(body);
  const cap = box(0.8, 0.18, 0.8, PAL.brickDark, {edges: true});
  cap.position.y = 1.36;
  g.add(cap);
  return g;
}

/**
 * Facade: extruded wall with door + windows (real reveals), awning, cornice,
 * signboard, optional chimney. Wall thickness = true depth, no cardboard.
 */
export function facade(opts: {
  width: number;
  height: number;
  depth?: number;
  wall: string;
  sign?: {text: string; bg: string; fg: string};
  signWidth?: number;
  windows?: number;
  doorOpen?: number;
  awning?: boolean;
  chimney?: boolean;
  awningColors?: string[];
}): THREE.Group {
  const g = new THREE.Group();
  const d = opts.depth ?? 1.6;
  // main wall slab (extruded)
  const wall = box(opts.width, opts.height, d, opts.wall, {edges: true});
  wall.position.set(0, opts.height / 2, -d / 2);
  g.add(wall);
  // cornice
  const cor = cornice(opts.width + 0.4);
  cor.position.set(0, opts.height + 0.17, -0.1);
  g.add(cor);
  // door at center-right
  const door = doorUnit(1.15, 2.35, opts.doorOpen ?? 0);
  door.position.set(opts.width * 0.22, 0, d / 2 - 0.05);
  g.add(door);
  // windows
  const n = opts.windows ?? 2;
  for (let i = 0; i < n; i++) {
    const wx = -opts.width / 2 + (opts.width / (n + 1)) * (i + 1) - (opts.doorOpen === undefined ? 0 : opts.width * 0.1);
    const win = windowUnit(1.05, 1.4);
    win.position.set(wx, 1.5, d / 2 - 0.05);
    g.add(win);
  }
  // signboard above door/windows
  if (opts.sign) {
    const sw = opts.signWidth ?? Math.min(opts.width * 0.62, 4.6);
    const tex = signTexture(
      [{text: opts.sign.text, size: 92, color: opts.sign.fg}],
      opts.sign.bg,
      [768, 160],
      opts.sign.text.length * 13,
    );
    const board = new THREE.Mesh(new THREE.BoxGeometry(sw, 0.86, 0.16), [
      toon(PAL.woodDeep),
      toon(PAL.woodDeep),
      toon(PAL.woodDeep),
      toon(PAL.woodDeep),
      new THREE.MeshToonMaterial({map: tex}),
      new THREE.MeshToonMaterial({map: tex}),
    ] as unknown as THREE.Material);
    board.position.set(-opts.width * 0.08, opts.height - 0.72, d / 2 + 0.02);
    board.castShadow = true;
    g.add(inked(board, {edges: true, hull: 0.025}));
  }
  // awning over the door zone
  if (opts.awning !== false) {
    const aw = awning(opts.width * 0.5, 1.35, opts.awningColors ?? [PAL.awningRed, PAL.awningCream]);
    aw.position.set(opts.width * 0.2, 2.75, d / 2);
    g.add(aw);
  }
  if (opts.chimney) {
    const ch = chimney();
    ch.position.set(opts.width * 0.3, opts.height + 0.3, -d / 2 + 0.4);
    g.add(ch);
  }
  const shadow = contactShadow(opts.width * 0.5);
  shadow.position.set(0, 0.02, 0.2);
  g.add(shadow);
  return g;
}

/** THE mutton handi vessel — terracotta lathe body, brass lid knob, gloss band. */
export function handi(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const r = (0.55 + Math.sin(t * Math.PI * 0.92) * 0.38 - t * 0.1) * scale;
    pts.push(new THREE.Vector2(Math.max(0.18 * scale, r), t * 0.9 * scale));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 18), toon(PAL.terracotta));
  body.castShadow = true;
  g.add(inked(body, {hull: 0.04}));
  // rim + lid
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.52 * scale, 0.05 * scale, 8, 20), toon(PAL.brickDark));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.9 * scale;
  g.add(rim);
  const lid = new THREE.Mesh(new THREE.SphereGeometry(0.42 * scale, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.6), toon(PAL.brass));
  lid.position.y = 0.92 * scale;
  lid.castShadow = true;
  g.add(inked(lid, {hull: 0.06}));
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.09 * scale, 10, 8), toon(PAL.brassHi));
  knob.position.y = 1.22 * scale;
  g.add(knob);
  // painted gloss wear band
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(0.62 * scale, 0.012 * scale, 6, 20),
    new THREE.MeshBasicMaterial({color: PAL.terracottaHi}),
  );
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.5 * scale;
  g.add(band);
  const shadow = contactShadow(0.62 * scale);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}

export function steelPlate(s = 0.5): THREE.Group {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.CylinderGeometry(s, s * 0.86, 0.07, 16), toon(PAL.steel));
  p.position.y = 0.035;
  g.add(inked(p, {hull: 0.07}));
  return g;
}

export function riceSack(): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    pts.push(new THREE.Vector2(0.42 * (1 - Math.sin(t * Math.PI) * 0.16), t * 1.05));
  }
  const s = new THREE.Mesh(new THREE.LatheGeometry(pts, 12), toon('#d9c39a'));
  s.castShadow = true;
  g.add(inked(s, {hull: 0.05}));
  const tie = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 6, 14), toon(PAL.brick));
  tie.position.y = 1.08;
  tie.rotation.x = Math.PI / 2;
  g.add(tie);
  const shadow = contactShadow(0.55);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}

/** Food counter with glass display — the shop's hero furniture. */
export function foodCounter(w = 3.4): THREE.Group {
  const g = new THREE.Group();
  const body = box(w, 1.02, 0.95, PAL.wood, {edges: true});
  body.position.y = 0.51;
  g.add(body);
  const top = box(w + 0.12, 0.09, 1.08, PAL.woodDeep, {edges: true});
  top.position.y = 1.06;
  g.add(top);
  // glass case (D-007 fix: compact, frame supported by posts at corners)
  const glass = new THREE.Mesh(new THREE.BoxGeometry(w * 0.78, 0.5, 0.78), new THREE.MeshBasicMaterial({color: '#cfe3e8', transparent: true, opacity: 0.26}));
  glass.position.set(0, 1.36, 0);
  g.add(glass);
  const glTop = box(w * 0.84, 0.06, 0.84, PAL.woodDeep, {edges: true});
  glTop.position.set(0, 1.63, 0);
  g.add(glTop);
  for (const px of [-w * 0.39, w * 0.39]) {
    for (const pz of [-0.34, 0.34]) {
      const post = box(0.06, 0.56, 0.06, PAL.woodDeep, {edges: false});
      post.position.set(px, 1.35, pz);
      g.add(post);
    }
  }
  // handis on display (D-007: scaled to the case, not oversize)
  for (const [hx, hs] of [[-w * 0.24, 0.42], [w * 0.06, 0.5], [w * 0.28, 0.38]] as const) {
    const h = handi(hs);
    h.position.set(hx, 1.11, 0);
    g.add(h);
  }
  const shadow = contactShadow(w * 0.55);
  shadow.position.y = 0.02;
  g.add(shadow);
  return g;
}
