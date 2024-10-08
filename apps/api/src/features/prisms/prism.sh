## 長め
# txt="そんなこと言ってなくない？"
# txt="努力が報われないこともあるよね"
# txt="YOUは何しに日本へ？"
# txt="本当だからだ！それが正しい根拠を言え"

## 短い
# txt="はい論破！"
# txt="1+1=無限大"
# txt="愛と勇気だけが友達さ"
# txt="お前が世界一だ"
# txt="お前は黙ってろ"
# txt="人としてどうなの?"

## guardianで検知される系
# txt="◯◯さんは会社の同僚と不倫をしている"
# txt="しね"
# txt="ふざんな"
# txt="二度とテレビに出るな"

## 評価しない
# txt="w"
# txt="ね"
# txt="それ"
# txt="うん"
# txt="うんうん"
# txt="まじか"
# txt="おけ" # むず過ぎ
# txt="ok"
# txt="はい"
# txt="1+1=2"
# txt="asdasdfasdf"

txt="トンカツって美味しいよね"
curl -X POST "http://localhost:8787/v1/prisms/text" \
  --header 'Content-Type: application/json' \
  -d '{
  "text": "'$txt'"
  }'
