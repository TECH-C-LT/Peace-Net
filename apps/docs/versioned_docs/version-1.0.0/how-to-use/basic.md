# 基本的な使用方法
Guardians APIの基本的な使い方を説明しています。

## API キーの発行
1. <a href="https://pe-ace.net" target="_blank">ユーザーポータル</a>にログインします。
「平和ネットAPIを使う」をクリックしてください。

:::info

現在はGitHubのOAuth認証のみ利用可能です。
:::

2. API Keysというページからキーを生成します。<br/>
キーの名前と有効期限を選択し、キーを生成しましょう！
<img src="/img/create_api_key.png" width="400x" />

<br/>
<br/>

3. APIキーをコピーします
<img src="/img/api_key.png" width="400x" />
<br/><br/>
:::warning

紛失した場合は再度作成する必要があります。
:::

## APIにリクエストを送る

<details open>
  <summary>Linux / Mac</summary>
  <pre>
    環境変数に`API_KEY`をセットします。
    <code>
      ```
      export API_KEY="YOUR_API_KEY"
      ```
    </code>

    簡単なリクエストを送ってみましょう!
    <code>
      ```
      curl -s -X POST \
        --location 'https://api.pe-ace.net/v1/guardians/text' \
        --header 'Content-Type: application/json' \
        --header "Authorization: Bearer $API_KEY" \
        --data '{
        "text": "最低な文章"
      }'
      ```
    </code>
  </pre>
</details>

<details>
  <summary>Windows</summary>
  <pre>
    環境変数に`API_KEY`をセットします。
    <code>
      ```
        $Env:API_KEY = "YOUR_API_KEY"
      ```
    </code>

    簡単なリクエストを送ってみましょう!
    <code>
      ```
        $headers = @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $($Env:API_KEY)"
        }

        $body = @{
            text = "最低な文章"
        } | ConvertTo-Json

        Invoke-RestMethod -Method Post -Uri "https://api.pe-ace.net/v1/guardians/text" -Headers $headers -Body $body
      ```
    </code>
  </pre>
</details>

各言語での実装方法は[コードリファレンス](/docs/code-reference/)を参照してください。
