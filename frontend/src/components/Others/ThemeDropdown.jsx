import React from 'react';

const ThemeDropdown = ({ theme, changeTheme, themes }) => {
    return (
        <div className="dropdown dropdown-top dropdown-end"> {/* Tambahkan dropdown-top di sini */}
            <label tabIndex={0} className="btn bg-base-100">
                Theme
            </label>
            <ul
                tabIndex={0}
                className="z-20 dropdown-content menu p-2 mb-2 shadow bg-base-100 rounded-box w-52 max-h-[300px] overflow-auto"
            >
                {themes.map((themeOption) => (
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
    );
};

export default ThemeDropdown;