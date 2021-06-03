import {useHistory, NavLink} from "react-router-dom";
import {Button} from "semantic-ui-react";

function Header({user}) {
    const history = useHistory()
    
    function logOut(){
        localStorage.clear()
        history.push("/login")
    }

    function logIn(){
        history.push("/login")
    }

    function homeClick(){
        history.push("/home")
    }
    
    return (
        <div>
            <h1 onClick={homeClick}>FRIGHT SITE</h1>
            <div>
                <nav className="navbar">
                    <NavLink to="/home">Home</NavLink>
                    {user ? <NavLink to="/login" onClick={() => logOut()}>Logout</NavLink> : <NavLink to="/login" onClick={() => logIn()}>Login</NavLink>}
                </nav>
            </div>
        </div>
    )
}

export default Header; 