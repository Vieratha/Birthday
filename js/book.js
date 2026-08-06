import { showScene, typeText, wait } from "./app.js";
import { audio } from "./audio.js";

let pageFlip;
let typedPages = new WeakSet();

export const initBook = () => {
  const book = document.querySelector("#storybook");
  if (window.St && window.St.PageFlip) {
    pageFlip = new window.St.PageFlip(book, {
      width: 430,
      height: 560,
      size: "stretch",
      minWidth: 300,
      maxWidth: 430,
      minHeight: 420,
      maxHeight: 560,
      showCover: true,
      mobileScrollSupport: false,
      drawShadow: true,
      flippingTime: 950
    });
    pageFlip.loadFromHTML([...document.querySelectorAll(".book-page")]);
    pageFlip.on("flip", ({ data }) => {
      audio.paper();
      typeCurrentPage(data);
    });
  }

  document.querySelector("#envelope").addEventListener("click", async () => {
    audio.paper();
    await wait(300);
    showScene("letter");
  });
};

const typeCurrentPage = (index) => {
  const page = document.querySelectorAll(".book-page")[index];
  const target = page?.querySelector("[data-type]");
  if (!target || typedPages.has(target)) return;
  typedPages.add(target);
  const text = target.textContent;
  typeText(target, text, 24);
};
