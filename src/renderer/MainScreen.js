import * as path from "path";
import React, { useEffect, useRef, useState } from "react";
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
import StatusBar from "./StatusBar";
import Editor from "./Editor";

//const { BrowserWindow, dialog, Menu } = remote;
const defaultCode = {
  filename: undefined,
  content: undefined,
  language: "shell"
};

export default function MainScreen() {
  const [language, setLanguage] = useState("shell");

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
  });
  return (
    <Container fluid>
      <TopBar
        filename={code.filename}
        language={language}
        setLanguage={setLanguage}
      />
      <Editor
        theme="vs-dark"
        height={400}
        language={language}
        value={code.content}
      />
    </Container>
  );
}
