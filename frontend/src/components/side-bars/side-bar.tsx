import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <aside className="w-1/6 h-screen bg-white p-5 shadow-lg flex flex-col items-center">
        <div className="mb-8">
          <img
            src="../src/assets/logo.jpg"
            alt="FineMate Logo"
            className="w-42 h-auto"
          />{" "}
        </div>

        <nav className="w-full">
          <ul className="space-y-4">
            <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
              <Link to="officer-manage">Motor Traffic Officer Management</Link>
            </li>
            <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
                <Link to="add-new-officer">Add New Officer</Link>
            </li>
            <li className="p-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:opacity-80 transition duration-300">
                <Link to="update-officer">Update Officer</Link>
            </li>
          </ul>
        </nav>
      </aside>
    )
}

export default SideBar;