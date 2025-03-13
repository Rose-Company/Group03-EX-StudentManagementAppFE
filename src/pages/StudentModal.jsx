<<<<<<< HEAD
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStudentById, getStudentStatuses } from '../services/api';
import './StudentModal.css';

const StudentModal = ({ studentId, isOpen, onClose, onSave, onDelete, faculties }) => {
=======
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getStudentById, getStudentStatuses } from "../services/api";
import "./StudentModal.css";

const StudentModal = ({
  studentId,
  isOpen,
  onClose,
  onSave,
  onDelete,
  faculties,
}) => {
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    student_code: '',
    fullname: '',
    date_of_birth: '',
    gender: '',
    faculty_id: '',
    batch: '',
    program: '',
    address: '',
    email: '',
    phone: '',
    status_id: ''
=======
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
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (studentId && isOpen) {
        try {
          const data = await getStudentById(studentId);
          setStudent(data);
          setFormData({
            student_code: data.student_code.toString(),
            fullname: data.fullname,
<<<<<<< HEAD
            date_of_birth: new Date(data.date_of_birth).toISOString().split('T')[0],
=======
            date_of_birth: new Date(data.date_of_birth)
              .toISOString()
              .split("T")[0],
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
            gender: data.gender,
            faculty_id: data.faculty_id.toString(),
            batch: data.batch,
            program: data.program,
            address: data.address,
            email: data.email,
            phone: data.phone,
<<<<<<< HEAD
            status_id: data.status_id.toString()
          });
        } catch (error) {
          console.error('Error fetching student details:', error);
=======
            status_id: data.status_id.toString(),
          });
        } catch (error) {
          console.error("Error fetching student details:", error);
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
        }
      }
    };

    fetchStudentDetails();
  }, [studentId, isOpen]);

  // Fetch student statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStudentStatuses();
        setStatuses(data);
      } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching student statuses:', error);
=======
        console.error("Error fetching student statuses:", error);
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      }
    };

    fetchStatuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    console.log('Input changed:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
=======
    console.log("Input changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
    }));
  };

  const handleFieldClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      const requiredFields = [
<<<<<<< HEAD
        'student_code',
        'fullname',
        'date_of_birth',
        'gender',
        'faculty_id',
        'batch',
        'program',
        'email',
        'phone',
        'status_id'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
=======
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
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
        return;
      }

      // Validate numeric fields
      if (isNaN(parseInt(formData.student_code))) {
<<<<<<< HEAD
        console.error('Invalid student code');
=======
        console.error("Invalid student code");
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
        return;
      }

      if (isNaN(parseInt(formData.faculty_id))) {
<<<<<<< HEAD
        console.error('Invalid faculty ID');
=======
        console.error("Invalid faculty ID");
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
        return;
      }

      if (isNaN(parseInt(formData.status_id))) {
<<<<<<< HEAD
        console.error('Invalid status ID');
=======
        console.error("Invalid status ID");
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
        return;
      }

      // Format data for API
      const updatedData = {
        ...formData,
        id: studentId,
        student_code: parseInt(formData.student_code),
        faculty_id: parseInt(formData.faculty_id),
        status_id: parseInt(formData.status_id),
<<<<<<< HEAD
        date_of_birth: new Date(formData.date_of_birth).toISOString()
=======
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      };

      await onSave(updatedData);
      setIsEditing(false);
    } catch (error) {
<<<<<<< HEAD
      console.error('Error in form submission:', error);
=======
      console.error("Error in form submission:", error);
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      return;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      student_code: student.student_code.toString(),
      fullname: student.fullname,
<<<<<<< HEAD
      date_of_birth: new Date(student.date_of_birth).toISOString().split('T')[0],
=======
      date_of_birth: new Date(student.date_of_birth)
        .toISOString()
        .split("T")[0],
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      gender: student.gender,
      faculty_id: student.faculty_id.toString(),
      batch: student.batch,
      program: student.program,
      address: student.address,
      email: student.email,
      phone: student.phone,
<<<<<<< HEAD
      status_id: student.status_id.toString()
=======
      status_id: student.status_id.toString(),
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
    });
  };

  const handleDelete = async () => {
    try {
      // Show confirmation dialog
<<<<<<< HEAD
      const isConfirmed = window.confirm('Are you sure you want to delete this student?');
      
=======
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student?"
      );

>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      if (!isConfirmed) {
        return;
      }

      // Show loading state
<<<<<<< HEAD
      const deleteButton = document.querySelector('.delete-button');
      if (deleteButton) {
        deleteButton.disabled = true;
        deleteButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Deleting...';
=======
      const deleteButton = document.querySelector(".delete-button");
      if (deleteButton) {
        deleteButton.disabled = true;
        deleteButton.innerHTML =
          '<i class="bx bx-loader-alt bx-spin"></i> Deleting...';
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      }

      await onDelete(studentId);
      onClose(); // Close the modal after successful deletion
    } catch (error) {
<<<<<<< HEAD
      console.error('Error deleting student:', error);
      // Show more specific error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete student. Please try again.';
      alert(errorMessage);
    } finally {
      // Reset button state if modal is still open
      const deleteButton = document.querySelector('.delete-button');
=======
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
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
      if (deleteButton) {
        deleteButton.disabled = false;
        deleteButton.innerHTML = '<i class="bx bx-trash"></i> Delete';
      }
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
<<<<<<< HEAD
      <div className={`modal-content ${isEditing ? 'edit-mode' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="edit-mode-indicator">Editing Mode</div>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2>{isEditing ? 'Edit Student' : 'Student Details'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${isEditing ? 'editable' : ''}`} onClick={handleFieldClick}>
=======
      <div
        className={`modal-content ${isEditing ? "edit-mode" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-mode-indicator">Editing Mode</div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h2>{isEditing ? "Edit Student" : "Student Details"}</h2>

        <form onSubmit={handleSubmit}>
          <div
            className={`form-group ${isEditing ? "editable" : ""}`}
            onClick={handleFieldClick}
          >
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
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
                <button type="button" onClick={() => setIsEditing(true)}>
                  <i className="bx bx-edit"></i>
                  Edit
                </button>
<<<<<<< HEAD
                <button 
                  type="button" 
                  onClick={handleDelete} 
=======
                <button
                  type="button"
                  onClick={handleDelete}
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
                  className="delete-button"
                >
                  <i className="bx bx-trash"></i>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="submit">
                  <i className="bx bx-check"></i>
                  Save
                </button>
                <button type="button" onClick={handleCancel}>
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
<<<<<<< HEAD
  )
};

export default StudentModal; 
=======
  ),
};

export default StudentModal;
>>>>>>> 7218534fc879a8838909630e3c89982790f59722
