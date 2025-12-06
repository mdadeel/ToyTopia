import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
const Login = () => {
  const { userLogin, googleSign, user, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia||Login"

  }, [location]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/profile');
    }
  }, [user, loading, navigate]);

  const from = location.state?.from?.pathname || "/";

  // const bypassLogin = true;

  const handelLogin = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }

    userLogin(email, password)
      // eslint-disable-next-line
      .then((result) => {
        console.log(result.user)
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        // setError(error.)
      });
  };

  const googleLogin = () => {
    googleSign()
      // .then(res => res.json())
      // eslint-disable-next-line
      .then(result => {

        navigate(from, { replace: true });

      })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 text-gray-600">Welcome back to ToyTopia! Login to access your favourites and profile.</p>
          <div className="w-96 h-64 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-6xl">🧸</span>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handelLogin}>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input required type="email" placeholder="email" name="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <div className="relative">
                <input required type={showPass ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3">{showPass ? '👁️' : '👁️‍🗨️'}</button>
              </div>
              <label className="label"><Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link></label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <p>{error && error}</p>
            <p>if you are new please{" "}<Link className="underline text-blue-500" to="/register" state={from}>Register</Link>{" "}first</p>
          </form>
          <div className="divider">OR</div>
          <div className="text-center mb-6">
            <button onClick={googleLogin} className="btn btn-outline gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
