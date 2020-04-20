import { Figure } from "./classes/figure.js";

const video = document.createElement("video");
const canvas = document.createElement("canvas");
const saveButton = document.createElement("button");
const playButton = document.createElement("button");
const pauseButton = document.createElement("button");
const storeButton = document.createElement("button");
const nextFrameButton = document.createElement("button");

// document.body.appendChild(video);
document.body.appendChild(canvas);
document.body.appendChild(saveButton);
document.body.appendChild(playButton);
document.body.appendChild(pauseButton);
document.body.appendChild(storeButton);
document.body.appendChild(nextFrameButton);

video.src = "./assets/video.mov";
saveButton.textContent = "SAVE";
playButton.textContent = "PLAY";
pauseButton.textContent = "PAUSE";
storeButton.textContent = "STORE";
nextFrameButton.textContent = "NEXT FRAME";

canvas.width = 700;
canvas.height = 700;

const figure = new Figure(canvas, 700, "#000000");

// requestAnimationFrame(function loop() {
//   canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
//   figure.update();
//   requestAnimationFrame(loop);
// });

let interval = 0;
function play() {
  const flossing: { [key: string]: Figure["articulations"] } = JSON.parse(
    localStorage.getItem("flossing") as string
  );

  const entries = Object.entries(flossing);

  let i = 0;
  let direction = 1;

  interval = setInterval(() => {
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    figure.articulations = entries[i][1];
    figure.update();
    i += direction;
    if (i === entries.length - 1) {
      direction = -1;
    } else if (i === 0) {
      direction = 1;
    }
  }, 1000 / 24);
}

function pause() {
  clearInterval(interval);
}

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

const moves: { [key: string]: Figure["articulations"] } = {};

saveButton.addEventListener("click", () => {
  console.log("save");
  const timeMS = (video.currentTime * 1000).toFixed(0);
  moves[timeMS] = JSON.parse(JSON.stringify(figure.articulations));
});

playButton.addEventListener("click", () => {
  video.play();
  play();
});

pauseButton.addEventListener("click", () => {
  video.pause();
  pause();
});

storeButton.addEventListener("click", () => {
  localStorage.setItem("flossing", JSON.stringify(moves));
});

nextFrameButton.addEventListener("click", () => {
  video.currentTime += 1 / 24;
});
