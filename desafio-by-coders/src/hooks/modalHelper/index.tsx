import { ReactNode, useEffect, useState } from "react";
import { Modal } from "../../components";

interface IUseModalHelper {
  ignoreOutsideClick?: boolean;
}

interface IReturnModalHelper {
  render(children?: ReactNode): ReactNode;
  closeModal(): void;
  openModal(): void;
}

type IFModalHelper = (props?: IUseModalHelper) => IReturnModalHelper;

export const useModalHelper: IFModalHelper = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const render = (children?: ReactNode) => (
    <Modal
      closeHandler={() => setIsOpen(false)}
      {...{ isOpen, ...props }}
    >
      {children}
    </Modal>
  );
  return {
    render,
    closeModal: () => setIsOpen(false),
    openModal: () => setIsOpen(true),
  };
};
