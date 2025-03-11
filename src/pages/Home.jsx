import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Student Management System</h1>
        <p className="home-paragraph">
          This is a simple student management system. Please log in to continue.
        </p>
      </header>
      <main className="home-main">
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </main>
    </div>
  );
};

export default Home;
