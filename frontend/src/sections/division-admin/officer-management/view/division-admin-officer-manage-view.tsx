import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

// Define Officer type
interface Officer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    patrolLocation: string;
}

// Dummy officer data (10 records)
const officersData: Officer[] = [
    { id: "ABX-2938-PLQ", name: "Abram Vaccaro", phone: "0771234567", email: "abram@example.com", address: "No. 10, Colombo", patrolLocation: "Colombo" },
    { id: "ZKY-7451-WNM", name: "Skylar Bator", phone: "0789876543", email: "skylar@example.com", address: "No. 20, Kandy", patrolLocation: "Kandy" },
    { id: "LMN-3456-QWE", name: "Olivia Carter", phone: "0764567890", email: "olivia@example.com", address: "No. 5, Galle", patrolLocation: "Galle" },
    { id: "PKL-7894-RTY", name: "Mason Lee", phone: "0745678901", email: "mason@example.com", address: "No. 15, Jaffna", patrolLocation: "Jaffna" },
    { id: "QWE-5678-XYZ", name: "Sophia Martinez", phone: "0756789012", email: "sophia@example.com", address: "No. 8, Negombo", patrolLocation: "Negombo" },
    { id: "XYZ-1234-ABC", name: "Ethan Thompson", phone: "0712345678", email: "ethan@example.com", address: "No. 22, Kurunegala", patrolLocation: "Kurunegala" },
    { id: "JKL-9876-MNO", name: "Ava Johnson", phone: "0782345678", email: "ava@example.com", address: "No. 30, Matara", patrolLocation: "Matara" },
    { id: "DEF-6543-GHI", name: "James Wilson", phone: "0773456789", email: "james@example.com", address: "No. 12, Anuradhapura", patrolLocation: "Anuradhapura" },
    { id: "VBN-4321-POI", name: "Isabella Harris", phone: "0798765432", email: "isabella@example.com", address: "No. 18, Badulla", patrolLocation: "Badulla" },
    { id: "MNB-8765-QAZ", name: "Alexander White", phone: "0765432109", email: "alexander@example.com", address: "No. 25, Ratnapura", patrolLocation: "Ratnapura" },
];

const OfficerManageView = () => {
    const [officers, setOfficers] = useState<Officer[]>(officersData);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteOfficerId, setDeleteOfficerId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleEdit = (officer: Officer): void => {
        navigate("/dashboard/update-officer", { state: { officer } });
    };

    const handleDelete = (id: string) => {
        setOfficers((prevOfficers) => prevOfficers.filter(officer => officer.id !== id));
        setDeleteOfficerId(null); // Close modal after deletion
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleReportGeneration = () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            ["Officer ID,Officer Name,Mobile Phone,Email,Address,Patrol Location", 
            ...officers.map(o => `${o.id},${o.name},${o.phone},${o.email},${o.address},${o.patrolLocation}`)].join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "officers_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredOfficers = officers.filter(
        (officer) =>
            officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            officer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-8 bg-gray-50">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Motor Traffic Officer Management</h1>
                    <div className="flex space-x-4">
                        
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                            onClick={handleReportGeneration}
                        >
                            Generate Report
                        </button>
                    </div>
                </header>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Name or ID"
                        className="px-4 py-2 w-full max-w-md bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3">Officer ID</th>
                                <th className="p-3">Officer Name</th>
                                <th className="p-3">Mobile Phone</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Patrol Location</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOfficers.length > 0 ? (
                                filteredOfficers.map((officer) => (
                                    <tr key={officer.id} className="border-t hover:bg-gray-100">
                                        <td className="p-3">{officer.id}</td>
                                        <td className="p-3">{officer.name}</td>
                                        <td className="p-3">{officer.phone}</td>
                                        <td className="p-3">{officer.email}</td>
                                        <td className="p-3">{officer.address}</td>
                                        <td className="p-3">{officer.patrolLocation}</td>
                                        <td className="p-3 flex space-x-4 justify-center">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEdit(officer)}
                                            >
                                                <FaPen />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => setDeleteOfficerId(officer.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-3 text-center text-gray-500">No officers found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

{/* Delete Confirmation Modal */}
{deleteOfficerId && (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-gray-200/30">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this officer?</p>
            <div className="mt-4 flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    onClick={() => setDeleteOfficerId(null)}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(deleteOfficerId)}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)}



            </div>
        </div>
    );
};

export default OfficerManageView;
