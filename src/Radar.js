export default class Radar {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.defaultColor = '#39FF14';
        this.fontSize = 12;
        this.fontFace = 'Courier New';
    }
    
    getCanvasDimensions() {
        return [this.canvas.width, this.canvas.height];
    }
    
    drawRadarCircles() {
        // Inner circle
        this.drawRadarCircle(5);
        
        // Needs to be equally spaced
        const height = (this.getCanvasDimensions()[1] - 100) / 10;
        const numOfCircles = 5;
        
        for (let i = 1; i <= numOfCircles; i++) {
            this.drawRadarCircle(height * i);
        }
        
        this.drawHeadings(height * numOfCircles);
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
    
    drawHeadings(radius) {
        this.ctx.save();
        this.ctx.font = `${this.fontSize}pt ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'center';
        // Hardcoded values are padding
        this.ctx.fillText('90', this.centerX + radius + 15, this.centerY);
        this.ctx.fillText('180', this.centerX, this.centerY + radius + 18);
        this.ctx.fillText('270', this.centerX - radius - 20, this.centerY);
        this.ctx.fillText('360', this.centerX, this.centerY - radius - 8);
        this.ctx.restore();
    }
}