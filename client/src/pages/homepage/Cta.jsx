import { useState } from "react";
import "./Cta.css";

function Cta(){

const [action, setAction] = useState(false);

return(<>
<div className="slider" onClick={() => setAction(!action)}>
&#9776;
</div>
{action && (
    <div className="select">
        <a href="#memberList">Members</a>
    </div>
)}
</>);
}
export default Cta