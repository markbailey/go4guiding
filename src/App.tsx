import { useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MemberRoles } from './common';
import { onAuthChanged, RootState } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import PrivateRoute from './components/PrivateRoute';
import { NotFound } from './components/error';
import { SignInPage } from './pages/auth';

function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);
  const privateProps = useCallback(
    (roles: Role[]) => ({
      isAuthorised: roles.includes(user?.role as Role),
      isAuthenticating: isLoading,
      isSignedIn: user !== null
    }),
    [user, isLoading]
  );

  useEffect(() => onAuthChanged(dispatch), [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Member Routes */}
      <Route path="/" element={<PrivateRoute {...privateProps(MemberRoles)} />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path="themes" element={<h1>Themes</h1>} />
        <Route path="themes/:theme" element={<h1>Theme</h1>} />
      </Route>

      {/* 301 Redirects */}
      <Route
        path="/guides-themes/*"
        element={<Navigate to="/themes" replace />}
      />

      {/* Catch All Route */}
      <Route path="*" element={<NotFound message="Page Not Found" />} />
    </Routes>
  );
}

export default App;
