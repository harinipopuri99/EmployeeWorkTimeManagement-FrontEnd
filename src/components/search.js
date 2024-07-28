import { useEffect } from "react";

function Search({searchStr}){
     useEffect(()=>{
        console.log("In Search Comp " + searchStr)
     },[searchStr]);

    return(
        <div className="container">
            <div className="card">
                <div className="card-header"> Search Results</div>
                <div className="card-body">
                <div className="row">
                    <div className="col-sm-4">
                            col1 
                    </div>
                    <div className="col-sm-4">
                        col2
                    </div>
                    <div className="col-sm-4">
                        col3
                    </div>
                </div>

                </div>
            </div>

        </div>
    )
}

export default Search; 