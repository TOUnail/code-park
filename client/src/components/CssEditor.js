import React, { useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";

import { Controlled as ControlledEditor } from "react-codemirror2-react-17";
const CssEditor = (props) => {
  // const [isInitWidth, setIsInitWidth] = useState(true);
  const { language, displayName, value, onChange, socket } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
    // console.log(editor.cursorCoords());
    socket.emit("send-css", value);
  };
  // const handleFocus = (editor) => {
  // console.log(editor.cursorCoords());
  // socket.emit("send-cursor", editor.cursorCoords());
  // };
  //   const setUserCursor = (value) => {
  //       let cursorElement = document.createElement('span');
  //       cursorElement.style.borderLeftStyle = 'solid';
  // cursorElement.style.borderLeftWidth = '2px';
  // cursorElement.style.borderLeftColor = '#ff0000';
  // cursorElement.style.height = `${(value.bottom - value.top)}px`;
  // cursorElement.style.padding = 0;
  // cursorElement.style.zIndex = 0;
  //   }
  useEffect(() => {
    if (socket == null) return;
    socket.on("apply-css", (value) => onChange(value));
    // socket.on("get-cursor", )
    return () => {
      socket.off("apply-css", (value) => onChange(value));
      // socket.off("get-cursor")
    };
  }, [socket]);
  return (
    <div className="editor-container">
      <div className="header">{displayName}</div>
      <ControlledEditor
        // onFocus={handleFocus}
        onBeforeChange={handleChange}
        value={value}
        className="code-wrapper"
        setBookmark={{}}
        options={{
          lint: true,
          lineWrapping: true,
          lineNumbers: true,
          theme: "monokai",
          keyMap: "sublime",
          scrollbarStyle: "simple",
          mode: language,
        }}
      />
    </div>
  );
};

export default CssEditor;
