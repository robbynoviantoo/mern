import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ children, onClick }) => {
  return (
    <motion.button
      type="submit"
      className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg relative overflow-hidden"
      initial={{ background: "#3b82f6" }} // Warna awal
      whileHover={{
        background: "#3b82f6", // Tetap warna biru
      }}
      onClick={onClick}
    >
      {/* Shape bulat yang muncul saat hover */}
      <motion.div
        className="absolute inset-0 bg-white rounded-full transform scale-0"
        initial={{ scale: 0 }}
        whileHover={{
          scale: 2, // Ukuran lingkaran saat hover
          transition: { duration: 0.5 }, // Durasi animasi
        }}
        style={{ originX: 0.5, originY: 0.5 }} // Pusat animasi
      />
      <span className="relative z-[99999]">{children}</span> {/* Teks tombol */}
    </motion.button>
  );
};

export default AnimatedButton;