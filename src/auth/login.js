import axios from "axios";
import { useState } from "react";
import './login.css'
import { useNavigate } from "react-router";
function Login(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');
    const navigate = useNavigate();

    const onLogin = ()=>{
        let token = window.btoa(username + ":" + password)
        axios.get('http://localhost:8081/api/cap/login',{
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response=>{
            console.log(response.data);
            let user = {
              'token': token,
              'username': username,
              'role': response.data.role
            }
            
            localStorage.setItem('token', token)
            localStorage.setItem('username',username)
            localStorage.setItem('role',user.role)
            
            if(user.role === 'HR'){
              navigate('/hr');
              return; 
            }
            
        })
        .catch(error=>{
             setErrorMsg('Invalid Credentials')
        })
    }
    return (
        <div className="customer-container">
        <div className="customer-form">
          <div className='form-content'>
            <h1>Login</h1>
            <div>{errorMsg}</div>
            <label>Enter username: </label>
            <input type="text" onChange={(e)=>setUsername(e.target.value) }/> 
            
            <br /><br />
            <label>Enter Password: </label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            
            <br /><br />

             <button onClick={()=>onLogin()}>LOGIN</button> 
             
          </div>
        </div>
      </div>
    )
}

export default Login;