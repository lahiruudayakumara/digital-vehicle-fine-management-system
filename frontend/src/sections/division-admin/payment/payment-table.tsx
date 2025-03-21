import BankSlipModal from "./bank-slip-modal";
import { PaymentEntry } from "@/types/payment";
import { useState } from "react";

const PaymentTable = ({
  paymentList,
  onApprove,
  onDecline,
}: {
  paymentList: PaymentEntry[];
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}) => {
  const [selectedSlip, setSelectedSlip] = useState<string | null>(null);

  return (
    <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            {["Payment ID", "Name", "Amount", "Date", "Method", "Status"].map(
              (header) => (
                <th key={header} className="p-3">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {paymentList.map((entry) => (
            <tr
              key={entry.id}
              className={`p-3 ${entry.method === "Bank Slip" && entry.status === "Pending" ? "cursor-pointer hover:bg-blue-100" : ""}`}
              onClick={() => entry.method === "Bank Slip" && entry.status === "Pending" && setSelectedSlip(entry.id)}
            >
              <td className="p-3">{entry.id}</td>
              <td className="p-3">{entry.name}</td>
              <td className="p-3">LKR {entry.amount.toFixed(2)}</td>
              <td className="p-3">{entry.date}</td>
              <td>{entry.method}</td>
              <td className={`p-3 text-xs flex`}><span className={`w-20 py-1 rounded-md text-center ${entry.status === "Pending" ? "bg-yellow-200 text-amber-500" : entry.status === "Completed" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}
                `}>{entry.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bank Slip Modal */}
      {selectedSlip && (
        <BankSlipModal
          slipId={selectedSlip}
          onClose={() => setSelectedSlip(null)}
          onApprove={onApprove}
          onDecline={onDecline}
        />
      )}
    </div>
  );
};

export default PaymentTable;
