# @totto2727/sleep

# 概要

## 他のパッケージとの差別点

# インストール

## 前提

`tsconfig.json`は以下の設定のいずれかである必要があります。

```
"moduleResolution": "node16",
"moduleResolution": "nodenext",
"moduleResolution": "bundler",
```

## Node.js or Bun

```bash
npm add @totto2727/sleep

yarn add @totto2727/sleep

pnpm add @totto2727/sleep

bun add @totto2727/sleep
```

```ts
import { sleep } from "@totto2727/sleep"
```

## ブラウザ or Deno

```ts
import { sleep } from "https://esm.sh/@totto2727/sleep"
```

# Example

https://github.com/totto2727-org/sleep/blob/main/main.ts

# Usage

## sleep

処理を停止しイベントループを回すためのPromiseと、強制的にPromiseを解決させて処理を進める関数を含むオブジェクトを返却します。
非同期処理（Promise、async/await）との併用が前提であり、`await sleep(time).promise`といったような形で利用する必要があります。
関数を実行しただけでは待機されない点に注意してください。
また、待機中に並行して処理を行い、その結果に応じて待機を強制的に解除する必要がある場合は、以下のように関数を渡して実行した上で待機させてください。

```typescript
async function concurrentProcessing(forceResolve: () => void): Promise<void> {
  // ...

  forceResolve()
}

const s = sleep(longTime)

// awaitでブロックしない
concurrentProcessing(s.forceResolve)

await s.promise
```

ミリ秒単位での指定が可能ですが、イベントループの仕様上、他の処理が優先される可能性があるため、厳密には指定した秒数にならない可能性があります。
そのため、最低限この秒数待機できればいい（E2Eテストの待機やスクレイピングの間隔）という場面での利用を推奨しています。
厳密な秒数での停止が必要な場合は、他のライブラリを使用してください。
