import "./StudentManagement.css";
import StudentList from "./StudentList";
import React, { useState, useEffect } from "react";

function StudentManagement() {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [page,setPage]=useState(1);
  // const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [students,setStudents] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/v1/students?page=${page}&page_size=10`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNzQxODQ3NzA5LCJpZCI6IjhhMGY3YTg5LWNhYzctNDhiMy04ZjZlLWNkYjE3ODZmYTk1MyIsInJvbGUiOiJhMWIyYzNkNC1lNWY2LTQ3YTgtYjljMC1kMWUyZjNhNGI1YzYifQ.ptvI5Wuudds5_XdZH-9HDmWaDBSErp6xSAbj6sHgSR8'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); 
        if (data) {
          setStudents(data.items);
          setTotalPages(data.total_pages || 1);
        }
      })
      .catch(error => console.error("Error fetching students:", error));
  }, [page]);

  useEffect(() => {
    fetch("http://localhost:8080/v1/faculties")
      .then((response) => response.json())
      .then((data) => { 
        if (data.code === 200) {
          setFaculties(data.data.items);
        }
      })
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  const handleOpenPopUp = () => setIsPopUpOpened(true);
  const handleClosePopUp = () => setIsPopUpOpened(false);
  const handlePrevPage = () => setPage(page-1);
  const handleNextPage = () => setPage(page+1);
  

  return (
    <>
      <div className={isPopUpOpened ? "blur-background" : "management-container"}>
        <div className="top-action">
          <p className="title">Student List</p>
          <button onClick={handleOpenPopUp} className="add-btn">Add Student</button>
        </div>
        <div className="search-filter">
          <select className="filter-dropdown">
            <option>Add filter</option>
          </select>
          <input type="text" className="search-input" placeholder="Search..." />
        </div>

        <div className="student-list">
            <StudentList students={students} />
            <div className="pagination">
              {page >1  ?<button onClick={handlePrevPage}>Prev</button>:<></>}
              <span>Page {page}</span>
              <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
      </div>
      {isPopUpOpened && (
        <div className="popup-overlay" onClick={handleClosePopUp}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content__top-action">
              <h3>Thêm sinh viên</h3>
              <button className="popup-close-btn" onClick={handleClosePopUp}>X</button>
            </div>
            <div className="form-group">
              <div>
                <p>Tên</p>
                <input type="text" placeholder="Tên sinh viên"/>
              </div>
              <div>
                <p>Ngày sinh</p>
                <input type="text" placeholder="Ngày sinh"/>
              </div>
              <div>
                <p>SDT</p>
                <input type="text" placeholder="SDT"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Giới tính</p>
                <select className="student-gt">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div>
                <p>Địa chỉ liên hệ</p>
                <input type="text" placeholder="Địa chỉ liên hệ"/>
              </div>
              <div>
                <p>Địa chỉ Email</p>
                <input type="text" placeholder="Địa chỉ Email"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>MSSV</p>
                <input type="text" placeholder="MSSV"/>
              </div>
              <div>
                <p>Khoa</p>
                <select>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <p>Khóa</p>
                <input type="text" placeholder="Khóa"/>
              </div>
            </div>
            <div className="form-group">
              <div>
                <p>Chương trình</p>
                <select>
                  <option value="">Chọn chương trình</option>
                </select>
              </div>
              <div className="student-status">
                <p>Tình trạng sinh viên</p>
                <select>
                  <option value="">Chọn tình trạng</option>
                </select>
              </div>
            </div>
            <button className="pop-up-add-student">Thêm</button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentManagement;
