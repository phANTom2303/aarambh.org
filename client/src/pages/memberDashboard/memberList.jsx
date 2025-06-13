import { useEffect, useState } from "react"; // Import useState and useEffect
import MemberCard from "./memberCard";

export default function MemberList() {
    // State to store members, loading status, and errors
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch members from the API
        async function fetchMembers() {
            try {
                const response = await fetch('http://localhost:4000/members/');

                if (!response.ok) {
                    // If response is not OK (e.g., 404, 500), throw an error
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setMembers(data); // Update members state with fetched data
            } catch (e) {
                console.error("Failed to fetch members:", e);
                setError(e.message); // Set error state
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
            }
        }

        fetchMembers(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Conditional rendering based on loading and error states
    if (loading) {
        return <p>Loading members...</p>;
    }

    if (error) {
        return <p>Error loading members: {error}</p>;
    }

    return (
        <>
            {members.length > 0 ? (
                members.map(member => (
                    <MemberCard
                        key={member._id}
                        name={member.name}
                        phoneNumber={member.phoneNum}
                        dateOfJoining={member.dateOfJoin}
                    />
                ))
            ) : (
                <p>No members found.</p> // Display if no members are fetched
            )}
        </>
    );
}