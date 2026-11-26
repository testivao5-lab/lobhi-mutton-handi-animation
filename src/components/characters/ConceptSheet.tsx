import React from 'react';
import {INK} from '../../config/style';

/*
 * Gate 2 — concept DESIGN PROPOSAL sheets (code-rendered, no AI images).
 * 3 distinct silhouette/costume directions per character; each shows
 * front / three-quarter / side / back views + face close-up + palette +
 * proportion guide. Proposal art only — production rig is built AFTER
 * the owner picks a direction (V6 Control Brief §4).
 */

export interface ConceptSpec {
  id: string;
  letter: string;
  title: string;
  note: string;
  skin: string;
  skinShade: string;
  hair: string;
  top: string;
  topShade: string;
  bottom: string;
  bottomShade: string;
  gamcha: string;
  gamchaCheck: boolean;
  gamchaWhere: 'shoulder' | 'head' | 'waist';
  apron?: string;
  belly: number; // 0..1
  shoulder: number; // half width px
  tall: number; // 1 = normal, 1.06 taller
  moustache: 'thick' | 'thin';
  brow: 'normal' | 'heavy';
  heads: string;
  palette: {name: string; hex: string}[];
}

const iw = (s: ConceptSpec) => 4.4;

function Gamcha({s, x, y, view}: {s: ConceptSpec; x: number; y: number; view: 'front' | '34' | 'side' | 'back'}) {
  const fill = s.gamchaCheck ? 'url(#gcheck)' : s.gamcha;
  if (view === 'back') {
    if (s.gamchaWhere === 'head') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M -30 -12 Q 0 -30 30 -12 L 26 -22 Q 0 -38 -26 -22 Z" fill={fill} stroke={INK} strokeWidth={iw(s)} />
          <circle cx={18} cy={-16} r={7} fill={fill} stroke={INK} strokeWidth={3} />
          <path d="M 18 -10 q 8 22 2 46 M 24 -12 q 14 18 12 40" stroke={fill} strokeWidth={11} fill="none" strokeLinecap="round" />
          <path d="M 18 -10 q 8 22 2 46 M 24 -12 q 14 18 12 40" stroke={INK} strokeWidth={2.4} fill="none" opacity={0.55} />
        </g>
      );
    }
    if (s.gamchaWhere === 'shoulder') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <path d="M -26 -22 Q 0 -16 26 -22 L 22 -8 Q 0 -2 -22 -8 Z" fill={fill} stroke={INK} strokeWidth={iw(s)} />
          <path d="M 4 -6 q 4 34 -2 66 M -6 -6 q -6 30 -2 58" stroke={fill} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.96} />
          <path d="M 4 -6 q 4 34 -2 66 M -6 -6 q -6 30 -2 58" stroke={INK} strokeWidth={2.2} fill="none" opacity={0.5} />
        </g>
      );
    }
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x={-34} y={-9} width={68} height={15} rx={4} fill={fill} stroke={INK} strokeWidth={iw(s)} />
        <path d="M -20 0 q -14 8 -22 22" stroke={fill} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (s.gamchaWhere === 'head') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M -31 -8 Q 0 -26 31 -8 L 27 -18 Q 0 -34 -27 -18 Z" fill={fill} stroke={INK} strokeWidth={iw(s)} />
        <path d="M 26 -14 q 16 6 14 22 q -8 6 -14 0 q 4 -12 -2 -20 Z" fill={fill} stroke={INK} strokeWidth={3.4} />
      </g>
    );
  }
  if (s.gamchaWhere === 'shoulder') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M -34 -26 Q -6 -20 22 -30 L 30 -14 Q 0 -4 -30 -10 Z" fill={fill} stroke={INK} strokeWidth={iw(s)} />
        <path d="M 26 -26 q 10 14 6 34 q -6 4 -12 0 q 4 -18 -2 -30 Z" fill={fill} stroke={INK} strokeWidth={3.4} />
        {s.gamchaCheck && <path d="M -26 -18 L 20 -26 M -20 -10 L 24 -18" stroke={INK} strokeWidth={2} opacity={0.45} />}
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-36} y={-8} width={72} height={16} rx={4} fill={fill} stroke={INK} strokeWidth={iw(s)} />
      <path d="M 18 4 q 16 4 20 20 q -8 8 -16 4 q 2 -14 -10 -20 Z" fill={fill} stroke={INK} strokeWidth={3.4} />
      {s.gamchaCheck && <path d="M -30 0 L 30 0 M -12 -8 L -12 8 M 6 -8 L 6 8 M 24 -8 L 24 8" stroke={INK} strokeWidth={1.8} opacity={0.4} />}
    </g>
  );
}

