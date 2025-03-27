import PropTypes from 'prop-types';
import styles from '../UploadModal.module.css';

const LoadingSpinner = () => (
  <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

const UploadStatus = ({ status, fileName, errorMessage, loadingText }) => {
  if (loadingText) {
    return (
      <div className={styles.uploadLoading}>
        <div className={styles.loadingSpinner}>
          <LoadingSpinner />
        </div>
        <h3>{loadingText}</h3>
        <p>Vui lòng đợi trong giây lát</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.uploadSuccess}>
        <div className={styles.successIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
        <h3>Tải tệp lên thành công</h3>
        <p>Bấm vào nút xác nhận giao dịch để hệ thống bắt đầu xử lý</p>
        <p className={styles.fileName}>{fileName}</p>
      </div>
    );
  }

  if (status === "error") {
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

  return null;
};

UploadStatus.propTypes = {
  status: PropTypes.oneOf(['success', 'error', null]),
  fileName: PropTypes.string,
  errorMessage: PropTypes.string,
  loadingText: PropTypes.string,
};

export default UploadStatus; 