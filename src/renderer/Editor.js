import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";

/* theme="vs-dark"
 * height={400}
 * language={"shell"}
 * value={code.content || "#!/usr/bin/env bash\n"}
 *  */

const editorStyle = {
  minHeight: "5em"
};
export const defaultOptions = {
  theme: "dark",
  height: "90vh",
  width: "100%",
  language: "shell",
  value: "empty"
};
export default function Editor(options = defaultOptions) {
  const element = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(
    (defaultOptions, options) => {
      monaco.editor.create(document.getElementById("main-editor"), {
        ...defaultOptions,
        ...options
      });
    },
    [defaultOptions, options]
  );
  return <div style={editorStyle} id="main-editor" />;
}
