const botao = document.getElementById("toggleButton");

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

const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("ativo");
});
