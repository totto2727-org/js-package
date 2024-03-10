# @totto/lib/test

## Overview

A library for more convenient use of Deno's standard tests.

- Aggregates Deno's testing-related standard libraries
- Add `test` as an alias of `it
- Add utility functions for testing
- Implemented frequently used stubs

## Installation

```ts
import * as test from "jsr:@totto/lib/test"
```

## Usage

```ts
import * as test from "jsr:@totto/lib/test"

import { HttpErrorOk } from "jsr:@totto/lib/error"

test.describe("HttpError class", () => {
  test.test("toResponse()", () => {
    test.expect(new HttpErrorOk().toResponse().status).toBe(200)
  })
})
```
