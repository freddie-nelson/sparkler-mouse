const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const FRICTION = 0.5;
const WEIGHT = 2;

export default class Particle {
  x: number;
  y: number;
  size: number;
  velY: number;
  velX: number;
  direction: -1 | 1;
  fill: string;
  created: number;

  constructor(x: number, y: number, created: number) {
    this.x = x;
    this.y = y;
    this.size = 8;
    this.created = created;

    this.direction = Math.random() > 0.5 ? 1 : -1;

    this.velY = Math.random() * 30 - 30;
    this.velX = (Math.random() * 10 + 10) * this.direction;

    this.fill = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )})`;
  }

  update() {
    this.y += this.velY;
    this.x += this.velX;

    this.velX -= FRICTION * this.direction;
    this.velY += WEIGHT;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
}
