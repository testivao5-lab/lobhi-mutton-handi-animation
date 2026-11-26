import React from 'react';
import {INK} from '../../config/style';

/*
 * Realistic-detail 2D character art (owner bar: "detailed, realistic — NO stick figures").
 * 100% code-drawn SVG. Anatomy: ~7.2-head proportions, structured face (brow arch,
 * lid crease, iris limbal ring + catchlights, nose bridge/wings, lips, jaw/cheek),
 * formed hands (palm + finger masses), cloth with drape folds, 3-tone cel shading
 * with soft blurred shadow zones, variable-width ink (#351f22).
 * Bolai — locked attributes: mustard kurta, cream knee dhoti, red-checked gamcha
 * (left shoulder), black hair, thick moustache, working belly.
 */

const SKIN = '#EDB27E';
const SKIN_SH = '#D1935C';
const SKIN_HI = '#F7CC9E';
const KURTA = '#E9A63A';
const KURTA_SH = '#C07C16';
const KURTA_DP = '#A5670F';
const KURTA_HI = '#F5BE5C';
const DHOTI = '#F5ECDA';
const DHOTI_SH = '#DCCB9F';
const DHOTI_DP = '#C2AE84';
const GAM = '#C6402F';
const GAM_CK = '#F6E7D2';
const HAIR = '#241A10';
const HAIR_HI = '#4A3A28';
const SANDAL = '#7A4A26';
const SANDAL_DK = '#5A3618';

const SoftShadow = ({id, blur}: {id: string; blur: number}) => (
  <filter id={id} x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation={blur} />
  </filter>
);

const Defs = () => (
  <defs>
    <SoftShadow id="ss6" blur={6} />
    <SoftShadow id="ss10" blur={10} />
    <SoftShadow id="ss16" blur={16} />
    <linearGradient id="kurtaShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={KURTA_SH} stopOpacity={0.55} />
      <stop offset="26%" stopColor={KURTA_SH} stopOpacity={0.12} />
      <stop offset="62%" stopColor={KURTA_SH} stopOpacity={0} />
      <stop offset="88%" stopColor={KURTA_DP} stopOpacity={0.35} />
      <stop offset="100%" stopColor={KURTA_DP} stopOpacity={0.55} />
    </linearGradient>
    <linearGradient id="dhotiShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={DHOTI_SH} stopOpacity={0.6} />
      <stop offset="30%" stopColor={DHOTI_SH} stopOpacity={0.15} />
      <stop offset="70%" stopColor={DHOTI_SH} stopOpacity={0.1} />
      <stop offset="100%" stopColor={DHOTI_DP} stopOpacity={0.5} />
    </linearGradient>
    <linearGradient id="skinFace" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={SKIN_HI} />
      <stop offset="55%" stopColor={SKIN} />
      <stop offset="100%" stopColor={SKIN_SH} />
    </linearGradient>
    <radialGradient id="irisG" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stopColor="#7B4A22" />
      <stop offset="55%" stopColor="#5B3010" />
      <stop offset="100%" stopColor="#311A08" />
    </radialGradient>
    <pattern id="gamChecks" width={22} height={22} patternUnits="userSpaceOnUse">
      <rect width={22} height={22} fill={GAM} />
      <path d="M0 11 h22 M11 0 v22" stroke={GAM_CK} strokeWidth={7} opacity={0.8} />
    </pattern>
  </defs>
);

/* ---------------- FACE ---------------- */

const Brow: React.FC<{x: number; y: number; flip?: boolean}> = ({x, y, flip}) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}>
    <path
      d="M 2 6 C 14 -2 34 -4 48 2 C 36 4 16 8 6 12 Z"
      fill={HAIR}
      stroke={INK}
      strokeWidth={2}
    />
    {[10, 18, 26, 34, 42].map((hx, i) => (
      <path
        key={i}
        d={`M ${hx} ${3 + (i % 2)} q 3 ${-4 - i * 0.4} 7 ${-3 - i * 0.3}`}
        stroke={HAIR}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
        opacity={0.75}
      />
    ))}
  </g>
);

