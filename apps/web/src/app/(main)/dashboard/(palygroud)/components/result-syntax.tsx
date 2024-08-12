import { Label } from '@peace-net/ui/components/ui/label'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ResultSyntaxProps {
  code: string
}

export const ResultSyntax: React.FC<ResultSyntaxProps> = ({ code }) => {
  return (
    <div className="mx-auto -mt-1 max-w-2xl flex-grow">
      <Label className="">結果</Label>
      <SyntaxHighlighter
        language="json"
        style={foundation}
        wrapLongLines
        customStyle={{
          backgroundColor: 'hsl(var(--secondary));',
          borderRadius: '0.25rem',
          borderWidth: '1px',
          borderColor: 'hsl(var(--border))',
          marginTop: '0.1rem',
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
