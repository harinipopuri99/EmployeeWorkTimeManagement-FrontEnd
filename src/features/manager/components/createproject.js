import Navbar from '../../manager/components/navbar';
import '../manager.css';
import { useEffect, useState } from "react";
import axios from "axios";

function CreateProject() {
    const [regions, setRegions] = useState([]);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [regionId, setRegionId] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/cap/region/all`, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            setRegions(resp.data);
        });
    }, []);

    const addProject = () => {
        console.log(name);
        console.log(description);
        console.log(regionId);

        let data = {
            "name": name,
            "description": description,
        };

        axios.post('http://localhost:8081/api/cap/project/add/' + regionId, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log(resp);
            setMsg('Project Added Successfully..');
        })
        .catch(err => {
            console.log(err);
            setMsg('Adding Project Failed.. Please contact IT Admin');
        });

        window.scroll(0, 0);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ width: '50%' }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Create Project</h4>
                            </div>
                            <div className="card-body employee-form">
                                {
                                    msg === null ? '' :
                                    <div className="alert alert-primary" role="alert">
                                        {msg}
                                    </div>
                                }

                                <div className="mb-3">
                                    <h4>Add Project Details</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Name: </label>
                                    <input type="text" className="form-control" placeholder="Enter name of the Project"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Description: </label>
                                    <input type="text" className="form-control" placeholder="Enter Description"
                                        onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <h4>Assign Region</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Region: </label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => setRegionId(e.target.value)}>
                                        <option value=""> </option>
                                        {
                                            regions.map((region, index) => (
                                                <option value={region.id} key={index}>{region.regionName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={() => addProject()}>Add Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProject;
