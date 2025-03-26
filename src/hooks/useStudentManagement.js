import { useState, useEffect, useCallback } from "react";
import {
  getStudents,
  updateStudent,
  deleteStudent,
  sortStudent,
  searchStudentByID,
  createAStudent,
  getStudentByNameAndFacutly,
} from "../services/studentManagementService";

export const useStudentManagement = (faculties) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");

  const getTotalPages = (total, pageSize) => Math.ceil(total / pageSize);

  const fetchStudents = useCallback(async () => {
    try {
      let data;
      if (/^\d+$/.test(searchText)) {
        data = await searchStudentByID(searchText, page, 10);
      } else if (facultyFilter.trim() !== "" || searchText.trim() !== "") {
        data = await getStudentByNameAndFacutly(
          searchText,
          page,
          10,
          facultyFilter
        );
      } else if (sortField.trim() !== "") {
        data = await sortStudent(sortField, sortOrder, page, 10);
      } else {
        data = await getStudents(page, 10);
      }

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
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  }, [searchText, page, sortField, sortOrder, facultyFilter, faculties]);

  const handleAddStudent = async (newStudent) => {
    try {
      const response = await createAStudent(newStudent);
      if (response.code === 200) {
        await fetchStudents();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding student:", error);
      return false;
    }
  };

  const handleUpdateStudent = async (studentId, updatedStudent) => {
    try {
      const response = await updateStudent(studentId, updatedStudent);
      if (response && response.code === 200) {
        await fetchStudents();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating student:", error);
      return false;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await deleteStudent(studentId);
      if (response && response.code === 200) {
        await fetchStudents();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting student:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    page,
    totalPages,
    searchText,
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
  };
};
