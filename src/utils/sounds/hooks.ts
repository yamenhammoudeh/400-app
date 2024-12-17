import { useEffect } from 'react';
import { soundManager } from './manager';

export function useSoundSystem() {
  useEffect(() => {
    soundManager.initialize();
  }, []);

  return soundManager;
}