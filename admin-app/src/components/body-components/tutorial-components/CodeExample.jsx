import React, { useEffect, useRef } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java'; // Import the mode for Java
import 'ace-builds/src-noconflict/theme-monokai'; // Import a theme


export default function CodeExample({code}) {
    const javaCode = `public class HelloWorld {public static void main(String[] args) {System.out.println("Hello, World!");}}`;

    const initialCode = `
    public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
    }
  `;

  return (
    <div>
        <SyntaxHighlighter language="java" style={docco}>
            {javaCode}
        </SyntaxHighlighter>

        <AceEditor
            mode="java" // Set the mode to Java
            theme="monokai" // Set the theme
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            value={javaCode}
            readOnly
            onChange={newValue => {
                console.log('Code changed:', newValue);
                // You can handle code changes here
            }}
            style={{ width: '50%', height: '400px' }} // Set the editor's dimensions
        />

    </div>
  )
}
