// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function Layout({ children }) {
//   return (
//     <>
//       <div 
//         className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
//         style={{
//           background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0f0a1a 50%, #050308 100%)"
//         }}
//       />
//       <div className="flex min-h-screen flex-col">
//         <Navbar />
//         <main className="flex-1">{children}</main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// src/components/layout/Layout.jsx

import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();
  
  // ✅ Dashboard route check karo
  const isDashboard = location.pathname.startsWith("/dashboard");
  
  return (
    <>
      <div 
        className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0f0a1a 50%, #050308 100%)"
        }}
      />
      <div className="flex min-h-screen flex-col">
        {/* ✅ Agar dashboard nahi hai toh navbar dikhao */}
        {!isDashboard && <Navbar />}
        <main className="flex-1">{children}</main>
        {/* ✅ Agar dashboard nahi hai toh footer dikhao */}
        {!isDashboard && <Footer />}
      </div>
    </>
  );
}