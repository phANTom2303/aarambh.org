import logo from "../../assets/logo.jpg";
import styles from "./Header.module.css";
import Cta from "./Cta.jsx";

function Header() {
    return (
        <div className={styles.header}>
            <img src={logo} alt="NGO logo" className={styles.logo} />
            <h1 className={styles.title}>Aarambh</h1>
            <Cta />
            {/*<div className={styles.spacer}></div>*/}
        </div>
    );
}

export default Header;