import "./StudentManagement.css";
import StudentList from "./StudentList";
import { useState, useEffect } from "react";
import StudentModal from "./StudentModal";
import {
  getStudents,
  getFaculties,
  updateStudent,
  deleteStudent,
  getStudentByFullName,
  getStatuses,
  sortStudent,
  searchStudentByID,
  createAStudent,
} from "../services/studentManagementService";

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [newStudent, setNewStudent] = useState({
    fullname: "",
    date_of_birth: "",
    phone: "",
    gender: "",
    address: "",
    email: "",
    student_code: "",
    faculty_id: "",
    batch: "",
    program: "",
    status_id: "",
    user_id: "",
  });

  // Hàm tính tổng số trang
  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);

  // useEffect để tìm kiếm và sắp xếp sinh viên
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (searchText.trim() === "") {
          // Nếu không tìm kiếm nhưng có sort, thì gọi API sort
          if (sortField.trim() !== "") {
            const data = await sortStudent(sortField, sortOrder, page, 10);
            if (data) {
              const studentsWithFacultyName = data.items.map((student) => {
                const faculty = faculties.find(
                  (faculty) => faculty.id === student.faculty_id
                );
                return {
                  ...student,
                  faculty_name: faculty ? faculty.name : "Unknown",
                };
              });
              setStudents(studentsWithFacultyName);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          } else {
            // Nếu không có search và không có sort => lấy toàn bộ sinh viên
            const data = await getStudents(page, 10);
            if (data) {
              const studentsWithFacultyName = data.items.map((student) => {
                const faculty = faculties.find(
                  (faculty) => faculty.id === student.faculty_id
                );
                return {
                  ...student,
                  faculty_name: faculty ? faculty.name : "Unknown",
                };
              });
              setStudents(studentsWithFacultyName);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          }
        }
        // Nếu có tìm kiếm
        else {
          if (/^\d+$/.test(searchText)) {
            const data = await searchStudentByID(searchText, page, 10);
            if (data && data.items) {
              const studentsWithFacultyName = data.items.map((student) => {
                const faculty = faculties.find(
                  (faculty) => faculty.id === student.faculty_id
                );
                return {
                  ...student,
                  faculty_name: faculty ? faculty.name : "Unknown",
                };
              });
              setStudents(studentsWithFacultyName);
              setTotalPages(getTotalPages(data.total, 10));
            } else {
              setStudents([]);
            }
          } else {
            const data = await getStudentByFullName(searchText, page, 10);
            if (data && data.items) {
              const studentsWithFacultyName = data.items.map((student) => {
                const faculty = faculties.find(
                  (faculty) => faculty.id === student.faculty_id
                );
                return {
                  ...student,
                  faculty_name: faculty ? faculty.name : "Unknown",
                };
              });
              setStudents(studentsWithFacultyName);
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
  }, [searchText, page, sortField, sortOrder, faculties]);

  // useEffect để lấy danh sách khoa
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

  // useEffect để lấy danh sách trạng thái
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

  // Các hàm xử lý sự kiện
  const handleOpenPopUp = () => setIsPopUpOpened(true);
  const handleClosePopUp = () => setIsPopUpOpened(false);
  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);

  const handleStudentClick = (student) => {
    setSelectedStudent(String(student.id));
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
          const studentsWithFacultyName = data.items.map((student) => {
            const faculty = faculties.find(
              (faculty) => faculty.id === student.faculty_id
            );
            return {
              ...student,
              faculty_name: faculty ? faculty.name : "Unknown",
            };
          });
          setStudents(studentsWithFacultyName);
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
          const studentsWithFacultyName = data.items.map((student) => {
            const faculty = faculties.find(
              (faculty) => faculty.id === student.faculty_id
            );
            return {
              ...student,
              faculty_name: faculty ? faculty.name : "Unknown",
            };
          });
          setStudents(studentsWithFacultyName);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("user_id");
    if (currentUser) {
      setNewStudent((prev) => ({
        ...prev,
        user_id: currentUser,
      }));
    }

    // Đặt giá trị mặc định cho gender nếu chưa có giá trị
    if (!newStudent.gender) {
      setNewStudent((prev) => ({
        ...prev,
        gender: "Male", // Đặt giá trị mặc định là tùy chọn đầu tiên
      }));
    }

    // Đặt giá trị mặc định cho faculty_id nếu chưa có giá trị
    if (faculties.length > 0 && !newStudent.faculty_id) {
      setNewStudent((prev) => ({
        ...prev,
        faculty_id: faculties[0].id, // Đặt giá trị mặc định là tùy chọn đầu tiên
      }));
    }

    // Đặt giá trị mặc định cho status_id nếu chưa có giá trị
    if (statuses.length > 0 && !newStudent.status_id) {
      setNewStudent((prev) => ({
        ...prev,
        status_id: statuses[0].id, // Đặt giá trị mặc định là tùy chọn đầu tiên
      }));
    }
  }, [faculties, statuses]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddStudent = async () => {
    console.log(localStorage.getItem("user_id"));
    console.log(newStudent);
    // Kiểm tra các trường bắt buộc
    const requiredFields = [
      "fullname",
      "date_of_birth",
      "phone",
      "gender",
      "address",
      "email",
      "student_code",
      "faculty_id",
      "batch",
      "program",
      "status_id",
      "user_id",
    ];

    const missingFields = requiredFields.filter((field) => !newStudent[field]);

    if (missingFields.length > 0) {
      alert(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    // Validate email
    if (!validateEmail(newStudent.email)) {
      alert("Invalid email address");
      return;
    }

    const studentData = {
      ...newStudent,
    };

    try {
      const response = await createAStudent(studentData);
      console.log("Add student response:", response);
      if (response.code === 200) {
        // Refresh the student list
        const data = await getStudents(page, 10);
        if (data) {
          const studentsWithFacultyName = data.items.map((student) => {
            const faculty = faculties.find(
              (faculty) => faculty.id === student.faculty_id
            );
            return {
              ...student,
              faculty_name: faculty ? faculty.name : "Unknown",
            };
          });
          setStudents(studentsWithFacultyName);
          setTotalPages(data.total_pages || 1);
        }
        alert("Student added successfully");
        handleClosePopUp();
      } else {
        console.error(
          "Add student failed:",
          response?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error in handleAddStudent:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
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
          <select onChange={handleSortStudent} className="filter-dropdown">
            <option value="name-asc">Full Name A - Z</option>
            <option value="name-desc">Full Name Z - A</option>
            <option value="id-asc">Student ID Ascending</option>
            <option value="id-desc">Student ID Descending</option>
          </select>
          <input
            onChange={handleSearchStudent}
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>

        <div className="student-list">
          <StudentList
            students={students}
            onStudentClick={handleStudentClick}
          />
          <div className="pagination">
            {page > 1 ? <button onClick={handlePrevPage}>Prev</button> : <></>}
            <span>Page {page}</span>
            {page < totalPages ? (
              <button onClick={handleNextPage}>Next</button>
            ) : (
              <></>
            )}
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
              <button className="popup-close-btn" onClick={handleClosePopUp}>
                X
              </button>
            </div>
            <div className="form-group">
              <div>
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={newStudent.fullname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p>Date of Birth</p>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="date_of_birth"
                  value={newStudent.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p>Phone Number</p>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={newStudent.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Gender</p>
                <select
                  className="student-gt"
                  name="gender"
                  value={newStudent.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <p>Contact Address</p>
                <input
                  type="text"
                  placeholder="Contact Address"
                  name="address"
                  value={newStudent.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p>Email Address</p>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Student ID</p>
                <input
                  type="text"
                  placeholder="Student ID"
                  name="student_code"
                  value={newStudent.student_code}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p>Faculty</p>
                <select
                  name="faculty_id"
                  value={newStudent.faculty_id}
                  onChange={handleInputChange}
                >
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Batch</p>
                <input
                  type="text"
                  placeholder="Batch"
                  name="batch"
                  value={newStudent.batch}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Program</p>
                <input
                  type="text"
                  placeholder="Program"
                  name="program"
                  value={newStudent.program}
                  onChange={handleInputChange}
                />
              </div>
              <div className="student-status">
                <p>Student Status</p>
                <select
                  name="status_id"
                  value={newStudent.status_id}
                  onChange={handleInputChange}
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="pop-up-add-student" onClick={handleAddStudent}>
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentManagement;
