import { useEffect, useState } from "react";
function MemberList(){
    const[member, setMember] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchMembers(){
        console.log("Fetching member list");
        try{
            const response = await fetch('http://localhost:4000/members/');
             console.log("✅ Response received:", response);
            if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("✅ JSON data:", data);

            const details = data.map((member) => ({
                name: member.name,
                since: member.dateOfJoin,
            }));
            setMember(details);
        }    
        catch(e){
            console.error("Failed to fetch members:",e);
            setError(e.message);
        }
        finally{
            setLoading(false);
        }
        }
        fetchMembers();
        
    },[]);
    if(loading)
        return <p>Loading members</p>
    if(error)
        return <p>Error: {error}</p>    
    return(
        <ul>
            {member.map((m, id)=> (
                <li key ={id}>
                    {m.name} | Member since: {m.since}
                </li>
            ))}
        </ul>
    )
}
export default MemberList;
