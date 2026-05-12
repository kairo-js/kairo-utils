// src/utils/SeedRandom.ts
import seedRandom from "seedrandom";
var SeedRandom = class {
  rng;
  constructor(seed) {
    this.rng = seedRandom(seed);
  }
  next() {
    return this.rng();
  }
};

// src/utils/jsonParse.ts
function safeJsonParse(message, error) {
  try {
    return JSON.parse(message);
  } catch {
    throw error();
  }
}

// src/utils/toError.ts
function toError(e) {
  return e instanceof Error ? e : new Error(String(e));
}

// src/utils/typeCompile.ts
import { TypeCompiler } from "@sinclair/typebox/compiler";
function compile(schema) {
  const validator = TypeCompiler.Compile(schema);
  const validate = (value) => {
    const success = validator.Check(value);
    validate.errors = success ? void 0 : [...validator.Errors(value)].map((error) => `${error.path}: ${error.message}`);
    return success;
  };
  return validate;
}

// src/utils/validateTimestamp.ts
function validateTimestamp(currentTick, timestamp, timeout, onTimeout, onFuture) {
  if (timestamp > currentTick) {
    throw onFuture();
  }
  if (currentTick - timestamp > timeout) {
    throw onTimeout();
  }
}
export {
  SeedRandom,
  compile,
  safeJsonParse,
  toError,
  validateTimestamp
};
