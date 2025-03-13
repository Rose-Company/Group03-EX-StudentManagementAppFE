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
export const getStudentById = async (student_code, page = 1, pageSize = 10) => {
  try {
    const response = await api.get("/v1/students/test", {
      params: {
        page,         
        page_size: pageSize, 
        student_code, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    return null; 
  }
};

export const getStudentByFullName = async (fullname, page = 1, pageSize = 10) => {
  try {
    const response = await api.get("/v1/students/test", {
      params: {
        fullname,
        page_size: pageSize,  
        page,         
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching student by fullname:", error);
    return null; 
  }
};

// Get all students with pagination
export const getStudents = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/v1/students/test`, {
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

// Get all statuses
export const getStatuses = async () => {
  const response = await api.get('/v1/students/statuses')
  return response.data;
}

//Sort Student
export const sortStudent = async (field, type, page = 1, pageSize = 10) => {
  try {
    const response = await api.get("/v1/students/test", {
      params: {
        page,
        page_size: pageSize,
        sort: `${field}.${type}` 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching sorted students:", error);
    return null; 
  }
};

export default api;
