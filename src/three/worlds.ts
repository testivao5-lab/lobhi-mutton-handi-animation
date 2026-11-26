import * as THREE from 'three';
import {box, facade, groundStrip, lampPost, barrel, crate, marketStall, foodCounter, riceSack, mudGround, handi, PAL, contactShadow} from './kit';
import {lightingRig} from './ink';
import {CAST, CharConfig} from '../components/characters/Char2D';
import {CharAnchor, World} from './Stage';

/*
 * Procedural village world (SKILL D): locations at different x offsets in one
 * scene so the camera can travel; per-zone light/fog handled by scene fog.
 * B01 market street + B02 mutton handi restaurant (special attention).
 */

export interface VillageOpts {
  restaurantSign: string;
  seeds?: number;
}

export function buildVillage(opts: VillageOpts): World {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAL.sky);
  const camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 220);

  lightingRig(scene, {fog: PAL.skyFogMarket, near: 26, far: 88});

  // ---- ground ----
  const ground = mudGround(140, 30);
  scene.add(ground);
  const road = groundStrip(140, 7.5, 0.005, PAL.road);
  road.position.z = 2.6;
  scene.add(road);

  // ---- far background building row (soft, fog-shrouded) ----
  const farSpecs = [
    {x: -16, w: 7.5, h: 5.2, c: PAL.plasterOchre},
    {x: -6, w: 6.2, h: 6.0, c: PAL.plasterRose},
    {x: 3, w: 8.0, h: 4.6, c: PAL.plasterSage},
    {x: 13, w: 6.6, h: 5.8, c: PAL.plasterCream},
    {x: 22, w: 7.4, h: 5.0, c: PAL.plasterOchre},
  ];
  for (const f of farSpecs) {
    const b = box(f.w, f.h, 2.4, f.c, {edges: true});
    b.position.set(f.x, f.h / 2, -12.5);
    scene.add(b);
    const roof = box(f.w + 0.5, 0.5, 2.9, PAL.roofTileDark, {edges: true});
    roof.position.set(f.x, f.h + 0.25, -12.5);
    scene.add(roof);
    for (let i = 0; i < 2; i++) {
      const win = box(0.9, 1.2, 0.1, '#6e4a28', {edges: false});
      win.position.set(f.x - f.w / 4 + i * (f.w / 2), f.h * 0.58, -11.25);
      scene.add(win);
    }
  }

  // ---- market zone (B01) ----
  const stallA = marketStall(3.4, 5, 'fruit');
  stallA.position.set(-14.5, 0, -2.1);
  scene.add(stallA);
  const stallB = marketStall(3.0, 9, 'fish');
  stallB.position.set(-7.5, 0, -2.3);
  scene.add(stallB);
  const stallC = marketStall(3.2, 13, 'sweets');
  stallC.position.set(-0.5, 0, -2.2);
  scene.add(stallC);
  // stall awning wall behind stalls for depth
  const backWall = box(26, 3.2, 1.2, PAL.plasterOchre, {edges: true});
  backWall.position.set(-7.5, 1.6, -6.4);
  scene.add(backWall);
  const bwRoof = box(26.6, 0.4, 1.7, PAL.roofTileDark, {edges: true});
  bwRoof.position.set(-7.5, 3.4, -6.4);
  scene.add(bwRoof);

  const lamp1 = lampPost();
  lamp1.position.set(-11.2, 0, 1.2);
  scene.add(lamp1);
  const lamp2 = lampPost();
  lamp2.position.set(3.4, 0, 1.4);
  scene.add(lamp2);
  const lamp3 = lampPost();
  lamp3.position.set(16.4, 0, 1.0);
  scene.add(lamp3);

  const bar1 = barrel(1.0);
  bar1.position.set(-12.6, 0, -1.0);
  scene.add(bar1);
  const bar2 = barrel(0.82);
  bar2.position.set(-12.0, 0, -1.6);
  scene.add(bar2);
  const cr1 = crate(1.0);
  cr1.position.set(-9.8, 0, 0.4);
  scene.add(cr1);
  const cr2 = crate(0.8);
  cr2.position.set(-9.0, 0, 0.9);
  cr2.rotation.y = 0.5;
  scene.add(cr2);
  const sack1 = riceSack();
  sack1.position.set(1.8, 0, -1.2);
  scene.add(sack1);
  const sack2 = riceSack();
  sack2.position.set(2.5, 0, -1.5);
  sack2.rotation.y = 0.7;
  scene.add(sack2);

  // ---- THE mutton handi restaurant (B02, special attention) ----
  const rest = facade({
    width: 11,
    height: 6.2,
    depth: 2.2,
    wall: PAL.plasterCream,
    sign: {text: opts.restaurantSign, bg: '#7a4a26', fg: '#f3e4c8'},
    signWidth: 6.4,
    windows: 2,
    doorOpen: 0.5,
    awning: true,
    chimney: true,
  });
  rest.position.set(9.5, 0, -1.1);
  scene.add(rest);
  // interior hint through open door: warm glow plane
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 2.2),
    new THREE.MeshBasicMaterial({color: '#ffcf6e', transparent: true, opacity: 0.5}),
  );
  glow.position.set(9.5 + 9.5 * 0.22 * 0 + 2.4, 1.15, -0.6);
  glow.rotation.y = Math.PI / 2;
  scene.add(glow);
  // restaurant side display counter with handis (street facing)
  const counter = foodCounter(3.2);
  counter.position.set(13.9, 0, 0.4);
  counter.rotation.y = -0.28;
  scene.add(counter);
  // big cooking handi beside entrance (steaming hero prop)
  const heroHandi = handi(1.15);
  heroHandi.position.set(15.4, 0, 1.0);
  scene.add(heroHandi);

  // ---- characters (2D anchors) ----
  const mkChar = (cfg: CharConfig, pos: THREE.Vector3, height = 1.68): CharAnchor => {
    const obj = new THREE.Object3D();
    obj.position.copy(pos);
    scene.add(obj);
    const shadow = contactShadow(0.5);
    shadow.position.set(pos.x, 0.03, pos.z);
    scene.add(shadow);
    return {id: cfg.id, cfg, obj, height, expression: 'neutral'};
  };

  const chars: CharAnchor[] = [];
  chars.push(mkChar(CAST.bolai, new THREE.Vector3(-9.5, 0, 1.6), 1.74));
  chars.push(mkChar(CAST.champa, new THREE.Vector3(-6.6, 0, -0.9), 1.62));
  chars.push(mkChar(CAST.fatik, new THREE.Vector3(13.0, 0, 0.1), 1.68));

  // bolt champa + fatik shadows to their owners (bolai's moves)
  // (champa/fatik stay static; only bolai's anchor + shadow move in tick)

  const bolaiShadow = (chars[0] as CharAnchor & {shadow?: THREE.Mesh});
  (bolaiShadow as unknown as {shadow: THREE.Mesh}).shadow = (chars[0].obj as unknown as {_shadow?: THREE.Mesh})._shadow as THREE.Mesh;

  const camPath = {
    pos: [new THREE.Vector3(-17.5, 2.7, 9.5), new THREE.Vector3(-6.5, 2.5, 8.2), new THREE.Vector3(4.2, 3.6, 8.0), new THREE.Vector3(11.6, 2.7, 6.4), new THREE.Vector3(12.4, 2.35, 5.0)],
    look: [new THREE.Vector3(-12.5, 1.5, -1.0), new THREE.Vector3(-3.5, 1.6, -1.2), new THREE.Vector3(6.5, 2.0, -1.0), new THREE.Vector3(12.2, 1.8, 0.2), new THREE.Vector3(12.0, 1.55, 0.4)],
  };
  const beats = [0, 0.33, 0.62, 0.85, 1];

  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();

  const samplePath = (u: number, arr: THREE.Vector3[], out: THREE.Vector3): void => {
    const n = arr.length - 1;
    const x = u * n;
    const i = Math.min(n - 1, Math.floor(x));
    const t = x - i;
    out.copy(arr[i]).lerp(arr[i + 1], t);
  };

  const lookTarget = (f: number): THREE.Vector3 => {
    const u = f / 287;
    samplePath(u, camPath.look, tmpLook);
    return tmpLook.clone();
  };

  const tick = (f: number): void => {
    const u = f / 287;
    samplePath(u, camPath.pos, tmpPos);
    camera.position.copy(tmpPos);
    samplePath(u, camPath.look, tmpLook);
    camera.lookAt(tmpLook);

    // Bolai walks the market street, then stands proud at the restaurant counter
    const walkEnd = 0.62;
    if (u <= walkEnd) {
      const t = Math.min(1, u / walkEnd);
      const eased = t * t * (3 - 2 * t);
      chars[0].obj.position.set(-9.5 + eased * 20.0, 0, 1.6 - eased * 0.9);
    } else {
      chars[0].obj.position.set(10.5, 0, 0.7);
    }
    const sh = (chars[0].obj as unknown as {_shadow?: THREE.Mesh})._shadow;
    if (sh) sh.position.set(chars[0].obj.position.x, 0.03, chars[0].obj.position.z);
  };

  // stash shadow ref
  const bShadow = contactShadow(0.5);
  bShadow.position.set(-9.5, 0.03, 1.6);
  scene.add(bShadow);
  (chars[0].obj as unknown as {_shadow?: THREE.Mesh})._shadow = bShadow;

  return {scene, camera, tick, chars, lookTarget};
}
