const interval = setInterval(() => {
  const fr = document.getElementById("lang-fr");
  const es = document.getElementById("lang-es");
  const en = document.getElementById("lang-en");

  if (fr) {
    fr.addEventListener("click", () => {
      fr.classList.add("lang-selected");
      es.classList.remove("lang-selected");
      en.classList.remove("lang-selected");
      localStorage.setItem("lang", "fr");

      const cargarTextos = (async () => {
        try {
          const response = await fetch("/resources/translations.json");
          translations = await response.json();
        } catch (error) {
          console.error("Error cargando las traducciones:", error);
        }
      })().then(() => {
        cambiarIdioma("fr", translations, true);
      });
    });
  }

  if (es) {
    es.addEventListener("click", () => {
      fr.classList.remove("lang-selected");
      es.classList.add("lang-selected");
      en.classList.remove("lang-selected");
      localStorage.setItem("lang", "es");

      const cargarTextos = (async () => {
        try {
          const response = await fetch("/resources/translations.json");
          translations = await response.json();
        } catch (error) {
          console.error("Error cargando las traducciones:", error);
        }
      })().then(() => {
        cambiarIdioma("es", translations, true);
      });
    });
  }

  if (en) {
    en.addEventListener("click", () => {
      fr.classList.remove("lang-selected");
      es.classList.remove("lang-selected");
      en.classList.add("lang-selected");
      localStorage.setItem("lang", "en");

      const cargarTextos = (async () => {
        try {
          const response = await fetch("/resources/translations.json");
          translations = await response.json();
        } catch (error) {
          console.error("Error cargando las traducciones:", error);
        }
      })().then(() => {
        cambiarIdioma("en", translations, true);
      });
    });
  }
  if (fr && es && en) {
    clearInterval(interval);
  }
}, 100);

function cambiarIdioma(lang, translations, cartas) {
  if (typeof crearCartas === "function" && cartas) {
    crearCartas();
  }

  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  if (translations[lang] && translations[lang].projects) {
    document.title = translations[lang].projects + " | SheInventor";
  }
}

async function abrirTextos() {
  return fetch("/resources/translations.json").then((response) => response.json());
}
