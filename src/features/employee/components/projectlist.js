import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import './projectlist.css'; 

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ProjectList() {
    const query = useQuery();
    const empName = query.get("empName"); // Get empName from query parameter
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/cap/employee/projects', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setProjects(resp.data);
        })
        .catch(error => {
            console.error("There was an error fetching the projects!", error);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">Projects Assigned to <span className="empName">{empName}</span> </div>
                        <div className="card-body">
                            {projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <Accordion defaultActiveKey={index} key={index}>
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header>Project Name: {project.name}</Accordion.Header>
                                            <Accordion.Body>
                                                <div>
                                                    <span>Project Details</span>
                                                    <hr />
                                                    <p>Description: {project.description}</p>
                                                    
                                                    
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            ) : (
                                <p>No projects found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
