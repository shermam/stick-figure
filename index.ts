import { Figure } from "./classes/figure.js";

const canvas = document.createElement("canvas");

document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

const figure = new Figure(canvas, 500, "#000000");

requestAnimationFrame(function loop() {
  figure.update();
  requestAnimationFrame(loop);
});

type Art = keyof Figure["articulations"];
let isMoving = false;
let closestArticulation: Art = "neck";

canvas.addEventListener("mousedown", (e) => {
  isMoving = true;
  let distance = Infinity;
  let chosenArticulation: Art = "neck";
  for (const [key, value] of Object.entries(figure.articulations)) {
    const newDistance =
      Math.abs(value.x - e.offsetX) ** 2 + Math.abs(value.y - e.offsetY) ** 2;
    if (newDistance < distance) {
      distance = newDistance;
      chosenArticulation = key as Art;
    }
  }
  closestArticulation = chosenArticulation;
});
canvas.addEventListener("mouseup", () => (isMoving = false));
canvas.addEventListener("mousemove", (e) => {
  if (!isMoving) return;
  figure.articulations[closestArticulation].x = e.offsetX;
  figure.articulations[closestArticulation].y = e.offsetY;
});
