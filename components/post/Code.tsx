import { memo, useEffect } from 'react';
import hljs from 'highlight.js';

import type { PropsWithChildren } from 'react';

import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));

interface Props {
  className: string;
}

function _Code({ children, className: language }: PropsWithChildren<Props>) {
  useEffect(() => {
    // TODO: 이스케이프 확인해보기
    hljs.configure({
      ignoreUnescapedHTML: true,
    });
    hljs.highlightAll();
  }, []);

  return <code className={language}>{children}</code>;
}

export const Code = memo(_Code);
