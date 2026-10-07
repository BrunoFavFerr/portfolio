// Senha normal (formato de data DD/MM/AAAA)
const CORRECT_PASSWORD = "24/07/2002";

// Easter egg: dia + mês = 11/02 (o antigo 1102), com qualquer ano
const SECRET_DAY = "11";
const SECRET_MONTH = "02";

const pins = [...document.querySelectorAll(".pin")]; // [dia, mês, ano]
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");
const lockScreen = document.getElementById("lockScreen");
const successScreen = document.getElementById("successScreen");
const restartBtn = document.getElementById("restartBtn");

pins.forEach((input, index) => {
  const maxLen = input.maxLength;

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, maxLen);

    // Vai para o próximo campo quando este estiver completo
    if (input.value.length === maxLen && index < pins.length - 1) {
      pins[index + 1].focus();
    }

    error.classList.remove("show");
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      pins[index - 1].focus();
    }

    // Digitar "/" avança para o próximo campo
    if (event.key === "/" && index < pins.length - 1) {
      event.preventDefault();
      pins[index + 1].focus();
    }

    if (event.key === "Enter") unlock();
  });

  // Permite colar a data inteira (ex.: 24/07/2002 ou 24072002)
  input.addEventListener("paste", (event) => {
    const text = (event.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 8);

    if (!text) return;

    event.preventDefault();

    pins[0].value = text.slice(0, 2);
    pins[1].value = text.slice(2, 4);
    pins[2].value = text.slice(4, 8);

    const lastFilled = text.length <= 2 ? 0 : text.length <= 4 ? 1 : 2;
    pins[lastFilled].focus();
  });
});

function unlock() {
  const [dd, mm, yyyy] = pins.map(p => p.value);

  if (dd.length !== 2 || mm.length !== 2 || yyyy.length !== 4) {
    error.textContent = "DIGITE A DATA COMPLETA (DD/MM/AAAA)";
    error.classList.add("show");
    return;
  }

  const entered = `${dd}/${mm}/${yyyy}`;

  // 🔐 SENHA SECRETA — EASTER EGG
  if (dd === SECRET_DAY && mm === SECRET_MONTH) {
    activateSecret();
    return;
  }

  // 🔓 SENHA NORMAL
  if (entered === CORRECT_PASSWORD) {
    window.location.href = "documentos.html";
  } else {
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
