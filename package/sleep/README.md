# @totto2727/sleep

# 概要

## 他のパッケージとの差別点

# インストール

## 前提

## Node.js or Bun

```bash
npm add @totto2727/sleep
```

```bash
yarn add @totto2727/sleep
```

```bash
pnpm add @totto2727/sleep
```

```bash
bun add @totto2727/sleep
```

```ts
import * as r from "@totto2727/sleep"
```

## ブラウザ or Deno

```bash
import * as r from "https://esm.sh/@totto2727/sleep"
```

# Example

https://github.com/totto2727-org/sleep/blob/main/src/index.test.mts

# Usage

## sleep

処理を停止しイベントループを回すためのPromiseと、強制的にPromiseを解決させて処理を進める関数を含むオブジェクトを返却します。
非同期処理（Promise、async/await）との併用が前提であり、`await sleep(time).promise`といったような形で利用する必要があります。
関数を実行しただけでは待機されない点に注意してください。
また、待機中に並行して処理を行い、その結果に応じて待機を強制的に解除する必要がある場合は、以下の用に別処理に関数を渡して実行した上で、待機させてください。

```typescript
async function concurrentProcessing(forceResolve: () => void): Promise<void> {
    // ...

    forceResolve();
}

const s = sleep(longTime);
concurrentProcessing(s.forceResolve);

await s.promise;
```

ミリ秒単位での指定が可能ですが、イベントループの仕様上、他の処理が優先される可能性があるため、厳密には指定した秒数にならない可能性があります。
そのため、最低限この秒数待機できればいい（E2Eテストの待機やスクレイピングの間隔）という場面での利用を推奨しています。
厳密な秒数での停止が必要な場合は、他のライブラリを使用してください。

# 影響を受けた言語及びライブラリ

## 開発者向け

### 開発環境

- 実行環境
    - Bun >1.0.0

### Jetbrains

- Plugin
    - [Biome](https://plugins.jetbrains.com/plugin/22761-biome)

### VSCode

TODO

### 開発手順

1. このリポジトリをフォークする
2. フォークしたリポジトリをローカルにクローンしてプロジェクトルートに移動する
3. パッケージのインストール
   ```bash
   bun i
   ```
4. 開発する
5. 変更内容を記述する
   ```bash
   bun changeset
   ```
6. コミット前
   ```bash
   bun precommit
   ```
7. コミット＆プッシュ
8. フォークしたリポジトリからプルリクエストを作成する
9. 以下は管理者がバージョンアップする場合のみ
10. バージョンの変更とプッシュ
    ```bash
    bun changeset version
    ```
11. mainブランチにマージする
12. タグをつけてプッシュ
    ```bash
    bun changeset tag
    ```
13. CI/CDが自動でNPMに公開する
