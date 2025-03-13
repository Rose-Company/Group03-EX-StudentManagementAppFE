import "./StudentManagement.css";
import StudentList from "./StudentList";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import {
  getStudents,
  getFaculties,
  updateStudent,
  deleteStudent,
} from "../services/studentManagementService";
=======
import React, { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import { getStudents, getFaculties, updateStudent, deleteStudent } from "../services/api";

>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [page, setPage] = useState(1);
<<<<<<< HEAD
  const [setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);

=======
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);


>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
  // paging
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents(page, 10);
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [page]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await getFaculties();
        if (data.code === 200) {
          setFaculties(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const handleOpenPopUp = () => setIsPopUpOpened(true);
  const handleClosePopUp = () => setIsPopUpOpened(false);
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);  
  const handleStudentClick = (student) => {
    setSelectedStudent(student.id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveStudent = async (updatedStudent) => {
    try {
      console.log('Starting update for student:', updatedStudent);
      
      // Ensure all required fields are present and properly formatted
      if (!updatedStudent.id) {
        console.error('Missing student ID');
        return;
      }

      const response = await updateStudent(updatedStudent.id, updatedStudent);
      console.log('Update response:', response);

      if (response && response.code === 200) {
        // Refresh the student list
        const data = await getStudents(page, 10);
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }
        handleModalClose();
      } else {
        console.error('Update failed:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in handleSaveStudent:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await deleteStudent(studentId);
      
      //if deletion was successful
      if (response && response.code === 200) {
        // Refresh the student list
        const data = await getStudents(page, 10);
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }
        
        // Close the modal
        handleModalClose();
        
        // Show success message
        alert('Student deleted successfully');
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error in handleDeleteStudent:', error);
      throw error; 
    }
  };


  const handleStudentClick = (student) => {
    setSelectedStudent(student.id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveStudent = async (updatedStudent) => {
    try {
      console.log("Starting update for student:", updatedStudent);

      // Ensure all required fields are present and properly formatted
      if (!updatedStudent.id) {
        console.error("Missing student ID");
        return;
      }

      const response = await updateStudent(updatedStudent.id, updatedStudent);
      console.log("Update response:", response);

      if (response && response.code === 200) {
        // Refresh the student list
        const data = await getStudents(page, 10);
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }
        handleModalClose();
      } else {
        console.error("Update failed:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error in handleSaveStudent:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await deleteStudent(studentId);

      //if deletion was successful
      if (response && response.code === 200) {
        // Refresh the student list
        const data = await getStudents(page, 10);
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }

        // Close the modal
        handleModalClose();

        // Show success message
        alert("Student deleted successfully");
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error in handleDeleteStudent:", error);
      throw error;
    }
  };

  return (
    <>
      <div
        className={isPopUpOpened ? "blur-background" : "management-container"}
      >
        <div className="top-action">
          <p className="title">Student List</p>
          <button onClick={handleOpenPopUp} className="add-btn">
            Add Student
          </button>
        </div>
        <div className="search-filter">
          <select className="filter-dropdown">
            <option>Add filter</option>
          </select>
          <input type="text" className="search-input" placeholder="Search..." />
        </div>

        <div className="student-list">
<<<<<<< HEAD
          <StudentList
            students={students}
=======
          <StudentList 
            students={students} 
>>>>>>> 3aeb5e3163d44bec325b0e3dc2f3a0eb6bfdae25
            onStudentClick={handleStudentClick}
          />
          <div className="pagination">
            {page > 1 ? <button onClick={handlePrevPage}>Prev</button> : <></>}
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>

      <StudentModal
        studentId={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveStudent}
        onDelete={handleDeleteStudent}
        faculties={faculties}
      />

      {isPopUpOpened && (
        <div className="popup-overlay" onClick={handleClosePopUp}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content__top-action">
              <h3>Thêm sinh viên</h3>
              <button className="popup-close-btn" onClick={handleClosePopUp}>
                X
              </button>
            </div>
            <div className="form-group">
              <div>
                <p>Tên</p>
                <input type="text" placeholder="Tên sinh viên" />
              </div>
              <div>
                <p>Ngày sinh</p>
                <input type="text" placeholder="Ngày sinh" />
              </div>
              <div>
                <p>SDT</p>
                <input type="text" placeholder="SDT" />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Giới tính</p>
                <select className="student-gt">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div>
                <p>Địa chỉ liên hệ</p>
                <input type="text" placeholder="Địa chỉ liên hệ" />
              </div>
              <div>
                <p>Địa chỉ Email</p>
                <input type="text" placeholder="Địa chỉ Email" />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>MSSV</p>
                <input type="text" placeholder="MSSV" />
              </div>
              <div>
                <p>Khoa</p>
                <select>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Khóa</p>
                <input type="text" placeholder="Khóa" />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Chương trình</p>
                <select>
                  <option value="">Chọn chương trình</option>
                </select>
              </div>
              <div className="student-status">
                <p>Tình trạng sinh viên</p>
                <select>
                  <option value="">Chọn tình trạng</option>
                </select>
              </div>
            </div>
            <button className="pop-up-add-student">Thêm</button>
          </div>
        </div>
      )}
    </>
function StudentManagement() {
  const students = [
    {
      name: "Eneh Mercy",
      id: "22120263",
      email: "michelle.rivera@example.com",
      khoa: "J SS 2",
      gender: "Female",
    },
    {
      name: "Cody Fisher",
      id: "547030",
      email: "tim.jennings@example.com",
      khoa: "SS 3",
      gender: "Female",
    },
  ];
  return (
    <div className="management-container">
      <div className="top-action">
        <p className="title">Danh sách sinh viên</p>
        <button className="add-btn">Add Student</button>
      </div>
      <div className="search-filter">
        <select className="filter-dropdown">
          <option>Add filter</option>
        </select>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      <div className="student-list">
        <StudentList students={students} />
      </div>
    </div>
  );
}

export default StudentManagement;
