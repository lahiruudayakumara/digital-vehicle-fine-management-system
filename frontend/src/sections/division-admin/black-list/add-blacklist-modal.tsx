import { BlacklistEntry } from "@/types/blacklist";
import SelectDropdown from "@/components/drop-downs/select-drop-downs/select-drop-down";
import TextAreaField from "@/components/input-fields/text-inputs/text-area-field";
import TextField from "@/components/input-fields/text-inputs/text-input";
import { useState } from "react";

interface ManualBlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: BlacklistEntry) => void;
}

const options = [
  { name: "Blacklisted (Immediate)", value: "Blacklisted (Immediate)" },
  { name: "Blacklisted (Permanent)", value: "Blacklisted (Permanent)" },
  { name: "Blacklisted (Temporary)", value: "Blacklisted (Temporary)" },
];

const AddBlacklistModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ManualBlacklistModalProps) => {
  const [formData, setFormData] = useState<BlacklistEntry>({
    id: "",
    name: "",
    license: "",
    date: "",
    reason: "",
    points: 0,
    status: "Blacklisted",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const licensePattern = /^[A-Za-z0-9]+$/;
    const reasonPattern = /^[A-Za-z0-9\s.,!?]+$/;

    if (!formData.name || !namePattern.test(formData.name))
      newErrors.name = "Only letters allowed";
    if (!formData.license || !licensePattern.test(formData.license))
      newErrors.license = "Only letters and numbers allowed";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.reason || !reasonPattern.test(formData.reason))
      newErrors.reason = "Only letters and numbers allowed";
    if (!formData.points || formData.points < 0)
      newErrors.points = "Points must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | string
  ) => {
    if (typeof e === "string") {
      setFormData({
        ...formData,
        status: e as
          | "Blacklisted"
          | "Blacklisted (Immediate)"
          | "Blacklisted (Permanent)"
          | "Blacklisted (Temporary)",
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ ...formData, id: `F${Date.now()}` });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black  flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add to Blacklist</h2>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          pattern={/^[A-Za-z\s]+$/}
        />

        <TextField
          label="License No"
          name="license"
          value={formData.license}
          onChange={handleChange}
          error={errors.license}
          pattern={/^[A-Za-z0-9]+$/}
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
        />

        <TextAreaField
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          error={errors.reason}
          pattern={/^[A-Za-z0-9\s.,!?]+$/}
        />

        <TextField
          label="Points"
          name="points"
          type="number"
          value={formData.points}
          onChange={handleChange}
          error={errors.points}
        />

        <label className="block text-sm font-medium mb-1">Status</label>
        <div className="mb-3">
          <SelectDropdown
            id="filter"
            value={formData.status}
            onChange={handleChange}
            options={options}
            className="w-full mb-4"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlacklistModal;
