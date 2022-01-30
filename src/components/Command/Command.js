import Handlebars from "handlebars";

import './Command.css';

export default class Command {
    constructor () {
        this.app = document.getElementById('app');
        this.commandStr = '';
        this.commandArr = [];
    }
    
    getCommand() {
        return {
            flight: this.commandArr[0],
            heading: this.commandArr[1]
        }
    }
    
    setCommand () {
        return false;
    }
    
    ael () {
        this.el.addEventListener('keypress', (e) => this.handleEvent(e));
    }
    
    handleEvent(e) {
        if (e.key == 'Enter') {
            this.commandStr = e.target.value;
            this.commandArr = this.commandStr.split(' ');
        }
    }
    
    render() {
        const source = `<section class="command-container"><input id="command" placeholder="{{placeholder}}"></section>`;
        const template = Handlebars.compile(source);
        const data = { placeholder: 'AAL123 90' };
        this.app.insertAdjacentHTML('beforeend', template(data));
        this.el = document.getElementById("command");
    }
    
    init() {
        this.render();
        
        window.onload = function () {
            document.getElementById('command').focus();
        }
    }
}