import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
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
    const [statuses, setStatuses] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [statusDialogVisible, setStatusDialogVisible] = useState(false);
    const [worklogDialogVisible, setWorklogDialogVisible] = useState(false);
    const [worklogDescription, setWorklogDescription] = useState("");
    const [worklogDate, setWorklogDate] = useState(null);

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

        axios.get('http://localhost:8081/api/cap/status/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setStatuses(resp.data.map(status => ({ label: status, value: status })));
        })
        .catch(error => {
            console.error("There was an error fetching the statuses!", error);
        });
    }, []);

    const actionTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <button className="btn btn-primary btn-sm" onClick={() => handleStatusClick(rowData)}>Status</button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleWorklogClick(rowData)}>Worklog</button>
            </div>
        );
    };

    const handleStatusClick = (task) => {
        setSelectedTask(task);
        setStatusDialogVisible(true);
    };

    const handleWorklogClick = (task) => {
        setSelectedTask(task);
        setWorklogDialogVisible(true);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.value);
    };

    const handleStatusUpdate = () => {
        if (selectedTask && selectedStatus) {
            axios.post(`http://localhost:8081/api/cap/status/${selectedTask.id}/${selectedStatus}`, {}, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            })
            .then(resp => {
                console.log("Status updated successfully", resp.data);
                setStatusDialogVisible(false);
                // Optionally, refresh the task list here
            })
            .catch(error => {
                console.error("There was an error updating the status!", error);
            });
        }
    };

    const handleWorklogSubmit = () => {
        if (selectedTask && worklogDescription && worklogDate) {
            const worklogData = {
                description: worklogDescription,
                date: worklogDate,
                taskId: selectedTask.id,
                employeeId: selectedTask.employee.id // Assuming the task object has an employee field
            };
            axios.post(`http://localhost:8081/api/cap/task/worklog/${selectedTask.id}/${selectedTask.employee.id}`, worklogData, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            })
            .then(resp => {
                console.log("Worklog created successfully", resp.data);
                setWorklogDialogVisible(false);
                // Optionally, refresh the task list here
            })
            .catch(error => {
                console.error("There was an error creating the worklog!", error);
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
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
                                        <Column header="Actions" body={actionTemplate}></Column>
                                    </DataTable>
                                ) : (
                                    <p>No tasks found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog header="Update Status" visible={statusDialogVisible} style={{ width: '30vw' }} modal onHide={() => setStatusDialogVisible(false)}>
                <div className="p-field">
                    <label htmlFor="status">Select Status</label>
                    <Dropdown id="status" value={selectedStatus} options={statuses} onChange={handleStatusChange} placeholder="Select a Status" />
                </div>
                <div className="p-d-flex p-jc-end">
                    <button className="btn btn-primary" onClick={handleStatusUpdate}>Done</button>
                </div>
            </Dialog>

            <Dialog header="Add Worklog" visible={worklogDialogVisible} style={{ width: '30vw' }} modal onHide={() => setWorklogDialogVisible(false)}>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputText id="description" value={worklogDescription} onChange={(e) => setWorklogDescription(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="date">Date</label>
                    <Calendar id="date" value={worklogDate} onChange={(e) => setWorklogDate(e.value)} showIcon />
                </div>
                <div className="p-d-flex p-jc-end">
                    <button className="btn btn-primary" onClick={handleWorklogSubmit}>Submit</button>
                </div>
            </Dialog>
        </div>
    );
}

export default TaskList;
