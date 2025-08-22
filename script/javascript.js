if (window.SimpleAnime) {
  new SimpleAnime();
}

// fazer bolinha do mouse-------------------------------------
const dot = document.getElementById("dot");

let targetX = 0,
  targetY = 0;
let x = 0,
  y = 0;
const ease = 0.18;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function loop() {
  x += (targetX - x) * ease;
  y += (targetY - y) * ease;
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  requestAnimationFrame(loop);
}
loop();

// menu hamburguer ------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function animateLinks(open) {
  const links = navLinks.querySelectorAll("li");
  links.forEach((link, index) => {
    if (open) {
      link.style.opacity = 0;
      setTimeout(() => {
        link.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        link.style.opacity = 1;
        link.style.transform = "translateY(0)";
      }, index * 100);
    } else {
      link.style.opacity = "";
      link.style.transform = "";
      link.style.transition = "";
    }
  });
}

hamburger.addEventListener("click", (e) => {
  navLinks.classList.toggle("active");
  animateLinks(navLinks.classList.contains("active"));
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinks.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickOnHamburger &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    animateLinks(false);
  }
});

//numero aleatorios ---------------------------------
const counters = document.querySelectorAll(".contador");

const animateCounter = (el) => {
  let target = el.getAttribute("data-target");
  let isPercent = false;
  let isPlus = false;

  if (target.includes("%")) {
    isPercent = true;
    target = parseInt(target);
  } else if (target.includes("+")) {
    isPlus = true;
    target = parseInt(target);
  } else {
    target = parseInt(target);
  }

  let current = 0;

  const interval = setInterval(() => {
    const randomStep =
      Math.floor(Math.random() * Math.max(1, target * 0.05)) + 1;
    current += randomStep;

    if (current >= target) {
      current = target;
      clearInterval(interval);
    }

    el.textContent = isPercent
      ? current + "%"
      : isPlus
      ? "+" + current
      : "+" + current;
  }, Math.floor(Math.random() * 50) + 20);
};
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

//animção scrol ------------------------------------------------
const carrossel = document.querySelector(".carrossel-container");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

next.addEventListener("click", () => {
  carrossel.scrollBy({ left: carrossel.clientWidth, behavior: "smooth" });
});

prev.addEventListener("click", () => {
  carrossel.scrollBy({ left: -carrossel.clientWidth, behavior: "smooth" });
});

const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  const container = document.querySelector(".scroll-container");
  const activeSlide = slides[index];
  const containerCenter = container.offsetWidth / 2;
  const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
  container.scrollLeft = slideCenter - containerCenter;

  currentIndex = index;
}

slides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    updateSlide(i);
  });
});

updateSlide(0);

function fitText(el) {
  const parent = el.parentElement;
  el.style.whiteSpace = "nowrap"; // linha única
  el.style.display = "inline-block";

  let fontSize = 10;
  el.style.fontSize = fontSize + "px";

  while (el.scrollWidth <= parent.clientWidth && fontSize < 500) {
    fontSize++;
    el.style.fontSize = fontSize + "px";
  }

  el.style.fontSize = fontSize - 1 + "px";
}

const h1 = document.querySelector(".letreiro h1");
fitText(h1);

window.addEventListener("resize", () => fitText(h1));

const onlyLetters = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
};

document.getElementById("nome").addEventListener("input", onlyLetters);
document.getElementById("pais").addEventListener("input", onlyLetters);
document.getElementById("cidade").addEventListener("input", onlyLetters);

document.getElementById("telefone").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
});


window.addEventListener("load", () => {
  const loading = document.getElementById("loading");

  setTimeout(() => {
    loading.classList.add("hidden");
  }, 1500);
});