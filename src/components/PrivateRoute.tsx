import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Unauthorised } from './error';

export interface PrivateRouteProps {
  isAuthorised: boolean;
  isAuthenticating: boolean;
  isSignedIn: boolean;
}

function PrivateRoute(Props: PrivateRouteProps) {
  const { isAuthorised, isAuthenticating, isSignedIn } = Props;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && !isSignedIn)
      navigate('/sign-in', { state: { from: location }, replace: true });
  }, [isSignedIn, isAuthenticating, location, navigate]);

  if (isAuthenticating) return <div>{'Authenticating...'}</div>;
  return isAuthorised ? <Outlet /> : <Unauthorised />;
}

export default PrivateRoute;
