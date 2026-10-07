// =========================================
// PORTFÓLIO — BRUNO FAVALLI FERREIRA
// SCRIPT.JS
// =========================================


// =========================================
// MENU MOBILE
// Fecha o menu depois de clicar em um link
// =========================================

const menuLinks = document.querySelectorAll(".navbar-nav .nav-link");
const menu = document.querySelector("#menu");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (menu && menu.classList.contains("show")) {

            const botaoMenu = document.querySelector(".navbar-toggler");

            if (botaoMenu) {
                botaoMenu.click();
            }

        }

    });

});


// =========================================
// NAVBAR AO ROLAR A PÁGINA
// =========================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            navbar.style.padding = "12px 0";
        } else {
            navbar.style.padding = "18px 0";
        }

    });

}


// =========================================
// ANO AUTOMÁTICO
// =========================================

const footer = document.querySelector("footer p");

if (footer) {

    footer.textContent =
        `© ${new Date().getFullYear()} Bruno Favalli Ferreira`;

}


// =========================================
// FORMULÁRIO DE CONTATO
// =========================================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const nome = document.querySelector("#nome").value;
        const email = document.querySelector("#email").value;
        const mensagem = document.querySelector("#mensagem").value;


        const destino = "SEUEMAIL@email.com";


        const assunto = `Contato pelo portfólio - ${nome}`;

        const corpo =
            `Nome: ${nome}\n` +
            `E-mail: ${email}\n\n` +
            `Mensagem:\n${mensagem}`;


        const link =
            `mailto:${destino}` +
            `?subject=${encodeURIComponent(assunto)}` +
            `&body=${encodeURIComponent(corpo)}`;


        window.location.href = link;

    });

}