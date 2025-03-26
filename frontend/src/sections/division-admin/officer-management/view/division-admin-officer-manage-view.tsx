import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoliceOfficers, deletePoliceOfficer } from "@/stores/slices/officer/officer-actions";
import { RootState } from "@/stores/store"; 
import { AppDispatch } from "@/stores/store"; // Import the AppDispatch type
import UpdateOfficer from "../../update/view/division-admin-update-officer";
import { PoliceOfficer } from "@/types/officer-types"; 

const OfficerManageView = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch
  const officers = useSelector((state: RootState) => state.officer.officers);
  const loading = useSelector((state: RootState) => state.officer.loading);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteOfficerId, setDeleteOfficerId] = useState<string | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<PoliceOfficer | null>(null);
  const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
  const [locationFilter, setLocationFilter] = useState<string>("");

  // Fetch officers on component mount
  useEffect(() => {
    dispatch(fetchPoliceOfficers());
  }, [dispatch]);

  // Extract unique patrol locations for the dropdown
  const patrolLocations = Array.from(
    new Set(officers.flatMap((officer) => officer.patrolLocations))
  );

  const handleEdit = (officer: PoliceOfficer): void => {
    setSelectedOfficer(officer);
    setIsmodalopen(true);
  };

  const handleDelete = () => {
    if (deleteOfficerId) {
      dispatch(deletePoliceOfficer(deleteOfficerId));
      setDeleteOfficerId(null); // Close modal after deletion
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  // Reset both filters
  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
  };

  const handleReportGeneration = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Officer ID,Officer Name,Mobile Phone,Address,Patrol Location",
        ...officers.map(
          (o) =>
            `${o.badgeID},${o.fullName},${o.telephone},${o.address},${o.patrolLocations.join(",")}`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "officers_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter officers based on both search term and location filter
  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch =
      officer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.badgeID.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" || officer.patrolLocations.includes(locationFilter);

    return matchesSearch && matchesLocation;
  });

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

        {/* Table of Officers */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Officer ID</th>
                <th className="p-3">Officer Name</th>
                <th className="p-3">Mobile Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Patrol Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-3 text-center text-gray-500">
                    Loading officers...
                  </td>
                </tr>
              ) : filteredOfficers.length > 0 ? (
                filteredOfficers.map((officer) => (
                  <tr
                    key={officer.badgeID}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3">{officer.badgeID}</td>
                    <td className="p-3">{officer.fullName}</td>
                    <td className="p-3">{officer.telephone}</td>
                    <td className="p-3">{officer.address}</td>
                    <td className="p-3">{officer.patrolLocations.join(", ")}</td>
                    <td className="p-3 flex space-x-4 justify-center">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(officer)}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setDeleteOfficerId(officer.badgeID)}
                      >
                        <FaTrash />
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
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <UpdateOfficer
        isOpen={ismodalopen}
        onClose={() => setIsmodalopen(false)}
        officer={selectedOfficer} // Pass selectedOfficer to UpdateOfficer
        onSubmit={() => {}}
      />
    </div>
  );
};

export default OfficerManageView;
