import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import HowItWorks from "../pages/HowItWorks";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import VerifyEmail from "../pages/VerifyEmail";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Refund from "../pages/Refund";

// ✅ Dashboard Imports
import DashboardLayout from "../pages/sellerdashboard/DashboardLayout";
import Overview from "../pages/sellerdashboard/Overview";
import Orders from "../pages/sellerdashboard/Orders";
import Messages from "../pages/sellerdashboard/Messages";
import Notifications from "../pages/sellerdashboard/Notifications";
import Settings from "../pages/sellerdashboard/Settings";

// ✅ Storefront Imports — NO DUPLICATES
import Products from "../pages/sellerdashboard/storefront/Products";
import Categories from "../pages/sellerdashboard/storefront/Categories";
import AboutStorefront from "../pages/sellerdashboard/storefront/About";
import ContactStorefront from "../pages/sellerdashboard/storefront/Contact";
import FooterStorefront from "../pages/sellerdashboard/storefront/Footer";
import HomeStorefront from "../pages/sellerdashboard/storefront/Home";
import CouponsStorefront from "../pages/sellerdashboard/storefront/Coupons";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Marketing Website Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund" element={<Refund />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ✅ Seller Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="categories" element={<Categories />} />
        <Route path="about" element={<AboutStorefront />} />
        <Route path="contact" element={<ContactStorefront />} />
        <Route path="footer" element={<FooterStorefront />} />
        <Route path="home" element={<HomeStorefront />} />
        <Route path="coupons" element={<CouponsStorefront />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}