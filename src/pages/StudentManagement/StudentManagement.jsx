import { useState } from "react";
import styles from "./StudentManagement.module.css";
import Table from "../../components/Table/Table";
import StudentModal from "../../components/Student/StudentModal";
import AddStudentPopUp from "../../components/Student/AddStudentPopup";
import UploadModal from "../../components/Student/UploadModal";
import ExportModal from "../../components/Student/ExportModal";
import StudentActionButtons from "../../components/Student/StudentActionButtons";
import StudentSearchFilter from "../../components/Student/StudentSearchFilter";
import StudentPagination from "../../components/Student/StudentPagination";

import { useFacultyData } from "../../hooks/useFacultyData";
import { useStatusData } from "../../hooks/useStatusData";
import { useStudentManagement } from "../../hooks/useStudentManagement";

function StudentManagement() {
  // Fetch faculties and statuses
  const { faculties } = useFacultyData();
  const { statuses } = useStatusData();

  // Student management hook
  const {
    students,
    page,
    totalPages,
    sortField,
    sortOrder,
    facultyFilter,
    setPage,
    setSearchText,
    setSortField,
    setSortOrder,
    setFacultyFilter,
    handleAddStudent,
    handleUpdateStudent,
    handleDeleteStudent,
  } = useStudentManagement(faculties);

  // Local state for modals and UI
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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

  // Event Handlers
  const handleOpenPopUp = () => setIsPopUpOpened(true);
  const handleClosePopUp = () => setIsPopUpOpened(false);
  const handleOpenFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleStudentClick = (student) => {
    setSelectedStudent(String(student.id));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const studentColumns = [
    { key: "fullname", label: "Name" },
    { key: "student_code", label: "Student ID" },
    { key: "email", label: "Email Address" },
    { key: "faculty_name", label: "Faculty" },
    { key: "gender", label: "Gender" },
  ];

  return (
    <>
      <div
        className={
          isPopUpOpened ? styles.blurBackground : styles.managementContainer
        }
      >
        <StudentActionButtons
          onOpenPopUp={handleOpenPopUp}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        <StudentSearchFilter
          isFilterOpen={isFilterOpen}
          onOpenFilter={handleOpenFilter}
          onSearchStudent={(e) => setSearchText(e.target.value)}
          onSortChange={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
          onFacultyFilterChange={(facultyName) => setFacultyFilter(facultyName)}
          sortField={sortField}
          sortOrder={sortOrder}
          facultyFilter={facultyFilter}
          faculties={Array.isArray(faculties) ? faculties : []}
          onClearFilters={() => {
            setSortField("");
            setSortOrder("");
            setFacultyFilter("");
            setIsFilterOpen(false);
          }}
        />

        <div className={styles.studentList}>
          <Table
            columns={studentColumns}
            data={students}
            onRowClick={handleStudentClick}
          />
          <StudentPagination
            page={page}
            totalPages={totalPages}
            onPrevPage={() => setPage(page - 1)}
            onNextPage={() => setPage(page + 1)}
          />
        </div>
      </div>

      <StudentModal
        studentId={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleUpdateStudent}
        onDelete={handleDeleteStudent}
        faculties={Array.isArray(faculties) ? faculties : []}
      />

      {isPopUpOpened && (
        <AddStudentPopUp
          isOpen={isPopUpOpened}
          onClose={handleClosePopUp}
          onCreate={() => {
            const success = handleAddStudent(newStudent);
            if (success) handleClosePopUp();
          }}
          newStudent={newStudent}
          onInputChange={(e) => {
            const { name, value } = e.target;
            setNewStudent((prev) => ({ ...prev, [name]: value }));
          }}
          faculties={faculties}
          statuses={statuses}
        />
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
}

export default StudentManagement;
