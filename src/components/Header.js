import {useHistory} from "react-router-dom";

function Header() {
    const history = useHistory()
    
    function logOut(){
        localStorage.clear()
        history.push("/login")
    }
    
    return (
        <div>
            <h1>SPOOKY SITE</h1>
            <button onClick={() => logOut()}>LogOut</button>
        </div>
    )
}

export default Header; 