import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar";
import { getCurrEmployee } from "../../store/action/employee";
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 

const styles = {
    greeting: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    icon: {
        marginRight: '10px',
        fontSize: '2rem',
        color: '#007bff'
    }
}

function Employee() {
    const [searchStrVal, setSearchStrVal] = useState(null);

    const handleSearch = (searchStr) => {
        setSearchStrVal(searchStr);
    }

    const dispatch = useDispatch();
    const currentEmployee = useSelector(state => state.employee.currentEmployee);

    useEffect(() => {
        dispatch(getCurrEmployee());
    }, [dispatch]);

    if (!currentEmployee) {
        return <div>Loading...</div>;
    }

    const empName = currentEmployee.name;

    return (
        <div>
            <Navbar searchFn={handleSearch} empName={currentEmployee.name} />
            <div className="container mt-4">
                <Card>
                    <div style={styles.greeting}>
                        <i className="pi pi-user" style={styles.icon}></i>
                        Welcome, {empName}!
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Employee;
