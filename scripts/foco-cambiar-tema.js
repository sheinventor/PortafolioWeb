const foco = document.getElementById("img-foco-cambiar");

// Movimiento del foco
foco.addEventListener("click", () => {
  foco.classList.add("agitar");
  cambiarModo();
  activarCartas();
  setTimeout(() => {
    foco.classList.remove("agitar");
  }, 500);
});

function activarCartas() {
  const cartaComic = document.getElementById("art-comic");
  const cartaPortafolio = document.getElementById("art-portafolio");

  const cartaVideos = document.getElementById("art-videos");
  const cartaPodcast = document.getElementById("art-podcast");

  const tema =
    localStorage.getItem("tema") ||
    (() => {
      localStorage.setItem("tema", "dark");
      return "dark";
    })();

  if (tema === "ligth") {
    cartaComic.classList.add("ocultar");
    cartaPortafolio.classList.add("ocultar");

    cartaVideos.classList.remove("ocultar");
    cartaPodcast.classList.remove("ocultar");
  }
  if (tema === "dark") {
    cartaComic.classList.remove("ocultar");
    cartaPortafolio.classList.remove("ocultar");

    cartaVideos.classList.add("ocultar");
    cartaPodcast.classList.add("ocultar");
  }
}
