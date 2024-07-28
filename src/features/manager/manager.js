
import Navbar from "./components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/action/employee";

function Manager(){
    
    const dispatch = useDispatch();
    dispatch(getEmployees())
    
   
    return(
        <div>
            <div> 
                <Navbar />
            </div>
            
        </div>
    )
}

export default Manager; 