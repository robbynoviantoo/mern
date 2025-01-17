import React, { useState, useEffect } from 'react';
import { userList } from "../api/authApi";
import Navbar from "./Navbar"

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userList(); // Panggil fungsi dari authApi.js
                setUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">User List</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">Nama</th>
                            <th className="px-4 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="bg-gray-50 even:bg-gray-100">
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
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
