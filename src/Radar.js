import Plane from "./Plane";
import Command from "./Command";
import { GUI } from 'dat.gui';
export default class Radar {
    constructor () {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.defaultColor = '#39FF14';
        this.planes = [];
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
    
    randomStartPositionX() {
        return Math.floor(Math.random() * (this.canvas.width - 0 + 1) + 0)
    }
    
    randomStartPositionY() {
        return Math.floor(Math.random() * (this.canvas.height - 0 + 1) + 0)
    }
    
    randomHeading() {
        return Math.floor(Math.random() * (360 - 0 + 1) + 0)
    }
    
    generateFlight() {
        const airlines = ['AAL', 'JB', 'DA', 'UPS', 'FDX'];
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const flightNumber = Math.floor(Math.random() * (5000 - 0 + 1) + 0);
        return `${airline}${flightNumber}`; 
    }
    
    randomFlightLevel() {
        // Class A Only
        const minFL = 190;
        const maxFL = 450;
        return Math.floor(Math.random() * (maxFL - minFL + 1) + minFL);
    }
    
    randomSpeed() {
        const minSpeed = 160;
        const maxSpeed = 420;
        return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
    }
    
    executeCommand() {
        document.getElementById("command").addEventListener('keypress', (e) => {
            if (e.key == 'Enter') {
                const commandArr = e.target.value.split(' ');
                const flight = this.planes.find((flight) => commandArr[0] === flight.callsign);
                flight.setHeading(commandArr[1]);
            } else {
                return false;
            }
        });
    }
    
    setup () {
        // const gui = new GUI();
        // const MAX_PLANES = {numOfPlanes: 8};
        // gui.add(MAX_PLANES, 'numOfPlanes', 1, 50, 1);
        const MAX_PLANES = 8;
        for (let i = 1; i <= MAX_PLANES; i++) {
            this.planes.push(
                new Plane(
                    this.canvas,
                    this.ctx,
                    this.randomStartPositionX(),
                    this.randomStartPositionY(),
                    this.randomHeading(),
                    this.generateFlight(),
                    this.randomFlightLevel(),
                    this.randomSpeed()
                )
            );
        }
        
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.timeline();
    }
    
    timeline() {
        this.planes.forEach((plane) => {
            plane.init();
        });
        
        /* setTimeout(() => {
            this.planes[2].setHeading(90);
        }, 5000); */
        this.executeCommand();
        
        this.drawRadarCircles();
    }
    
    init() {
        this.setup();
        this.animate();
    }
}