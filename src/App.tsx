import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsPage from "@/pages/products";
import SchedulePage from "@/pages/schedule";
import SubCategory from "@/pages/schedule/SubCategory";
import Category from "@/pages/schedule/Category";
import Product from "@/pages/schedule/Product";
import PATHS from "@/routes/paths";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen min-w-[400px]">
        <Navbar />

        <main className="flex-1 p-4">
          <Routes>
            <Route path={PATHS.products} element={<ProductsPage />} />
            <Route path={PATHS.schedule} element={<SchedulePage />}>
              <Route path={PATHS.category} element={<Category />} />
              <Route path={PATHS.categorySlug} element={<Category />} />
              <Route path={PATHS.subcategory} element={<SubCategory />} />
              <Route path={PATHS.subcategorySlug} element={<SubCategory />} />
              <Route path={PATHS.product} element={<Product />} />
              <Route path={PATHS.productSlug} element={<Product />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
