import styles from "../../pages/StudentManagement/StudentManagement.module.css";
import PropTypes from "prop-types";

const StudentPagination = ({ page, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className={styles.pagination}>
      {page > 1 ? <button onClick={onPrevPage}>Prev</button> : <></>}
      <span>Page {page}</span>
      {page < totalPages ? <button onClick={onNextPage}>Next</button> : <></>}
    </div>
  );
};

StudentPagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};
export default StudentPagination;
