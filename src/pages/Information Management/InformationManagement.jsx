import styles from "../StudentManagement/StudentManagement.module.css";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { getFaculties, getStatuses, createFaculty } from "../../services/informationManagementService";

function InformationManagement() {
    const [activeTab, setActiveTab] = useState("faculty"); // "faculty" or "status"
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newFacultyName, setNewFacultyName] = useState("");
    const [editFaculty, setEditFaculty] = useState(null);

    const facultyColumns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Faculty" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from triggering
                        handleEditFaculty(row);
                    }}
                    style={{
                        padding: "4px 8px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                    }}
                >
                    Edit
                </button>
            )
        }
    ];

    const statusColumns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Status" }
    ];

    const [faculties, setFaculties] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await getFaculties();
                console.log("Faculty API response:", data);

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
                console.log("Statuses data:", data);
                if (Array.isArray(data)) {
                    setStatuses(data);
                }
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };

        fetchStatuses();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleAddFaculty = () => {
        setShowAddModal(true);
        console.log("Opening Add Faculty modal");
    };

    const handleEditFaculty = (faculty) => {
        console.log("Editing faculty:", faculty);
        setEditFaculty(faculty);
        setNewFacultyName(faculty.name);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        console.log("Closing modal");
        setShowAddModal(false);
        setShowEditModal(false);
        setNewFacultyName("");
        setEditFaculty(null);
    };

    const handleSubmitFaculty = async () => {
        if (newFacultyName.trim()) {
            console.log("Submitting new faculty name:", newFacultyName);
            try {
                const newFaculty = await createFaculty(newFacultyName); // Call API to add faculty
                console.log("New faculty created:", newFaculty);
                setFaculties([...faculties, newFaculty]); // Update faculty list
                handleCloseModal();
            } catch (error) {
                console.error("Error adding faculty:", error);
                alert("Failed to add faculty: " + (error.response?.data?.message || "Unknown error"));
            }
        } else {
            console.warn("Attempted to submit empty faculty name");
        }
    };

    const handleUpdateFaculty = () => {
        // Here you would typically call an API to update the faculty
        if (newFacultyName.trim() && editFaculty) {
            console.log("Updating faculty ID:", editFaculty.id, "with new name:", newFacultyName);
            
            const updatedFaculties = faculties.map(faculty =>
                faculty.id === editFaculty.id ? { ...faculty, name: newFacultyName } : faculty
            );

            setFaculties(updatedFaculties);
            handleCloseModal();
        } else {
            console.warn("Cannot update faculty: invalid name or faculty data");
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        console.log("Faculty name input changed:", value);
        setNewFacultyName(value);
    };

    // Styling for tabs
    const tabStyle = {
        padding: "10px 20px",
        cursor: "pointer",
        borderBottom: "2px solid transparent",
        fontWeight: "500"
    };

    const activeTabStyle = {
        ...tabStyle,
        borderBottom: "2px solid #1976d2",
        color: "#1976d2",
        fontWeight: "bold"
    };

    // Modal styles
    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    };

    const modalStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
    };

    const modalHeaderStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px"
    };

    const inputGroupStyle = {
        marginBottom: "15px"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontWeight: "500"
    };

    const inputStyle = {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px"
    };

    const buttonGroupStyle = {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px"
    };

    const cancelButtonStyle = {
        padding: "8px 16px",
        background: "#f1f1f1",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    };

    const addButtonStyle = {
        padding: "8px 16px",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    };

    return (
        <div className={styles.managementContainer}>
            {/* Tab navigation */}
            <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0", marginBottom: "20px" }}>
                <div
                    style={activeTab === "faculty" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("faculty")}
                >
                    Faculty Management
                </div>
                <div
                    style={activeTab === "status" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("status")}
                >
                    Status Management
                </div>
            </div>

            {/* Faculty Tab Content */}
            {activeTab === "faculty" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Faculty List</p>
                        <button
                            className={styles.addBtn}
                            onClick={handleAddFaculty}
                        >
                            Add Faculty
                        </button>
                    </div>
                    <div className={styles.studentList}>
                        <Table
                            columns={facultyColumns}
                            data={faculties}
                            onRowClick={handleItemClick}
                        />
                    </div>
                </>
            )}

            {/* Status Tab Content */}
            {activeTab === "status" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Status List</p>
                        <button className={styles.addBtn}>
                            Add Status
                        </button>
                    </div>
                    <div className={styles.studentList}>
                        <Table
                            columns={statusColumns}
                            data={statuses}
                            onRowClick={handleItemClick}
                        />
                    </div>
                </>
            )}

            {/* Add Faculty Modal */}
            {showAddModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div style={modalHeaderStyle}>Add new faculty</div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Faculty Name</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={newFacultyName}
                                onChange={handleNameChange}
                                placeholder="Enter faculty name"
                            />
                        </div>
                        <div style={buttonGroupStyle}>
                            <button
                                style={cancelButtonStyle}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                style={addButtonStyle}
                                onClick={handleSubmitFaculty}
                                disabled={!newFacultyName.trim()}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Faculty Modal */}
            {showEditModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div style={modalHeaderStyle}>Edit faculty</div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Faculty Name</label>
                            <input
                                type="text"
                                style={inputStyle}
                                value={newFacultyName}
                                onChange={handleNameChange}
                                placeholder="Enter faculty name"
                            />
                        </div>
                        <div style={buttonGroupStyle}>
                            <button
                                style={cancelButtonStyle}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                style={addButtonStyle}
                                onClick={handleUpdateFaculty}
                                disabled={!newFacultyName.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InformationManagement;