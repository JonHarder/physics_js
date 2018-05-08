import Direction from './Direction';

class Vector {
    constructor(public x, public y) {
        this.x = x;
        this.y = y;
    }

    static fromDirection(dir: Direction): Vector {
        switch(dir) {
            case Direction.Up:
                return new Vector(0, -1);
            case Direction.Right:
                return new Vector(1, 0);
            case Direction.Down:
                return new Vector(0, 1);
            case Direction.Left:
                return new Vector(-1, 1);
        }
    }

    static clone(vector: Vector) {
        return new Vector(vector.x, vector.y);
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    sub(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multScalar(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    divScalar(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x ** 2+ this.y ** 2);
    }

    normalize(): Vector {
        const mag = this.magnitude();
        if(!(mag < 0.001)) {
            return this.divScalar(mag);
        }
        return new Vector(this.x, this.y);
    }

    limit(cap: number): Vector {
        const mag = this.magnitude();
        if(mag > cap) {
            return this.normalize().multScalar(cap);
        }
        return Vector.clone(this);
    }
}


export default Vector;