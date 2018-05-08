import Vector from './lib/Vector';
import Random from './lib/Random';
import Direction from './lib/Direction';
import Entity from './lib/Entity';
import Perlin from './lib/Perlin';
import Mouse from './lib/Mouse';


class Walker extends Entity {
    speed: number;
    acceleration: Vector;
    topSpeed: number;
    
    constructor(public location: Vector, mass: number) {
        super(location, mass);
        this.speed = 20;
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.topSpeed = 10;
    }

    checkEdges() {
        if(this.location.x > 600 - this.width) {
            this.location.x = 600 - this.width;
            this.velocity.x = 0;
        }
        if(this.location.x < 0) {
            this.location.x = 0;
            this.velocity.x = 0;
        }
        if(this.location.y > 600 - this.height) {
            this.location.y = 600 - this.height;
            this.velocity.y = 0;
        }
        if(this.location.y < 0) {
            this.location.y = 0;
            this.velocity.y = 0;
        }
    }

    update(delta: number, mouse: Mouse) {
        this.applyForce(mouse.forceNormal(this.location));
        super.update(delta, mouse);
        this.checkEdges();
    }
}


export default Walker;