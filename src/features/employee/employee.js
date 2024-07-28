import { useState } from "react";
import {React, useEffect } from "react";
import Search from "../../components/search";
import Navbar from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "./components/projectlist";
import { getCurrEmployee } from "../../store/action/employee";

function Employee(){


    const [searchStrVal,setSearchStrVal] = useState(null);

    const handleSearch = (searchStr)=>{
        setSearchStrVal(searchStr)
    }
   
    const dispatch = useDispatch();
    const currentEmployee = useSelector(state => state.employee.currentEmployee);

    useEffect(() => {
        dispatch(getCurrEmployee());
    }, [dispatch]);

    if (!currentEmployee) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div> 
                <Navbar searchFn = {handleSearch} empName={currentEmployee.name}/>
            </div>
            <div className="mt-4">
                <Search searchStr={searchStrVal} />
            </div>
            
        </div>
    );
}

export default Employee; 