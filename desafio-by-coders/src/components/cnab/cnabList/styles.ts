import { motion } from "framer-motion";
import styled from "styled-components";

const List = styled.div`
  width: 100%;
  justify-self: center;
  max-height: 80vh;
  display: grid;
  gap: 15px 0;
  overflow-y: auto;
  overflow: hidden auto;
  padding: 5px;
  &::-webkit-scrollbar {
    width: 2px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #ccc; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 2px solid #8c8c8f; /* creates padding around scroll thumb */
  }

  @media (max-width: 796px) {
    box-shadow: none;
    overflow-y: unset;
    max-height: 100%;
  }
`;
const TextWrapper = styled.div`
  display: grid;
  color: #685d5d;
  height: contents;
  width: 100%;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  gap: 4px 0px;
  &:nth-child(even) {
    justify-content: end;
    text-align: end;
  }
  @media (min-width: 796px) {
    &:nth-child(even) {
      justify-content: start;
      text-align: start;
    }
    &:last-child {
      justify-content: end;
      text-align: end;
    }
  }
`;

const ListItem = styled(motion.div)`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 160px;
  height: auto;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 12% 15% auto 1fr;
  justify-content: start;
  grid-gap: 20px 5%;
  align-items: center;
  @media (max-width: 796px) {
    grid-template-columns: 1fr 1fr;
    
  }
`;

const SelectedItemContainer = styled(motion.div)`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 2%;
  width: 90%;
  position: relative;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  max-height: 50vh;
  background-color: white;
  z-index: 1;
  height: 80vh;
  //inside
  display: grid;
  grid-template-columns: 100%;
  justify-content: start;
  grid-gap: 3% 5%;
  align-items: start;
  grid-template-rows: auto 1fr;
  @media (max-width: 796px) {
    margin-top: 18%;
    width: 97%;
    padding: 4%;
    max-height: 80vh;
  }
`;

const InfoContainer = styled.div`
  padding: 5px;
  width: 100%;
  border-bottom: #ccc solid 1px;
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 10px 20px;
  @media (max-width: 796px) {
    grid-template-columns: 1fr 1fr;
  }
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

const Text = styled.p<{ $isTitle?: boolean; $isNegative?: boolean }>`
  ${({ $isTitle }) =>
    $isTitle &&
    `
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */`}
  font-size: ${({ $isTitle }) => ($isTitle ? "14px" : "16px")};
  font-weight: ${({ $isTitle }) => ($isTitle ? "bold" : "normal")};
  padding: 0;
  margin: 0;
  ${({ $isNegative }) =>
    $isNegative !== undefined
      ? !$isNegative
        ? "color: green;"
        : "color: red;"
      : ""}
`;

export {
  List,
  ListItem,
  TextWrapper,
  Text,
  SelectedItemContainer,
  LightBox,
  InfoContainer,
};
