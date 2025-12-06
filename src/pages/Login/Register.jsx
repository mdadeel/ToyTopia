import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
const Register = () => {
    const { createuser, user, loading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "ToyTopia||Register"

    }, [location]);

    useEffect(() => {
        if (!loading && user) {
            navigate('/profile');
        }
    }, [user, loading, navigate]);

    const from = location.state || "/";

    const handelRegister = async (e) => {
        setError("");
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Password must be atleast 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must have an uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must have a lowercase letter");
            return;
        }

        try {
            await createuser(name, email, password, photo);
            console.log("user created")
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6 text-gray-600">Create your ToyTopia account to save favourites and manage profile.</p>
                    <div className="w-96 h-64 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-6xl">🎁</span>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handelRegister}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input required type="text" placeholder="Your name" name="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input required type="email" placeholder="email" name="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo URL (optional)</span></label>
                            <input type="url" placeholder="https://..." name="photo" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <div className="relative">
                                <input required type={showPass ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3">{showPass ? '👁️' : '👁️‍🗨️'}</button>
                            </div>
                            <label className="label"><span className="label-text-alt text-gray-500">Min 6 chars, 1 uppercase, 1 lowercase</span></label>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn btn-success" type="submit">Register</button>
                        </div>
                        <p>{error && error}</p>
                        <p>Already have account?{" "}<Link className="underline text-blue-500" to="/auth">Login</Link>{" "}here</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
