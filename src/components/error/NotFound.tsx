interface NotFoundProps {
  message: string;
}

function NotFound(props: NotFoundProps) {
  const { message } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-warning-light">
      <h1 className="text-4xl font-bold">404</h1>
      <span>{message}</span>
    </div>
  );
}

export default NotFound;
