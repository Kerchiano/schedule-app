import { useFilters } from "@/contexts/FiltersContext";
import CategoryCheckbox from "@/pages/products/CategoryCheckbox";
import DaysList from "@/pages/products/DaysList";
import MarketplaceCheckbox from "@/pages/products/MarketplaceCheckbox";
import { useState } from "react";

const FilterSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filteredCategories: categoriesData } = useFilters();

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
    <>
      <div className="hidden lg:block w-1/5 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Категории</h2>
        <ul>
          {categoriesData.map((category, index) => (
            <CategoryCheckbox key={index} category={category} />
          ))}
          <li className="mt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Маркетплейсы
            </h3>
            <ul className="pl-1">
              {allMarketplaces.map((marketplace, index) => (
                <MarketplaceCheckbox key={index} marketplace={marketplace} />
              ))}
            </ul>
          </li>
        </ul>
        <DaysList />
      </div>
      <div className="lg:hidden w-auto mb-4 relative">
        <div className="flex items-center bg-gray-100 w-[160px] rounded-lg">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-auto bg-gray-100 px-4 py-3 rounded-lg text-left font-bold text-xl"
          >
            Категории
          </button>
          <svg
            className={`transition-transform w-4 h-4 text-gray-500" cursor-pointer ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="bg-gray-100 p-4 rounded-lg mt-2 w-[300px] absolute z-10">
            <ul>
              {categoriesData.map((category, index) => (
                <CategoryCheckbox key={index} category={category} />
              ))}
              <li className="mt-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Маркетплейсы
                </h3>
                <ul className="pl-1">
                  {allMarketplaces.map((marketplace, index) => (
                    <MarketplaceCheckbox
                      key={index}
                      marketplace={marketplace}
                    />
                  ))}
                </ul>
                <DaysList />
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSideBar;
