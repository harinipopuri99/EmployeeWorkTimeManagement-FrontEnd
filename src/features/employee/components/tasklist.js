import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './projectlist.css';
import Navbar from "./navbar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function TaskList() {
    const navigate = useNavigate();
    const query = useQuery();
    const empName = query.get("empName");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/cap/task/employee/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setTasks(resp.data);
        })
        .catch(error => {
            console.error("There was an error fetching the tasks!", error);
        });
    }, []);

    return (

        <div>
      <Navbar />
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Tasks Assigned to <span className="empName">{empName}</span></h5>
                           
                        </div>
                        <div className="card-body">
                            {tasks.length > 0 ? (
                                <DataTable value={tasks} paginator rows={10} className="p-datatable-sm">
                                    <Column field="name" header="Task Name" sortable></Column>
                                    <Column field="taskDetails" header="Task Details" sortable></Column>
                                    <Column field="priority" header="Priority" sortable></Column>
                                    <Column field="startDate" header="Start date" sortable></Column>
                                    <Column field="endDate" header="End date" sortable></Column>
                                </DataTable>
                            ) : (
                                <p>No tasks found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default TaskList;
