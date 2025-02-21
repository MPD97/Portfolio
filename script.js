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
