import Particle from "./js/Particle";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouse = {
  isPressed: false,
  x: 0,
  y: 0,
};

window.addEventListener("mousedown", () => (mouse.isPressed = true));
window.addEventListener("mouseup", () => (mouse.isPressed = false));

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let particles: Particle[] = [];

const handleParticles = () => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.update();
    p.draw();

    if (Date.now() - p.created > 500) {
      particles.splice(i, 1);
    }
  }
};

const createParticle = () => {
  particles.push(new Particle(mouse.x, mouse.y, Date.now()));
};

let frameCount = 0;
const MAX_FPS = 60;

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isPressed) createParticle();
  handleParticles();
  requestAnimationFrame(animate);

  frameCount++;
  if (frameCount > MAX_FPS) frameCount = 0;
};

animate();
