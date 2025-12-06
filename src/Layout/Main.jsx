import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Shared/Navbar';
import Footer from '@/components/Shared/Footer';
import { Toaster as Sonner } from "@/components/ui/sonner";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <Sonner />
        </div>
    );
};

export default Main;
