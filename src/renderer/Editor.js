import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";

/* theme="vs-dark"
 * height={400}
 * language={"shell"}
 * value={code.content || "#!/usr/bin/env bash\n"}
 *  */
export const defaultOptions = {
  theme: "vs-dark",
  height: "100%",
  width: "100%",
  language: "shell",
  value: "empty"
};
export default function Editor(options = defaultOptions) {
  const element = useRef(null);
  const [editor, setEditor] = useState(null);

  if (!editor && element.current) {
    setEditor(
      monaco.editor.create(element.current, { ...defaultOptions, ...options })
    );
  }
  return <div ref={element}>{options.value}</div>;
}
