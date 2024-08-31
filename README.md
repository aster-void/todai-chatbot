# 東大チャットbot

## 概要

東大に関する情報を答えてくれるチャットbot

## 開発

## Makefile

GNU Make が導入されています。以下は、開発者が使うことが想定されているコマンドの一部です。

- make setup (セットアップします。)
- make watch (ホットリロードします。)

## 環境構築

```sh
make setup
```

終わったら、`backend/.env` を作成しましょう。

### 環境変数

- `backend`
  - `DATABASE_URL` = `postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample`
  - `OPENAI_API_KEY`=`sk-proj-`

## frontend、backendの起動

```sh
make build
# または
make watch
```
