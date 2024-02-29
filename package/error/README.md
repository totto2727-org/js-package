# @totto2727/error

# 概要

エラーのユーティリティを集約したライブラリです。
HTTP周りのエラーのような定型的な例外をJS標準のErrorクラスベースで構成しています。

Result型のようなTypeScriptの機能を活用したライブラリが必要な場合は下記のライブラリを導入してください。
Failureに本ライブラリの例外クラスを渡しinstanceofで分岐すると言ったことも可能です。

## 他のパッケージとの差別点

# インストール

## 前提

## Node.js or Bun

```bash
npm add @totto2727/error
```

```bash
yarn add @totto2727/error
```

```bash
pnpm add @totto2727/error
```

```bash
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

## 開発者向け

### 開発環境

- 実行環境
    - Bun >1.0.0
- エディタ
    - 現時点ではJetbrains IDEの設定のみ用意されています。
    - 今後、VSCodeの設定ファイルを追加する予定です。

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
