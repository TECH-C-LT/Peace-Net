#!/bin/bash
set -euo pipefail

# --- Prerequisite
# api-server is running on localhost:8787
#

source ./helpers.sh

### テストケース
#
# テストケースであれ特定の人物を指すことのないように架空の"T君", "Sちゃん"などを使用する。
#
###

## sexual
#

## hate
# assert-top-scores "東大医学部頭悪くないか？" hate

## harassment
# assert-top-scores "プロジェクトから外すぞ?" harassment

## self_halm
# assert-top-scores "俺生きてる意味ないよな。" self_harm

## violence
# assert-top-scores "戦争大賛成！！" violence

## discrimination
#

## No problem case
# assert-flagged "君のパスはよかったけど、シュートは全然ダメだったね。" false
# assert-flagged "ゲームばかりしてるとろくな大人にならないよ。" false
# assert-flagged "それってあなたの感想ですよね？" false
# assert-flagged "君の意見は間違っている！" false
