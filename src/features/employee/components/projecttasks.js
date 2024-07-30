import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import Navbar from "./navbar";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './css/projecttasks.css';

function ProjectTasks() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/cap/project/tasks/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setData(resp.data);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">Explore Projects and Tasks</div>
                            <div className="card-body">
                                <Accordion>
                                    {data.map((project, index) => (
                                        <AccordionTab key={index} header={`Project Name: ${project.name}`}>
                                            <div className="project-details">
                                                <h5 className="section-title">Project Details</h5>
                                                <hr />
                                                <p><strong>Name:</strong> {project.name}</p>
                                                <p><strong>Description:</strong> {project.description}</p>
                                            </div>
                                            <div className="task-details">
                                                <h5 className="section-title">Tasks Assigned to Project {project.name}</h5>
                                                <hr />
                                                {project.tasks.map((task, taskIndex) => (
                                                    <div key={taskIndex} className="task-card">
                                                        <p><strong>Name:</strong> {task.name}</p>
                                                        <p><strong>Task Details:</strong> {task.taskDetails}</p>
                                                        <p><strong>Priority:</strong> {task.priority}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionTab>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectTasks;
