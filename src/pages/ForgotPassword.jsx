import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Forgot Password";

    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
      console.log("reset email sent to:", email)
      window.open('https://mail.google.com', '_blank');
    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center mb-6">
          <span className="text-6xl">🔑</span>
          <h1 className="text-3xl font-bold mt-4">Forgot Password?</h1>
          <p className="text-gray-500 mt-2">No worries, we'll send you reset instructions</p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="alert alert-success"><span>Check your email! Reset link sent to <strong>{email}</strong></span></div>
                <p className="text-sm text-gray-500">Didn't receive? Check spam folder</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline w-full">Try another email</button>
                <Link to="/auth" className="btn btn-link">Back to Login</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label"><span className="label-text">Email Address</span></label>
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required />
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <div className="form-control mt-6"><button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Reset Password'}</button></div>

                <div className="text-center mt-4"><Link to="/auth" className="text-sm text-gray-500 hover:underline">← Back to Login</Link></div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
