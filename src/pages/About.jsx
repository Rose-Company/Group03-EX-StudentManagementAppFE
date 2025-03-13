import "./About.css";
import { useState } from "react";

export default function AboutUs() {
  const [teamMembers] = useState([
    {
      id: "22120219",
      name: "Mai Nhat Nam",
      email: "mainhatnam01@gmail.com",
      role: "BackEnd Developer",
      github: "github.com/mainhatnam219",
    },
    {
      id: "22120235",
      name: "Hoàng Thanh Thảo Nguyên",
      email: "thaonguyenhoang2103@gmail.com",
      role: "FrontEnd Developer",
      github: "github.com/thaonguyen2103",
    },
    {
      id: "22120255",
      name: "Trần Thái Nhật",
      email: "22120255@student.hcmus.edu.vn",
      role: "Fullstack Developer",
      github: "github.com/thainhat04",
    },
    {
      id: "22120263",
      name: "Nguyễn Thành Phát",
      email: "22120263@student.hcmus.edu.vn",
      role: "Fullstack Developer",
      github: "github.com/phatnguyen1906",
    },
  ]);

  return (
    <div className="about-us-container">
      <div className="about-header">
        <h1>GROUP 03</h1>
        <p className="about-paragraph">Building a student management system</p>
      </div>

      <div className="about-content">
        <div className="team-section">
          <h2>Our Team</h2>
          <p className="about-paragraph">
            Meet the talented individuals behind our success
          </p>

          <div className="table-container">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>GitHub</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>
                      <a href={`mailto:${member.email}`} className="email-link">
                        {member.email}
                      </a>
                    </td>
                    <td>{member.role}</td>
                    <td>
                      <a
                        href={`https://${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        {member.github}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
