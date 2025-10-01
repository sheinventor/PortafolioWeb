window.addEventListener("DOMContentLoaded", function () {
  if (!this.localStorage.getItem("lang")) {
    this.localStorage.setItem("lang", "fr");
    idiomaSelect = document.getElementById("lang-fr");
    const cargarTextos = (async () => {
      try {
        const response = await fetch("./resources/translations.json");
        translations = await response.json();
      } catch (error) {
        console.error("Error cargando las traducciones:", error);
      }
    })().then(() => {
      cambiarIdioma("fr", translations);
      idiomaSelect.classList.add("lang-selected");
    });
  } else {
    idioma = this.localStorage.getItem("lang");

    idiomaSelect = document.getElementById(`lang-${idioma}`);

    const cargarTextos = (async () => {
      try {
        const response = await fetch("./resources/translations.json");
        translations = await response.json();
      } catch (error) {
        console.error("Error cargando las traducciones:", error);
      }
    })().then(() => {
      cambiarIdioma(idioma, translations);
      idiomaSelect.classList.add("lang-selected");
    });
  }
  if (!this.localStorage.getItem("tema")) {
    this.localStorage.setItem("tema", "dark");
  } else {
    tema = this.localStorage.getItem("tema");
    if (tema === "ligth") {
      localStorage.setItem("tema", "dark");
    } else {
      localStorage.setItem("tema", "ligth");
    }
    cambiarModo();
    activarCartas();
  }
  document.body.hidden = false;
});
