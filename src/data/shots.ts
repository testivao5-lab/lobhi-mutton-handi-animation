import part1Json from './shots.part1.json';
import part2Json from './shots.part2.json';
import {FPS} from '../config/constants';

export interface DialogueLine {
  sp: string;
  t: string;
}

export interface ShotChar {
  id: string;
  pos?: string;
  exp?: string;
  act?: string;
  face?: string;
}

export interface Shot {
  id: string;
  scene: number;
  title: string;
  start: number;
  end: number;
  loc: string;
  cam: {type: string; mv: string; focus?: string};
  chars: ShotChar[];
  dlg: DialogueLine[];
  nar?: string;
  sfx?: string[];
  fx?: string[];
  signboard?: string;
  note?: string;
  out?: string;
}

export interface CharacterMeta {
  id: string;
  name: string;
  bn: string;
  role: string;
  look: string;
}

const part1 = part1Json as unknown as {
  meta: {
    title: string;
    fps: number;
    width: number;
    height: number;
    timingSource: string;
    storyboardSeconds: number;
    note: string;
  };
  characters: CharacterMeta[];
  shots: Shot[];
};
const part2 = part2Json as unknown as {shots: Shot[]};

export const META = part1.meta;
export const CHARACTERS: CharacterMeta[] = part1.characters;
export const SHOTS: Shot[] = [...part1.shots, ...part2.shots];

export interface SceneMeta {
  n: number;
  title: string;
  titleBn: string;
  loc: string;
  start: number;
  end: number;
  mood: string;
}

export const SCENES: SceneMeta[] = [
  {n: 1, title: 'The Attractive Handi Shop', titleBn: 'আকর্ষণীয় হাঁড়ির দোকান', loc: 'BG01/BG02 Ramnagar Market', start: 0, end: 60, mood: 'Warm, appetizing, energetic'},
  {n: 2, title: 'Profit Disappointment', titleBn: 'লাভের হতাশা', loc: 'BG03 Bolai\u2019s house', start: 60, end: 90, mood: 'Financial frustration'},
  {n: 3, title: 'Champa Warns Bolai', titleBn: 'চম্পার সতর্কতা', loc: 'BG03 House interior', start: 90, end: 135, mood: 'Emotional disagreement'},
  {n: 4, title: 'Subol Becomes a Competitor', titleBn: 'সুবলের প্রতিযোগিতা', loc: 'BG01/BG02/BG04 Market', start: 135, end: 180, mood: 'Jealousy and competition'},
  {n: 5, title: 'The Fraud Begins', titleBn: 'প্রতারণার সূচনা', loc: 'BG02/BG05 Kitchen & shop', start: 180, end: 240, mood: 'Suspicious, unethical'},
  {n: 6, title: 'Cheap Meat Supplier Fatik', titleBn: 'ফটিকের ফাঁদ', loc: 'BG02/BG06 Shop & back alley', start: 240, end: 300, mood: 'Suspicious business deal'},
  {n: 7, title: 'The Deal and Customer Complaints', titleBn: 'চুক্তি ও ক্রেতাদের অভিযোগ', loc: 'BG02/BG06 Shop', start: 300, end: 390, mood: 'Greed leading to consequences'},
  {n: 8, title: "Tapan's Warning", titleBn: 'তপনের সাবধানবাণী', loc: 'BG02 Bolai\u2019s shop', start: 390, end: 420, mood: 'Serious warning'},
  {n: 9, title: 'The Big Ceremony Order', titleBn: 'বড় অনুষ্ঠানের অর্ডার', loc: 'BG02 Bolai\u2019s shop', start: 420, end: 480, mood: 'Excitement and greed'},
  {n: 10, title: 'The Final Act of Greed', titleBn: 'লোভের চরম সীমা', loc: 'BG02/BG05/BG06 Shop & kitchen', start: 480, end: 540, mood: 'Suspenseful wrongdoing'},
  {n: 11, title: 'The Ceremony Disaster', titleBn: 'অনুষ্ঠানে বিপর্যয়', loc: 'BG07 Raybabu\u2019s garden house', start: 540, end: 615, mood: 'Grand celebration turning into disaster'},
  {n: 12, title: 'The Fraud Is Exposed', titleBn: 'পর্দাফাঁস', loc: 'BG07 Ceremony garden', start: 615, end: 675, mood: 'Dramatic exposure'},
  {n: 13, title: 'Legal Consequences', titleBn: 'আইনি পরিণতি', loc: 'BG07 Ceremony garden', start: 675, end: 720, mood: 'Serious consequences'},
  {n: 14, title: 'Bolai Loses Everything', titleBn: 'সব হারানো', loc: 'BG08 Bolai\u2019s house', start: 720, end: 765, mood: 'Regret and emotional reflection'},
  {n: 15, title: 'A Second Chance', titleBn: 'দ্বিতীয় সুযোগ', loc: 'BG08/BG09 House & new shop', start: 765, end: 810, mood: 'Hope, honesty and redemption'},
];

export const TOTAL_STORYBOARD_SECONDS = SHOTS[SHOTS.length - 1].end;
export const toFrames = (seconds: number): number => Math.round(seconds * FPS);
export const TOTAL_STORYBOARD_FRAMES = toFrames(TOTAL_STORYBOARD_SECONDS);
export const shotFrames = (shot: Shot): number => toFrames(shot.end) - toFrames(shot.start);
