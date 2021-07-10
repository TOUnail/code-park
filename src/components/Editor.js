import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/keymap/sublime";

import { Controlled as ControlledEditor } from "react-codemirror2-react-17";
const Editor = (props) => {
  // const [isInitWidth, setIsInitWidth] = useState(true);
  const { language, displayName, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
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
          mode: language,
        }}
      />
    </div>
  );
};

export default Editor;
