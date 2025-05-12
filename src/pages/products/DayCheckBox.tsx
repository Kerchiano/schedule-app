import { useFilters } from "@/contexts/FiltersContext";

const DayCheckbox = ({ day }: { day: string }) => {
  const { selectedDay, toggleDay } = useFilters();

  return (
    <li className="mb-1 cursor-pointer z-50">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          onChange={() => toggleDay(day)} // При изменении вызываем toggleDay
          checked={selectedDay === day} // Если выбран этот день, ставим чек
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={selectedDay !== "" && selectedDay !== day} // Блокируем другие чекбоксы, если уже выбран день
        />
        {day}
      </label>
    </li>
  );
};

export default DayCheckbox;
