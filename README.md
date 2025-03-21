# Exercise 1 + 2: Student Management System

## 📌 Giới thiệu

Dự án này được xây dựng bằng **ReactJS** với mục tiêu hiển thị giao diện quản lý sinh viên một cách đơn giản.  
Dự án sử dụng **React Router, Axios, vite** để tối ưu hóa trải nghiệm người dùng.

Một số màn hình của app: https://drive.google.com/drive/folders/1P-8liODDr7JbQ5q_wrI-3WQLFU9IXwrQ?usp=drive_link

**Các chức năng đã làm**:
1. **Thêm sinh viên mới**: Nhập thông tin của một sinh viên và lưu vào danh sách.
2. **Xóa sinh viên**: Xóa thông tin sinh viên dựa trên Mã số sinh viên (MSSV).
3. **Cập nhật thông tin sinh viên**: Cập nhật thông tin của sinh viên dựa trên MSSV.
4. **Tìm kiếm sinh viên**: Tìm kiếm sinh viên theo họ tên hoặc MSSV.
5. Cho phép đổi tên & thêm mới: khoa, tình trạng sinh viên, chương trình
6. Thêm chức năng tìm kiếm:  tìm theo khoa, khoa + tên
7. Hỗ trợ import/export dữ liệu: CSV, JSON, XML, Excel (chọn ít nhất 2)
8 Thêm logging mechanism để troubleshooting production issue & audit purposes

**Ảnh minh họa về app**: https://drive.google.com/drive/folders/1P-8liODDr7JbQ5q_wrI-3WQLFU9IXwrQ?usp=sharing

---

## 📂 Cấu trúc source code

Dự án có cấu trúc thư mục như sau:
<pre>
Group03-EX-StudentManagementAppFE/
├── public/                           # Static assets
│   └── images/                       # Image files
├── src/                              # Source code
│   ├── assets/                       # Static resources
│   │   └── react.svg                 # React logo
│   ├── components/                   # Reusable components
│   │   ├── Button/                   # Button component
│   │   │   └── Button.jsx            # Button implementation
│   │   ├── Header/                   # Header component
│   │   │   ├── Header.jsx            # Header implementation
│   │   │   └── Header.module.css     # Header styles
│   │   ├── Student/                  # Student components
│   │   │   ├── AddStudentPopup.jsx   # Add student popup
│   │   │   ├── AddStudentPopup.module.css # Popup styles
│   │   │   ├── StudentForm.jsx       # Student form
│   │   │   ├── StudentList.jsx       # Student list
│   │   │   ├── StudentModal.jsx      # Student modal
│   │   │   └── StudentModal.module.css # Modal styles
│   │   ├── index.js                  # Components barrel file
│   │   ├── Input.jsx                 # Input component
│   │   ├── ProtectedRoute.jsx        # Route protection
│   │   ├── Spinner.jsx               # Loading spinner
│   │   └── Toast.jsx                 # Toast notifications
│   ├── pages/                        # Application pages
│   │   ├── About/                    # About page
│   │   │   ├── About.jsx             # About implementation
│   │   │   └── About.css             # About styles
│   │   ├── Home/                     # Home page
│   │   │   ├── Home.jsx              # Home implementation
│   │   │   └── Home.css              # Home styles
│   │   ├── Login/                    # Login page
│   │   │   ├── Login.jsx             # Login implementation
│   │   │   └── Login.module.css      # Login styles
│   │   ├── StudentManagement/        # Student management page
│   │   │   ├── StudentManagement.jsx # Student management implementation
│   │   │   └── StudentManagement.module.css # Student management styles
│   ├── services/                     # API services
│   │   ├── api.js                    # API configuration
│   │   ├── authService.js            # Auth service
│   │   └── studentManagement.js      # Student management service
│   ├── App.jsx                       # Main App component
│   ├── App.css                       # App-specific styles
│   ├── index.css                     # Global styles
│   └── main.jsx                      # App entry point
├── .eslintrc.cjs                     # ESLint configuration
├── .gitignore                        # Git ignore file
├── index.html                        # HTML entry point
├── package-lock.json                 # Lock file for dependencies
├── package.json                      # Project dependencies
├── README.md                         # Frontend documentation
└── vite.config.js                    # Vite configuration
</pre>
### Môi trường chạy dự án: Node.js v20.14.0

https://nodejs.org/download/release/v20.14.0/

Các bước cài đặt: (chế độ development)

1. clone code: git clone https://github.com/Rose-Company/Group03-EX-StudentManagementAppFE.git
2. cài đặt thư viện: npm i
3. Chạy dự án: npm run dev

===

Cách chạy tại chế độ production:

1. clone code: git clone https://github.com/Rose-Company/Group03-EX-StudentManagementAppFE.git
2. cài đặt thư viện: npm i
3. Build dự án: npm run build
4. Chạy dự án: npm run preview
