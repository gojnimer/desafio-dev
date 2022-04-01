import { Route, Routes, useLocation } from "react-router-dom";
import App from "../../../App";
import { routePaths } from "../../../constants/routePaths";
import { Dashboard } from "../../../pages";
import { Redirect } from "../../../utils";

export const Routing: React.FC = () => {
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path={routePaths.default} element={<App />}>
        <Route index element={<Redirect to={routePaths.dashboard} />} />
        <Route path={routePaths.dashboard} element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Redirect to={routePaths.dashboard} />} />
    </Routes>
  );
};
