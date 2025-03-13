import "./StudentManagement.css";
import StudentList from "./StudentList";
import React, { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import { getStudents, getFaculties, updateStudent, deleteStudent,getStudentById, getStudentByFullName, getStatuses,sortStudent} from "../services/api";

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [statuses,setStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);
  
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (searchText.trim() === "") {
          // Nếu không tìm kiếm nhưng có sort, thì gọi API sort
          if (sortField.trim() !== "") {
            const data = await sortStudent(sortField, sortOrder, page, 10);
            if (data) {
              setStudents(data.items);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          } else {
            // Nếu không có search và không có sort => lấy toàn bộ sinh viên
            const data = await getStudents(page, 10);
            if (data) {
              setStudents(data.items);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          }
        }
        // Nếu có tìm kiếm
        else {
          if (/^\d+$/.test(searchText)) {
            const data = await getStudentById(searchText, page, 10);
            if (data && data.items) {
              setStudents(data.items); 
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]); 
            }
          } else {
            const data = await getStudentByFullName(searchText, page, 10);
            if (data && data.items) {
              setStudents(data.items);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          }
        }
      } catch (error) {
        console.error("Error searching students:", error);
        setStudents([]);
      }
    }, 500); 
    
    return () => clearTimeout(delayDebounce);
  }, [searchText, page, sortField, sortOrder]); // ✅ Thêm dependencies để re-run khi sort thay đổi

  
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

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStatuses();
        console.log("Statuses data:", data); 
  
        if (Array.isArray(data)) {
          setStatuses(data); 
        }
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };
  
    fetchStatuses();
  }, []);


  const handleOpenPopUp = () => setIsPopUpOpened(true);
  const handleClosePopUp = () => setIsPopUpOpened(false);
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);
  
  const handleStudentClick = (student) => {
    setSelectedStudent(student.student_code);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveStudent = async (updatedStudent) => {
    try {
      await updateStudent(updatedStudent.id, updatedStudent);
      const updatedStudents = students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      handleModalClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);
      handleModalClose();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const handleSearchStudent = (event) => {
    setSearchText(event.target.value);
  };
  const handleSortStudent = (event) => {
    const selectedIndex = event.target.selectedIndex;
    switch (selectedIndex) {
      case 0: 
        setSortField("fullname");
        setSortOrder("asc");
        break;
      case 1: 
        setSortField("fullname");
        setSortOrder("desc");
        break;
      case 2: 
        setSortField("student_code");
        setSortOrder("asc");
        break;
      case 3: 
        setSortField("student_code");
        setSortOrder("desc");
        break;
      default:
        break;
    }
  };
  
  return (
    <>
      <div className={isPopUpOpened ? "blur-background" : "management-container"}>
        <div className="top-action">
          <p className="title">Student List</p>
          <button onClick={handleOpenPopUp} className="add-btn">Add Student</button>
        </div>
        <div className="search-filter">
        <select onChange={handleSortStudent} className="filter-dropdown">
          <option value="name-asc">Full Name A - Z</option>
          <option value="name-desc">Full Name Z - A</option>
          <option value="id-asc">Student ID Ascending</option>
          <option value="id-desc">Student ID Descending</option>
        </select>
          <input onChange={handleSearchStudent} type="text" className="search-input" placeholder="Search..." />
        </div>

        <div className="student-list">
          <StudentList 
            students={students} 
            onStudentClick={handleStudentClick}
          />
          <div className="pagination">
            {page > 1 ? <button onClick={handlePrevPage}>Prev</button> : <></>}
            <span>Page {page}</span>
            {page < totalPages? <button onClick={handleNextPage}>Next</button> : <></>}
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
              <h3>Add Student</h3>
              <button className="popup-close-btn" onClick={handleClosePopUp}>X</button>
            </div>
            <div className="form-group">
              <div>
                <p>Full Name</p>
                <input type="text" />
              </div>
              <div>
                <p>Date of Birth</p>
                <input type="text" placeholder="dd/mm/yyyy"/>
              </div>
              <div>
                <p>Phone Number</p>
                <input type="text" />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Gender</p>
                <select className="student-gt">
                  <option value="Nam">Male</option>
                  <option value="Nữ">Female</option>
                  <option value="Khác">Other</option>
                </select>
              </div>
              <div>
                <p>Contact Address</p>
                <input type="text" />
              </div>
              <div>
                <p>Email Address</p>
                <input type="text"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Student ID</p>
                <input type="text" />
              </div>
              <div>
                <p>Faculty</p>
                <select>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <p>Academy Year</p>
                <input type="text"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Program Type</p>
                <input type="text"/>
              </div>
              <div className="student-status">
                <p>Student Status</p>
                <select>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="pop-up-add-student">Thêm</button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentManagement;
