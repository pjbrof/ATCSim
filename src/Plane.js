export default class Plane {
    constructor (canvas, ctx, x, y, heading, callsign, altitude, speed) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.boxSize = 10;
        this.boxCenterX = x - this.boxSize / 2;
        this.boxCenterY = y - this.boxSize / 2;
        this.x = this.boxCenterX;
        this.y = this.boxCenterY;
        this.tailX = x;
        this.tailY = y;
        this.heading = heading;
        this.callsign = callsign;
        this.altitude = altitude;
        this.speed = speed;
        this.defaultColor = '#39FF14';
        this.labelOffset = [25, 25];
        this.fontSize = 12;
        this.lineHeight = 18;
        this.fontFace = 'Courier New';
        this.timefactor = 40;
    }
    
    getDegrees() {
        return this.heading - 90;
    }
    
    getRadians() {
        return this.getDegrees() * Math.PI / 180;
    }
    
    calculateVelocity() {
        return [Math.cos(this.getRadians()) / this.timefactor, Math.sin(this.getRadians()) / this.timefactor]
    }
    
    calculateInverseVelocity() {
        return [-Math.cos(this.getRadians()), -Math.sin(this.getRadians())]
    }
    
    calculateDistance(a, b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }
    
    getTail() {
        return [
            this.x + this.boxSize / 2 + this.calculateInverseVelocity()[0] * this.speed / 3.5, 
            this.y + this.boxSize / 2 + this.calculateInverseVelocity()[1] * this.speed / 3.5
        ]; 
    }
    
    setHeading(heading) {
        this.heading = heading;
    }
    
    box () {
        this.ctx.beginPath();
        this.ctx.rect(
            this.x,
            this.y,
            this.boxSize,
            this.boxSize
        );
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.defaultColor;
        this.ctx.stroke();
    }
    
    tail () {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.boxSize / 2, this.y + this.boxSize / 2);
        this.ctx.lineTo(this.getTail()[0], this.getTail()[1]);
        this.ctx.stroke();
    }
    
    callsignText () {
        this.ctx.font = `${this.fontSize}pt ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(this.callsign, this.x + this.labelOffset[0], this.y + this.labelOffset[1]);
    }
    
    altitudeText () {
        this.ctx.font = `${this.fontSize}pt ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`FL${this.altitude}`, this.x + this.labelOffset[0], this.y + this.labelOffset[1] + this.lineHeight);
    }
    
    speedText () {
        this.ctx.font = `${this.fontSize}pt ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`${this.speed}kts`, this.x + this.labelOffset[0], this.y + this.labelOffset[1] + this.lineHeight * 2);
    }
    
    draw () {
        this.ctx.save();
        this.box();
        this.tail();
        this.callsignText();
        this.altitudeText();
        this.speedText();
        this.ctx.restore();
    }
    
    update() {
        this.draw();
        this.x += this.calculateVelocity()[0];
        this.y += this.calculateVelocity()[1];
    }
    
    init() {
        this.update();
    }
}