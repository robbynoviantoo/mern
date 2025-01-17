import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify

const EditUser = () => {
  const { id } = useParams(); // Ambil ID pengguna dari URL
  const navigate = useNavigate(); // Untuk navigasi setelah edit
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  // Ambil data pengguna berdasarkan ID saat komponen dimuat
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/auth/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser({ ...response.data, password: "" }); // Jangan tampilkan password
      } catch (err) {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to fetch user data!"); // Notifikasi error
      }
    };

    fetchUser();
  }, [id]);

  // Fungsi untuk mengupdate state berdasarkan input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menyimpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/auth/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User updated successfully!"); // Notifikasi sukses
      setTimeout(() => navigate("/"), 2000); // Kembali ke halaman daftar pengguna setelah 2 detik
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Failed to update user. Please try again."); // Notifikasi error
    }
  };


  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ToastContainer /> {/* Komponen untuk menampilkan notifikasi */}
      <div className="flex-grow bg-base-200 p-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit User</h1>
          <div className="max-w-screen-xl mx-auto bg-base-100 rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
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
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-sm px-4 py-2  btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-sm px-4 py-2  btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
