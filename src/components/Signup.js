import {useHistory} from "react-router-dom";

function Signup(){

    const history = useHistory()

    function handleLoginClick(){
        history.push("/login")
    }

    function signUp(e){
        e.preventDefault()
        fetch("http://localhost:3000/users", {
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
        .then(history.push("/login"))
    }

    return(
        <div className="login-form">
            <h2>Signup for an Account</h2>
            <form onSubmit={(e) => signUp(e)}>
                <label>UserName</label>
                <input name="username" type="text"/>
                <label>Password</label>
                <input name="password" type="password"/>
                <input type="submit"/>
            </form><br></br>
            <h4>Already have an account?</h4>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    )
}

export default Signup;