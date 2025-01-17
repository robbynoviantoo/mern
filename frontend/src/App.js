// frontend/src/App.js
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./store/ThemeContext"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider> {/* Bungkus seluruh aplikasi dengan ThemeProvider */}
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
