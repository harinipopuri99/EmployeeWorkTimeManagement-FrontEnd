import Navbar from '../../employee/components/navbar';
import '../manager.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from 'primereact/calendar';

function CreateTask() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState(null);
    const [taskDetails, setTaskDetails] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [dates, setDates] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/cap/project/all`, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            setProjects(resp.data);
        });
    }, []);

    const addTask = () => {
        console.log(name);
        console.log(taskDetails);
        console.log(projectId)
        console.log(dates);

        let startDate = new Date(dates[0]).toISOString().split("T")[0];
        let endDate = new Date(dates[1]).toISOString().split("T")[0];
        
        let data = {
            "name" : name,
            "taskDetails" : taskDetails,
            "startDate" : startDate,
            "endDate" : endDate
        };

        axios.post('http://localhost:8081/api/cap/task/project/' + projectId, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log(resp);
            setMsg('Task Added Successfully..');
        })
        .catch(err => {
            console.log(err);
            setMsg('Adding Task Failed.. Please contact IT Admin');
        });

        window.scroll(0, 0);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ width: '50%' }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Create Task</h4>
                            </div>
                            <div className="card-body employee-form">
                                {
                                    msg === null ? '' :
                                    <div className="alert alert-primary" role="alert">
                                        {msg}
                                    </div>
                                }

                                <div className="mb-3">
                                    <h4>Add Task Details</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Name: </label>
                                    <input type="text" className="form-control" placeholder="Enter name of the Task"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Description: </label>
                                    <input type="text" className="form-control" placeholder="Enter Description"
                                        onChange={(e) => setTaskDetails(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <h4>Link to Project</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Project: </label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => setProjectId(e.target.value)}>
                                        <option value=""> </option>
                                        {
                                            projects.map((project, index) => (
                                                <option value={project.id} key={index}>{project.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <label>Enter Start and end date for the task: </label>
                                <br />
                                <div className="card flex justify-content-center">
                                <Calendar
                                    value={dates}
                                    onChange={(e) => setDates(e.value)}
                                    selectionMode="range"
                                    readOnlyInput
                                    hideOnRangeSelection
                                />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={() => addTask()}>Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;
