import { Link, Outlet } from "react-router-dom";

function SchedulePage() {
  return (
    <div className="flex min-h-screen p-4 max-md:px-2">
      <aside className="w-full max-md:w-2/5 md:w-1/4 bg-green-100 p-8 max-[479px]:px-2 space-y-4 text-lg font-medium rounded-[8px]">
        <ul className="space-y-2">
          <li>
            <Link to="category">Категория</Link>
          </li>
          <li>
            <Link to="subcategory">Подкатегория</Link>
          </li>
          <li>
            <Link to="product">Продукт</Link>
          </li>
        </ul>
      </aside>
      <main className="w-full max-md:w-3/5 md:w-3/4 p-6 max-[600px]:pr-0 pt-4 pl-8">
        <h1 className="text-2xl font-semibold mb-4">Настройка расписания</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default SchedulePage;
