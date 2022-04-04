import ReactDOM from "react-dom";
import { Close, Notification, Text } from "./styles";

export const Snackbar: React.FC<{
    message?: string
    onClose(): void
    isOpen: boolean
}> = ({ message, onClose, isOpen }) => {
    return (<>
        {isOpen && ReactDOM.createPortal(
            <>
                <Notification $isOpen={isOpen}>
                    <Text >
                        {message}
                    </Text>
                    <Close onClick={onClose} data-testid={'snackbar-close-btn'}>
                        &times;
                    </Close>
                </Notification>
            </>,
            document.getElementById("snackbar__root") as any
        )}
    </>
    );
}