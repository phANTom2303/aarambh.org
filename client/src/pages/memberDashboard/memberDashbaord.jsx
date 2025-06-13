import MemberList from "./memberList";
import MemberForm from "./addMemberForm";
import { useState } from "react";
export default function MemberDashboard() {
   
    const [isFormActive, setIsFormActive] = useState(false);
    return (<>

        {isFormActive && <MemberForm setIsFormActive={setIsFormActive} />}
        
        {!isFormActive &&
            <>
                <button onClick={() => setIsFormActive(true)}>Add Member</button>
                <MemberList />
            </>
        }
    </>
    );
}