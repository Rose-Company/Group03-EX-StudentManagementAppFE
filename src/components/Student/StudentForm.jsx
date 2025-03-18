// src/components/Student/StudentForm.jsx
import PropTypes from "prop-types";
// Lưu ý: không cần import CSS vì chúng ta sẽ nhận styles từ props

const StudentForm = ({
  initialData,
  faculties,
  statuses,
  onChange,
  isDisabled,
  styles,
}) => {
  return (
    <>
      {/* Thông tin cơ bản */}
      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="student_code">Student Code</label>
          <input
            type="text"
            id="student_code"
            name="student_code"
            value={initialData.student_code}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={initialData.fullname}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
      </div>

      {/* Thông tin bổ sung */}
      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={initialData.date_of_birth}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={initialData.gender}
            onChange={onChange}
            disabled={isDisabled}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Thông tin học tập */}
      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="faculty_id">Faculty</label>
          <select
            id="faculty_id"
            name="faculty_id"
            value={initialData.faculty_id}
            onChange={onChange}
            disabled={isDisabled}
            required
          >
            <option value="">Select Faculty</option>
            {faculties &&
              faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={initialData.batch}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
      </div>

      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="program">Program</label>
          <input
            type="text"
            id="program"
            name="program"
            value={initialData.program}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
        <div className={styles.studentStatus}>
          <label htmlFor="status_id">Student Status</label>
          <select
            id="status_id"
            name="status_id"
            value={initialData.status_id}
            onChange={onChange}
            disabled={isDisabled}
            required
          >
            <option value="">Select Status</option>
            {statuses &&
              statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={initialData.address}
            onChange={onChange}
            disabled={isDisabled}
          />
        </div>
      </div>

      <div
        className={`${styles.formGroup} ${!isDisabled ? styles.editable : ""}`}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={initialData.email}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={initialData.phone}
            onChange={onChange}
            disabled={isDisabled}
            required
          />
        </div>
      </div>
    </>
  );
};

StudentForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  faculties: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired, // Thêm prop styles
};

export default StudentForm;
