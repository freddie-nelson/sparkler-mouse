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

    if (Date.now() - p.created > 300) {
      particles.splice(i, 1);
    }
  }
};

const createParticle = () => {
  particles.push(new Particle(mouse.x, mouse.y, Date.now()));
};

let deltaTime = 0;
let lastFrameTime = Date.now();

const animate = () => {
  ctx.fillStyle = `rgba(0, 0, 0, ${0.15 * (60 / window.FPS)})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (mouse.isPressed) createParticle();
  handleParticles();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 40, 20);

  if (Date.now() - lastFrameTime > 0) deltaTime = Date.now() - lastFrameTime;
  lastFrameTime = Date.now();

  window.FPS = 1000 / deltaTime;

  ctx.font = "bold 16px arial";
  ctx.fillStyle = "white";
  ctx.fillText(`${Math.floor(window.FPS)}`, 5, 18);
};

setInterval(animate, 1000 / window.MAX_FPS);
