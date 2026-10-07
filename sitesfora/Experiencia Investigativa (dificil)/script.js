const SECRET_PASSWORD = "1102";
const CORRECT_PASSWORD = "2479";

const pins = [...document.querySelectorAll(".pin")];
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");
const lockScreen = document.getElementById("lockScreen");
const successScreen = document.getElementById("successScreen");
const restartBtn = document.getElementById("restartBtn");

pins.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && index < pins.length - 1) pins[index + 1].focus();
    error.classList.remove("show");
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      pins[index - 1].focus();
    }

    if (event.key === "Enter") unlock();
  });

  input.addEventListener("paste", (event) => {
    const text = (event.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!text) return;

    event.preventDefault();

    [...text].forEach((digit, i) => {
      if (pins[i]) pins[i].value = digit;
    });

    pins[Math.min(text.length, 4) - 1].focus();
  });
});

function unlock() {
  const entered = pins.map(p => p.value).join("");

  if (entered.length !== 4) {
    error.textContent = "DIGITE OS 4 DÍGITOS";
    error.classList.add("show");
    return;
  }

  // 🔐 SENHA SECRETA — EASTER EGG
  if (entered === SECRET_PASSWORD) {
    activateSecret();
    return;
  }

  // 🔓 SENHA NORMAL
 if (entered === CORRECT_PASSWORD) {
  window.location.href = "documentos.html";
}
 else {
    error.textContent = "SENHA INCORRETA — ACESSO NEGADO";
    error.classList.add("show");

    pins.forEach(p => {
      p.value = "";

      p.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
      ], {
        duration: 220
      });
    });

    pins[0].focus();
  }
}

// 👁️ Easter Egg
function activateSecret() {
  lockScreen.classList.add("secret-glitch");

  // Pequeno atraso para o efeito de glitch aparecer
  setTimeout(() => {
    window.location.href = "secreta.html";
  }, 1800);
}

unlockBtn.addEventListener("click", unlock);

restartBtn.addEventListener("click", () => {
  pins.forEach(p => p.value = "");

  error.classList.remove("show");
  successScreen.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  lockScreen.classList.remove("secret-glitch");

  pins[0].focus();
});

// Verifica se o usuário chegou aqui após recuperar os documentos
const params = new URLSearchParams(window.location.search);

if (params.get("vitoria") === "true") {
  lockScreen.classList.add("hidden");
  successScreen.classList.remove("hidden");
} else {
  pins[0].focus();
}
