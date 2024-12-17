import { Howl } from 'howler';
import { SOUND_CONFIG } from './config';

// Create and configure sound instances
export const soundInstances = Object.entries(SOUND_CONFIG).reduce((acc, [key, config]) => {
  acc[key] = new Howl({
    src: [config.src],
    volume: config.volume,
    preload: true,
    html5: true,
    format: ['mp3']
  });
  return acc;
}, {} as Record<string, Howl>);