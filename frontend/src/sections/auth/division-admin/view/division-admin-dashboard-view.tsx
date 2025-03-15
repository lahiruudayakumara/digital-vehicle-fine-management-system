import {  FaUsers, FaClipboardList, FaFileAlt } from 'react-icons/fa';
import Sidebar from './division-admin-sidebar'

const finesData = [
  { id: 1, officer: 'Abram Vaccaro', officerId: 'ABX-2938-PLQ', license: 'ABX-2938-PLQ', vehicle: 'CAB-1234', date: '2025/02/28', reason: 'A2597', status: 'Pending' },
  { id: 2, officer: 'Skylar Bator', officerId: 'ZKY-7451-WNM', license: 'ZKY-7451-WNM', vehicle: 'WP-ABC-5678', date: '2025/02/20', reason: 'B7463', status: 'Pending' },
  { id: 3, officer: 'Gustavo Curtis', officerId: 'QRT-1123-VBX', license: 'QRT-1123-VBX', vehicle: 'KL-09-XY-4321', date: '2025/02/15', reason: 'C9812', status: 'Pending' },
  { id: 4, officer: 'Abram Vaccaro', officerId: 'LMN-9082-CKR', license: 'LMN-9082-CKR', vehicle: 'GH-7654', date: '2025/02/10', reason: 'D3578', status: 'Completed' },
  { id: 5, officer: 'Jakob Dokidis', officerId: 'XOP-5674-YTZ', license: 'XOP-5674-YTZ', vehicle: 'ABC-9087', date: '2025/02/05', reason: 'E6241', status: 'Completed' },
];


function AdminDashboardView() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">MALABE POLICE DIVISION</h1>
          <span className="font-semibold">Welcome <span className="text-blue-500">Admin_Officer</span></span>
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
              {finesData.map((fine) => (
                <tr key={fine.id} className="border-t">
                  <td className="p-3">{fine.officer}</td>
                  <td className="p-3">{fine.officerId}</td>
                  <td className="p-3">{fine.license}</td>
                  <td className="p-3">{fine.vehicle}</td>
                  <td className="p-3">{fine.date}</td>
                  <td className="p-3">{fine.reason}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-sm rounded-lg ${fine.status === 'Pending' ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                      {fine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Generate Report Button */}
        <div className="mt-5 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate a Report</button>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardView;
