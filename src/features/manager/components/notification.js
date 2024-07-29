import Navbar from '../../manager/components/navbar';
import '../manager.css';
import { useEffect, useState } from "react";
import axios from "axios";

function Notification() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState(null);
    const [message, setMessage] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/cap/manager/employee`, {
                    headers: {
                        'Authorization': 'Basic ' + localStorage.getItem('token')
                    }
                });
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []); // The empty dependency array means this useEffect runs once when the component mounts.

    const sendNotification = () => {
        console.log(name);
        console.log(message);
        console.log(employeeId);
        
        let data = {
            "name": name,
            "message": message
        };

        axios.post('http://localhost:8081/api/cap/notification/' + employeeId, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log(resp);
            setMsg('Notification Added Successfully.');
        })
        .catch(err => {
            console.log(err);
            setMsg('Adding Notification Failed. Please contact IT Admin');
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
                                <h4>Send Notification</h4>
                            </div>
                            <div className="card-body employee-form">
                                {
                                    msg === null ? '' :
                                    <div className="alert alert-primary" role="alert">
                                        {msg}
                                    </div>
                                }

                                <div className="mb-3">
                                    <h4>Add Notification Details</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Subject: </label>
                                    <input type="text" className="form-control" placeholder="Enter subject"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Message: </label>
                                    <input type="text" className="form-control" placeholder="Enter Message"
                                        onChange={(e) => setMessage(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <h4>Select Employee</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Employee: </label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => setEmployeeId(e.target.value)}>
                                        <option value=""> </option>
                                        {
                                            employees.map((employee, index) => (
                                                <option value={employee.id} key={index}>{employee.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={() => sendNotification()}>Send Notification</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;
