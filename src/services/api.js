import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get student by ID
export const getStudentById = async (id) => {
  const response = await api.get(`/v1/students/${id}`);
  return response.data;
};

// Get all students with pagination
export const getStudents = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/v1/students`, {
    params: {
      page,
      page_size: pageSize
    }
  });
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/v1/students/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/v1/students/${id}`);
  return response.data;
};

// Get all faculties
export const getFaculties = async () => {
  const response = await api.get('/v1/faculties');
  return response.data;
};

export default api;
