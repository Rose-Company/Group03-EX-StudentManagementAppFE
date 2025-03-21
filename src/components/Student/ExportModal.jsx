import { useState } from "react";
import PropTypes from "prop-types";
import { exportFile } from "../../services/studentManagementService";
import styles from "./ExportModal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExportModal = ({ isOpen, onClose }) => {
  const [fileType, setFileType] = useState("csv");

  const handleExport = async () => {
    try {
      const blob = await exportFile(fileType);
      const file = new Blob([blob], {
        type: fileType === "csv" ? "text/csv" : "application/json",
      });

      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `students_exported_file.${fileType}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File exported successfully");
      onClose();
    } catch (error) {
      toast.error("Error exporting file");
      console.error("Error exporting file:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Export Students</h2>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="fileType"
              value="csv"
              checked={fileType === "csv"}
              onChange={() => setFileType("csv")}
            />
            CSV
          </label>
          <label>
            <input
              type="radio"
              name="fileType"
              value="json"
              checked={fileType === "json"}
              onChange={() => setFileType("json")}
            />
            JSON
          </label>
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleExport} className={styles.exportBtn}>
            Export
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ExportModal;
