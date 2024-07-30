import { Route, Routes } from "react-router";
import Login from "./auth/login";
import HR from "./features/hr/hr";
import EmployeeOnBoarding from "./features/hr/components/employeeonboarding";
import ManagerOnBoarding from "./features/hr/components/manageronboarding";
import Manager from "./features/manager/manager";
import { Provider } from "react-redux";
import store from "./store";
import Employee from "./features/employee/employee";
import CreateProject from "./features/manager/components/createproject";
import EmployeeList from "./features/manager/components/employeeList";
import CreateTask from "./features/manager/components/createtask";
import Notification from "./features/manager/components/notification";
import ViewNotification from "./features/employee/components/viewnotification";
import ProjectTasks from "./features/employee/components/projecttasks";
import TaskList from "./features/employee/components/tasklist";

function App() {
   return(
    <div>
      <Provider store={store}>
      <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/hr" element={<HR />}></Route>
          <Route path="/employee-onboarding" element={<EmployeeOnBoarding />}></Route>
          <Route path="/manager-onboarding" element={<ManagerOnBoarding />}></Route>
          <Route path="/manager" element={<Manager />}></Route>
          <Route path="/list-employees" element={<EmployeeList />}></Route>
          <Route path="/create-project" element={<CreateProject />}></Route>
          <Route path="/create-task" element={<CreateTask />}></Route>
          <Route path="/send-notification" element={<Notification />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/tasks-list" element={<TaskList />}></Route>
          <Route path="/notification" element={<ViewNotification />}></Route>
          <Route path="/projects-tasks" element={<ProjectTasks />}></Route>
          
          
      </Routes>
      </Provider>
    </div>
   )
}

export default App;