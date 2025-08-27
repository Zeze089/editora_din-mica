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

// Configuração padrão para botões (caso não seja especificada)
const defaultButtons = [
    { text: "Ver Mais", link: "#mais", class: "slider-button" },
    { text: "Saiba Mais", link: "#saiba", class: "slider-button" },
    { text: "Conhecer", link: "#conhecer", class: "slider-button" },
    { text: "Contato", link: "#contato", class: "slider-button" }
];

// Configuração específica para cada slider
const slidersConfig = {
    1: {
        buttons: [
            { text: "Literatura Infantil", link: "#design", class: "slider-button" },
            { text: "Educação Ecológica", link: "#consultoria", class: "slider-button" },
            { text: "Canto e acalanto", link: "#especialista", class: "slider-button" },
            { text: "AMIGOS DO TRÂNSITO", link: "#transito", class: "slider-button" }
        ],
        autoSlide: true,
        autoSlideDelay: 5000
    },
    2: {
        buttons: [
            { text: "Ver Educação Infantil", link: "#educacao", class: "slider-button" },
            { text: "Solicitar Catálogo", link: "#catalogo", class: "slider-button" },
            { text: "Conhecer Autores", link: "#autores", class: "slider-button" },
            { text: "Falar Conosco", link: "#contato", class: "slider-button" }
        ],
        autoSlide: true
    },
    3: {
        buttons: [
            { text: "GRAMÁTICA DINÂMICA", link: "#gramatica", class: "slider-button" },
            { text: "PRODUÇÃO TEXTUAL", link: "#producao", class: "slider-button" },
            { text: "(SAEB)", link: "#autores", class: "slider-button" },
            { text: "AFRO-BRASILEIRA", link: "#contato", class: "slider-button" }
        ],
        autoSlide: true,
        autoSlideDelay: 6000
    },
    4: {
        buttons: [
            { text: "REDAÇÃO NO ENEM", link: "#gramatica", class: "slider-button" },
            { text: "GRAMÁTICA APLICADA", link: "#producao", class: "slider-button" },
            { text: "EDUCAÇÃO DE JOVENS E ADULTOS", link: "#autores", class: "slider-button" },
        ],
        autoSlide: false
    },
    5: {
        buttons: [
            { text: "EDUCAÇÃO DE JOVENS E ADULTOS", link: "#gramatica", class: "slider-button" },
            { text: "EDUCAÇÃO DE JOVENS E ADULTOS", link: "#producao", class: "slider-button" },
        ],
        autoSlide: false
    },
    6: {
          buttons: [
            { text: "PRÁTICAS PEDAGÓGICAS NA EDUCAÇÃO INCLUSIVA", link: "#gramatica", class: "slider-button" },
            { text: "AFETIVIDADE E APRENDIZAGEM", link: "#producao", class: "slider-button" },
        ],
        autoSlide: false
    }
};

// Instanciar sliders
let sliders = {};

// Funções globais
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

// Auto-detectar e inicializar todos os sliders
document.addEventListener("DOMContentLoaded", function() {
    // Buscar todos os containers de slider que existem na página
    const sliderContainers = document.querySelectorAll('[id^="slider"]');
    
    sliderContainers.forEach(container => {
        const sliderId = container.id.replace('slider', '');
        const sliderWrapper = document.getElementById(`sliderWrapper${sliderId}`);
        
        if (sliderWrapper) {
            // Contar quantos slides existem
            const slides = sliderWrapper.querySelectorAll('.slide');
            const totalSlides = slides.length;
            
            // Usar configuração específica ou padrão
            const config = slidersConfig[sliderId] || {
                buttons: defaultButtons.slice(0, totalSlides),
                autoSlide: false
            };
            
            // Criar o slider
            sliders[sliderId] = new SliderManager(
                sliderId,
                totalSlides,
                config.buttons,
                config.autoSlide,
                config.autoSlideDelay
            );
        }
    });
});