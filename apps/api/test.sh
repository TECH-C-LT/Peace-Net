#!/bin/bash

set -euo pipefail

function assert {
    # $1 request body
    # $2 got flagged value
    # $3 want flagged value
    trimmed=$(echo $2 |tr -d ',')
    if [ $trimmed != $3 ]; then
        printf "[Unexpected] body %s got: %s want: %s.\n" $1 $2 $3 
    fi
}

function peacenet-guardians {
    res=$(
    curl -s --location 'http://localhost:8787/api/v1/guardians/text' \
        --header 'Content-Type: application/json' \
        --data '{
            "text": "'$1'",
            "score_threshold": 0.3
        }' \
            |jq '.flagged'
        )
    assert $1, $res, $2
}

### テストケース
# peacenet-guardians "学校くるな" true
# peacenet-guardians "チョコになっちゃえ" false
