import Entity from './lib/Entity';
import Walker from './Walker';
import Vector from './lib/Vector';
import Mouse from './lib/Mouse';
import Random from './lib/Random';
import Liquid from './lib/Liquid';
import Attractor from './lib/Attractor';

const WIDTH = 900;
const HEIGHT = 600;

let entities: Entity[] = [];
let lastRender = 0;
let ctx: CanvasRenderingContext2D | null;
let mouse: Mouse;
let liquids: Array<Liquid> = [];
const moon = new Attractor(new Vector(300, 300), 60);

const render = () => {
    if(ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for(let liquid of liquids) {
            liquid.draw(ctx);
        }
        moon.draw(ctx);
        for(const ent of entities) {
            ent.draw(ctx);
        }
    }
}

const update = delta => {
    for(const ent of entities) {
        // const gravity = new Vector(0, 0.5 * ent.mass);
        // ent.applyForce(gravity);
        const gf = moon.gravityForce(ent);
        ent.applyForce(gf);
        ent.update(delta, mouse);
        for(let liquid of liquids) {
            if(ent.collidesWith(liquid)) {
                ent.applyForce(ent.drag(liquid.coefficient));
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

function initDOM() {
    const canvas = createCanvas();
    const mainDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    ctx = canvas.getContext('2d');
    mouse = new Mouse(canvas);

    h1.setAttribute('id', 'velocity');
    mainDiv.appendChild(canvas);
    mainDiv.appendChild(h1);

    document.body.appendChild(mainDiv);
}

const main = () => {
    initDOM();
    const w = new Walker(new Vector(100, 0), 10);
    w.applyForce(new Vector(6, 0));
    entities.push(w);
    window.requestAnimationFrame(loop);
}


document.body.onload = () => {
    main();
}
