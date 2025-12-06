import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Main from "./Layout/Main";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ToyDetails from "./pages/ToyDetails/ToyDetails";
import ErrorPage from "./pages/Error/ErrorPage";
import Favorites from "./pages/Favorites/Favorites";
import ForgotPassword from "./pages/Login/ForgotPassword";
import AllToys from "./pages/AllToys/AllToys";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="all-toys" element={<AllToys />} />
            <Route path="toy/:id" element={<ToyDetails />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
