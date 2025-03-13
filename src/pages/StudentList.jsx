import "./StudentManagement.css";
import PropTypes from "prop-types";

function StudentTable({ students }) {
  if (students.length === 0) {
    return (
      <div className="empty-list">
        <img
          src="/images/list_empty.png"
          alt="empty"
          className="empty-list__img"
        />
        <p className="empty-list__title">Không có thông tin sinh viên nào!</p>
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
            <th>Khoa</th>
            <th>Gender</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className={index === students.length - 1 ? "highlight-row" : ""}
            >
              <td className="student-name">
                <img
                  src="/images/avatar.png"
                  alt="avatar"
                  className="student-avatar"
                />
                {student.name}
              </td>
              <td>{student.id}</td>
              <td>{student.email}</td>
              <td>{student.khoa}</td>
              <td>{student.gender}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

StudentTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      khoa: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentTable;
