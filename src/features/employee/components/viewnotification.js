import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from "./navbar";
import './css/viewnotification.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ViewNotification() {
    const navigate = useNavigate();
    const query = useQuery();
    const empName = query.get("empName");
    const [notifications, setNotifications] = useState([]);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/cap/notification/employee/all', {
                    headers: {
                        'Authorization': 'Basic ' + localStorage.getItem('token')
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error(error);
                setMsg('Fetching notifications failed. Please contact IT Admin.');
            }
        };

        fetchNotifications();
    }, []);

    const archiveNotification = async (id) => {
        try {
            await axios.get('http://localhost:8081/api/cap/notification/archive/' + id, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            });
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error(error);
            setMsg('Archiving notification failed. Please contact IT Admin.');
        }
    };

    const notificationTemplate = (notification) => {
        return (
            <div className="notification-item">
                <div className="notification-header">
                    <h3>{notification.name}</h3>
                    <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text close-btn" onClick={() => archiveNotification(notification.id)} />
                </div>
                <div className="notification-content">
                    <p>{notification.message}</p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="mb-4">Notifications for {empName}</h2>
                {notifications.length > 0 ? (
                    <Carousel 
                        value={notifications} 
                        itemTemplate={notificationTemplate} 
                        numVisible={1} 
                        numScroll={1} 
                        className="custom-carousel"
                        circular
                        autoplayInterval={3000}
                    />
                ) : (
                    <p>No notifications found.</p>
                )}
                {msg && <p className="text-danger">{msg}</p>}
            </div>
        </div>
    );
}

export default ViewNotification;
