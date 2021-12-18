import Plane from "./Plane";

export default class Radar {
    constructor () {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.defaultColor = '#39FF14';
        this.plane1 = new Plane(this.canvas, this.ctx, this.centerX, this.centerY, 50, 'AAL91', 'FL90');
        this.plane2 = new Plane(this.canvas, this.ctx, 300, 300, 50, 'JB191', 'FL030');
    }
    
    getCanvasDimensions() {
        return [this.canvas.width, this.canvas.height];
    }
    
    drawRadarCircles() {
        // Inner circle
        this.drawRadarCircle(5);
        
        // Needs to be equally spaced
        const height = this.getCanvasDimensions()[1] / 10;
        const numOfCircles = 5;
        
        for (let i = 1; i <= numOfCircles; i++) {
            this.drawRadarCircle(height * i);
        }
    }
    
    drawRadarCircle(radius) {
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.defaultColor;
        this.ctx.stroke();
    }
    
    setup () {}
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.timeline();
    }
    
    timeline() {
        this.plane1.init();
        this.plane2.init();
        
        this.drawRadarCircles();
    }
    
    init() {
        this.setup();
        this.animate();
    }
}