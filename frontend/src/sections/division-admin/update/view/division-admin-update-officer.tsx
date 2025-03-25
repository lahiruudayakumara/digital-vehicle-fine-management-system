import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

const UpdateOfficer = (
    {
        isOpen,
        onClose,
        onSubmit,
    }: ModalProps
) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        officerId: "",
        officerName: "",
        mobilePhone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        selectedLocation: "",
        patrolLocations: [] as string[],
    });

    const malabeLocations = ["Malabe Main", "Tech City", "Kaduwela Road", "SLIIT Campus"];

    useEffect(() => {
        if (location.state?.officer) {
            const { id, name, phone, email, address, patrolLocation } = location.state.officer;
            setFormData(prev => ({
                ...prev,
                officerId: id || "",
                officerName: name || "",
                mobilePhone: phone || "",
                email: email || "",
                address: address || "",
                patrolLocations: patrolLocation ? [patrolLocation] : []
            }));
        }
    }, [location.state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prev => !prev);

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newErrors: { [key: string]: string } = {};

        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (formData.patrolLocations.length === 0) newErrors.selectedLocation = "At least one patrol location is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Updated Officer Data:", formData);
            setIsModalOpen(true);
        }
    };

    const handlePatrolLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, selectedLocation: e.target.value }));
    };

    const addPatrolLocation = () => {
        if (formData.selectedLocation && !formData.patrolLocations.includes(formData.selectedLocation)) {
            setFormData(prev => ({
                ...prev,
                patrolLocations: [...prev.patrolLocations, prev.selectedLocation],
                selectedLocation: "",
            }));
        }
    };

    const removePatrolLocation = (location: string) => {
        setFormData(prev => ({
            ...prev,
            patrolLocations: prev.patrolLocations.filter(loc => loc !== location)
        }));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate("/dashboard/officer-manage");
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black  flex justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-xl font-bold">Update Motor Traffic Officer</h1>

                <div className="border-b pb-2 flex justify-between">
                    <button onClick={() => setStep(1)} className={`px-4 py-2 ${step === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full`}>Personal Info</button>
                    <button onClick={() => setStep(2)} className={`px-4 py-2 ${step === 2 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full`}>Security & Patrol</button>
                </div>

                {step === 1 && (
                    <div className="mt-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                name="officerId"
                                placeholder="Officer ID"
                                value={formData.officerId}
                                readOnly
                                className="block w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="officerName"
                                placeholder="Officer Name"
                                value={formData.officerName}
                                onChange={handleChange}
                                className="block w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="mobilePhone"
                                placeholder="Mobile Phone"
                                value={formData.mobilePhone}
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
                            <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="block w-full p-2 border rounded" />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-sm">{passwordVisible ? "Hide" : "Show"}</button>
                        </div>

                        <div className="mb-4 relative">
                            <input type={confirmPasswordVisible ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="block w-full p-2 border rounded" />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-2 text-sm">{confirmPasswordVisible ? "Hide" : "Show"}</button>
                        </div>

                        <div className="mb-4">
                            <label>Select Patrol Location</label>
                            <select value={formData.selectedLocation} onChange={handlePatrolLocationChange} className="block w-full p-2 border rounded">
                                <option value="">Select Location</option>
                                {malabeLocations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                            <button onClick={addPatrolLocation} className="bg-green-500 text-white px-4 py-2 mt-2 rounded">Add Location</button>
                        </div>

                        <div className="mb-4">
                            <label>Selected Patrol Locations:</label>
                            <div className="flex flex-wrap mt-2">
                                {formData.patrolLocations.map((location) => (
                                    <div key={location} className="bg-blue-200 px-3 py-1 rounded-full flex items-center mr-2">
                                        {location} <button onClick={() => removePatrolLocation(location)} className="ml-2 text-red-500">&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update Officer</button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Update Successful</h2>
                        <button onClick={handleModalClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateOfficer;
