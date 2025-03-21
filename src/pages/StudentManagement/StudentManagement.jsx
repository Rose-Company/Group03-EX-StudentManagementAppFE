import styles from "./StudentManagement.module.css";
import { useState, useEffect } from "react";
import StudentList from "../../components/Student/StudentList";
import StudentModal from "../../components/Student/StudentModal";
import AddStudentPopUp from "../../components/Student/AddStudentPopup";
import {
  getStudents,
  getFaculties,
  updateStudent,
  deleteStudent,
  getStatuses,
  sortStudent,
  searchStudentByID,
  createAStudent,
  getStudentByNameAndFacutly
} from "../../services/studentManagementService";

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const createAddress = () => ({
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
  });
  
  const createDocument = () => ({
    id: "",
    document_number: "",
    issue_date: "",
    issue_place: "",
    expiry_date: "",
    country_of_issue: "",
    has_chip: false,
    notes: null,
  });
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
  
    // Địa chỉ
    permanent_address: createAddress(),
    temp_address: createAddress(),
    mailing_address: createAddress(),
  
    // Giấy tờ tùy thân
    cccd: createDocument(),
    cmnd: createDocument(),
    passPort: createDocument(),
  });
  // Hàm tính tổng số trang
  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);


  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        //Trường hợp tìm kiếm
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
        }
        //Trường hợp tìm kiếm theo khoa hoặc theo tên
        else if (facultyFilter.trim() !== "" || searchText.trim() !== "") {
          const data = await getStudentByNameAndFacutly(searchText, page, 10, facultyFilter);
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
      } catch (error) {
        console.error("Error searching students:", error);
        setStudents([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, page, facultyFilter]);

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


  const handleFilterByFaculty = (e) => {
    //chỗ này đổi thành set theo tên khoa chứ ko phải khoa id
    setFacultyFilter(e.target.value);
    console.log("Selected Faculty ID: ", facultyFilter);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputAddressChange = (e, addressType) => {
    const { name, value } = e.target;

    setNewStudent((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));
  };
  const handleInputDocumentChange = (e, documentType) => {
    const { name, value } = e.target;

    setNewStudent((prev) => ({
      ...prev,
      [documentType]: {
        ...prev[documentType],
        [name]: value,
      },
    }));
  };
  const handleOpenFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  }

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
        className={
          isPopUpOpened ? styles.blurBackground : styles.managementContainer
        }
      >
        <div className={styles.topAction}>
          <p className={styles.title}>Student List</p>
          <button onClick={handleOpenPopUp} className={styles.addBtn}>
            Add Student
          </button>
        </div>

        <div className={styles.searchFilter}>
          <input
            onChange={handleSearchStudent}
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
          />
          <button onClick={handleOpenFilter} className={styles.filterDrop}>
            <i className='bx bx-filter-alt'></i>
          </button>
          {isFilterOpen && (
            <div className={styles.filterPopup}>
              <div className={styles.filterSection}>
                <h4>Sort by</h4>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value="name-asc"
                      checked={sortField === "fullname" && sortOrder === "asc"}
                      onChange={() => {
                        setSortField("fullname");
                        setSortOrder("asc");
                      }}
                    />
                    Name (A-Z)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value="name-desc"
                      checked={sortField === "fullname" && sortOrder === "desc"}
                      onChange={() => {
                        setSortField("fullname");
                        setSortOrder("desc");
                      }}
                    />
                    Name (Z-A)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value="id-asc"
                      checked={sortField === "student_code" && sortOrder === "asc"}
                      onChange={() => {
                        setSortField("student_code");
                        setSortOrder("asc");
                      }}
                    />
                    Student ID (Ascending)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value="id-desc"
                      checked={sortField === "student_code" && sortOrder === "desc"}
                      onChange={() => {
                        setSortField("student_code");
                        setSortOrder("desc");
                      }}
                    />
                    Student ID (Descending)
                  </label>
                </div>
              </div>

              <div className={styles.filterSection}>
                <h4>Faculty</h4>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="faculty"
                      value=""
                      checked={facultyFilter === ""}
                      onChange={handleFilterByFaculty}
                    />
                    All Faculties
                  </label>
                  {faculties.map((faculty) => (
                    <label key={faculty.id}>
                      <input
                        type="radio"
                        name="faculty"
                        value={faculty.name}
                        checked={facultyFilter === faculty.name}
                        onChange={handleFilterByFaculty}
                      />
                      {faculty.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterActions}>
                <button
                  className={styles.clearFilterBtn}
                  onClick={() => {
                    setSortField("");
                    setSortOrder("");
                    setFacultyFilter("");
                    setIsFilterOpen(false);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>


        <div className={styles.studentList}>
          <StudentList
            students={students}
            onStudentClick={handleStudentClick}
          />
          <div className={styles.pagination}>
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
        <AddStudentPopUp
          isOpen={isPopUpOpened}
          onClose={handleClosePopUp}
          onCreate={handleAddStudent}
          newStudent={newStudent}
          onInputChange={handleInputChange}
          onInputAddressChange={handleInputAddressChange}
          onInputDocumentChange={handleInputDocumentChange}
          faculties={faculties}
          statuses={statuses}
        />
      )}
    </>
  );
}

export default StudentManagement;
