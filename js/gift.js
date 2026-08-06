import { showScene, wait } from "./app.js";
import { audio } from "./audio.js";

let step = 0;
let startX = 0;

export const initGift = () => {
  const gift = document.querySelector("#giftBox");
  const instruction = document.querySelector("#giftInstruction");

  gift.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });

  gift.addEventListener("pointerup", async (event) => {
    const swiped = Math.abs(event.clientX - startX) > 70;
    if (step === 0 && swiped) {
      step = 1;
      gift.classList.add("is-cut");
      instruction.textContent = "Pull the wrapping away.";
      audio.paper();
      return;
    }
    if (step === 1) {
      step = 2;
      gift.classList.add("is-unwrapped");
      instruction.textContent = "Lift the lid.";
      audio.paper();
      return;
    }
    if (step === 2) {
      step = 3;
      instruction.textContent = "A story was hiding inside.";
      await openGift(gift);
    }
  });
};

const openGift = async (gift) => {
  gsap.to(".gift-lid", { y: -80, rotate: -14, duration: 1.1, ease: "power3.out" });
  gsap.to(".gift-light", { opacity: 1, scale: 2.4, duration: 1.6, ease: "power2.out" });
  audio.unlock();
  await wait(1500);
  showScene("book");
};
