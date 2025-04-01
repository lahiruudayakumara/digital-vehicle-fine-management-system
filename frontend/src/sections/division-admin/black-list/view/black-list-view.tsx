import { FaBan, FaFileDownload } from "react-icons/fa";

import AddBlacklistModal from "../add-blacklist-modal";
import BlackListTable from "../black-list-table";
import { BlacklistEntry } from "@/types/blacklist";
import DateInput from "@/components/input-fields/date-inputs/date-input";
import RemoveBlacklistModal from "../remove-blacklist-modal";
import SearchField from "@/components/input-fields/search-fields/serch-field";
import SelectDropdown from "@/components/drop-downs/select-drop-downs/select-drop-down";
import SummaryCard from "@/components/cards/summary-Card";
import { blacklistData } from "../blacklistData";
import { saveAs } from "file-saver";
import { useState } from "react";

const options = [
  { value: "name", name: "Name" },
  { value: "license", name: "License No" },
];

const filter = [
  { value: "All", name: "All" },
  { value: "Blacklisted (Immediate)", name: "Blacklisted (Immediate)" },
  { value: "Blacklisted (Permanent)", name: "Blacklisted (Permanent)" },
  { value: "Blacklisted (Temporary)", name: "Blacklisted (Temporary)" },
];

const AdminBlackListView = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("name");
  const [filterDate, setFilterDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blacklist, setBlacklist] = useState<BlacklistEntry[]>(blacklistData);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [licenseNo, setLicenseNo] = useState("");

  const filteredFines = blacklist.filter(
    (fine) =>
      (activeTab === "All" || fine.status === activeTab) &&
      String(fine[searchAttribute as keyof BlacklistEntry])
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (filterDate ? new Date(fine.date) >= new Date(filterDate) : true)
  );

  const exportCSV = () => {
    const csvContent = [
      ["Fine ID", "Name", "License No", "Date", "Reason", "Points", "Status"],
      ...filteredFines.map((fine) => Object.values(fine)),
    ]
      .map((row) => row.join(","))
      .join("\n");
    saveAs(
      new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
      "fines_report.csv"
    );
  };

  const clearFilters = () => {
    setActiveTab("All");
    setSearchQuery("");
    setSearchAttribute("officerId");
    setFilterDate("");
  };

  const handleAddBlacklist = (entry: BlacklistEntry) => {
    setBlacklist((prevBlacklist) => [...prevBlacklist, entry]); // Ensure that the new entry is added correctly
  };

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      <main className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          <SummaryCard
            icon={FaBan}
            value={22}
            label="Total Blacklisted"
            color="red"
          />
          <SummaryCard
            icon={FaBan}
            value={121}
            label="Temporary Blacklisted"
            color="orange"
          />
          <SummaryCard
            icon={FaBan}
            value={45}
            label="Permanent Blacklisted"
            color="darkred"
          />
          <SummaryCard
            icon={FaBan}
            value={54}
            label="Immediate Blacklisted"
            color="darkviolet"
          />
        </div>

        <div className="mt-6 flex space-x-4 items-center justify-between">
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded"
            >
              Add to Blacklist
            </button>
            <SelectDropdown
              id="filter"
              value={activeTab}
              onChange={setActiveTab}
              options={filter}
              className="w-48"
            />
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              className="w-64"
            />
            <SelectDropdown
              id="searchAttribute"
              value={searchAttribute}
              onChange={setSearchAttribute}
              options={options}
              className="w-36"
            />
            <DateInput
              value={filterDate}
              onChange={setFilterDate}
              placeholder="Select date"
              className="w-48"
              title="Filter by date"
            />
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={clearFilters}
              className="px-4 py-2 cursor-pointer bg-gray-400 text-white rounded-lg"
            >
              Clear All Filters
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg flex items-center"
            >
              <FaFileDownload className="mr-2" /> Generate Report
            </button>
          </div>
        </div>
        <AddBlacklistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBlacklist}
        />
        <BlackListTable onClick={
          (id: string) => {
            setIsRemoveModalOpen(true);
            setLicenseNo(id);
          }
        } blackList={filteredFines} />
        <RemoveBlacklistModal
          isOpen={isRemoveModalOpen}
          onClose={() => {
            setIsRemoveModalOpen(false);
            setLicenseNo("");
          }}
          onSubmit={() => {
            setIsRemoveModalOpen(false);
            setBlacklist((prevBlacklist) =>
              prevBlacklist.filter((fine) => fine.license !== licenseNo)
            );
            setLicenseNo("");
          }}
          license_no={licenseNo}
        />
      </main>
    </div>
  );
};

export default AdminBlackListView;
