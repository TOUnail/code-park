import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/keymap/sublime";
import "codemirror/addon/scroll/simplescrollbars";
import CodeMirror from "codemirror";

import { Controlled as ControlledEditor } from "react-codemirror2-react-17";
import emmet from "@emmetio/codemirror-plugin";

emmet(CodeMirror);
const Editor = (props) => {
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
          mode: language,
          keyMap: "sublime",
          scrollbarStyle: "simple",
          extraKeys: {
            Tab: "emmetExpandAbbreviation",
            Esc: "emmetResetAbbreviation",
            Enter: "emmetInsertLineBreak",
          },
        }}
      />
    </div>
  );
};

export default Editor;
