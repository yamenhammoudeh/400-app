import { Howler } from 'howler';
import { soundInstances } from './instances';

let initialized = false;

export function initializeAudio() {
  if (initialized) return;

  const initAudio = () => {
    // Resume AudioContext if suspended
    if (Howler.ctx?.state === 'suspended') {
      Howler.ctx.resume().catch(console.error);
    }
    
    // Preload all sounds
    Object.values(soundInstances).forEach(sound => {
      if (!sound.state()) {
        sound.load();
      }
    });

    initialized = true;
    
    // Remove listeners after initialization
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
    document.removeEventListener('keydown', initAudio);
  };

  // Add multiple event listeners for better initialization chances
  document.addEventListener('click', initAudio);
  document.addEventListener('touchstart', initAudio);
  document.addEventListener('keydown', initAudio);
  
  // Try to initialize immediately if possible
  initAudio();
}