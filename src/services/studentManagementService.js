import api from "./api";

// Create student
export const createAStudent = async (studentData) => {
  try {
    const requestData = {
      student_code: parseInt(studentData.student_code),
      fullname: studentData.fullname,
      date_of_birth: new Date(studentData.date_of_birth).toISOString(),
      gender: studentData.gender,
      faculty_id: parseInt(studentData.faculty_id),
      batch: studentData.batch,
      program: studentData.program,
      program_id: 1,
      address: "",
      email: studentData.email,
      phone: studentData.phone,
      nationality: "Vietnam",
      status_id: parseInt(studentData.status_id),
      addresses: [
        {
          address_type: "Permanent",
          street: studentData.permanent_address.street,
          ward: studentData.permanent_address.ward,
          district: studentData.permanent_address.district,
          city: studentData.permanent_address.city,
          country: studentData.permanent_address.country,
        },
        {
          address_type: "Temporary",
          street: studentData.temp_address.street,
          ward: studentData.temp_address.ward,
          district: studentData.temp_address.district,
          city: studentData.temp_address.city,
          country: studentData.temp_address.country,
        },
        {
          address_type: "Mailing",
          street: studentData.mailing_address.street,
          ward: studentData.temp_address.ward,
          district: studentData.temp_address.district,
          city: studentData.temp_address.city,
          country: studentData.temp_address.country,
        },
      ],
      documents: [
        {
          document_type: "CCCD",
          document_number: studentData.cccd.document_number,
          issue_date: new Date(studentData.cccd.issue_date).toISOString(),
          issue_place: studentData.cccd.issue_place,
          expiry_date: new Date(studentData.cccd.expiry_date).toISOString(),
          country_of_issue: studentData.cccd.country_of_issue,
          has_chip: studentData.cccd.has_chip,
          notes: "",
        },
        {
          document_type: "CMND",
          document_number: studentData.cmnd.document_number,
          issue_date: new Date(studentData.cmnd.issue_date).toISOString(),
          issue_place: studentData.cmnd.issue_place,
          expiry_date: new Date(studentData.cmnd.expiry_date).toISOString(),
          country_of_issue: studentData.cmnd.country_of_issue,
          has_chip: studentData.cmnd.has_chip,
          notes: "",
        },
        {
          document_type: "Passport",
          document_number: studentData.passPort.document_number,
          issue_date: new Date(studentData.passPort.issue_date).toISOString(),
          issue_place: studentData.passPort.issue_place,
          expiry_date: new Date(studentData.passPort.expiry_date).toISOString(),
          country_of_issue: studentData.passPort.country_of_issue,
          has_chip: studentData.passPort.has_chip,
          notes: "",
        },
      ],
    };

    console.log("Request Data:", JSON.stringify(requestData, null, 2));
    const response = await api.post("/v1/students/create", requestData);

    if (response.data.code === 400) {
      throw new Error(response.data.message || "Bad request");
    }

    return response.data.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Search student by ID
export const searchStudentByID = async (id, page, pageSize) => {
  console.log("Fetching student with ID:", id);
  const response = await api.get(`/v1/students`, {
    params: {
      student_code: id,
      page,
      page_size: pageSize,
    },
  });
  return response.data.data;
};

// Search student by ID
export const getStudentById = async (id) => {
  console.log("Fetching student with ID:", id);
  const response = await api.get(`/v1/students/${id}`);
  return response.data.data;
};

// Get all students with pagination
export const getStudents = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/v1/students`, {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return response.data.data;
};

export const getStudentByFullName = async (
  fullname,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await api.get("/v1/students", {
      params: {
        fullname,
        page_size: pageSize,
        page,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student by fullname:", error);
    return null;
  }
};

//Get student by name, faculty
export const getStudentByNameAndFacutly = async (
  fullname,
  page = 1,
  pageSize = 10,
  faculty_name
) => {
  try {
    const response = await api.get("/v1/students", {
      params: {
        faculty_name,
        fullname,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching student by fullname:", error);
    return null;
  }
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

    const response = await api.patch(`/v1/students/${id}`, requestData);

    if (response.data.code === 400) {
      throw new Error(response.data.message || "Bad request");
    }

    return response.data.data;
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

    return response.data.data;
  } catch (error) {
    console.error("Delete failed:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

//Sort Student
export const sortStudent = async (field, type, page = 1, pageSize = 10) => {
  try {
    const response = await api.get("/v1/students", {
      params: {
        page,
        page_size: pageSize,
        sort: `${field}.${type}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sorted students:", error);
    return null;
  }
};

// Upload file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/v1/admins/imported-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Kiểm tra response code trước khi return data
    if (response.data.code === 0 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Lỗi khi tải file");
    }
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
    throw error;
  }
};

// Confirm file import
export const confirmFileImport = async (downloadUrl) => {
  try {
    const response = await api.post(
      "/v1/students/import-from-file",
      {
        file: downloadUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Import API response:", response);

    if (response.data.code !== 0 && response.data.data) {
      return response.data.data;
    }

    return response.data;
  } catch (error) {
    console.error("Import Error:", error);
    // If the error response has a structured data field, throw that
    if (error.response?.data?.data) {
      throw { response: { data: error.response.data } };
    }
    throw error;
  }
};

export const exportFile = async (type) => {
  try {
    const response = await api.get(`/v1/students/exported-file?type=${type}`, {
      responseType: "blob", // Đảm bảo response trả về Blob
      headers: {
        Accept: type === "csv" ? "text/csv" : "application/json",
      },
    });

    if (!response || !response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Export Error:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
