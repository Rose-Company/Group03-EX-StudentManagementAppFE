import api from "./api";
// Get student by ID
export const getStudentById = async (id) => {
  const response = await api.get(`/v1/students/${id}`);
  return response.data;
};

// Get all students with pagination
export const getStudents = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/v1/students/test`, {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    console.log("Updating student with ID:", id);
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
    }
    throw error;
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
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
    });
    throw error;
  }
};

// Get all faculties
export const getFaculties = async () => {
  const response = await api.get("/v1/faculties");
  return response.data;
};

// Get all student statuses
export const getStatuses = async () => {
  const response = await api.get("/v1/students/statuses");
  return response.data;
};

//Sort Student
export const sortStudent = async (field, type, page = 1, pageSize = 10) => {
  try {
    const response = await api.get("/v1/students/test", {
      params: {
        page,
        page_size: pageSize,
        sort: `${field}.${type}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sorted students:", error);
    return null;
  }
};

export const getStudentByFullName = async (
  fullname,
  page = 1,
  pageSize = 10
) => {
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
