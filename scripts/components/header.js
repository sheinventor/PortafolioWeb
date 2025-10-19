window.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("id-global-header");
  const scriptTag = document.getElementById("id-script");
  const titulo = scriptTag.getAttribute("data-titulo");

  const leng = localStorage.getItem("lang");

  fetch("/resources/translations.json")
    .then((response) => response.json())
    .then((data) => {
      const headerDiv = document.createElement("div");

      headerDiv.className = "global-header dark";

      headerDiv.innerHTML = `
            <div class="logo">
                <a href="/index.html">
                    <img src="../img/logo.svg" alt="Logo de sheinventor">
                </a>    
            </div>
            <div class="titulo">
                <h1 class="titulo" data-i18n="">SheInventor ${titulo}</h1>
            </div>
            <div id="contenedor-menu">
                <div id="lang-selector" class="idioma">
                    <span id="lang-fr">FR</span>
                    <p>/</p>
                    <span id="lang-es">ES</span>
                    <p>/</p>
                    <span id="lang-en">EN</span>
                </div>
                <div class="menu-toggle" id="menu-toggle">
                    <!-- Icono de 3 barras -->
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="menu" id="menu">
                    <ul class="nav-list">
                        <li>
                            <a href="/index.html" data-i18n="">Inicio</a>
                        </li>
                        <li>
                            <a href="/pages/comics.html" data-i18n="comics">comics</a>
                        </li>
                        <li>
                            <a href="/pages/enConstruccion.html" data-i18n="">
                                Video
                            </a>
                        </li>
                        <li>
                            <a href="/pages/enConstruccion.html" data-i18n="">
                                Podcast
                            </a>
                        </li>
                        <li>
                            <a href="/pages/proyectos.html" data-i18n="portafolio">Biblioteca de proyectos</a>
                        </li>
                    </ul>
                </div>
            </div>`;

      header.appendChild(headerDiv);

      const interval = this.setInterval(() => {
        /*Agrega evento de click al menu-togle*/
        const toggle = document.getElementById("menu-toggle");
        const nav = document.getElementById("menu");

        if (toggle && nav) {
          console.log("Se creo nav y toggle");
          toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
          });
          clearInterval(interval);
        }
      }, 100);
    });
});
