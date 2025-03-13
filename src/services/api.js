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
<<<<<<< HEAD
  const response = await api.get(`/v1/students`, {
    params: {
      page,
      page_size: pageSize,
    },
=======
  const response = await api.get(`/v1/students/test`, {
    params: {
      page,
      page_size: pageSize
    }
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
  });
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
<<<<<<< HEAD
    console.log("Updating student with ID:", id);
=======
    console.log('Updating student with ID:', id);
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
    const requestData = {
      student_code: parseInt(studentData.student_code),
      fullname: studentData.fullname,
      date_of_birth: new Date(studentData.date_of_birth).toISOString(),
      gender: studentData.gender,
      faculty_id: parseInt(studentData.faculty_id),
      batch: studentData.batch,
      program: studentData.program,
      address: studentData.address,
      email: studentData.email,
      phone: studentData.phone,
<<<<<<< HEAD
      status_id: parseInt(studentData.status_id),
    };

    console.log("Request data:", requestData);

    const response = await api.put(`/v1/students/${id}`, requestData);

    if (response.data.code === 400) {
      throw new Error(response.data.message || "Bad request");
    }

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.data) {
      console.error("Detailed error:", error.response.data);
=======
      status_id: parseInt(studentData.status_id)
    };
    
    console.log('Request data:', requestData);
    
    const response = await api.put(`/v1/students/${id}`, requestData);
    
    if (response.data.code === 400) {
      throw new Error(response.data.message || 'Bad request');
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Detailed error:', error.response.data);
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
    }
    throw error;
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
<<<<<<< HEAD
    console.log("Deleting student with ID:", id);
    const response = await api.delete(`/v1/students/${id}`);

    console.log("Delete response:", response);

    // Check if the response itself was successful
    if (!response || response.status !== 200) {
      throw new Error("Failed to delete student - Server error");
    }

    // Check if the response data indicates success
    if (response.data && response.data.code !== 200) {
      throw new Error(response.data.message || "Failed to delete student");
    }

    return response.data;
  } catch (error) {
    console.error("Delete failed:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
=======
    console.log('Deleting student with ID:', id);
    const response = await api.delete(`/v1/students/${id}`);
    
    console.log('Delete response:', response);
    
    // Check if the response itself was successful
    if (!response || response.status !== 200) {
      throw new Error('Failed to delete student - Server error');
    }
    
    // Check if the response data indicates success
    if (response.data && response.data.code !== 200) {
      throw new Error(response.data.message || 'Failed to delete student');
    }
    
    return response.data;
  } catch (error) {
    console.error('Delete failed:', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
    });
    throw error;
  }
};

// Get all faculties
export const getFaculties = async () => {
<<<<<<< HEAD
  const response = await api.get("/v1/faculties");
=======
  const response = await api.get('/v1/faculties');
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
  return response.data;
};

// Get all student statuses
export const getStudentStatuses = async () => {
<<<<<<< HEAD
  const response = await api.get("/v1/students/statuses");
=======
  const response = await api.get('/v1/students/statuses');
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
  return response.data;
};

export default api;
