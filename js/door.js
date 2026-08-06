import { showScene, typeText, wait } from "./app.js";
import { audio } from "./audio.js";

let knocks = 0;

export const initDoor = async () => {
  const prompt = document.querySelector("#doorPrompt");
  const door = document.querySelector("#storyDoor");
  const knockLights = [...document.querySelectorAll("#knockCount span")];
  const doorLight = door.querySelector(".door-light");

  await typeText(prompt, "Someone has been waiting for you...");
  await wait(700);
  await typeText(prompt, "Maybe behind this door.");
  await wait(700);
  await typeText(prompt, "Knock three times.");

  const knock = () => {
    if (knocks >= 3) return;
    knocks += 1;
    audio.knock();
    knockLights[knocks - 1].classList.add("is-lit");
    gsap.fromTo(door, { x: -6 }, { x: 6, duration: .08, repeat: 5, yoyo: true, clearProps: "x" });
    gsap.to(doorLight, { scaleX: .5 + knocks * .34, opacity: .65 + knocks * .1, duration: .45 });
    if (knocks === 3) {
      audio.unlock();
      typeText(prompt, "It knows you.").then(async () => {
        await wait(850);
        showScene("pin");
      });
    }
  };

  door.addEventListener("click", knock);
  door.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      knock();
    }
  });
};

export const openDoor = async () => {
  showScene("door");
  const door = document.querySelector("#storyDoor");
  gsap.to(door, { rotateY: -76, x: -28, duration: 2.4, ease: "power3.inOut" });
  gsap.to("#experience", { scale: 1.08, duration: 2.4, ease: "power3.inOut" });
  await wait(2100);
  gsap.set("#experience", { clearProps: "scale" });
  showScene("room");
};
