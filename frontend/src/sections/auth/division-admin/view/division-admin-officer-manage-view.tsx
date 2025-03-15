import { FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./division-admin-sidebar";

// Define Officer type
interface Officer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

const officersData: Officer[] = [
    { id: "ABX-2938-PLQ", name: "Abram Vaccaro", phone: "0771234567", email: "abram@example.com", address: "No. 10, Colombo" },
    { id: "ZKY-7451-WNM", name: "Skylar Bator", phone: "0789876543", email: "skylar@example.com", address: "No. 20, Kandy" },
];

const OfficerManageView = () => {
    const [officers, setOfficers] = useState<Officer[]>(officersData);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [officerToDelete, setOfficerToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    // Explicitly define officer type
    const handleEdit = (officer: Officer): void => {
        navigate("/addnewofficer", { state: { officer } });
    };

    // Explicitly define id type
    const handleDelete = (id: string): void => {
        setOfficerToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = (): void => {
        if (officerToDelete) {
            setOfficers(officers.filter((officer) => officer.id !== officerToDelete));
            setShowDeleteModal(false);
            setOfficerToDelete(null);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="p-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Motor Traffic Officer Management</h1>
                    <Link to="/addnewofficer">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Add New Officer
                        </button>
                    </Link>
                </header>

                <div className="mt-5 overflow-x-auto">
                    <table className="w-full border-collapse shadow-md">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-3">Officer ID</th>
                                <th className="p-3">Officer Name</th>
                                <th className="p-3">Mobile Phone</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {officers.map((officer) => (
                                <tr key={officer.id} className="border-b text-center">
                                    <td className="p-3">{officer.id}</td>
                                    <td className="p-3">{officer.name}</td>
                                    <td className="p-3">{officer.phone}</td>
                                    <td className="p-3">{officer.email}</td>
                                    <td className="p-3">{officer.address}</td>
                                    <td className="p-3 flex justify-center space-x-3">
                                        <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(officer)}>
                                            <FaPen />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(officer.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-5 rounded shadow-lg">
                            <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
                            <p>Are you sure you want to delete this officer?</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={confirmDelete}>
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
