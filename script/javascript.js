if (window.SimpleAnime) {
  new SimpleAnime();
}

// fazer bolinha do mouse-------------------------------------
const dot = document.getElementById("dot");

let targetX = 0,
  targetY = 0; // posição do mouse
let x = 0,
  y = 0; // posição renderizada
const ease = 0.18; // 0.05 = mais atraso | 0.3 = mais rápido

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

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // animação sequencial dos links
  const links = navLinks.querySelectorAll("li");
  links.forEach((link, index) => {
    if (navLinks.classList.contains("active")) {
      link.style.opacity = 0;
      setTimeout(() => {
        link.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        link.style.opacity = 1;
        link.style.transform = "translateY(0)";
      }, index * 100); // delay sequencial
    } else {
      link.style.opacity = "";
      link.style.transform = "";
      link.style.transition = "";
    }
  });
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
  }, Math.floor(Math.random() * 50) + 20); // intervalos aleatórios para terminar em tempos diferentes
};

// Observer para disparar quando qualquer contador aparecer na tela
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
