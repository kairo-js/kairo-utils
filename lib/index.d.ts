import { TSchema, Static } from '@sinclair/typebox';

interface Random {
    next(): number;
}

declare class SeedRandom implements Random {
    private readonly rng;
    constructor(seed?: string);
    next(): number;
}

declare function safeJsonParse(message: string, error: () => Error): unknown;

declare function toError(e: unknown): Error;

interface ValidateFunction<T> {
    (value: unknown): value is T;
    errors?: readonly string[];
}
declare function compile<TSchemaType extends TSchema>(schema: TSchemaType): ValidateFunction<Static<TSchemaType>>;

declare function validateTimestamp(currentTick: number, timestamp: number, timeout: number, onTimeout: () => Error, onFuture: () => Error): void;

export { type Random, SeedRandom, type ValidateFunction, compile, safeJsonParse, toError, validateTimestamp };
