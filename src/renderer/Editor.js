import React, {
    useEffect,
    useRef,
    useState,
} from "react";
import * as monaco from 'monaco-editor';

/* theme="vs-dark"
 * height={400}
 * language={"shell"}
 * value={code.content || "#!/usr/bin/env bash\n"}
 *  */
export const defaultOptions = {
    theme: 'vs-dark', height: '100%', width: '100%', language: 'shell', value: "empty"
}
export default function Editor(options = defaultOptions) {
    const element = useRef(null);
    const [editor, setEditor] = useState(null);

    if (!editor && element) {
        setEditor(monaco.editor.create(element, {...defaultOptions, ...options}))
    }
    return <div ref={element}>{options.value}</div>
}
