import styles from "../Information Management/InformationManagement.module.css";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { 
    getFaculties, 
    getStatuses, 
    getPrograms,
    createFaculty, 
    createStatus, 
    createProgram,
    updateFaculty, 
    updateStatus,
    updateProgram
} from "../../services/informationManagementService";

// Modal component definition (added since it was missing in the original)
function Modal({ title, value, setValue, onSave, onClose }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{title}</h2>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter name"
                    className={styles.modalInput}
                />
                <div className={styles.modalActions}>
                    <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                    <button className={styles.saveBtn} onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

function InformationManagement() {
    const [activeTab, setActiveTab] = useState("faculty");
    const [faculties, setFaculties] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [programs, setPrograms] = useState([]);

    // State quản lý pop-up Faculty
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const [newFacultyName, setNewFacultyName] = useState("");
    const [editFaculty, setEditFaculty] = useState(null);

    // State quản lý pop-up Status
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatusName, setNewStatusName] = useState("");
    const [editStatus, setEditStatus] = useState(null);

    // State quản lý pop-up Program
    const [showProgramModal, setShowProgramModal] = useState(false);
    const [newProgramName, setNewProgramName] = useState("");
    const [editProgram, setEditProgram] = useState(null);

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

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await getPrograms();
                console.log("Programs API response:", data); // Debug dữ liệu trả về
                
                // Handle different possible response structures
                if (data.code === 0 && Array.isArray(data.data)) {
                    setPrograms(data.data);
                } else if (Array.isArray(data)) {
                    setPrograms(data);
                } else if (data.code === 200 && data.data?.items) {
                    // If the structure is similar to faculties
                    setPrograms(data.data.items);
                }
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };
        fetchPrograms();
    }, []);

    // Xử lý mở pop-up
    const handleOpenFacultyModal = () => setShowFacultyModal(true);
    const handleOpenStatusModal = () => setShowStatusModal(true);
    const handleOpenProgramModal = () => {
        setShowProgramModal(true);
        setEditProgram(null);
        setNewProgramName("");
    };

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

    const handleEditProgram = (program) => {
        console.log("Editing program:", program); // Debug
        setEditProgram(program);
        setNewProgramName(program.name);
        setShowProgramModal(true);
    };

    // Xử lý đóng pop-up
    const handleCloseModal = () => {
        setShowFacultyModal(false);
        setShowStatusModal(false);
        setShowProgramModal(false);
        setNewFacultyName("");
        setNewStatusName("");
        setNewProgramName("");
        setEditFaculty(null);
        setEditStatus(null);
        setEditProgram(null);
    };

    // Xử lý lưu Faculty
    const handleSaveFaculty = async () => {
        try {
            if (editFaculty) {
                await updateFaculty(editFaculty.id, newFacultyName);
            } else {
                await createFaculty(newFacultyName);
            }
    
            // Load lại danh sách Faculty sau khi cập nhật
            const data = await getFaculties();
            if (data.code === 200 && data.data?.items) {
                setFaculties(data.data.items);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error saving faculty:", error);
        }
    };
    
    // Xử lý lưu Status
    const handleSaveStatus = async () => {
        try {
            if (editStatus) {
                await updateStatus(editStatus.id, newStatusName);
            } else {
                await createStatus(newStatusName);
            }
    
            // Load lại danh sách Status sau khi cập nhật
            const data = await getStatuses();
            if (Array.isArray(data)) {
                setStatuses(data);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error saving status:", error);
        }
    };

    // Xử lý lưu Program
    const handleSaveProgram = async () => {
        try {
            console.log("Saving program:", { id: editProgram?.id, name: newProgramName }); // Debug
            
            if (editProgram) {
                await updateProgram(editProgram.id, newProgramName);
            } else {
                await createProgram(newProgramName);
            }

            // Load lại danh sách Program sau khi cập nhật
            const data = await getPrograms();
            console.log("Program data after save:", data); // Debug
            
            // Handle different possible response structures
            if (data.code === 0 && Array.isArray(data.data)) {
                setPrograms(data.data);
            } else if (Array.isArray(data)) {
                setPrograms(data);
            } else if (data.code === 200 && data.data?.items) {
                // If the structure is similar to faculties
                setPrograms(data.data.items);
            }
            
            handleCloseModal();
        } catch (error) {
            console.error("Error saving program:", error);
        }
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
                <div className={`${styles.tab} ${activeTab === "program" ? styles.activeTab : ""}`} onClick={() => setActiveTab("program")}>
                    Student Program Management
                </div>
            </div>

            {activeTab === "faculty" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Faculty List</p>
                        <button className={styles.addBtn} onClick={handleOpenFacultyModal}>Add Faculty</button>
                    </div>
                    <Table 
                        columns={[{ key: "id", label: "ID" }, { key: "name", label: "Faculty" }]} 
                        data={faculties} 
                        onRowClick={handleEditFaculty}
                    />
                </>
            )}

            {activeTab === "status" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Status List</p>
                        <button className={styles.addBtn} onClick={handleOpenStatusModal}>Add Status</button>
                    </div>
                    <Table 
                        columns={[{ key: "id", label: "ID" }, { key: "name", label: "Status" }]} 
                        data={statuses} 
                        onRowClick={handleEditStatus}
                    />
                </>
            )}

            {activeTab === "program" && (
                <>
                    <div className={styles.topAction}>
                        <p className={styles.title}>Program List</p>
                        <button className={styles.addBtn} onClick={handleOpenProgramModal}>Add Program</button>
                    </div>
                    <Table 
                        columns={[{ key: "id", label: "ID" }, { key: "name", label: "Program" }]} 
                        data={programs} 
                        onRowClick={handleEditProgram}
                    />
                </>
            )}

            {/* Pop-ups quản lý */}
            {showFacultyModal && (
                <Modal 
                    title={editFaculty ? "Edit Faculty" : "Add Faculty"} 
                    value={newFacultyName} 
                    setValue={setNewFacultyName} 
                    onSave={handleSaveFaculty} 
                    onClose={handleCloseModal} 
                />
            )}
            
            {showStatusModal && (
                <Modal 
                    title={editStatus ? "Edit Status" : "Add Status"} 
                    value={newStatusName} 
                    setValue={setNewStatusName} 
                    onSave={handleSaveStatus} 
                    onClose={handleCloseModal} 
                />
            )}
            
            {showProgramModal && (
                <Modal 
                    title={editProgram ? "Edit Program" : "Add Program"} 
                    value={newProgramName} 
                    setValue={setNewProgramName} 
                    onSave={handleSaveProgram} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
}

export default InformationManagement;