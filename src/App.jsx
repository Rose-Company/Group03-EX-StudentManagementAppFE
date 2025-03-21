// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import StudentManagement from "./pages/StudentManagement/StudentManagement";
import AboutGroup from "./pages/About/About";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/management"
            element={
              <ProtectedRoute>
                <Header />
                <StudentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <AboutGroup />
              </>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
