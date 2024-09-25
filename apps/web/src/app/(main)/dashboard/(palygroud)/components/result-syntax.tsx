import { Label } from '@peace-net/ui/components/ui/label'
import React, { useEffect, useRef } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ResultSyntaxProps {
  code: any
}

export const ResultSyntax: React.FC<ResultSyntaxProps> = ({ code }) => {
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollIntoView({ behavior: 'smooth' }) // 自動スクロール
    }
  }, [code]) // codeが変更されたときにスクロール

  return (
    <div className="mx-auto mt-3 max-w-2xl flex-grow" ref={codeRef}>
      <Label className="text-teal-500">結果</Label>
      <SyntaxHighlighter
        language="json"
        style={foundation}
        wrapLongLines
        customStyle={{
          backgroundColor: 'hsl(var(--secondary));',
          borderRadius: '0.25rem',
          borderWidth: '1px',
          borderColor: '#14b8a6',
          marginTop: '0.1rem',
          fontSize: '0.875rem',
          fontWeight: 'bold',
        }}
        seInlineStyles={true}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
