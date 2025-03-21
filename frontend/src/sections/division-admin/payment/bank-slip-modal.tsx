import React from "react";

interface BankSlipModalProps {
  slipId: string;
  onClose: () => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}

const BankSlipModal: React.FC<BankSlipModalProps> = ({
  slipId,
  onClose,
  onApprove,
  onDecline,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black  flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Bank Slip Approval</h2>
        <img
          src={`https://makeenbooks.com/public/img/app/scan.png`}
          alt="Bank Slip"
          className="w-[600px] h-auto rounded-lg shadow"
        />
        <div className="flex justify-between mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-green-500 w-full cursor-pointer text-white rounded-md"
            onClick={() => {
              onApprove(slipId);
              onClose();
            }}
          >
            Approve
          </button>
          <button
            className="px-4 py-2 bg-red-500 w-full cursor-pointer text-white rounded-md"
            onClick={() => {
              onDecline(slipId);
              onClose();
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankSlipModal;
