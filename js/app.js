import { audio } from "./audio.js";
import { initDoor } from "./door.js";
import { initKeypad } from "./keypad.js";
import { initGift } from "./gift.js";
import { initBook } from "./book.js";
import { initGallery } from "./gallery.js";
import { initLetter } from "./letter.js";

const scenes = [...document.querySelectorAll(".scene")];
const starfield = document.querySelector("#starfield");
const context = starfield.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const showScene = (name) => {
  scenes.forEach((scene) => scene.classList.toggle("is-active", scene.dataset.scene === name));
  document.body.dataset.scene = name;
};

export const typeText = async (element, text, speed = 38) => {
  element.textContent = "";
  for (const char of text) {
    element.textContent += char;
    if (!reducedMotion && char.trim()) audio.typing();
    await wait(reducedMotion ? 0 : speed);
  }
};

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setupStars = () => {
  const resize = () => {
    starfield.width = window.innerWidth * window.devicePixelRatio;
    starfield.height = window.innerHeight * window.devicePixelRatio;
  };
  resize();
  window.addEventListener("resize", resize);
  const stars = Array.from({ length: 130 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.7 + .4,
    a: Math.random() * .8 + .2
  }));
  const draw = () => {
    context.clearRect(0, 0, starfield.width, starfield.height);
    stars.forEach((star) => {
      context.globalAlpha = star.a * (.7 + Math.sin(Date.now() / 900 + star.x * 8) * .3);
      context.beginPath();
      context.arc(star.x * starfield.width, star.y * starfield.height, star.r * window.devicePixelRatio, 0, Math.PI * 2);
      context.fillStyle = "#fffaf8";
      context.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
};

const setupParticles = async () => {
  if (!window.tsParticles) return;
  await window.tsParticles.load({
    id: "particles",
    options: {
      fullScreen: false,
      detectRetina: true,
      particles: {
        number: { value: 24 },
        color: { value: ["#f7cddc", "#b9ddf5", "#ffe9a8"] },
        opacity: { value: { min: .18, max: .55 } },
        size: { value: { min: 1, max: 4 } },
        move: { enable: true, speed: .45, direction: "top", outModes: "out" }
      }
    }
  });
};

const startStory = async () => {
  audio.init();
  setupStars();
  setupParticles();
  await wait(2300);
  showScene("door");
  audio.playAmbient();
  await initDoor();
};

document.addEventListener("DOMContentLoaded", () => {
  initKeypad();
  initGift();
  initBook();
  initGallery();
  initLetter();
  startStory();
});
