import Vector from './Vector';

class Body {
    constructor(public location: Vector, public width: number, public height: number) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgb(0, 0, 0)'
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }

    collidesWith(body: Body): boolean {
        if((this.location.x + this.width > body.location.x) &&
           (this.location.x < body.location.x + body.width) &&
           (this.location.y + this.height > body.location.y) &&
           (this.location.y < body.location.y + body.height)) {
            return true;
        } else {
            return false;
        }
    }
}


export default Body;