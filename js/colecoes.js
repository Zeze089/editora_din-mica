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

// Sistema de gerenciamento para múltiplos sliders
class SliderManager {
    constructor(sliderId, totalSlides, buttons, autoSlide = false, autoSlideDelay = 5000) {
        this.sliderId = sliderId;
        this.currentSlideIndex = 0;
        this.totalSlides = totalSlides;
        this.buttons = buttons;
        this.autoSlideInterval = autoSlide ? autoSlideDelay : null;
        this.intervalId = null;
        
        this.wrapper = document.getElementById(`sliderWrapper${sliderId}`);
        this.buttonElement = document.getElementById(`sliderButton${sliderId}`);
        
        this.init();
    }
    
    init() {
        this.updateSliderButton();
        if (this.autoSlideInterval) {
            this.startAutoSlide();
        }
        this.setupTouchEvents();
    }
    
    updateSliderButton() {
        if (this.buttonElement && this.buttons[this.currentSlideIndex]) {
            const currentButton = this.buttons[this.currentSlideIndex];
            this.buttonElement.textContent = currentButton.text;
            this.buttonElement.href = currentButton.link;
            this.buttonElement.className = currentButton.class;
        }
    }
    
    showSlide(index) {
        if (!this.wrapper) return;
        
        this.wrapper.style.transform = `translateX(-${index * 100}%)`;
        
        // Atualizar dots específicos deste slider
        const sliderContainer = document.querySelector(`#slider${this.sliderId}`);
        if (sliderContainer) {
            const dots = sliderContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        this.currentSlideIndex = index;
        this.updateSliderButton();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlideIndex + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index - 1);
    }
    
    startAutoSlide() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.nextSlide(), this.autoSlideInterval);
    }
    
    stopAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    setupTouchEvents() {
        if (!this.wrapper) return;
        
        let startX = 0;
        let endX = 0;
        
        const sliderContainer = this.wrapper.closest('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', e => {
                startX = e.changedTouches[0].screenX;
            });
            
            sliderContainer.addEventListener('touchend', e => {
                endX = e.changedTouches[0].screenX;
                this.handleSwipe(startX, endX);
            });
        }
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
}

// Configuração dos sliders
const slidersData = {
    1: {
        totalSlides: 4,
        autoSlide: true, 
        autoSlideDelay: 5000,
        buttons: [
            {
                text: "Literatura Infantil",
                link: "#design",
                class: "slider-button",
            },
            {
                text: "Educação Ecológica",
                link: "#consultoria",
                class: "slider-button",
            },
            {
                text: "Canto e acalanto",
                link: "#especialista",
                class: "slider-button",
            },
            {
                text: "AMIGOS DO TRÂNSITO",
                link: "#transito",
                class: "slider-button",
            }
        ]
    },
    2: {
        totalSlides: 4,
        autoSlide: false,
        buttons: [
            {
                text: "Ver Educação Infantil",
                link: "#educacao",
                class: "slider-button"
            },
            {
                text: "Solicitar Catálogo",
                link: "#catalogo", 
                class: "slider-button"
            },
            {
                text: "Conhecer Autores",
                link: "#autores",
                class: "slider-button"
            },
            {
                text: "Falar Conosco",
                link: "#contato",
                class: "slider-button"
            }
        ]
    }
};

// Instanciar sliders
let sliders = {};

// Funções globais para compatibilidade com o HTML
function nextSlide(sliderId = 1) {
    if (sliders[sliderId]) {
        sliders[sliderId].nextSlide();
    }
}

function prevSlide(sliderId = 1) {
    if (sliders[sliderId]) {
        sliders[sliderId].prevSlide();
    }
}

function currentSlide(index, sliderId = 1) {
    if (sliders[sliderId]) {
        sliders[sliderId].goToSlide(index);
    }
}

// Inicializar sliders quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar slider 1
    if (document.getElementById('sliderWrapper1')) {
        const config1 = slidersData[1];
        sliders[1] = new SliderManager(1, config1.totalSlides, config1.buttons, config1.autoSlide, config1.autoSlideDelay);
    }
    
    // Inicializar slider 2
    if (document.getElementById('sliderWrapper2')) {
        const config2 = slidersData[2];
        sliders[2] = new SliderManager(2, config2.totalSlides, config2.buttons, config2.autoSlide);
    }
});