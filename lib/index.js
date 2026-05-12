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

// src/utils/SemVerUtils.ts
import semver from "semver";
var SemVerUtils = class {
  static format(version) {
    let result = `${version.major}.${version.minor}.${version.patch}`;
    if (version.prerelease) {
      result += `-${version.prerelease}`;
    }
    if (version.build) {
      result += `+${version.build}`;
    }
    return result;
  }
  static compare(a, b) {
    return semver.compare(this.format(a), this.format(b));
  }
  static rcompare(a, b) {
    return semver.rcompare(this.format(a), this.format(b));
  }
  static satisfies(version, range) {
    return semver.satisfies(this.format(version), range);
  }
  static equals(a, b) {
    return this.compare(a, b) === 0;
  }
  static isPrerelease(version) {
    return version.prerelease !== void 0;
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
  SemVerUtils,
  compile,
  safeJsonParse,
  toError,
  validateTimestamp
};
