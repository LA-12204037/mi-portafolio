// Base de datos de información detallada de tus habilidades
const skillsData = {
    java: {
        title: "Java — Programación Backend",
        emoji: "☕",
        badgeClass: "badge-java",
        description: "Dominio de Java orientado a objetos, patrones de diseño y lógica backend para construir aplicaciones escalables, mantenibles y seguras.",
        tools: ["Java 17+", "OOP", "Patrones de Diseño", "Pruebas unitarias", "Maven", "Estructuras de Datos"]
    },
    spring: {
        title: "Spring Framework",
        emoji: "⚙️",
        badgeClass: "badge-spring",
        description: "Especialista en el ecosistema Spring para desarrollar APIs REST, servicios web, seguridad y acceso eficiente a datos en aplicaciones empresariales.",
        tools: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "REST API", "Configuración basada en anotaciones"]
    },
    css3: {
        title: "CSS3 — Diseño Responsive",
        emoji: "🎨",
        badgeClass: "badge-css",
        description: "Creación de interfaces visuales profesionales con CSS3, animaciones, layouts flexibles y diseños adaptables para una experiencia consistente.",
        tools: ["Flexbox", "CSS Grid", "Responsive Design", "Animaciones CSS", "Variables CSS", "Tipografía web"]
    },
    javascript: {
        title: "JavaScript Moderno",
        emoji: "💻",
        badgeClass: "badge-js",
        description: "Programación interactiva del lado del cliente con JavaScript ES6+, manipulación del DOM, asincronía y lógica de negocio clara y eficiente.",
        tools: ["ES6+", "DOM", "Fetch", "Async/Await", "Eventos", "Modularización"]
    }
};

// 1. Obtener la habilidad de la URL (ej. ?skill=java)
const urlParams = new URLSearchParams(window.location.search);
const skillKey = urlParams.get('skill');

// 2. Renderizar la información en la pantalla
if (skillKey && skillsData[skillKey]) {
    const data = skillsData[skillKey];

    // Cambiar el título de la pestaña del navegador
    document.title = `${data.title} - Detalles`;

    // Inyectar datos del HTML
    const badge = document.getElementById('skill-badge');
    badge.textContent = data.emoji;
    badge.className = `badge-icon ${data.badgeClass}`; // Aplica el mismo gradiente de tu página principal

    document.getElementById('skill-title').textContent = data.title;
    document.getElementById('skill-desc').textContent = data.description;

    // Generar los tags o tecnologías asociadas
    const stackContainer = document.getElementById('tech-stack');
    stackContainer.innerHTML = ''; // Limpiar
    data.tools.forEach(tool => {
        const pill = document.createElement('span');
        pill.className = 'tech-pill';
        pill.textContent = tool;
        stackContainer.appendChild(pill);
    });
} else {
    // Si no se encuentra el parámetro, redirigir al inicio para evitar errores
    window.location.href = 'index.html';
}