import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css";

export default function LoginForm() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng nhập tên đăng nhập và mật khẩu.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (!response || !response.token) {
        throw new Error("Phản hồi từ server không hợp lệ.");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);

      if (response.code === 200) {
        navigate("/");
      } else {
        throw new Error("Đăng nhập không thành công. Vui lòng thử lại.");
      }

    } catch (error) {
      console.error("Lỗi đăng nhập:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      if (error.message === "Network Error") {
        alert("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.");
      } else {
        alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    document.getElementById("root").classList.add("background");

    return () => {
      document.getElementById("root").classList.remove("background");
    };
  }, []);

  return (
    <div className="login-wrapper">
      <div className="system-title">
        <div className="icon-container">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <h1>Student Management System</h1>
        <p>Sign in to access your account</p>
      </div>

      <div className="login-card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Logging in...
                </span>
              ) : (
                <span className="button-content">
                  <svg
                    className="login-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Login
                </span>
              )}
            </button>
          </form>
        </div>
        <div className="card-footer">
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