const Eye: React.FC<{x: number; y: number; flip?: boolean}> = ({x, y, flip}) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}>
    {/* eye socket soft shade */}
    <ellipse cx={24} cy={2} rx={30} ry={17} fill={SKIN_SH} opacity={0.28} filter="url(#ss6)" />
    {/* sclera */}
    <path d="M 2 4 C 10 -6 30 -8 42 0 C 46 3 46 6 42 9 C 30 15 12 14 2 4 Z" fill="#F9F4E8" stroke={INK} strokeWidth={2.4} />
    {/* iris + pupil + catchlights */}
    <g>
      <circle cx={26} cy={3.4} r={10.4} fill="url(#irisG)" />
      <circle cx={26} cy={3.4} r={10.4} fill="none" stroke="#241206" strokeWidth={1.6} opacity={0.8} />
      <circle cx={26} cy={3.4} r={4.6} fill="#120A04" />
      <circle cx={22.4} cy={-0.6} r={2.6} fill="#FFFFFF" opacity={0.95} />
      <circle cx={29.5} cy={6.5} r={1.4} fill="#FFFFFF" opacity={0.5} />
    </g>
    {/* upper lid overlaps iris + crease */}
    <path d="M 0 4 C 10 -7 32 -9 44 0" fill="none" stroke={INK} strokeWidth={3.4} strokeLinecap="round" />
    <path d="M 4 -3 C 14 -12 34 -13 46 -5" fill="none" stroke={SKIN_SH} strokeWidth={2.6} strokeLinecap="round" opacity={0.85} />
    <path d="M 2 4 C 10 -6 30 -8 42 0" fill={SKIN} stroke="none" opacity={0.35} transform="translate(0 -1.5)" />
    {/* lower lid + lash */}
    <path d="M 6 10 C 18 14.5 34 13.5 43 8" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" opacity={0.9} />
    <path d="M 40 6.5 l 6 -3.4 M 34 9 l 5 -4" stroke={INK} strokeWidth={1.7} strokeLinecap="round" />
  </g>
);

const Ear: React.FC<{x: number; y: number; flip?: boolean}> = ({x, y, flip}) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}>
    <path d="M 0 -16 C 14 -22 22 -8 18 6 C 15 16 6 22 -2 18 C -6 8 -6 -8 0 -16 Z" fill={SKIN} stroke={INK} strokeWidth={3.2} />
    <path d="M 2 -9 C 10 -12 13 -2 9 5 M 4 0 q 4 6 1 10" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.75} />
  </g>
);

