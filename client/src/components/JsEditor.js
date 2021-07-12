import React, { useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";

import { Controlled as ControlledEditor } from "react-codemirror2-react-17";
const JsEditor = (props) => {
  // const [isInitWidth, setIsInitWidth] = useState(true);
  const { language, displayName, value, onChange, socket } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
    socket.emit("send-js", value);
  };
  useEffect(() => {
    if (socket == null) return;
    socket.on("apply-js", (value) => onChange(value));
    return () => {
      socket.off("apply-js", (value) => onChange(value));
    };
  }, [socket]);
  return (
    <div className="editor-container">
      <div className="header">{displayName}</div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-wrapper"
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

export default JsEditor;
