import { SemVer } from '@kairo-js/properties';
import { TSchema, Static } from '@sinclair/typebox';

interface Random {
    next(): number;
}

declare class SeedRandom implements Random {
    private readonly rng;
    constructor(seed?: string);
    next(): number;
}

declare class SemVerUtils {
    static format(version: SemVer): string;
    static compare(a: SemVer, b: SemVer): number;
    static rcompare(a: SemVer, b: SemVer): number;
    static satisfies(version: SemVer, range: string): boolean;
    static equals(a: SemVer, b: SemVer): boolean;
    static isPrerelease(version: SemVer): boolean;
}

declare function safeJsonParse(message: string, error: () => Error): unknown;

declare function toError(e: unknown): Error;

interface ValidateFunction<T> {
    (value: unknown): value is T;
    errors?: readonly string[];
}
declare function compile<TSchemaType extends TSchema>(schema: TSchemaType): ValidateFunction<Static<TSchemaType>>;

declare function validateTimestamp(currentTick: number, timestamp: number, timeout: number, onTimeout: () => Error, onFuture: () => Error): void;

export { type Random, SeedRandom, SemVerUtils, type ValidateFunction, compile, safeJsonParse, toError, validateTimestamp };