export const FaceReal: React.FC<{cx?: number; cy?: number; scale?: number}> = ({cx = 420, cy = 232, scale = 1}) => (
  <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
    {/* --- skull + jaw --- */}
    <path
      d="M 355 205 C 352 152 376 118 420 116 C 464 118 488 152 485 205 C 483 246 477 276 459 302 C 447 322 434 341 420 343 C 406 341 393 322 381 302 C 363 276 357 246 355 205 Z"
      fill="url(#skinFace)"
      stroke={INK}
      strokeWidth={4.6}
    />
    {/* cheek structure shading */}
    <ellipse cx={383} cy={262} rx={20} ry={26} fill={SKIN_SH} opacity={0.35} filter="url(#ss10)" />
    <ellipse cx={457} cy={262} rx={20} ry={26} fill={SKIN_SH} opacity={0.35} filter="url(#ss10)" />
    <ellipse cx={420} cy={150} rx={38} ry={22} fill={SKIN_HI} opacity={0.5} filter="url(#ss10)" />
    {/* --- hair --- */}
    <path
      d="M 348 212 C 343 138 380 106 420 105 C 460 106 497 138 492 212 C 489 196 483 182 474 172 C 462 158 444 150 420 150 C 396 150 378 158 366 172 C 357 182 351 196 348 212 Z"
      fill={HAIR}
      stroke={INK}
      strokeWidth={4.2}
    />
    <path d="M 372 168 C 388 152 420 146 448 154" stroke={HAIR_HI} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.9} />
    <path d="M 362 186 C 370 170 386 158 404 154" stroke={HAIR_HI} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.55} />
    {/* sideburns */}
    <path d="M 356 196 C 352 214 354 232 360 246 L 368 240 C 362 228 361 212 363 198 Z" fill={HAIR} stroke={INK} strokeWidth={2.4} />
    <path d="M 484 196 C 488 214 486 232 480 246 L 472 240 C 478 228 479 212 477 198 Z" fill={HAIR} stroke={INK} strokeWidth={2.4} />
    {/* --- ears --- */}
    <Ear x={352} y={246} />
    <Ear x={488} y={246} flip />
    {/* --- brows --- */}
    <Brow x={366} y={198} />
    <Brow x={428} y={198} flip />
    {/* --- eyes --- */}
    <Eye x={362} y={238} />
    <Eye x={428} y={238} flip />
    {/* --- nose --- */}
    <g>
      <path d="M 414 232 C 412 254 410 270 404 282 C 402 286 404 290 409 291 L 431 291 C 436 290 438 286 436 282 C 430 270 428 254 426 232" fill={SKIN} stroke={INK} strokeWidth={3.2} strokeLinejoin="round" />
      <path d="M 404 282 C 400 286 398 292 403 295 C 407 297 411 295 412 291" fill={SKIN} stroke={INK} strokeWidth={2.8} />
      <path d="M 436 282 C 440 286 442 292 437 295 C 433 297 429 295 428 291" fill={SKIN} stroke={INK} strokeWidth={2.8} />
      <ellipse cx={407} cy={294} rx={2.4} ry={1.7} fill="#5A3A20" />
      <ellipse cx={433} cy={294} rx={2.4} ry={1.7} fill="#5A3A20" />
      <path d="M 414 296 C 418 299 422 299 426 296" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.7} />
      <ellipse cx={412} cy={278} rx={7} ry={9} fill={SKIN_SH} opacity={0.4} filter="url(#ss6)" />
    </g>
    {/* --- moustache (thick, textured) --- */}
    <g>
      <path
        d="M 372 306 C 384 296 404 292 420 293 C 436 292 456 296 468 306 C 470 314 464 320 454 318 C 442 314 432 312 420 312 C 408 312 398 314 386 318 C 376 320 370 314 372 306 Z"
        fill={HAIR}
        stroke={INK}
        strokeWidth={3.4}
      />
      {[382, 392, 402, 412, 428, 438, 448, 458].map((mx, i) => (
        <path key={i} d={`M ${mx} ${299 + (i % 2) * 2} q 3 8 1 14`} stroke={HAIR_HI} strokeWidth={1.8} fill="none" strokeLinecap="round" opacity={0.6} />
      ))}
    </g>
    {/* --- mouth (small smile below moustache) --- */}
    <path d="M 400 330 C 410 337 430 337 440 330" stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
    <path d="M 404 334 C 414 341 426 341 436 334" stroke={SKIN_SH} strokeWidth={2.2} fill="none" strokeLinecap="round" opacity={0.8} />
    {/* chin crease + jaw shade */}
    <path d="M 410 352 q 10 4 20 0" stroke={INK} strokeWidth={2} fill="none" opacity={0.5} />
    <path d="M 385 315 C 392 336 402 350 420 356 C 438 350 448 336 455 315" stroke={SKIN_SH} strokeWidth={3} fill="none" opacity={0.45} filter="url(#ss6)" />
    {/* forehead sheen */}
    <ellipse cx={420} cy={182} rx={26} ry={10} fill={SKIN_HI} opacity={0.4} filter="url(#ss6)" />
  </g>
);

/* ---------------- BODY ---------------- */

const HandOpen: React.FC<{x: number; y: number; flip?: boolean}> = ({x, y, flip}) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}>
    <path d="M 0 -14 C 16 -18 30 -12 32 2 C 34 14 26 26 12 28 C 0 30 -10 24 -12 12 C -14 0 -10 -10 0 -14 Z" fill={SKIN} stroke={INK} strokeWidth={3.6} />
    <path d="M -6 2 q 12 4 26 1 M -6 10 q 12 4 25 0 M -4 17 q 11 4 22 0" stroke={INK} strokeWidth={2} fill="none" opacity={0.65} />
    <path d="M 14 -16 q 6 -8 12 -4" stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
  </g>
);

