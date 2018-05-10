import StaticBody from "./StaticBody";
import Vector from "./Vector";
import Entity from "./Entity";

class Attractor extends StaticBody {
    G: number;
    mass: number;
    constructor(location: Vector, mass: number) {
        super(location, mass * 3, mass * 3);
        this.mass = mass;
        this.G = 1.3;
    }

    gravityForce(entity: Entity): Vector {
        // check for 0
        const force = entity.location.sub(this.location);
        const distance = force.magnitude();
        const m = (this.mass * entity.mass * this.G) / (distance * distance);
        const gf =  force.normalize().multScalar(-m);
        return gf;
    }
}


export default Attractor;