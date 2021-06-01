function Header() {
    
    function logOut(){
        localStorage.clear()
    }
    
    return (
        <div>
            <h1>SPOOKY SITE</h1>
            <button onClick={() => logOut()}>LogOut</button>
        </div>
    )
}

export default Header; 