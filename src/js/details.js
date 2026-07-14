// Base de datos de información detallada de tus habilidades
const skillsData = {
    java: {
        title: "Java & Spring Boot",
        emoji: "☕",
        badgeClass: "badge-java",
        description: "Especializado en el desarrollo de arquitecturas de backend robustas, escalables y seguras. Experiencia diseñando APIs RESTful bajo buenas prácticas (principios SOLID), inyección de dependencias con Spring Framework, seguridad con Spring Security y persistencia de datos eficiente utilizando Spring Data JPA / Hibernate.",
        tools: ["Java 17+", "Spring Boot", "Spring Security", "Hibernate", "JUnit 5", "Maven"]
    },
    sql: {
        title: "SQL & Bases de Datos",
        emoji: "🗄️",
        badgeClass: "badge-sql",
        description: "Sólido dominio en el modelado de bases de datos relacionales y optimización de motores SQL. Capacidad para diseñar esquemas normalizados, escribir consultas complejas altamente eficientes, implementar triggers, funciones y procedimientos almacenados, además de asegurar la integridad referencial y el rendimiento bajo carga.",
        tools: ["PostgreSQL", "MySQL", "SQL Server", "DBeaver", "Optimización de Queries", "Modelado Entidad-Relación"]
    },
    frontend: {
        title: "Desarrollo Frontend Nativo",
        emoji: "💻",
        badgeClass: "badge-front",
        description: "Pasión por construir interfaces web modernas, dinámicas y altamente responsivas. Enfoque en la escritura de HTML5 semántico, maquetación adaptativa mediante CSS3 avanzado (Flexbox, CSS Grid) y modularización del lado del cliente utilizando JavaScript Vanilla moderno (ES6+), manipulación del DOM y consumo asíncrono de APIs con Fetch.",
        tools: ["HTML5 Semántico", "CSS3 / Sass", "JavaScript ES6+", "Vite", "Responsive Design", "Manipulación del DOM"]
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