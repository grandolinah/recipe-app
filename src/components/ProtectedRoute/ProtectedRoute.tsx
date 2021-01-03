import React, { useEffect } from 'react';

import { Route, Redirect } from 'react-router';

export type ProtectedRouteProps = {
  component: React.ComponentType<any>;
  path: string;
  isAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, isAuth }) => {
  useEffect(() => {
    console.log(`loading protected route '${path}' with component ${Component?.name}`);
  }, [Component, path, isAuth]);

  return (
    <Route path={path} render={() => isAuth ? <Component /> : <Redirect to="/login" />} />
  );
};

export default ProtectedRoute;