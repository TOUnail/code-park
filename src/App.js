import React, { useState } from "react";
import HtmlEditor from "./components/HtmlEditor";
import Editor from "./components/Editor";
import Split from "react-split-it";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
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
          <div className="bottom-inner">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              viverra urna magna, quis accumsan enim mollis sed. Nulla sodales
              lacus nibh, non dapibus tortor lacinia ut. Vestibulum in cursus
              ipsum. Quisque nec est rutrum leo lobortis vulputate molestie id
              libero. Mauris tempus leo non erat feugiat iaculis. Vivamus ac
              urna magna. Nullam scelerisque turpis velit, eget tincidunt augue
              malesuada non. Vestibulum blandit mi neque, nec ullamcorper lectus
              ultricies non. Fusce et massa vehicula lectus facilisis congue.
            </p>
          </div>
          {/* <iframe
            width="100%"
            height="100%"
            src=""
            title="output"
            frameBorder="0"
            sandbox="allow-scripts"
          ></iframe> */}
        </div>
      </Split>
    </div>
  );
};

export default App;
