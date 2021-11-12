import * as path from "path";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { remote, ipcRenderer } from "electron";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TopBar from "./TopBar";
const { BrowserWindow, dialog, Menu } = remote;
const Code = styled.div`
  font-family: monaco, monospace;
  width: 100%;
  height: 300px;
  border: none;
`;

const mainContainer = css`
  margin-top: 10px;
`;
const defaultCode = {
  content: "<empty>"
};
export default function MainScreen() {
  const [code, setCode] = useState(defaultCode);
  ipcRenderer.on("file-loaded", (event, arg) => {
    setCode(arg);
  });
  const ide = false ? (
    <Editor height="90vh" defaultLanguage="bash" defaultValue={code.content} />
  ) : null;
  return (
    <>
      <TopBar filename={code.filename} />
      {ide}
      <Container css={mainContainer}>
        <Row>
          <Col>
            <pre>{code.content}</pre>
          </Col>
        </Row>
      </Container>
    </>
  );
}
