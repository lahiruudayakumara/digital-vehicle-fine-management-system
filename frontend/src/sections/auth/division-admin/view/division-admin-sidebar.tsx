import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-5 shadow-lg flex flex-col items-center">
      {/* Logo */}
      <div className="mb-8">
        <img src="../src/assets/logo.jpg" alt="FineMate Logo" className="w-42 h-auto" /> {/* Increased logo size */}
      </div>
      
      <nav className="w-full">
        <ul className="space-y-4">
          <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
            <Link to="/officermanage">Motor Traffic Officer Management</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
