# @totto2727/error

# 概要

エラーのユーティリティを集約したライブラリです。
HTTP周りのエラーのような定型的な例外をJS標準のErrorクラスベースで構成しています。

Result型のようなTypeScriptの機能を活用したライブラリが必要な場合は下記のライブラリを導入してください。
Failureに本ライブラリの例外クラスを渡しinstanceofで分岐すると言ったことも可能です。

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
import * as r from "https://esm.sh/@totto2727/error"
```

# Example

# 基本の型

# 基本の関数

# 応用の型

# 応用の関数

# 影響を受けた言語及びライブラリ

