let currentPage = 0;
let totalPages = 0;
let comicName = localStorage.getItem('comicName');
let language = localStorage.getItem('lang');
let manifest = null;
let currentTrackId = null;

const fr = document.getElementById('lang-fr')
const es = document.getElementById('lang-es')
const en = document.getElementById('lang-en')


/* Funciones para cambiar idioma */

const idiomaObserver = new MutationObserver(()=>{
  const fr = document.getElementById('lang-fr')
  const es = document.getElementById('lang-es')
  const en = document.getElementById('lang-en')

  if (fr && es && en){

    fr.addEventListener('click',() => {
      fr.classList.add('lang-selected')
      es.classList.remove('lang-selected')
      en.classList.remove('lang-selected')
      localStorage.setItem('lang', 'fr')

      language = 'fr'
      loadText()

    })

    es.addEventListener('click',() => {
      fr.classList.remove('lang-selected')
      es.classList.add('lang-selected')
      en.classList.remove('lang-selected')
      localStorage.setItem('lang', 'es')
        
      language = 'es'
      loadText()

    })

    en.addEventListener('click',() => {
      fr.classList.remove('lang-selected')
      es.classList.remove('lang-selected')
      en.classList.add('lang-selected')
      localStorage.setItem('lang', 'en')
      
      language = 'en'
      loadText()

    })


    idiomaObserver.disconnect();
  }

})

idiomaObserver.observe(document.body, { childList: true, subtree: true });

/*Fin de funciones para cambiar idioma*/ 

/* document.getElementById("language").addEventListener("change", function () {
  language = this.value;
  loadText();
  updateMoreComicsText();
}); */

function loadManifest(callback) {
  fetch(`../img/comics/${comicName}/manifest.json`)
    .then(res => res.json())
    .then(data => {
      manifest = data;
      totalPages = data.pages;
      callback();
    });
}

function loadComic() {
  document.getElementById("comic-img").src = `../img/comics/${comicName}/${currentPage}.jpg`;
  loadText(); 
}

function loadText() {
  document.querySelectorAll('.text-overlay').forEach(e => e.remove());
  let trackSet = false;

  manifest.dialogs.forEach(d => {
    if (d.page === currentPage && d.lang === language) {
      const span = document.createElement("span");
      span.className = "text-overlay";
      span.innerText = d.text;
      span.dataset.x = d.x;
      span.dataset.y = d.y;
      document.getElementById("comic-container").appendChild(span);

      if ((d.track || d.soundcloud) && !trackSet) {
        if (d.track && d.track !== currentTrackId) {
          loadSpotify(d.track);
          currentTrackId = d.track;
        } else if (d.soundcloud && d.soundcloud !== currentTrackId) {
          loadSoundCloud(d.soundcloud);
          currentTrackId = d.soundcloud;
        }
        trackSet = true;
      }
    }
  });

  adjustTextPositions();
}

function adjustTextPositions() {
  const img = document.getElementById("comic-img");
  const width = img.clientWidth;
  const height = img.clientHeight;

  const contenedor = document.getElementById('comic-viewer')

  document.querySelectorAll(".text-overlay").forEach(span => {
    const x = parseFloat(span.dataset.x);
    const y = parseFloat(span.dataset.y);
    span.style.left = `${(x / 100) * contenedor.clientWidth}px`;
    span.style.top = `${(y / 100) * contenedor.clientHeight}px`;
  });
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    loadComic();
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    loadComic();
  } else {
    alert("¡Fin del cómic!");
  }
}

function goHome() {
  currentPage = 0;
  loadComic();
}

function changeComic(name) {
  comicName = name;
  currentPage = 0;
  const select = document.getElementById("comic-selector");
  select.value = comicName;
  loadManifest(loadComic);
}

function loadComicList() {
  fetch("../img/comics/index.json")
    .then(res => res.json())
    .then(data => {
      //const select = document.getElementById("comic-selector");
      data.comics.forEach(comic => {
        const option = document.createElement("option");
        option.value = comic.id;
        option.textContent = comic.title;
        //select.appendChild(option);
      });

      //select.value = comicName;

      /* select.addEventListener("change", () => {
        comicName = select.value;
        currentPage = 0;
        loadManifest(loadComic);
      }); */
    });
}

/* function loadRecentComics() {
  const comics = ["comic1", "comic2", "comic3", "comic4", "comic5"];
  const container = document.getElementById("recent-comics");
  container.innerHTML = "";

  comics.forEach(name => {
    const img = document.createElement("img");
    img.src = `comics/${name}/0.jpg`;
    img.className = "recent-comic";
    img.onclick = () => {
      changeComic(name);
    };
    container.appendChild(img);
  });
} */

function loadSoundCloud(url) {
  const container = document.getElementById("music-container");
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
  container.innerHTML = `<iframe width="100%" height="80" scrolling="no" frameborder="no" allow="autoplay" src="${embedUrl}"></iframe>`;
  //showMusicText(true);
}

function loadSpotify(trackId) {
  const container = document.getElementById("music-container");
  container.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="auto" height="80px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  //showMusicText(true);
}

function showMusicText(show) {
  const text = document.getElementById("music-text");
  if (show) {
    const messages = {
      es: "Acompaña este cómic con esta canción:",
      en: "Enjoy this comic with this song:",
      fr: "Accompagne ce comic avec cette chanson :"
    };
    text.textContent = messages[language] || messages["en"];
  }
  // Si `show` es false, no hacemos nada para que permanezca
}

/* function updateMoreComicsText() {
  const label = {
    es: "Disfruta más cómics aquí:",
    en: "Enjoy more comics here:",
    fr: "Découvre plus de BD ici :"
  };
  document.getElementById("more-comics-text").textContent = label[language] || label["en"];
} */

document.getElementById("comic-img").addEventListener("load", adjustTextPositions);
window.addEventListener("resize", adjustTextPositions);

loadComicList();
//loadRecentComics();
loadManifest(loadComic);
//  updateMoreComicsText();
