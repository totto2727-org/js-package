# 開発者向け

## 開発環境

- 実行環境
  - Deno > 1.41

## Issues

機能要望からバグ報告まで受け付けています。

TODO: テンプレートを作成する

## Pull Request

機能追加からバグ修正まで受け付けています。
小さなものでもいただけると作者が喜びます。

## 開発

- 基本的にはパッケージルートで開発してください

### 準備

- 全てDenoを用いて開発されています
- 基本的に最新版のDenoをインストールしてください
- 以下のコマンドを必ず実行してください

  ```bash
  deno run npm:lefthook uninstall
  deno run npm:lefthook install
  ```

### PRを出す際の注意

- lefthookの通らない状態で無理やりコミット、プッシュしないでください
- [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/#%e6%a6%82%e8%a6%81)に従ってコミットしてください
  - 特に破壊的変更は`!`もしくは`BREAKING CHANGE:`を忘れず記入してください

### 検証

```bash
# 静的解析
deno check **/*.ts

# 静的解析
deno run check

# 自動修正
deno run fix

# テスト
deno test
deno test {任意のディレクトリ}

# 自動テスト
deno test --watch
deno test --watch {任意のディレクトリ}
```

## エディタ

### Jetbrains IDE

TODO

### VSCode

- .vscode/に設定を追加しています
- 推奨拡張機能を導入して開発を行ってください
