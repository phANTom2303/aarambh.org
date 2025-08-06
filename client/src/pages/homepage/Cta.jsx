import { useState } from "react";
import styles from "./Cta.module.css";

function Cta() {
  const [action, setAction] = useState(false);

  return (
    <>
      {/*Desktop navigation*/}
      <div className={styles.desktopNav}>
        <a href="#home">Home</a>
        <a href="#services">Our Team</a>
        <a href="#activities">Activities</a>
        <a href="#contact">Contact</a>
        <button className={styles.donateBtn}>Donate Now</button>
      </div>

      {/*Mobile navigation*/}
      <div className={styles.hamburger} onClick={() => setAction(true)}>
        &#9776;
      </div>
      <div className={`${styles.sidebar} ${action ? styles.open : ""}`}>
        <span className={styles.closeBtn} onClick={() => setAction(false)}>
          &times;
        </span>
        <a href="#home" onClick={() => setAction(false)}>
          Home
        </a>
        <a href="#services" onClick={() => setAction(false)}>
          Our Team
        </a>
        <a href="#activities" onClick={() => setAction(false)}>
          Activities
        </a>
        <a href="#contact" onClick={() => setAction(false)}>
          Contact
        </a>
        <button
          className={styles.mobileDonateBtn}
          onClick={() => setAction(false)}
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