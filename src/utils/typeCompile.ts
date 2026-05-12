import type { Static, TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export interface ValidateFunction<T> {
    (value: unknown): value is T;

    errors?: readonly string[];
}

export function compile<TSchemaType extends TSchema>(
    schema: TSchemaType,
): ValidateFunction<Static<TSchemaType>> {
    const validator = TypeCompiler.Compile(schema);

    const validate: ValidateFunction<Static<TSchemaType>> = (
        value: unknown,
    ): value is Static<TSchemaType> => {
        const success = validator.Check(value);

        validate.errors = success
            ? undefined
            : [...validator.Errors(value)].map((error) => `${error.path}: ${error.message}`);

        return success;
    };

    return validate;
}
