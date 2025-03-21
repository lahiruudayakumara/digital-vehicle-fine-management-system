import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLoginView = () => {
    const [password, setPassword] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Add authentication logic here
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full">
                <div className="w-1/2 flex justify-center items-center">
                    <img src="../src/assets/Police Division Admin Login.png" alt="Police Division Admin Login" className="w-full" />
                </div>
                <div className="w-1/2 flex flex-col items-center p-6 border-l">
                    <h1 className="text-2xl font-semibold mb-4">SIGN IN</h1>
                    <div className="mb-4">
                        <img src="../src/assets/logo.jpg" alt="FineMate Logo" className="w-20" />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block text-gray-600">Select the Police Division</label>
                        <select 
                            className="w-full p-2 border rounded-lg bg-blue-100"
                            value={selectedDivision} 
                            onChange={(e) => setSelectedDivision(e.target.value)}
                        >
                            <option value="">Police Division</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Kalutara">Kalutara</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Matale">Matale</option>
                            <option value="Nuwara Eliya">Nuwara Eliya</option>
                            <option value="Galle">Galle</option>
                            <option value="Matara">Matara</option>
                            <option value="Hambantota">Hambantota</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Vavuniya">Vavuniya</option>
                            <option value="Mullaitivu">Mullaitivu</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Ampara">Ampara</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Puttalam">Puttalam</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Badulla">Badulla</option>
                            <option value="Monaragala">Monaragala</option>
                            <option value="Ratnapura">Ratnapura</option>
                            <option value="Kegalle">Kegalle</option>
                        </select>
                    </div>
                    <div className="w-full mb-4">
                        <label className="block text-gray-600">Password *</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="w-full p-2 border rounded-lg bg-blue-100"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="absolute right-3 top-2 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <a href="#" className="text-blue-500 text-sm mb-4">Forgot password?</a>
                    <button onClick={handleSignIn} className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">SIGN IN</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginView;
