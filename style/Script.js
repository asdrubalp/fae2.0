// Fecha del evento
var countDownDate = new Date("July 30, 2026 15:37:25").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Función para añadir un cero a la izquierda si el número es menor a 10 (ej: 09, 08...)
    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    // Inyectar los resultados en cada bloque correspondiente
    document.getElementById("dias").innerHTML = days;
    document.getElementById("horas").innerHTML = hours;
    document.getElementById("minutos").innerHTML = minutes;
    document.getElementById("segundos").innerHTML = seconds;
    
    // Si el tiempo termina
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("dias").innerHTML = "00";
        document.getElementById("horas").innerHTML = "00";
        document.getElementById("minutos").innerHTML = "00";
        document.getElementById("segundos").innerHTML = "00";
    }
}, 1000);

/* =========================================
   CONTROLADOR DEL CARRUSEL DE GALERÍA
   ========================================= */
function moverCarrusel(direccion) {
    // Busca la pista donde están todas las fotos
    const pista = document.getElementById('pista-galeria');
    
    // Calcula cuánto debe desplazarse: El ancho de una foto (320px) + el espacio del gap (24px)
    const distancia = 344 * direccion; 
    
    // Ejecuta el movimiento suave
    pista.scrollBy({ left: distancia, behavior: 'smooth' });
}

/* =========================================
   ANIMACIONES DE SCROLL (INTERSECTION OBSERVER)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    // Busca todos los elementos que tengan la clase "reveal"
    const reveals = document.querySelectorAll(".reveal");

    // Configuración del observador
    const revealOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento entra en la pantalla
        rootMargin: "0px 0px -50px 0px" // Evita que se active antes de tiempo
    };

    // Crea el observador
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Si el elemento no está en la pantalla, no hace nada
            if (!entry.isIntersecting) {
                return;
            } else {
                // Si entra en la pantalla, le añade la clase "active" para animarlo
                entry.target.classList.add("active");
                
                // Opcional: Deja de observarlo para que la animación ocurra solo 1 vez
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    // Aplica el vigilante a cada elemento
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

/* =========================================
   CONTROLADOR DEL MENÚ MÓVIL (HAMBURGUESA)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuBotones = document.getElementById('botones-titulo');
    const enlacesMenu = document.querySelectorAll('.botones-de-inicio');
    const iconoMenu = menuToggle.querySelector('i');

    // 1. Abrir y cerrar la cortina al tocar la hamburguesa
    menuToggle.addEventListener('click', function() {
        menuBotones.classList.toggle('desplegado');
        
        // Efecto premium: Cambiar las 3 barritas por una 'X' al abrir
        if(menuBotones.classList.contains('desplegado')) {
            iconoMenu.classList.remove('fa-bars');
            iconoMenu.classList.add('fa-xmark');
        } else {
            iconoMenu.classList.remove('fa-xmark');
            iconoMenu.classList.add('fa-bars');
        }
    });

    // 2. Cerrar el menú automáticamente cuando el usuario toca un enlace
    enlacesMenu.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            menuBotones.classList.remove('desplegado');
            iconoMenu.classList.remove('fa-xmark');
            iconoMenu.classList.add('fa-bars');
        });
    });
});