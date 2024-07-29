import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './projectlist.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ProjectList() {
    const navigate = useNavigate();
    const query = useQuery();
    const empName = query.get("empName");
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

    const handleLogout = ()=>{
        localStorage.clear();
        navigate('/?msg=looged_out')
      }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Projects Assigned to <span className="empName">{empName}</span></h5>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="card-body">
                            {projects.length > 0 ? (
                                <DataTable value={projects} paginator rows={10} className="p-datatable-sm">
                                    <Column field="name" header="Project Name" sortable></Column>
                                    <Column field="description" header="Description" sortable></Column>
                                </DataTable>
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
