import { ReactNode, useState } from "react";
import { Modal } from "../../components";
import { IReturnModalHelper } from "../../interfaces";



type IFModalHelper = () => IReturnModalHelper;

// Created only for component displaying, not a full functional hook.
export const useModalHelper: IFModalHelper = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const render = (children?: ReactNode) => (
    <Modal
      {...{ isOpen }}
    >
      {children}
    </Modal>
  );
  return {
    render,
    closeModal: () => isOpen && setIsOpen(false),
    openModal: () => !isOpen && setIsOpen(true),
  };
};
