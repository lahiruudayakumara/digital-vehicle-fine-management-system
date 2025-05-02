import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { registerPoliceOfficer } from '@/stores/slices/auth/auth-actions';
import { toast } from 'react-toastify';

const AddNewOfficerView = () => {
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        badgeID: "",
        fullName: "",
        telephone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        patrolLocations: [] as string[],
        selectedLocation: ""
    });

    const [errors, setErrors] = useState({
        badgeID: "",
        fullName: "",
        telephone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        patrolLocations: "",
        selectedLocation: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

    const handleSubmit = async () => {
        const newErrors = validateStep2();
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const officerData = {
                    badgeID: formData.badgeID,
                    fullName: formData.fullName,
                    username: formData.email,
                    email: formData.email,
                    password: formData.password,
                    address: formData.address,
                    telephone: formData.telephone,
                    patrolLocations: formData.patrolLocations.join(',')
                };

                await dispatch(registerPoliceOfficer(officerData)).unwrap();
                toast.success('Officer created successfully!');
                navigate('/dashboard/officer-manage');
            } catch (error: any) {
                const errorMessage = error.message || "Failed to create officer. Please try again.";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const validateStep1 = () => {
        const errors: any = {};
        if (!formData.badgeID) errors.badgeID = "Badge ID is required";
        if (!/^[a-zA-Z0-9]+$/.test(formData.badgeID)) errors.badgeID = "Badge ID must be alphanumeric";
        
        if (!formData.fullName) errors.fullName = "Officer Name is required";
        if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) errors.fullName = "Officer Name can only contain letters and spaces";
        
        if (!formData.telephone) errors.telephone = "Mobile Phone is required";
        if (!/^\d{10}$/.test(formData.telephone)) errors.telephone = "Mobile Phone must be exactly 10 digits";
        
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
                selectedLocation: ""
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

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-6">
                <h1 className="text-xl font-bold">Add New Motor Traffic Officer</h1>
                <div
                    className="fixed inset-0 bg-black flex justify-center items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div className="bg-white p-6 rounded shadow-md mt-4 w-[500px]">
                        <div className="border-b pb-2 flex justify-between items-center">
                            <div className="flex space-x-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className={`px-4 py-2 text-lg rounded-full transition-colors duration-200 ${
                                        step === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'
                                    }`}
                                >
                                    Personal Information
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    className={`px-4 py-2 text-lg rounded-full transition-colors duration-200 ${
                                        step === 2 ? 'bg-blue-500 text-white' : 'text-blue-500'
                                    }`}
                                >
                                    Password and Patrol Locations
                                </button>
                            </div>
                        </div>

                        {step === 1 ? (
                            <div className="mt-4">
                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        name="badgeID" 
                                        placeholder="Badge ID" 
                                        value={formData.badgeID} 
                                        onChange={handleChange} 
                                        className="block w-full p-2 border rounded"
                                    />
                                    {errors.badgeID && <span className="text-red-500 text-sm">{errors.badgeID}</span>}
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
                                    {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
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
                                    {errors.telephone && <span className="text-red-500 text-sm">{errors.telephone}</span>}
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
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    {errors.patrolLocations && <span className="text-red-500 text-sm">{errors.patrolLocations}</span>}
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
                                        onClick={() => navigate("/dashboard/officer-manage")}
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
                                        disabled={isLoading}
                                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                    >
                                        {isLoading ? 'Creating...' : 'Create Officer'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewOfficerView;