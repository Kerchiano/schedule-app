import { useNavigate, useParams } from "react-router-dom";
import data from "data.json";
import ScheduleForm from "@/pages/schedule/forms/ScheduleForm";
import { useScheduleSettings } from "@/pages/schedule/hooks/useScheduleSettings";

const Category = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const categories = data.categories;

  const {
    selectedDays,
    selectedMarketplaces,
    toggleDay,
    toggleMarketplace,
    handleSave,
  } = useScheduleSettings("categories", slug);

  if (slug) {
    const selected = categories.find((cat) => cat.slug === slug);
    if (!selected) return <p>Категория не найдена</p>;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{selected.name}</h2>
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

  return (
    <div className="space-y-4 mt-[20px]">
      <h2 className="text-xl font-bold">Выберите категорию:</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={() => navigate(`/schedule/category/${cat.slug}`)}
              className="text-left w-full text-green-700 hover:underline cursor-pointer"
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
