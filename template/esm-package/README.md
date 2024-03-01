[テンプレートの解説](https://qiita.com/totto2727/items/bf6fa2787a8ede5f56c1)

# テンプレートコピー後にやるべきこと

完了次第削除してください。

## リポジトリの設定

- [ ] stagingブランチをベースブランチにする
- [ ] Branch Protectionの設定を行う
  - TODO: 設定
- [ ] Renovate Botの対象に含める

## パッケージの設定

- [ ] README.mdを修正する
- [ ] pakcage.jsonのメタ情報を修正する

# esm-package

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
npm add @totto2727/
```

```bash
yarn add @totto2727/
```

```bash
pnpm add @totto2727/
```

```bash
bun add @totto2727/
```

```ts
import {  } from "@totto2727/"
```

## ブラウザ or Deno

```bash
import {  } from "https://esm.sh/@totto2727/"
```

# Example

# 基本の型

# 基本の関数

# 応用の型

# 応用の関数

# 影響を受けた言語及びライブラリ

