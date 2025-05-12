import { useNavigate, useParams } from "react-router-dom";
import data from "data.json";
import { useState } from "react";
import ScheduleForm from "@/pages/schedule/forms/ScheduleForm";
import { useScheduleSettings } from "@/pages/schedule/hooks/useScheduleSettings";

export default function Product() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [query, setQuery] = useState("");

  const {
    selectedDays,
    selectedMarketplaces,
    toggleDay,
    toggleMarketplace,
    handleSave,
  } = useScheduleSettings("products", slug);

  const allProducts = data.categories.flatMap((cat) =>
    cat.subcategories.flatMap((sub) =>
      sub.products.map((prod) => ({
        ...prod,
        subcategory: sub.name,
        category: cat.name,
      }))
    )
  );

  if (slug) {
    const product = allProducts.find((prod) => prod.slug === slug);
    if (!product) return <p>Продукт не найден</p>;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">
          Вы выбрали продукт: {product.name}
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

  const handleSearch = () => {
    const found = allProducts.find((prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) navigate(`/schedule/product/${found.slug}`);
    else alert("Продукт не найден");
  };

  return (
    <div>
      <label className="block mb-2 font-semibold">Поиск продукта:</label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full outline-none"
          placeholder="Введите название продукта"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700 cursor-pointer"
        >
          Найти
        </button>
      </div>
    </div>
  );
}
