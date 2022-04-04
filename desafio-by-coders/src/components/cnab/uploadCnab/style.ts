import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)<{ $isModal?: boolean }>`
  ${({ $isModal }) => ($isModal ? "width: 70vw;" : "")}
  height: ${({ $isModal }) => ($isModal ? "70vh" : "87vh")};
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  gap: 10px 10px;
  padding: 15px;
  @media (max-width: 796px) {
    flex: 1 1 100%;
    padding: 2.5%;
    width: 95vw;
    height: ${({ $isModal }) => ($isModal ? "70vh" : "97vh")};
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Title = styled.span`
  /* padding: 0 0.6%; */
  align-self: center;
  color: #03a9f4;
  font-size: 24px;
  font-weight: bold;
`;

const FileContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 3px;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  align-content: center;
  justify-items: center;
  gap: 15px 0;
  // Border animation
  @keyframes border-dance {
    0% {
      background-position: left top, right bottom, left bottom, right top;
    }
    100% {
      background-position: left 15px top, right 15px bottom, left bottom 15px,
        right top 15px;
    }
  }
  animation: border-dance 1s infinite linear;
  background-image: linear-gradient(90deg, #ccc 50%, transparent 50%),
    linear-gradient(90deg, #ccc 50%, transparent 50%),
    linear-gradient(0deg, #ccc 50%, transparent 50%),
    linear-gradient(0deg, #ccc 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right top;
`;

const Icon = styled.i`
  color: #cccccc;
  font-size: 84px;
  width: 84px;
`;

const UploadText = styled.span`
  color: #979393;
  font-weight: bold;
  margin: 0% 20%;
  text-align: center;
`;

const LinkText = styled.label`
  color: #3f3ff7;
  text-decoration: underline;
  cursor: pointer;
`;

const AsideContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 0 10px;
`;

const CloseButton = styled(motion.button)`
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: transparent;
  color: #1da1f2;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;
  justify-self: end;
  &:focus {
    outline: solid 0 transparent;
    box-shadow: 0 0 0 2px #8ed0f9;
  }

  &:hover {
    background: rgba(29, 161, 142, 0.1);
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: #968f8f;
    &:hover {
      background: #03a9f4;
    }
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Button = styled(motion.button)<{ $isDeleteButton?: boolean }>`
  background-color: transparent;
  border: ${({ $isDeleteButton }) => ($isDeleteButton ? "red" : "#03a9f4")}
    solid 1px;
  width: 20%;
  padding: 0.5%;
  font-size: 16px;
  color: ${({ $isDeleteButton }) => ($isDeleteButton ? "red" : "#03a9f4")};
  font-weight: bold;
  justify-self: end;
  border-radius: 5px;
  flex: 0 1 13%;
  cursor: pointer;
  @media (max-width: 796px) {
    flex: 1 1 100%;
    padding: 2%;
  }
`;

export {
  Container,
  FileContainer,
  CloseButton,
  Icon,
  UploadText,
  LinkText,
  Button,
  Header,
  Title,
  AsideContainer
};
