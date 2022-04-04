import { BrowserRouter } from "react-router-dom";

import { ReactNode } from "react";
import { MessageCenterProvider } from "../../contexts/messageCenter";
import { CnabProvider } from "../../contexts/cnabContext";
const ContextWrapper: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  return (
    <>
      <div id="root">
        <BrowserRouter>
          <MessageCenterProvider>
            <CnabProvider>{children}</CnabProvider>
          </MessageCenterProvider>
        </BrowserRouter>
      </div>
      <div id="snackbar__root"></div>
      <div id="modal__root"></div>
    </>

  );
};


export {
  ContextWrapper
}