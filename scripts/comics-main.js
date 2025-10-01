window.addEventListener("DOMContentLoaded", function () {
  crearCartas();
  const leng = localStorage.getItem("lang");

  const interval = setInterval(() => {
    if (typeof cambiarIdioma === "function") {
      fetch("/resources/translations.json")
        .then((translations) => translations.json())
        .then((data) => {
          cambiarIdioma(leng, data);
          clearInterval(interval);
        });
    }
  }, 100);
});

function crearCartas() {
  fetch("../resources/comics/comics-info.json") // ruta al archivo
    .then((response) => response.json())
    .then((data) => {
      const comicMain = document.getElementById("main-layout");
      const leng = localStorage.getItem("lang");
      comicMain.innerHTML = ``;

      data.forEach((element) => {
        const comicCard = document.createElement("article");

        comicCard.className = "comic-card";

        comicCard.innerHTML = `<a href="./visualizador.html" onclick="comicName('${element["folder"]}')">
                                        <img class="portada" src="${element["portada"]}" alt="">
                                        <h4 class="titulo">${element["titulo"][leng]}</h4>
                                        <p class="descripcion">${element["descripcion"][leng]}</p>
                                    </a>`;
        comicMain.appendChild(comicCard);
      });
    })
    .catch((error) => console.error("Error al leer JSON:", error));
}