export const BolaiReal: React.FC<{view?: 'front' | 'side' | 'back'}> = ({view = 'front'}) => {
  if (view === 'side') {
    return (
      <svg viewBox="256 92 330 1424" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <Defs />
        <g stroke={INK} fill="none">
          {/* head profile */}
          <g transform="translate(60 0)">
            <path d="M 420 116 C 470 116 492 158 490 210 C 488 252 480 282 462 306 C 450 324 438 340 424 343 L 404 343 C 388 336 376 322 372 306 L 388 300 C 396 282 398 262 394 244 L 376 238 C 366 234 362 220 368 210 C 374 200 386 196 396 200 C 396 172 402 138 420 116 Z" fill="url(#skinFace)" stroke={INK} strokeWidth={4.6} />
            {/* nose profile bump integrated above (368-396 zone) */}
            <path d="M 356 240 C 358 270 366 296 380 314" stroke={SKIN_SH} strokeWidth={3} fill="none" opacity={0.5} />
            {/* hair back + top */}
            <path d="M 368 140 C 384 112 448 106 470 136 C 480 150 484 170 484 192 C 476 168 460 150 440 146 C 414 140 388 142 372 156 C 368 150 366 144 368 140 Z" fill={HAIR} stroke={INK} strokeWidth={4.2} />
            <path d="M 380 300 C 378 240 376 190 384 150 L 356 156 C 348 200 352 262 364 308 Z" fill={HAIR} stroke={INK} strokeWidth={4.2} />
            <path d="M 366 170 C 356 180 352 210 356 240" stroke={HAIR_HI} strokeWidth={4} fill="none" opacity={0.7} />
            <Ear x={402} y={252} flip />
            {/* brow + eye profile */}
            <path d="M 372 206 q 14 -6 26 0 l -2 8 q -12 -4 -22 0 Z" fill={HAIR} stroke={INK} strokeWidth={2} />
            <path d="M 374 234 q 10 -8 22 -2 l -4 8 q -8 -3 -14 0 Z" fill="#F9F4E8" stroke={INK} strokeWidth={2.2} />
            <circle cx={386} cy={235} r={5} fill="#311A08" />
            {/* mouth + moustache profile */}
            <path d="M 376 296 q -12 4 -22 2 q 10 6 22 4 Z" fill={HAIR} stroke={INK} strokeWidth={2.6} />
            <path d="M 396 322 q -12 2 -20 -2" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          {/* neck */}
          <path d="M 470 336 L 466 396 L 512 400 L 512 344 Z" fill={SKIN_SH} stroke={INK} strokeWidth={3.6} />
          {/* torso profile */}
          <path d="M 466 400 C 430 412 414 448 412 500 C 410 560 404 620 400 668 C 398 700 400 720 404 738 L 540 738 C 548 700 552 650 548 590 C 546 548 544 500 540 460 C 536 424 512 402 490 398 Z" fill={KURTA} stroke={INK} strokeWidth={4.6} />
          {/* belly curve emphasis */}
          <path d="M 412 560 C 408 600 404 640 402 672" stroke={KURTA_SH} strokeWidth={4} fill="none" opacity={0.7} />
          <path d="M 404 560 C 400 600 397 640 396 676 C 396 690 398 700 402 706" fill={KURTA_SH} opacity={0.4} filter="url(#ss10)" stroke="none" />
          {/* sleeve + arm */}
          <path d="M 500 412 C 530 428 542 470 540 512 C 538 544 530 566 520 576 L 496 566 C 504 536 506 500 498 470 Z" fill={KURTA} stroke={INK} strokeWidth={4.2} />
          <path d="M 516 570 L 540 584 C 560 620 566 660 562 700 L 540 706 C 542 668 536 630 522 600 Z" fill={SKIN} stroke={INK} strokeWidth={3.8} />
          <HandOpen x={548} y={726} />
          {/* dhoti profile */}
          <path d="M 404 738 C 392 780 388 830 392 880 C 396 950 398 1020 396 1080 L 540 1080 C 544 1010 544 930 540 860 C 538 812 540 770 542 738 Z" fill={DHOTI} stroke={INK} strokeWidth={4.6} />
          <path d="M 404 738 L 396 1080 M 470 740 L 466 1078 M 520 740 L 536 1076" stroke={DHOTI_SH} strokeWidth={3} fill="none" opacity={0.8} />
          <path d="M 396 1060 L 540 1060" stroke={DHOTI_DP} strokeWidth={5} fill="none" opacity={0.8} />
          {/* near leg + far leg */}
          <path d="M 434 1080 C 428 1160 430 1260 442 1330 C 448 1370 452 1400 452 1420 L 486 1420 C 488 1380 490 1320 486 1260 C 482 1190 482 1120 486 1080 Z" fill={SKIN} stroke={INK} strokeWidth={4} />
          <path d="M 496 1080 C 494 1150 498 1240 506 1310 C 510 1360 512 1396 512 1414 L 544 1410 C 546 1370 546 1300 542 1240 C 538 1170 538 1110 540 1080 Z" fill={SKIN_SH} stroke={INK} strokeWidth={4} />
          {/* sandals */}
          <path d="M 440 1420 C 424 1430 416 1446 422 1458 C 434 1466 470 1466 486 1458 C 490 1444 486 1428 476 1420 Z" fill={SANDAL} stroke={INK} strokeWidth={3.6} />
          <path d="M 504 1414 C 494 1426 494 1444 502 1454 C 518 1462 544 1458 548 1444 C 548 1430 542 1418 532 1412 Z" fill={SANDAL_DK} stroke={INK} strokeWidth={3.6} />
        </g>
      </svg>
    );
  }
  if (view === 'back') {
    return (
      <svg viewBox="256 92 330 1424" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <Defs />
        <g stroke={INK} fill="none">
          {/* head back */}
          <path d="M 356 210 C 354 152 378 118 420 116 C 462 118 486 152 484 210 C 482 260 470 316 420 340 C 370 316 358 260 356 210 Z" fill={SKIN} stroke={INK} strokeWidth={4.6} />
          {/* hair back full */}
          <path d="M 352 214 C 350 148 382 110 420 109 C 458 110 490 148 488 214 C 486 260 474 296 456 316 L 384 316 C 366 296 354 260 352 214 Z" fill={HAIR} stroke={INK} strokeWidth={4.4} />
          <path d="M 372 160 C 396 138 444 138 468 160" stroke={HAIR_HI} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.85} />
          <path d="M 366 190 C 380 170 400 160 420 158 M 474 190 C 460 170 440 160 420 158" stroke={HAIR_HI} strokeWidth={3} fill="none" opacity={0.5} />
          <Ear x={352} y={246} />
          <Ear x={488} y={246} flip />
          {/* neck */}
          <path d="M 392 336 L 390 396 L 450 396 L 448 336 Z" fill={SKIN_SH} stroke={INK} strokeWidth={3.6} />
          {/* kurta back */}
          <path d="M 394 398 C 340 410 300 440 292 500 C 284 560 284 620 292 668 C 296 700 300 722 306 738 L 534 738 C 540 722 544 700 548 668 C 556 620 556 560 548 500 C 540 440 500 410 446 398 Z" fill={KURTA} stroke={INK} strokeWidth={4.6} />
          <path d="M 420 400 L 420 736" stroke={KURTA_SH} strokeWidth={3.4} fill="none" opacity={0.8} />
          <path d="M 310 560 C 314 610 318 660 324 700 M 530 560 C 526 610 522 660 516 700" stroke={KURTA_SH} strokeWidth={3} fill="none" opacity={0.6} />
          <path d="M 296 480 C 340 452 500 452 544 480" stroke={KURTA_SH} strokeWidth={3} fill="none" opacity={0.7} />
          {/* arms back */}
          <path d="M 296 460 C 276 500 268 548 272 596 L 306 590 C 302 548 306 504 318 470 Z" fill={KURTA} stroke={INK} strokeWidth={4.2} />
          <path d="M 544 460 C 564 500 572 548 568 596 L 534 590 C 538 548 534 504 522 470 Z" fill={KURTA} stroke={INK} strokeWidth={4.2} />
          <path d="M 272 596 C 270 640 274 680 284 712 L 308 704 C 300 672 298 636 302 600 Z" fill={SKIN_SH} stroke={INK} strokeWidth={3.8} />
          <path d="M 568 596 C 570 640 566 680 556 712 L 532 704 C 540 672 542 636 538 600 Z" fill={SKIN} stroke={INK} strokeWidth={3.8} />
          <HandOpen x={288} y={730} flip />
          <HandOpen x={552} y={730} />
          {/* gamcha tail down the back */}
          <path d="M 470 420 C 492 460 500 520 498 590 C 496 640 490 680 482 706 L 446 700 C 454 660 458 600 454 540 C 452 500 448 460 444 430 Z" fill="url(#gamChecks)" stroke={INK} strokeWidth={4} />
          <path d="M 482 706 l -4 26 M 470 704 l -2 26 M 458 702 l -2 24" stroke={INK} strokeWidth={2.6} />
          {/* dhoti back */}
          <path d="M 306 738 C 296 780 292 830 296 880 C 300 950 302 1020 300 1080 L 540 1080 C 542 1020 544 950 548 880 C 552 830 548 780 538 738 Z" fill={DHOTI} stroke={INK} strokeWidth={4.6} />
          <path d="M 350 742 L 344 1076 M 420 740 L 420 1078 M 490 742 L 496 1076" stroke={DHOTI_SH} strokeWidth={3.2} fill="none" opacity={0.85} />
          <path d="M 302 1056 L 540 1056" stroke={DHOTI_DP} strokeWidth={5} opacity={0.8} />
          {/* legs */}
          <path d="M 334 1080 C 330 1160 334 1260 346 1330 C 352 1370 356 1400 356 1420 L 390 1420 C 392 1380 394 1320 390 1260 C 386 1190 386 1120 390 1080 Z" fill={SKIN_SH} stroke={INK} strokeWidth={4} />
          <path d="M 450 1080 C 446 1160 450 1260 462 1330 C 468 1370 472 1400 472 1420 L 506 1420 C 508 1380 510 1320 506 1260 C 502 1190 502 1120 506 1080 Z" fill={SKIN} stroke={INK} strokeWidth={4} />
          <path d="M 344 1420 C 330 1430 324 1446 330 1458 C 342 1466 376 1466 390 1458 C 394 1444 390 1428 380 1420 Z" fill={SANDAL} stroke={INK} strokeWidth={3.6} />
          <path d="M 460 1420 C 446 1430 440 1446 446 1458 C 458 1466 492 1466 506 1458 C 510 1444 506 1428 496 1420 Z" fill={SANDAL_DK} stroke={INK} strokeWidth={3.6} />
        </g>
      </svg>
    );
  }
  // FRONT (default)
  return (
    <svg viewBox="256 92 330 1424" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g stroke={INK} fill="none">
        {/* ---- legs (behind dhoti) ---- */}
        <path d="M 356 1100 C 350 1180 354 1280 366 1350 C 372 1392 376 1424 376 1444 L 418 1444 C 420 1400 422 1330 418 1260 C 414 1190 414 1130 418 1100 Z" fill={SKIN_SH} stroke={INK} strokeWidth={4} />
        <path d="M 422 1100 C 426 1130 426 1190 422 1260 C 418 1330 420 1400 422 1444 L 464 1444 C 464 1424 468 1392 474 1350 C 486 1280 490 1180 484 1100 Z" fill={SKIN} stroke={INK} strokeWidth={4} />
        {/* calf shading */}
        <path d="M 366 1180 C 362 1240 366 1300 376 1340" stroke={SKIN_SH} strokeWidth={5} fill="none" opacity={0.5} />
        <path d="M 474 1180 C 478 1240 474 1300 464 1340" stroke={SKIN_SH} strokeWidth={5} fill="none" opacity={0.5} />
        {/* ---- sandals + feet ---- */}
        <path d="M 374 1444 C 356 1456 348 1474 356 1486 C 372 1494 414 1494 424 1484 C 428 1470 422 1452 410 1444 Z" fill={SANDAL} stroke={INK} strokeWidth={3.6} />
        <path d="M 430 1444 C 418 1452 412 1470 416 1484 C 430 1494 470 1494 480 1484 C 486 1470 480 1452 466 1444 Z" fill={SANDAL_DK} stroke={INK} strokeWidth={3.6} />
        <path d="M 380 1448 q 14 -6 30 0 M 434 1448 q 14 -6 30 0" stroke={INK} strokeWidth={2.6} fill="none" opacity={0.8} />
        {/* ---- dhoti (knee-length wrap) ---- */}
        <path d="M 306 742 C 292 790 288 840 294 890 C 300 960 302 1030 300 1092 C 336 1112 504 1112 540 1092 C 540 1030 542 960 548 890 C 554 840 550 790 536 742 Z" fill={DHOTI} stroke={INK} strokeWidth={4.8} />
        {/* dhoti side + center shading/folds */}
        <path d="M 306 742 C 292 790 288 840 294 890 C 300 960 302 1030 300 1092 L 344 1096 C 340 1020 340 940 346 870 C 350 820 352 780 356 748 Z" fill="url(#dhotiShade)" stroke="none" />
        <path d="M 536 742 C 550 790 554 840 548 890 C 542 960 540 1030 540 1092 L 496 1096 C 500 1020 500 940 494 870 C 490 820 488 780 484 748 Z" fill="url(#dhotiShade)" stroke="none" transform="scale(-1 1) translate(-840 0)" />
        <path d="M 372 750 L 366 1092 M 420 748 L 420 1094 M 468 750 L 474 1092" stroke={DHOTI_SH} strokeWidth={3.4} fill="none" opacity={0.9} />
        <path d="M 336 770 q 6 160 2 320 M 504 770 q -6 160 -2 320" stroke={DHOTI_SH} strokeWidth={2.6} fill="none" opacity={0.7} />
        <path d="M 302 1068 C 340 1088 500 1088 538 1068" stroke={DHOTI_DP} strokeWidth={5.5} fill="none" opacity={0.85} />
        {/* waist fold */}
        <path d="M 300 800 C 344 818 496 818 540 800" stroke={DHOTI_SH} strokeWidth={4} fill="none" opacity={0.8} />

        {/* ---- kurta ---- */}
        <path
          d="M 402 402 C 356 410 322 428 310 470 C 298 514 296 570 304 616 C 310 656 314 690 318 716 C 348 738 492 738 522 716 C 526 690 530 656 536 616 C 544 570 542 514 530 470 C 518 428 484 410 438 402 Z"
          fill={KURTA}
          stroke={INK}
          strokeWidth={4.8}
        />
        {/* kurta side shading */}
        <path d="M 318 470 C 308 520 308 580 318 632 C 324 668 328 696 332 716 L 366 720 C 358 676 354 620 356 560 C 358 514 362 476 370 452 Z" fill="url(#kurtaShade)" stroke="none" />
        <path d="M 522 470 C 532 520 532 580 522 632 C 516 668 512 696 508 716 L 474 720 C 482 676 486 620 484 560 C 482 514 478 476 470 452 Z" fill="url(#kurtaShade)" stroke="none" transform="scale(-1 1) translate(-840 0)" />
        {/* belly volume + fold */}
        <ellipse cx={420} cy={640} rx={62} ry={44} fill={KURTA_HI} opacity={0.28} filter="url(#ss16)" />
        <path d="M 350 610 C 372 648 468 648 490 610" stroke={KURTA_SH} strokeWidth={3.4} fill="none" opacity={0.75} />
        <path d="M 356 560 q 8 40 4 84 M 484 560 q -8 40 -4 84" stroke={KURTA_SH} strokeWidth={2.8} fill="none" opacity={0.6} />
        <path d="M 334 700 C 360 714 480 714 506 700" stroke={KURTA_DP} strokeWidth={3.4} fill="none" opacity={0.7} />
        {/* placket + buttons + collar */}
        <path d="M 420 402 L 420 712" stroke={KURTA_SH} strokeWidth={3.6} />
        <path d="M 420 430 L 420 700" stroke={KURTA_DP} strokeWidth={1.8} strokeDasharray="2 6" opacity={0.8} />
        {[470, 520, 570, 620].map((by) => (
          <g key={by}>
            <circle cx={420} cy={by} r={6.5} fill={KURTA_DP} stroke={INK} strokeWidth={2} />
            <circle cx={417.5} cy={by - 2} r={2} fill={KURTA_HI} opacity={0.9} />
          </g>
        ))}
        <path d="M 398 404 C 406 418 434 418 442 404" stroke={INK} strokeWidth={3.6} fill="none" />
        <path d="M 398 404 L 388 392 M 442 404 L 452 392" stroke={INK} strokeWidth={3.2} />

        {/* ---- sleeves + arms ---- */}
        {/* left (viewer) upper arm + rolled sleeve */}
        <path d="M 316 470 C 300 500 292 540 294 580 L 342 576 C 340 544 344 510 352 486 Z" fill={KURTA} stroke={INK} strokeWidth={4.2} />
        <rect x={292} y={572} width={52} height={20} rx={8} fill={KURTA_DP} stroke={INK} strokeWidth={3.2} />
        <path d="M 298 594 C 294 640 298 690 310 728 L 342 720 C 332 682 330 640 336 598 Z" fill={SKIN_SH} stroke={INK} strokeWidth={3.8} />
        {/* right upper arm */}
        <path d="M 524 470 C 540 500 548 540 546 580 L 498 576 C 500 544 496 510 488 486 Z" fill={KURTA} stroke={INK} strokeWidth={4.2} />
        <rect x={496} y={572} width={52} height={20} rx={8} fill={KURTA_DP} stroke={INK} strokeWidth={3.2} />
        <path d="M 542 594 C 546 640 542 690 530 728 L 498 720 C 508 682 510 640 504 598 Z" fill={SKIN} stroke={INK} strokeWidth={3.8} />
        <HandOpen x={316} y={748} />
        <HandOpen x={524} y={748} flip />

        {/* ---- gamcha (left shoulder, checked) ---- */}
        <path d="M 352 442 C 322 452 300 470 292 496 C 286 516 288 534 298 544 L 344 536 C 336 516 340 494 356 478 Z" fill="url(#gamChecks)" stroke={INK} strokeWidth={4} />
        <path d="M 340 460 C 330 500 332 560 342 620 C 348 658 356 688 364 706 L 404 696 C 392 660 384 600 384 540 C 384 506 386 478 390 460 Z" fill="url(#gamChecks)" stroke={INK} strokeWidth={4} />
        <path d="M 352 480 C 346 540 350 620 362 690" stroke={GAM} strokeWidth={3} fill="none" opacity={0.5} />
        <path d="M 364 706 l -2 30 M 378 702 l -1 30 M 392 700 l 0 28" stroke={INK} strokeWidth={2.6} />

        {/* ---- neck ---- */}
        <path d="M 392 330 L 390 400 C 408 412 432 412 450 400 L 448 330 Z" fill={SKIN_SH} stroke={INK} strokeWidth={3.8} />
        <path d="M 402 344 C 412 366 428 366 438 344" stroke={SKIN_SH} strokeWidth={4} fill="none" opacity={0.8} />

        {/* ---- head ---- */}
        <FaceReal cx={0} cy={0} scale={1} />
      </g>
    </svg>
  );
};

