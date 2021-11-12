import Editor, { monaco } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { remote, ipcRenderer } from "electron";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "./TopBar";

const { BrowserWindow, dialog, Menu } = remote;
const defaultCode = {
    content: "<empty>"
};


const onEditorReady = (m) => (
    _getValue,
    editor,
) => {
    editor.addAction({
        id: "myPaste",
        label: "423",
        keybindings: [m.KeyMod.CtrlCmd | m.KeyCode.KEY_V],
        contextMenuGroupId: "9_cutcopypaste",
        run: editor => {
            alert("Add your custom pasting code here");
        }
    });
};

export default function MainScreen() {
    const [code, setCode] = useState(defaultCode);
    ipcRenderer.on("file-loaded", (event, arg) => {
        setCode(arg);
    });
    useEffect(() => {
        if (!code.filename) {
            ipcRenderer.send("read-file", "~/.bashrc");
        }
    })
    return (
        <>
            <TopBar filename={code.filename} />
            {code.filename && (
                <Editor
                    theme="vs-dark"
                    height={400}
                    language={"typescript"}
                    value={code.content}
                    editorDidMount={onEditorReady}
                />
            )}
            <Container style={{marginTop: '0.75rem'}}>
                <Row>
                    <Col>
                        <pre>{/*code.content*/}</pre>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
