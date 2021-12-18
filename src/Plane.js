export default class Plane {
    constructor (canvas, ctx, x, y, heading, callsign, altitude) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.boxSize = 10;
        this.x = x - this.boxSize / 2;
        this.y = y - this.boxSize / 2;
        this.heading = heading;
        this.callsign = callsign;
        this.altitude = altitude;
        this.defaultColor = '#39FF14';
        this.labelOffset = [25, 25];
        this.fontSize = '14pt';
        this.fontFace = 'Courier New';
        this.angle = 45;
        this.degrees = this.angle * Math.PI / 180
        this.timefactor = 100;
    }
    
    calculateVelocity() {
        return [Math.cos(this.degrees) / this.timefactor, Math.sin(this.degrees) / this.timefactor]
    }
    
    calculateHeading() {
        if (this.angle < 270) {
            return this.angle - 90;
        } else {
            return this.angle - 270;
        }
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
        // TODO change to degrees
        // TODO figure out speed
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.boxSize / 2, this.y + this.boxSize / 2);
        this.ctx.lineTo(this.x + this.heading, this.y + this.heading);
        this.ctx.stroke();
    }
    
    callsignText () {
        this.ctx.font = `${this.fontSize} ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(this.callsign, this.x + this.labelOffset[0], this.y + this.labelOffset[1]);
    }
    
    altitudeText () {
        const lineHeight = 18;
        this.ctx.font = `${this.fontSize} ${this.fontFace}`;
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(this.altitude, this.x + this.labelOffset[0], this.y + this.labelOffset[1] + lineHeight);
    }
    
    // speedText () {
        // this.ctx.font = `${this.fontSize} ${this.fontFace}`;
        // this.ctx.fillStyle = this.defaultColor;
        // this.ctx.textAlign = 'left';
        // this.ctx.fillText(this.interval, this.x + offsetX, this.y + offsetY + 36);
    // }
    
    draw () {
        this.ctx.save();
        
        // Box
        this.box();
        
        // Tail | Direction
        this.tail();
        
        // Callsign
        this.callsignText();
    
        // Altitude
        this.altitudeText();
        
        // Speed
        //this.speedText();
        
        this.ctx.restore();
    }
    
    update() {
        this.draw();
        this.x += this.calculateVelocity()[0];
        this.y += this.calculateVelocity()[1];
        this.calculateHeading();
    }
    
    init() {
        this.update();
    }
}