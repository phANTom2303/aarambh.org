import { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
import Header from "../homepage/Header";
import Footer from "../../components/Footer/Footer";

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
    const [searchTerm, setSearchTerm] = useState("");
    
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
    
    // Search members
    const filteredMembers = member.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (loading) return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <p>Loading members...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <p>Error: {error}</p>
            </div>
        </div>
    );
    
    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <div className={styles.contentWrapper}>
                <div className={styles.heroSection}>
                    <h2 className={styles.pageTitle}>Our Team</h2>
                    <p className={styles.introText}>
                        Introducing to you our consistent heroes - the dedicated individuals who make our mission possible through their unwavering commitment and passion.
                    </p>
                    
                    <div className={styles.searchContainer}>
                        <input 
                            type="text" 
                            placeholder="Search members..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchBar}
                        />
                    </div>
                </div>

                <div className={styles.memberGrid}>
                    {filteredMembers.map((m, id) => (
                        <div className={styles.memberItem} key={id}>
                            <strong className={styles.memberName}>{m.name}</strong>
                            <p className={styles.memberDate}>Member since: {formatDate(m.since)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default PublicMemberList;