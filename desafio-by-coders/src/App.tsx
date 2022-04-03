import { Outlet } from "react-router-dom";
import { GlobalStyles } from "./styles";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default App;
