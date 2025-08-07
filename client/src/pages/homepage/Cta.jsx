import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Cta.module.css";

function Cta() {
    const [action, setAction] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToContact = (e) => {
        e.preventDefault();
        if(location.pathname === '/'){
            const contactSection = document.querySelector('#contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            navigate('/', {state: {scrollTo: 'contact'}});
        }
    };

    const reloadPage = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.location.reload();
    };

    const scrollToDonate = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const donateSection = document.querySelector('#donate-section');
            if (donateSection) {
                donateSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(() => {
                    const donateButton = donateSection.querySelector('button');
                    if (donateButton) {
                        donateButton.click();
                    }
                }, 1000);
            }
        } else {
            navigate('/', { state: { scrollTo: 'donate' } });
        }
    };

    return (
        <>
            {/*Desktop navigation*/}
            <div className={styles.desktopNav}>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                <a href="/members" onClick={(e) => { e.preventDefault(); navigate('/members'); }}>Our Team</a>
                <a href="/activities" onClick={(e) => { e.preventDefault(); navigate('/activities'); }}>Activities</a>
                <a href="#contact" onClick={scrollToContact}>Contact</a>
                <button className={styles.donateBtn} onClick={scrollToDonate}>Donate Now</button>
            </div>

            {/*Mobile navigation*/}
            <div className={styles.hamburger} onClick={() => setAction(true)}>
                &#9776;
            </div>
            <div className={`${styles.sidebar} ${action ? styles.open : ""}`}>
                <span className={styles.closeBtn} onClick={() => setAction(false)}>
                    &times;
                </span>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setAction(false); }}>
                    Home
                </a>
                <a href="/members" onClick={(e) => { e.preventDefault(); navigate('/members'); setAction(false); }}>
                    Our Team
                </a>
                <a href="/activities" onClick={(e) => { e.preventDefault(); navigate('/activities'); setAction(false); }}>
                    Activities
                </a>
                <a href="#contact" onClick={(e) => { scrollToContact(e); setAction(false); }}>
                    Contact
                </a>
                <button
                    className={styles.mobileDonateBtn}
                    onClick={(e) => { scrollToDonate(e); setAction(false); }}
                >
                    Donate Now
                </button>
            </div>

            {action && (
                <div className={styles.overlay} onClick={() => setAction(false)}></div>
            )}
        </>
    );
}

export default Cta;
