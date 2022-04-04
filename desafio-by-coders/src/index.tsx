import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components";
import { CnabProvider } from "./contexts/cnabContext";
import { MessageCenterProvider } from "./contexts/messageCenter";

const rootElement = document.getElementById("root") as any;

const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <MessageCenterProvider>
      <CnabProvider>
        <Routing />
      </CnabProvider>
    </MessageCenterProvider>
  </BrowserRouter>
);
