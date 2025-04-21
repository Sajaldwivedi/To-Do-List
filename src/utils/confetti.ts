
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#9b87f5', '#7E69AB', '#6A5ACD', '#8A2BE2'],
  });
};
