import api from "./api";


// Get all faculties
export const getFaculties = async () => {
  const response = await api.get("/v1/faculties");
  
  return response.data;
};

// Get all statuses
export const getStatuses = async () => {
  const response = await api.get("v1/students/statuses");
  console.log(response.data);
  return response.data;
};
// Create faculty
export const createFaculty = async (facultyName) => {
  try {
    const response = await api.post("/v1/faculties", { name: facultyName });
    return response.data;
  } catch (error) {
    console.error("Error creating faculty:", error.response?.data || error.message);
    throw error;
  }
};
export default api;
