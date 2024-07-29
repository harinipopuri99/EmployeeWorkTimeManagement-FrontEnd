import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

function ProjectTasks(){

    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8081/api/cap/hr/manager/employee',{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            setData(resp.data)
        })
    },[])
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header ">Explore Managers and Employees</div>
              <div className="card-body ">
                {
                    data.map((m,index)=>(
                        <Accordion defaultActiveKey={index} key={index}>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>Manager Name: {m.name} </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <span>Manager Details</span>
                            <hr />
                            <p>Job Title: {m.jobTitle} </p>
                            <p>Email: {m.email} </p>
                            <p>Contact: {m.contact} </p>
                        </div>
                        <div>
                            <span>Employees Assigned to Manager {m.name}</span>
                            <hr />
                             {
                                m.employees.map((e,index)=>(
                                    <div className="card mt-2">
                                        <div className="card-body ">
                                            <p >Name: {e.name} </p>
                                            <p>Job Title: {e.jobTitle} </p>
                                            <p>Salary: {e.salary} </p>
                                            <p>City: {e.city} </p>
                                        </div>        
                                    </div>
                                ))
                             }
                        </div>
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>

                    ))
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProjectTasks;

//