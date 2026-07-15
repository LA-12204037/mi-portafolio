/* ==========================================================================
   LÓGICA DE INTERACTIVIDAD GENERAL (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos clave
    const header = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    /* ==========================================================================
       0.5. MODO CLARO / OSCURO (Toggle)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            if (isLight) {
                // Modo Claro: ícono negro
                themeToggleIcon.style.filter = 'brightness(0)';
            } else {
                // Modo Oscuro: ícono blanco
                themeToggleIcon.style.filter = 'brightness(0) invert(1)';
            }
        });
    }

    /* ==========================================================================
       0. MENÚ MÓVIL (Toggle)
       ========================================================================== */
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       1. EFECTO DEL HEADER AL HACER SCROLL (Cambio de tamaño)
       ========================================================================== */
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);

    /* ==========================================================================
       2. SCROLL SPY (Iluminar menú según la sección actual)
       ========================================================================== */
    const scrollSpy = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 100)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       3. ANIMACIÓN DE ENTRADA Y CONTADOR DINÁMICO PARA LAS GRÁFICAS CIRCULARES
       ========================================================================== */
    const animateNumber = (element, targetValue) => {
        let currentValue = 0;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);

        const timer = setInterval(() => {
            currentValue += 1;
            element.textContent = `${currentValue}%`;
            if (currentValue >= targetValue) {
                element.textContent = `${targetValue}%`;
                clearInterval(timer);
            }
        }, stepTime);
    };

    const animateSkillsCircles = () => {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 80;

            if (cardTop < triggerPoint && !card.classList.contains('animated')) {
                card.classList.add('animated');
                const progressCircle = card.querySelector('.progress-bar');
                const percentText = card.querySelector('.percentage-text');

                if (percentText && progressCircle) {
                    const targetPercent = parseInt(percentText.textContent, 10) || 0;
                    percentText.textContent = "0%";
                    const offsetValue = (345.575 * targetPercent) / 100;

                    setTimeout(() => {
                        progressCircle.style.setProperty('stroke-dasharray', `${offsetValue}, 345.575`, 'important');
                    }, 100);
                    animateNumber(percentText, targetPercent);
                }
            }
        });
    };

    window.addEventListener('scroll', animateSkillsCircles);
    animateSkillsCircles(); // Ejecución inicial
    setTimeout(animateSkillsCircles, 500); // Refuerzo de carga

    /* ==========================================================================
       4. EFECTO SPOTLIGHT INTERACTIVO EN TARJETAS DE PROYECTOS
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.08), transparent 40%), var(--bg-secondary)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-secondary)';
        });
    });

    // Forzar la navegación de las tarjetas de habilidades
    document.querySelectorAll('.skill-interactive-badge').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetUrl = button.getAttribute('href');
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });
});