import styles from "../Information Management/InformationManagement.module.css";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { getFaculties, getStatuses, createFaculty } from "../../services/informationManagementService";

function InformationManagement() {
    const [activeTab, setActiveTab] = useState("faculty");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newFacultyName, setNewFacultyName] = useState("");
    const [editFaculty, setEditFaculty] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [statuses, setStatuses] = useState([]);

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

    const handleAddFaculty = () => setShowAddModal(true);
    const handleEditFaculty = (faculty) => {
        setEditFaculty(faculty);
        setNewFacultyName(faculty.name);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setNewFacultyName("");
        setEditFaculty(null);
    };

    const handleSubmitFaculty = async () => {
        if (newFacultyName.trim()) {
            try {
                await createFaculty(newFacultyName);
                const updatedFaculties = await getFaculties();
                setFaculties(updatedFaculties.data.items);
                handleCloseModal();
            } catch (error) {
                alert("Failed to add faculty: " + (error.response?.data?.message || "Unknown error"));
            }
        }
    };

    return (
        <div className={styles.managementContainer}>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${activeTab === "faculty" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("faculty")}
                >
                    Faculty Management
                </div>
                <div
                    className={`${styles.tab} ${activeTab === "status" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("status")}
                >
                    Status Management
                </div>
            </div>

            {activeTab === "faculty" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Faculty List</p>
                        <button className={styles.addBtn} onClick={handleAddFaculty}>
                            Add Faculty
                        </button>
                    </div>
                    <Table columns={[{ key: "id", label: "ID" }, { key: "name", label: "Faculty" }]} data={faculties} onRowClick={handleEditFaculty} />
                </>
            )}

            {activeTab === "status" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Status List</p>
                        <button className={styles.addBtn}>Add Status</button>
                    </div>
                    <Table columns={[{ key: "id", label: "ID" }, { key: "name", label: "Status" }]} data={statuses} />
                </>
            )}

            {(showAddModal || showEditModal) && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            {showAddModal ? "Add New Faculty" : "Edit Faculty"}
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Faculty Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={newFacultyName}
                                onChange={(e) => setNewFacultyName(e.target.value)}
                                placeholder="Enter faculty name"
                            />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.cancelButton} onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button className={styles.addButton} onClick={handleSubmitFaculty} disabled={!newFacultyName.trim()}>
                                {showAddModal ? "Add" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InformationManagement;
