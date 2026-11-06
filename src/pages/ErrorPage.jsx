import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo, EmptyToys } from '../components/Brand';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg text-center">
        <div className="mb-4 flex justify-center">
          <EmptyToys className="w-48 h-48" />
        </div>
        <span className="eyebrow mb-4">Page not found</span>
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="mt-4 text-lg text-ink/75">
          Oops! This toy rolled under the sofa. Let's get you back to the fun.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-coral px-8 py-3.5">
            <Home className="w-5 h-5" /> Back home
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline-toy px-8 py-3.5">
            <ArrowLeft className="w-5 h-5" /> Go back
          </button>
        </div>
        <div className="mt-12"><Logo /></div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
