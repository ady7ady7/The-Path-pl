document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            const infoBox = section.nextElementSibling;

            if (infoBox && infoBox.classList.contains('info')) {
                if (infoBox.style.maxHeight === '0px' || infoBox.style.maxHeight === '') {
                    showLinesWithDelay(infoBox);
                } else {
                    hideLines(infoBox);
                }
            }
        });
    });

    function showLinesWithDelay(infoBox) {
        const lines = infoBox.querySelectorAll('p');
        let interval = 1200; // 1000ms = 1 second
        
        // Initially hide all lines
        lines.forEach(line => {
            line.style.opacity = '0';
        });

        // Calculate full height
        infoBox.style.display = 'block';
        infoBox.style.maxHeight = 'none';
        const fullHeight = infoBox.scrollHeight + 'px';
        infoBox.style.maxHeight = '0px';

        // Expand the box to its full size first
        infoBox.style.transition = 'max-height 500ms ease';
        requestAnimationFrame(() => {
            infoBox.style.maxHeight = fullHeight;
        });

        // Once the box is fully expanded, reveal the lines with delay
        setTimeout(() => {
            let currentDelay = 0;
            lines.forEach((line, index) => {
                currentDelay += interval;
                setTimeout(() => {
                    line.style.transition = 'opacity 500ms ease';
                    line.style.opacity = '1';
                }, currentDelay);
            });
            // Remove max-height after animation completes to allow flexible height for resizing
            setTimeout(() => {
                infoBox.style.maxHeight = 'none';
            }, interval * lines.length);
        }, 500); // Wait for the box to fully expand
    }

    function hideLines(infoBox) {
        const lines = infoBox.querySelectorAll('p');
        lines.forEach(line => {
            line.style.opacity = '0';
        });
        infoBox.style.transition = 'max-height 500ms ease'; // Add a transition for hiding
        requestAnimationFrame(() => {
            infoBox.style.maxHeight = '0px';
        });

        // Ensure display is set to 'none' after transition ends
        setTimeout(() => {
            infoBox.style.display = 'none';
        }, 500); // Duration should match transition-duration
    }

    // Contact Info toggle
    const contactButton = document.querySelector('.contact-button');
    const contactInfo = document.querySelector('.contact-info');

    contactButton.addEventListener('click', () => {
        if (contactInfo.style.display === 'none' || contactInfo.style.display === '') {
            contactInfo.style.display = 'block';
        } else {
            contactInfo.style.display = 'none';
        }
    });
    window.scrollTo(0, 0);
});
