import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import useScrollToTop from "./hooks/useScrollToTop";

function ScrollToTopWrapper() {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTopWrapper /> 
        <Layout>
          <AppRoutes />
        </Layout>
    </BrowserRouter>
    </ThemeProvider>
  );
  
}