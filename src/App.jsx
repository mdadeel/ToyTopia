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

const App = () => (
  // <RouterProvider router={router} />
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="all-toys" element={<AllToys />} />
          <Route path="toy/:id" element={<ToyDetails />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
