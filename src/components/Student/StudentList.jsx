// src/components/Student/StudentList.jsx
import PropTypes from "prop-types";
import styles from "../../pages/StudentManagement/StudentManagement.module.css";

function StudentList({ students, onStudentClick }) {
  if (students.length === 0) {
    return (
      <div className={styles.emptyList}>
        <img
          src="/images/list_empty.png"
          alt="empty"
          className={styles.emptyListImg}
        />
        <p className={styles.emptyListTitle}>There is no students!</p>
      </div>
    );
  }

  return (
    <div className={styles.studentTable}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email address</th>
            <th>Faculty</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className={styles.highlightRow}
              onClick={() => onStudentClick(student)}
              style={{ cursor: "pointer" }}
            >
              <td className={styles.studentName}>
                <button className={styles.studentAvatar}>
                  {student.fullname
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </button>
                {student.fullname}
              </td>
              <td>{student.student_code}</td>
              <td>{student.email}</td>
              <td>{student.faculty_name}</td>
              <td>{student.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      student_code: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string,
      faculty_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      phone: PropTypes.string,
      gender: PropTypes.string,
    })
  ).isRequired,
  onStudentClick: PropTypes.func.isRequired,
};

export default StudentList;
