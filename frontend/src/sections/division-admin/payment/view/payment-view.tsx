import {
  Banknote,
  CreditCard,
  SquareCheckBig,
  WalletCards,
} from "lucide-react";

import DateInput from "@/components/input-fields/date-inputs/date-input";
import { FaFileDownload } from "react-icons/fa";
import PaymentTable from "../payment-table";
import SelectDropdown from "@/components/drop-downs/select-drop-downs/select-drop-down";
import SummaryCard from "@/components/cards/summary-Card";
import { paymentData } from "../payment-data";
import saveAs from "file-saver";
import { useState } from "react";

const filter = [
  { value: "All", name: "All" },
  { value: "Online", name: "Online" },
  { value: "Pending", name: "Pending" },
  { value: "Approved", name: "Approved" },
];

function AdminPaymentView() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchAttribute, setSearchAttribute] =
    useState<keyof (typeof paymentData)[0]>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [selectedSlip, setSelectedSlip] = useState<string | null>(null);

  const filteredPayment = paymentData.filter(
    (fine) =>
      (activeTab === "All" || fine.status === activeTab) &&
      String(fine[searchAttribute])
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (filterDate ? new Date(fine.date) >= new Date(filterDate) : true)
  );

  const clearFilters = () => {
    setActiveTab("All");
    setSearchQuery("");
    setSearchAttribute("name");
    setFilterDate("");
  }

    const exportCSV = () => {
      const csvContent = [
        ["Payment ID", "Name", "Amount", "Date", "Method", "Status"],
        ...filteredPayment.map((payment) => Object.values(payment)),
      ]
        .map((row) => row.join(","))
        .join("\n");
      saveAs(
        new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
        "payment_report.csv"
      );
    };

    return (
      <div className="flex h-screen bg-gray-100 p-6">
        <main className="flex-1">
          <div className="grid grid-cols-4 gap-4">
            <SummaryCard
              icon={<WalletCards color="blue" size={44} />}
              value={22}
              label="Total Payments"
              color="red"
            />
            <SummaryCard
              icon={<CreditCard color="blue" size={44} />}
              value={22}
              label="Online Payments"
              color="red"
            />
            <SummaryCard
              icon={<Banknote size={44} />}
              value={22}
              label="Pending Payments"
              color="red"
            />
            <SummaryCard
              icon={<SquareCheckBig size={44} />}
              value={22}
              label="Approved Payments"
              color="red"
            />
          </div>

          <div className="mt-6 flex space-x-4 items-center justify-between">
            <div className="flex space-x-4 items-center">
              <SelectDropdown
                id="filter"
                value={activeTab}
                onChange={setActiveTab}
                options={filter}
                className="w-48"
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

          <PaymentTable
            paymentList={filteredPayment}
            onApprove={() => {}}
            onDecline={() => {}}
          />
        </main>
      </div>
    );
  };

export default AdminPaymentView;
