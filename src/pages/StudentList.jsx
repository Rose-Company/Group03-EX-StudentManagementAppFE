import "./StudentManagement.css";
import PropTypes from "prop-types";

function StudentList({ students }) {
  const handleDeleteStudent = (studentName) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa ${studentName}?`);
    if (isConfirmed) {
      alert(`Đã xóa ${studentName} thành công!`);
      // TODO: Gọi API để xóa sinh viên
    }
  };

  return (
    <div className="student-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Email address</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_code} className="highlight-row">
              <td className="student-name">
              <button className="student-avatar">
              {student.fullname.split(" ").map(word => word[0]).join("").toUpperCase()}
            </button>
                {student.fullname}
              </td>
              <td>{student.student_code}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.gender}</td>
              <td></td>
              <td>
                <button className="student-edit">
                <i className='bx bx-show'></i>
                </button>
                <button className="student-edit">
                  <i className="bx bx-message-square-edit"></i>
                </button>
                <button onClick={() => handleDeleteStudent(student.fullname)} className="student-delete">
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
      student_code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      gender: PropTypes.string,
    })
  ).isRequired,
};
export default StudentList;
