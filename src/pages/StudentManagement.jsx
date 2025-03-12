import "./StudentManagement.css";
import StudentList from "./StudentList";
function StudentManagement() {
  const students = [
    {
      name: "Eneh Mercy",
      id: "22120263",
      email: "michelle.rivera@example.com",
      khoa: "J SS 2",
      gender: "Female",
    },
    {
      name: "Cody Fisher",
      id: "547030",
      email: "tim.jennings@example.com",
      khoa: "SS 3",
      gender: "Female",
    },
  ];
  return (
    <div className="management-container">
      <div className="top-action">
        <p className="title">Danh sách sinh viên</p>
        <button className="add-btn">Add Student</button>
      </div>
      <div className="search-filter">
        <select className="filter-dropdown">
          <option>Add filter</option>
        </select>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      <div className="student-list">
        <StudentList students={students} />
      </div>
    </div>
  );
}

export default StudentManagement;
