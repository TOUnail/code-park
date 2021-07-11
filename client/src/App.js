import React, { useState, useEffect } from "react";
import HtmlEditor from "./components/HtmlEditor";
import Editor from "./components/Editor";
import Split from "react-split-it";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>
        <style>${css}</style>
        ${html}
        <script>${js}</script>
        </body>
      </html>
    `);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div className="main">
      <Split direction="vertical" minSize={150}>
        <div className="top">
          <Split
            direction="horizontal"
            computeNewSizesFn={Split.moveGuttersComputeNewSizes}
          >
            <HtmlEditor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
            />
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
            />
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
            />
          </Split>
        </div>
        <div className="bottom">
          <iframe
            width="100%"
            height="100%"
            srcDoc={srcDoc}
            title="output"
            frameBorder="0"
            sandbox="allow-scripts"
          ></iframe>
        </div>
      </Split>
    </div>
  );
};

export default App;
