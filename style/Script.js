/* Cuenta regresiva (solo corre si la página tiene el reloj) */
(function () {
    var dias = document.getElementById("dias");
    if (!dias) return;
    var meta = new Date("July 30, 2026 15:37:25").getTime();
    var ids = ["dias", "horas", "minutos", "segundos"];
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var pintar = function (v) { ids.forEach(function (id, i) { document.getElementById(id).textContent = v[i]; }); };
    var x = setInterval(function () {
        var d = meta - Date.now();
        if (d < 0) { clearInterval(x); return pintar(["00", "00", "00", "00"]); }
        pintar([pad(Math.floor(d / 864e5)), pad(Math.floor(d % 864e5 / 36e5)), pad(Math.floor(d % 36e5 / 6e4)), pad(Math.floor(d % 6e4 / 1e3))]);
    }, 1000);
})();

/* Carrusel de galería: se desplaza el ancho de una foto + el espacio entre fotos */
function moverCarrusel(direccion) {
    var pista = document.getElementById("pista-galeria");
    if (!pista) return;
    var foto = pista.querySelector(".galeria-item");
    var gap = parseFloat(getComputedStyle(pista).columnGap) || 24;
    pista.scrollBy({ left: (foto ? foto.offsetWidth + gap : 344) * direccion, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    /* Aparición al hacer scroll (una sola vez) */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add("active"); obs.unobserve(e.target); }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
        reveals.forEach(function (r) { io.observe(r); });
    } else {
        reveals.forEach(function (r) { r.classList.add("active"); });
    }

    /* Barra superior: se compacta al bajar (la clase .sticky ya existía en el CSS pero nunca se activaba) */
    var barra = document.querySelector(".titulo-pagina-inicio");
    if (barra) {
        var alternar = function () { barra.classList.toggle("sticky", window.scrollY > 40); };
        alternar();
        window.addEventListener("scroll", alternar, { passive: true });
    }

    /* Menú móvil */
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("botones-titulo");
    if (!toggle || !menu) return;
    var icono = toggle.querySelector("i");
    var estado = function (abierto) {
        menu.classList.toggle("desplegado", abierto);
        icono.classList.toggle("fa-xmark", abierto);
        icono.classList.toggle("fa-bars", !abierto);
        toggle.setAttribute("aria-expanded", abierto);
        toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", function () { estado(!menu.classList.contains("desplegado")); });
    document.querySelectorAll(".botones-de-inicio").forEach(function (a) { a.addEventListener("click", function () { estado(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") estado(false); });
});
