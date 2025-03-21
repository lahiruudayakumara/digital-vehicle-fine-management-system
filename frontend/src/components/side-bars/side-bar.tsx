import { CreditCard, Home, PlusCircle, TrafficCone, User } from "lucide-react"; // Import relevant icons

import { Link } from "react-router-dom";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={24} /> },
  { path: "officer-manage", label: "M/T Officer Management", icon: <User size={24} /> },
  { path: "add-new-officer", label: "Add New Officer", icon: <PlusCircle size={24} /> },
  { path: "black-list", label: "Black List", icon: <TrafficCone size={24} /> },
  { path: "payment", label: "Payment", icon: <CreditCard size={24} /> },
];

const SideBar = () => {
  const menuItemStyles =
    "p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300 block text-center";

  return (
    <aside className="w-1/6 h-screen bg-white p-5 shadow-lg flex flex-col items-center">
      <div className="mb-8">
        <img
          src="../src/assets/logo.jpg"
          alt="FineMate Logo"
          className="w-42 h-auto"
        />
      </div>
      <nav className="w-full">
        <ul className="space-y-4">
          {menuItems.map(({ path, label, icon }) => (
            <Link key={path} to={path} className={menuItemStyles}>
              <li className="flex items-center space-x-4">
                {icon}
                <span>{label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
