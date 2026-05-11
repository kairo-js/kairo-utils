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

// src/utils/ajv-compile.ts
import Ajv from "ajv";
var ajv = new Ajv({
  validateSchema: false,
  strict: true,
  allErrors: false,
  inlineRefs: false,
  removeAdditional: false,
  coerceTypes: false,
  useDefaults: false,
  code: {
    optimize: false
  }
});
function compile(schema) {
  return ajv.compile(schema);
}

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
