import Navbar from "./navbar";
import '../hr.css'
import { useEffect, useState } from "react";
import axios from "axios";

function ManagerOnBoarding(){

    const [jobTitle, setJobTitle] = useState([])
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [contact,setContact] = useState(null);
    const [jobTitleVal,setJobTitleVal] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [msg,setMsg] = useState(null);

    useEffect(() =>{
        axios.get('http://localhost:8081/api/cap/jobtype',{
            headers:{
                'Authorization' : 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            console.log(resp.data)
            setJobTitle(resp.data)
        });

    },[]
);

const addManager = ()=>{
    console.log(name);
    console.log(jobTitleVal);
    console.log(email)
    console.log(contact)
    console.log(username);
    console.log(password);
    let data = {
        "name": name,
        "jobTitle" : jobTitleVal,
        "email" : email,
        "contact" : contact,
        "userInfo":{
            "username": username,
            "password": password
        }
    }

    axios.post('http://localhost:8081/api/cap/manager/add',
            data,
              {
                headers:{
                    'Authorization' : 'Basic ' + localStorage.getItem('token')
                }
              }
            ).then(resp=>{
                console.log(resp)
                setMsg('Manager Onboarded Successfully..')
            })  
            .catch(err=>{
                console.log(err)
                setMsg('Manager Onboarding Failed.. please contact IT Admin')
            })

            window.scroll(0,0);
        }

        return(
            <div>
                <Navbar />
                <div className="container mt-4" style={{width: '50%'}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Onboard Manager</h4>
                                </div>
                                <div className="card-body employee-form">
                                    {
                                        msg === null?'':
                                        <div class="alert alert-primary" role="alert">
                                            {msg}
                                        </div>
                                    }
    
                                    <div className="mb-3">
                                        <h4>Personal Info</h4>
                                    </div>
                                    <div class="mb-3">
                                        <label className="form-label">Enter Name: </label>
                                        <input type="text" class="form-control" placeholder="Enter full name" 
                                         onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Select Job Title: </label>
                                        <select className="form-select" aria-label="Default select example" 
                                         onChange={(e)=>setJobTitleVal(e.target.value)}>
                                                <option selected> </option>
                                                {
                                                    jobTitle.map((e,index)=>(
                                                        <option value={e} key={index}>{e}</option>
                                                    ))
                                                }
    
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label className="form-label">Enter Email: </label>
                                        <input type="text" class="form-control" placeholder="Enter email" 
                                         onChange={(e)=>setEmail(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label className="form-label">Enter Contact: </label>
                                        <input type="number" class="form-control" placeholder="Enter contact" 
                                         onChange={(e)=>setContact(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <h4>Manager Credentials</h4>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter Username: </label>
                                        <input type="text" class="form-control" placeholder="Enter username" 
                                         onChange={(e)=>setUsername(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Enter Password: </label>
                                        <input type="text" class="form-control" placeholder="Enter password" 
                                         onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={()=>addManager()}>Add Manager</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
}

export default ManagerOnBoarding;