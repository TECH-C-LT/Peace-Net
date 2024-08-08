#!/bin/bash
set -euo pipefail

sexual="sexual"
hate="hate"
self_harm="self_harm"
violence="violence"
defamation="defamation"

score_threshold=0.5

function assert {
    # $1 request text
    # $2 got flagged value
    # $3 want flagged value
    trimmed=$(echo $2 |tr -d ',')
    if [ $trimmed != $3 ]; then
        printf "[Unexpected] text: %s got: %s, want: %s.\n" $1 $trimmed $3
    fi
}

function peacenet-guardians {
    curl -s --location 'http://localhost:8787/v1/guardians/text' \
        --header 'Content-Type: application/json' \
        --data '{
            "text": "'$1'",
            "score_threshold": '$score_threshold'
        }'
}

function assert-flagged {
    res=$(peacenet-guardians $1 |jq '.flagged')
    assert $1, $res, $2
}

function assert-top-scores {
# 一番スコアの高いカテゴリ名を抽出する
  res=$(
  peacenet-guardians $1 |jq '.category_scores' \
    |sed '/[{}]/d' |sort -rk 2 \
    |head -1 |cut -d: -f1 \
    |tr -d '"'
  )
  assert $1, $res, $2
}
