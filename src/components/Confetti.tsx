
import { useEffect } from "react";

interface ConfettiProps {
  show: boolean;
  onDone?: () => void;
}

export function Confetti({ show, onDone }: ConfettiProps) {
  useEffect(() => {
    if (!show) return;

    // adapted from https://confettijs.org/ -- simple canvas confetti
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const colors = [
      "#F2FCE2","#FEF7CD","#FEC6A1","#E5DEFF","#FFDEE2",
      "#FDE1D3","#D3E4FD","#F1F0FB","#8B5CF6","#D946EF",
      "#F97316","#0EA5E9","#1EAEDB"
    ];

    const confettiCount = 120;
    const confettiParticles = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: colors[Math.floor(Math.random()*colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.09 + 0.05,
      tiltAngle: 0,
    }));

    let angle = 0;
    let tiltAngle = 0;
    let animationFrame: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiParticles.forEach((p, i) => {
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
      });
      update();
    }

    function update() {
      angle += 0.01;
      tiltAngle += 0.1;
      confettiParticles.forEach((p, i) => {
        p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(angle);
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle - (i % 3)) * 15;

        if (p.y > canvas.height || p.x < -20 || p.x > canvas.width + 20) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * -20;
        }
      });
    }

    function loop() {
      draw();
      animationFrame = requestAnimationFrame(loop);
    }
    loop();

    // Remove canvas after 1600ms
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      document.body.removeChild(canvas);
      if (onDone) onDone();
    }, 1600);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [show, onDone]);

  return null;
}
