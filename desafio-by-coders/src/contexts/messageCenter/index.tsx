import React, { createContext, ReactNode } from "react";
import { useModalHelper, useSnackbarHelper } from "../../hooks";
import { IReturnModalHelper, IReturnSnackbarHelper } from "../../interfaces";


export interface MessageCenterContextProps {
    modalHelper: IReturnModalHelper
    snackbarHelper: IReturnSnackbarHelper
}

const defaultValues = {};

const MessageCenterContext = createContext<MessageCenterContextProps>(
    defaultValues as MessageCenterContextProps
);

const MessageCenterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const {render: renderSnackbar, ...snackbarHelper} = useSnackbarHelper()
    const modalHelper = useModalHelper()

    return (
        <MessageCenterContext.Provider
            value={{ modalHelper, snackbarHelper }}
        >
            {children}
            {renderSnackbar && renderSnackbar()}
        </MessageCenterContext.Provider>
    );
};

const useMessageCenterContext = (): MessageCenterContextProps => {
    return React.useContext(MessageCenterContext);
};

export { MessageCenterContext, MessageCenterProvider, useMessageCenterContext };
