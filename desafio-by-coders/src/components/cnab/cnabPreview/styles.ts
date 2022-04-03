import styled from "styled-components";

const List = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  justify-self: center;
  padding: 0 1%;
  max-height: 80vh;
  display: grid;
  gap: 15px 0;
  overflow: hidden auto;
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
    padding: 0px;
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

const ListItem = styled.div<{ $reduceColumns?: boolean }>`
  padding: 15px;
  /*   border-radius: 10px; */
  border-bottom: 1px solid #ccc;
  width: 100%;
  max-height: 400px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns:${({$reduceColumns}) => $reduceColumns ? 'repeat(5, 1fr)' : '1.2fr 1.5fr repeat(6, 1fr)'} ;
  justify-content: start;
  grid-gap: 0px 5px;
  align-items: flex-start;
  @media (max-width: 796px) {
    grid-gap: 10px 5px;
    grid-template-columns: 1fr 1fr;
  }
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
  font-size: ${({ $isTitle }) => ($isTitle ? "12px" : "14px")};
  font-weight: ${({ $isTitle }) => ($isTitle ? "bold" : "normal")};
  padding: 0;
  margin: 0;
  word-break: keep-all;
  ${({ $isNegative }) =>
    $isNegative !== undefined
      ? !$isNegative
        ? "color: green;"
        : "color: red;"
      : ""}
`;

export { List, ListItem, TextWrapper, Text };
