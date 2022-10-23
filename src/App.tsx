import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MemberRoles } from './common';
import { RootState, onAuthChanged } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import PrivateRoute, { PrivateRouteProps } from './components/PrivateRoute';
import { SignInPage } from './pages/auth';
import { HomePage, ThemesPage } from './pages/member';

function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading: isAuthenticating } = useAppSelector(
    (state: RootState) => state.auth
  );

  const PR = useMemo(
    () => (props: Partial<PrivateRouteProps>) => {
      const { authorisedRoles, ...otherProps } = props;
      return (
        <PrivateRoute
          {...otherProps}
          user={user}
          authorisedRoles={authorisedRoles || []}
          isAuthenticating={isAuthenticating}
        />
      );
    },
    [user, isAuthenticating]
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Member Routes */}
      <Route path="/" element={<PR authorisedRoles={MemberRoles} />}>
        <Route index element={<HomePage />} />
        <Route path="/themes/:theme" element={<ThemesPage />} />
      </Route>

      {/* Admin Routes (/admin) */}

      {/* 301 Redirects */}
      <Route
        path="/guides-themes/*"
        element={<Navigate to="/themes" replace />}
      />

      {/* Catch All Route */}
      <Route path="*" element={<div>{'Page Not Found'}</div>} />
    </Routes>
  );
}

export default App;
