document.addEventListener('DOMContentLoaded', function() {
    const loaderOverlay = document.getElementById('loader-overlay');
    setTimeout(() => {
        loaderOverlay.classList.add('hidden');
    }, 500); 

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    
    function applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; 
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; 
        }
    }

    applyTheme();

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode'); 
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light'); 
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    document.querySelectorAll('nav.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('#header').offsetHeight; 
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; 

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth" 
            });
        });
    });

    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0; 
        section.style.transform = 'translateY(50px)'; 
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});