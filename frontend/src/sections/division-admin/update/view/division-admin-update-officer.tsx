import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const UpdateOfficer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<{
        officerId: string;
        officerName: string;
        mobilePhone: string;
        email: string;
        address: string;
        password: string;
        confirmPassword: string;
        selectedLocation: string;
        patrolLocations: string[];
    }>({
        officerId: "",
        officerName: "",
        mobilePhone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        selectedLocation: "",
        patrolLocations: []
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    


    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let newErrors: { [key: string]: string } = {};
    
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (formData.patrolLocations.length === 0) newErrors.selectedLocation = "At least one patrol location is required.";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            console.log("Updated Officer Data:", formData);
            setIsModalOpen(true); // Open the modal
        }
        
    };


    const handlePatrolLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, selectedLocation: e.target.value });
    };
    
    const addPatrolLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (formData.selectedLocation && !formData.patrolLocations.includes(formData.selectedLocation)) {
            setFormData({
                ...formData,
                patrolLocations: [...formData.patrolLocations, formData.selectedLocation],
                selectedLocation: "",
            });
        }
    };
    
    const removePatrolLocation = (location: string) => {
        setFormData({
            ...formData,
            patrolLocations: formData.patrolLocations.filter(loc => loc !== location)
        });
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate("/officermanage");
    };

    const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;
    
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-md">
                    {children}
                    <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-6">
                <h1 className="text-xl font-bold">Update Motor Traffic Officer</h1>
                <div className="bg-white p-6 rounded shadow-md mt-4">
                    <div className="border-b pb-2 flex justify-between">
                        <div className="flex space-x-6">
                            <button onClick={() => setStep(1)} className={`px-4 py-2 ${step === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full`}>Personal Information</button>
                            <button onClick={() => setStep(2)} className={`px-4 py-2 ${step === 2 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full`}>Password and Patrol Locations</button>
                        </div>
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
                                    onClick={() => navigate("/dashboard/officer-manage")} 
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
            </div>

            {isModalOpen && (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-md bg-gray-200/30">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Update Successful</h2>
            <p>The officer's information has been updated successfully.</p>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleModalClose}
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