import Vector from './Vector';
import Body from './Body';

class StaticBody extends Body {
    constructor(location: Vector, width: number, height: number) {
        super(location, width, height);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgb(200, 0, 0)'
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }
}


export default StaticBody;