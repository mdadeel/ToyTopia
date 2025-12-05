import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="text-center space-y-6 max-w-md w-full">
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
          <AlertTriangle className="h-16 w-16 text-red-500 relative z-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-500">
            Arre bhai! Where are you going? This page doesn't exist.
          </p>
        </div>

        <Button asChild size="lg" className="w-full font-bold shadow-lg shadow-primary/20">
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;