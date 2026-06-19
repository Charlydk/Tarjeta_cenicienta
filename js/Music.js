// js/Music.js

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('music');
    const welcomeModal = document.getElementById('welcomeModal');
    const playMusicButtonModal = document.getElementById('playMusicButtonModal'); // Botón "Sí, ¡claro!" del modal
    const noMusicButtonModal = document.getElementById('noMusicButtonModal'); // Botón "No, gracias" del modal
    const musicToggleButton = document.getElementById('musicToggleButton'); // El botón flotante principal
    // const loadingMessage = document.getElementById('loadingMessage'); // Si decides usar el mensaje de carga
    
    let isPlaying = false; // Variable para controlar el estado de reproducción

    // Función para actualizar el icono y la clase del botón flotante principal
    function updateToggleButtonUI() {
        if (isPlaying) {
            musicToggleButton.innerHTML = '<i class="fas fa-pause"></i>'; // Icono de pausa
            musicToggleButton.classList.add('playing');
        } else {
            musicToggleButton.innerHTML = '<i class="fas fa-music"></i>'; // Icono de música o play
            musicToggleButton.classList.remove('playing');
        }
        // Aseguramos que el botón flotante sea visible una vez que el modal se cierra
        musicToggleButton.classList.add('active'); 
    }

    // Asegúrate de que el audio y los botones existan
    if (music && welcomeModal && playMusicButtonModal && noMusicButtonModal && musicToggleButton) {
        // Desactivar scroll del body al inicio mientras el modal esté visible
        document.body.style.overflow = 'hidden';

        function closeModal() {
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            // Inicializa AOS recién ahora, cuando el modal ya cerró
            setTimeout(() => {
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 1200,
                        once: true,
                        mirror: false,
                        offset: 120,
                        easing: 'ease-in-out',
                    });
                }
            }, 950);
        }

        // Listener para el botón "Sí, con música"
        playMusicButtonModal.addEventListener('click', () => {
            music.play().then(() => {
                isPlaying = true;
                closeModal();
                updateToggleButtonUI();
            }).catch(e => {
                console.warn("Error al reproducir música:", e);
                closeModal();
                updateToggleButtonUI();
                alert("Tu navegador bloqueó la reproducción automática. Podés activarla con el botón flotante.");
            });
        });

        // Listener para el botón "Ingresar sin música"
        noMusicButtonModal.addEventListener('click', () => {
            music.pause();
            music.currentTime = 0;
            isPlaying = false;
            closeModal();
            updateToggleButtonUI();
        });

        // Listener para el botón flotante principal (controla play/pause después del modal)
        musicToggleButton.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                isPlaying = false;
            } else {
                music.play().then(() => {
                    isPlaying = true;
                }).catch(e => {
                    console.error("Error al reproducir desde el botón flotante:", e);
                    isPlaying = false;
                    alert("No se pudo reproducir la música.");
                });
            }
            updateToggleButtonUI(); // Actualiza el icono del botón flotante
        });

        // Eventos del propio audio para mantener el estado sincronizado
        music.addEventListener('play', () => {
            isPlaying = true;
            updateToggleButtonUI();
        });

        music.addEventListener('pause', () => {
            isPlaying = false;
            updateToggleButtonUI();
        });

        // Inicializa el estado del botón flotante al cargar la página (oculto y con icono de música)
        musicToggleButton.classList.remove('active'); // Asegura que inicie oculto
        musicToggleButton.innerHTML = '<i class="fas fa-music"></i>'; // Icono inicial de música

    } else {
        console.error("Algunos elementos necesarios para el modal o el audio no fueron encontrados. Asegúrate de que los IDs sean correctos.");
        // Si hay un problema, al menos asegúrate de que el modal no bloquee la página
        if (welcomeModal) {
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        // Si el botón flotante no se encuentra, no se muestra
    }
});