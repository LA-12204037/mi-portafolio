/* ==========================================================================
   LÓGICA DE INTERACTIVIDAD GENERAL (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos clave
    const header = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillCards = document.querySelectorAll('.skill-card');

    /* ==========================================================================
       1. EFECTO DEL HEADER AL HACER SCROLL (Cambio de tamaño)
       ========================================================================== */
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = 'none';
        }
    };

    /* ==========================================================================
       2. SCROLL SPY (Iluminar menú según la sección actual)
       ========================================================================== */
    const scrollSpy = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            // Si el scroll pasó el inicio de la sección restando la altura del menú (100px)
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

    /* ==========================================================================
    3. ANIMACIÓN DE ENTRADA Y CONTADOR DINÁMICO PARA LAS GRÁFICAS CIRCULARES
    ========================================================================== */
    const animateNumber = (element, targetValue) => {
        let currentValue = 0;
        const duration = 1500; // 1.5 segundos de animación fluida
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
        // Volvemos a seleccionar las tarjetas dentro de la función por si acaso
        const cards = document.querySelectorAll('.skill-card');

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 80;

            if (cardTop < triggerPoint && !card.classList.contains('animated')) {
                card.classList.add('animated');

                const progressCircle = card.querySelector('.progress-bar');
                const percentText = card.querySelector('.percentage-text');

                if (percentText && progressCircle) {
                    // Obtenemos el porcentaje directamente del texto HTML (85, 70, 75)
                    const targetPercent = parseInt(percentText.textContent, 10) || 0;

                    // Reiniciamos el texto para la animación
                    percentText.textContent = "0%";

                    // Fórmula matemática exacta para la circunferencia de 345
                    const offsetValue = 345 - (345 * targetPercent) / 100;

                    // Forzamos la inyección directa en el atributo de estilo CSS inline
                    setTimeout(() => {
                        progressCircle.style.setProperty('stroke-dashoffset', offsetValue, 'important');
                    }, 100);

                    // Iniciamos el contador
                    animateNumber(percentText, targetPercent);
                }
            }
        });
    };

    // Asegurar que escuche el scroll y la carga inicial del DOM
    window.addEventListener('scroll', animateSkillsCircles);
    document.addEventListener('DOMContentLoaded', animateSkillsCircles);
    // Por si Vite recarga en caliente
    setTimeout(animateSkillsCircles, 500);

    /* ==========================================================================
           4. EFECTO SPOTLIGHT INTERACTIVO EN TARJETAS DE PROYECTOS
           ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calcula las coordenadas relativas del cursor dentro de la tarjeta
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Inyecta un gradiente radial dinámico que persigue al cursor
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.08), transparent 40%), var(--bg-secondary)`;
        });

        // Limpia el efecto cuando el mouse sale de la tarjeta
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-secondary)';
        });
    });
});
// Forzar la navegación de las tarjetas de habilidades
document.querySelectorAll('.skill-interactive-badge').forEach(button => {
    button.addEventListener('click', (e) => {
        // Obtenemos el enlace del atributo href
        const targetUrl = button.getAttribute('href');
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});