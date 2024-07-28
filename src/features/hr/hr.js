import { useState } from "react";
import Search from "../../components/search";
import HrList from "./components/hrlist";
import HRStat from "./components/hrstat";
import Navbar from "./components/navbar";

function HR(){

    const [searchStrVal,setSearchStrVal] = useState(null);

    const handleSearch = (searchStr)=>{
        setSearchStrVal(searchStr)
    }
    return(
        <div>
            <div> 
                <Navbar searchFn = {handleSearch}/>
            </div>
            <div className="mt-4">
                <Search searchStr={searchStrVal} />
            </div>
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