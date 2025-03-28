import PropTypes from "prop-types";
import styles from "./UploadModal.module.css";
import { useState } from "react";
import {
  uploadFile,
  confirmFileImport,
} from "../../services/studentManagementService";
import { validateFile } from "./utils/uploadValidation";
import { showToast } from "./utils/toastUtils";
import "react-toastify/dist/ReactToastify.css";

// Components
import InfoSection from "./components/InfoSection";
import FileUploader from "./components/FileUploader";
import UploadStatus from "./components/UploadStatus";
import ErrorTable from "./components/ErrorTable";
import ModalFooter from "./components/ModalFooter";

const UploadModal = ({ isOpen, onClose }) => {
  // State declarations
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileData, setFileData] = useState(null);
  const [importErrors, setImportErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  if (!isOpen) return null;

  // State management functions
  const resetModalState = () => {
    setSelectedFile(null);
    setIsDragOver(false);
    setUploadStatus(null);
    setErrorMessage("");
    setFileData(null);
    setImportErrors(null);
    setLoadingText("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileUpload = async (file) => {
    if (file && validateFile(file, setUploadStatus, setErrorMessage)) {
      setSelectedFile(file);
      setIsLoading(true);
      setLoadingText("Đang tải file lên...");
      try {
        const fileData = await uploadFile(file);
        
        if (fileData) {
          setFileData({
            download_url: fileData.download_url,
            file_name: fileData.file_name,
          });
          setUploadStatus("success");
          showToast("success", "🎉 Tải file lên thành công!");
        } else {
          throw new Error("Không nhận được thông tin file");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus("error");
        const errorMessage = error.response?.data?.message || error.message || "Lỗi khi tải lên file";
        setErrorMessage(errorMessage);
        showToast("error", `❌ ${errorMessage}`);
      } finally {
        setIsLoading(false);
        setLoadingText("");
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    await handleFileUpload(file);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    await handleFileUpload(file);
  };

  const handleConfirm = async () => {
    if (!fileData || !fileData.download_url) {
      setErrorMessage("Không tìm thấy thông tin file");
      return;
    }
  
    try {
      setIsLoading(true);
      setLoadingText("Đang xử lý import...");
      const response = await confirmFileImport(fileData.download_url);

      if (response.code === 0) {
        showToast("success", "🎉 Import sinh viên thành công!");
        resetModalState();
        onClose();
        return;
      }

      if (response.data?.data?.failed_records?.length > 0) {
        const { successful_count, failed_count, failed_records } = response.data.data;
        
        setImportErrors({
          successful_count,
          failed_count,
          failed_records
        });
        
        setUploadStatus("error");
        setErrorMessage(
          `Import thất bại: ${failed_count} bản ghi lỗi, ${successful_count} bản ghi thành công`
        );
        
        showToast("error", "❌ Có lỗi xảy ra khi import sinh viên");
        return;
      }
      setUploadStatus("error");
      setErrorMessage(response.data.message || "Có lỗi xảy ra khi import");
      showToast("error", "❌ Có lỗi xảy ra khi import sinh viên");

    } catch (error) {
      console.error("Import error:", error);
      setUploadStatus("error");

      if (error.response?.data?.data?.failed_records?.length > 0) {
        const { successful_count, failed_count, failed_records } = error.response.data.data;
        
        setImportErrors({
          successful_count,
          failed_count,
          failed_records
        });
        
        setErrorMessage(
          `Import thất bại: ${failed_count} bản ghi lỗi, ${successful_count} bản ghi thành công`
        );
        
        showToast("error", "❌ Có lỗi xảy ra khi import sinh viên");
      } else {
        const errorMessage = error.response?.data?.message || "Lỗi kết nối server";
        setErrorMessage(errorMessage);
        showToast("error", `❌ ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  }

  const handleChangeFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
    setErrorMessage("");
  };

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Tải tệp lên</h2>
        </div>

        <div className={styles.modalBody}>
          <InfoSection />
          {!uploadStatus && (
            <FileUploader
              onFileSelect={handleFileChange}
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          )}
          <UploadStatus
            status={uploadStatus}
            fileName={selectedFile?.name}
            errorMessage={errorMessage}
            loadingText={loadingText}
          />
          {importErrors && (
            <ErrorTable
              importErrors={importErrors}
              onClose={() => setImportErrors(null)}
            />
          )}
        </div>

        <div className={styles.modalFooter}>
          <ModalFooter
            uploadStatus={uploadStatus}
            isLoading={isLoading}
            loadingText={loadingText}
            onChangeFile={handleChangeFile}
            onConfirm={handleConfirm}
            onClose={handleClose}
          />
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
