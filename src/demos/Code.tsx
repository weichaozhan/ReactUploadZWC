import React, { FC } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { jsx, javascript, css, scss, tsx } from 'react-syntax-highlighter/dist/esm/languages/prism';
import { base16AteliersulphurpoolLight as syncStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('tsx', tsx);

interface IProps {
  code: string;
  lang: 'jsx' | 'javascript' | 'css' | 'scss' | 'tsx';
}
const CodeJSX: FC<IProps> = ({
  code,
  lang
}) => {
  return <div>
    <SyntaxHighlighter language={lang} style={syncStyle} >
      {`
        ${lang}:
        ${code}
      `}
    </SyntaxHighlighter>
  </div>;
};

export default CodeJSX;
