import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components";

const rootElement = document.getElementById("root") as any;

const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
