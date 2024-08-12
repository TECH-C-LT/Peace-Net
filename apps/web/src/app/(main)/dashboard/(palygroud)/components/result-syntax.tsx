import { Label } from '@peace-net/ui/components/ui/label'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ResultSyntaxProps {
  code: any
}

export const ResultSyntax: React.FC<ResultSyntaxProps> = ({ code }) => {
  return (
    <div className="mx-auto -mt-1 max-w-2xl flex-grow">
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
