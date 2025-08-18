window.SimpleAnime = class {
  constructor() {
    this.items = document.querySelectorAll("[data-anime]");
    this.init();
  }

  animateItem(item) {
    const delay = Number(item.getAttribute("data-anime"));
    if (!isNaN(delay)) {
      setTimeout(() => item.classList.add("anime"), delay);
    } else {
      item.classList.add("anime");
    }
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateItem(entry.target); // entra na tela → anima
        } else {
          entry.target.classList.remove("anime"); // sai da tela → reseta
        }
      });
    }, {
      threshold: 0.1
    });

    this.items.forEach(item => observer.observe(item));
  }
};
