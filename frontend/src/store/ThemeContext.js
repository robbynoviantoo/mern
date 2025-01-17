import React, { createContext, useState, useEffect } from "react";

// Buat context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Fungsi untuk mengganti tema
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Atur tema di <html>
    localStorage.setItem("theme", newTheme); // Simpan tema di localStorage
  };

  // Terapkan tema saat aplikasi dimuat
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
