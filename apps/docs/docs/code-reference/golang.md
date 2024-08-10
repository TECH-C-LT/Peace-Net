# Go

```go
// main.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

var (
	apiKey = "YOUR_API_KEY"
	apiUrl = "https://api.peeace.net/v1/guardians/text"
)

func main() {
	// リクエストを作成
	body, err := json.Marshal(map[string]string{
		"text": "最低な文章",
	})
	if err != nil {
		fmt.Println("Error marshalling request body:", err)
		return
	}

	req, err := http.NewRequest("POST", apiUrl, bytes.NewBuffer(body))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))

	// リクエスト
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// レスポンスをチェック
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Request failed with status:", resp.Status)
		return
	}

	var responseBody map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&responseBody); err != nil {
		fmt.Println("Error decoding response body:", err)
		return
	}

	fmt.Println("Response:", responseBody)
}
```

### 実行

```sh
go run main.go
```
