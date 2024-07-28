import { Route, Routes } from "react-router";
import Login from "./auth/login";
import HR from "./features/hr/hr";
import EmployeeOnBoarding from "./features/hr/components/employeeonboarding";
import ManagerOnBoarding from "./features/hr/components/manageronboarding";
import Manager from "./features/manager/manager";
import { Provider } from "react-redux";
import store from "./store";
import ProjectList from "./features/employee/components/projectlist";
import Employee from "./features/employee/employee";
import CreateProject from "./features/manager/components/createproject";
import EmployeeList from "./features/manager/components/employeeList";

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
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/project-list" element={<ProjectList />}></Route>
      </Routes>
      </Provider>
    </div>
   )
}

export default App;