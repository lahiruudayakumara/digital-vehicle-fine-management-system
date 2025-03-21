import { TriangleAlert } from "lucide-react";

interface RemoveBlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  license_no: string;
  onSubmit: () => void;
}

const RemoveBlacklistModal = ({
  isOpen,
  onClose,
  onSubmit,
  license_no,
}: RemoveBlacklistModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black  flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          Remove from Blacklist?
        </h2>
        <div className="flex justify-center items-center text-red-600 mb-4">
          <div className="bg-red-200 p-4 rounded-lg">
            <TriangleAlert size={64} />
          </div>
        </div>
        <p className="text-center mb-4">Remove {license_no} from Blacklist?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer w-full bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 cursor-pointer w-full bg-red-600 text-white rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBlacklistModal;
