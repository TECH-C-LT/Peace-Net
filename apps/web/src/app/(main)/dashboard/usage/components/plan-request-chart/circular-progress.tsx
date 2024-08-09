'use client'

import AnimatedCircularProgressBar from '@peace-net/ui/components/magicui/circualr-progress'

export function CircularProgressBar({
  max = 100,
  value = 0,
}: {
  max?: number
  min?: number
  value?: number
}) {
  return (
    <AnimatedCircularProgressBar
      max={max}
      min={0}
      value={value}
      gaugePrimaryColor="rgb(20, 184, 166)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  )
}
