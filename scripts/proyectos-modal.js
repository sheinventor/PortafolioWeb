function openModal(proyecto) {
  fetch(`/img/proyectos/${proyecto}/contenido.json`)
    .then((response) => response.json())
    .then((data) => {
      const leng = localStorage.getItem("lang");
      const modalProyecto = document.createElement("div");
      modalProyecto.id = "proyecto-modal";
      modalProyecto.className = "modal";

      modalProyecto.innerHTML = `
      <section class="layout">
           <div class="header-modal">
        <img id="cerrarModal" src="/img/cerrar-x.png" alt="" />
      </div>
      <div class="img">
        <div id="img-contenedor" class="imgs">
          ${data["img-video"].map((img) => `<img src="${img}" alt="" />`).join("")}
        </div>
        <button class="btn prev">&#10094;</button>
        <button class="btn next">&#10095;</button>
      </div>
      <div class="tit">
        <h1>${data["nombre"][leng]}</h1>
      </div>
      <div class="desc">
        <h2 data-i18n="proyectosModalDescripcion">Descripcion</h2>
        <p>
          ${data["descripcion"][leng]}
        </p>
      </div>
      <div class="tag">
        <div>
          <h2 data-i18n="proyectosModalEtiquetas">Palabras clave</h2>
        </div>
        <div class="etiquetas-contenedor">
            ${data["etiquetas"][leng].map((txt) => `<span class="etiqueta-modal">${txt}</span>`).join("")}
        </div>
      </div>
      <div class="link">
        <h1 data-i18n="proyectosModalOtrosRec">Otros recursos</h1>
        <div class="otros-recursos">
            ${data["recursos"].map((txt) => `<span class=""><a href="${txt}">${txt}</a></span>`).join("")}
        </div>
      </div>
      <div class="des">
      <a href="${data["descargas"]}" class="descargas" data-i18n="proyectosModalDescargas">Descargar los imprimibles</a>
      </div>
      </section>
      `;
      document.body.appendChild(modalProyecto);
      document.body.style.overflow = "hidden";
    })
    .then(() => {
      const cerrar = document.getElementById("cerrarModal");
      const modalProyecto = document.getElementById("proyecto-modal");

      const leng = localStorage.getItem("lang");

      // Cerrar modal
      cerrar.addEventListener("click", () => {
        document.body.style.overflow = "visible";
        modalProyecto.remove();
      });

      // Cerrar al hacer click fuera del modal
      window.addEventListener("click", (e) => {
        if (e.target === modalProyecto) {
          document.body.style.overflow = "visible";
          modalProyecto.remove();
        }
      });

      const slides = document.querySelector(".imgs");
      const images = document.querySelectorAll(".imgs img");
      const prevBtn = document.querySelector(".prev");
      const nextBtn = document.querySelector(".next");

      let index = 0;

      function showSlide(i) {
        const divContenedor = document.getElementById("img-contenedor");
        index = (i + images.length) % images.length;
        slides.style.transform = `translateX(${-index * divContenedor.offsetWidth}px)`;
      }

      prevBtn.addEventListener("click", () => showSlide(index - 1));
      nextBtn.addEventListener("click", () => showSlide(index + 1));

      (async () => {
        try {
          const response = await fetch("/resources/translations.json");
          translations = await response.json();
        } catch (error) {
          console.error("Error cargando las traducciones:", error);
        }
      })().then(() => {
        const elements = document.querySelectorAll("#proyecto-modal [data-i18n]");

        elements.forEach((el) => {
          const key = el.getAttribute("data-i18n");
          if (translations[leng] && translations[leng][key]) {
            el.textContent = translations[leng][key];
          }
        });
      });
    })
    .catch((error) => console.error("Error al leer JSON:", error));
}
