import React from "react";

interface ScheduleFormProps {
  selectedDays: string[];
  selectedMarketplaces: string[];
  toggleDay: (day: string) => void;
  toggleMarketplace: (mp: string) => void;
  onSave: (e: React.FormEvent) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  selectedDays,
  selectedMarketplaces,
  toggleDay,
  toggleMarketplace,
  onSave,
}) => {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const marketplaces = ["Varus", "Сільпо", "АТБ"];

  return (
    <form onSubmit={onSave} className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">Дни:</label>
        <div className="flex gap-4 flex-wrap">
          {days.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-green-600"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2">Маркетплейсы:</label>
        <div className="space-y-2">
          {marketplaces.map((mp) => (
            <label key={mp} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-green-600"
                checked={selectedMarketplaces.includes(mp)}
                onChange={() => toggleMarketplace(mp)}
              />
              <span>{mp}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 cursor-pointer"
      >
        Сохранить
      </button>
    </form>
  );
};

export default ScheduleForm;
