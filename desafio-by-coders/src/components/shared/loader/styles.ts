import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 0px 2%;
  border-radius: 15px;
`;

export const Dot = styled(motion.span)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #03a9f4;
  border-radius: 1.5rem;
`;
