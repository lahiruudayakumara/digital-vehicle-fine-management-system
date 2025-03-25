import { FaPen, FaTrash, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import UpdateOfficer from "../../update/view/division-admin-update-officer";
import API from "@/api/api-instance";
import { Officer } from "@/types/officer-types";

const OfficerManageView = () => {
    const [officers, setOfficers] = useState<Officer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deleteOfficerId, setDeleteOfficerId] = useState<string | null>(null);
    const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
    const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
    const [ismodalStatusOpen, setIsmodalStatusOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<"active" | "onLeave">("active");
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch officers from backend
    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
    
                if (!token) {
                    console.error("No authentication token found. Redirecting to login...");
                    setError("Authentication required. Please log in.");
                    return; // Stop execution if token is missing
                }
    
                const response = await API.get<Officer[]>('/police-officers', {
                    headers: { 
                        Authorization: `Bearer ${token.trim()}` // Ensure no extra spaces
                    },
                });
    
                setOfficers(response.data);
            } catch (err: any) {
                console.error('Error fetching officers:', err);
    
                if (err.response?.status === 401) {
                    setError("Unauthorized. Please log in again.");
                    // Optional: Redirect user to login page
                    // window.location.href = "/login";
                } else {
                    setError("Failed to fetch officers. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchOfficers();
    }, []);
    

    // Extract unique patrol locations for the dropdown
    const patrolLocations = Array.from(new Set(officers.map(officer => officer.patrolLocation)));

    const handleEdit = (officer: Officer): void => {
        setSelectedOfficer(officer);
        setIsmodalopen(true);
    };

    const handleStatusChange = (officer: Officer): void => {
        setSelectedOfficer(officer);
        setStatus(officer.status || "active");
        setIsmodalStatusOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await API.delete(`/police-officers/${id}`);
            setOfficers((prevOfficers) => prevOfficers.filter(officer => officer.id !== id));
            setDeleteOfficerId(null);
        } catch (err) {
            console.error('Error deleting officer:', err);
            alert('Failed to delete officer');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocationFilter(e.target.value);
    };

    const handleStatusUpdate = async (id: string, newStatus: "active" | "onLeave") => {
        try {
            await API.patch(`/police-officers/${id}`, { status: newStatus });
            
            setOfficers((prevOfficers) =>
                prevOfficers.map((officer) =>
                    officer.id === id ? { ...officer, status: newStatus } : officer
                )
            );
            setIsmodalStatusOpen(false);
        } catch (err) {
            console.error('Error updating officer status:', err);
            alert('Failed to update officer status');
        }
    };

    // Reset both filters
    const resetFilters = () => {
        setSearchTerm('');
        setLocationFilter('');
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

    // Filter officers based on both search term and location filter
    const filteredOfficers = officers.filter(
        (officer) => {
            const matchesSearch = 
                officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                officer.id.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesLocation = 
                locationFilter === '' || 
                officer.patrolLocation === locationFilter;
            
            return matchesSearch && matchesLocation;
        }
    );

    // Get background color based on officer status
    const getRowBackgroundColor = (status?: string) => {
        if (status === "active") return "bg-blue-50";
        if (status === "onLeave") return "bg-gray-50";
        return "";
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-8 bg-gray-50">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Motor Traffic Officer Management</h1>
                    <div className="flex space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                            onClick={handleReportGeneration}
                        >
                            Generate Report
                        </button>
                    </div>
                </header>

                <div className="mb-4 flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by Name or ID"
                            className="px-4 py-2 w-full bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patrol Location</label>
                        <select
                            className="px-4 py-2 w-full bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={locationFilter}
                            onChange={handleLocationFilterChange}
                        >
                            <option value="">All Patrol Locations</option>
                            {patrolLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 h-10"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
                    <div className="mb-2 p-3 flex items-center space-x-4">
                        <div className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-blue-50 border border-green-200 rounded-sm mr-2"></span>
                            <span className="text-sm text-gray-600">Active</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-gray-50 border border-gray-200 rounded-sm mr-2"></span>
                            <span className="text-sm text-gray-600">On Leave</span>
                        </div>
                    </div>
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
                                    <tr
                                        key={officer.id}
                                        className={`hover:bg-gray-100 ${getRowBackgroundColor(officer.status)}`}
                                    >
                                        <td className="p-3">{officer.id}</td>
                                        <td className="p-3">{officer.name}</td>
                                        <td className="p-3">{officer.phone}</td>
                                        <td className="p-3">{officer.email}</td>
                                        <td className="p-3">{officer.address}</td>
                                        <td className="p-3">{officer.patrolLocation}</td>
                                        <td className="p-3 flex space-x-4">
                                            <button
                                                className="text-blue-500 hover:text-blue-600"
                                                onClick={() => handleEdit(officer)}
                                            >
                                                <FaPen />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => setDeleteOfficerId(officer.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                className="text-yellow-500 hover:text-yellow-600"
                                                onClick={() => handleStatusChange(officer)}
                                            >
                                                {officer.status === "active" ? (
                                                    <FaUserTimes />
                                                ) : (
                                                    <FaUserCheck />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-3 text-center text-gray-500">
                                        No officers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* {ismodalopen && selectedOfficer && (
                <UpdateOfficer officer={selectedOfficer} isOpen={ismodalopen} setIsOpen={setIsmodalopen} />
            )}
            {ismodalStatusOpen && selectedOfficer && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Officer Status</h3>
                        <p>Change the status for officer {selectedOfficer.name}</p>
                        <button
                            onClick={() => handleStatusUpdate(selectedOfficer.id, "active")}
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Set Active
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(selectedOfficer.id, "onLeave")}
                            className="bg-yellow-500 text-white px-4 py-2"
                        >
                            Set On Leave
                        </button>
                        <button onClick={() => setIsmodalStatusOpen(false)} className="bg-gray-500 text-white px-4 py-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )} */}

            {deleteOfficerId && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this officer?</h3>
                        <button
                            onClick={() => handleDelete(deleteOfficerId)}
                            className="bg-red-500 text-white px-4 py-2"
                        >
                            Confirm Delete
                        </button>
                        <button
                            onClick={() => setDeleteOfficerId(null)}
                            className="bg-gray-500 text-white px-4 py-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfficerManageView;
