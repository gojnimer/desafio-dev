import { ReactNode } from "react";

export interface IReturnSnackbarHelper {
    render?(): ReactNode;
    displayMessage(message: string, time?: number): void;
    dismissMessage(): void;
    isOpen: boolean
}