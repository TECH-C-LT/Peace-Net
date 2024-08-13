'use client'

import React from 'react'

const AnimatedText: React.FC<{ animated: boolean; text: string }> = ({
  animated,
  text,
}) => {
  const ta = {
    animation: 'textColorChange 6s ease-in-out infinite',
  }

  return (
    <span style={animated ? ta : undefined} className="mx-0.5 rounded px-1">
      {text}{' '}
    </span>
  )
}

const TextLine: React.FC<{
  words: string[]
  animatedIndices: number[]
  isLastLine: boolean
}> = ({ words, animatedIndices, isLastLine }) => (
  <>
    {words.map((word, index) => (
      <AnimatedText
        key={index}
        animated={animatedIndices[index] === 1}
        text={word}
      />
    ))}
    {!isLastLine && <br />}
  </>
)

export default function ScanText() {
  const lines = [
    {
      words: ['バカ', 'こんにちは', 'りんご', 'いいね', 'アホ'],
      animated: [1, 0, 0, 0, 1],
    },
    {
      words: ['よろしく', 'おいしそう', 'バカ', 'アホ', 'ぶどう'],
      animated: [0, 0, 1, 1, 0],
    },
    {
      words: ['すごい', 'バカ', 'みかん', 'アホ', 'ありがとう'],
      animated: [0, 1, 0, 1, 0],
    },
  ]

  const animationStyle = {
    animation: 'expandContract 6s ease-in-out infinite',
  }

  const keyframesStyle = `
    @keyframes expandContract {
      0%, 70% { width: 4px; }
      50% { width: 100%; }
    }
    @keyframes textColorChange {
      20%, 70% { color: inherit; background-color: inherit; }
      55% { color: #FF4500; background-color: rgba(255, 69, 0, 0.1); }
    }
  `

  return (
    <div className="absolute right-1/2 top-14 grid w-4/5 translate-x-1/2 place-content-center p-3">
      <p className="py-4 text-sm leading-6">
        {lines.map((line, index) => (
          <TextLine
            key={index}
            words={line.words}
            animatedIndices={line.animated}
            isLastLine={index === lines.length - 1}
          />
        ))}
      </p>
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-bl rounded-tl border-r-4 border-r-teal-500 bg-gradient-to-r from-teal-500/5 from-10% via-teal-500/10 via-70% to-teal-500/60 to-90%"
        style={animationStyle}
      ></div>
      <style>{keyframesStyle}</style>
    </div>
  )
}
