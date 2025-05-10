import type { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  marketplace: string;
  price: number;
}

const ProductCard = ({ product, marketplace, price }: ProductCardProps) => {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 group relative px-4 mb-[40px]">
      <p className="mt-1 text-sm font-semibold text-black mb-2">{marketplace}</p>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto rounded-md bg-gray-200 object-contain group-hover:opacity-75 transition-opacity duration-300"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#" className="outline-none focus:outline-none">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{price} грн</p>
      </div>
    </div>
  );
};

export default ProductCard;
