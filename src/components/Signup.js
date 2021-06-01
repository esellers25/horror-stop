import {useHistory} from "react-router-dom";

function Signup(){

    const history = useHistory()

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
        <div>
            <h2>Account Signup</h2>
            <form onSubmit={(e) => signUp(e)}>
                <label>UserName</label>
                <input name="username" type="text"/>
                <label>Password</label>
                <input name="password" type="password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Signup;