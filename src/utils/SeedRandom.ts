import seedRandom from "seedrandom";
import type { Random } from "../types/Random";

export class SeedRandom implements Random {
    private readonly rng: () => number;

    constructor(seed?: string) {
        this.rng = seedRandom(seed);
    }

    next(): number {
        return this.rng();
    }
}
