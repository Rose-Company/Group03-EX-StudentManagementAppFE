import PropTypes from "prop-types";
import styles from "../../pages/StudentManagement/StudentManagement.module.css";

const StudentActionButtons = ({
  onOpenPopUp,
  onOpenUploadModal,
  onOpenExportModal,
}) => {
  return (
    <div className={styles.topAction}>
      <p className={styles.title}>Student List</p>
      <button onClick={onOpenPopUp} className={styles.addBtn}>
        Add Student
      </button>
      <button onClick={onOpenUploadModal} className={styles.importBtn}>
        Import file
      </button>
      <button onClick={onOpenExportModal} className={styles.exportBtn}>
        Export file
      </button>
    </div>
  );
};

StudentActionButtons.propTypes = {
  onOpenPopUp: PropTypes.func.isRequired,
  onOpenUploadModal: PropTypes.func.isRequired,
  onOpenExportModal: PropTypes.func.isRequired,
};

export default StudentActionButtons;
