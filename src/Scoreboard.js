export default class Scoreboard {
    constructor () {
        this.el = document.getElementById('score');
        this.score = 0;
    }
    
    getScore () {
        return this.score;
    }
    
    setScore(score) {
        this.score += score;
        this.el.innerText = this.score;
    }
    
    init() {
        this.el.innerText = this.score;
    }
}