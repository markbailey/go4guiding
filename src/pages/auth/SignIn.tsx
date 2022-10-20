import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { RootState, signIn } from '../../store';

function SignIn() {
  useDocumentTitle('Sign In');
  const dispatch = useAppDispatch();
  const { isLoading, isValid: isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const url = new URL(window.location.href);
  const redirectTo = url.searchParams.get('r') || '/';

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username === undefined || password === undefined) return;
    dispatch(signIn({ username, password }));
  };

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1>Sign In</h1>
      <form onSubmit={onSubmitHandler} className="grid gap-4">
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          className="border-2 border-gray-200 rounded-lg bg-off-white px-3 py-2 focus:outline-girlguiding-secondary-gray"
          pattern="([a-z]{1,}.[a-z]{1,})"
          required
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="border-2 border-gray-200 rounded-lg bg-off-white px-3 py-2 focus:outline-girlguiding-secondary-gray"
          required
        />

        <button
          type="submit"
          className="bg-girlguiding-primary-pink text-girlguiding-primary-white rounded-lg px-4 py-2 hover:bg-girlguiding-primary-pink-70 focus:outline-girlguiding-primary-pink-20 focus:outline-8 focus-visible:shadow-inner"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
