window.addEventListener('DOMContentLoaded', function(){
    const header = document.getElementById('id-global-header')
    const scriptTag = document.getElementById('id-script')
    const titulo = scriptTag.getAttribute('data-titulo')

    const headerDiv =  document.createElement("div");

    headerDiv.className = "global-header dark"

    headerDiv.innerHTML = `
            <div class="logo">
                <img src="../img/logo.svg" alt="Logo de sheinventor">
            </div>
            <div class="titulo">
                <h1 data-i18n="">SheInventor ${titulo}</h1>
            </div>
            <div id="contenedor-menu">
                <div id="lang-selector" class="idioma">
                    <span id="lang-fr">FR</span>
                    <p>/</p>
                    <span id="lang-es">ES</span>
                    <p>/</p>
                    <span id="lang-en">EN</span>
                </div>
                <div class="menu">
                    <ul>
                        <li>
                            <a href="../index.html">Inicio</a>
                        </li>
                        <li>Video</li>
                        <li>Podcast</li>
                        <li>Expocisiones</li>
                        <li>Portafolio</li>
                        <li>Tutoriales</li>
                    </ul>
                </div>
            </div>`;
    
    header.appendChild(headerDiv)
})