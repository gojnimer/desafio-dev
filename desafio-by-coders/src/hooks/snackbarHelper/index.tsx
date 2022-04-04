import React from "react";
import { useState } from "react";
import { Snackbar } from "../../components";
import { IReturnSnackbarHelper } from "../../interfaces";



type IFSnackbarHelper = () => IReturnSnackbarHelper;

// Created only for error displaying, not a full functional hook.
export const useSnackbarHelper: IFSnackbarHelper = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    const [timer, setTimer] = useState<NodeJS.Timeout>()


    const render = () => <Snackbar {...{ isOpen, message }} onClose={() => setIsOpen(false)} />

    const displayMessage = React.useCallback((message: string, time: number = 3000) => {
        if (timer) {
            clearTimeout(timer)
            setTimer(undefined)
        }
        setMessage(message)
        setIsOpen(true)
        setTimer(setTimeout(() => {
            setMessage(undefined)
            setIsOpen(false)
            setTimer(undefined)
        }, time))
    }, [timer])

    const dismissMessage = React.useCallback(() => {
        timer && clearTimeout(timer)
        setMessage(undefined)
        setIsOpen(false)
        setTimer(undefined)
    }, [timer])

    return {
        render,
        displayMessage,
        dismissMessage,
        isOpen
    };
};
