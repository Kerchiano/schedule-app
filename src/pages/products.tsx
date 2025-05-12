import { FiltersProvider } from "@/contexts/FiltersContext";
import FilterSideBar from "@/pages/products/FilterSideBar";
import Container from "@/pages/products/Container";
import ProductsSection from "@/pages/products/ProductSection";
function ProductsPage() {
  return (
    <FiltersProvider>
      <Container>
        <FilterSideBar />
        <ProductsSection />
      </Container>
    </FiltersProvider>
  );
}

export default ProductsPage;
