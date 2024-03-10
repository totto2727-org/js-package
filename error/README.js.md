# @totto2727/error

## 概要

エラーのユーティリティを集約したライブラリです。
HTTP周りのエラーのような定型的な例外をJS標準のErrorクラスベースで構成しています。

### 他のパッケージとの差別点

## インストール

### 前提

Node.jsの場合、`tsconfig.json`は以下の設定のいずれかである必要があります。
Bun、Denoであれば設定無しで利用可能です。

```json
"moduleResolution": "node16",
"moduleResolution": "nodenext",
"moduleResolution": "bundler",
```

### Node.js or Bun

```bash
npm add @totto2727/error

yarn add @totto2727/error

pnpm add @totto2727/error

bun add @totto2727/error
```

```ts
import * as r from "@totto2727/error"
```

## ブラウザ or Deno

```bash
import * as r from ""
```

## Example

## 基本の型

## 基本の関数

## 応用の型

## 応用の関数

## 影響を受けた言語及びライブラリ

- [hono/exception](https://hono.dev/api/exception)
