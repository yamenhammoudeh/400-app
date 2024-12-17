import { useEffect, useCallback } from 'react';
import { Howl } from 'howler';

// Sound URLs from reliable CDN sources
const SOUND_URLS = {
  click: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.wav',
  bid: {
    low: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav',
    medium: 'https://assets.mixkit.co/sfx/preview/mixkit-player-boost-recharging-2040.wav',
    high: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-changing-tab-206.wav',
  },
  success: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.wav',
  fail: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.wav',
  roundComplete: 'https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.wav',
  victory: 'https://assets.mixkit.co/sfx/preview/mixkit-medieval-show-fanfare-announcement-226.wav',
};

// Create sound instances with optimized settings
const createSound = (url: string, volume = 0.5) => new Howl({
  src: [url],
  volume,
  html5: true,
  preload: true,
});

// Initialize sound instances
const sounds = {
  click: createSound(SOUND_URLS.click, 0.3),
  bidLow: createSound(SOUND_URLS.bid.low, 0.4),
  bidMedium: createSound(SOUND_URLS.bid.medium, 0.5),
  bidHigh: createSound(SOUND_URLS.bid.high, 0.6),
  success: createSound(SOUND_URLS.success, 0.5),
  fail: createSound(SOUND_URLS.fail, 0.5),
  roundComplete: createSound(SOUND_URLS.roundComplete, 0.6),
  victory: createSound(SOUND_URLS.victory, 0.7),
};

export function useSoundEffects() {
  // Initialize audio context on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      // Resume AudioContext on user interaction
      if (Howler.ctx?.state === 'suspended') {
        Howler.ctx.resume().catch(console.error);
      }
      
      // Preload all sounds
      Object.values(sounds).forEach(sound => {
        if (!sound.state()) {
          sound.load();
        }
      });

      // Remove listeners after first interaction
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const playClick = useCallback(() => {
    try {
      sounds.click.play();
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }, []);

  const playBidSelect = useCallback((bid: number) => {
    try {
      // Choose sound based on bid value
      if (bid <= 7) {
        sounds.bidLow.play();
      } else if (bid <= 16) {
        sounds.bidMedium.play();
      } else {
        sounds.bidHigh.play();
      }
    } catch (error) {
      console.error('Error playing bid sound:', error);
    }
  }, []);

  const playSuccess = useCallback(() => {
    try {
      sounds.success.play();
    } catch (error) {
      console.error('Error playing success sound:', error);
    }
  }, []);

  const playFail = useCallback(() => {
    try {
      sounds.fail.play();
    } catch (error) {
      console.error('Error playing fail sound:', error);
    }
  }, []);

  const playRoundComplete = useCallback(() => {
    try {
      sounds.roundComplete.play();
    } catch (error) {
      console.error('Error playing round complete sound:', error);
    }
  }, []);

  const playVictory = useCallback(() => {
    try {
      sounds.victory.play();
    } catch (error) {
      console.error('Error playing victory sound:', error);
    }
  }, []);

  return {
    playClick,
    playBidSelect,
    playSuccess,
    playFail,
    playRoundComplete,
    playVictory
  };
}