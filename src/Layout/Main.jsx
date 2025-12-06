import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ClimbingBoxLoader } from 'react-spinners';
const Main = () => {
    const { loading } = useContext(AuthContext);

    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-288px)]">
                {loading ? (
                    <div className="flex justify-center relative top-32">
                        <ClimbingBoxLoader
                            color={"#3b82f6"}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                        />
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Main;
