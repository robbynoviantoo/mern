import React, { useState, useEffect } from "react";
import { userList, deleteUser } from "../api/authApi";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import withReactContent from "sweetalert2-react-content"; // Untuk integrasi dengan React
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySwal = withReactContent(Swal);

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userList(); // Panggil fungsi dari authApi.js
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const user = users.find((u) => u._id === userId); // Temukan data pengguna berdasarkan ID

    // Tampilkan dialog konfirmasi menggunakan SweetAlert2
    const result = await MySwal.fire({
      title: `Delete User?`,
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId); // Hapus pengguna dari server
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Perbarui state
        toast.success("User deleted successfully!"); // Notifikasi sukses
      } catch (err) {
        console.error("Failed to delete user:", err);
        toast.error("Failed to delete user. Please try again."); // Notifikasi error
      }
    } else {
      toast.info("Delete canceled."); // Notifikasi pembatalan
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer /> {/* Komponen untuk notifikasi */}
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          User List
        </h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <Link
                      to={`/users/edit/${user._id}`}
                      className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
