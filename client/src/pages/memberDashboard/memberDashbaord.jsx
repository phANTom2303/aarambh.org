import MemberList from "./memberList";
import AddMemberForm from "./addMemberForm";
import { useState } from "react";
export default function MemberDashboard() {
   
    const [isFormActive, setIsFormActive] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    return (<>

        {isFormActive && <AddMemberForm setIsFormActive={setIsFormActive} />}
        
        {!isFormActive &&
            <>
                <input 
                    type="text" 
                    value={searchFilter} 
                    onChange={(e) => setSearchFilter(e.target.value)} 
                    placeholder="Search Members"
                />
                <button onClick={() => setIsFormActive(true)}>Add Member</button>
                <MemberList searchFilter={searchFilter}/>
            </>
        }
    </>
    );
}