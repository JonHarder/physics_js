import Vector from "./Vector";

class Mouse {
    position: Vector;
    rect: any;
    constructor(canvas: HTMLCanvasElement) {
        this.rect = canvas.getBoundingClientRect();
        this.position = new Vector(0, 0);
        window.addEventListener('mousemove', evt => this.updateMousePos(evt));
    }

    updateMousePos(evt) {
        this.position = new Vector(evt.clientX - 10 - this.rect.left, evt.clientY - 80 - this.rect.top);
    }

    forceNormal(location: Vector): Vector {
        let mouseForce = this.position;
        mouseForce = mouseForce.sub(location);
        mouseForce = mouseForce.normalize();
        return mouseForce;
    }
}


export default Mouse;