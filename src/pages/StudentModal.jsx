import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStudentById } from '../services/api';
import './StudentModal.css';

const StudentModal = ({ studentId, isOpen, onClose, onSave, onDelete, faculties }) => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (studentId && isOpen) {
        try {
          const data = await getStudentById(studentId);
          setStudent(data);
          setFormData({
            student_code: data.student_code,
            fullname: data.fullname,
            date_of_birth: new Date(data.date_of_birth).toISOString().split('T')[0],
            gender: data.gender,
            faculty_id: data.faculty_id,
            batch: data.batch,
            program: data.program,
            address: data.address,
            email: data.email,
            phone: data.phone,
            status_id: data.status_id
          });
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      }
    };

    fetchStudentDetails();
  }, [studentId, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFieldClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: studentId });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      student_code: student.student_code,
      fullname: student.fullname,
      date_of_birth: new Date(student.date_of_birth).toISOString().split('T')[0],
      gender: student.gender,
      faculty_id: student.faculty_id,
      batch: student.batch,
      program: student.program,
      address: student.address,
      email: student.email,
      phone: student.phone,
      status_id: student.status_id
    });
  };

  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isEditing ? 'edit-mode' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="edit-mode-indicator">Editing Mode</div>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2>{isEditing ? 'Edit Student' : 'Student Details'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${isEditing ? 'editable' : ''}`} onClick={handleFieldClick}>
            <div>
              <label>Student Code</label>
              <input
                type="text"
                name="student_code"
                value={formData.student_code}
                onChange={handleInputChange}
                disabled={!isEditing}
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
              <input
                type="number"
                name="status_id"
                value={formData.status_id}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="modal-actions">
            {!isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(true)}>
                  <i className="bx bx-edit"></i>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(studentId)} className="delete-button">
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
  )
};

export default StudentModal; 