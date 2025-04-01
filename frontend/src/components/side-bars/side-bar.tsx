import { CreditCard, Home, PlusCircle, TrafficCone, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={24} /> },
  { path: "officer-manage", label: "M/T Officer Management", icon: <User size={24} /> },
  { path: "add-new-officer", label: "Add New Officer", icon: <PlusCircle size={24} /> },
  { path: "black-list", label: "Black List", icon: <TrafficCone size={24} /> },
  { path: "payment", label: "Payment", icon: <CreditCard size={24} /> },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="md:w-[350px] h-screen bg-white p-5 shadow-lg flex flex-col items-center">
      <div className="mb-8">
        <img
          src="../src/assets/logo.jpg"
          alt="FineMate Logo"
          className="w-42 h-auto"
        />
      </div>
      <nav className="w-full">
        <ul className="space-y-4">
          {menuItems.map(({ path, label, icon }) => {
            return (
              <li key={path} className={`rounded-lg transition font-medium text-blue-600 duration-300 hover:bg-blue-600 hover:text-white ${location.pathname === path ? "bg-blue-600 text-white" : path !== "/dashboard" ? location.pathname.includes(path)  ? "bg-blue-600 text-white" : "" : "text-black"}`}>
                <Link
                  to={path}
                  className="p-3 flex items-center md:space-x-4 hover:opacity-80 w-full rounded-lg"
                >
                  {icon}
                  <span className="hidden md:block">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
