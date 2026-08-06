import { CONFIG } from "./config.js";
import { openDoor } from "./door.js";
import { wait } from "./app.js";
import { audio } from "./audio.js";

let pin = "";
let attempts = 0;

export const initKeypad = () => {
  const keypad = document.querySelector("#keypad");
  const display = document.querySelector("#pinDisplay");
  const message = document.querySelector("#pinMessage");
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "ok"];

  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = key === "clear" ? "C" : key === "ok" ? "OK" : key;
    button.dataset.key = key;
    button.addEventListener("mouseenter", () => audio.hover());
    button.addEventListener("click", () => pressKey(key, display, message));
    keypad.append(button);
  });
};

const pressKey = async (key, display, message) => {
  if (/^\d$/.test(key) && pin.length < 8) pin += key;
  if (key === "clear") pin = "";
  if (key === "ok") {
    if (CONFIG.validPins.includes(pin)) {
      message.textContent = "Unlocked.";
      await openDoor();
      audio.playBirthdayMusic();
      celebrateRoom();
      return;
    }
    attempts += 1;
    pin = "";
    message.textContent = attempts >= 3 ? "Need a clue?" : "The door stays quiet.";
    gsap.fromTo("#keypad", { x: -8 }, { x: 8, duration: .07, repeat: 6, yoyo: true, clearProps: "x" });
    if (attempts >= 3) clueCountdown(message);
  }
  display.textContent = pin.padEnd(8, "-");
};

const clueCountdown = async (message) => {
  for (let seconds = CONFIG.clueCountdownSeconds; seconds > 0; seconds -= 1) {
    message.textContent = `Need a clue? Opening WhatsApp in ${seconds}...`;
    await wait(1000);
  }
  const text = encodeURIComponent(CONFIG.clueMessage);
  window.location.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
};

const celebrateRoom = async () => {
  await wait(900);
  if (window.confetti) {
    window.confetti({ particleCount: 150, spread: 78, origin: { y: .58 }, colors: ["#b9ddf5", "#f7cddc", "#ffe9a8", "#fffaf8"] });
    audio.confetti();
  }
  gsap.fromTo(".celebration-copy", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
  await wait(3300);
  document.querySelector("[data-scene='gift']").classList.add("is-active");
  document.querySelector("[data-scene='room']").classList.remove("is-active");
};
