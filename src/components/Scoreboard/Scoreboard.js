import Handlebars from "handlebars";

import './Scoreboard.css';

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
        const source = `<section class="scoreboard">Score: <span id="score">{{score}}</span></section>`
        const template = Handlebars.compile(source);
        const data = { score: this.getScore() };
        this.app.insertAdjacentHTML('beforeend', template(data));
        this.el = document.getElementById('score');
    }
    
    init() {
        this.render();
    }
}