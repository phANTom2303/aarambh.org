import logo from  "./assets/logo.jpg";
import "./Header.css"

function Header(){
    return(
        <div className="header">
            <img src = {logo} alt = "NGO logo" className="logo" />
            <h1>Aarambh</h1>
            <div className="spacer"></div>
        </div>
    )
}
export default Header