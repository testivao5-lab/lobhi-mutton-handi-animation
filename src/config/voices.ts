import React from 'react';

/**
 * Voice Bible — code mirror of docs/voice-bible.md (master prompt §5).
 * Every voice below was auditioned and SELECTED by the owner.
 * Never replace a voice without asking the owner first.
 */

export interface VoiceAssignment {
  role: string;
  characterId?: string;
  voiceId: string;
  language: 'bn';
}

export const VOICES: Record<string, VoiceAssignment> = {
  NAR: {role: 'Narrator', voiceId: 'voice-10', language: 'bn'},
  C01: {role: 'Bolai', characterId: 'C01', voiceId: 'voice-11', language: 'bn'},
  C02: {role: 'Champa', characterId: 'C02', voiceId: 'voice-20', language: 'bn'},
  C03: {role: 'Subol', characterId: 'C03', voiceId: 'voice-15', language: 'bn'},
  C04: {role: 'Tapan', characterId: 'C04', voiceId: 'voice-14', language: 'bn'},
  C05: {role: 'Fatik', characterId: 'C05', voiceId: 'voice-13', language: 'bn'},
  C06: {role: 'Soumen', characterId: 'C06', voiceId: 'voice-22', language: 'bn'},
  C07: {role: 'Bhavesh Kaka', characterId: 'C07', voiceId: 'voice-16', language: 'bn'},
  C08: {role: 'Prabhat Moshai', characterId: 'C08', voiceId: 'voice-19', language: 'bn'},
  C09: {role: 'Raybabu', characterId: 'C09', voiceId: 'voice-17', language: 'bn'},
  C10: {role: 'Daroga Babu', characterId: 'C10', voiceId: 'voice-18', language: 'bn'},
  C11: {role: 'Food Officer', characterId: 'C11', voiceId: 'voice-21', language: 'bn'},
};

export const voiceFor = (speakerId: string): VoiceAssignment | undefined =>
  VOICES[speakerId];
