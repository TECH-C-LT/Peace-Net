/**
 * UTC日時文字列を日本時間の文字列に変換する
 * @param {string} utcDateString - UTC日時を表す文字列 (例: "2024-08-12T07:24:21+00:00")
 * @returns {string} 日本時間の文字列 (例: "2024年8月12日 16時24分21秒")
 */
export function convertToJapanTime(utcDateString: string | null): string {
  if (!utcDateString) {
    return '-'
  }

  const date = new Date(utcDateString)

  // 日本時間に変換（+9時間）
  date.setHours(date.getHours() + 9)

  // 日本時間の文字列をフォーマット
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth()は0から始まるので1を加える
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}
