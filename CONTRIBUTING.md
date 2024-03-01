# 開発者向け

## 開発環境

- 実行環境
    - Bun >1.0.0

## Issues

機能要望からバグ報告まで受け付けています。

TODO: テンプレートを作成する

## Pull Request

機能追加からバグ修正まで受け付けています。
小さなものでもいただけると作者が喜びます。

## 開発

- 基本的にはパッケージルートで開発してください
  - tsconfig.jsonなどはルートで共通化し、エディタで解析する際もルートのtsconfig.jsonが利用されます

### 準備

- 全てBunを用いて開発されています
- 最新版のBunをインストールしてください。

```bash
bun i
bun lefthook uninstall
bun lefthook install
```

### PRを出す際の注意

- changesetで変更内容を記述してください
  ```bash
  bun changeset
  ```
- lefthookの通らない状態で無理やりコミット、プッシュしないでください

### 検証

- Bunのテスト機能とBiomeを利用して検証しています

```bash
# 静的解析
bun run check

# 静的解析と自動修正
bun run fix

# テスト
bun run test

# 自動テスト
bun run test --watch
```

## エディタ

### Jetbrains IDE

TODO

- Plugin
    - [Biome](https://plugins.jetbrains.com/plugin/22761-biome)

### VSCode

- .vscode/に設定を追加しています
- 推奨拡張機能を導入して開発を行ってください

