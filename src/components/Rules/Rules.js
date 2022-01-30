import Handlebars from "handlebars";

import './Rules.css';

export default class Rules {
    constructor () {
        this.app = document.getElementById('app');
    }
    
    toggleRules () {
        if (this.drawer.classList.contains('closed')) {
            this.ind.innerText = '-';
            this.drawer.classList.remove('closed');
            this.drawer.classList.add('open');
        } else {
            this.ind.innerText = '+';
            this.drawer.classList.remove('open');
            this.drawer.classList.add('closed');
        }
    }
    
    getRules() {
        return 'Enter flight number followed by the new heading. When a plane is near the edge type the flight number followed by "FCA" (Frequency Change Approved) to score points. You will lose points if the planes get too close.';
    }
    
    render () {
        const source = `<section class="rules"><button id="rulesButton">Rules [<span id="ruleIndicator">+</span>]</button><p class="drawer closed">{{rules}}</p></section>`;
        const template = Handlebars.compile(source);
        const data = { rules: this.getRules() };
        this.app.insertAdjacentHTML('beforeend', template(data));
        this.btn = document.getElementById('rulesButton');
        this.ind = document.getElementById('ruleIndicator');
        this.drawer = document.querySelector('.drawer');
    }
     
    init () {
        this.render();
        this.btn.addEventListener('click', () => this.toggleRules());
    }
}