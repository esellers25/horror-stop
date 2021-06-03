import {useHistory} from "react-router-dom";
import {useState} from "react";

function Login({handleLogin}) {

    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function logIn(e){
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r => r.json())
        .then(userInfo => {
            localStorage.token = userInfo.token 
            handleLogin(userInfo)
            history.push("/home")
        })
    }
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => logIn(e)}>
                <label>UserName</label>
                <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login; 