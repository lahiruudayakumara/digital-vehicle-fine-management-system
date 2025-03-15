import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-5 shadow-lg">
      <h2 className="text-xl font-bold text-blue-600">FINEMATE</h2>
      <nav className="mt-6">
        <ul>
          <li className="p-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-2 mt-3 text-gray-700 hover:bg-gray-200 rounded-lg">
            <Link to="/officermanage">Motor Traffic Officer Management</Link>
          </li>
        
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
