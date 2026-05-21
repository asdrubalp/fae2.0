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