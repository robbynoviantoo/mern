import React, { useState, useEffect } from "react";
import { userList, deleteUser } from "../../api/authApi";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "../skeleton/Skeleton";
import "react-toastify/dist/ReactToastify.css";

const MySwal = withReactContent(Swal);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userList();
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const user = users.find((u) => u._id === userId);

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
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      } catch (err) {
        console.error("Failed to delete user:", err);
        toast.error("Failed to delete user. Please try again.");
      }
    } else {
      toast.info("Delete canceled.");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-base-200 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
        <div className="overflow-x-auto w-full max-w-screen-xl mx-auto bg-base-100 rounded-lg shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">
                    <Skeleton rows={3} columns={4} />
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="hover">
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Link
                          to={`/users/edit/${user._id}`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
