import MemberList from "./memberList";
import AddMemberForm from "./addMemberForm";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useState } from "react";
import styles from './memberDashboard.module.css'; // Import CSS module
import ModifyMemberForm from "./modifyMemberForm";

export default function MemberDashboard() {

    const [isFormActive, setIsFormActive] = useState(false);
    const [isModifyFormActive, setIsModifyFormActive] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [memberToModify, setMemberToModify] = useState({
        name: "",
        email: "",
        phoneNum: "",
        dateOfJoin: "",
    });
    return (
        <>
            <AdminHeader />
            <div className={styles.dashboardContainer}> {/* Use styles.dashboardContainer */}

        {isFormActive && <AddMemberForm setIsFormActive={setIsFormActive} />}

        {isModifyFormActive && <ModifyMemberForm setIsModifyFormActive={setIsModifyFormActive} member={memberToModify} />}

        {(!isFormActive && !isModifyFormActive) &&
            <>
                <div className={styles.controlsContainer}> {/* Use styles.controlsContainer */}
                    <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Search Members🔎"
                        className={styles.searchInput} // Use styles.searchInput
                    />
                    <button onClick={() => setIsFormActive(true)} className={styles.addButton}>➕ Add Member</button>
                </div>
                <MemberList searchFilter={searchFilter} setIsModifyFormActive={setIsModifyFormActive} setMemberToModify={setMemberToModify} />
            </>
        }
            </div>
        </>
    );
}