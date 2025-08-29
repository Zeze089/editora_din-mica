/*
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

*/

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


// Toggle distribuidor details
function toggleDetails(button) {
    const card = button.closest(".distribuidor-card");
    const details = card.querySelector(".distribuidor-details");
    const isActive = details.classList.contains("active");

    if (isActive) {
        details.classList.remove("active");
        button.textContent = "Visualizar Informações";
        button.classList.remove("active");
    } else {
        details.classList.add("active");
        button.textContent = "Ocultar Informações";
        button.classList.add("active");
    }
}


/*
// Header background on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(229, 62, 62, 0.95)";
    } else {
        header.style.background = "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)";
    }
});

*/

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

