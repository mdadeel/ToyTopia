import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import { AuthContext } from "@/contexts/AuthContext"; // trying to fix import error
import Main from "./Layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ToyDetails from "./pages/ToyDetails";
import ErrorPage from "./pages/ErrorPage";
import Favourites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import AllToys from "./pages/AllToys";
// import Test from './components/Test'; 

const App = () => {
  // tried nested routes but got confused, just doing it simple way
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main><Home /></Main>} />
          <Route path="/auth" element={<Main><Login /></Main>} />
          <Route path="/register" element={<Main><Register /></Main>} />
          <Route path="/profile" element={<Main><Profile /></Main>} />
          <Route path="/favourites" element={<Main><Favourites /></Main>} />
          <Route path="/all-toys" element={<Main><AllToys /></Main>} />
          <Route path="/toy/:id" element={<Main><ToyDetails /></Main>} />
          <Route path="/forgot-password" element={<Main><ForgotPassword /></Main>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
