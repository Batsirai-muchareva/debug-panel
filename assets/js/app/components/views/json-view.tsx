import React from 'react';
import { memo } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { useFilteredData } from "@app/context/filtered-data/filtered-data-context";

export const JsonView = memo( () => {
    const { data } = useFilteredData();
    const stringJson = JSON.stringify( data, null, 2 );

    let currentLine = 0;

    return (
        <SyntaxHighlighter
            codeTagProps={ { "aria-modal": "true",  id: 'syntax-highlighter', style: {
                display: 'block',
                background: 'repeating-linear-gradient(to right, #b3222200 46px, #ffffff0a 60px)',
                fontFamily: 'monospace'
            } } }
            showLineNumbers

            language="json"
            style={ atomOneDark }
            customStyle={{ flex: 1, margin: 0, background: 'rgb(12 22 41)', height: '100%' }}
            wrapLines
            lineProps={ () => {
                currentLine ++;

                return { "data-line": currentLine, className: '' }
            } }
        >
            { stringJson }
        </SyntaxHighlighter>
    );
} );
