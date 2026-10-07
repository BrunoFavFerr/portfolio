const countdownElement = document.getElementById("countdown");
const fadeScreen = document.getElementById("fadeScreen");

let seconds = 3;

const countdown = setInterval(() => {
seconds--;

countdownElement.textContent = seconds;

if (seconds <= 0) {
clearInterval(countdown);

// Começa o escurecimento da tela
fadeScreen.classList.add("active");

// Depois do fade, vai para a tela de vitória
setTimeout(() => {
 window.location.href = "index.html?vitoria=true";

}, 1800);


}
}, 1000);