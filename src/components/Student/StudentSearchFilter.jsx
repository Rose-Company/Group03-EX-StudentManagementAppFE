import styles from "../../pages/StudentManagement/StudentManagement.module.css";
import PropTypes from "prop-types";

const StudentSearchFilter = ({
  isFilterOpen,
  onOpenFilter,
  onSearchStudent,
  onSortChange,
  onFacultyFilterChange,
  sortField,
  sortOrder,
  facultyFilter,
  faculties,
  onClearFilters,
}) => {
  return (
    <div className={styles.searchFilter}>
      <button onClick={onOpenFilter} className={styles.filterDrop}>
        <i className="bx bx-filter-alt"></i>
      </button>
      <input
        onChange={onSearchStudent}
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
      />

      {isFilterOpen && (
        <div className={styles.filterPopup}>
          <div className={styles.filterSection}>
            <h4>Sort by</h4>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="name-asc"
                  checked={sortField === "fullname" && sortOrder === "asc"}
                  onChange={() => onSortChange("fullname", "asc")}
                />
                Name (A-Z)
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="name-desc"
                  checked={sortField === "fullname" && sortOrder === "desc"}
                  onChange={() => onSortChange("fullname", "desc")}
                />
                Name (Z-A)
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="id-asc"
                  checked={sortField === "student_code" && sortOrder === "asc"}
                  onChange={() => onSortChange("student_code", "asc")}
                />
                Student ID (Ascending)
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="id-desc"
                  checked={sortField === "student_code" && sortOrder === "desc"}
                  onChange={() => onSortChange("student_code", "desc")}
                />
                Student ID (Descending)
              </label>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4>Faculty</h4>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="faculty"
                  value=""
                  checked={facultyFilter === ""}
                  onChange={() => onFacultyFilterChange("")}
                />
                All Faculties
              </label>
              {faculties.map((faculty) => (
                <label key={faculty.id}>
                  <input
                    type="radio"
                    name="faculty"
                    value={faculty.name}
                    checked={facultyFilter === faculty.name}
                    onChange={() => onFacultyFilterChange(faculty.name)}
                  />
                  {faculty.name}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.clearFilterBtn} onClick={onClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

StudentSearchFilter.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  onOpenFilter: PropTypes.func.isRequired,
  onSearchStudent: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onFacultyFilterChange: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  facultyFilter: PropTypes.string.isRequired,
  faculties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onClearFilters: PropTypes.func.isRequired,
};

export default StudentSearchFilter;
