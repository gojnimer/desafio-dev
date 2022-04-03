import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { LightBox } from "./styles";
import { ModalContainer } from "./styles";
import ReactDOM from "react-dom";

export const Modal: React.FC<{
  isOpen: boolean;
  children: ReactNode;
}> = ({ isOpen, children }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <LightBox>
          <ModalContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {children}
          </ModalContainer>
        </LightBox>
      )}
    </AnimatePresence>,
    document.getElementById("root") as any
  );
};
