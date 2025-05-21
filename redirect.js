const lang = navigator.language || navigator.userLanguage;

if (lang.startsWith('fr')) {
  window.location.href = 'fr.html';
} else if (lang.startsWith('en')) {
  window.location.href = 'en.html';
} else {
  window.location.href = 'index.html';
}
