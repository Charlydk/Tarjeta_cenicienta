const preloader = document.getElementById('preloader');
        const video = document.querySelector('#portada video');
        const mainContent = document.querySelector('.max-w-screen-xl');

        console.log("Preloader script loaded.");

        // 1. Ocultamos el contenido principal para evitar que se vea a medio cargar
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease-in-out';

        console.log("Waiting for video to be ready...");

        // 2. Escuchamos el evento 'canplaythrough' del video
        video.addEventListener('canplaythrough', function() {
            // 3. Cuando el video está listo, ocultamos el preloader
            preloader.style.display = 'none';
            // 4. Y mostramos el contenido principal con una suave transición
            mainContent.style.opacity = '1';
        });

        console.log("Preloader setup complete.");