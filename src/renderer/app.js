import * as React from "react";
import * as ReactDOM from "react-dom";
import MainScreen from "./MainScreen";
import "bootstrap/dist/css/bootstrap.min.css";

function errorElement(message, style = "") {
  const element = document.createElement("pre");
  element.appendChild(document.createTextNode(message));
  element.style.cssText = `font-size: 18px; color: red; background-color: mistyrose;padding: 1rem; ${style}`;
  return element;
}
function render() {
  const root = document.getElementById("app");

  try {
    ReactDOM.render(<MainScreen />, root);
  } catch (e) {
    root.appendChild(
      errorElement(`Application Error`, "font-size:24px;text-align:center")
    );
    root.appendChild(errorElement(`Error: ${e.message}`));
    root.appendChild(
      errorElement(
        `${e.stack}`,
        "margin: 2rem 4rem; background: #999;border: 2px solid #333; color: #000;font-size: 14px"
      )
    );
  }
}

render();
