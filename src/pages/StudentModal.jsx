import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  getStudentById,
  getStatuses,
} from "../services/studentManagementService";
import "./StudentModal.css";

const StudentModal = ({
  studentId,
  isOpen,
  onClose,
  onSave,
  onDelete,
  faculties,
}) => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    student_code: "",
    fullname: "",
    date_of_birth: "",
    gender: "",
    faculty_id: "",
    batch: "",
    program: "",
    address: "",
    email: "",
    phone: "",
    status_id: "",
  });

  const [wasEditing, setWasEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsEditing(wasEditing); // Phục hồi trạng thái trước đó
    } else {
      setWasEditing(isEditing); // Lưu trạng thái trước khi đóng modal
    }
  }, [isOpen]);

  const initialFormData = useRef(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (studentId && isOpen) {
        try {
          const data = await getStudentById(studentId);
          setStudent(data);
          const initialData = {
            student_code: data.student_code.toString(),
            fullname: data.fullname,
            date_of_birth: new Date(data.date_of_birth)
              .toISOString()
              .split("T")[0],
            gender: data.gender,
            faculty_id: data.faculty_id.toString(),
            batch: data.batch,
            program: data.program,
            address: data.address,
            email: data.email,
            phone: data.phone,
            status_id: data.status_id.toString(),
          };
          setFormData(initialData);
          initialFormData.current = initialData; // Lưu trữ dữ liệu ban đầu
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }
    };

    fetchStudentDetails();
  }, [studentId, isOpen]);

  // Fetch student statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStatuses();
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching student statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFieldClick = (e) => {
    e.preventDefault()
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      const requiredFields = [
        "student_code",
        "fullname",
        "date_of_birth",
        "gender",
        "faculty_id",
        "batch",
        "program",
        "email",
        "phone",
        "status_id",
      ];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields);
        return;
      }

      // Validate numeric fields
      if (isNaN(parseInt(formData.student_code))) {
        console.error("Invalid student code");
        return;
      }

      if (isNaN(parseInt(formData.faculty_id))) {
        console.error("Invalid faculty ID");
        return;
      }

      if (isNaN(parseInt(formData.status_id))) {
        console.error("Invalid status ID");
        return;
      }

      // Format data for API
      const updatedData = {
        ...formData,
        id: studentId,
        student_code: parseInt(formData.student_code),
        faculty_id: parseInt(formData.faculty_id),
        status_id: parseInt(formData.status_id),
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
      };

      await onSave(updatedData);
      setStudent(updatedData); // Cập nhật trạng thái student với dữ liệu mới
      setIsEditing(false);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
      initialFormData.current = updatedData; // Cập nhật dữ liệu ban đầu sau khi lưu
    } catch (error) {
      console.error("Error in form submission:", error);
      return;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialFormData.current); // Khôi phục dữ liệu ban đầu
  };

  const handleDelete = async () => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student?"
      );

      if (!isConfirmed) {
        return;
      }

      // Show loading state
      const deleteButton = document.querySelector(".delete-button");
      if (deleteButton) {
        deleteButton.disabled = true;
        deleteButton.innerHTML =
          '<i class="bx bx-loader-alt bx-spin"></i> Deleting...';
      }

      await onDelete(studentId);
      onClose(); // Close the modal after successful deletion
      window.location.reload(); // Làm mới trang
    } catch (error) {
      console.error("Error deleting student:", error);
      // Show more specific error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete student. Please try again.";
      alert(errorMessage);
    } finally {
      // Reset button state if modal is still open
      const deleteButton = document.querySelector(".delete-button");
      if (deleteButton) {
        deleteButton.disabled = false;
        deleteButton.innerHTML = '<i class="bx bx-trash"></i> Delete';
      }
    }
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (JSON.stringify(formData) !== JSON.stringify(initialFormData.current)) {
      window.location.reload(); // Làm mới trang nếu dữ liệu đã thay đổi
    }
    onClose();
  };

  if (!isOpen || !student) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        // Chỉ đóng modal khi click trực tiếp vào overlay
        if (e.target.className === "modal-overlay") {
          handleClose(e);
        }
      }}
    >
      <div
        className={`modal-content ${isEditing ? "edit-mode" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-mode-indicator">Editing Mode</div>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>

        <h2>{isEditing ? "Edit Student" : "Student Details"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={`form-group ${isEditing ? "editable" : ""}`}>
            <div>
              <label>Student Code</label>
              <input
                type="number"
                name="student_code"
                value={formData.student_code}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="0"
              />
            </div>

            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Faculty</label>
              <select
                name="faculty_id"
                value={formData.faculty_id}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Faculty</option>
                {faculties?.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Program</label>
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Status</label>
              <select
                name="status_id"
                value={formData.status_id}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  className="edit-button"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn hành vi mặc định
                    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài modal
                    handleFieldClick(e);
                  }}
                >
                  <i className="bx bx-edit"></i>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài modal
                    handleDelete();
                  }}
                  className="delete-button"
                >
                  <i className="bx bx-trash"></i>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="submit" onClick={handleSubmit}>
                  <i className="bx bx-check"></i>
                  Save
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài modal
                    handleCancel();
                  }}
                >
                  <i className="bx bx-x"></i>
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

StudentModal.propTypes = {
  studentId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  faculties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default StudentModal;
