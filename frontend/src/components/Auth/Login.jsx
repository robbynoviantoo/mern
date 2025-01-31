// frontend/src/components/Login.js
import React, { useEffect, useState } from "react";
import { loginUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { THEMES } from "../../constants/index";
import ThemeDropdown from "../Others/ThemeDropdown";
import AnimatedButton from "../Others/AnimatedButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      // Navigasi ke halaman berikutnya dengan state untuk pesan sukses
      navigate("/", { state: { successMessage: "Login successful!" } });
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const changeTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme); // Ubah tema di HTML
    localStorage.setItem("theme", newTheme); // Simpan tema di localStorage
    setTheme(newTheme);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 relative">
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <AnimatedButton onClick={handleSubmit}>Login</AnimatedButton>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <div className="absolute bottom-4 right-4">
          <ThemeDropdown
            theme={theme}
            changeTheme={changeTheme}
            themes={THEMES}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
