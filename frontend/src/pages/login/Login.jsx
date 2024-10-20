import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginImage from '../../assets/login.jpg';
import { axiosInstance } from "../../services/axiosInstance";
import { setUserInfo } from "../../services/localStorageInfo";

const Login = () => {
  // Combined state for form data and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  // Validate email and password
  const validateInputs = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain at least 8 characters, one uppercase, one number, and one special character.";
      valid = false;
    }

    setFormData((prevState) => ({
      ...prevState,
      errors: newErrors,
    }));

    return valid;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      // Proceed with API call here
      console.log("Valid inputs. Sending API request...");

      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      try {
        // Make the POST request with axios
        const response = await axiosInstance.post("/auth/login", loginData);

        if (response.data) {
          console.log("Login successful!");
          // Handle successful login (e.g., redirect, store token)
          setUserInfo(response.data);
          console.log('dashboard');
          
        } else {
          setFormData((prevState) => ({
            ...prevState,
            errors: { ...prevState.errors, general: response.data.message },
          }));
        }
      } catch (error) {
        console.error("Error during login:", error);
        setFormData((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, general: error.response.data.message },
        }));
      }
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden w-4/5 max-w-4xl">
        {/* Left side with Image - Hidden on small screens */}
        <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
          <img
            src={LoginImage}
            alt="Conference Organizer"
            className="object-cover h-full"
          />
        </div>

        {/* Right side with Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Hey, hello 👋</h2>
              <p className="text-gray-500">
                Enter the information you entered while registering.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.errors.email && (
                  <p className="text-red-500 text-sm">{formData.errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.errors.password && (
                  <p className="text-red-500 text-sm">{formData.errors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <p>Don't remember password?</p>
                <NavLink to="/forgot-password" className="text-blue-500 hover:underline">
                  Forgot password?
                </NavLink>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </NavLink>
              </p>
            </div>

            {formData.errors.general && (
              <p className="text-red-500 text-sm text-center mt-4">
                {formData.errors.general}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
