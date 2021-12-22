export default class Rules {
    constructor () {
        this.app = document.getElementById('app');
    }
    
    toggleRules () {
        
    }
    
    getRules() {
        return 'Enter flight number followed by the new heading. When a plane is near the edge type the flight number followed by "FCA" (Frequency Change Approved) to score points. You will lose points if the planes get too close.';
    }
    
    render () {
        const wrapper = document.createElement('section');
        wrapper.className = 'rules';
        this.el = document.createElement('button');
        this.el.id = 'rulesButton';
        this.el.innerText = 'Rules [+]';
        wrapper.appendChild(this.el);
        this.app.appendChild(wrapper);
    }
     
    init () {
        this.render();
    }
}