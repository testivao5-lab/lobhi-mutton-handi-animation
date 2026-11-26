import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {DirectionPanel, ConceptSpec} from '../components/characters/ConceptSheet';
import {INK} from '../three/ink';

const {fontFamily} = loadFont();

/*
 * Gate 2 — বলাই (Bolai) concept DESIGN PROPOSAL: 3 directions.
 * Static design sheet (frame 0). Owner picks A/B/C before rig implementation.
 * Code-rendered only — no AI images (V6 Control Brief §4).
 */

const A: ConceptSpec = {
  id: 'bolai-a',
  letter: 'A',
  title: 'মেহনতি হাটের দোকানদার',
  note: 'প্রথম দৃশ্যের সরল-গর্বিত বলাই; লোভ ধীরে ভঙ্গি ও চেহারা বদলায়। আগে অনুমোদিত বৈশিষ্ট্য (সরিষা কুর্তা, ক্রিম ধুতি, লাল-চেক গামছা কাঁধে, মোটা গোঁফ, পেট) ধরে রাখে — ধারাবাহিকতা সবচেয়ে নিরাপদ।',
  skin: '#EDB27E',
  skinShade: '#CE8D54',
  hair: '#26190F',
  top: '#E9A63A',
  topShade: '#C67F1E',
  bottom: '#F5ECDA',
  bottomShade: '#D5C39E',
  gamcha: '#C6402F',
  gamchaCheck: true,
  gamchaWhere: 'shoulder',
  belly: 0.45,
  shoulder: 34,
  tall: 1.0,
  moustache: 'thick',
  brow: 'normal',
  heads: '৪.২ হেড',
  palette: [
    {name: 'সরিষা কুর্তা', hex: '#E9A63A'},
    {name: 'ক্রিম ধুতি', hex: '#F5ECDA'},
    {name: 'লাল গামছা', hex: '#C6402F'},
    {name: 'ত্বক', hex: '#EDB27E'},
  ],
};

const B: ConceptSpec = {
  id: 'bolai-b',
  letter: 'B',
  title: 'রাঁধুনি-কারিগর ভাব',
  note: 'লম্বা, চওড়া কাঁধ নয় — কারিগরি শরীর; কোমরে বেইজ এপ্রন, কোমরে মেরুন গামছা। রান্না/পরিবেশনের দৃশ্যে সবচেয়ে বিশ্বাসযোগ্য; লোভের পর্বে এপ্রনের গিরিট ঢিলা হয়ে যায় (ভিজ্যুয়াল আর্ক)।',
  skin: '#E8B482',
  skinShade: '#CD9051',
  hair: '#312012',
  top: '#3E5C7E',
  topShade: '#2E4664',
  bottom: '#E8DCC4',
  bottomShade: '#C9BD9F',
  gamcha: '#8A3E1E',
  gamchaCheck: false,
  gamchaWhere: 'waist',
  apron: '#D9C39A',
  belly: 0.3,
  shoulder: 31,
  tall: 1.06,
  moustache: 'thin',
  brow: 'normal',
  heads: '৪.৫ হেড',
  palette: [
    {name: 'নীল কুর্তা', hex: '#3E5C7E'},
    {name: 'বেইজ এপ্রন', hex: '#D9C39A'},
    {name: 'মেরুন গামছা', hex: '#8A3E1E'},
    {name: 'ত্বক', hex: '#E8B482'},
  ],
};

const C: ConceptSpec = {
  id: 'bolai-c',
  letter: 'C',
  title: 'ভারী বণিক-ভাব',
  note: 'ভারী পেট, ভারী ভ্রু, মাথায় সবুজ-চেক গামছা (হাটের ঐতিহ্য)। লোভের পোস্টুরে কুঁজো হওয়া সবচেয়ে সহজ — পরিণতির দৃশ্যে চ্যাপ্টা হয়ে যায়। ঝুঁকি: প্রথম দৃশ্য থেকেই 'সুড়ঙ্গ-চোখে' দেখাতে পারে।',
  skin: '#E2A870',
  skinShade: '#C68A4E',
  hair: '#1E130C',
  top: '#D97F2B',
  topShade: '#B5621C',
  bottom: '#F6F2E8',
  bottomShade: '#D8D2C2',
  gamcha: '#3E6E50',
  gamchaCheck: true,
  gamchaWhere: 'head',
  belly: 0.75,
  shoulder: 36,
  tall: 0.97,
  moustache: 'thick',
  brow: 'heavy',
  heads: '৪.০ হেড',
  palette: [
    {name: 'জাফরান কুর্তা', hex: '#D97F2B'},
    {name: 'সাদা লুঙ্গি', hex: '#F6F2E8'},
    {name: 'সবুজ গামছা', hex: '#3E6E50'},
    {name: 'ত্বক', hex: '#E2A870'},
  ],
};

export const ConceptBolai: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#EFE3C8', fontFamily}}>
      <div style={{position: 'absolute', left: 40, top: 18, fontSize: 34, fontWeight: 700, color: INK}}>
        গেট ২ · বলাই — কনসেপ্ট ডিজাইন প্রস্তাব (৩টি দিক)
      </div>
      <div style={{position: 'absolute', left: 40, top: 58, fontSize: 17, color: '#6E5A3E'}}>
        একটি দিক বেছে নিন — অনুমোদনের পরেই সেই দিকে রিগ + এক্সপ্রেশন + ওয়াক প্রিভিউ তৈরি হবে
      </div>
      <DirectionPanel s={A} x={20} y={88} />
      <DirectionPanel s={B} x={620} y={88} />
      <DirectionPanel s={C} x={1220} y={88} />
    </AbsoluteFill>
  );
};
