document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const switchToEnglishButton = document.getElementById('switch-to-english');
    const contactButton = document.querySelector('.contact-button');
    const contactInfo = document.querySelector('.contact-info');

    if (switchToEnglishButton) {
        switchToEnglishButton.addEventListener('click', () => {
            window.location.href = 'https://ady7ady7.github.io/The-Path/';
        });
    }

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

    if (contactButton && contactInfo) {
        contactButton.addEventListener('click', () => {
            if (contactInfo.style.opacity === '0' || contactInfo.style.opacity === '') {
                showContactInfo(contactInfo);
            } else {
                hideContactInfo(contactInfo);
            }
        });
    }

    function showLinesWithDelay(infoBox) {
        const lines = infoBox.querySelectorAll('p');
        let interval = 800;

        lines.forEach(line => {
            line.style.opacity = '0';
        });

        infoBox.style.display = 'block';
        infoBox.style.maxHeight = 'none';
        const fullHeight = infoBox.scrollHeight + 'px';
        infoBox.style.maxHeight = '0px';

        infoBox.style.transition = 'max-height 500ms ease';
        requestAnimationFrame(() => {
            infoBox.style.maxHeight = fullHeight;
        });

        setTimeout(() => {
            let currentDelay = 0;
            lines.forEach((line, index) => {
                currentDelay += interval;
                setTimeout(() => {
                    line.style.transition = 'opacity 500ms ease';
                    line.style.opacity = '1';
                }, currentDelay);
            });
            setTimeout(() => {
                infoBox.style.maxHeight = 'none';
            }, interval * lines.length);
        }, 500);
    }

    function hideLines(infoBox) {
        const lines = infoBox.querySelectorAll('p');
        lines.forEach(line => {
            line.style.opacity = '0';
        });
        infoBox.style.transition = 'max-height 500ms ease';
        requestAnimationFrame(() => {
            infoBox.style.maxHeight = '0px';
        });

        setTimeout(() => {
            infoBox.style.display = 'none';
        }, 500);
    }

    function showContactInfo(contactInfo) {
        contactInfo.style.display = 'block';
        requestAnimationFrame(() => {
            contactInfo.style.transition = 'opacity 500ms ease';
            contactInfo.style.opacity = '1';
        });
    }

    function hideContactInfo(contactInfo) {
        requestAnimationFrame(() => {
            contactInfo.style.transition = 'opacity 500ms ease';
            contactInfo.style.opacity = '0';
        });

        setTimeout(() => {
            contactInfo.style.display = 'none';
        }, 5000); // Match this timeout with the duration of opacity transition
    }
});
