# @totto/lib/error

## Overview

A library aggregates error utilities. It is based on the JS standard Error class
for routine exceptions such as errors around HTTP.

## Installation

```ts
import * as error from "jsr:@totto/lib/error"
```

## Usage

```ts
import * as error from "jsr:@totto/lib/error"

Deno.serve(async (_req) => {
  const data = await fetch("https://example.com/xxxxx")

  console.log(data)

  if (!data.ok) {
    // return 500 error
    return new error.HttpErrorInternalServerError().toResponse()
  }

  return data
})
```

## Affected languages and libraries

- [hono/exception](https://hono.dev/api/exception)
