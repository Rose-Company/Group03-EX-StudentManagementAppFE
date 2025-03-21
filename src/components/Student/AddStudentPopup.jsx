  // src/components/Student/AddStudentPopup.jsx
  import { useState } from "react";
  import PropTypes from "prop-types";
  import styles from "./AddStudentPopUp.module.css";

  function AddStudentPopUp({
    isOpen,
    onClose,
    onCreate,
    newStudent,
    onInputChange,
    onInputAddressChange,
    onInputDocumentChange,
    faculties,
    statuses,
  }) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    if (!isOpen) return null;

    const handleClosePopUp = () => {
      onClose();
    };

    const handleAddStudent = () => {
      onCreate();
    };

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const renderStepIndicator = () => {
      return (
        <div className={styles.stepIndicator}>
          <div className={styles.stepperContainer}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={styles.stepperItem}>
                <div
                  className={`${styles.stepCircle} ${currentStep >= step ? styles.activeStep : ""
                    }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={styles.stepLine}></div>}
              </div>
            ))}
          </div>

        </div>
      );
    };

    const renderPersonalInfoStep = () => {
      return (
        <>
          <div className={styles.formGroup}>
            <div>
              <p>Full Name</p>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={newStudent.fullname}
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>Date of Birth</p>
              <input
                type="date"
                placeholder="Date of Birth"
                name="date_of_birth"
                value={newStudent.date_of_birth}
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>Phone Number</p>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={newStudent.phone}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div>
              <p>Gender</p>
              <select
                className={styles.studentGt}
                name="gender"
                value={newStudent.gender}
                onChange={onInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <p>Email Address</p>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={newStudent.email}
                onChange={onInputChange}
              />
            </div>
          </div>
        </>
      );
    };
    const renderDocumentsStep = () => {
      const documentTypes = ["cccd", "cmnd", "passPort"];
    
      return (
        <>
          {documentTypes.map((docType) => (
            <div key={docType}>
              <p>{docType.toUpperCase()}</p>
              <div className={styles.formGroup}>
                {["document_number", "issue_date", "expiry_date", "issue_place", "country_of_issue"].map((field) => (
                  <div key={field}>
                    <p>{field.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                    <input
                      type={field.includes("date") ? "date" : "text"}
                      placeholder={field.replace("_", " ")}
                      name={field}
                      value={newStudent[docType]?.[field] || ""}
                      onChange={(e) => onInputDocumentChange(e, docType)}
                    />
                  </div>
                ))}
                <div className={styles.chipCheck}>
                  <input
                    type="checkbox"
                    name="has_chip"
                    checked={newStudent[docType]?.has_chip || false} // Kiểm tra giá trị thực tế
                    onChange={(e) =>
                      onInputDocumentChange(
                        { target: { name: "has_chip", value: e.target.checked } },
                        docType // Truyền đúng docType thay vì document.document_type
                      )
                    }
                  />
                  <label>Has chip?</label>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    };
    
    const renderAddressesStep = () => {
      return (
        <>
          <p>Permanent Address</p>
          <div className={styles.formGroup}>
            <div>
              <p>Country</p>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={newStudent.permanent_address.country}
                onChange={(e) => onInputAddressChange(e, "permanent_address")}
              />
            </div>
            <div>
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={newStudent.permanent_address.city}
                onChange={(e) => onInputAddressChange(e, "permanent_address")}
              />
            </div>
            <div>
              <p>District</p>
              <input
                type="text"
                placeholder="District"
                name="district"
                value={newStudent.permanent_address.district}
                onChange={(e) => onInputAddressChange(e, "permanent_address")}
              />
            </div>
            <div>
              <p>Ward</p>
              <input
                type="text"
                placeholder="Ward"
                name="ward"
                value={newStudent.permanent_address.ward}
                onChange={(e) => onInputAddressChange(e, "permanent_address")}
              />
            </div>
            <div>
              <p>Street</p>
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={newStudent.permanent_address.street}
                onChange={(e) => onInputAddressChange(e, "permanent_address")}
              />
            </div>
          </div>

          <p>Temporary Address</p>
          <div className={styles.formGroup}>
            <div>
              <p>Country</p>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={newStudent.temp_address.country}
                onChange={(e) => onInputAddressChange(e, "temp_address")}
              />
            </div>
            <div>
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={newStudent.temp_address.city}
                onChange={(e) => onInputAddressChange(e, "temp_address")}
              />
            </div>
            <div>
              <p>District</p>
              <input
                type="text"
                placeholder="District"
                name="district"
                value={newStudent.temp_address.district}
                onChange={(e) => onInputAddressChange(e, "temp_address")}
              />
            </div>
            <div>
              <p>Ward</p>
              <input
                type="text"
                placeholder="Ward"
                name="ward"
                value={newStudent.temp_address.ward}
                onChange={(e) => onInputAddressChange(e, "temp_address")}
              />
            </div>
            <div>
              <p>Street</p>
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={newStudent.temp_address.street}
                onChange={(e) => onInputAddressChange(e, "temp_address")}
              />
            </div>
          </div>

          <p>Mailing Address</p>
          <div className={styles.formGroup}>
            <div>
              <p>Country</p>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={newStudent.mailing_address.country}
                onChange={(e) => onInputAddressChange(e, "mailing_address")}
              />
            </div>
            <div>
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={newStudent.mailing_address.city}
                onChange={(e) => onInputAddressChange(e, "mailing_address")}
              />
            </div>
            <div>
              <p>District</p>
              <input
                type="text"
                placeholder="District"
                name="district"
                value={newStudent.mailing_address.district}
                onChange={(e) => onInputAddressChange(e, "mailing_address")}
              />
            </div>
            <div>
              <p>Ward</p>
              <input
                type="text"
                placeholder="Ward"
                name="ward"
                value={newStudent.mailing_address.ward}
                onChange={(e) => onInputAddressChange(e, "mailing_address")}
              />
            </div>
            <div>
              <p>Street</p>
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={newStudent.mailing_address.street}
                onChange={(e) => onInputAddressChange(e, "mailing_address")}
              />
            </div>
          </div>
        </>
      );
    };


    const renderAcademicInfoStep = () => {
      return (
        <>
          <div className={styles.formGroup}>
            <div>
              <p>Student ID</p>
              <input
                type="text"
                placeholder="Student ID"
                name="student_code"
                value={newStudent.student_code}
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>Batch</p>
              <input
                type="text"
                placeholder="Batch"
                name="batch"
                value={newStudent.batch}
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>Program</p>
              <input
                type="text"
                placeholder="Program"
                name="program"
                value={newStudent.program}
                onChange={onInputChange}
              />
            </div>
            <div>
              <p>Faculty</p>
              <select
                name="faculty_id"
                value={newStudent.faculty_id}
                onChange={onInputChange}
              >
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Student Status</p>
              <select
                name="status_id"
                value={newStudent.status_id}
                onChange={onInputChange}
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      );
    };

    const renderStepContent = () => {
      switch (currentStep) {
        case 1:
          return renderPersonalInfoStep();
        case 2:
          return renderDocumentsStep();
        case 3:
          return renderAddressesStep();
        case 4:
          return renderAcademicInfoStep();
        default:
          return null;
      }
    };

    const renderStepActions = () => {
      return (
        <div className={styles.stepActions}>
          {currentStep > 1 && (
            <button className={styles.prevButton} onClick={prevStep}>
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button className={styles.nextButton} onClick={nextStep}>
              Next
            </button>
          ) : (
            <button
              className={styles.popUpAddStudent}
              onClick={handleAddStudent}
            >
              Add Student
            </button>
          )}
        </div>
      );
    };

    return (
      <div className={styles.popupOverlay} onClick={handleClosePopUp}>
        <div
          className={styles.popupContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.popupContentTopAction}>
            <h3>Add Student</h3>
            <button
              className={styles.popupCloseBtn}
              onClick={handleClosePopUp}
            >
              X
            </button>
          </div>
          {renderStepIndicator()}
          {renderStepContent()}
          {renderStepActions()}
        </div>
      </div>
    );
  }

  AddStudentPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    newStudent: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    faculties: PropTypes.array.isRequired,
    statuses: PropTypes.array.isRequired,
  };

  export default AddStudentPopUp;