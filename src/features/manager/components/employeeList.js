import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from "primereact/api";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { getEmployees } from '../../../store/action/employee';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EmployeeList() {
  const navigate = useNavigate();
  const query = useQuery();
  const empName = query.get("empName");
  const dispatch = useDispatch();
  const list = useSelector(state => state.employee.list);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(false);
  const [employee, setEmployee] = useState({});
  const [taskId, setTaskId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState([]);
  const [priorityValue, setPriorityValue] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      await dispatch(getEmployees());
      setLoading(false);
    };

    fetchEmployees();
  }, [dispatch]);

  useEffect(() => {
    setData([...list]);
  }, [list]);

  const [filters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CUSTOM },
    city: { value: null, matchMode: FilterMatchMode.EQUALS },
    salary: { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  const fetchTasksAndPriorities = async () => {
    try {
      const tasksResp = await axios.get(`http://localhost:8081/api/cap/tasks/all`, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      });
      setTasks(tasksResp.data);

      const priorityResp = await axios.get(`http://localhost:8081/api/cap/priority/all`, {
        headers: {
          'Authorization': 'Basic ' + localStorage.getItem('token')
        }
      });
      setPriority(priorityResp.data);
    } catch (err) {
      console.error('Error fetching tasks or priorities:', err);
    }
  };

  const handleAssignTaskClick = (rowData) => {
    setEmployee(rowData);
    setVisible(true);
    setMsg(null);
    fetchTasksAndPriorities();
  };

  const handleShowTasksClick = (rowData) => {
    setEmployee(rowData);
    setVisibleTasks(true);
    setMsg(null);
    showTask(rowData.id);
  };

  const assignTask = () => {
    let empId = employee.id;

    axios.post('http://localhost:8081/api/cap/task/employee/' + empId + '/' + taskId, {}, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
      .then(resp => {
        setMsg("Task Assigned to " + employee.name + " successfully.");
      })
      .catch(err => {
        setMsg("Operation Failed, please contact Admin.");
      });
  };

  const globalSearch = (val) => {
    if (val === '')
      setData(list);
    else {
      let temp = [...data.filter(row => row.name.toLowerCase().search(val) !== -1)];
      setData(temp);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText onChange={(e) => globalSearch(e.target.value)} placeholder="Keyword Search" />
        </IconField>
      </div>
    );
  };

  const showTask = (id) => {
    axios.get('http://localhost:8081/api/cap/task/' + id, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
      .then(resp => {
        setTasks(resp.data);
      })
      .catch(err => {
        console.error('Error fetching task details:', err);
      });
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <button className="btn btn-info" onClick={() => handleShowTasksClick(rowData)}>Show Tasks</button>
        &nbsp;&nbsp;
        <button className="btn btn-warning" onClick={() => handleAssignTaskClick(rowData)}>Assign Task</button>
      </div>
    );
  };

  const cityRowFilter = (value) => {
    console.log(value);
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        Assign task to {employee?.name}
      </span>
      {msg && (
        <div className="alert alert-warning" role="alert">
          {msg}
        </div>
      )}
    </div>
  );

  const footerContent = (
    <div>
      <button className="btn btn-warning" onClick={() => assignTask()}>Assign</button>
      &nbsp;&nbsp;&nbsp;
      <button className="btn btn-danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel</button>
    </div>
  );

  const footerContentTask = (
    <div>
      <button className="btn btn-danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel</button>
    </div>
  );

  const archiveTask = (tid) => {
    axios.get('http://localhost:8081/api/cap/task/archive/' + tid, {
      headers: {
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
      .then(resp => {
        setTasks([...tasks.filter(t => t.id !== tid)]);
        setMsg('Task Archived');
      })
      .catch(err => {
        setMsg('Operation Failed, Contact admin');
      });
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/?msg=logged_out')
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Employee List</h5>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <DataTable
        value={data}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        header={header}
        emptyMessage="No employees found."
      >
        <Column field="id" header="System ID" style={{ minWidth: "8rem" }} />
        <Column
          field="name"
          header="Name"
          filterPlaceholder="Search by name"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="city"
          header="City"
          style={{ minWidth: "8rem" }}
          filterPlaceholder="Search by City"
          filterElement={cityRowFilter}
        />
        <Column field="salary" header="Salary" style={{ minWidth: "8rem" }} />
        <Column
          field="jobTitle"
          header="Job Title"
          filterField="jobTitle"
          style={{ minWidth: "12rem" }}
          filterPlaceholder="Search by job Title"
        />
        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
      >
        <div className="mb-3">
          <label className="form-label">Select Task: </label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setTaskId(e.target.value)}>
            <option value="">Select a task</option>
            {tasks.map((task, index) => (
              <option value={task.id} key={index}>{task.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Priority: </label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setPriorityValue(e.target.value)}>
            <option value="">Select a priority</option>
            {priority.map((p, index) => (
              <option value={p} key={index}>{p}</option>
            ))}
          </select>
        </div>
      </Dialog>

      <Dialog
        visible={visibleTasks}
        modal
        header={headerElement}
        footer={footerContentTask}
        style={{ width: "50rem" }}
        onHide={() => setVisibleTasks(false)}
      >
        {tasks.map((t, index) => (
          <div className="row" key={index}>
            <div className="cols-lg-12">
              <div className="card mt-2">
                <div className="card-header">
                  <div>Start Date: {t.startDate}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    End Date: {t.endDate}
                  </div>
                </div>
                <div className="card-body">
                  <p style={{ fontSize: '1.3em', fontFamily: "monospace" }}>{t.taskDetails}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-danger" onClick={() => archiveTask(t.id)}>Archive</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Dialog>
    </div>
  );
}

export default EmployeeList;
