function cambiarModo(){
    const tema = localStorage.getItem('tema') || (()=>{
        localStorage.setItem('tema', 'dark')
        return 'dark'
    })();

    const elements = document.querySelectorAll(`[class*="${tema}"]`)

    let temaNuevo

    if (tema === 'dark'){
        temaNuevo = 'ligth'
    } else if( tema === 'ligth'){
        temaNuevo = 'dark'
    }

    elements.forEach((e) => {
        e.classList.forEach(clase => {
            if (clase.includes(tema)){
                const nuevaClase = clase.replace(tema, temaNuevo)
                e.classList.replace(clase, nuevaClase)
            }
        })
    })

    localStorage.setItem('tema', temaNuevo)
}