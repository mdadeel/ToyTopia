import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl">😵</div>
        <div>
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Page Not Found</h2>
          <p className="text-gray-500 mt-2">Oops! The page you are looking for doesn't exist.</p>
        </div>
        <Link to="/" className="btn btn-primary btn-lg">Go Back Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;