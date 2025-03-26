import PropTypes from "prop-types";
import styles from "./UploadModal.module.css";
import { useState } from "react";
import {
  uploadFile,
  confirmFileImport,
} from "../../services/studentManagementService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadModal = ({ isOpen, onClose }) => {
  // 1. State declarations
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [fileData, setFileData] = useState(null);
  const [importErrors, setImportErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  if (!isOpen) return null;

  // 2. State management functions
  const resetModalState = () => {
    setSelectedFile(null);
    setIsDragOver(false);
    setUploadStatus(null);
    setErrorMessage("");
    setFileData(null);
    setImportErrors(null);
    setLoadingText("");
  };

  // Toast configuration
  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: type === "success" ? 3000 : 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: type === "success" ? "#4caf50" : "#f44336",
        color: "white",
      },
    });
  };

  // 3. Validation functions
  const validateFile = (file) => {
    const validExtensions = ["csv", "json"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setUploadStatus("error");
      setErrorMessage(
        "File không đúng định dạng. Chỉ chấp nhận file .CSV hoặc .JSON"
      );
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadStatus("error");
      setErrorMessage(
        "Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB"
      );
      return false;
    }

    setUploadStatus("success");
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

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    console.log("handleDrop - Selected file:", file);

    if (file && validateFile(file)) {
      setSelectedFile(file);
      setIsLoading(true);
      setLoadingText("Đang tải file lên...");
      try {
        console.log("handleDrop - Uploading file...");
        const response = await uploadFile(file);
        console.log("handleDrop - Upload response:", response);

        if (response && response.download_url) {
          console.log(
            "handleDrop - Setting file data with response:",
            response
          );
          setFileData({
            download_url: response.download_url,
            file_name: response.file_name,
          });
          setUploadStatus("success");
          showToast("success", "🎉 Tải file lên thành công!");
        } else {
          console.log("handleDrop - Response structure:", response);
          throw new Error("Không nhận được download URL");
        }
      } catch (error) {
        console.error("handleDrop - Upload error:", error);
        setUploadStatus("error");
        setErrorMessage("Lỗi khi tải lên file");
        showToast("error", "❌ Lỗi khi tải file lên");
      } finally {
        setIsLoading(false);
        setLoadingText("");
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("handleFileChange - Selected file:", file);

    if (file && validateFile(file)) {
      setSelectedFile(file);
      setIsLoading(true);
      setLoadingText("Đang tải file lên...");
      try {
        console.log("handleFileChange - Uploading file...");
        const response = await uploadFile(file);
        console.log("handleFileChange - Upload response:", response);

        if (response && response.download_url) {
          console.log(
            "handleFileChange - Setting file data with response:",
            response
          );
          setFileData({
            download_url: response.download_url,
            file_name: response.file_name,
          });
          setUploadStatus("success");
          showToast("success", "🎉 Tải file lên thành công!");
        } else {
          console.log("handleFileChange - Response structure:", response);
          throw new Error("Không nhận được download URL");
        }
      } catch (error) {
        console.error("handleFileChange - Upload error:", error);
        setUploadStatus("error");
        setErrorMessage("Lỗi khi tải lên file");
        showToast("error", "❌ Lỗi khi tải file lên");
      } finally {
        setIsLoading(false);
        setLoadingText("");
      }
    }
  };
  
  const handleConfirm = async () => {
    console.log("1. handleConfirm triggered");
    console.log("2. Current fileData:", fileData);
    if (!fileData || !fileData.download_url) {
      setErrorMessage("Không tìm thấy thông tin file");
      return;
    }
  
    try {
      setIsLoading(true);
      setLoadingText("Đang xử lý import...");
      const response = await confirmFileImport(fileData.download_url);
      console.log("API Response:", response);
  
      // Check if there are failed records in the response
      if (response && response.failed_records && response.failed_records.length > 0) {
        const { successful_count, failed_count } = response;
        setImportErrors({
          data: response,
          failed_records: response.failed_records,
          failed_count: failed_count,
          successful_count: successful_count
        });
        setUploadStatus("error");
        setErrorMessage(
          `Import thất bại: ${failed_count} bản ghi lỗi, ${successful_count} bản ghi thành công`
        );
        showToast("error", "❌ Có lỗi xảy ra khi import sinh viên");
        return;
      }
  
      showToast("success", "🎉 Import sinh viên thành công!");
      resetModalState();
      onClose();
    } catch (error) {
      console.error("Import error:", error);
      setUploadStatus("error");
  
      // Handle error response format
      if (error.response?.data?.data?.failed_records) {
        setImportErrors(error.response.data.data);
        showToast("error", "❌ Có lỗi xảy ra khi import sinh viên");
      } else {
        showToast(
          "error",
          error.response?.data?.message || "❌ Lỗi kết nối server"
        );
      }
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  }

  const handleChangeFile = () => {
    // Reset trạng thái để chọn file mới
    setSelectedFile(null);
    setUploadStatus(null);
    setErrorMessage("");
  };

  // 5. Render helper functions
  const renderImportErrors = () => {
    if (!importErrors || !importErrors.failed_records) return null;

    return (
      <div className={styles.errorTableContainer}>
        <div className={styles.errorTableHeader}>
          <h4>
            Chi tiết lỗi import: {importErrors.failed_count} bản ghi lỗi,
            {importErrors.successful_count} bản ghi thành công
          </h4>
          <button
            className={styles.closeErrorBtn}
            onClick={() => setImportErrors(null)}
          >
            ✕
          </button>
        </div>
        <div className={styles.errorTableWrapper}>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã số sinh viên</th>
                <th>Email</th>
                <th>Lỗi</th>
              </tr>
            </thead>
            <tbody>
              {importErrors.failed_records.map((record, index) => (
                <tr key={index}>
                  <td>{record.row_number}</td>
                  <td>{record.student_code}</td>
                  <td>{record.email}</td>
                  <td>{record.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 5. Render helper functions
  const renderInfoSection = () => (
    <div className={styles.infoContainer}>
      <div className={styles.infoSection}>
        <h3>1. Các lưu ý:</h3>
        <ul>
          <li>
            Chỉ chấp nhận các file có định dạng{" "}
            <span className={styles.highlight}>.CSV</span> hoặc{" "}
            <span className={styles.highlight}>.JSON</span>
          </li>
          <li>Đảm bảo giữ nguyên tên cột và số lượng cột trong file</li>
          <li>
            Tất cả các cột <span className={styles.required}>bắt buộc</span>{" "}
            phải điền đầy đủ
          </li>
        </ul>
      </div>
      <div className={styles.infoSection}>
        <h3>2. Các lỗi thường gặp:</h3>
        <ul>
          <li>
            Mã số sinh viên (MSSV) bị trùng trong danh sách (chỉ được lấy duy
            nhất)
          </li>
          <li>Trùng lặp email trong file</li>
        </ul>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className={styles.uploadLoading}>
      <div className={styles.loadingSpinner}>
        <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      </div>
      <h3>{loadingText}</h3>
      <p>Vui lòng đợi trong giây lát</p>
    </div>
  );

  const renderUploadStatus = () => {
    if (isLoading) {
      return renderLoadingState();
    }

    if (uploadStatus === "success") {
      return (
        <div className={styles.uploadSuccess}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <h3>Tải tệp lên thành công</h3>
          <p>Bấm vào nút xác nhận giao dịch để hệ thống bắt đầu xử lý</p>
          <p className={styles.fileName}>{selectedFile?.name}</p>
        </div>
      );
    }

    if (uploadStatus === "error") {
      return (
        <div className={styles.uploadError}>
          <div className={styles.errorIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </div>
          <h3>Sai định dạng file theo yêu cầu</h3>
          <p>{errorMessage}</p>
          <p className={styles.retryText}>
            Bạn hãy thử tải tệp khác. Kéo tệp vào đây hoặc tải tệp lên lại
          </p>
        </div>
      );
    }

    return (
      <div
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ""}`}
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
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          </div>
          <p>Kéo tệp vào đây hoặc click để tải tệp lên</p>
        </label>
      </div>
    );
  };

  const renderFooterButtons = () => {
    if (uploadStatus === "success") {
      return (
        <>
          <button
            className={styles.changeFileBtn}
            onClick={handleChangeFile}
            disabled={isLoading}
          >
            Thay đổi tệp
          </button>
          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner}>
                <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
                {loadingText}
              </span>
            ) : (
              "Xác nhận giao dịch"
            )}
          </button>
        </>
      );
    }

    if (uploadStatus === "error") {
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
          {importErrors && renderImportErrors()}
        </div>

        <div className={styles.modalFooter}>{renderFooterButtons()}</div>
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UploadModal;
