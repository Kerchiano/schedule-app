import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Продуктовый Учёт</h1>
        <div className="space-x-4">
          <Link to="/products" className="hover:underline outline-none focus:outline-none">
            Продукты
          </Link>
          <Link to="/schedule" className="hover:underline outline-none focus:outline-none">
            Расписание
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
