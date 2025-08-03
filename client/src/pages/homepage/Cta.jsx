import { useState } from "react";
import "./Cta.css";

function Cta() {
  const [action, setAction] = useState(false);

  return (
    <>
    {/*Desktop navigation*/}
    <div className="desktop-nav">
    <a href ="#home">Home</a>
    <a href="#about">About Us</a>
    <a href="#services">Our Works</a>
    <a href="#activities">Activities</a>
    <a href="#contact">Contact</a>
    <button className="donate-btn">Donate Now</button>
    </div>

    {/*Mobile navigation*/}
    <div className="hamburger" onClick={() => setAction(true)}>
        &#9776;
    </div>
    <div className={`sidebar ${action ? "open" : ""}`}>
    <span className="close-btn" onClick={() => setAction(false)}>&times;</span>
    <a href="#memberList" onClick={() => setAction(false)}>Members</a>
    <a href="#home" onClick={() => setAction(false)}>Home</a>
    <a href="#about" onClick={() => setAction(false)}>About Us</a>
    <a href="#services" onClick={() => setAction(false)}>Our Works</a>
    <a href="#activities" onClick={() => setAction(false)}>Activities</a>
    <a href="#contact" onClick={() => setAction(false)}>Contact</a>
    <button className="mobile-donate-btn" onClick={() => setAction(false)}>Donate Now</button>
    </div>

      {action && <div className="overlay" onClick={() => setAction(false)}></div>}
    </>
  );
}

export default Cta;
