window.addEventListener("DOMContentLoaded", function () {
  fetch("/resources/proyectos/proyectos-info.json")
    .then((response) => response.json())
    .then((data) => {
      const contenedor = document.getElementById("proyectos-contenedor");
      const leng = localStorage.getItem("lang");

      console.log(leng);

      data.forEach((element) => {
        const proyectoCard = document.createElement("article");
        proyectoCard.className = "card";
        proyectoCard.innerHTML = `
                <a href="#">
            <img src="${element["img"]}" alt="" class="portada" />
            <h1>${element["nombre"][leng]}</h1>
            <section class="etiquetas">
                ${element["etiquetas"][leng].map((txt) => `<span class="etiqueta">${txt}</span>`).join("")}
            </section>
          </a>
            `;
        contenedor.appendChild(proyectoCard);

        /* const etiquetas = document.getElementById("etiquetas");

        const dataEtiquetas = element["etiquetas"][leng];

        dataEtiquetas.forEach((e) => {
          const etiqueta = document.createElement("span");
          etiqueta.className = "etiqueta";
          etiqueta.textContent = e;

          etiquetas.appendChild(etiqueta);
        }); */
      });
    })
    .catch((error) => console.error("Error al leer JSON:", error));
});
