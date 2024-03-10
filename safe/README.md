# @totto/lib/safe

## Overview

[Result type](../result//README.md) wrappers for functions in the JS standard
library that are particularly likely to raise exceptions.

## Installation

```ts
import * as result from "jsr:@totto/lib/result"
import * as safe from "jsr:@totto/lib/safe"
```

## Usage

See JSDoc for more information.

```ts
import * as result from "jsr:@totto/lib/result"
import * as safe from "jsr:@totto/lib/safe"

const urlRawString = "..."
const url = safe.parseUrlSafe(urlRawString)

if (result.isFailure(url)) {
  return
}

// Success!
console.log(url.value)
```
