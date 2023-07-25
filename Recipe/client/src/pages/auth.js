import {useState} from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
export const Auth = () => {
    return <div className="auth">
        <Login />
        <Register />
    </div>
}




const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_,setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    const onSubmit = async(event)=>{
        event.preventDefault()
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {
                username: `${username}`,
                password: `${password}`,
            })
            setCookies("access_token",response.data.token)
            window.localStorage.setItem("userID",response.data.userID)
            navigate("/")
        }catch(err){
            console.error(err)
        }
    }
    return <Form label="Login" username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit = {onSubmit} />
}


const Register = ()=>{

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) =>{
        event.preventDefault()
        try{
            await axios.post("http://localhost:3001/auth/register",{
                username: `${username}`,
                password: `${password}`,
        });
        alert("Regisration Completed! Now login.");
        }catch(err){
            console.error(err)
        }

    }
    return <Form label = "Register" username ={username} setUsername={setUsername} password ={password} setPassword = {setPassword}
        onSubmit = {onSubmit}
    />
}


const Form = ({label,username, setUsername, password, setPassword,onSubmit})=>{
    return  <div className="auth-container">
        <form onSubmit = {onSubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.password)}
                />
            </div>
            <button type="submit">{label}</button>
        </form>
    </div>
}