// Base de datos de comunicados y avisos institucionales (Nivel Secundaria)
const anuncios = [
    {
        id: 1,
        titulo: "XXIII Aniversario - Campeonato de Ex Alumnos 2026",
        categoria: "secundaria",
        fecha: "Lunes 19 de Octubre, 2026",
        descripcion: "¡Gran campeonato deportivo por nuestro XXIII Aniversario! Disciplinas: Futsal (Masculino) y Vóley (Femenino). Hora: 8:00 AM en los campos deportivos de la I.E. Informes e inscripciones: 929 706 819 - 993 720 439. ¡Habrá grandes premios y sorpresas!",
        afiche: "campeonato-exalumnos.jpg"
    },
    {
        id: 2,
        titulo: "Descanso Escolar de Octubre",
        categoria: "secundaria",
        fecha: "12 de octubre al 16 de octubre",
        descripcion: "De acuerdo con el calendario oficial del Minedu, los estudiantes tendrán su tercer bloque de vacaciones de la temporada, miestras los docentes y directivos realizan la semana de gestión pedagógica.",
        afiche: "calendario.jpg"
    },
    {
        id: 3,
        titulo: "Simulacro Nacional Multipeligro",
        categoria: "urgente",
        fecha: "13 de Octubre, 2026",
        descripcion: "De acuerdo con las normas técnicas de gestión de riesgo de desastres del Minedu (R.M. N.° 501-2025), este ejercicio es obligatorio en todos los planteles para entrenar las brigadas de emergencia escolares frente a sismos u otros peligros locales.",
        afiche: "simulacro.jpg"
    },
    
];

// Elementos del DOM
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// Función para renderizar tarjetas en el DOM
function mostrarAnuncios(filtro = 'todos') {
    contenedorTarjetas.innerHTML = '';

    // Filtrar elementos según categoría
    const anunciosFiltrados = filtro === 'todos' 
        ? anuncios 
        : anuncios.filter(anuncio => anuncio.categoria === filtro);

    if (anunciosFiltrados.length === 0) {
        contenedorTarjetas.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 2rem;">No hay comunicados disponibles en esta categoría.</p>`;
        return;
    }

    // Inyectar dinámicamente cada tarjeta
    anunciosFiltrados.forEach(anuncio => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta-anuncio';
        
        tarjeta.innerHTML = `
            <img src="${anuncio.afiche}" alt="Afiche de ${anuncio.titulo}" class="tarjeta-afiche" onerror="this.src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'">
            <div class="tarjeta-contenido">
                <span class="badge-categoria">${anuncio.categoria}</span>
                <h3>${anuncio.titulo}</h3>
                <p>${anuncio.descripcion}</p>
                <span class="fecha-anuncio"><i class="fa-regular fa-calendar"></i> ${anuncio.fecha}</span>
            </div>
        `;

        contenedorTarjetas.appendChild(tarjeta);
    });
}

// Escuchar eventos de clic en los botones de filtro
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        
        const categoriaSeleccionada = e.target.getAttribute('data-filtro');
        mostrarAnuncios(categoriaSeleccionada);
    });
});

// Manejo del formulario de contacto hacia el WhatsApp del Director
const formContacto = document.getElementById('formContacto');

if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreRemitente').value.trim();
        const asunto = document.getElementById('asuntoMensaje').value.trim();
        const mensajeTexto = document.getElementById('textoMensaje').value.trim();
        
        // Número institucional del Director Ricardo Solis Chacon (Modificar con el real si es necesario)
        const numeroWhatsAppDirector = "51963642884"; 

        const mensajeWhatsApp = `*¡Nueva Consulta desde el Portal Web!*%0A%0A` +
                                `*Remitente:* ${nombre}%0A` +
                                `*Asunto:* ${asunto}%0A` +
                                `*Mensaje:* ${mensajeTexto}`;

        const urlWhatsApp = `https://wa.me/${51963642884}?text=${mensajeWhatsApp}`;

        alert(`¡Gracias ${nombre}! Su mensaje sobre "${asunto}" está listo para ser enviado directamente al WhatsApp del Director Ricardo Solis Chacon.`);

        window.open(urlWhatsApp, '_blank');
        
        formContacto.reset();
    });
}

// Renderizado inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarAnuncios('todos');
});