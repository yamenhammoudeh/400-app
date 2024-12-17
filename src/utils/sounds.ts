import { Howl } from 'howler';

// Sound configuration
const SOUNDS = {
  click: {
    src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav',
    volume: 0.4
  },
  bid: {
    low: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-game-notification-212.wav',
    medium: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.wav',
    high: 'https://assets.mixkit.co/sfx/preview/mixkit-player-boost-recharging-2040.wav'
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

// Create sound instances
const soundInstances = {
  click: new Howl({ src: [SOUNDS.click.src], volume: SOUNDS.click.volume }),
  bidLow: new Howl({ src: [SOUNDS.bid.low], volume: 0.4 }),
  bidMedium: new Howl({ src: [SOUNDS.bid.medium], volume: 0.5 }),
  bidHigh: new Howl({ src: [SOUNDS.bid.high], volume: 0.6 }),
  success: new Howl({ src: [SOUNDS.success.src], volume: SOUNDS.success.volume }),
  fail: new Howl({ src: [SOUNDS.fail.src], volume: SOUNDS.fail.volume }),
  roundComplete: new Howl({ src: [SOUNDS.roundComplete.src], volume: SOUNDS.roundComplete.volume }),
  victory: new Howl({ src: [SOUNDS.victory.src], volume: SOUNDS.victory.volume })
};

// Sound player with error handling
export const playSound = {
  click: () => {
    try {
      soundInstances.click.play();
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  },

  bid: (value: number) => {
    try {
      if (value <= 7) {
        soundInstances.bidLow.play();
      } else if (value <= 16) {
        soundInstances.bidMedium.play();
      } else {
        soundInstances.bidHigh.play();
      }
    } catch (error) {
      console.error('Error playing bid sound:', error);
    }
  },

  success: () => {
    try {
      soundInstances.success.play();
    } catch (error) {
      console.error('Error playing success sound:', error);
    }
  },

  fail: () => {
    try {
      soundInstances.fail.play();
    } catch (error) {
      console.error('Error playing fail sound:', error);
    }
  },

  roundComplete: () => {
    try {
      soundInstances.roundComplete.play();
    } catch (error) {
      console.error('Error playing round complete sound:', error);
    }
  },

  victory: () => {
    try {
      soundInstances.victory.play();
    } catch (error) {
      console.error('Error playing victory sound:', error);
    }
  }
};

// Initialize audio system
(() => {
  const initAudio = () => {
    // Load all sounds
    Object.values(soundInstances).forEach(sound => {
      if (!sound.state()) {
        sound.load();
      }
    });

    // Remove listeners after initialization
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
  };

  // Add listeners for user interaction
  document.addEventListener('click', initAudio);
  document.addEventListener('touchstart', initAudio);
})();