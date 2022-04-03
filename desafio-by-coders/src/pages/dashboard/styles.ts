import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 10px 10px;
  padding: 3%;
  height: 100vh;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const UploadButton = styled(motion.button)`
  background-color: transparent;
  border: #03a9f4 solid 1px;
  width: 20%;
  padding: 0.5%;
  font-size: 16px;
  color: #03a9f4;
  font-weight: bold;
  border-radius: 5px;
  flex: 0 1 13%;
  cursor: pointer;
  @media (max-width: 796px) {
    flex: 1 1 100%;
    padding: 2%;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
  @media (max-width: 796px) {
    text-align: center;
  }
`;
const Title = styled.span`
  align-self: center;
  color: #03a9f4;
  font-size: 24px;
  font-weight: bold;
  flex: 1 1 100%;
`;

export { Container, UploadButton, ButtonWrapper, Title, TitleWrapper};
