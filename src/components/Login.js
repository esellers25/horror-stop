import {useHistory} from "react-router-dom";

function Login({handleLogin}) {

    const history = useHistory()
    
    function logIn(e){
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: e.target[0].value,
                password: e.target[1].value
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
                <input name="username" type="text"/>
                <label>Password</label>
                <input name="password" type="password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login; 