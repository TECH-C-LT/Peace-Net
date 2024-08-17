'use client'

import { useEffect, useState } from 'react'

export default function ScoreThresholdDescription({
  value,
}: {
  value: number
}) {
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (value >= 0.9) {
      setDescription('深刻な問題あり')
    } else if (value >= 0.6) {
      setDescription('中程度の問題あり')
    } else if (value >= 0.3) {
      setDescription('軽度の懸念あり')
    } else if (value >= 0.1) {
      setDescription('批判の可能性ありまたは、受け手によって解釈が異なる')
    } else {
      setDescription('問題なし')
    }
  }, [value])

  return (
    <span className="text-muted-foreground text-sm">
      AIが「{description}」と判断した場合に<code>true</code>を返します。
    </span>
  )
}
