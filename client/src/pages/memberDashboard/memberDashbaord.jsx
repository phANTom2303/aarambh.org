import MemberList from "./memberList";
import AddMemberForm from "./addMemberForm";
import { useState } from "react";
import styles from './memberDashboard.module.css'; // Import CSS module

export default function MemberDashboard() {
   
    const [isFormActive, setIsFormActive] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    return (<div className={styles.dashboardContainer}> {/* Use styles.dashboardContainer */}

        {isFormActive && <AddMemberForm setIsFormActive={setIsFormActive} />}
        
        {!isFormActive &&
            <>
                <div className={styles.controlsContainer}> {/* Use styles.controlsContainer */}
                    <input 
                        type="text" 
                        value={searchFilter} 
                        onChange={(e) => setSearchFilter(e.target.value)} 
                        placeholder="Search Members🔎"
                        className={styles.searchInput} // Use styles.searchInput
                    />
                    <button onClick={() => setIsFormActive(true)} className={styles.addButton}>➕ Add Member</button> {/* Use styles.addButton */}
                </div>
                <MemberList searchFilter={searchFilter}/>
            </>
        }
    </div>
    );
}