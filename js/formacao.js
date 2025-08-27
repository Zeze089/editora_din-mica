// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.querySelector(".nav-menu");
const menuOverlay = document.getElementById("menuOverlay");

function toggleMenu() {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
}

mobileMenu.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", toggleMenu);

// Fechar menu ao clicar em link
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            toggleMenu();
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

// Header background on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(229, 62, 62, 0.95)";
    } else {
        header.style.background = "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)";
    }
});

// Formations Carousel
let currentFormationIndex = 0;
const totalFormations = 2;

function showFormation(index) {
    const wrapper = document.getElementById("formationsWrapper");
    const dots = document.querySelectorAll(".carousel-dot");

    wrapper.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    currentFormationIndex = index;
}

function nextFormation() {
    const nextIndex = (currentFormationIndex + 1) % totalFormations;
    showFormation(nextIndex);
}

function prevFormation() {
    const prevIndex = (currentFormationIndex - 1 + totalFormations) % totalFormations;
    showFormation(prevIndex);
}

function currentFormation(index) {
    showFormation(index - 1);
}

// Auto-slide for formations (optional)
//setInterval(nextFormation, 8000);

// Touch/swipe support for formations carousel
let formationStartX = 0;
let formationEndX = 0;

const formationsCarousel = document.querySelector(".formations-carousel");
if (formationsCarousel) {
    formationsCarousel.addEventListener("touchstart", (e) => {
        formationStartX = e.changedTouches[0].screenX;
    });

    formationsCarousel.addEventListener("touchend", (e) => {
        formationEndX = e.changedTouches[0].screenX;
        handleFormationSwipe();
    });
}

function handleFormationSwipe() {
    const swipeThreshold = 50;
    const diff = formationStartX - formationEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextFormation();
        } else {
            prevFormation();
        }
    }
}
