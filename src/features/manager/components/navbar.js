import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import './css/navbar.css'; // Importing navbar CSS

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/?msg=logged_out');
    };

    const items = [
        {
            label: 'List Employees',
            icon: 'pi pi-fw pi-users',
            command: () => { navigate('/list-employees'); }
        },
        {
            label: 'Create Project',
            icon: 'pi pi-fw pi-briefcase',
            command: () => { navigate('/create-project'); }
        },
        {
            label: 'Create Task',
            icon: 'pi pi-fw pi-check-square',
            command: () => { navigate('/create-task'); }
        },
        {
            label: 'Send Notification',
            icon: 'pi pi-fw pi-bell',
            command: () => { navigate('/send-notification'); }
        },
    ];

    const start = <span className="p-menubar-logo" onClick={() => navigate('/manager')}>Manager Dashboard</span>;
    const end = (
        <>
           
            <Button label="Logout" icon="pi pi-power-off" className="p-button-secondary" onClick={logout} />
        </>
    );

    return (
        <Menubar model={items} start={start} end={end} className="custom-menubar" />
    );
}

export default Navbar;
