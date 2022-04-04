import styled from "styled-components";
export const Notification = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  background: #f00;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  transform: translateY(-50%);
  box-sizing: border-box;
  z-index: 4;
  //inside
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  @media only screen and (max-width: 560px) {
    width: 100%;
    top: 100%;
    transform: translateY(-100%);
    left: 0;
    border-radius: 0;
    animation: 0.3s sdown ease 1;
  }

  ${({ $isOpen }) =>
    $isOpen
      ? `
  top:95%;
  left:2%;
  opacity:1;
  animation:0.3s up ease 1;
  display:grid;

  @media only screen and (max-width: 560px) {
  animation: 0.3s sup ease 1;
  }
  `
      : `
  top: 150%;
  left: 2%;
  opacity: 0;
  animation: 0.3s down ease 1;`}

  @keyframes up {
    0% {
      display: none;
      top: 100%;
      opacity: 0;
    }
    75% {
      top: 95%;
      opacity: 1;
    }
    100% {
      display: grid;
    }
  }
  @keyframes down {
    0% {
      top: 95%;
      opacity: 1;
      display: grid;
    }
    75% {
      top: 150%;
      opacity: 0;
    }
    100% {
      display: grid;
    }
  }
  @keyframes sup {
    0% {
      display: none;
      top: 100%;
      transform: translateY(0%);
      opacity: 0;
    }
    75% {
      top: 100%;
      transform: translateY(-100%);
      opacity: 1;
    }
    100% {
      display: grid;
    }
  }
  @keyframes sdown {
    0% {
      top: 100%;
      opacity: 1;
      display: grid;
      transform: translateY(-100%);
    }
    75% {
      top: 150%;
      opacity: 0;
      transform: translateY(0%);
    }
    100% {
      display: grid;
    }
  }
`;

export const Text = styled.div<{ closeButton?: boolean }>`
  font-weight: 600;
  line-height: 20px;
  padding: 0 10px;
  text-align: center;
  float: left;
`;

export const Close = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
