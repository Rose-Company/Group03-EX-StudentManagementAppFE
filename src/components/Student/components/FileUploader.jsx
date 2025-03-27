import PropTypes from 'prop-types';
import styles from '../UploadModal.module.css';

const FileUploader = ({ onFileSelect, isDragOver, onDragOver, onDragLeave, onDrop }) => {
  return (
    <div
      className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        id="fileInput"
        className={styles.fileInput}
        onChange={onFileSelect}
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

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  isDragOver: PropTypes.bool.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default FileUploader; 