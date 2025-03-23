import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); // Required for accessibility

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(""); // State to store error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a request
    const url = isRegister
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";

    try {
      const res = await axios.post(url, formData);

      // Automatically log in user after successful registration
      if (isRegister) {
        const loginRes = await axios.post("http://localhost:5000/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        localStorage.setItem("token", loginRes.data.token);
        setUser(loginRes.data.user);
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      }

      onClose(); // Close modal after login
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg text-white w-96">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Create an Account" : "Welcome Back!"}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 rounded mt-3"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-400 ml-1"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;
