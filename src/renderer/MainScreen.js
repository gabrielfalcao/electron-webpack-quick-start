import * as path from 'path'
//import Editor, {useMonaco} from "@monaco-editor/react";
import React, { useEffect,
                //useRef,
                useState } from "react";
import { ipcRenderer } from "electron";
//import { remote } from "electron";
//import Button from "react-bootstrap/Button";
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "./TopBar";
import { loader } from "@monaco-editor/react";

loader.config({ paths: { vs: path.resolve(__dirname, '../../node_modules/monaco-editor/min/vs') } });

//const { BrowserWindow, dialog, Menu } = remote;
const defaultCode = {
    filename: undefined,
    content: "<empty>"
};

function Editor({value}) {
    return <pre>{value}</pre>;
}
export default function MainScreen() {
    //const monaco = useMonaco();

    /* useEffect(() => {
     *     if (monaco) {
     *         console.log("here is the monaco instance:", monaco);
     *     }
     * }, [monaco]);
     */
    const [code, setCode] = useState(defaultCode);
    ipcRenderer.on("file-loaded", (_, arg) => {
        setCode(arg);
    });
    useEffect(() => {
        if (!code.filename) {
            //ipcRenderer.send("read-file", "~/.bashrc");
        }
    })
    return (
        <>
            <TopBar filename={code.filename} />
            {code.filename && (
                <Editor
                    theme="vs-dark"
                    height={400}
                    language={"shell"}
                    value={code.content}

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
