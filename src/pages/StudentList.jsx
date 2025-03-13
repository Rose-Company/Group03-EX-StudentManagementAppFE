import "./StudentManagement.css";
import PropTypes from "prop-types";

function StudentList({ students, onStudentClick }) {
  const handleDeleteStudent = (studentName) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa ${studentName}?`
    );
    if (isConfirmed) {
      alert(`Đã xóa ${studentName} thành công!`);
      // TODO: Gọi API để xóa sinh viên
    }
  };
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
              <td>
                <button 
                  className="student-show"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onStudentClick(student);
                  }}
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="student-edit"
                  onClick={() => onStudentClick(student)}
                >
                  <i className="bx bx-show"></i>
                </button>

                <button className="student-edit">
                  <i className="bx bx-message-square-edit"></i>
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.fullname)}
                  className="student-delete"
                >
                  <i className="bx bx-message-square-x"></i>
                </button>
              </td>
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
