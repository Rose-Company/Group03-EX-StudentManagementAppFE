// src/components/Student/AddStudentPopup.jsx
import PropTypes from "prop-types";
import StudentForm from "./StudentForm";

function AddStudentPopup({
  isOpen,
  onClose,
  onAdd,
  newStudent,
  onInputChange,
  faculties,
  statuses,
}) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content__top-action">
          <h3>Add Student</h3>
          <button className="popup-close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <StudentForm
          initialData={newStudent}
          onChange={onInputChange}
          faculties={faculties}
          statuses={statuses}
        />

        <button className="pop-up-add-student" onClick={onAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

AddStudentPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  newStudent: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  faculties: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
};

export default AddStudentPopup;
// src/components/Student/StudentForm.jsx
