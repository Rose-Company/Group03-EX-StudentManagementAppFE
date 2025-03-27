import styles from '../UploadModal.module.css';

const InfoSection = () => {
  return (
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
};

export default InfoSection; 