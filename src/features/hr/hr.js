import HrList from "./components/hrlist";
import HRStat from "./components/hrstat";
import Navbar from "./components/navbar";

function HR(){

    return(
        <div>
            <Navbar />
            
            <div>
                <HRStat />
            </div>
            
            <div className="mt-4"> 
                <HrList />
            </div>
            
        </div>
    )
}

export default HR; 