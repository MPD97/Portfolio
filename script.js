document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        const images = container.querySelectorAll('img');
        if (images.length > 1) {
            let currentImageIndex = 0;
            let intervalId = null;
            
            const controls = container.nextElementSibling;
            const prevBtn = controls.querySelector('.prev-btn');
            const nextBtn = controls.querySelector('.next-btn');
            const counter = controls.querySelector('.image-counter');
            
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            
            const updateCounter = () => {
                counter.textContent = `${currentImageIndex + 1}/${images.length}`;
            };
            
            const showImage = (index) => {
                images.forEach((img, i) => {
                    img.style.display = i === index ? 'block' : 'none';
                });
                updateCounter();
            };
            
            const startSlideshow = () => {
                intervalId = setInterval(() => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    showImage(currentImageIndex);
                }, 3000);
            };
            
            prevBtn.addEventListener('click', () => {
                clearInterval(intervalId);
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(currentImageIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                clearInterval(intervalId);
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            });
            
            showImage(0);
            startSlideshow();
        }
    });
});

// Track project link clicks
document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        gtag('event', 'project_link_click', {
            'project_name': e.target.closest('.project-card').querySelector('h3').textContent,
            'link_type': e.target.textContent === 'GitHub' ? 'github' : 'demo'
        });
    });
});

// Track LinkedIn link clicks
document.querySelector('.linkedin-link').addEventListener('click', () => {
    gtag('event', 'social_link_click', {
        'platform': 'linkedin'
    });
});

// Google Analytics initialization with consent management
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const COOKIE_CONSENT_KEY = 'cookieConsent';

    // Function to initialize Google Analytics
    const initializeGA = () => {
        // Load GA script dynamically only if consent is granted
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    };

    // Function to hide banner
    const hideBanner = () => {
        cookieBanner.classList.remove('visible');
    };

    // Function to show banner
    const showBanner = () => {
        cookieBanner.classList.add('visible');
    };

    // Check stored consent
    const checkConsent = () => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (consent === null) {
            // No decision yet, show banner with delay
            setTimeout(showBanner, 1000);
        } else if (consent === 'accepted') {
            // User previously accepted, initialize GA
            initializeGA();
        }
    };

    // Handle accept button click
    acceptButton.addEventListener('click', () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        hideBanner();
        initializeGA();
    });

    // Handle reject button click
    rejectButton.addEventListener('click', () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
        hideBanner();
    });

    // Check consent on page load
    checkConsent();
});
