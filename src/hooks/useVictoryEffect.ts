import { useEffect } from 'react';
import { triggerVictoryAnimation } from '../utils/victory';
import { playSound } from '../utils/sounds';

export function useVictoryEffect() {
  useEffect(() => {
    // Play victory sound and trigger animation
    playSound.victory();
    triggerVictoryAnimation();
  }, []);
}