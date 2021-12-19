export default class Command {
    constructor () {
        this.el = document.getElementById("command");
        this.instruction = ''
    }
    
    getCommand() {
        return this.instruction;
    }
    
    setCommand () {
        this.el.addEventListener('keypress', (e) => {
            if (e.key == 'Enter') {
                this.instruction = e.target.value;
            } else {
                return false;
            }
        });
    }
}