function Face({s, x, y, sc, shift}: {s: ConceptSpec; x: number; y: number; sc: number; shift: number}) {
  const browW = s.brow === 'heavy' ? 5.4 : 4;
  const mY = 62;
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`}>
      <ellipse cx={0} cy={0} rx={25} ry={27} fill={s.skin} stroke={INK} strokeWidth={4.6} />
      {/* hair */}
      <path d="M -26 -6 Q -28 -30 0 -32 Q 27 -30 26 -7 Q 18 -22 2 -22 Q -16 -22 -26 -6 Z" fill={s.hair} stroke={INK} strokeWidth={4} />
      {/* ears */}
      <ellipse cx={-25} cy={4} rx={5.5} ry={8} fill={s.skin} stroke={INK} strokeWidth={3.2} />
      <ellipse cx={25} cy={4} rx={5.5} ry={8} fill={s.skin} stroke={INK} strokeWidth={3.2} opacity={shift > 2 ? 0.35 : 1} />
      {/* brows */}
      <path d={`M ${-16 + shift} -13 q 8 -4 15 -1`} stroke={s.hair} strokeWidth={browW} fill="none" strokeLinecap="round" />
      <path d={`M ${2 + shift} -14 q 8 -3 15 1`} stroke={s.hair} strokeWidth={browW} fill="none" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx={-8 + shift} cy={-4} rx={5} ry={3.6} fill="#FDF9F0" stroke={INK} strokeWidth={2.6} />
      <circle cx={-7 + shift} cy={-3.6} r={2.2} fill="#3A2414" />
      <ellipse cx={12 + shift} cy={-4} rx={5} ry={3.6} fill="#FDF9F0" stroke={INK} strokeWidth={2.6} />
      <circle cx={13 + shift} cy={-3.6} r={2.2} fill="#3A2414" />
      {/* nose */}
      <path d={`M ${2 + shift} 0 q ${4 + shift * 0.3} 8 -1 11`} stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
      {/* moustache */}
      {s.moustache === 'thick' ? (
        <path d={`M ${-16 + shift} ${mY - 6} Q ${2 + shift} ${mY - 12} ${20 + shift} ${mY - 6} Q ${14 + shift} ${mY} ${2 + shift} ${mY - 2} Q ${-10 + shift} ${mY} ${-16 + shift} ${mY - 6} Z`} fill={s.hair} stroke={INK} strokeWidth={3} />
      ) : (
        <path d={`M ${-11 + shift} ${mY - 4} Q ${2 + shift} ${mY - 9} ${15 + shift} ${mY - 4} Q ${8 + shift} ${mY - 1} ${2 + shift} ${mY - 2} Q ${-4 + shift} ${mY - 1} ${-11 + shift} ${mY - 4} Z`} fill={s.hair} stroke={INK} strokeWidth={2.6} />
      )}
      {/* mouth */}
      <path d={`M ${-6 + shift} ${mY + 6} Q ${2 + shift} ${mY + 11} ${10 + shift} ${mY + 6}`} stroke={INK} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    </g>
  );
}

const HeadUnitGuide: React.FC<{x: number; y: number; h: number; label: string}> = ({x, y, h, label}) => {
  const u = h / 4.3;
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={h} stroke={INK} strokeWidth={2.4} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1={-7} y1={i * u} x2={7} y2={i * u} stroke={INK} strokeWidth={2.4} />
        </g>
      ))}
      <text x={12} y={h / 2} fontSize={15} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif" transform={`rotate(-90 12 ${h / 2})`}>
        {label}
      </text>
    </g>
  );
};

function FrontView({s, variant}: {s: ConceptSpec; variant: 'front' | '34'}) {
  const shift = variant === '34' ? 6 : 0;
  const hem = 172 + s.belly * 14;
  const sw = s.shoulder;
  const bellyR = 24 + s.belly * 20;
  return (
    <g transform={`scale(1 ${s.tall})`}>
      {/* legs */}
      <path d={`M 88 ${hem + 6} L 86 288 L 98 288 L 100 ${hem + 6} Z`} fill={s.skinShade} stroke={INK} strokeWidth={4} />
      <path d={`M 120 ${hem + 6} L 122 288 L 134 288 L 132 ${hem + 6} Z`} fill={s.skin} stroke={INK} strokeWidth={4} />
      {/* lower garment */}
      <path d={`M ${74 - s.belly * 4} 160 Q 110 176 ${146 + s.belly * 4} 160 L ${140 + s.belly * 4} 214 Q 110 226 ${80 - s.belly * 4} 214 Z`} fill={s.bottom} stroke={INK} strokeWidth={4.6} />
      <path d={`M 96 182 L 92 218 M 124 182 L 128 218`} stroke={s.bottomShade} strokeWidth={3.4} fill="none" />
      <path d={`M ${78 - s.belly * 4} 208 Q 110 222 ${142 + s.belly * 4} 208`} stroke={s.bottomShade} strokeWidth={3.2} fill="none" />
      {s.apron && (
        <path d={`M ${88 - s.belly * 2} 150 L ${132 + s.belly * 2} 150 L ${138 + s.belly * 2} 216 Q 110 228 ${82 - s.belly * 2} 216 Z`} fill={s.apron} stroke={INK} strokeWidth={4} />
      )}
      {/* feet */}
      <ellipse cx={92} cy={296} rx={17} ry={6.5} fill="#5A3A18" stroke={INK} strokeWidth={3.6} />
      <ellipse cx={128} cy={296} rx={17} ry={6.5} fill="#5A3A18" stroke={INK} strokeWidth={3.6} />
      {/* torso */}
      <path
        d={`M ${110 - sw} 92 Q ${110 - sw - 4} 120 ${110 - bellyR} ${hem - 8} Q 110 ${hem + 6} ${110 + bellyR} ${hem - 8} Q ${110 + sw + 4} 120 ${110 + sw} 92 Q 110 78 ${110 - sw} 92 Z`}
        fill={s.top}
        stroke={INK}
        strokeWidth={4.8}
      />
      <ellipse cx={110} cy={148} rx={bellyR - 6} ry={16 + s.belly * 8} fill={s.topShade} opacity={0.3} />
      {/* placket + collar */}
      <path d={`M ${110 + shift * 0.4} 92 L ${110 + shift * 0.4} ${hem - 4}`} stroke={s.topShade} strokeWidth={3} fill="none" />
      <circle cx={110 + shift * 0.4} cy={112} r={2.6} fill={INK} />
      <circle cx={110 + shift * 0.4} cy={134} r={2.6} fill={INK} />
      <path d={`M ${98 + shift} 88 Q ${110 + shift} 100 ${122 + shift} 88`} stroke={INK} strokeWidth={3.4} fill="none" />
      {/* arms */}
      <path d={`M ${110 - sw - 2} 96 L ${110 - sw - 12} 138 L ${110 - sw - 4} 140 L ${110 - sw + 6} 98 Z`} fill={s.skinShade} stroke={INK} strokeWidth={4} />
      <path d={`M ${110 - sw - 10} 140 L ${110 - sw - 8} 172 L ${110 - sw + 2} 172 L ${110 - sw} 140 Z`} fill={s.skinShade} stroke={INK} strokeWidth={4} />
      <circle cx={110 - sw - 3} cy={180} r={8} fill="#3A2A20" stroke={INK} strokeWidth={3} />
      <path d={`M ${110 + sw + 2} 96 L ${110 + sw + 12} 138 L ${110 + sw + 4} 140 L ${110 + sw - 6} 98 Z`} fill={s.skin} stroke={INK} strokeWidth={4} />
      <path d={`M ${110 + sw + 10} 140 L ${110 + sw + 8} 172 L ${110 + sw - 2} 172 L ${110 + sw} 140 Z`} fill={s.skin} stroke={INK} strokeWidth={4} />
      <circle cx={110 + sw + 3} cy={180} r={8} fill="#3A2A20" stroke={INK} strokeWidth={3} />
      {/* sleeves rolled band */}
      <rect x={110 - sw - 13} y={122} width={19} height={9} rx={3} fill={s.topShade} stroke={INK} strokeWidth={2.6} />
      <rect x={110 + sw - 6} y={122} width={19} height={9} rx={3} fill={s.topShade} stroke={INK} strokeWidth={2.6} />
      {/* neck + head */}
      <rect x={100} y={70} width={20} height={20} fill={s.skinShade} stroke={INK} strokeWidth={3.4} />
      <Face s={s} x={110} y={44} sc={1} shift={shift} />
      <Gamcha s={s} x={viewHeadX(s, variant)} y={variant === '34' ? 40 : 40} view={variant} />
    </g>
  );
}

function viewHeadX(s: ConceptSpec, v: 'front' | '34'): number {
  return v === '34' ? 118 : 112;
}

function SideView({s}: {s: ConceptSpec}) {
  const belly = s.belly;
  return (
    <g transform={`scale(1 ${s.tall})`}>
      {/* far leg */}
      <path d="M 112 210 L 114 288 L 126 288 L 122 212 Z" fill={s.skinShade} stroke={INK} strokeWidth={4} />
      {/* near leg */}
      <path d="M 96 210 L 94 288 L 108 288 L 110 212 Z" fill={s.skin} stroke={INK} strokeWidth={4} />
      {/* lower garment profile */}
      <path d={`M ${86 - belly * 8} 158 Q 108 174 140 156 L 146 212 Q 116 226 90 214 Z`} fill={s.bottom} stroke={INK} strokeWidth={4.6} />
      <path d={`M ${88 - belly * 8} 206 Q 114 222 144 206`} stroke={s.bottomShade} strokeWidth={3.2} fill="none" />
      {s.apron && <path d={`M ${84 - belly * 8} 148 L 134 146 L 142 214 Q 112 228 86 212 Z`} fill={s.apron} stroke={INK} strokeWidth={4} />}
      <ellipse cx={100} cy={296} rx={19} ry={6.5} fill="#5A3A18" stroke={INK} strokeWidth={3.6} />
      {/* torso profile: back curve + belly front */}
      <path
        d={`M 116 84 Q 138 100 140 140 Q 140 166 128 172 L 90 170 Q ${82 - belly * 16} 148 ${86 - belly * 12} 112 Q 90 94 104 88 Z`}
        fill={s.top}
        stroke={INK}
        strokeWidth={4.8}
      />
      <path d={`M ${88 - belly * 10} 128 Q ${86 - belly * 10} 150 96 162`} stroke={s.topShade} strokeWidth={3} fill="none" opacity={0.7} />
      {/* arm */}
      <path d="M 106 96 L 112 140 L 122 138 L 116 94 Z" fill={s.skin} stroke={INK} strokeWidth={4} />
      <path d="M 113 142 L 116 172 L 126 170 L 122 140 Z" fill={s.skin} stroke={INK} strokeWidth={4} />
      <circle cx={122} cy={178} r={8} fill="#3A2A20" stroke={INK} strokeWidth={3} />
      {/* neck + head profile */}
      <rect x={102} y={70} width={20} height={20} fill={s.skinShade} stroke={INK} strokeWidth={3.4} />
      <g transform="translate(112 44)">
        <ellipse cx={0} cy={0} rx={24} ry={26} fill={s.skin} stroke={INK} strokeWidth={4.6} />
        {/* nose + profile bump */}
        <path d="M -24 2 Q -32 8 -24 16 L -18 14" fill={s.skin} stroke={INK} strokeWidth={4} />
        {/* hair mass back */}
        <path d="M -20 -14 Q -6 -30 14 -26 Q 28 -20 24 8 Q 16 -8 0 -12 Q -12 -14 -20 -14 Z" fill={s.hair} stroke={INK} strokeWidth={4} />
        <ellipse cx={2} cy={6} rx={5.5} ry={8} fill={s.skin} stroke={INK} strokeWidth={3.2} />
        <path d="M -16 -13 q 8 -4 14 -1" stroke={s.hair} strokeWidth={s.brow === 'heavy' ? 5.4 : 4} fill="none" strokeLinecap="round" />
        <ellipse cx={-10} cy={-2} rx={4.6} ry={3.4} fill="#FDF9F0" stroke={INK} strokeWidth={2.6} />
        <circle cx={-10} cy={-1.6} r={2} fill="#3A2414" />
        {s.moustache === 'thick' ? (
          <path d="M -30 18 Q -20 12 -8 16 Q -14 22 -22 22 Q -28 22 -30 18 Z" fill={s.hair} stroke={INK} strokeWidth={3} />
        ) : (
          <path d="M -26 18 Q -18 14 -8 17 Q -14 20 -20 20 Q -24 20 -26 18 Z" fill={s.hair} stroke={INK} strokeWidth={2.6} />
        )}
        <path d="M -22 26 Q -16 30 -10 28" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
      <Gamcha s={s} x={s.gamchaWhere === 'head' ? 112 : 126} y={s.gamchaWhere === 'waist' ? 150 : 40} view="side" />
    </g>
  );
}

function BackView({s}: {s: ConceptSpec}) {
  const hem = 172 + s.belly * 14;
  const sw = s.shoulder;
  const bellyR = 24 + s.belly * 20;
  return (
    <g transform={`scale(1 ${s.tall})`}>
      <path d={`M 88 ${hem + 6} L 86 288 L 98 288 L 100 ${hem + 6} Z`} fill={s.skinShade} stroke={INK} strokeWidth={4} />
      <path d={`M 120 ${hem + 6} L 122 288 L 134 288 L 132 ${hem + 6} Z`} fill={s.skin} stroke={INK} strokeWidth={4} />
      <path d={`M ${74 - s.belly * 4} 160 Q 110 176 ${146 + s.belly * 4} 160 L ${140 + s.belly * 4} 214 Q 110 226 ${80 - s.belly * 4} 214 Z`} fill={s.bottom} stroke={INK} strokeWidth={4.6} />
      {s.apron && <path d={`M ${88 - s.belly * 2} 150 L ${132 + s.belly * 2} 150 L ${138 + s.belly * 2} 216 Q 110 228 ${82 - s.belly * 2} 216 Z`} fill={s.apron} stroke={INK} strokeWidth={4} opacity={0.92} />}
      {s.apron && <path d="M 96 150 L 110 132 L 124 150" stroke={s.apron} strokeWidth={7} fill="none" />}
      <ellipse cx={92} cy={296} rx={17} ry={6.5} fill="#5A3A18" stroke={INK} strokeWidth={3.6} />
      <ellipse cx={128} cy={296} rx={17} ry={6.5} fill="#5A3A18" stroke={INK} strokeWidth={3.6} />
      <path
        d={`M ${110 - sw} 92 Q ${110 - sw - 4} 120 ${110 - bellyR} ${hem - 8} Q 110 ${hem + 6} ${110 + bellyR} ${hem - 8} Q ${110 + sw + 4} 120 ${110 + sw} 92 Q 110 78 ${110 - sw} 92 Z`}
        fill={s.top}
        stroke={INK}
        strokeWidth={4.8}
      />
      <path d={`M 110 96 L 110 ${hem - 6}`} stroke={s.topShade} strokeWidth={2.6} strokeDasharray="6 5" fill="none" />
      <path d={`M ${110 - sw - 2} 96 L ${110 - sw - 12} 138 L ${110 - sw - 4} 140 L ${110 - sw + 6} 98 Z`} fill={s.skinShade} stroke={INK} strokeWidth={4} />
      <path d={`M ${110 + sw + 2} 96 L ${110 + sw + 12} 138 L ${110 + sw + 4} 140 L ${110 + sw - 6} 98 Z`} fill={s.skin} stroke={INK} strokeWidth={4} />
      <rect x={100} y={70} width={20} height={20} fill={s.skinShade} stroke={INK} strokeWidth={3.4} />
      <g transform="translate(110 44)">
        <ellipse cx={0} cy={0} rx={25} ry={27} fill={s.skin} stroke={INK} strokeWidth={4.6} />
        <path d="M -25 -4 Q -26 -30 0 -31 Q 26 -30 25 -4 Q 14 -24 0 -24 Q -14 -24 -25 -4 Z" fill={s.hair} stroke={INK} strokeWidth={4} />
      </g>
      <Gamcha s={s} x={110} y={40} view="back" />
    </g>
  );
}

const FaceCU: React.FC<{s: ConceptSpec; cx: number; cy: number}> = ({s, cx, cy}) => (
  <g>
    <circle cx={cx} cy={cy} r={70} fill="#FBF3E2" stroke={INK} strokeWidth={3.4} />
    <g transform={`translate(${cx} ${cy}) scale(1.62)`}>
      <Face s={s} x={0} y={0} sc={1} shift={0} />
    </g>
    <text x={cx} y={cy + 88} textAnchor="middle" fontSize={14} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      মুখের ক্লোজ-আপ
    </text>
  </g>
);

export const DirectionPanel: React.FC<{s: ConceptSpec; x: number; y: number}> = ({s, x, y}) => (
  <svg width={560} height={1010} viewBox="0 0 560 1010" style={{position: 'absolute', left: x, top: y}}>
    <defs>
      <pattern id="gcheck" width={14} height={14} patternUnits="userSpaceOnUse">
        <rect width={14} height={14} fill={s.gamcha} />
        <path d="M0 7 h14 M7 0 v14" stroke="#F6E7D2" strokeWidth={4.5} opacity={0.75} />
      </pattern>
    </defs>
    <rect x={2} y={2} width={556} height={1006} rx={14} fill="#FBF3E2" stroke={INK} strokeWidth={3} />
    <text x={22} y={40} fontSize={24} fontWeight={700} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      দিক {s.letter} · {s.title}
    </text>
    {/* 2×2 views */}
    <g transform="translate(30 62)">
      <FrontView s={s} variant="front" />
    </g>
    <HeadUnitGuide x={268} y={90} h={300} label={s.heads} />
    <g transform="translate(300 62)">
      <FrontView s={s} variant="34" />
    </g>
    <g transform="translate(30 400)">
      <SideView s={s} />
    </g>
    <g transform="translate(300 400)">
      <BackView s={s} />
    </g>
    <text x={120} y={382} textAnchor="middle" fontSize={15} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">সামনে</text>
    <text x={400} y={382} textAnchor="middle" fontSize={15} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">তিন-চতুর্থাংশ</text>
    <text x={120} y={700} textAnchor="middle" fontSize={15} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">পাশ</text>
    <text x={400} y={700} textAnchor="middle" fontSize={15} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">পেছন</text>
    <FaceCU s={s} cx={458} cy={822} />
    {/* palette chips */}
    {s.palette.map((p, i) => (
      <g key={i} transform={`translate(${20 + i * 92} 780)`}>
        <rect x={0} y={0} width={80} height={48} rx={8} fill={p.hex} stroke={INK} strokeWidth={2.6} />
        <text x={40} y={66} textAnchor="middle" fontSize={13} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
          {p.name}
        </text>
      </g>
    ))}
    <text x={22} y={925} fontSize={14.5} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      অনুপাত: {s.heads} · পেট: {Math.round(s.belly * 100)}% · কাঁধ: {s.shoulder * 2}px
    </text>
    <foreignObject x={16} y={938} width={528} height={64}>
      <div style={{fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: 15.5, color: INK, lineHeight: 1.35}}>
        {s.note}
      </div>
    </foreignObject>
  </svg>
);
