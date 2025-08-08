import { useEffect, useState } from "react";
import styles from "./MemberList.module.css";
import Header from "../homepage/Header";
import HeaderSpacer from "../../components/headerSpacer/headerSpacer";
import Footer from "../../components/Footer/Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Founding members list
const FOUNDING_MEMBERS = ["Dolly Nandy", "Mamata M. Sharma", "Swapna Shaw"];

// ✅ Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const formatted = `${date.toLocaleString("en-US", {
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

    // Filter all members and exclude founding members from regular list
    const regularMembers = member.filter(m => {
        // Exclude founding members from regular members list
        const isFoundingMember = FOUNDING_MEMBERS.some(founder => 
            founder.toLowerCase() === m.name.toLowerCase()
        );
        // Include only if not a founding member and matches search term
        return !isFoundingMember && m.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className={styles.pageContainer}>
            <Header />
            <HeaderSpacer />
            <div className={styles.contentWrapper}>
                <p>Loading members...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.pageContainer}>
            <Header />
            <HeaderSpacer />
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

                {FOUNDING_MEMBERS.length > 0 && (
                    <>
                        <div className={styles.memberGrid}>
                            {FOUNDING_MEMBERS.map((m, id) => (
                                <div className={styles.memberItem} key={id}>
                                    <strong className={styles.memberName}>{m}</strong>
                                    <p className={styles.memberDate}>Founder</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {regularMembers.length > 0 && (
                    <>
                        <div className={styles.memberGrid}>
                            {regularMembers.map((m, id) => (
                                <div className={styles.memberItem} key={id}>
                                    <strong className={styles.memberName}>{m.name}</strong>
                                    {m.since && 
                                        <p className={styles.memberDate}>{formatDate(m.since)}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {regularMembers.length === 0 && searchTerm && (
                    <div className={styles.noResults}>
                        <p>No members found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            <Footer></Footer>
        </div>
    );
}

export default PublicMemberList;