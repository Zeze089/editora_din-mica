        // Estado dos carrosséis
        const carouselStates = {};

        // Inicializar carrosséis
        function initCarousels() {
            const categories = ['infantil', 'literatura', 'canto', 'ecologica', 'transito', 'afro'];
            
            categories.forEach(category => {
                const carousel = document.getElementById(`carousel-${category}`);
                const books = carousel.children.length;
                
                carouselStates[category] = {
                    currentIndex: 0,
                    totalBooks: books,
                    booksPerView: window.innerWidth <= 768 ? 2 : 4
                };
                
                createIndicators(category);
                updateCarousel(category);
            });
        }

        // Criar indicadores
        function createIndicators(category) {
            const indicatorsContainer = document.getElementById(`indicators-${category}`);
            const totalSlides = Math.ceil(carouselStates[category].totalBooks / carouselStates[category].booksPerView);
            
            indicatorsContainer.innerHTML = '';
            
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
                indicator.onclick = () => goToSlide(category, i);
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Mover carrossel
        function moveCarousel(category, direction) {
            const state = carouselStates[category];
            const maxIndex = Math.ceil(state.totalBooks / state.booksPerView) - 1;
            
            state.currentIndex += direction;
            
            if (state.currentIndex < 0) {
                state.currentIndex = maxIndex;
            } else if (state.currentIndex > maxIndex) {
                state.currentIndex = 0;
            }
            
            updateCarousel(category);
        }

        // Ir para slide específico
        function goToSlide(category, index) {
            carouselStates[category].currentIndex = index;
            updateCarousel(category);
        }

        // Atualizar carrossel
        function updateCarousel(category) {
            const carousel = document.getElementById(`carousel-${category}`);
            const state = carouselStates[category];
            const translateX = -(state.currentIndex * (220 * state.booksPerView));
            
            carousel.style.transform = `translateX(${translateX}px)`;
            
            // Atualizar indicadores
            const indicators = document.querySelectorAll(`#indicators-${category} .indicator`);
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === state.currentIndex);
            });
        }

        // Scroll suave para seção
        function scrollToSection() {
            document.getElementById('catalogs').scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Efeito ripple no botão
        function createRipple(event) {
            const button = event.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Adicionar eventos
        document.querySelector('.cta-button').addEventListener('click', createRipple);

        // Auto-play dos carrosséis
        function autoPlayCarousels() {
            const categories = Object.keys(carouselStates);
            categories.forEach(category => {
                moveCarousel(category, 1);
            });
        }

        // Inicializar quando carregar
        window.addEventListener('load', () => {
            initCarousels();
            
            // Auto-play a cada 5 segundos
            setInterval(autoPlayCarousels, 5000);
        });

        // Responsividade
        window.addEventListener('resize', () => {
            const newBooksPerView = window.innerWidth <= 768 ? 2 : 4;
            
            Object.keys(carouselStates).forEach(category => {
                carouselStates[category].booksPerView = newBooksPerView;
                carouselStates[category].currentIndex = 0;
                createIndicators(category);
                updateCarousel(category);
            });
        });

        // Adicionar estilo para ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);