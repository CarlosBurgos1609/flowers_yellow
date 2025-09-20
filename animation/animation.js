// Sincronizar las letras con la canción
var audio = document.querySelector("#backgroundAudio");
var lyrics = document.querySelector("#lyrics");

// Controles de audio mejorados
var playPauseBtn = document.querySelector("#playPauseBtn");
var muteBtn = document.querySelector("#muteBtn");
var volumeSlider = document.querySelector("#volumeSlider");

// Verificar que el audio existe
if (!audio) {
    console.error("No se encontró el elemento de audio");
}

// Configuración de audio
if (audio) {
    audio.volume = 0.7;
    
    // Agregar event listeners para debug
    audio.addEventListener('loadstart', () => console.log('Cargando audio...'));
    audio.addEventListener('canplay', () => console.log('Audio listo para reproducir'));
    audio.addEventListener('error', (e) => console.error('Error al cargar audio:', e));
    audio.addEventListener('play', () => console.log('Audio iniciado'));
    audio.addEventListener('pause', () => console.log('Audio pausado'));

    audio.addEventListener('pause', () => {
        playPauseIcon.src = "../assets/icons/play_rounded.png"; // Cambiar el ícono a play
        console.log("Audio pausado automáticamente.");
    });

    audio.addEventListener('play', () => {
        playPauseIcon.src = "../assets/icons/pause_rounded.png"; // Cambiar el ícono a pausa
        console.log("Audio iniciado automáticamente.");
    });
}

// Referencias a los íconos
var playPauseIcon = document.querySelector("#playPauseIcon");
var muteIcon = document.querySelector("#muteIcon");

function togglePlayPause() {
    if (!audio) {
        console.error("El elemento de audio no está disponible.");
        return;
    }

    // Verificar si el audio está pausado o en reproducción
    if (audio.paused) {
        audio.play().then(() => {
            // Cambiar el ícono a pausa
            playPauseIcon.src = "../assets/icons/pause_rounded.png"; // Ruta correcta del ícono de pausa
            console.log("Audio iniciado correctamente.");
        }).catch(error => {
            console.error("Error al intentar reproducir el audio:", error);
            alert("No se pudo reproducir el audio. Verifica que el archivo existe en la carpeta sound.");
        });
    } else {
        audio.pause();
        // Cambiar el ícono a play
        playPauseIcon.src = "../assets/icons/play_rounded.png"; // Ruta correcta del ícono de play
        console.log("Audio pausado.");
    }
}

// Event listeners para los eventos del audio
if (audio) {
    audio.addEventListener('play', () => {
        playPauseIcon.src = "../assets/icons/pause_rounded.png"; // Cambiar el ícono a pausa
        console.log("Audio iniciado automáticamente.");
    });

    audio.addEventListener('pause', () => {
        playPauseIcon.src = "../assets/icons/play_rounded.png"; // Cambiar el ícono a play
        console.log("Audio pausado automáticamente.");
    });
}

// Event listeners para los botones de control de audio
if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
function toggleMute() {
    if (!audio) return;

    if (audio.muted) {
        audio.muted = false;
        muteIcon.src = "../assets/icons/sound.png"; // Cambiar a ícono de sonido
        muteBtn.title = "Silenciar";
    } else {
        audio.muted = true;
        muteIcon.src = "../assets/icons/stop.png"; // Cambiar a ícono de silencio
        muteBtn.title = "Activar sonido";
    }
}

function changeVolume() {
    if (!audio || !volumeSlider) return;

    audio.volume = volumeSlider.value;

    // Cambiar ícono según el nivel de volumen
    if (audio.volume === 0) {
        muteIcon.src = "../assets/icons/stop.png"; // Ícono de volumen silenciado
        muteBtn.title = "Silenciado";
    } else if (audio.volume > 0 && audio.volume <= 0.5) {
        muteIcon.src = "../assets/icons/sound.png"; // Ícono de volumen bajo
        muteBtn.title = "Volumen bajo";
    } else {
        muteIcon.src = "../assets/icons/sound.png"; // Ícono de volumen alto
        muteBtn.title = "Volumen alto";
    }
}

