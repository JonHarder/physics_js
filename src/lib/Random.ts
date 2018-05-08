const Random = {
    randInt: max => {
        return Math.floor(Math.random() * Math.floor(max));
    },
    randRange: (min, max) => {
        return Math.floor(min) + Math.floor(Math.random() * Math.floor(max * 3));
    },
    montecarlo: () => {
        while(true) {
            const r1 = Math.random();
            const probability = r1;
            const r2 = Math.random();
            if(r2 < probability) {
                return r1;
            }
        }
    }
}

export default Random;