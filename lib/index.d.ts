import { ValidateFunction } from 'ajv';

interface Random {
    next(): number;
}

declare class SeedRandom implements Random {
    private readonly rng;
    constructor(seed?: string);
    next(): number;
}

declare function compile<T>(schema: object): ValidateFunction<T>;

declare function safeJsonParse(message: string, error: () => Error): unknown;

declare function toError(e: unknown): Error;

declare function validateTimestamp(currentTick: number, timestamp: number, timeout: number, onTimeout: () => Error, onFuture: () => Error): void;

export { type Random, SeedRandom, compile, safeJsonParse, toError, validateTimestamp };
