document.addEventListener("DOMContentLoaded", () => {
    const refreshIcon = document.getElementById("refreshIcon");
    let startY = 0;
    let isPulling = false;

    // Detectar el inicio del deslizamiento
    window.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
        isPulling = false;
    });

    // Detectar el movimiento hacia abajo
    window.addEventListener("touchmove", (e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        if (deltaY > 50) { // Si se desliza hacia abajo más de 50px
            isPulling = true;
            refreshIcon.style.top = "20px"; // Mostrar el ícono
            refreshIcon.style.transform = `translateX(-50%) rotate(${deltaY}deg)`; // Rotar según el desplazamiento
        }
    });

    // Detectar el final del deslizamiento
    window.addEventListener("touchend", () => {
        if (isPulling) {
            refreshIcon.style.animation = "rotate 1s linear"; // Activar animación de rotación
            setTimeout(() => {
                location.reload(); // Refrescar la página
            }, 1000); // Esperar a que termine la animación
        } else {
            refreshIcon.style.top = "-80px"; // Ocultar el ícono
            refreshIcon.style.transform = "translateX(-50%) rotate(0deg)";
        }
    });
});