// Event listeners para controles de audio
if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
if (muteBtn) muteBtn.addEventListener('click', toggleMute);
if (volumeSlider) volumeSlider.addEventListener('input', changeVolume);

// Función para inicializar el audio y verificar su estado
function initAudio() {
    if (!audio) {
        console.error("El elemento de audio no está disponible.");
        return;
    }

    // Verificar si el archivo de audio está cargado correctamente
    console.log("Intentando cargar el archivo de audio:", audio.src);

    audio.play().then(() => {
        // Cambiar el ícono a pausa si el audio se inicia automáticamente
        playPauseIcon.src = "../assets/icons/pause_rounded.png";
        console.log("Audio iniciado automáticamente.");
    }).catch(error => {
        console.log("El navegador bloqueó la reproducción automática:", error);
        // Cambiar el ícono a play si el audio no se puede iniciar automáticamente
        playPauseIcon.src = "../assets/icons/play_rounded.png";
        showAudioMessage();
    });
}

// Mostrar mensaje al usuario si el audio no se puede reproducir automáticamente
function showAudioMessage() {
    const message = document.createElement('div');
    message.className = 'audio-message';
    message.innerHTML = `
        <p>🎵 Haz clic en el botón de reproducir para disfrutar de la música</p>
    `;
    message.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 215, 0, 0.9);
        color: #000;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        animation: fadeInOut 4s ease-in-out forwards;
        max-width: 250px;
        text-align: center;
        font-weight: bold;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 4000);
}

