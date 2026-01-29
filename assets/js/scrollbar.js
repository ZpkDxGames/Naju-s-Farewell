// Auto-hide scrollbar implementation
(function() {
    let scrollTimeout;
    
    function handleScroll() {
        // Add scrolling class to show scrollbar
        document.body.classList.add('scrolling');
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Hide scrollbar after 1.5 seconds of no scrolling
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 1500);
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also show on touch/mouse interaction
    let interactionTimeout;
    
    function handleInteraction() {
        document.body.classList.add('scrolling');
        
        clearTimeout(interactionTimeout);
        
        interactionTimeout = setTimeout(() => {
            if (!document.body.classList.contains('scrolling-active')) {
                document.body.classList.remove('scrolling');
            }
        }, 2000);
    }
    
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
})();
