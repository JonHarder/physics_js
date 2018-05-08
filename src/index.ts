import Entity from './lib/Entity';
import Walker from './Walker';
import Vector from './lib/Vector';
import Mouse from './lib/Mouse';
import Random from './lib/Random';
import StaticBody from './lib/StaticBody';
import Body from './lib/Body';


const WIDTH = 600;
const HEIGHT = 600;

let entities: Entity[] = [];
let lastRender = 0;
let ctx: CanvasRenderingContext2D | null;
let mouse: Mouse;
const blocks: Array<Body> = [];


const render = () => {
    if(ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for(let block of blocks) {
            block.draw(ctx);
        }
        for(const ent of entities) {
            ent.draw(ctx);
        }
    }
}

const update = delta => {
    for(const ent of entities) {
        const gravity = new Vector(0, 0.5 * ent.mass);
        // ent.applyForce(gravity);
        const old_loc = ent.location;
        ent.update(delta, mouse);
        for(let block of blocks) {
            if(block.collidesWith(ent)) {
                ent.location = old_loc;
                ent.velocity = new Vector(0, 0);
                ent.acceleration = new Vector(0, 0);
            }
        }
    }
}


const loop = timestamp => {
    let progress = timestamp - lastRender;

    update(progress);
    render();

    lastRender = timestamp;

    window.requestAnimationFrame(loop);
}


const createCanvas = () => {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('height', HEIGHT.toString());
    canvas.setAttribute('width', WIDTH.toString());
    canvas.setAttribute('style', 'border: 1px solid black;');
    return canvas;
}


function makeWalker(): Walker {
    const x = WIDTH/2 + Random.randRange(-100, 100);
    const y = HEIGHT/2 + Random.randRange(-100, 100);
    const loc = new Vector(x, y);
    const mass = Random.randRange(1, 20);
    return new Walker(loc, mass);
}

const main = () => {
    const w = new Walker(new Vector(100, 400), 10);
    entities.push(w);
    blocks.push(new StaticBody(new Vector(100, 100), 30, 30));
    blocks.push(new StaticBody(new Vector(300, 400), 30, 70));
    const canvas = createCanvas();
    mouse = new Mouse(canvas);
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    window.requestAnimationFrame(loop);
}


document.body.onload = () => {
    main();
}