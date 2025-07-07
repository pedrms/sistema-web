document.addEventListener('DOMContentLoaded', function () {
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

    darkModeToggle.addEventListener('click', function () {
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

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;

            document.querySelectorAll('.panel').forEach(p => {
                if (p !== panel) p.style.display = 'none';
            });
            document.querySelectorAll('.accordion').forEach(b => {
                if (b !== button) b.classList.remove('active');
            });

            if (panel.style.display === 'block') {
                panel.style.display = 'none';
                button.classList.remove('active');
            } else {
                panel.style.display = 'block';
                button.classList.add('active');
            }
        });
    });

    const form = document.querySelector('#feedback form');

    if (form) {
        form.addEventListener('submit', function (e) {
            const nome = form.nome.value.trim();
            const email = form.email.value.trim();
            const telefone = form.telefone.value.trim();
            const mensagem = form.mensagem.value.trim();
            const satisfacaoSelecionada = form.querySelector('input[name="satisfacao"]:checked');

            let erros = [];

            if (nome === '') erros.push("Preencha o nome.");
            if (email === '') erros.push("Preencha o email.");
            if (telefone === '') erros.push("Preencha o telefone.");
            if (!satisfacaoSelecionada) erros.push("Selecione uma opção de satisfação.");
            if (erros.length > 0) {
                e.preventDefault(); 
                alert("Por favor, corrija os seguintes erros:\n\n" + erros.join("\n"));
            }
        });
    }
});