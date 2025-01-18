// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES } from '../constants/index'; // Import daftar tema

const Navbar = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const changeTheme = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme); // Ubah tema di HTML
        localStorage.setItem('theme', newTheme); // Simpan tema di localStorage
        setTheme(newTheme);
    };

    return (
        <div className="navbar px-0 flex mx-auto bg-base-100 max-w-screen-xl z-10 ">
            <div className="flex-1">
                <a className=" text-xl">Learning</a>
            </div>
            <div className="flex-none">
                {/* Dropdown untuk Ganti Tema */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                        Theme
                    </label>
                    <ul
                        tabIndex={0}
                        className="z-20 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-[300px] overflow-auto"
                    >
                        {THEMES.map((themeOption) => (
                            <li key={themeOption}>
                                <button
                                    onClick={() => changeTheme(themeOption)}
                                    className={theme === themeOption ? 'active' : ''}
                                >
                                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Tombol Logout */}
                <button
                    onClick={handleLogout}
                    className="btn btn-error ml-4"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
