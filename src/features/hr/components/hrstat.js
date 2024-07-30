import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';         // Core CSS
import 'primeicons/primeicons.css';                      // Icons
import '../hr.css';

function HRStat() {
    const [countEmployee, setCountEmployee] = useState(0);
    const [countManager, setCountManager] = useState(0);

    useEffect(() => {
        let token = localStorage.getItem('token'); 
        axios.get('http://localhost:8081/api/cap/hr/stat', {
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response => {
            console.log(response.data)
            setCountEmployee(response.data.count_employee);
            setCountManager(response.data.count_manager);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const data = {
        labels: ['Employees', 'Managers'],
        datasets: [
            {
                data: [countEmployee, countManager],
                backgroundColor: ['#42A5F5', '#66BB6A'],
                hoverBackgroundColor: ['#64B5F6', '#81C784']
            }
        ]
    };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    return (
        <div className="p-grid p-justify-center">
            <div className="p-col-12 p-md-5">
                <Card title="Employee Count" style={{ textAlign: 'center' }}>
                    <span className="count">{countEmployee}</span>
                </Card>
            </div>
            <div className="p-col-12 p-md-5">
                <Card title="Manager Count" style={{ textAlign: 'center' }}>
                    <span className="count">{countManager}</span>
                </Card>
            </div>
            <div className="p-col-12 p-md-10 chart-container">
                <Card>
                    <div className="p-d-flex p-jc-center p-ai-center">
                        <Chart type="pie" data={data} options={lightOptions} style={{ width: '300px', height: '300px' }} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default HRStat;
