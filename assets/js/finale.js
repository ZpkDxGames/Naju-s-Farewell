// Finale Page Script
document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const confettiContainer = document.getElementById('confettiContainer');
    const messageOverlay = document.getElementById('messageOverlay');
    const closeButton = document.getElementById('closeButton');
    const backButton = document.getElementById('backButton');

    let isOpened = false;
    let canReopen = false;

    // Back button handler
    backButton.addEventListener('click', () => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'messages.html';
        }, 800);
    });

    // Gift box click handler
    giftBox.addEventListener('click', () => {
        if (!isOpened) {
            isOpened = true;
            openGift();
        } else if (canReopen) {
            reopenGift();
        }
    });

    // Open gift animation
    function openGift() {
        // Add opening animation
        giftBox.classList.add('opening');
        giftBox.classList.remove('opened');

        // Create confetti explosion
        setTimeout(() => {
            createConfettiExplosion();
        }, 400);

        // Show message overlay and mark as opened
        setTimeout(() => {
            giftBox.classList.remove('opening');
            giftBox.classList.add('opened');
            showMessage();
            canReopen = true;
        }, 1200);
    }

    // Reopen gift (replay animation)
    function reopenGift() {
        // Reset confetti container
        confettiContainer.style.opacity = '1';
        confettiContainer.innerHTML = '';

        // Replay opening animation
        giftBox.classList.remove('opened');
        giftBox.classList.add('opening');

        setTimeout(() => {
            createConfettiExplosion();
        }, 400);

        setTimeout(() => {
            giftBox.classList.remove('opening');
            giftBox.classList.add('opened');
            showMessage();
        }, 1200);
    }

    // Create confetti explosion in all directions
    function createConfettiExplosion() {
        const colors = [
            '#ff1744', '#ff5252', '#ffd700', '#ffc107',
            '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd',
            '#ff6b6b', '#ee5a6f', '#f8b500', '#ff4757'
        ];
        const confettiCount = 200;
        const giftRect = giftBox.getBoundingClientRect();
        const centerX = giftRect.left + giftRect.width / 2;
        const centerY = giftRect.top + giftRect.height / 2;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const size = Math.random() * 12 + 6; // 6-18px
                const color = colors[Math.floor(Math.random() * colors.length)];
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = Math.random() * 600 + 300; // 300-900px
                
                // Calculate final position in all directions
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                const animationDuration = Math.random() * 0.8 + 1.2; // 1.2-2 seconds

                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                confetti.style.backgroundColor = color;
                confetti.style.left = centerX + 'px';
                confetti.style.top = centerY + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.animationDuration = animationDuration + 's';
                confetti.style.boxShadow = `0 0 10px ${color}`;
                confetti.style.setProperty('--x', endX + 'px');
                confetti.style.setProperty('--y', endY + 'px');

                confettiContainer.appendChild(confetti);

                // Trigger animation
                setTimeout(() => {
                    confetti.classList.add('active');
                }, 10);

                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, animationDuration * 1000 + 100);
            }, i * 5); // Stagger creation
        }

        // Fade out confetti container
        setTimeout(() => {
            confettiContainer.style.transition = 'opacity 1.5s ease';
            confettiContainer.style.opacity = '0';
        }, 2000);
    }

    // Show message overlay
    function showMessage() {
        messageOverlay.classList.remove('hidden');
        setTimeout(() => {
            messageOverlay.classList.add('show');
        }, 50);

        // Add sparkle effect
        createSparkles();
    }

    // Create sparkle effect around message
    function createSparkles() {
        const sparkleCount = 20;
        const messageCard = document.querySelector('.message-card');

        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = Math.random() * 20 + 15 + 'px';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.opacity = '0';
                sparkle.style.animation = 'sparkle-twinkle 2s ease-in-out';
                sparkle.style.pointerEvents = 'none';

                messageCard.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 100);
        }
    }

    // Close button handler
    closeButton.addEventListener('click', () => {
        messageOverlay.classList.remove('show');
        setTimeout(() => {
            messageOverlay.classList.add('hidden');
        }, 500);
    });

    // Click outside to close
    messageOverlay.addEventListener('click', (e) => {
        if (e.target === messageOverlay || e.target.classList.contains('overlay-background')) {
            closeButton.click();
        }
    });

    // Prevent closing when clicking on message card
    document.querySelector('.message-card').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Add floating animation to gift when idle
    let idleTimer;
    let isIdle = false;

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        if (isIdle && !isOpened) {
            giftBox.style.animation = '';
            isIdle = false;
        }
        
        idleTimer = setTimeout(() => {
            if (!isOpened) {
                giftBox.style.animation = 'gentle-float 3s ease-in-out infinite';
                isIdle = true;
            }
        }, 3000);
    }

    // Add gentle float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gentle-float {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-15px) scale(1.02);
            }
        }

        @keyframes sparkle-twinkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize idle timer
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
    resetIdleTimer();
});
