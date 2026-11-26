import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {BokehPass} from 'three/examples/jsm/postprocessing/BokehPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';
import {CharConfig, Char2D, Expression} from '../components/characters/Char2D';

/*
 * Stage — hosts the deterministic three.js world driven by the Remotion frame.
 * Post-processing composer (render + bokeh DOF + output) runs once per frame.
 * 2D characters are projected from 3D anchors to screen space every frame
 * (correct perspective + scale per ADDENDUM 3), drawn as SVG on top.
 * All state is set from useCurrentFrame() — no accumulated real-time state.
 */

export interface CharAnchor {
  id: string;
  cfg: CharConfig;
  obj: THREE.Object3D;
  height: number; // metres, feet->head top
  expression: Expression | ((f: number) => Expression);
  talking?: (f: number) => boolean;
  walking?: (f: number) => boolean;
  walkPhase?: (f: number) => number;
}

export interface World {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  tick: (f: number) => void;
  chars: CharAnchor[];
  lookTarget: (f: number) => THREE.Vector3;
}

export interface ProjectedChar {
  id: string;
  cfg: CharConfig;
  left: number;
  top: number;
  width: number;
  yaw: number;
  expression: Expression;
  talking: boolean;
  walking: boolean;
  walkPhase: number;
}

export const Stage: React.FC<{
  build: () => World;
  worldDeps: unknown; // rebuild trigger (e.g. fonts ready)
  children?: (chars: ProjectedChar[]) => React.ReactNode;
}> = ({build, worldDeps, children}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bokehRef = useRef<BokehPass | null>(null);
  const [built, setBuilt] = useState(false);
  const [chars, setChars] = useState<ProjectedChar[]>([]);

  useEffect(() => {
    if (!canvasRef.current || worldDeps === null) return;
    let disposed = false;
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const world = build();
    worldRef.current = world;
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.addPass(new RenderPass(world.scene, world.camera));
    const bokeh = new BokehPass(world.scene, world.camera, {focus: 8, aperture: 0.00011, maxblur: 0.0075});
    composer.addPass(bokeh);
    composer.addPass(new OutputPass());
    composerRef.current = composer;
    bokehRef.current = bokeh;
    setBuilt(true); // re-render so the frame layout effect picks up the world
    return () => {
      disposed = true;
      composer.dispose();
      renderer.dispose();
      worldRef.current = null;
      composerRef.current = null;
      setBuilt(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldDeps, width, height]);

  useLayoutEffect(() => {
    const world = worldRef.current;
    const composer = composerRef.current;
    const bokeh = bokehRef.current;
    if (!built || !world || !composer || !bokeh) return;
    world.tick(frame);
    // DOF focus follows the look-at distance (SKILL: DOF focused at look-at distance)
    const target = world.lookTarget(frame);
    const dist = world.camera.position.distanceTo(target);
    const u = (bokeh as unknown as {uniforms: Record<string, {value: number}>}).uniforms;
    if (u?.focus) u.focus.value = dist;
    composer.render();
    // project characters
    const cam = world.camera;
    const out: ProjectedChar[] = world.chars.map((c) => {
      const feet = c.obj.position.clone();
      const head = feet.clone().add(new THREE.Vector3(0, c.height, 0));
      const pf = feet.clone().project(cam);
      const ph = head.clone().project(cam);
      const xScr = (pf.x * 0.5 + 0.5) * width;
      const yScr = (-pf.y * 0.5 + 0.5) * height;
      const yHead = (-ph.y * 0.5 + 0.5) * height;
      const pxBody = Math.max(6, yScr - yHead);
      // SVG feet(299)->head-top(26) = 273 of 330 viewBox height (D-005 fix)
      const H = pxBody * (330 / 273);
      const W = (H * 200) / 330;
      const dx = cam.position.x - feet.x;
      const dz = cam.position.z - feet.z;
      const yaw = Math.max(-0.7, Math.min(0.7, Math.atan2(dx, dz)));
      const expr = typeof c.expression === 'function' ? c.expression(frame) : c.expression;
      return {
        id: c.id,
        cfg: c.cfg,
        left: xScr - W / 2,
        top: yScr - H * (299 / 330),
        width: W,
        yaw,
        expression: expr,
        talking: c.talking ? c.talking(frame) : false,
        walking: c.walking ? c.walking(frame) : false,
        walkPhase: c.walkPhase ? c.walkPhase(frame) : 0,
      };
    });
    setChars(out);

  }, [frame, built, width, height]);

  return (
    <AbsoluteFill style={{backgroundColor: '#f7c268'}}>
      <canvas ref={canvasRef} style={{position: 'absolute', width: '100%', height: '100%'}} />
      {children ? children(chars) : null}
    </AbsoluteFill>
  );
};

/** Hold frames until web fonts are ready for canvas-painted Bengali signage (2.5s failsafe). */
export function useFontReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const handle = delayRender('bengali-fonts');
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
      continueRender(handle);
    };
    const timer = setTimeout(finish, 2500);
    const links = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join(' ');
    const families = Array.from(links.matchAll(/font-family:\s*'([^']+)'/g)).map((m) => m[1]);
    const wants = families.length ? families : ["'Noto Sans Bengali'"];
    Promise.all(
      Array.from(new Set(wants)).map((fam) =>
        document.fonts.load(`700 40px ${fam.startsWith("'") ? fam : `'${fam}'`}`).catch(() => null),
      ),
    )
      .then(() => {
        clearTimeout(timer);
        finish();
      })
      .catch(() => {
        clearTimeout(timer);
        finish();
      });
  }, []);
  return ready;
}
