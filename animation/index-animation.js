// Configuración de luciérnagas
const fireflyConfig = {
    baseCount: 1110,        // Número base de luciérnagas (aumentado)
    maxCount: 1200,        // Número máximo durante hover (aumentado)
    spawnRate: 200,       // Velocidad de creación (ms) (más rápido)
    activeSpawnRate: 50   // Velocidad durante hover (ms) (más rápido)
};

let isButtonActive = false;
let fireflyInterval;
let currentFireflyCount = 0;

// Crear luciérnaga individual
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    
    // Añadir variaciones de tamaño aleatoriamente
    const sizeRandom = Math.random();
    if (sizeRandom < 0.3) {
        firefly.classList.add('small');
    } else if (sizeRandom > 0.7) {
        firefly.classList.add('large');
    }
    
    // Posición inicial aleatoria en el ancho de la pantalla
    const leftPosition = Math.random() * 95 + 2.5; // Entre 2.5% y 97.5%
    firefly.style.left = `${leftPosition}%`;
    
    // Asegurar que empiecen desde más abajo de la pantalla
    firefly.style.bottom = '-30px';
    firefly.style.position = 'absolute';
    
    // Delay de animación aleatorio mínimo
    firefly.style.animationDelay = `${Math.random() * 1}s, ${Math.random() * 0.5}s`;
    
    // Duración de animación variable
    const baseDuration = firefly.classList.contains('large') ? 16 : 
                        firefly.classList.contains('small') ? 12 : 14;
    const flyDuration = baseDuration + Math.random() * 4;
    const twinkleDuration = 1.5 + Math.random() * 1.5;
    firefly.style.animationDuration = `${flyDuration}s, ${twinkleDuration}s`;
    
    // Movimiento horizontal aleatorio
    const horizontalMovement = (Math.random() - 0.5) * 300;
    firefly.style.setProperty('--horizontal-offset', `${horizontalMovement}px`);
    
    return firefly;
}

// Añadir luciérnaga al contenedor
function addFirefly() {
    const container = document.getElementById('firefliesContainer');
    if (!container) return;
    
    // Limitar el número de luciérnagas
    const maxFireflies = isButtonActive ? fireflyConfig.maxCount : fireflyConfig.baseCount;
    
    if (currentFireflyCount >= maxFireflies) return;
    
    const firefly = createFirefly();
    container.appendChild(firefly);
    currentFireflyCount++;
    
    // Remover luciérnaga después de la animación
    setTimeout(() => {
        if (firefly.parentNode) {
            firefly.parentNode.removeChild(firefly);
            currentFireflyCount--;
        }
    }, 18000); // Tiempo ajustado para la nueva animación más larga
}

// Iniciar animación de luciérnagas
function startFireflies() {
    const spawnRate = isButtonActive ? fireflyConfig.activeSpawnRate : fireflyConfig.spawnRate;
    
    if (fireflyInterval) {
        clearInterval(fireflyInterval);
    }
    
    fireflyInterval = setInterval(() => {
        addFirefly();
    }, spawnRate);
}

// Crear ráfaga de luciérnagas
function createFireflyBurst() {
    const burstCount = 20 + Math.random() * 20; // Entre 20 y 40 luciérnagas
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            addFirefly();
        }, i * 30); // Menor delay entre cada luciérnaga para efecto más intenso
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const magicButton = document.getElementById('magicButton');
    
    // Iniciar luciérnagas automáticamente
    startFireflies();
    
    // Crear luciérnagas iniciales distribuidas
    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => addFirefly(), i * 100);
        }
    }, 500);
    
    // Event listeners del botón
    if (magicButton) {
        // Hover del botón - aumentar luciérnagas
        magicButton.addEventListener('mouseenter', function() {
            isButtonActive = true;
            startFireflies();
            createFireflyBurst();
        });
        
        magicButton.addEventListener('mouseleave', function() {
            isButtonActive = false;
            startFireflies();
        });
        
        // Click del botón - efecto especial y redirección
        magicButton.addEventListener('click', function() {
            // Efecto visual
            this.classList.add('clicked');
            
            // Crear ráfaga masiva de luciérnagas
            createFireflyBurst();
            createFireflyBurst();
            
            // Pequeña vibración del botón
            this.style.animation = 'buttonPulse 0.1s ease-in-out 3';
            
            // Redireccionar después de un pequeño delay
            setTimeout(() => {
                window.location.href = './flowers/flowers.html';
            }, 800);
        });
    }
});

// Crear luciérnagas adicionales cada cierto tiempo
setInterval(() => {
    if (Math.random() < 0.9) { // 90% de probabilidad
        addFirefly();
    }
}, 300);

// Crear luciérnagas continuamente para efecto fluido
setInterval(() => {
    addFirefly();
}, 400);

// Limpiar interval al salir de la página
window.addEventListener('beforeunload', function() {
    if (fireflyInterval) {
        clearInterval(fireflyInterval);
    }
});