import PropTypes from 'prop-types';
import styles from '../UploadModal.module.css';

const LoadingSpinner = () => (
  <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

const ModalFooter = ({
  uploadStatus,
  isLoading,
  loadingText,
  onChangeFile,
  onConfirm,
  onClose,
}) => {
  if (uploadStatus === "success") {
    return (
      <>
        <button
          className={styles.changeFileBtn}
          onClick={onChangeFile}
          disabled={isLoading}
        >
          Thay đổi tệp
        </button>
        <button
          className={styles.confirmBtn}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loadingSpinner}>
              <LoadingSpinner />
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
        <button className={styles.closeBtn} onClick={onClose}>
          Đóng
        </button>
        <button className={styles.retryBtn} onClick={onChangeFile}>
          Tải lại tệp
        </button>
      </>
    );
  }

  return (
    <button className={styles.closeBtn} onClick={onClose}>
      Đóng
    </button>
  );
};

ModalFooter.propTypes = {
  uploadStatus: PropTypes.oneOf(['success', 'error', null]),
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  onChangeFile: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalFooter; 