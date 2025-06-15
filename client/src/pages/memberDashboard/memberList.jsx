import { useEffect, useState } from "react"; // Import useState and useEffect
import MemberCard from "./memberCard";
import axios from "axios";
export default function MemberList({ searchFilter }) {
    // State to store members, loading status, and errors
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]); // New state for filtered members
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshToggle, setRefreshToggle] = useState(true);
    useEffect(() => {
        // Function to fetch members from the API
        async function fetchMembers() {
            console.log("fetch");
            try {
                const response = await fetch('http://localhost:4000/members/');

                if (!response.ok) {
                    // If response is not OK (e.g., 404, 500), throw an error
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                setMembers(data); // Update members state with fetched data
                // setFilteredMembers(data); // Initialize filtered members as well

            } catch (e) {
                console.error("Failed to fetch members:", e);
                setError(e.message); // Set error state
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
            }
        }

        fetchMembers(); // Call the fetch function
    }, [refreshToggle]);

    // useEffect to filter members when searchFilter or members change
    useEffect(() => {
        if (!searchFilter) {
            setFilteredMembers(members); // If no filter, show all members
        } else {
            const lowercasedFilter = searchFilter.toLowerCase();
            const trimmedFilter = lowercasedFilter.trim();
            const filtered = members.filter(member =>
                member.name.toLowerCase().includes(trimmedFilter)
            );
            setFilteredMembers(filtered);
        }
    }, [searchFilter, members]);



    function handleDeleteUser(memberID) {
        // Find the member in the members array using the memberID
        const memberToDelete = members.find(member => member._id === memberID);
        const memberName = memberToDelete ? memberToDelete.name : 'this member';

        if (window.confirm(`Are you sure you want to delete ${memberName}? This action cannot be undone.`)) {

            axios.delete(`http://localhost:4000/members/${memberID}`)
                .then((response) => {
                    alert(`${response.data.msg}`);
                })
                .catch((error) => {
                    alert(`${error.response.data.msg || error.response || error}`);
                })
                .finally(() => {
                    setRefreshToggle(refreshToggle => !refreshToggle);
                })
        }
    }
    // Conditional rendering based on loading and error states
    if (loading) {
        return <p>Loading members...</p>;
    }

    if (error) {
        return <p>Error loading members: {error}</p>;
    }

    return (
        <>
            {filteredMembers.length > 0 ? ( // Use filteredMembers for rendering
                filteredMembers.map(member => (
                    <MemberCard
                        key={member._id}
                        memberID={member._id}
                        name={member.name}
                        phoneNumber={member.phoneNum}
                        email={member.email}
                        dateOfJoining={member.dateOfJoin}
                        deleteFunction={handleDeleteUser}
                    />
                ))
            ) : (
                <p>No members found.</p> // Display if no members are fetched or filtered list is empty
            )}
        </>
    );
}