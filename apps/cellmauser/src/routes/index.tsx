import { useRoutes } from "react-router-dom";

import protectedRoutes from "./protected";

function AppRoutes() {
  // This code will change after authentication code done//
  // const routes=auth.user ? protectedRoutes : public Routes;

  const routes = protectedRoutes;

  const element = useRoutes([...routes]);

  return element;
}

export default AppRoutes;
