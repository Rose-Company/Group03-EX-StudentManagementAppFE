import "./About.css";
import { useState } from "react";

export default function AboutUs() {
  const [teamMembers] = useState([
    {
      id: "SV001",
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      role: "Team Leader",
      github: "github.com/nguyenvana",
    },
    {
      id: "SV002",
      name: "Tran Thi B",
      email: "tranthib@example.com",
      role: "Frontend Developer",
      github: "github.com/tranthib",
    },
    {
      id: "SV003",
      name: "Le Van C",
      email: "levanc@example.com",
      role: "Backend Developer",
      github: "github.com/levanc",
    },
    {
      id: "SV004",
      name: "Pham Thi D",
      email: "phamthid@example.com",
      role: "UI/UX Designer",
      github: "github.com/phamthid",
    },
  ]);

  return (
    <div className="about-us-container">
      <div className="about-header">
        <h1>Tech Innovators Group</h1>
        <p>Building the future through innovation and collaboration</p>
      </div>

      <div className="about-content">
        <div className="team-section">
          <h2>Our Team</h2>
          <p>Meet the talented individuals behind our success</p>

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
