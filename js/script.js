// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});


// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            // Close mobile menu if open
            navMenu.classList.remove("active");
            const icon = mobileMenuBtn.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        }
    });
});



// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

// Form submission
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    e.target.reset();
});




 class Carousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 6;
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicators = document.querySelectorAll('.indicator');
                this.autoPlayInterval = null;
                
                this.init();
            }

            init() {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });

                // Auto-play
                this.startAutoPlay();
                
                // Pause auto-play on hover
                const container = document.querySelector('.carousel-container');
                container.addEventListener('mouseenter', () => this.stopAutoPlay());
                container.addEventListener('mouseleave', () => this.startAutoPlay());

                // Touch/swipe support
                this.addTouchSupport();
            }

            updateCarousel() {
                const translateX = -this.currentSlide * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }

            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }

            addTouchSupport() {
                let startX = 0;
                let endX = 0;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });

                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;

                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                });
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new Carousel();
        });






// CARROCEL DISTRIBUIDORES HOME

class DistributorCarousel {
            constructor() {
                this.carousel = document.getElementById('carousel');
                this.indicators = document.querySelectorAll('.indicator');
                this.cards = document.querySelectorAll('.distributor-card');
                this.currentSlide = 0;
                this.totalSlides = this.cards.length;
                this.autoplayInterval = null;
                this.isUserInteracting = false;
                
                // Drag variables
                this.isDragging = false;
                this.startPos = 0;
                this.currentTranslate = 0;
                this.prevTranslate = 0;
                this.animationId = 0;
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.updateCarousel();
                this.startAutoplay();
            }

            setupEventListeners() {
                // Indicators click
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        this.goToSlide(index);
                        this.resetAutoplay();
                    });
                });

                // Mouse events for drag
                this.carousel.addEventListener('mousedown', this.dragStart.bind(this));
                this.carousel.addEventListener('mousemove', this.dragMove.bind(this));
                this.carousel.addEventListener('mouseup', this.dragEnd.bind(this));
                this.carousel.addEventListener('mouseleave', this.dragEnd.bind(this));

                // Touch events for mobile
                this.carousel.addEventListener('touchstart', this.dragStart.bind(this));
                this.carousel.addEventListener('touchmove', this.dragMove.bind(this));
                this.carousel.addEventListener('touchend', this.dragEnd.bind(this));

                // Pause autoplay on hover
                this.carousel.addEventListener('mouseenter', () => {
                    this.isUserInteracting = true;
                    this.stopAutoplay();
                });

                this.carousel.addEventListener('mouseleave', () => {
                    if (!this.isDragging) {
                        this.isUserInteracting = false;
                        this.startAutoplay();
                    }
                });

                // Prevent context menu
                this.carousel.addEventListener('contextmenu', e => e.preventDefault());
            }

            dragStart(event) {
                this.isDragging = true;
                this.carousel.classList.add('dragging');
                this.startPos = this.getPositionX(event);
                this.animationId = requestAnimationFrame(this.animation.bind(this));
                this.stopAutoplay();
            }

            dragMove(event) {
                if (!this.isDragging) return;
                
                event.preventDefault();
                const currentPosition = this.getPositionX(event);
                this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
            }

            dragEnd() {
                if (!this.isDragging) return;
                
                this.isDragging = false;
                this.carousel.classList.remove('dragging');
                cancelAnimationFrame(this.animationId);

                const movedBy = this.currentTranslate - this.prevTranslate;
                const threshold = 100; // Minimum distance to change slide

                if (movedBy < -threshold && this.currentSlide < this.totalSlides - 1) {
                    this.currentSlide += 1;
                } else if (movedBy > threshold && this.currentSlide > 0) {
                    this.currentSlide -= 1;
                }

                this.setPositionByIndex();
                this.updateIndicators();
                
                setTimeout(() => {
                    if (!this.isUserInteracting) {
                        this.startAutoplay();
                    }
                }, 1000);
            }

            getPositionX(event) {
                return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            }

            animation() {
                this.setSliderPosition();
                if (this.isDragging) {
                    requestAnimationFrame(this.animation.bind(this));
                }
            }

            setSliderPosition() {
                this.carousel.style.transform = `translateX(${this.currentTranslate}px)`;
            }

            setPositionByIndex() {
                const cardWidth = 350 + 32; // card width + margin
                this.currentTranslate = this.currentSlide * -cardWidth;
                this.prevTranslate = this.currentTranslate;
                this.setSliderPosition();
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }

            updateCarousel() {
                this.setPositionByIndex();
                this.updateIndicators();
            }

            updateIndicators() {
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }

            startAutoplay() {
                if (this.autoplayInterval) return;
                
                this.autoplayInterval = setInterval(() => {
                    if (!this.isUserInteracting && !this.isDragging) {
                        this.nextSlide();
                    }
                }, 4000); // 4 seconds
            }

            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            }

            resetAutoplay() {
                this.stopAutoplay();
                setTimeout(() => {
                    if (!this.isUserInteracting) {
                        this.startAutoplay();
                    }
                }, 2000);
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new DistributorCarousel();
        });

        // Smooth scrolling for explore button (if needed)
        document.querySelector('.btn-explore').addEventListener('click', (e) => {
            e.preventDefault();
            // Add your navigation logic here
            console.log('Explorar distribuidores clicked!');
        });





//Efeito letras

 