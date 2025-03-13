import "./StudentManagement.css";
import StudentList from "./StudentList";
import React, { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import { getStudents, getFaculties, updateStudent, deleteStudent,getStudentById, getStudentByFullName, getStatuses} from "../services/api";

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [status,setStatus] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (searchText.trim() === "") {
          const data = await getStudents(page, 10);
          if (data) {
            setStudents(data.items);
            setTotalPages(getTotalPages(data.total, 10));
          } else {
            setStudents([]);
          }
        } else {
          if (/^\d+$/.test(searchText)) {
            const data = await getStudentById(searchText, page, 10);
            if (data && data.items) {
              setStudents(data.items); 
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]); 
            }
          } else {
            const data = await getStudentByFullName(searchText,page,10);
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
  }, [searchText, page]); 
  
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
    const fetchFaculties = async () => {
      try {
        const data = await getStatuses();
        if (data.code === 200) {
          setStatus(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching statuses:", error);
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
  
  return (
    <>
      <div className={isPopUpOpened ? "blur-background" : "management-container"}>
        <div className="top-action">
          <p className="title">Student List</p>
          <button onClick={handleOpenPopUp} className="add-btn">Add Student</button>
        </div>
        <div className="search-filter">
          <select className="filter-dropdown">
            <option>Add filter</option>
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
              <h3>Thêm sinh viên</h3>
              <button className="popup-close-btn" onClick={handleClosePopUp}>X</button>
            </div>
            <div className="form-group">
              <div>
                <p>Tên</p>
                <input type="text" placeholder="Tên sinh viên"/>
              </div>
              <div>
                <p>Ngày sinh</p>
                <input type="text" placeholder="Ngày sinh"/>
              </div>
              <div>
                <p>SDT</p>
                <input type="text" placeholder="SDT"/>
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
                <input type="text" placeholder="Địa chỉ liên hệ"/>
              </div>
              <div>
                <p>Địa chỉ Email</p>
                <input type="text" placeholder="Địa chỉ Email"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>MSSV</p>
                <input type="text" placeholder="MSSV"/>
              </div>
              <div>
                <p>Khoa</p>
                <select>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <p>Khóa</p>
                <input type="text" placeholder="Khóa"/>
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
  );
}

export default StudentManagement;
