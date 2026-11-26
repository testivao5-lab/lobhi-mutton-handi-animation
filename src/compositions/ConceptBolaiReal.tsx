import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {BolaiReal, FaceCUReal, DetailCropsReal} from '../components/characters/BolaiReal';
import {INK} from '../config/style';

const {fontFamily} = loadFont();

/*
 * REALISM BAR SHEET — Bolai (locked attributes), fully code-drawn realistic-detail art.
 * Sheet 1 (this): front + side + back + face close-up. Sheet 2: hand/fabric crops
 * (composition ConceptBolaiRealDetail).
 */

const Panel: React.FC<{title: string; children: React.ReactNode; x: number; w: number}> = ({title, children, x, w}) => (
  <div
    style={{
      position: 'absolute', left: x, top: 70, width: w, bottom: 20,
      background: '#FBF3E2', border: `3px solid ${INK}`, borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}
  >
    <div style={{fontFamily, fontSize: 24, fontWeight: 700, color: INK, padding: '12px 18px', borderBottom: `2px solid ${INK}`}}>
      {title}
    </div>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, minHeight: 0}}>{children}</div>
  </div>
);

export const ConceptBolaiReal: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#EFE3C8'}}>
    <div style={{position: 'absolute', left: 40, top: 14, fontFamily, fontSize: 32, fontWeight: 700, color: INK}}>
      রিয়ালিজম বার · বলাই — ডিটেইলড কোড-ড্রন ২D (অনুমোদিত অ্যাট্রিবিউট: সরিষা কুর্তা · ক্রিম ধুতি · লাল-চেক গামছা)
    </div>
    <Panel title="সামনে" x={16} w={330}>
      <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
        <BolaiReal view="front" />
      </div>
    </Panel>
    <Panel title="পাশ" x={360} w={330}>
      <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
        <BolaiReal view="side" />
      </div>
    </Panel>
    <Panel title="পেছন" x={704} w={330}>
      <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
        <BolaiReal view="back" />
      </div>
    </Panel>
    <Panel title="মুখ — ক্লোজ-আপ" x={1048} w={856}>
      <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
        <FaceCUReal />
      </div>
    </Panel>
  </AbsoluteFill>
);

export const ConceptBolaiRealDetail: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#EFE3C8'}}>
    <div style={{position: 'absolute', left: 40, top: 14, fontFamily, fontSize: 32, fontWeight: 700, color: INK}}>
      রিয়ালিজম বার · ডিটেইল ক্রপ — হাত · গামছা বয়ন · ধুতির ভাঁজ
    </div>
    <div
      style={{
        position: 'absolute', left: 16, right: 16, top: 70, bottom: 20,
        background: '#FBF3E2', border: `3px solid ${INK}`, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}
    >
      <div style={{width: '100%'}}>
        <DetailCropsReal />
      </div>
    </div>
  </AbsoluteFill>
);
