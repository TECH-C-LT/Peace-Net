# SDK for Go

### [GitHub Issues](https://github.com/naruse666/peace-net-sdk-go/issues)
バグや機能リクエストは[Issues](https://github.com/naruse666/peace-net-sdk-go/issues)からお願いします✨ <br/>

### サンプルコード
```go
// main.go
package main

import (
	"fmt"
	"github.com/naruse666/peace-net-sdk-go/guardian"
	"os"
)

func main() {
	apiKey, ok := os.LookupEnv("API_KEY")
	if !ok {
		fmt.Println("API_KEY is not set")
		return
	}

	guardianInput := guardian.GuardianInput{
		Text:   "最低な文章！",
		APIKey: apiKey,
	}

	resp, err := guardian.RequestGuardian(guardianInput)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println(resp)
}
```

### 実行
```go
go run main.go
```
