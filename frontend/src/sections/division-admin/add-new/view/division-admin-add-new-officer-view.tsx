import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
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

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Field validation functions
    const validateField = (name: string, value: string | string[]): string => {
        switch (name) {
            case "badgeID":
                if (!value) return "Badge ID is required";
                if (typeof value === 'string' && !/^[a-zA-Z0-9]+$/.test(value)) return "Badge ID must be alphanumeric";
                if (typeof value === 'string' && (value.length < 3 || value.length > 10)) return "Badge ID must be between 3 and 10 characters";
                return "";
            
            case "fullName":
                if (!value) return "Name is required";
                if (typeof value === 'string' && value.length < 3) return "Name must be at least 3 characters";
                if (typeof value === 'string' && value.length > 50) return "Name cannot exceed 50 characters";
                if (typeof value === 'string' && !/^[a-zA-Z\s.]+$/.test(value)) return "Name can only contain letters, spaces, and periods";
                return "";
            
            case "telephone":
                if (!value) return "Phone number is required";
                if (typeof value === 'string' && !/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
                return "";
            
            case "email":
                if (!value) return "Email is required";
                if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email format is invalid";
                return "";
            
            case "address":
                if (!value) return "Address is required";
                if (typeof value === 'string' && value.length < 5) return "Address must be at least 5 characters";
                return "";
            
            case "password":
                if (!value) return "Password is required";
                if (typeof value === 'string' && value.length < 8) return "Password must be at least 8 characters";
                if (typeof value === 'string' && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
                    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                return "";
            
            case "confirmPassword":
                if (!value) return "Please confirm your password";
                if (value !== formData.password) return "Passwords do not match";
                return "";
            
            case "patrolLocations":
                if (Array.isArray(value) && value.length === 0) return "At least one patrol location is required";
                return "";
            
            default:
                return "";
        }
    };

    // Validate all fields in the current step
    const validateCurrentStep = () => {
        const fieldsToValidate = step === 1 
            ? ["badgeID", "fullName", "telephone", "email", "address"] 
            : ["password", "confirmPassword", "patrolLocations"];
        
        let newErrors: { [key: string]: string } = {};
        let isValid = true;

        fieldsToValidate.forEach(field => {
            const value = field === "patrolLocations" ? formData.patrolLocations : formData[field as keyof typeof formData];
            const error = validateField(field, value as string | string[]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setFormErrors(prev => ({ ...prev, ...newErrors }));
        
        // Mark all fields in this step as touched
        const touchedFieldsUpdate = fieldsToValidate.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {} as { [key: string]: boolean });
        
        setTouchedFields(prev => ({ ...prev, ...touchedFieldsUpdate }));

        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Mark field as touched
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        // Validate field on change
        const error = validateField(name, value);
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Mark field as touched
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        // Validate field on blur
        const error = validateField(name, value);
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async () => {
        if (validateCurrentStep()) {
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
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handlePatrolLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            selectedLocation: e.target.value,
        }));
    };

    const addPatrolLocation = () => {
        const { selectedLocation, patrolLocations } = formData;
        if (selectedLocation && !patrolLocations.includes(selectedLocation)) {
            const newPatrolLocations = [...patrolLocations, selectedLocation];
            setFormData(prev => ({
                ...prev,
                patrolLocations: newPatrolLocations,
                selectedLocation: ""
            }));
            
            // Validate patrol locations
            setTouchedFields(prev => ({ ...prev, patrolLocations: true }));
            const error = validateField("patrolLocations", newPatrolLocations);
            setFormErrors(prev => ({ ...prev, patrolLocations: error }));
        }
    };

    const removePatrolLocation = (location: string) => {
        const newPatrolLocations = formData.patrolLocations.filter(item => item !== location);
        setFormData(prev => ({
            ...prev,
            patrolLocations: newPatrolLocations,
        }));
        
        // Validate patrol locations after removal
        setTouchedFields(prev => ({ ...prev, patrolLocations: true }));
        const error = validateField("patrolLocations", newPatrolLocations);
        setFormErrors(prev => ({ ...prev, patrolLocations: error }));
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
                                    onClick={() => validateCurrentStep() && setStep(2)}
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
                                        onBlur={handleBlur}
                                        className={`block w-full p-2 border rounded ${
                                            touchedFields.badgeID && formErrors.badgeID ? "border-red-500" : ""
                                        }`}
                                    />
                                    {touchedFields.badgeID && formErrors.badgeID && (
                                        <span className="text-red-500 text-sm">{formErrors.badgeID}</span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        placeholder="Officer Name" 
                                        value={formData.fullName} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={`block w-full p-2 border rounded ${
                                            touchedFields.fullName && formErrors.fullName ? "border-red-500" : ""
                                        }`}
                                    />
                                    {touchedFields.fullName && formErrors.fullName && (
                                        <span className="text-red-500 text-sm">{formErrors.fullName}</span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        name="telephone" 
                                        placeholder="Mobile Phone" 
                                        value={formData.telephone} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={`block w-full p-2 border rounded ${
                                            touchedFields.telephone && formErrors.telephone ? "border-red-500" : ""
                                        }`}
                                    />
                                    {touchedFields.telephone && formErrors.telephone && (
                                        <span className="text-red-500 text-sm">{formErrors.telephone}</span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={`block w-full p-2 border rounded ${
                                            touchedFields.email && formErrors.email ? "border-red-500" : ""
                                        }`}
                                    />
                                    {touchedFields.email && formErrors.email && (
                                        <span className="text-red-500 text-sm">{formErrors.email}</span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        name="address" 
                                        placeholder="Address" 
                                        value={formData.address} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={`block w-full p-2 border rounded ${
                                            touchedFields.address && formErrors.address ? "border-red-500" : ""
                                        }`}
                                    />
                                    {touchedFields.address && formErrors.address && (
                                        <span className="text-red-500 text-sm">{formErrors.address}</span>
                                    )}
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
                                            onBlur={handleBlur}
                                            className={`block w-full p-2 border rounded ${
                                                touchedFields.password && formErrors.password ? "border-red-500" : ""
                                            }`}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={togglePasswordVisibility} 
                                            className="absolute right-2 top-2 text-sm"
                                        >
                                            {passwordVisible ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {touchedFields.password && formErrors.password && (
                                        <span className="text-red-500 text-sm">{formErrors.password}</span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <div className="relative">
                                        <input 
                                            type={confirmPasswordVisible ? "text" : "password"} 
                                            name="confirmPassword" 
                                            placeholder="Confirm Password" 
                                            value={formData.confirmPassword} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur}
                                            className={`block w-full p-2 border rounded ${
                                                touchedFields.confirmPassword && formErrors.confirmPassword ? "border-red-500" : ""
                                            }`}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={toggleConfirmPasswordVisibility} 
                                            className="absolute right-2 top-2 text-sm"
                                        >
                                            {confirmPasswordVisible ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {touchedFields.confirmPassword && formErrors.confirmPassword && (
                                        <span className="text-red-500 text-sm">{formErrors.confirmPassword}</span>
                                    )}
                                    {formData.password && formData.confirmPassword && 
                                     formData.password === formData.confirmPassword && (
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
                                        disabled={!formData.selectedLocation}
                                    >
                                        Add Location
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">Selected Patrol Locations:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.patrolLocations.map((location) => (
                                            <span 
                                                key={location} 
                                                className="bg-blue-200 px-3 py-1 rounded-full flex items-center mb-2"
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
                                    {touchedFields.patrolLocations && formErrors.patrolLocations && (
                                        <span className="text-red-500 text-sm">{formErrors.patrolLocations}</span>
                                    )}
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