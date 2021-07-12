import React, { useState, useEffect } from "react";
import HtmlEditor from "../components/HtmlEditor";
import CssEditor from "../components/CssEditor";
import JsEditor from "../components/JsEditor";
import Split from "react-split-it";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const s = io("http://localhost:3001");
const Document = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  //console.log(id);
  useEffect(() => {
    if (s == null) return;
    setSocket(s);
    s.once("load-document", (data) => {
      setHtml(data.html ? data.html : "");
      setCss(data.css ? data.css : "");
      setJs(data.js ? data.js : "");
    });
    s.emit("get-document", id);
    return () => {
      s.disconnect();
    };
  }, [s, id]);
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
      s.emit("save-document", {
        html: html ? html : "",
        css: css ? css : "",
        js: js ? js : "",
      });
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
              socket={socket}
            />
            <CssEditor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
              socket={socket}
            />
            <JsEditor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
              socket={socket}
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

export default Document;
