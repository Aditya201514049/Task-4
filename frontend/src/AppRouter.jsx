import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;