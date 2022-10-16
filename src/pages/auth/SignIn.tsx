import { FormEvent } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function SignIn() {
  useDocumentTitle('Sign In');

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1>Sign In</h1>
      <form onSubmit={onSubmitHandler} className="grid gap-4">
        <input
          type="text"
          placeholder="Username"
          className=" border-2 border-gray-200 rounded-lg bg-off-white px-3 py-2 focus:outline-girlguiding-secondary-gray"
        />

        <input
          type="password"
          placeholder="Password"
          className=" border-2 border-gray-200 rounded-lg bg-off-white px-3 py-2 focus:outline-girlguiding-secondary-gray"
        />

        <button
          type="submit"
          className="bg-girlguiding-primary-pink text-girlguiding-primary-white rounded-lg px-4 py-2 hover:bg-girlguiding-primary-pink-70 focus:outline-girlguiding-primary-pink-20 focus:outline-8 focus-visible:shadow-inner"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
