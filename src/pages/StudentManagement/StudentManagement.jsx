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
  getStudentByFullName,
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
    nationality: "Vietnamese",
    // Địa chỉ (3 loại)
    addresses: [
      {
        address_type: "Permanent",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "Vietnam",
      },
      {
        address_type: "Temporary",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "Vietnam",
      },
      {
        address_type: "Mailing",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "Vietnam",
      }
    ],

    // Giấy tờ tùy thân (3 loại)
    id_documents: [
      {
        id: "",
        document_type: "CCCD",
        document_number: "",
        issue_date: "",
        issue_place: "",
        expiry_date: "",
        country_of_issue: "Vietnam",
        has_chip: false,
        notes: null,
      },
      {
        id: "",
        document_type: "CMND",
        document_number: "",
        issue_date: "",
        issue_place: "",
        expiry_date: "",
        country_of_issue: "Vietnam",
        has_chip: false,
        notes: null,
      },
      {
        id: "",
        document_type: "Passpory",
        document_number: "",
        issue_date: "",
        issue_place: "",
        expiry_date: "",
        country_of_issue: "Vietnam",
        has_chip: false,
        notes: null,
      }
    ]
  });

  // Hàm tính tổng số trang
  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);


  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        //Trường hợp tìm kiếm theo student ID
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

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (searchText.trim() === "") {
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
  const handleFilterByFaculty = (e) => {
    setFacultyFilter(e.target.value);
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
      addresses: prev.addresses.map((address) =>
        address.address_type === addressType
          ? { ...address, [name]: value }
          : address
      ),
    }));
  };
  const handleInputDocumentChange = (e, docType) => {
    const { name, value } = e.target;

    setNewStudent((prev) => ({
      ...prev,
      id_documents: prev.id_documents.map((document) =>
        document.document_type === docType
          ? { ...document, [name]: value }
          : document
      ),
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
      "document_type",
      "document_number",
      "issue_date",
      "issue_expiry",
      "issue_place",

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
          <button onClick={handleOpenFilter} className={styles.filterDrop}>
            <i className='bx bx-filter-alt'></i>
          </button>
          <input
            onChange={handleSearchStudent}
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
          />

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
          faculties={faculties}
          statuses={statuses}
        />
      )}
    </>
  );
}

export default StudentManagement;
