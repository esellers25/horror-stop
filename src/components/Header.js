import {useHistory, NavLink} from "react-router-dom";

function Header({user}) {
    const history = useHistory()
    
    function logOut(){
        localStorage.clear()
        history.push("/login")
    }

    function logIn(){
        history.push("/login")
    }
    
    return (
        <div>
            <h1>SPOOKY SITE</h1>
            <div>
                <nav>
                    <NavLink to="/home">Home</NavLink>
                    {user ? <button onClick={() => logOut()}>Logout</button> : <button onClick={() => logIn()}>Login</button>}
                </nav>
            </div>
        </div>
    )
}

export default Header; 