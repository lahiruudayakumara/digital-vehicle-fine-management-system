import { FaUsers, FaClipboardList, FaFileAlt, FaSignOutAlt, FaChevronDown, FaFileDownload } from 'react-icons/fa';
import Sidebar from './division-admin-sidebar';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom'; // Import Link

const finesData = [
  { id: 1, officer: 'Abram Vaccaro', officerId: 'ABX-2938-PLQ', license: 'ABX-2938-PLQ', vehicle: 'CAB-1234', date: '2025-02-28', reason: 'A2597', status: 'Pending' },
  { id: 2, officer: 'Skylar Bator', officerId: 'ZKY-7451-WNM', license: 'ZKY-7451-WNM', vehicle: 'WP-ABC-5678', date: '2025-02-20', reason: 'B7463', status: 'Pending' },
  { id: 3, officer: 'Gustavo Curtis', officerId: 'QRT-1123-VBX', license: 'QRT-1123-VBX', vehicle: 'KL-09-XY-4321', date: '2025-02-15', reason: 'C9812', status: 'Pending' },
  { id: 4, officer: 'Abram Vaccaro', officerId: 'LMN-9082-CKR', license: 'LMN-9082-CKR', vehicle: 'GH-7654', date: '2025-02-10', reason: 'D3578', status: 'Completed' },
  { id: 5, officer: 'Jakob Dokidis', officerId: 'XOP-5674-YTZ', license: 'XOP-5674-YTZ', vehicle: 'ABC-9087', date: '2025-02-05', reason: 'E6241', status: 'Completed' },
];

function AdminDashboardView() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('officerId');
  const [filterDate, setFilterDate] = useState('');

  const filteredFines = finesData.filter(fine =>
    (activeTab === 'All' || fine.status === activeTab) &&
    (searchAttribute !== 'date' ? String(fine[searchAttribute as keyof typeof fine]).toLowerCase().includes(searchQuery.toLowerCase()) : fine.date.includes(filterDate))
  );

  const exportCSV = () => {
    const csvContent = [
      ['Fine ID', 'Officer ID', 'License Number', 'Vehicle Number', 'Date', 'Reason', 'Status'],
      ...filteredFines.map(fine => [fine.id, fine.officerId, fine.license, fine.vehicle, fine.date, fine.reason, fine.status])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'fines_report.csv');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center relative">
          <h1 className="text-xl font-semibold">MALABE POLICE DIVISION</h1>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="font-semibold flex items-center">
              Welcome <span className="text-blue-500 ml-1">Admin_Officer</span> <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40">
                <p className="px-4 py-2 text-gray-700">Admin Division</p>
                <Link to="/">
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
            <FaClipboardList className="text-blue-500 text-3xl" />
            <p className="text-lg font-bold">100</p>
            <span className="text-gray-500">Total Fines Issued</span>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
            <FaFileAlt className="text-green-500 text-3xl" />
            <p className="text-lg font-bold">98</p>
            <span className="text-gray-500">Total Fines Cleared</span>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
            <FaUsers className="text-purple-500 text-3xl" />
            <p className="text-lg font-bold">10</p>
            <span className="text-gray-500">Active Officers</span>
          </div>
        </div>

        {/* Tabs, Search & Date Filter */}
        <div className="mt-6 flex space-x-4 items-center">
          {['All', 'Pending', 'Completed'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} Fines
            </button>
          ))}
          <select className="px-2 py-2 border rounded-lg" value={searchAttribute} onChange={(e) => setSearchAttribute(e.target.value)}>
            <option value="officerId">Officer ID</option>
            <option value="license">License No</option>
            <option value="date">Date</option>
          </select>
          {searchAttribute !== 'date' && (
            <input
              type="text"
              placeholder="Search fines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {searchAttribute === 'date' && (
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-2 py-2 border rounded-lg"
            />
          )}
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
          >
            <FaFileDownload className="mr-2" /> Generate Report
          </button>
        </div>

       {/* Fines Table */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Fine ID</th>
                <th className="p-3">Officer ID</th>
                <th className="p-3">License Number</th>
                <th className="p-3">Vehicle Number</th>
                <th className="p-3">Date</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="border-t">
                  <td className="p-3">{fine.id}</td>
                  <td className="p-3">{fine.officerId}</td>
                  <td className="p-3">{fine.license}</td>
                  <td className="p-3">{fine.vehicle}</td>
                  <td className="p-3">{fine.date}</td>
                  <td className="p-3">{fine.reason}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-sm font-semibold rounded-lg ${fine.status === 'Pending' ? 'bg-red-200 text-red-800' : fine.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                      {fine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardView;
