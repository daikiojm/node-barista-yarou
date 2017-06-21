# バリスタ野郎 (node-barisita-yarou)

## バリスタ野郎とは
### 背景
**ネスカフェバリスタの正の字問題 :**  
1杯 30円という価格設定のため、集金葉貯金箱にまとめて代金を投入する機会がしばしば発生する。
その際に、コーヒーを淹れた回数をカウントする必要があるが、現状ノートに正の字を書いてカウントしている。。。  
![background](https://github.com/daikiojm/node-barista-yarou/blob/master/public/images/about/background-node-barista-yarou.png)

### 全体図
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

### 1. Felicaカード登録機能
Formから入力された以下の情報とPaSoRiにかざされたFelicaカードのIDmを紐付けて保存する。  
### 2. コーヒーカウント機能
PaSoRiにかざされたFelicaカードのIDmとその時刻を記録  
1ドリップ1ドキュメントとして保存して、結果確認時にはuser_idでカウント  
### 3. カウント結果閲覧機能
ブラウザから確認画面にログイン(user/pass指定)  
dripsコレクションからuser_idでカウント(期間指定可能  

## Setup

### 使用するパッケージ
* Express (枠組み、管理画面の作成)
https://www.npmjs.com/package/express
* libpafe ( PaSoRi情報の取得、libpafe のインストールが前提)
https://www.npmjs.com/package/libpafe
* Mongoose (MongoDBのドライバ)
https://www.npmjs.com/package/mongoose

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

## Schema
* UserModel

| _id | username | password | idm | isadmin |
|:-----------|:------------|:------------|:------------|:------------|
| 自動採番   | 名前(String) | ログインパスワード(String) | Felica識別用(String) | 管理者フラグ(Boolean) |

* DripModel

| user_id | type | date |
|:-----------|:------------|:------------|
| UserModelのユーザーID(String)   | 種別(Number) | 時刻情報(Date) |

* TypeModel

| id | name | price |
|:-----------|:------------|:------------|
| 種別ID(Number)   | 名称(String)  | 値段(Number) |

## その他

* コーヒーの単価は設定ファイルに定義
* 最終的にはRasPiに導入する
* 結果閲覧ページは省いてGoogleスプレッドシートに変更するかも

### 暫定対応

/api/pasori
というAPIを作成し、coffeeにリダイレクトする
このAPIの作成は後ほど行う
