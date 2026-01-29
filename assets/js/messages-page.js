// Messages Page Script
document.addEventListener('DOMContentLoaded', () => {
    const messagesWrapper = document.getElementById('messagesWrapper');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    // Back button handler
    backButton.addEventListener('click', () => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'memories.html';
        }, 800);
    });

    // Render messages
    function renderMessages() {
        messages.forEach((message, index) => {
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.style.animationDelay = `${index * 0.2}s`;

            const text = document.createElement('p');
            text.className = 'message-text';
            text.textContent = message.text;

            // Check if message is long enough to need read more button
            const needsReadMore = message.text.length > 300;

            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.innerHTML = '<span class="read-more-text">Ler mais</span><span class="arrow">▼</span>';
            
            if (needsReadMore) {
                readMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    bubble.classList.toggle('expanded');
                    const isExpanded = bubble.classList.contains('expanded');
                    readMoreBtn.querySelector('.read-more-text').textContent = isExpanded ? 'Ler menos' : 'Ler mais';
                });
            } else {
                readMoreBtn.style.display = 'none';
                bubble.classList.add('expanded');
            }

            const author = document.createElement('div');
            author.className = 'message-author';
            author.textContent = message.author;

            bubble.appendChild(text);
            bubble.appendChild(readMoreBtn);
            bubble.appendChild(author);
            messagesWrapper.appendChild(bubble);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all message bubbles
    setTimeout(() => {
        const bubbles = document.querySelectorAll('.message-bubble');
        bubbles.forEach(bubble => {
            observer.observe(bubble);
        });
    }, 100);

    // Add sparkle effect on hover
    messagesWrapper.addEventListener('mousemove', (e) => {
        const bubble = e.target.closest('.message-bubble');
        if (bubble) {
            const rect = bubble.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            bubble.style.setProperty('--mouse-x', `${x}px`);
            bubble.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // Next button click handler
    nextButton.addEventListener('click', () => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'finale.html';
        }, 800);
    });

    // Initialize
    renderMessages();

    // Add subtle floating animation to random bubbles
    setInterval(() => {
        const bubbles = document.querySelectorAll('.message-bubble');
        const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
        
        if (randomBubble) {
            randomBubble.style.transform = 'translateY(-8px) scale(1.01)';
            setTimeout(() => {
                randomBubble.style.transform = '';
            }, 300);
        }
    }, 3000);
});
