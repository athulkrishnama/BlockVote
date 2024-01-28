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
    <div className="election half">
      <div className="input">
        <label htmlFor="">Candidate Name</label>
        <input type="text" value={candidate.name} onChange={handleChange} name="name"/>
      </div>
      <div className="input">
        <label htmlFor="" >Candidate Metamask ID</label>
        <input type="text" value={candidate.metaid} onChange={handleChange} name="metaid"/>
      </div>
      <button onClick={registerCandidate}>Register</button>
    </div>
  );
}

export default Candidates;
