window.addEventListener('load', function(){
    if (!this.localStorage.getItem('lang')){
        this.localStorage.setItem('lang', 'es')
    }
    if (!this.localStorage.getItem('tema')){
        this.localStorage.setItem('tema', 'dark')
    }
})