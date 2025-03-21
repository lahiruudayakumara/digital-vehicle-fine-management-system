import { useNavigate } from 'react-router-dom';
import { useState } from "react";

// To handle redirection

const AddNewOfficerView = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        officerId: "",
        officerName: "",
        mobilePhone: "",
        email: "",
        address: "",
        profilePicture: "",
        password: "",
        confirmPassword: "",
        patrolLocations: [] as string[],
        selectedLocation: "" // This will store the selected location from the dropdown
    });

    const [errors, setErrors] = useState({
        officerId: "",
        officerName: "",
        mobilePhone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        patrolLocations: "",
        selectedLocation: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility
    const [modalMessage, setModalMessage] = useState(''); // Message for modal
    const navigate = useNavigate();
    // Used for redirection after success

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleNext = () => {
        const newErrors = validateStep1();
        if (Object.keys(newErrors).length === 0) {
            setStep(2);
        } else {
            setErrors(newErrors);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = () => {
        const newErrors = validateStep2();
        if (Object.keys(newErrors).length === 0) {
            // Simulate successful form submission
            setModalMessage('Officer created successfully!');
            setIsModalOpen(true); // Show the success modal
        } else {
            setErrors(newErrors);
        }
    };

    const validateStep1 = () => {
        const errors: any = {};
        if (!formData.officerId) errors.officerId = "Officer ID is required";
        if (!/^[a-zA-Z0-9]+$/.test(formData.officerId)) errors.officerId = "Officer ID must be alphanumeric (letters and numbers only)";
        
        if (!formData.officerName) errors.officerName = "Officer Name is required";
        if (!/^[a-zA-Z\s]+$/.test(formData.officerName)) errors.officerName = "Officer Name can only contain letters and spaces";
        
        if (!formData.mobilePhone) errors.mobilePhone = "Mobile Phone is required";
        if (!/^\d{10}$/.test(formData.mobilePhone)) errors.mobilePhone = "Mobile Phone must be exactly 10 digits";
        
        if (!formData.email) errors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
        
        if (!formData.address) errors.address = "Address is required";
        if (!/^[a-zA-Z0-9\s,.'-]+$/.test(formData.address)) errors.address = "Address can only contain letters, numbers, and spaces";
        
        return errors;
    };

    const validateStep2 = () => {
        const errors: any = {};
        if (!formData.password) errors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
        if (formData.patrolLocations.length === 0) errors.patrolLocations = "At least one patrol location must be selected";
        return errors;
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handlePatrolLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedLocation: e.target.value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, selectedLocation: "" }));
    };

    const addPatrolLocation = () => {
        const { selectedLocation, patrolLocations } = formData;
        if (selectedLocation && !patrolLocations.includes(selectedLocation)) {
            setFormData((prevData) => ({
                ...prevData,
                patrolLocations: [...patrolLocations, selectedLocation],
                selectedLocation: "" // Clear the selected location after adding
            }));
        }
    };

    const removePatrolLocation = (location: string) => {
        setFormData((prevData) => ({
            ...prevData,
            patrolLocations: prevData.patrolLocations.filter((item) => item !== location),
        }));
    };

    const malabeLocations = [
        "Thalawathugoda", "Battaramulla", "Malabe Town", "Kottawa", "Pannipitiya", "Pelawatte"
    ];

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        navigate('/officermanage'); // Redirect to the dashboard using the new `navigate` function
    };
    

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-6">
                <h1 className="text-xl font-bold">Add New Motor Traffic Officer</h1>
                <div className="bg-white p-6 rounded shadow-md mt-4">
                    <div className="border-b pb-2 flex justify-between items-center">
                        <div className="flex space-x-6">
                            <button
                                onClick={() => setStep(1)}
                                className={`px-4 py-2 text-lg ${step === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full transition-colors duration-200`}
                            >
                                Personal Information
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className={`px-4 py-2 text-lg ${step === 2 ? 'bg-blue-500 text-white' : 'text-blue-500'} rounded-full transition-colors duration-200`}
                            >
                                Password and Patrol Locations
                            </button>
                        </div>
                    </div>

                    {step === 1 ? (
                        <div className="mt-4">
                            {/* Personal Information Form */}
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    name="officerId" 
                                    placeholder="Officer ID" 
                                    value={formData.officerId} 
                                    onChange={handleChange} 
                                    className="block w-full p-2 border rounded"
                                />
                                {errors.officerId && <span className="text-red-500 text-sm">{errors.officerId}</span>}
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
                                {errors.officerName && <span className="text-red-500 text-sm">{errors.officerName}</span>}
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
                                {errors.mobilePhone && <span className="text-red-500 text-sm">{errors.mobilePhone}</span>}
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
                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
                                {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4">
                            {/* Password and Patrol Locations Form */}
                            <div className="mb-4">
                                <div className="relative">
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        name="password" 
                                        placeholder="Password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        className="block w-full p-2 border rounded"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={togglePasswordVisibility} 
                                        className="absolute right-2 top-2 text-sm"
                                    >
                                        {passwordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <input 
                                        type={confirmPasswordVisible ? "text" : "password"} 
                                        name="confirmPassword" 
                                        placeholder="Confirm Password" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        className="block w-full p-2 border rounded"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={toggleConfirmPasswordVisibility} 
                                        className="absolute right-2 top-2 text-sm"
                                    >
                                        {confirmPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                                {formData.password && formData.password === formData.confirmPassword && (
                                    <span className="text-green-500 text-sm">Passwords match!</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Select Patrol Location</label>
                                <select
                                    name="selectedLocation"
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
                                    type="button" 
                                    onClick={addPatrolLocation}
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Add Location
                                </button>
                                {errors.selectedLocation && <span className="text-red-500 text-sm">{errors.selectedLocation}</span>}
                            </div>

                            <div className="mb-4">
                                <p className="font-semibold">Selected Patrol Locations:</p>
                                <div className="flex flex-wrap gap-2">
                                    {formData.patrolLocations.map((location) => (
                                        <span 
                                            key={location} 
                                            className="bg-blue-200 px-3 py-1 rounded-full flex items-center"
                                        >
                                            {location}
                                            <button 
                                                type="button"
                                                onClick={() => removePatrolLocation(location)}
                                                className="ml-2 text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


<div className="flex justify-between mt-6">
    {step === 2 && (
        <div className="flex justify-start">
            <button 
                onClick={handleBack} 
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Back
            </button>
        </div>
    )}

    {step === 1 ? (
        <div className="flex justify-between w-full">
            <button 
                onClick={() => navigate("/dashboard/officer-manage")} // Cancel button
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Cancel
            </button>
            <button 
                onClick={handleNext} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Next
            </button>
        </div>
    ) : (
        <div className="flex justify-end w-full">
            <button 
                onClick={handleSubmit} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Officer
            </button>
        </div>
    )}
</div>

                </div>
            </div>

             {/* Success Modal */}
{isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-gray-200/30">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-bold text-green-600">{modalMessage}</h2>
            <div className="flex justify-end mt-4">
                <button 
                    onClick={closeModal} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

export default AddNewOfficerView;
