(function () {
  if (!window.gsap) {
    const apply = (target, vars = {}) => {
      const nodes = typeof target === "string" ? document.querySelectorAll(target) : [target];
      nodes.forEach((node) => {
        if (!node || !node.style) return;
        if (vars.opacity !== undefined) node.style.opacity = vars.opacity;
        if (vars.scale !== undefined) node.style.transform = `scale(${vars.scale})`;
        if (vars.y !== undefined) node.style.transform = `translateY(${vars.y}px)`;
        if (vars.rotateY !== undefined) node.style.transform = `rotateY(${vars.rotateY}deg)`;
        if (vars.clearProps) node.removeAttribute("style");
      });
      if (typeof vars.onComplete === "function") window.setTimeout(vars.onComplete, (vars.duration || 0) * 1000);
    };
    window.gsap = {
      to: apply,
      set: apply,
      fromTo(target, _fromVars, toVars) { apply(target, toVars); }
    };
  }

  if (!window.St) {
    window.St = {
      PageFlip: class {
        constructor(element) {
          this.element = element;
          this.handlers = {};
        }
        loadFromHTML(pages) {
          this.pages = pages;
          this.element.classList.add("fallback-book");
          pages.forEach((page, index) => {
            page.hidden = index !== 0;
            page.addEventListener("click", () => this.flip(index + 1));
          });
        }
        on(event, handler) {
          this.handlers[event] = handler;
        }
        flip(index) {
          const next = index >= this.pages.length ? this.pages.length - 1 : index;
          this.pages.forEach((page, pageIndex) => {
            page.hidden = pageIndex !== next;
          });
          if (this.handlers.flip) this.handlers.flip({ data: next });
        }
      }
    };
  }

  if (!window.confetti) {
    window.confetti = function () {};
  }
})();
