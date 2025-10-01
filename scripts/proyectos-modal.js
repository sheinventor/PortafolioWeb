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
        <img src="${data["img-video"]}" alt="" />
      </div>
      <div class="tit">
        <h1>${data["nombre"][leng]}</h1>
      </div>
      <div class="desc">
        <h2>Descripcion</h2>
        <p>
          ${data["descripcion"][leng]}
        </p>
      </div>
      <div class="tag">
        <div>
          <h2>Palabras clave</h2>
        </div>
        <div class="etiquetas-contenedor">
            ${data["etiquetas"][leng].map((txt) => `<span class="etiqueta">${txt}</span>`).join("")}
        </div>
      </div>
      <div class="link">
        <h1>Otros Recursos</h1>
        <div class="otros-recursos">
            ${data["recursos"].map((txt) => `<span class=""><a href="${txt}">${txt}</a></span>`).join("")}
        </div>
      </div>
      <div class="des">
      <a href="${data["descargas"]}" class="descargas">Descargar los imprimibles</a>
      </div>
      </section>
      `;
      document.body.appendChild(modalProyecto);
      document.body.style.overflow = "hidden";
    })

    .then(() => {
      const cerrar = document.getElementById("cerrarModal");
      const modalProyecto = document.getElementById("proyecto-modal");

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
    })
    .catch((error) => console.error("Error al leer JSON:", error));
}
