import { useState } from "react";
import Sidebar from './division-admin-sidebar';

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
        patrolLocations: [] as string[]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNext = () => {
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="p-6">
                <h1 className="text-xl font-bold">ADD NEW MOTOR TRAFFIC OFFICER</h1>
                <div className="bg-white p-4 rounded shadow-md mt-4">
                    <div className="border-b pb-2 flex">
                        <button className={`mr-4 ${step === 1 ? 'font-bold' : ''}`} onClick={() => setStep(1)}>Personal Information</button>
                        <button className={`${step === 2 ? 'font-bold' : ''}`} onClick={() => setStep(2)}>Password and Patrol Locations</button>
                    </div>
                    {step === 1 ? (
                        <div className="mt-4">
                            <input type="text" name="officerId" placeholder="Officer ID" value={formData.officerId} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <input type="text" name="officerName" placeholder="Officer Name" value={formData.officerName} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <input type="text" name="mobilePhone" placeholder="Mobile Phone" value={formData.mobilePhone} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
                            <div className="mt-4">
                                <label className="block mb-2">Assigned Patrol Locations</label>
                                <select name="patrolLocations" value={formData.patrolLocations} onChange={handleChange} className="block w-full mb-2 p-2 border rounded">
                                    <option value="Malabe">Malabe</option>
                                    <option value="Gampaha">Gampaha</option>
                                </select>
                            </div>
                            <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Back</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddNewOfficerView;
