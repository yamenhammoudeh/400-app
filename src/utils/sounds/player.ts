import { soundInstances } from './instances';

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