import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ipcRenderer } from "electron";

const knownFiles = ["~/.bashrc", "~/.ssh/id_rsa.pub"];
export default function TopBar({ filename }) {
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              {knownFiles.map(filename => (
                <NavDropdown.Item
                  key={filename}
                  onClick={() => {
                    ipcRenderer.send("read-file", filename);
                  }}
                >
                  {filename}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  if (confirm("Are you sure you want to quit?")) {
                    ipcRenderer.send("quit");
                  }
                }}
              >
                Quit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {filename ? <Navbar.Brand href="#home">{filename}</Navbar.Brand> : null}
      </Container>
    </Navbar>
  );
}
