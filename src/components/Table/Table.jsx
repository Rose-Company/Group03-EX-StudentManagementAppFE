// src/components/Student/StudentList.jsx
import PropTypes from "prop-types";
import styles from "../Table/Table.module.css";

function Table({ columns, data, onRowClick }) {
    if (!data || data.length === 0) {
      return (
        <div className={styles.emptyList}>
          <img src="/images/list_empty.png" alt="empty" className={styles.emptyListImg} />
          <p className={styles.emptyListTitle}>No data available!</p>
        </div>
      );
    }
  
    return (
      <div className={styles.table}>
        <table >
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || index} onClick={() => onRowClick?.(item)} style={{ cursor: "pointer" }}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(item[col.key], item) : item[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  Table.propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired, // Tên trường dữ liệu
        label: PropTypes.string.isRequired, // Tiêu đề cột
        render: PropTypes.func, // Hàm tùy chỉnh hiển thị dữ liệu
      })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func, // Hàm xử lý khi click vào hàng
  };
  
  export default Table;