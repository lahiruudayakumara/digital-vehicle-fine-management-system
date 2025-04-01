import { AppDispatch, RootState } from "@/stores/store";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Logger from "@/utils/logger";
import { LoginRequest } from "@/types/auth-types";
import { login } from "@/stores/slices/auth/auth-actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLoginView = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const handleSignIn = async () => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (err: any) {
      Logger.error(err.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="../src/assets/Police Division Admin Login.png"
            alt="Police Division Admin Login"
            className="w-full"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center p-6 border-l">
          <h1 className="text-2xl font-semibold mb-4">SIGN IN</h1>
          <div className="mb-4">
            <img
              src="../src/assets/logo.jpg"
              alt="FineMate Logo"
              className="w-20"
            />
          </div>
          {/* <div className="w-full mb-4">
            <label className="block text-gray-600">
              Select the Police Division
            </label>
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
          </div> */}
          <div className="w-full mb-4">
            <div className="relative">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-gray-600">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full p-2 border rounded-lg bg-blue-100"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg bg-blue-100 pr-10"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <a href="#" className="text-blue-500 text-sm mb-4">
            Forgot password?
          </a>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginView;
