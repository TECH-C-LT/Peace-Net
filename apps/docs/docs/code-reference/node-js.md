# Node.js

```js
// 変数をセット
//// YOUR_API_KEYを取得したものに変更してください
const apiKey= 'YOUR_API_KEY';

const apiUrl = "https://api.peeace.net/v1/guardians/text";
const requestBody = {
  text: "最低な文章"
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify(requestBody)
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});

```
