import axios from "axios";
import { useState } from "react";
import './login.css'
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function Login(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [param] = useSearchParams();
    const [msg,setMsg] = useState(param.get('msg'));


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
            } else if(user.role === 'MANAGER'){
              navigate('/manager');
              return; 
            } else if (user.role === 'EMPLOYEE') {
              navigate('/employee');
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

            {
              msg === "" || msg === undefined || msg === null?'':<div class="alert alert-dark" role="alert">
              You have logged Out
            </div>
            }

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