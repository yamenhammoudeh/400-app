import { SoundConfig } from './types';

// Super Mario style sound configuration
export const SOUND_CONFIG: Record<string, SoundConfig> = {
  click: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav',
    volume: 0.4
  },
  bidLow: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.wav',
    volume: 0.4
  },
  bidMedium: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.wav',
    volume: 0.5
  },
  bidHigh: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-player-boost-recharging-2040.wav',
    volume: 0.6
  },
  success: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.wav',
    volume: 0.5
  },
  fail: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.wav',
    volume: 0.5
  },
  roundComplete: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.wav',
    volume: 0.6
  },
  victory: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-medieval-show-fanfare-announcement-226.wav',
    volume: 0.7
  }
};