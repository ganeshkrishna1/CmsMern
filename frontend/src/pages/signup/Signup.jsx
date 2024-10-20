import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignupImage from '../../assets/signup.jpg'; // You can replace with your signup image
import { axiosInstance } from "../../services/axiosInstance";

const Signup = () => {
  // Combined state for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee", // Default role
    errors: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const navigate = useNavigate();

  // Validate inputs
  const validateInputs = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", role: "" };

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

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

    // Role validation (optional, if you want to enforce selection)
    if (!formData.role) {
      newErrors.role = "Role is required.";
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
      console.log("Valid inputs. Sending API request...");

      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // Include the role in the signup data
      };

      try {
        // Make the POST request with axios
        const response = await axiosInstance.post("/auth/register", signupData);

        if (response.data) {
          console.log("Signup successful!");
          navigate('/login');
        } else {
          setFormData((prevState) => ({
            ...prevState,
            errors: { ...prevState.errors, general: response.data.message },
          }));
        }
      } catch (error) {
        console.error("Error during signup:", error);
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
            src={SignupImage}
            alt="Signup"
            className="object-cover h-full"
          />
        </div>

        {/* Right side with Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Welcome! 🎉</h2>
              <p className="text-gray-500">
                Create your account to get started.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.errors.name && (
                  <p className="text-red-500 text-sm">{formData.errors.name}</p>
                )}
              </div>

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

              <div className="mb-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                </select>
                {formData.errors.role && (
                  <p className="text-red-500 text-sm">{formData.errors.role}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-500">
                Already have an account?{" "}
                <NavLink to="/login" className="text-blue-500 hover:underline">
                  Login
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

export default Signup;
