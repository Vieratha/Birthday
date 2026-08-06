import { CONFIG } from "./config.js";
import { showScene, typeText, wait } from "./app.js";
import { audio } from "./audio.js";

export const initLetter = () => {
  const scene = document.querySelector("[data-scene='letter']");
  const observer = new MutationObserver(async () => {
    if (!scene.classList.contains("is-active")) return;
    const text = document.querySelector("#letterText");
    gsap.fromTo(".letter-paper", { y: 80, rotateX: -10, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 1, ease: "power3.out" });
    await wait(850);
    await typeText(text, CONFIG.letter, 30);
    await wait(1600);
    audio.softenMusic();
    showScene("ending");
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 90, scalar: .65, origin: { y: .15 }, colors: ["#b9ddf5", "#f7cddc", "#ffe9a8"] });
    }
  });
  observer.observe(scene, { attributes: true, attributeFilter: ["class"] });
};
