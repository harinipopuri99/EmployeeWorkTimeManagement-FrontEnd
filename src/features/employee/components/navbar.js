import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import './css/navbar.css'; // Importing navbar CSS

function Navbar() {
    const currentEmployee = useSelector((state) => state.employee.currentEmployee);
    const navigate = useNavigate();

    if (!currentEmployee) {
        return null;
    }

    const empName = currentEmployee.name;

    const logout = () => {
        localStorage.clear();
        navigate('/?msg=logged_out');
    };

    const items = [
        
        {
            label: 'Explore Projects and Tasks',
            icon: 'pi pi-fw pi-list',
            command: () => { navigate('/projects-tasks'); }
        },
        {
          label: 'My Tasks',
          icon: 'fa fa-check-square',
          command: () => { navigate(`/tasks-list?empName=${empName}`); }
      },
        {
            label: 'Notifications',
            icon: 'pi pi-fw pi-bell',
            command: () => { navigate(`/notification?empName=${empName}`); }
        },
    ];

    const start = <span className="p-menubar-logo" onClick={() => navigate('/employee')}>Employee Dashboard</span>;
    const end = <Button label="Logout" icon="pi pi-power-off" className="p-button-secondary" onClick={logout} />;

    return (
        <Menubar model={items} start={start} end={end} className="custom-menubar" />
    );
}

export default Navbar;
