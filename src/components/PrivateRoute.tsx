import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export interface PrivateRouteProps {
  user: UserState | null;
  isAuthenticating: boolean;
  authorisedRoles: Role[];
}

function PrivateRoute(Props: PrivateRouteProps) {
  const { authorisedRoles, user, isAuthenticating } = Props;
  const location = useLocation();
  const navigate = useNavigate();

  const userIsValid = useMemo(() => {
    return (
      user !== null &&
      user.role !== undefined &&
      authorisedRoles.includes(user.role)
    );
  }, [user, authorisedRoles]);

  const isUnauthorised = useMemo(() => {
    return !isAuthenticating && !userIsValid;
  }, [isAuthenticating, userIsValid]);

  useEffect(() => {
    if (!isAuthenticating && !userIsValid)
      navigate(`/sign-in?r=${encodeURI(location.pathname)}`);
  }, [userIsValid, isAuthenticating, location, navigate]);

  return !isUnauthorised ? <Outlet /> : <div>{'Unauthorised Access'}</div>;
}

export default PrivateRoute;
