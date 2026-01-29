// Memories Page Script
document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.getElementById('heartsContainer');
    const galleryStack = document.getElementById('galleryStack');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');
    const counter = document.getElementById('counter');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    
    // Fullscreen viewer elements
    const fullscreenViewer = document.getElementById('fullscreenViewer');
    const fullscreenContent = document.getElementById('fullscreenContent');
    const fullscreenClose = document.getElementById('fullscreenClose');
    const fullscreenPrev = document.getElementById('fullscreenPrev');
    const fullscreenNext = document.getElementById('fullscreenNext');
    const fullscreenCounter = document.getElementById('fullscreenCounter');

    let currentIndex = 0;
    let mediaFiles = [];
    let totalMedia = 0;
    let isFullscreenOpen = false;

    // Back button handler
    backButton.addEventListener('click', () => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 800);
    });

    // Create falling hearts animation
    function createFallingHearts() {
        const heartCount = 50;
        const duration = 4000; // 4 seconds

        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤';
                
                // Random properties
                const leftPosition = Math.random() * 100;
                const size = Math.random() * 10 + 15; // 15-25px
                const animationDuration = Math.random() * 2 + 3; // 3-5 seconds
                const delay = Math.random() * 0.5;

                heart.style.left = leftPosition + '%';
                heart.style.fontSize = size + 'px';
                heart.style.animationDuration = animationDuration + 's';
                heart.style.animationDelay = delay + 's';

                heartsContainer.appendChild(heart);

                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, (animationDuration + delay) * 1000);
            }, i * 80); // Stagger creation
        }

        // Fade out hearts container after duration
        setTimeout(() => {
            heartsContainer.classList.add('fade-out');
        }, duration);
    }

    // Load media files from directories
    async function loadMediaFiles() {
        const mediaFiles = [];

        // Add your 42 photos
        for (let i = 1; i <= 42; i++) {
            mediaFiles.push({
                type: 'image',
                src: `../media/images/photo_${i}.webp`
            });
        }

        return mediaFiles;
    }

    // Affectionate texts for images
    const affectionTexts = [
        "Você é incrível! 💕",
        "Que saudade! ❤️",
        "Momentos inesquecíveis ✨",
        "Sempre no coração 💖",
        "Amizade eterna 🌟",
        "Vai deixar saudades! 💫",
        "Te amamos muito! 💗",
        "Nunca te esquecer! 🌈",
        "Nosso tesouro 💎",
        "Sorrisos eternos 😊",
        "Melhores memórias! 🎀",
        "Pra sempre juntos! 🌺"
    ];

    // Render gallery items in stack
    function renderGallery(files) {
        mediaFiles = files;
        totalMedia = files.length;

        files.forEach((media, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item hidden';
            item.dataset.index = index;

            // Create image wrapper
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';

            if (media.type === 'image') {
                const img = document.createElement('img');
                img.src = media.src;
                img.alt = 'Memória';
                img.loading = 'lazy';
                imageWrapper.appendChild(img);
            } else if (media.type === 'video') {
                const video = document.createElement('video');
                video.src = media.src;
                video.controls = true;
                video.loop = true;
                video.loading = 'lazy';
                imageWrapper.appendChild(video);

                // Add play icon overlay
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                imageWrapper.appendChild(overlay);
            }

            // Add click handler for fullscreen
            imageWrapper.addEventListener('click', () => {
                if (parseInt(item.dataset.index) === currentIndex) {
                    openFullscreen(currentIndex);
                }
            });

            item.appendChild(imageWrapper);
            galleryStack.insertBefore(item, prevArrow);
        });

        // Show first item
        updateGallery();
        updateCounter();
    }

    // Update gallery display
    function updateGallery() {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'hidden');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === currentIndex - 1) {
                item.classList.add('prev');
            } else if (index === currentIndex + 1) {
                item.classList.add('next');
            } else {
                item.classList.add('hidden');
            }
        });

        // Update arrow states
        prevArrow.disabled = currentIndex === 0;
        nextArrow.disabled = currentIndex === totalMedia - 1;
    }

    // Update counter
    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${totalMedia}`;
    }

    // Navigate to previous
    prevArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
            updateCounter();
        }
    });

    // Navigate to next
    nextArrow.addEventListener('click', () => {
        if (currentIndex < totalMedia - 1) {
            currentIndex++;
            updateGallery();
            updateCounter();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevArrow.click();
        } else if (e.key === 'ArrowRight') {
            nextArrow.click();
        }
    });

    // Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    galleryStack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryStack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextArrow.click();
        }
        if (touchEndX > touchStartX + 50) {
            prevArrow.click();
        }
    }

    // Observe scroll to fade hearts
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            heartsContainer.classList.add('fade-out');
        }
    });

    // Next button click handler
    nextButton.addEventListener('click', () => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'messages.html';
        }, 800);
    });

    // Fullscreen Viewer Functions
    function openFullscreen(index) {
        currentIndex = index;
        isFullscreenOpen = true;
        document.body.style.overflow = 'hidden';
        
        updateFullscreenContent();
        fullscreenViewer.classList.add('active');
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleFullscreenKeyboard);
    }

    function closeFullscreen() {
        isFullscreenOpen = false;
        document.body.style.overflow = '';
        fullscreenViewer.classList.remove('active');
        
        // Remove keyboard navigation
        document.removeEventListener('keydown', handleFullscreenKeyboard);
        
        // Pause any playing videos
        const video = fullscreenContent.querySelector('video');
        if (video) {
            video.pause();
        }
    }

    function updateFullscreenContent() {
        const media = mediaFiles[currentIndex];
        fullscreenContent.innerHTML = '';

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.src;
            img.alt = 'Memória';
            fullscreenContent.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            fullscreenContent.appendChild(video);
        }

        // Update counter
        fullscreenCounter.textContent = `${currentIndex + 1} / ${totalMedia}`;
        
        // Update arrow states
        fullscreenPrev.disabled = currentIndex === 0;
        fullscreenNext.disabled = currentIndex === totalMedia - 1;
    }

    function navigateFullscreen(direction) {
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < totalMedia - 1) {
            currentIndex++;
        }
        
        updateFullscreenContent();
        updateGallery();
        updateCounter();
    }

    function handleFullscreenKeyboard(e) {
        if (!isFullscreenOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) navigateFullscreen('prev');
                break;
            case 'ArrowRight':
                if (currentIndex < totalMedia - 1) navigateFullscreen('next');
                break;
        }
    }

    // Fullscreen event listeners
    fullscreenClose.addEventListener('click', closeFullscreen);
    fullscreenPrev.addEventListener('click', () => navigateFullscreen('prev'));
    fullscreenNext.addEventListener('click', () => navigateFullscreen('next'));
    
    // Close on background click
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            closeFullscreen();
        }
    });

    // Touch swipe support for fullscreen
    let fullscreenTouchStart = 0;
    let fullscreenTouchEnd = 0;
    
    fullscreenViewer.addEventListener('touchstart', (e) => {
        fullscreenTouchStart = e.changedTouches[0].screenX;
    }, { passive: true });
    
    fullscreenViewer.addEventListener('touchend', (e) => {
        fullscreenTouchEnd = e.changedTouches[0].screenX;
        handleFullscreenSwipe();
    }, { passive: true });
    
    function handleFullscreenSwipe() {
        const swipeDistance = fullscreenTouchStart - fullscreenTouchEnd;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0 && currentIndex < totalMedia - 1) {
                navigateFullscreen('next');
            } else if (swipeDistance < 0 && currentIndex > 0) {
                navigateFullscreen('prev');
            }
        }
    }

    // Initialize
    createFallingHearts();
    
    loadMediaFiles().then(mediaFiles => {
        renderGallery(mediaFiles);
    });
});

// Instructions for adding your own media:
// 1. Place your images in: assets/media/images/
// 2. Place your videos in: assets/media/videos/
// 3. Update the mediaFiles array in loadMediaFiles() function with your actual file paths
// Example:
// mediaFiles.push(
//     { type: 'image', src: '../media/images/your-photo.jpg' },
//     { type: 'video', src: '../media/videos/your-video.mp4' }
// );
