import { useFilters } from "@/contexts/FiltersContext";
import ProductCard from "@/pages/products/ProductCard";
import type { Category } from "@/types/products";

type ProductsListProps = {
  categoriesData: Category[];
};

const ProductsList = ({ categoriesData }: ProductsListProps) => {
  const { selectedCategories, selectedSubcategories, selectedMarketplaces } =
    useFilters();

  return (
    <div className="mt-6 flex flex-wrap">
      {categoriesData.flatMap((category) =>
        category.subcategories.flatMap((subcategory) => {
          const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(category.name);
          const subcategoryMatch =
            selectedSubcategories.length === 0 ||
            selectedSubcategories.includes(subcategory.name);

          if (!categoryMatch || !subcategoryMatch) return [];

          return subcategory.products.flatMap((product) =>
            Object.entries(product.prices).map(
              ([marketplace, price], index) => {
                const marketplaceMatch =
                  selectedMarketplaces.length === 0 ||
                  selectedMarketplaces.includes(marketplace);

                if (!marketplaceMatch) return null;

                return (
                  <ProductCard
                    key={`${product.name}-${marketplace}-${index}`}
                    product={product}
                    marketplace={marketplace}
                    price={price}
                  />
                );
              }
            )
          );
        })
      )}
    </div>
  );
};

export default ProductsList;
