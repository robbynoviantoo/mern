import axios from "axios";

const API_URL = "http://localhost:5000/api/item";

// Buat instance Axios
const API = axios.create({ baseURL: API_URL });

// Tambahkan interceptor untuk menyisipkan token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tambahkan interceptor untuk menangani token kedaluwarsa
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika status 401 (Unauthorized), hapus token dan arahkan ke login
      localStorage.removeItem("token");
      window.location.href = "/login"; // Ganti dengan rute halaman login Anda
    }
    return Promise.reject(error);
  }
);

// Fungsi API
export const getTodos = async () => {
  return await API.get("/");
};

export const createTodo = async (todoData) => {
  return await API.post("/", todoData);
};

export const updateTodo = async (id, updatedData) => {
  return await API.put(`/${id}`, updatedData);
};

export const deleteTodo = async (id) => {
  return await API.delete(`/${id}`);
};

export default API;
