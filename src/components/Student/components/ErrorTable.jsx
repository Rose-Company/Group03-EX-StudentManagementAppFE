import PropTypes from 'prop-types';
import styles from '../UploadModal.module.css';

const ErrorTable = ({ importErrors, onClose }) => {
  if (!importErrors || !importErrors.failed_records) return null;

  return (
    <div className={styles.errorTableContainer}>
      <div className={styles.errorTableHeader}>
        <h4>
          Chi tiết lỗi import: {importErrors.failed_count} bản ghi lỗi,
          {importErrors.successful_count} bản ghi thành công
        </h4>
        <button className={styles.closeErrorBtn} onClick={onClose}>
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

ErrorTable.propTypes = {
  importErrors: PropTypes.shape({
    failed_count: PropTypes.number,
    successful_count: PropTypes.number,
    failed_records: PropTypes.arrayOf(
      PropTypes.shape({
        row_number: PropTypes.number,
        student_code: PropTypes.string,
        email: PropTypes.string,
        error: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

export default ErrorTable; 