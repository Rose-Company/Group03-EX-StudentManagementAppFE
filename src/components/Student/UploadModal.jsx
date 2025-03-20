import PropTypes from "prop-types";
import styles from "./UploadModal.module.css";
import { useState } from "react";

const UploadModal = ({ isOpen, onClose }) => {
  // 1. State declarations
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  // 2. State management functions
  const resetModalState = () => {
    setSelectedFile(null);
    setIsDragOver(false);
    setUploadStatus(null);
    setErrorMessage("");
  };

  // 3. Validation functions
  const validateFile = (file) => {
    const validExtensions = ['csv', 'json'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setUploadStatus('error');
      setErrorMessage("File không đúng định dạng. Chỉ chấp nhận file .CSV hoặc .JSON");
      return false;
    }

   
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadStatus('error');
      setErrorMessage("Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return false;
    }

    setUploadStatus('success');
    setErrorMessage("");
    return true;
  };

  // 4. Event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleConfirm = () => {
    // TO DO: Xử lý upload file lên server
    console.log("Uploading file:", selectedFile);
  };

  const handleChangeFile = () => {
    // Reset trạng thái để chọn file mới
    setSelectedFile(null);
    setUploadStatus(null);
    setErrorMessage("");
  };

  // 5. Render helper functions
  const renderInfoSection = () => (
    <div className={styles.infoContainer}>
      <div className={styles.infoSection}>
        <h3>1. Các lưu ý:</h3>
        <ul>
          <li>Chỉ chấp nhận các file có định dạng <span className={styles.highlight}>.CSV</span> hoặc <span className={styles.highlight}>.JSON</span></li>
          <li>Đảm bảo giữ nguyên tên cột và số lượng cột trong file</li>
          <li>Tất cả các cột <span className={styles.required}>bắt buộc</span> phải điền đầy đủ</li>
        </ul>
      </div>
      <div className={styles.infoSection}>
        <h3>2. Các lỗi thường gặp:</h3>
        <ul>
          <li>Mã số sinh viên (MSSV) bị trùng trong danh sách (chỉ được lấy duy nhất)</li>
          <li>Trùng lặp email trong file</li>
        </ul>
      </div>
    </div>
  );

  const renderUploadStatus = () => {
    if (uploadStatus === 'success') {
      return (
        <div className={styles.uploadSuccess}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <h3>Tải tệp lên thành công</h3>
          <p>Bấm vào nút xác nhận giao dịch để hệ thống bắt đầu xử lý</p>
          <p className={styles.fileName}>{selectedFile?.name}</p>
        </div>
      );
    }

    if (uploadStatus === 'error') {
      return (
        <div className={styles.uploadError}>
          <div className={styles.errorIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </div>
          <h3>Sai định dạng file theo yêu cầu</h3>
          <p>{errorMessage}</p>
          <p className={styles.retryText}>Bạn hãy thử tải tệp khác. Kéo tệp vào đây hoặc tải tệp lên lại</p>
        </div>
      );
    }

    return (
      <div 
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          className={styles.fileInput}
          onChange={handleFileChange}
          accept=".csv,.json"
        />
        <label htmlFor="fileInput">
          <div className={styles.uploadIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
            </svg>
          </div>
          <p>Kéo tệp vào đây hoặc click để tải tệp lên</p>
        </label>
      </div>
    );
  };

  const renderFooterButtons = () => {
    if (uploadStatus === 'success') {
      return (
        <>
          <button className={styles.changeFileBtn} onClick={handleChangeFile}>
            Thay đổi tệp
          </button>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            Xác nhận giao dịch
          </button>
        </>
      );
    }

    if (uploadStatus === 'error') {
      return (
        <>
          <button 
            className={styles.closeBtn} 
            onClick={() => {
              resetModalState();
              onClose();
            }}
          >
            Đóng
          </button>
          <button className={styles.retryBtn} onClick={handleChangeFile}>
            Tải lại tệp
          </button>
        </>
      );
    }

    return (
      <button 
        className={styles.closeBtn} 
        onClick={() => {
          resetModalState();
          onClose();
        }}
      >
        Đóng
      </button>
    );
  };

  // 6. Main render
  return (
    <div 
      className={styles.modalOverlay} 
      onClick={() => {
        resetModalState();
        onClose();
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Tải tệp lên</h2>
        </div>
        
        <div className={styles.modalBody}>
          {renderInfoSection()}
          {renderUploadStatus()}
        </div>

        <div className={styles.modalFooter}>
          {renderFooterButtons()}
        </div>
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UploadModal;