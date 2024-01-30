import React, { useEffect, useState } from "react";
import { getAllCandidate, registerCandidates } from "../web3_functions";

function Candidates({ funs , instance, account}) {

    const [candidate , setCandidate] = useState({name:'' , metaid:''})

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setCandidate({ ...candidate, [name]: value });
    }


    const registerCandidate =async ()=>{
        console.log("name:", candidate.name);
        let result = await registerCandidates(instance, account, candidate.name, 12, candidate.metaid);
        console.log("result:", result);
    }
    useEffect(() => {
      
        const connect = async()=>{
            const arr = await getAllCandidate(instance, account)
            console.log(arr.message)
        }
    
        connect()
    }, )
    
    return (
    <div className="col-md-6 border rounded-4 p-4 m-4">
      <h2 className="fs-3 fw-medium">Candidate Registration</h2>
      <div className="mb-3 form-floating">
        <input className="form-control" type="text" value={candidate.name} onChange={handleChange} name="name" placeholder="Candidate Name"/>
        <label className="form-label" htmlFor="">Candidate Name</label>
      </div>
      <div className="mb-3 form-floating">
        <input className="form-control" type="text" value={candidate.metaid} onChange={handleChange} name="metaid" placeholder="metaid"/>
        <label className="form-label" htmlFor="" >Candidate Metamask ID</label>
      </div>
      <button className="btn btn-primary" onClick={registerCandidate}>Register</button>
    </div>
  );
}

export default Candidates;
