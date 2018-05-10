import Vector from './Vector';
import Mouse from './Mouse';
import Body from './Body';


class Entity extends Body {
    velocity: Vector;
    acceleration: Vector;
    topSpeed: number;

    constructor(location: Vector, public mass: number) {
        super(location, mass * 3, mass * 3);
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.topSpeed = 50;
    }


    applyForce(force: Vector) {
        const accel = force.divScalar(this.mass);
        this.acceleration = this.acceleration.add(accel);
    }

    friction(): Vector {
        const MU = 0.8;
        const NORMAL = 1;
        const friction = this.velocity
                           .multScalar(-1)
                           .normalize()
                           .multScalar(MU * NORMAL);
        return friction;
    }

    drag(coefficient: number): Vector {
        const speed = this.velocity.magnitude();
        const dragScalar = coefficient * speed * speed;
        return this.velocity.multScalar(-1).normalize().multScalar(dragScalar);
    }

    update(delta: number, mouse: Mouse) {
        this.velocity = this.velocity.add(this.acceleration).limit(this.topSpeed);
        this.move(this.velocity)
        this.acceleration = this.acceleration.multScalar(0);
    }

    move(velocity: Vector) {
        this.location = this.location.add(velocity);
    }
}

export default Entity;