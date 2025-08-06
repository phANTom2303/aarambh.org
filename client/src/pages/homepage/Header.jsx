import logo from "../../assets/logo.jpg";
import styles from "./Header.module.css";
import Cta from "./Cta.jsx";
import { Link } from "react-router-dom";


function Header() {
    return (
        <div className={styles.header}>
            <Link to={'/'}>
                <img src={logo} alt="NGO logo" className={styles.logo} />
            </Link>
            <h1 className={styles.title}>Aarambh</h1>
            <Cta />
            {/*<div className={styles.spacer}></div>*/}
        </div>
    );
}

export default Header;