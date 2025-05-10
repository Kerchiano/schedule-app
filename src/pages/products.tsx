import { FiltersProvider } from "@/contexts/FiltersContext";
import type { Category } from "@/types/products";
import data from "data.json";
import FilterSideBar from "@/pages/products/FilterSideBar";
import Container from "@/pages/products/Container";
import ProductsSection from "@/pages/products/ProductSection";
function ProductsPage() {
  const categoriesData: Category[] = data.categories;

  const allMarketplaces = Array.from(
    new Set(
      categoriesData.flatMap((category) =>
        category.subcategories.flatMap((subcategory) =>
          subcategory.products.flatMap((product) => Object.keys(product.prices))
        )
      )
    )
  );

  return (
    <FiltersProvider>
      <Container>
        <FilterSideBar
          allMarketplaces={allMarketplaces}
          categoriesData={categoriesData}
        />
        <ProductsSection categoriesData={categoriesData} />
      </Container>
    </FiltersProvider>
  );
}

export default ProductsPage;
