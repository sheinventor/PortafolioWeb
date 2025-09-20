class ButtonDonation extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = `<p> Hola mundo </p>`;
    }

}

window.customElements.define("button-donation", ButtonDonation);
