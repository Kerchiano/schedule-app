import { useFilters } from "@/contexts/FiltersContext";
import type { Subcategory } from "@/types/products";

interface SubCategoryProps {
  subcategory: Subcategory;
}

const SubcategoryCheckbox = ({ subcategory }: SubCategoryProps) => {
  const { selectedSubcategories, toggleSubcategory } = useFilters();

  return (
    <li  className="mb-1 cursor-pointer z-50">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          onChange={() => toggleSubcategory(subcategory.name)}
          checked={selectedSubcategories.includes(subcategory.name)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        {subcategory.name}
      </label>
    </li>
  );
};

export default SubcategoryCheckbox;
