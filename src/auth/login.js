import axios from "axios";
import { useState, useEffect } from "react";
import './login.css';
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [param] = useSearchParams();
    const [msg, setMsg] = useState(param.get('msg'));

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        }
    }, []);

    const onLogin = () => {
        if (!username || !password) {
            setErrorMsg('Please enter both username and password.');
            return;
        }

        let token = window.btoa(username + ":" + password);
        axios.get('http://localhost:8081/api/cap/login', {
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response => {
            console.log(response.data);
            let user = {
                'token': token,
                'username': username,
                'role': response.data.role
            };

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', user.role);

            if (user.role === 'HR') {
                navigate('/hr');
            } else if (user.role === 'MANAGER') {
                navigate('/manager');
            } else if (user.role === 'EMPLOYEE') {
                navigate('/employee');
            }
        })
        .catch(error => {
            setErrorMsg('Invalid Credentials');
        });
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Employee Worktime Management App</h1>
                <h2>Login</h2>
                {errorMsg && <div className="error-msg">{errorMsg}</div>}
                {msg && <div className="alert alert-dark">You have logged out</div>}
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn-primary" onClick={onLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
