import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import { updatePoliceOfficer, fetchPoliceOfficerById } from "@/stores/slices/officer/officer-actions";
import { PoliceOfficerUpdate, PoliceOfficer } from "@/types/officer-types";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  officer: PoliceOfficer | null;
  onSubmit: () => void;
};

const UpdateOfficer = ({ isOpen, onClose, officer, onSubmit }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedOfficer, selectedBadgeId, loading, error } = useSelector((state: RootState) => state.officer);
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<PoliceOfficerUpdate & { confirmPassword: string; selectedLocation: string }>({
    fullName: "",
    telephone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    patrolLocations: [],
    selectedLocation: "",
  });

  const malabeLocations = ["Malabe Main", "Tech City", "Kaduwela Road", "SLIIT Campus"];
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && selectedBadgeId && !selectedOfficer) {
      dispatch(fetchPoliceOfficerById(selectedBadgeId));
    }
  }, [isOpen, selectedBadgeId, selectedOfficer, dispatch]);

  useEffect(() => {
    if (selectedOfficer) {
      setFormData({
        fullName: selectedOfficer.fullName || "",
        telephone: selectedOfficer.telephone || "",
        email: selectedOfficer.email || "",
        address: selectedOfficer.address || "",
        password: "",
        confirmPassword: "",
        patrolLocations: selectedOfficer.patrolLocations || [],
        selectedLocation: "",
      });
    }
  }, [selectedOfficer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible((prev) => !prev);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (formData.patrolLocations.length === 0) {
      newErrors.patrolLocations = "At least one patrol location is required.";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && selectedBadgeId) {
      const officerData: PoliceOfficerUpdate = {
        fullName: formData.fullName,
        telephone: formData.telephone,
        email: formData.email,
        address: formData.address,
        ...(formData.password && { password: formData.password }),
        patrolLocations: formData.patrolLocations,
      };

      try {
        await dispatch(updatePoliceOfficer({ 
          badgeID: selectedBadgeId, 
          data: officerData 
        })).unwrap();
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error("Failed to update officer:", error);
        setFormErrors({ general: "Failed to update officer. Please try again." });
      }
    }
  };

  const handlePatrolLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, selectedLocation: e.target.value }));
  };

  const addPatrolLocation = () => {
    if (formData.selectedLocation && !formData.patrolLocations.includes(formData.selectedLocation)) {
      setFormData((prev) => ({
        ...prev,
        patrolLocations: [...prev.patrolLocations, prev.selectedLocation],
        selectedLocation: "",
      }));
    }
  };

  const removePatrolLocation = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      patrolLocations: prev.patrolLocations.filter((loc) => loc !== location),
    }));
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
    navigate("/dashboard/officer-manage");
    setFormData({
      fullName: "",
      telephone: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      patrolLocations: [],
      selectedLocation: "",
    });
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold">Update Motor Traffic Officer</h1>
        {loading && <p>Loading officer data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {formErrors.general && <p className="text-red-500">{formErrors.general}</p>}

        <div className="border-b pb-2 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className={`px-4 py-2 ${step === 1 ? "bg-blue-500 text-white" : "text-blue-500"} rounded-full`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-4 py-2 ${step === 2 ? "bg-blue-500 text-white" : "text-blue-500"} rounded-full`}
          >
            Security & Patrol
          </button>
        </div>

        {step === 1 && (
          <div className="mt-4">
            <div className="mb-4">
              <input
                type="text"
                name="badgeID"
                placeholder="Officer ID"
                value={selectedBadgeId || ""}
                readOnly
                className="block w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Officer Name"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="telephone"
                placeholder="Mobile Phone"
                value={formData.telephone}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4">
            <div className="mb-4 relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password (optional)"
                value={formData.password}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-sm"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
              {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
            </div>
            <div className="mb-4 relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full p-2 border rounded"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 text-sm"
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
              {formErrors.confirmPassword && (
                <p className="text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>
            <div className="mb-4">
              <label>Select Patrol Location</label>
              <select
                value={formData.selectedLocation}
                onChange={handlePatrolLocationChange}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Location</option>
                {malabeLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                onClick={addPatrolLocation}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
              >
                Add Location
              </button>
              {formErrors.patrolLocations && (
                <p className="text-red-500">{formErrors.patrolLocations}</p>
              )}
            </div>
            <div className="mb-4">
              <label>Selected Patrol Locations:</label>
              <div className="flex flex-wrap mt-2">
                {formData.patrolLocations.map((location) => (
                  <div
                    key={location}
                    className="bg-blue-200 px-3 py-1 rounded-full flex items-center mr-2"
                  >
                    {location}{" "}
                    <button
                      onClick={() => removePatrolLocation(location)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Officer"}
              </button>
            </div>
          </div>
        )}
      </div>

      {isSuccessModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-gray-200/30">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Officer Updated Successfully</h2>
            <p>The officer's information has been updated.</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOfficer;