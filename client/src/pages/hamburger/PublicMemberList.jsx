import { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
import Header from "../homepage/Header";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// ✅ Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();

    const suffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const formatted = `${day}${suffix(day)} ${date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    })}`;

    return formatted;
}

function PublicMemberList() {
    const [member, setMember] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMembers() {
            console.log("Fetching member list");
            try {
                const response = await fetch(`${BACKEND_URL}/members/public`);
                console.log("✅ Response received:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("✅ JSON data:", data);

                const details = data.members.map((member) => ({
                    name: member.name,
                    since: member.dateOfJoin,
                }));
                setMember(details);
            } catch (e) {
                console.error("Failed to fetch members:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMembers();
    }, []);

    if (loading) return <p>Loading members</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header />
            <ul className={styles.memberList}>
                {member.map((m, id) => (
                    <li className={styles.memberItem} key={id}>
                        <h3>{m.name}</h3>
                        <p>📅 Member since: {formatDate(m.since)}</p>
                        <hr className={styles.divider} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default PublicMemberList;
