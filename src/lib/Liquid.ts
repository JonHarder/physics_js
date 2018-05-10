import StaticBody from "./StaticBody";
import Vector from "./Vector";

class Liquid extends StaticBody {
    coefficient: number;

    constructor(location: Vector, width: number, height: number, drag_coefficient: number) {
        super(location, width, height);
        this.coefficient = drag_coefficient;
    }
}

export default Liquid;