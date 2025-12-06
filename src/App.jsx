import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Main from "./Layout/Main";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Profile from "./pages/Profile/Profile";
import ToyDetails from "./pages/ToyDetails/ToyDetails";
import ErrorPage from "./pages/Error/ErrorPage";
import Favourites from "./pages/Favorites/Favorites";
import ForgotPassword from "./pages/Login/ForgotPassword";
import AllToys from "./pages/AllToys/AllToys";
const App = () => (
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
