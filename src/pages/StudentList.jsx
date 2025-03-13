import "./StudentManagement.css";
import PropTypes from "prop-types";

function StudentList({ students, onStudentClick }) {
  if (students.length === 0) {
    return (
      <div className="empty-list">
        <img
          src="/images/list_empty.png"
          alt="empty"
          className="empty-list__img"
        />
        <p className="empty-list__title">There is no students!</p>
      </div>
    );
  }
  return (
    <div className="student-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email address</th>
            <th>Faculty</th>
            <th>Gender</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.student_code}
              className="highlight-row"
              onClick={() => onStudentClick(student)}
              style={{ cursor: "pointer" }}
            >
              <td className="student-name">
                <button className="student-avatar">
                  {student.fullname
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </button>
                {student.fullname}
              </td>
              <td>{student.id}</td>
              <td>{student.email}</td>
              <td>{student.faculty_id}</td>
              <td>{student.gender}</td>
              <td></td>
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
