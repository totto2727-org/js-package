# @totto/lib/result

Older versions of the NPM package are
[here](https://www.npmjs.com/package/@totto2727/result)

## Overview

- This package adds the `Result` type and related utilities to the TypeScript
  environment.
- The `Result(Either)` type is introduced as a standard type in Kotlin, Rust and
  Haskell, and indicates the possibility that a process may fail.
- This solves the problem of the JavaScript standardtry catch that it is not
  possible to determine from the type what kind of exception will be raised.

## Installation

```ts
import * as result from "jsr:@totto/lib/result"
import * as rE from "jsr:@totto/lib/result/eager"
import * as rL from "jsr:@totto/lib/result/lazy"
```

## Usage

See JSDoc for more information.

This is completely type safe!

```ts
import * as result from "jsr:@totto/lib/result"

// I do not want to return NAN
function divide(dividend: number, divisor: number): r.Result<number, string> {
  if (y === 0) {
    return r.fail(new Error("Division by zero is prohibited"))
  }

  return r.succeed(dividend / divisor)
}

const quotient = devide(1, 0)

// user-defined type guard to determine if failure has occurred
if (r.isFailure(quotient)) {
  // below quotient is processed as Failure type
  consolo.log(quotient.cause.message)
  // output: Division by zero is prohibited
}

// the following quotient is processed as Success type
console.log(quotient.value)
// output: ${calculation result}
```

<details><summary>Unsafe Code</summary>

```ts
// I do not want to return NAN
function divide(dividend: number, divisor: number): number {
  if (y === 0) {
    throw new Error("Division by zero is prohibited")
  }

  return dividend / divisor
}

// Exception raised!
const quotient = devide(1, 0)

// Program terminated abnormally before execution
console.log(quotient)
```

</details>

## Differentiation from other Result-type packages

### Easy to use on both client and server side

- Objects and functions, not classes, are used in the implementation
- Optimizations reduce code to a few kB
- Smooth and easy to use, even for client-side and server-side integrated
  frameworks such as Next.js (App Router), Remix, and Qwik City Even frameworks
  that integrate client-side and server-side, such as Next.js (App Router),
  Remix, and Qwik City, can smoothly benefit from the Result type.

### Easy to program functionally

- All are implemented in an immutable manner
- All are implemented for both lazy and accurate evaluation.
- Function composition (such as the `pipe` and `flow` functions implemented in
  [remeda](https://remedajs.com/), etc.) is easy to implement

## Related libraries

- [@totto/lib/error](../error/README.md)
- [@totto/lib/safe](../safe/README.md)

## Affected languages and libraries

- Rust
  - Result
  - [anyhow](https://docs.rs/anyhow/latest/anyhow/)
- Swift
  - Naming (to avoid duplicating JS standard exceptions)
