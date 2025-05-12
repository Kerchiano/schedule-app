import DayCheckbox from "@/pages/products/DayCheckBox";

const DaysList = () => {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <ul className="pl-1 mt-2">
      <h3 className="text-md font-semibold text-gray-800 mb-2">Дни недели</h3>
      {days.map((day, index) => (
        <DayCheckbox key={index} day={day} />
      ))}
    </ul>
  );
};

export default DaysList;
