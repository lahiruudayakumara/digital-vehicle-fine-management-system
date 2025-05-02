import {
  Banknote,
  CreditCard,
  SquareCheckBig,
  WalletCards,
} from "lucide-react";
import DateInput from "@/components/input-fields/date-inputs/date-input";
import { FaFileDownload } from "react-icons/fa";
import PaymentTable from "../payment-table";
import SearchField from "@/components/input-fields/search-fields/serch-field";
import SelectDropdown from "@/components/drop-downs/select-drop-downs/select-drop-down";
import SummaryCard from "@/components/cards/summary-Card";
import { paymentData } from "../payment-data";
import saveAs from "file-saver";
import { useEffect, useState } from "react";
import { PaymentEntry } from "@/types/payment";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { fetchAllPayments, fetchPayments } from "@/stores/slices/payment/payment-action";

const filter = [
  { value: "All", name: "All" },
  { value: "Online", name: "Online" },
  { value: "Pending", name: "Pending" },
  { value: "Approved", name: "Approved" },
];

const options = [
  { value: "name", name: "Name" },
  { value: "id", name: "Payment ID" },
];

function AdminPaymentView() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchAttribute, setSearchAttribute] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { payments = [], loading, error } = useSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch, activeTab, filterDate]);
  
  useEffect(() => {
    console.log('Payments:', payments);
  }, [payments]);

  const filteredPayment = (payments || [])
    .filter((fine: { [x: string]: any }) =>
      String(fine[searchAttribute as keyof PaymentEntry])
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .map((payment) => ({
      ...payment,
      method:
        payment.method === "Bank Slip"
          ? "SLIP"
          : payment.method === "Credit Card"
          ? "Credit Card"
          : "Online Payment" as "SLIP" | "Credit Card" | "Online Payment",
    }));

  const clearFilters = () => {
    setActiveTab("All");
    setSearchQuery("");
    setSearchAttribute("name");
    setFilterDate("");
  };

  const exportCSV = () => {
    const csvContent = [
      ["Payment ID", "Name", "Amount", "Date", "Method", "Status"],
      ...filteredPayment.map((payment) => [
        payment.paymentId,
        payment.fineId,
        payment.amount,
        payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "Not Available",
        payment.method,
        payment.status || "Not Set",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    saveAs(
      new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
      "payment_report.csv"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading payments: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      <main className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          <SummaryCard
            icon={<WalletCards size={44} />}
            value={22} // Replace with actual data
            label="Total Payments"
            color="red"
          />
          <SummaryCard
            icon={<CreditCard size={44} />}
            value={22} // Replace with actual data
            label="Online Payments"
            color="red"
          />
          <SummaryCard
            icon={<Banknote size={44} />}
            value={22} // Replace with actual data
            label="Pending Payments"
            color="red"
          />
          <SummaryCard
            icon={<SquareCheckBig size={44} />}
            value={22} // Replace with actual data
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

        <PaymentTable
          paymentList={filteredPayment}
          onApprove={() => {}}
          onDecline={() => {}}
        />
      </main>
    </div>
  );
}

export default AdminPaymentView;
