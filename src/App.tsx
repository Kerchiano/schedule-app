import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsPage from "@/pages/products";
import SchedulePage from "@/pages/shedule";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen min-w-[400px]">
        <Navbar />

        <main className="flex-1 p-4">
          <Routes>
            <Route path={import.meta.env.VITE_ROUTE_PRODUCTS} element={<ProductsPage />} />
            <Route path={import.meta.env.VITE_ROUTE_SCHEDULE} element={<SchedulePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
