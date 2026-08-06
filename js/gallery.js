export const initGallery = () => {
  const lightbox = document.querySelector("#lightbox");
  const caption = document.querySelector("#lightboxCaption");
  const photo = lightbox.querySelector(".lightbox-photo");
  const close = document.querySelector("#lightboxClose");

  document.querySelectorAll(".polaroid").forEach((card, index) => {
    card.addEventListener("click", () => {
      caption.textContent = card.dataset.caption;
      photo.style.background = getComputedStyle(card.querySelector("span")).background;
      lightbox.hidden = false;
      gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: .35 });
      gsap.fromTo(photo, { y: 34, rotate: index - 1 }, { y: 0, rotate: 0, duration: .55, ease: "power3.out" });
    });
  });

  close.addEventListener("click", () => {
    lightbox.hidden = true;
  });
};
