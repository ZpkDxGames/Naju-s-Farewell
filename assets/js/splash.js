// Splash Screen Animation with Random Loading
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const loadingSection = document.getElementById('loadingSection');
    const successSection = document.getElementById('successSection');
    const startButton = document.getElementById('startButton');
    const confettiContainer = document.getElementById('confettiContainer');

    // Random duration between 5-8 seconds
    const totalDuration = Math.random() * 3000 + 5000; // 5000-8000ms
    const startTime = Date.now();
    let currentProgress = 0;

    // Simulate loading with random intervals
    function updateProgress() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min((elapsedTime / totalDuration) * 100, 100);

        // Add slight randomness to progress updates
        const randomOffset = Math.random() * 2 - 1; // -1 to 1
        currentProgress = Math.min(progress + randomOffset, 100);

        progressBar.style.width = currentProgress + '%';
        progressPercentage.textContent = Math.floor(currentProgress) + '%';

        if (currentProgress < 100) {
            // Random delay between updates (30-100ms)
            const delay = Math.random() * 70 + 30;
            setTimeout(updateProgress, delay);
        } else {
            // Ensure it shows 100%
            progressBar.style.width = '100%';
            progressPercentage.textContent = '100%';
            setTimeout(showSuccess, 500);
        }
    }

    // Show success section with confetti
    function showSuccess() {
        // Add retraction class to progress bar
        progressBar.style.width = '100%';
        progressPercentage.textContent = '100%';
        
        setTimeout(() => {
            progressBar.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            progressBar.style.width = '0%';
            progressPercentage.style.opacity = '0';
        }, 200);
        
        setTimeout(() => {
            progressBar.parentElement.classList.add('retract');
        }, 400);
        
        setTimeout(() => {
            loadingSection.classList.add('fade-out');
        }, 800);
        
        setTimeout(() => {
            loadingSection.style.display = 'none';
            successSection.classList.remove('hidden');
            successSection.classList.add('show');
            
            // Trigger confetti
            createConfetti();
            
            // Show button after a delay with expansion animation
            setTimeout(() => {
                startButton.classList.remove('hidden');
                startButton.classList.add('show');
            }, 600);
        }, 1400);
    }

    // Create confetti animation
    function createConfetti() {
        const colors = ['#ffd700', '#ffc107', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const size = Math.random() * 10 + 5;
                const side = Math.random() > 0.5 ? 'left' : 'right';
                const color = colors[Math.floor(Math.random() * colors.length)];
                const leftPosition = side === 'left' 
                    ? Math.random() * 30 // 0-30% from left
                    : Math.random() * 30 + 70; // 70-100% from left
                const animationDelay = Math.random() * 0.5;
                const animationDuration = Math.random() * 2 + 2; // 2-4 seconds

                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                confetti.style.backgroundColor = color;
                confetti.style.left = leftPosition + '%';
                confetti.style.top = '-10px';
                confetti.style.animationDelay = animationDelay + 's';
                confetti.style.animationDuration = animationDuration + 's';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

                confettiContainer.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, (animationDuration + animationDelay) * 1000);
            }, i * 20); // Stagger confetti creation
        }
    }

    // Start button click handler
    startButton.addEventListener('click', () => {
        // Smooth transition to memories page
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'assets/pages/memories.html';
        }, 800);
    });

    // Start the loading animation
    updateProgress();
});
