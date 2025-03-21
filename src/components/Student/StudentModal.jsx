// src/components/Student/StudentModal.jsx
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  getStudentById,
  getStatuses,
} from "../../services/studentManagementService";
import StudentForm from "./StudentForm";
import styles from "./StudentModal.module.css";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFieldClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      const deleteButton = document.querySelector(`.${styles.deleteButton}`);
      if (deleteButton) {
        deleteButton.disabled = true;
        deleteButton.innerHTML =
          '<i className="bx bx-loader-alt bx-spin"></i> Deleting...';
      }

      await onDelete(studentId);
      onClose(); // Close the modal after successful deletion
      window.location.reload(); // Làm mới trang
    } catch (error) {
      console.error("Error deleting student:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete student. Please try again.";
      alert(errorMessage);
    } finally {
      const deleteButton = document.querySelector(`.${styles.deleteButton}`);
      if (deleteButton) {
        deleteButton.disabled = false;
        deleteButton.innerHTML = '<i className="bx bx-trash"></i> Delete';
      }
    }
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (JSON.stringify(formData) !== JSON.stringify(initialFormData.current)) {
      window.location.reload();
    }
    onClose();
  };

  if (!isOpen || !student) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target.className === styles.modalOverlay) {
          console.log("Overlay clicked");
          handleClose(e);
        }
      }}
    >
      <div
        className={`${styles.modalContent} ${isEditing ? styles.editMode : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.editModeIndicator}>Editing Mode</div>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>

        <h2>{isEditing ? "Edit Student" : "Student Details"}</h2>

        <form onSubmit={handleSubmit}>
          <StudentForm
            initialData={formData}
            faculties={faculties}
            statuses={statuses}
            onChange={handleInputChange}
            isDisabled={!isEditing}
            styles={styles} // Truyền styles xuống component con
          />

          <div className={styles.modalActions}>
            {!isEditing ? (
              // Buttons for view mode
              <>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={handleFieldClick}
                >
                  <i className="bx bx-edit"></i> Edit
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={styles.deleteButton}
                >
                  <i className="bx bx-trash"></i> Delete
                </button>
              </>
            ) : (
              // Buttons for edit mode
              <>
                <button type="submit" onClick={handleSubmit}>
                  <i className="bx bx-check"></i> Save
                </button>
                <button type="button" onClick={handleCancel}>
                  <i className="bx bx-x"></i> Cancel
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
