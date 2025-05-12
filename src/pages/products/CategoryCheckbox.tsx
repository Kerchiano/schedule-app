import type { Category } from "@/types/products";
import { useFilters } from "@/contexts/FiltersContext";
import SubcategoryCheckbox from "@/pages/products/SubCategoryCheckbox";
import { useState } from "react";
import data from "data.json";

interface CategoryProps {
  category: Category;
}

const CategoryCheckbox = ({ category }: CategoryProps) => {
  const {
    selectedCategories,
    toggleCategory,
    getFilteredSubcategories,
    getScheduleFromLocalStorage,
    selectedDay,
  } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);

  const scheduleSettings = getScheduleFromLocalStorage();

  const subcategoryData = selectedDay
    ? getFilteredSubcategories(category.slug, selectedDay, scheduleSettings)
    : data.categories.find((cat) => cat.slug === category.slug)
        ?.subcategories || [];
  return (
    <li className="mb-4">
      <div className="flex items-center justify-between cursor-pointer">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            onChange={() => toggleCategory(category.name)}
            checked={selectedCategories.includes(category.name)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="font-semibold text-gray-800">{category.name}</span>
        </label>
        {category.subcategories.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`transition-transform cursor-pointer ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-500"
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
          </button>
        )}
      </div>

      {isExpanded && (
        <ul className="pl-6 mt-2">
          {subcategoryData.map((subcategory, subIndex) => (
            <SubcategoryCheckbox key={subIndex} subcategory={subcategory} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryCheckbox;
