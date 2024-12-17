import { Howl, Howler } from 'howler';
import { SOUND_CONFIG } from './config';
import { SoundType } from './types';

class SoundManager {
  private sounds: Map<string, Howl>;
  private initialized: boolean;

  constructor() {
    this.sounds = new Map();
    this.initialized = false;
    this.initializeSounds();
  }

  private initializeSounds() {
    Object.entries(SOUND_CONFIG).forEach(([key, config]) => {
      this.sounds.set(key, new Howl({
        src: [config.src],
        volume: config.volume,
        preload: true,
        html5: true
      }));
    });
  }

  public initialize() {
    if (this.initialized) return;

    const initAudio = () => {
      if (Howler.ctx?.state === 'suspended') {
        Howler.ctx.resume().catch(console.error);
      }

      this.sounds.forEach(sound => {
        if (!sound.state()) {
          sound.load();
        }
      });

      this.initialized = true;
      this.removeEventListeners();
    };

    this.addEventListeners(initAudio);
    initAudio(); // Try to initialize immediately
  }

  private addEventListeners(handler: () => void) {
    document.addEventListener('click', handler);
    document.addEventListener('touchstart', handler);
    document.addEventListener('keydown', handler);
  }

  private removeEventListeners() {
    const noop = () => {};
    document.removeEventListener('click', noop);
    document.removeEventListener('touchstart', noop);
    document.removeEventListener('keydown', noop);
  }

  public play(type: SoundType) {
    try {
      const sound = this.sounds.get(type);
      if (sound) {
        sound.play();
      }
    } catch (error) {
      console.error(`Error playing ${type} sound:`, error);
    }
  }
}

export const soundManager = new SoundManager();