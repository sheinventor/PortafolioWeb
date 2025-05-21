const lang = navigator.language || navigator.userLanguage;

// Solo redirige si no se ha redirigido antes
if (!localStorage.getItem('languageRedirected')) {
  localStorage.setItem('languageRedirected', 'true');

  if (lang.startsWith('fr')) {
    window.location.href = 'fr.html';
  } else if (lang.startsWith('en')) {
    window.location.href = 'en.html';
  } else {
    window.location.href = 'index.html';
  }
}