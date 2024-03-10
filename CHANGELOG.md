# @totto/x

## 0.1.2 (unpublished)

- chore: add usage in root package doc

## 0.1.1

- chore: add README.md for each package doc
- chore: correct package name in CHANGELOG.md
  - sleep -> remark-link-card
- chore: add dependencies update task
- feat: update dependancies

## 0.1.0

### First Release

#### remark-link-card

- Released `remark-link-card`!
  - Forked <https://github.com/gladevise/remark-link-card>!
  - Thanks to gladevise!
  - Rewritten in TypeScript.
  - Updated package version.
  - Refactored the entire code.
  - Removed cache functionality.
    - Removed cache functionality for use in edge environments.
  - Options have been merged and eliminated.

#### sleep

- Released `sleep`!
  - But maybe <https://jsr.io/@std/async> would be better?
    - `@std/async` supports `AbortContoller.
  - Might implement a Go like WaitGroup in the future.

#### testing

- Released `testting`!
  - Utilities related to testing.
  - Consolidation of standard libraries.
  - Generic functions for testing for this project.

#### error

- Released `error/http`!
  - Custom error classes to match status codes (listed in MDN) that can be
    converted to Response.

#### safe

- Released `safe`!
  - More secure standard library wrapped in Result.
  - Now safe for `new URL()` and `decodeURL()`.

#### result

- [old version](https://www.npmjs.com/package/@totto2727/result)

The library recommended the use of the `TypedResult` type to handle typed
exceptions. However, for the convenience of stack tracing and various libraries,
it is often simpler to use the standard Error class or its extension classes.
Also, since `Typed**` is serializable as is, it can be easily used in Server
Actions of Next.js, but there is a risk of sending sensitive information.

In light of this, we have changed the design as follows.

- Use the standard `Error` class
  - Only the `Error` class or its extension class is allowed on the `Failure`
    side of the `Result` type
- Serialization must be intentional
  - By passing the `Result` type and the serialization function to the
    `serialize` function, the `Failure` side can obtain a `SerializableResult`
    of any `Record` type
  - The utility functions of this library are basically not applicable to
    `SerializaleResult`.
  - Convert it to `Result` again, or use `unwrap*` function, etc. to convert it
    to a normal value.
  - Direct serialization of error objects is not guaranteed.

##### Destructive changes and their handling

- Remove `Typed**` type and related functions
  - Convert to `Result` type and `fail` function
- Only `Error` types or inherited types are accepted for `Failure` of `Result`
  types
  - If you need to serialize a `Result`, convert it to a `SerializableResult`
    type by executing the `serialize` function.
- Some function arguments have been changed and need to be adapted.
  - The `tryCatch*` function has been removed on failure.
  - If the `throw` value is an `Error` class or an extended class, throw it
    back, otherwise try to convert it to an `Error` object.
  - Use the `mapError` function or other functions to handle existing problems.

<!-- markdownlint-disable -->

<details><summary>old versions(npm packages)</summary>

# @totto2727/error

## 0.1.1

### Patch Changes

- [#2](https://github.com/totto2727-org/js-package/pull/2)
  [`3f39f5c`](https://github.com/totto2727-org/js-package/commit/3f39f5cbe930b84291acbf6600c3ac9cc77e5d28)
  Thanks [@totto2727](https://github.com/totto2727)! - Package has been moved to
  monorepo.

# @totto2727/result

## 0.6.9

### Patch Changes

- [#2](https://github.com/totto2727-org/js-package/pull/2)
  [`3f39f5c`](https://github.com/totto2727-org/js-package/commit/3f39f5cbe930b84291acbf6600c3ac9cc77e5d28)
  Thanks [@totto2727](https://github.com/totto2727)! - Package has been moved to
  monorepo.

## 0.6.8

### Patch Changes

- optimize-dependencies

  - fix/move-from-dependencies-to-devDependencie

## 0.6.4

### Patch Changes

- update packages

  - ci: add circleci config
  - ci: refactor biome config
  - feat: update packages
  - style: apply format

## 0.6.3

### Patch Changes

- fix: make default property last

## 0.6.2

### Patch Changes

- pass attw test except node10
- removed support for node10

## 0.6.1

### Patch Changes

- docs/fix-typo

## 0.6.0

### Minor Changes

- 12a421f: # v0.6.0

  Destructive Change

  - Define utility functions with lazy evaluation and eager evaluation.
  - Added deprecation flag to existing utility functions.
    - Will be removed in v0.7.0 ~ v0.8.0.
  - Changed the value returned by unwrap function from the entire Failure type
    to only the cause property.
  - Fixed some extra type naming.
    - Incorrect variable name types will be removed in v0.7.0 ~ v0.8.0.
  - Script optimization for builds.
    - Bundles for browsers are no longer generated.
    - Bundler changed from bun + vite to bun + esbuild.
    - Splitting option disabled (cause:
      https://github.com/oven-sh/bun/issues/4524).

  Nondestructive changes

  - Added configuration file for IDEA.
  - Added documentation for developers (in Japanese).
  - Added documentation for advanced types and advanced functions (in Japanese).

## 0.5.2

### Patch Changes

-
  - add japanese document(README.md)
  - add test for AnyhowResult type

## 0.5.1

### Patch Changes

- refactor: simplify TypedResult type

## 0.5.0

### Minor Changes

- v0.5.0

# @totto2727/sleep

## 0.1.1

### Patch Changes

- [#2](https://github.com/totto2727-org/js-package/pull/2)
  [`3f39f5c`](https://github.com/totto2727-org/js-package/commit/3f39f5cbe930b84291acbf6600c3ac9cc77e5d28)
  Thanks [@totto2727](https://github.com/totto2727)! - Package has been moved to
  monorepo.

</details>

<!-- markdownlint-enable -->
