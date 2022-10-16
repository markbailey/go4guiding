import { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Role } from './common';
import { RootState, onAuthChanged } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading: isAuthenticating } = useAppSelector(
    (state: RootState) => state.auth
  );

  const PR = useMemo(
    () => (props: any) =>
      (
        <PrivateRoute
          {...props}
          user={user}
          isAuthenticating={isAuthenticating}
        />
      ),
    [user, isAuthenticating]
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/">
        <Route index element={<StartPage />} />
        <Route path="sign-in" element={<span>{'Sign In Page'}</span>} />
        <Route path="sign-up" element={<span>{'Sign Up Page'}</span>} />
      </Route> */}

      {/* Member Routes */}
      {/* <Route path="/themes" element={<PR authorisedRoles={[Role.Member]} />}>
        <Route index element={<span>{'Award Themes'}</span>} />
        <Route path=":theme" element={<span>{'Award Theme'}</span>} />
      </Route> */}

      {/* Admin Routes (/admin) */}
      <Route
        path="/"
        element={<PR authorisedRoles={[Role.Admin, Role.Leader]} />}
      >
        <Route index element={<span>{'Admin Only'}</span>} />
      </Route>

      {/* 301 Redirects */}
      {/* <Route
        path="/guides-themes/*"
        element={<Navigate to="/themes" replace />}
      /> */}

      {/* Catch All Route */}
      <Route path="*" element={<div>{'Page Not Found'}</div>} />
    </Routes>
  );
}

export default App;
