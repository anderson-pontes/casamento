document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DA ANIMAÇÃO DA LINHA DO TEMPO (SCROLL) ---
    const timelineEvents = document.querySelectorAll('.timeline .container');
    if (timelineEvents.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        timelineEvents.forEach(event => {
            scrollObserver.observe(event);
        });
    }

    // --- LÓGICA DA GALERIA DE FOTOS (MODAL) ---

    // ** IMPORTANTE: AQUI DEFINES AS TUAS FOTOS **
    // A 'chave' (ex: 'ano1') tem de ser a mesma do 'data-gallery-id' no HTML.
    // Coloca aqui os caminhos para as tuas imagens.
    const galleries = {
        'ano1': ['imagens/ano1_ft01.png', 'imagens/ano1_ft02.png', 'imagens/ano1_ft04.png', 'imagens/ano1_ft05.png', 'imagens/ano1_ft06.png', 'imagens/ano1_ft07.png', 'imagens/ano1_ft08.png', 'imagens/ano1_ft09.png', 'imagens/ano1_ft10.png'],
        'ano3': ['imagens/ano3-casa.jpg'],
        'ano5': ['imagens/oliver2.jpg', 'imagens/oliver3.jpg', 'imagens/oliver4.jpg', 'imagens/oliver5.jpg', 'imagens/oliver6.jpg', 'imagens/oliver7.jpg', 'imagens/oliver8.jpg', 'imagens/oliver9.jpg', 'imagens/oliver10.jpg', 'imagens/oliver11.jpg', 'imagens/oliver12.jpg'],
        'ano8': ['imagens/belem.jpg'],
        'ano10': ['imagens/juntos1.jpg', 'imagens/juntos2.jpg', 'imagens/juntos3.JPG', 'imagens/juntos4.jpg', 'imagens/juntos5.jpg', 'imagens/juntos6.jpg', 'imagens/juntos7.jpg', 'imagens/juntos8.jpg']
    };

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const imageTriggers = document.querySelectorAll('.timeline-image');

    let currentGalleryId = null;
    let currentImageIndex = 0;

    function showPhoto(galleryId, index) {
        const gallery = galleries[galleryId];
        if (gallery && gallery[index]) {
            modalImg.src = gallery[index];
            currentGalleryId = galleryId;
            currentImageIndex = index;
            prevBtn.style.display = gallery.length > 1 ? 'block' : 'none';
            nextBtn.style.display = gallery.length > 1 ? 'block' : 'none';
        }
    }

    function openModal(galleryId) {
        if (galleries[galleryId] && galleries[galleryId].length > 0) {
            modal.style.display = 'flex';
            showPhoto(galleryId, 0);
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        currentGalleryId = null;
    }

    function nextPhoto() {
        const gallery = galleries[currentGalleryId];
        if (gallery) {
            const newIndex = (currentImageIndex + 1) % gallery.length;
            showPhoto(currentGalleryId, newIndex);
        }
    }

    function prevPhoto() {
        const gallery = galleries[currentGalleryId];
        if (gallery) {
            const newIndex = (currentImageIndex - 1 + gallery.length) % gallery.length;
            showPhoto(currentGalleryId, newIndex);
        }
    }

    imageTriggers.forEach(image => {
        image.addEventListener('click', () => {
            const galleryId = image.getAttribute('data-gallery-id');
            openModal(galleryId);
        });
    });
    
    if (modal) {
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', prevPhoto);
        nextBtn.addEventListener('click', nextPhoto);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowRight') nextPhoto();
                if (e.key === 'ArrowLeft') prevPhoto();
                if (e.key === 'Escape') closeModal();
            }
        });
    }
});