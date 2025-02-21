document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        const images = container.querySelectorAll('img');
        const projectCard = container.closest('.project-card');
        
        if (images.length > 1) {
            projectCard.classList.add('multiple-images');
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
        console.log("initializeGA");
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
        console.log(consent);
        if (consent === null) {
            // No decision yet, show banner with delay
            setTimeout(showBanner, 1000);
        } else if (consent === 'accepted') {
            // User previously accepted, initialize GA
            initializeGA();
        }
        else{
            setTimeout(showBanner, 1000);
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

// Language translations
const translations = {
    'pl': {
        'about-title': 'O mnie',
        'about-content': 'Programista .NET z kilkuletnim doświadczeniem w tworzeniu skalowalnych aplikacji webowych i desktopowych. Specjalizuję się w technologii .NET (Core, Framework), WPF, WinForms oraz pracy z bazami danych SQL (SQL Server, PostgreSQL, Oracle) i NoSQL (MongoDB, Redis). Mam doświadczenie w optymalizacji aplikacji pod kątem wydajności, wdrażaniu CI/CD (Azure DevOps, Jenkins) oraz pracy w chmurze (Azure, Docker, Kubernetes).',
        'projects-title': 'Moje Projekty',
        'project-description': 'Aplikacja do konwersji polskich znaków w napisach do filmów. Prosta w obsłudze strona, która pozwala szybko zamienić nieczytelny tekst z napisów poprawiając polskie znaki.',
        'contact-title': 'Kontakt',
        'contact-message': 'Masz pytania? Chcesz nawiązać współpracę? Napisz do mnie!',
        'send-message': 'Wyślij wiadomość'
    },
    'en': {
        'about-title': 'About Me',
        'about-content': '.NET Developer with several years of experience in creating scalable web and desktop applications. I specialize in .NET technology (Core, Framework), WPF, WinForms, and working with SQL databases (SQL Server, PostgreSQL, Oracle) and NoSQL (MongoDB, Redis). I have experience in application performance optimization, CI/CD implementation (Azure DevOps, Jenkins), and cloud computing (Azure, Docker, Kubernetes).',
        'projects-title': 'My Projects',
        'project-description': 'Application for converting Polish characters in movie subtitles. An easy-to-use website that allows you to quickly fix unreadable text in subtitles by correcting Polish characters.',
        'contact-title': 'Contact',
        'contact-message': 'Have questions? Want to collaborate? Write to me!',
        'send-message': 'Send Message'
    }
};

// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const LANGUAGE_KEY = 'selectedLanguage';
    
    // Load saved language preference or default to Polish
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'pl';
    setLanguage(savedLanguage);
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const language = button.dataset.lang;
            setLanguage(language);
            localStorage.setItem(LANGUAGE_KEY, language);
        });
    });
    
    function setLanguage(language) {
        // Update active button state
        languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === language);
        });
        
        // Update text content
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
        
        // Update document language
        document.documentElement.lang = language;
    }
});

// Cookie banner functionality
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.querySelector('.btn-accept');
    const rejectButton = document.querySelector('.btn-reject');
    
    // Sprawdź czy użytkownik zaakceptował politykę
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (cookieChoice !== 'accepted') {
        cookieBanner.style.display = 'block';
    } else {
        cookieBanner.style.display = 'none';
    }
    
    // Obsługa przycisku akceptacji
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.style.display = 'none';
        // Tutaj możesz dodać kod inicjalizujący Google Analytics
    });
    
    // Obsługa przycisku odrzucenia
    rejectButton.addEventListener('click', () => {
        // Usuwamy wybór z localStorage, aby baner pojawił się ponownie po odświeżeniu
        localStorage.removeItem('cookieChoice');
        cookieBanner.style.display = 'none';
    });
});
