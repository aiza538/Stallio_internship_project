import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import HowItWorks from "../pages/HowItWorks";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Pricing from "../pages/Pricing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}