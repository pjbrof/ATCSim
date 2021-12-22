export default class Scoreboard {
    constructor () {
        this.app = document.getElementById('app');
        this.score = 0;
    }
    
    getScore () {
        return Math.floor(this.score);
    }
    
    setScore(score) {
        this.score += score;
        this.el.innerText = this.getScore();
    }
    
    render() {
        const wrapper = document.createElement('section');
        const text = document.createTextNode('Score: ');
        wrapper.appendChild(text);
        wrapper.className = 'scoreboard';
        this.el = document.createElement('span');
        this.el.id = 'score';
        wrapper.appendChild(this.el);
        this.app.appendChild(wrapper);
    }
    
    init() {
        this.render();
        this.el.innerText = this.getScore();
    }
}