// Actualización del objeto lyricsData con los intervalos proporcionados
var lyricsData = [
  { text: "Él la estaba esperando con una flor amarilla", start: 0.000, end: 6.732 },
  { text: "Ella lo estaba soñando con la luz en su pupila", start: 6.733, end: 12.914 },
  { text: "Y el amarillo del sol iluminaba la esquina (la esquina)", start: 12.915, end: 20.842 },
  { text: "Lo sentía tan cercano, lo sentía desde niña", start: 20.843, end: 26.611 },
  { text: "Ella sabía que él sabía, que algún día pasaría", start: 26.612, end: 32.504 },
  { text: "Que vendría a buscarla, con sus flores amarillas", start: 32.505, end: 39.711 },
  { text: "No te apures no detengas, el instante del encuentro", start: 39.712, end: 44.505 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", start: 44.506, end: 48.647 },
  { text: "No te olvides, que la vida", start: 48.648, end: 52.189 },
  { text: "Casi nunca está dormida", start: 52.190, end: 56.784 }
];

// Función para animar texto palabra por palabra
function animateTextWords(text) {
    const words = text.split(' ').map((word, index) => {
        // Alternar entre las clases para diferentes estilos
        const fontClass = index % 2 === 0 ? 'nunito-bold' : 'oleo-script-regular';
        return `<span class="${fontClass}" style="animation-delay: ${index * 0.3}s; display: inline-block;">${word}</span>`;
    }).join(' ');

    return `<span class="lyric-text">${words}</span>`;
}

// Función para actualizar las letras (ajustar para usar start y end)
function updateLyrics() {
  if (!audio || !lyrics) return;

  var currentTime = audio.currentTime;
  var currentLine = lyricsData.find(
    (line) => currentTime >= line.start && currentTime <= line.end
  );

  if (currentLine) {
    var newText = animateTextWords(currentLine.text); // Usar animación por palabras
    if (lyrics.getAttribute('data-current-text') !== currentLine.text) {
      lyrics.setAttribute('data-current-text', currentLine.text);
      lyrics.innerHTML = newText;
      lyrics.classList.add('active');

      // Animación de entrada más rápida
      lyrics.style.opacity = 0;
      lyrics.style.transform = 'translate(-50%, -50%) translateY(10px) scale(0.9)';

      setTimeout(() => {
        lyrics.style.transition = 'all 0.5s ease-out';
        lyrics.style.opacity = 1;
        lyrics.style.transform = 'translate(-50%, -50%) translateY(0) scale(1)';
      }, 50);
    }
  } else {
    if (lyrics.getAttribute('data-current-text') && lyrics.style.opacity !== "0") {
      lyrics.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      lyrics.style.opacity = 0;
      lyrics.style.transform = 'translate(-50%, -50%) translateY(-10px) scale(0.9)';

      setTimeout(() => {
        lyrics.innerHTML = "";
        lyrics.classList.remove('active');
        lyrics.setAttribute('data-current-text', '');
        lyrics.style.transform = 'translate(-50%, -50%)';
      }, 400);
    }
  }
}

// Función para crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('starsBackground');
    if (!starsContainer) return;
    
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Delay de animación aleatorio
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Función para crear efectos de luz
function createLightEffects() {
    const lightContainer = document.getElementById('lightEffects');
    if (!lightContainer) return;
    
    setInterval(() => {
        const lightRay = document.createElement('div');
        lightRay.className = 'light-ray';
        
        const size = Math.random() * 50 + 20;
        lightRay.style.width = `${size}px`;
        lightRay.style.height = `${size}px`;
        lightRay.style.left = `${Math.random() * 100}%`;
        lightRay.style.top = `${Math.random() * 50}%`;
        
        lightContainer.appendChild(lightRay);
        
        setTimeout(() => {
            if (lightRay.parentNode) {
                lightRay.parentNode.removeChild(lightRay);
            }
        }, 6000);
    }, 2000);
}

// Función para crear mariposas
function createButterflies() {
    const butterfliesContainer = document.getElementById('butterfliesContainer');
    if (!butterfliesContainer) return;
    
    const butterflyEmojis = ['🦋', '🧚‍♀️', '✨'];
    
    setInterval(() => {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.textContent = butterflyEmojis[Math.floor(Math.random() * butterflyEmojis.length)];
        
        butterfly.style.left = '-50px';
        butterfly.style.top = `${Math.random() * 80 + 10}%`;
        butterfly.style.animationDuration = `${Math.random() * 5 + 8}s`;
        butterfly.style.animationDelay = `${Math.random() * 2}s`;
        
        butterfliesContainer.appendChild(butterfly);
        
        setTimeout(() => {
            if (butterfly.parentNode) {
                butterfly.parentNode.removeChild(butterfly);
            }
        }, 13000);
    }, 5000);
}

// Función para crear campo de flores múltiples (solo desktop)
function createFlowerField() {
    const flowerField = document.getElementById('flowerField');
    if (!flowerField) return;
    
    // Solo crear campo en dispositivos desktop
    if (window.innerWidth < 1024) return;
    
    const numberOfFlowers = 15; // Número de flores en
    const flowerTypes = ['flower--1', 'flower--2', 'flower--3'];
    const sizes = ['small', 'medium', 'large', 'extra-large'];
    
    for (let i = 0; i < numberOfFlowers; i++) {
        // Clonar una flor existente
        const originalFlower = document.querySelector('.flowers .flower');
        if (!originalFlower) continue;
        
        const newFlower = originalFlower.cloneNode(true);
        newFlower.className = `flower field-flower ${flowerTypes[Math.floor(Math.random() * flowerTypes.length)]} ${sizes[Math.floor(Math.random() * sizes.length)]}`;
        
        // Posición aleatoria
        const leftPosition = Math.random() * 95; // 0-95% para evitar que salgan del borde
        newFlower.style.left = `${leftPosition}%`;
        
        // Delay de animación aleatorio
        newFlower.style.animationDelay = `${Math.random() * 3}s`;
        
        // Agregar variación en altura para efecto de profundidad
        const randomHeight = 80 + Math.random() * 40; // Entre 80% y 120% de altura
        newFlower.style.height = `${randomHeight}%`;
        
        // Agregar ligera rotación aleatoria
        newFlower.style.transform = `rotate(${(Math.random() - 0.5) * 10}deg)`;
        
        flowerField.appendChild(newFlower);
    }
}

// Función para detectar dispositivo y ajustar diseño
function detectDeviceAndAdjust() {
    const isDesktop = window.innerWidth >= 1024;
    const flowerField = document.getElementById('flowerField');
    const specialTitle = document.getElementById('specialTitle');
    
    if (isDesktop) {
        // Mostrar campo de flores en desktop
        if (flowerField) {
            flowerField.style.display = 'block';
            createFlowerField();
        }
        
        // Ajustar título especial para desktop
        if (specialTitle) {
            specialTitle.style.display = 'block';
        }
        
        console.log('Modo desktop: Campo de flores activado');
    } else {
        // Ocultar campo en móviles
        if (flowerField) {
            flowerField.style.display = 'none';
        }
        
        console.log('Modo móvil: Manteniendo diseño original');
    }
}

// Función para agregar CSS de animaciones adicionales
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20%, 80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
        
        .lyric-text {
            display: inline-block;
            animation: lyricSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            opacity: 0;
            transform: translateY(20px) scale(0.8);
        }
        
        @keyframes lyricSlideIn {
            0% { 
                opacity: 0;
                transform: translateY(20px) scale(0.8);
                filter: blur(2px);
            }
            100% { 
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0px);
            }
        }
        
        .lyrics-display {
            transition: none !important;
        }
        
        .lyrics-display.active {
            transform: translate(-50%, -50%);
        }
        
        /* Animación de entrada letra por letra */
        .lyric-text span {
            display: inline-block;
            opacity: 0;
            animation: letterAppear 0.1s ease-out forwards;
        }
        
        @keyframes letterAppear {
            from {
                opacity: 0;
                transform: translateY(10px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .volume-control {
            display: flex;
            align-items: center;
            margin-left: 10px;
        }
        
        .volume-slider {
            width: 80px;
            height: 5px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            outline: none;
            transition: opacity 0.3s;
        }
        
        .volume-slider::-webkit-slider-thumb {
            appearance: none;
            width: 15px;
            height: 15px;
            background: #ffd700;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .volume-slider::-moz-range-thumb {
            width: 15px;
            height: 15px;
            background: #ffd700;
            border-radius: 50%;
            cursor: pointer;
            border: none;
        }
        
        .gradient-title {
            background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 6s ease-in-out infinite;
        }
        
        .title-line {
            display: inline-block;
            animation: titleSlideIn 1s ease-out forwards;
            opacity: 0;
        }
        
        .title-line:nth-child(1) { animation-delay: 0.5s; }
        .title-line:nth-child(2) { animation-delay: 1s; }
        .subtitle-line { 
            animation-delay: 1.5s; 
            font-size: 0.8em;
            opacity: 0.9;
        }
        
        @keyframes titleSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Actualizar letras con requestAnimationFrame para mayor suavidad
let lastUpdateTime = 0;
function smoothUpdateLyrics() {
    const currentTime = audio ? Math.floor(audio.currentTime) : 0;
    
    // Solo actualizar si el tiempo ha cambiado
    if (currentTime !== lastUpdateTime) {
        updateLyrics();
        lastUpdateTime = currentTime;
    }
    
    requestAnimationFrame(smoothUpdateLyrics);
}

// Iniciar la actualización suave
smoothUpdateLyrics();

// Función titulo mejorada
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    addAdditionalStyles();
    createStars();
    createLightEffects();
    createButterflies();
    
    // Verificar elementos antes de inicializar
    console.log("Audio element:", audio);
    console.log("Audio src:", audio ? audio.src : "No audio element");
    
    // Intentar iniciar audio después de un pequeño delay
    setTimeout(() => {
        if (audio) {
            initAudio();
        } else {
            console.error("No se pudo encontrar el elemento de audio");
            // Crear mensaje de error
            showErrorMessage("No se pudo cargar el archivo de audio");
        }
    }, 1000);
});

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 1002;
        text-align: center;
        font-weight: bold;
    `;
    errorDiv.innerHTML = `
        <p>⚠️ ${message}</p>
        <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 10px; background: white; color: black; border: none; border-radius: 5px; cursor: pointer;">
            Recargar página
        </button>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Llama a la función después de 216 segundos
setTimeout(ocultarTitulo, 216000);

// Agregar interactividad al hacer clic en cualquier parte
document.addEventListener('click', function() {
    if (audio && audio.paused) {
        audio.play().then(() => {
            if (playPauseBtn) playPauseBtn.textContent = "⏸️";
            console.log("Audio iniciado por clic del usuario");
        }).catch(error => {
            console.log("Error al reproducir audio por clic:", error);
            showErrorMessage("Error al reproducir el audio. Verifica que el archivo existe en la carpeta sound/");
        });
    }
}, { once: true });