# Exercise 1: Student Management System

## 📌 Giới thiệu

Dự án này được xây dựng bằng **ReactJS** với mục tiêu hiển thị giao diện quản lý sinh viên một cách đơn giản.  
Dự án sử dụng **React Router, Axios, vite** để tối ưu hóa trải nghiệm người dùng.

---

## 📂 Cấu trúc source code

Dự án có cấu trúc thư mục như sau:

📁 public/
Thư mục này chứa các file tĩnh, không cần xử lý bởi React. Các file trong thư mục này có thể được truy cập trực tiếp từ trình duyệt. File quan trọng nhất trong thư mục này là index.html, đây là file HTML gốc mà React sẽ sử dụng để render ứng dụng.

📁 src/
Thư mục này chứa toàn bộ mã nguồn của ứng dụng React.

Trong đó bao gồm:

📁 assets/
Thư mục này chứa các tài nguyên tĩnh như hình ảnh, biểu tượng, font chữ và các file CSS/SCSS toàn cục. Những tài nguyên này được sử dụng để hỗ trợ giao diện người dùng và không thay đổi thường xuyên.

📁 components/
Thư mục này chứa các component tái sử dụng. Các component này được thiết kế để có thể sử dụng lại ở nhiều nơi trong ứng dụng, giúp tăng tính nhất quán và giảm sự trùng lặp mã nguồn.

📁 pages/
Thư mục này chứa các trang chính của ứng dụng. Mỗi file trong thư mục này thường đại diện cho một trang cụ thể trong ứng dụng. Các trang này thường được sử dụng để hiển thị nội dung chính và kết hợp các component từ thư mục components.

📁 services/
Thư mục này chứa các file liên quan đến việc gọi API và xử lý logic liên quan đến dữ liệu. Các file trong thư mục này thường chứa các hàm để tương tác với backend, xử lý dữ liệu và trả về kết quả cho các component hoặc trang.

📄 App.jsx 
File này là component gốc của ứng dụng. Nó thường chứa cấu hình routing để điều hướng giữa các trang, cũng như layout chung của ứng dụng. Đây là nơi kết nối các trang và component lại với nhau để tạo thành một ứng dụng hoàn chỉnh.

📄 main.jsx 
File này là file khởi chạy của ứng dụng. Nó kết nối React với DOM bằng cách sử dụng ReactDOM.render() hoặc ReactDOM.createRoot(). File này cũng có thể bao bọc ứng dụng bằng các provider nếu cần, chẳng hạn như Redux Provider hoặc Theme Provider.

Và các file css 

📄 main.css
Đây là file CSS toàn cục, áp dụng cho toàn bộ ứng dụng.

📄 App.css 
Đây là file CSS cụ thể cho component App


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
