# バリスタ野郎 (node-barisita-yarou)

## バリスタ野郎とは
![background](https://github.com/daikiojm/node-barista-yarou/blob/master/public/images/about/background-node-barista-yarou.png)

![about](https://github.com/daikiojm/node-barista-yarou/blob/master/public/images/about/about-node-barista-yarou.png)

## 機能

- Admins
  - 種別・価格登録
  - ユーザー・カード登録
  - 修正機能
- User
  - 集計表示
- Pasori
  - ドリップ

## Setup

## Startup

Start up mongodb demon  
`mongod --config /usr/local/etc/mongod.conf`

Start up nodejs process by nodemon  
`nodemon`

## APIs


|Route|HTTP Verb|Description|
|:-----------|:------------|:------------|
|/users|POST|ユーザー登録|
|/users|GET|ユーザー一覧取得|
|/api/users/:user_id|GET|UserIdに一致するユーザー一覧を取得する|
|/api/users/:user_id|PUT|UserIdに一致するユーザー一覧を更新する|
|/api/users/:user_id|DELETE|UserIdに一致するユーザー一覧を削除する|
|/api/coffee|GET|UserIdに一致するユーザーのコーヒー数を取得する|
|/api/coffee|PUT|UserIdに一致するユーザーのコーヒー数を更新する|


暫定対応

/api/pasori
というAPIを作成し、coffeeにリダイレクトする
このAPIの作成は後ほど行う
