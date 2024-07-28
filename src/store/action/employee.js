import axios from "axios"

export const getEmployees=()=>(dispatch)=>{
    //call the api 
    axios.get('http://localhost:8081/api/cap/manager/employee',{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })

    .then(response=>{
        let action = {
            type: 'GET_ALL_EMPLOYEE',
            payload: response.data
        };

        dispatch(action)
    })
}

export const getCurrEmployee=()=>(dispatch)=>{
    //call the api 
    axios.get('http://localhost:8081/api/cap/employee',{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })

    .then(response=>{
        let action = {
            type: 'GET_CURRENT_EMPLOYEE',
            payload: response.data
        };

        dispatch(action)
    })
}