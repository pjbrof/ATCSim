export default class Command {
    constructor () {
        this.el = document.getElementById("command");
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
}