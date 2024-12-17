import confetti from 'canvas-confetti';

export function triggerVictoryAnimation() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;
  const colors = ['#FFD700', '#FFA500', '#FF69B4'];

  function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}