# プラン
<!-- 現状Free プランのみ -->
| プラン名 | 料金 | 使用回数制限   |
| ----     | ---- | ----           |
| Free     | 0    | 30回 / APIキー |

:::info
使用回数制限を超過した場合、`Usage Limit Exceeded Error`となり以下のエラーがレスポンスされます。
```json
{
  "error": "[Peace Net]: Usage Limit Exceeded Error",
  "details": "User plan's usage limit exceeded"
}
```
:::
