import axios from "axios";
import { useEffect, useState } from "react";
import '../hr.css'
function HRStat(){

    const [countEmployee,setCountEmployee] = useState(0);
    const [countManager,setCountManager] = useState(0);

    useEffect(()=>{
        let token = localStorage.getItem('token'); 
        axios.get('http://localhost:8081/api/cap/hr/stat',{
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response=>{
            console.log(response.data)
            setCountEmployee(response.data.count_employee)
            setCountManager(response.data.count_manager)
        })
        .catch(error=>{

        })
    },[])
    return (
      <div>
        <div className="container stat">
          <div className="row">
            <div className="col md 6">

              <div className="card" style={{width: '50%'}}>
                <div className="card-header">
                    <span className="header-style">Employee Count </span>
                </div>
                <div className="card-body " style={{textAlign : 'center'}}>
                <span className="count">{countEmployee} </span>
                </div>
              </div>
            </div>
            <div className="col md 6 manager-count">
            <div className="card" style={{width: '50%'}}>
                <div className="card-header">
                <span className="header-style">Manager Count </span>
                </div>
                <div className="card-body" style={{textAlign : 'center'}}>
                    <span className="count">{countManager} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HRStat;