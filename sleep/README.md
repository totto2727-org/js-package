# @totto/lib/sleep

## Overview

- A library providing functions for temporary await
- But maybe <https://jsr.io/@std/async> would be better?
  - `@std/async` supports `AbortContoller.

## Installation

```ts
import * as sleep from "jsr:@totto/lib/sleep"
```

## Usage

See JSDoc for more information.

### Basic

```ts
import { sleep } from "./sleep.ts"

console.log("sleep1 start")
const sleep1 = sleep(10000)

console.log("sleep3 start and await")
await sleep(3000).promise
console.log("sleep3 finish")

sleep1.forceResolve()

console.log("sleep1 await")
// Immediate Resolution
await sleep1.promise
console.log("sleep1 finish")
```

### Force Resolve

```ts
import * as sleep from "jsr:@totto/lib/sleep"

async function concurrentProcessing(forceResolve: () => void): Promise<void> {
  // ...

  forceResolve()
}

const s = sleep.sleep(longTime)

// do not block with await
concurrentProcessing(s.forceResolve)

await s.promise
```
