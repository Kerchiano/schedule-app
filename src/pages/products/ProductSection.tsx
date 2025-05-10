import ProductsList from "@/pages/products/ProductList";
import type { Category } from "@/types/products";

interface ProductsSectionProps {
  categoriesData: Category[];
}

const ProductsSection = ({ categoriesData }: ProductsSectionProps) => {
  return (
    <div className="w-full lg:w-4/5 bg-white">
      <div className="w-full px-0 md:px-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Продукты
        </h2>
        <ProductsList categoriesData={categoriesData} />
      </div>
    </div>
  );
};

export default ProductsSection;
