import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalContainer = styled(motion.div)`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0;
  position: relative;
  top: 10%;
  left: 0;
  margin:0px auto;
  background-color: white;
  z-index: 2;
  width: fit-content;
  height: fit-content;
`;

const LightBox = styled.div`
  position: fixed;
  width: 100%;
  background-color: rgb(0 0 0 / 60%);
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
`;

export { LightBox };
