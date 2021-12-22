import Radar from "./Radar";
import Plane from "./Plane";
import Scoreboard from "./Scoreboard";

export default class Game {
    constructor () {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.defaultColor = '#39FF14';
        this.planes = [];
        this.scoreboard = new Scoreboard();
        this.radar = new Radar(this.canvas, this.ctx);
        this.MAX_PLANES = 8;
        this.fcaArea = 100;
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
        const airlines = ['AAL', 'JBU', 'DAL', 'SWA', 'NKS', 'ASA', 'UAL'];
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
                if (commandArr[1] === 'FCA') {
                    const flightIndex = this.planes.findIndex((flight) => commandArr[0] === flight.callsign);
                    if (flight.getFCA() === true) {
                        this.planes.splice(flightIndex, 1);
                        this.scoreboard.setScore(100);
                    } else {
                        this.scoreboard.setScore(-10);
                    }
                }
                if (Number.isInteger(parseInt(commandArr[1]))) {
                    flight.setHeading(commandArr[1]);
                }
            } else {
                return false;
            }
        });
    }
    
    setup () {
        this.scoreboard.init();
        for (let i = 1; i <= this.MAX_PLANES; i++) {
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
            plane.update();
            
            for (let j = 0; j < this.planes.length; j++) {
                if (plane.callsign !== this.planes[j].callsign) {
                    const d = Math.hypot(plane.x - this.planes[j].x, plane.y - this.planes[j].y);
                    
                    // 1000ft seperation
                    // TODO 3mi vertical
                    if (d < 30) {
                        this.scoreboard.setScore(-0.05);
                    }
                }
            }
            
            if (
                (plane.x > 0 && plane.x < this.fcaArea) ||
                (plane.x < this.canvas.width && plane.x > this.canvas.width - this.fcaArea) ||
                (plane.y > 0 && plane.y < this.fcaArea) ||
                (plane.y < this.canvas.height && plane.y > this.canvas.height - this.fcaArea)
            ) {
                plane.setFCA(true);
            } else {
                plane.setFCA(false);
            }
        });
        
        this.radar.drawRadarCircles();
    }
    
    init() {
        this.setup();
        this.animate();
        this.executeCommand();
        // setInterval(() => {
        //     this.scoreboard.setScore(5);
        // }, 5000);
    }
}