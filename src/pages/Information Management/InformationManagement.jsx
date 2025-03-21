import styles from "../Information Management/InformationManagement.module.css";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { getFaculties, getStatuses, createFaculty, createStatus } from "../../services/informationManagementService";

function InformationManagement() {
    const [activeTab, setActiveTab] = useState("faculty");
    const [faculties, setFaculties] = useState([]);
    const [statuses, setStatuses] = useState([]);

    // State quản lý pop-up Faculty
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const [newFacultyName, setNewFacultyName] = useState("");
    const [editFaculty, setEditFaculty] = useState(null);

    // State quản lý pop-up Status
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatusName, setNewStatusName] = useState("");
    const [editStatus, setEditStatus] = useState(null);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await getFaculties();
                if (data.code === 200 && data.data?.items) {
                    setFaculties(data.data.items);
                }
            } catch (error) {
                console.error("Error fetching faculties:", error);
            }
        };
        fetchFaculties();
    }, []);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const data = await getStatuses();
                if (Array.isArray(data)) {
                    setStatuses(data);
                }
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };
        fetchStatuses();
    }, []);

    // Xử lý mở pop-up
    const handleOpenFacultyModal = () => setShowFacultyModal(true);
    const handleOpenStatusModal = () => setShowStatusModal(true);
    const handleEditFaculty = (faculty) => {
        setEditFaculty(faculty);
        setNewFacultyName(faculty.name);
        setShowFacultyModal(true);
    };
    const handleEditStatus = (status) => {
        setEditStatus(status);
        setNewStatusName(status.name);
        setShowStatusModal(true);
    };

    // Xử lý đóng pop-up
    const handleCloseModal = () => {
        setShowFacultyModal(false);
        setShowStatusModal(false);
        setNewFacultyName("");
        setNewStatusName("");
        setEditFaculty(null);
        setEditStatus(null);
    };

    return (
        <div className={styles.managementContainer}>
            <div className={styles.tabs}>
                <div className={`${styles.tab} ${activeTab === "faculty" ? styles.activeTab : ""}`} onClick={() => setActiveTab("faculty")}>
                    Faculty Management
                </div>
                <div className={`${styles.tab} ${activeTab === "status" ? styles.activeTab : ""}`} onClick={() => setActiveTab("status")}>
                    Status Management
                </div>
            </div>

            {activeTab === "faculty" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Faculty List</p>
                        <button className={styles.addBtn} onClick={handleOpenFacultyModal}>Add Faculty</button>
                    </div>
                    <Table columns={[{ key: "id", label: "ID" }, { key: "name", label: "Faculty" }]} data={faculties} onRowClick={handleEditFaculty}/>
                </>
            )}

            {activeTab === "status" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Status List</p>
                        <button className={styles.addBtn} onClick={handleOpenStatusModal}>Add Status</button>
                    </div>
                    <Table columns={[{ key: "id", label: "ID" }, { key: "name", label: "Status" }]} data={statuses} onRowClick={handleEditStatus}/>
                </>
            )}

            {/* Pop-up Faculty */}
            {showFacultyModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>{editFaculty ? "Edit Faculty" : "Add New Faculty"}</div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Faculty Name</label>
                            <input type="text" className={styles.input} value={newFacultyName} onChange={(e) => setNewFacultyName(e.target.value)} placeholder="Enter faculty name" />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
                            <button className={styles.addButton} disabled={!newFacultyName.trim()}>{editFaculty ? "Save" : "Add"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pop-up Status */}
            {showStatusModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>{editStatus ? "Edit Status" : "Add New Status"}</div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Status Name</label>
                            <input type="text" className={styles.input} value={newStatusName} onChange={(e) => setNewStatusName(e.target.value)} placeholder="Enter status name" />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
                            <button className={styles.addButton} disabled={!newStatusName.trim()}>{editStatus ? "Save" : "Add"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InformationManagement;