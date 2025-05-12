import { useNavigate, useParams } from "react-router-dom";
import data from "data.json";
import ScheduleForm from "@/pages/schedule/forms/ScheduleForm";
import { useScheduleSettings } from "@/pages/schedule/hooks/useScheduleSettings";
import { useState } from "react";

export default function SubCategory() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);

  const categories = data.categories;

  const {
    selectedDays,
    selectedMarketplaces,
    toggleDay,
    toggleMarketplace,
    handleSave,
  } = useScheduleSettings("subcategories", slug);

  if (slug) {
    const subcategory = categories
      .flatMap((cat) =>
        cat.subcategories.map((sub) => ({ ...sub, category: cat.name }))
      )
      .find((sub) => sub.slug === slug);

    if (!subcategory) return <p>Подкатегория не найдена</p>;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">
          Вы выбрали подкатегорию: {subcategory.name}
        </h2>
        <ScheduleForm
          selectedDays={selectedDays}
          selectedMarketplaces={selectedMarketplaces}
          toggleDay={toggleDay}
          toggleMarketplace={toggleMarketplace}
          onSave={handleSave}
        />
      </div>
    );
  }

  if (!selectedCategorySlug) {
    return (
      <div className="mt-[20px]">
        <h2 className="text-xl font-bold mb-4">Выберите категорию:</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className="text-left w-full text-green-700 hover:underline cursor-pointer"
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const selectedCategory = categories.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <div className="mt-[20px]">
      <h2 className="text-xl font-bold mb-4">
        Выберите подкатегорию из {selectedCategory?.name}:
      </h2>
      <ul className="space-y-2">
        {selectedCategory?.subcategories.map((sub) => (
          <li key={sub.slug}>
            <button
              onClick={() => navigate(`/schedule/subcategory/${sub.slug}`)}
              className="text-left w-full text-green-700 hover:underline cursor-pointer"
            >
              {sub.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
