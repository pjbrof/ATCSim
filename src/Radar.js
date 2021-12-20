export default class Radar {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.defaultColor = '#39FF14';
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
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.defaultColor;
        this.ctx.stroke();
        this.ctx.restore();
    }
}