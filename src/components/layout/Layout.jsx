import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <div 
        className="fixed inset-0 -z-10 pointer-events-none hidden dark:block"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0f0a1a 50%, #050308 100%)"
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}