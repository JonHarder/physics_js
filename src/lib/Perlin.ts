const MAX_VERTICES = 256;
const MAX_VERTICES_MASK = MAX_VERTICES -1;


class Simple1DNoise {
    amplitude: number;
    scale: number;
    r: number[];

    constructor(amplitude?, scale?) {
        this.amplitude = amplitude || 1;
        this.scale = scale || 1;

        this.r = [];
        for ( var i = 0; i < MAX_VERTICES; ++i ) {
            this.r.push(Math.random());
        }
    }

    getVal(x) {
        const scaledX = x * this.scale;
        const xFloor = Math.floor(scaledX);
        const t = scaledX - xFloor;
        const tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using &
        const xMin = xFloor & MAX_VERTICES_MASK;
        const xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

        const y = this.lerp( this.r[xMin], this.r[xMax], tRemapSmoothstep);

        return y * this.amplitude;
    };

    lerp(a: number, b: number, t: number): number {
        return a * ( 1 - t ) + b * t;
    };

    setAmplitude(newAmplitude: number) {
        this.amplitude = newAmplitude;
    }

    setScale(newScale: number) {
        this.scale = newScale;
    }
}

export default Simple1DNoise;