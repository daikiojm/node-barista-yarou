# バリスタ野郎 (node-barisita-yarou)

## 機能

##


## APIs

Route	HTTP Verb	Description
/api
/users POST ユーザー登録
/users GET ユーザー一覧取得
/api/users/:user_id GET UserIdに一致するユーザー一覧を取得する
/api/users/:user_id PUT UserIdに一致するユーザー一覧を更新する
/api/users/:user_id DELETE UserIdに一致するユーザー一覧を削除する
/api/coffee GET UserIdに一致するユーザーのコーヒー数を取得する
/api/coffee PUT UserIdに一致するユーザーのコーヒー数を更新する

暫定対応

/api/pasori
というAPIを作成し、coffeeにリダイレクトする
このAPIの作成は後ほど行う
