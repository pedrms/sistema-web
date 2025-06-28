document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("toggleButton");
    const toggle = document.getElementById("menu-toggle");
    const nav = document.querySelector("nav");

    function aplicarModo(modoEscuroAtivo) {
        if (modoEscuroAtivo) {
            document.body.classList.add("modo-escuro");
            botao.textContent = "Modo Claro";
        } else {
            document.body.classList.remove("modo-escuro");
            botao.textContent = "Modo Escuro";
        }
    }

    const modoSalvo = localStorage.getItem("modo") === "escuro";
    aplicarModo(modoSalvo);

    botao.addEventListener("click", () => {
        const modoAtualEscuro = document.body.classList.toggle("modo-escuro");
        localStorage.setItem("modo", modoAtualEscuro ? "escuro" : "claro");
        aplicarModo(modoAtualEscuro);
    });

    toggle.addEventListener("click", () => {
        nav.classList.toggle("ativo");
    });

    const produtosLink = document.querySelector("nav div > a[href='#produtos']");
    const produtosMenu = document.querySelector("nav div ul");

    produtosLink.addEventListener("focus", () => {
        produtosMenu.style.display = "block";
    });

    produtosLink.addEventListener("blur", () => {
        setTimeout(() => {
            if (!produtosMenu.matches(":hover") && !produtosLink.matches(":hover")) {
                produtosMenu.style.display = "none";
            }
        }, 100);
    });
});

const acc = document.querySelectorAll(".accordion");
    acc.forEach(btn => {
        btn.addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });
