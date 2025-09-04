window.addEventListener('DOMContentLoaded', function(){

    fetch("../resources/comics/comics-info.json") // ruta al archivo
    .then(response => response.json())
    .then(data => {

        const comicMain = document.getElementById('main-layout')

        

        data.forEach(element => {
            
            const comicCard = document.createElement('article')

            comicCard.className = 'comic-card'

            comicCard.innerHTML = `<a href="./visualizador.html" onclick="comicName('${element['folder']}')">
                                        <img class="portada" src="${element['portada']}" alt="">
                                        <h4 class="titulo">${element['titulo']}</h4>
                                        <p class="descripcion">${element['descripcion']}</p>
                                    </a>`
            comicMain.appendChild(comicCard)
        });
    })
    .catch(error => console.error("Error al leer JSON:", error));

})