/* Face close-up crop (for the detail sheet) */
export const FaceCUReal: React.FC = () => (
  <svg viewBox="336 94 168 274" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <Defs />
    <FaceReal cx={0} cy={0} scale={1} />
  </svg>
);

/* Hand + fabric detail crops */
export const DetailCropsReal: React.FC = () => (
  <svg viewBox="0 0 900 400" width="100%">
    <Defs />
    <g transform="translate(40 560)">
      <HandOpen x={280} y={200} />
    </g>
    <text x={300} y={370} textAnchor="middle" fontSize={20} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      হাতের গঠন
    </text>
    <g transform="translate(430 -700)">
      <path d="M 20 760 C 10 800 12 860 22 920 C 28 958 36 988 44 1006 L 84 996 C 72 960 64 900 64 840 C 64 806 66 778 70 760 Z" fill="url(#gamChecks)" stroke={INK} strokeWidth={4} />
      <path d="M 44 1006 l -2 30 M 58 1002 l -1 30 M 72 1000 l 0 28" stroke={INK} strokeWidth={2.6} />
    </g>
    <text x={560} y={370} textAnchor="middle" fontSize={20} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      গামছার বয়ন + ফ্রিঞ্জ
    </text>
    <g transform="translate(680 -660)">
      <path d="M 0 742 C -14 790 -18 840 -12 890 C -6 960 -4 1030 -6 1092 C 30 1112 198 1112 234 1092 C 234 1030 236 960 242 890 C 248 840 244 790 230 742 Z" fill={DHOTI} stroke={INK} strokeWidth={4.8} />
      <path d="M 66 750 L 60 1092 M 114 748 L 114 1094 M 162 750 L 168 1092" stroke={DHOTI_SH} strokeWidth={3.4} fill="none" />
      <path d="M 30 770 q 6 160 2 320 M 198 770 q -6 160 -2 320" stroke={DHOTI_SH} strokeWidth={2.6} fill="none" opacity={0.7} />
    </g>
    <text x={800} y={370} textAnchor="middle" fontSize={20} fill={INK} fontFamily="'Noto Sans Bengali', sans-serif">
      ধুতির ভাঁজ
    </text>
  </svg>
);
