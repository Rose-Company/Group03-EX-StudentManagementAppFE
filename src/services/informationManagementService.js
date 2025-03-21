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

// Get all student program
export const getPrograms = async () => {
  const response = await api.get("v1/students/programs");
  console.log(response.data);
  return response.data;
};

// Create faculty
export const createFaculty = async (facultyName) => {
  try {
    const response = await api.post("/v1/faculties", { name: facultyName });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating faculty:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create status
export const createStatus = async (statusName) => {
  try {
    const response = await api.post("/v1/statuses", { name: statusName });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export default api;

//Create student program
export const createProgram = async (programName) => {
  try {
    const response = await api.post("/v1/students/programs", { name: programName });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating program:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update faculty
export const updateFaculty = async (id, facultyname) => {
  try {
    const response = await api.patch(`/v1/faculties/${id}`, {
      name: facultyname,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating faculty:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update status
export const updateStatus = async (id, statusname) => {
  try {
    const response = await api.patch(`/v1/students/statuses/${id}`, {
      name: statusname,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProgram = async (id, programname) => {
  try {
    const response = await api.put(`/v1/students/programs/${id}`, {
      name: programname,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating program:",
      error.response?.data || error.message
    );
    throw error;
  }
};