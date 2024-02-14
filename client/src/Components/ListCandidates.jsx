import React, { useEffect, useState } from "react";
import {getAllCandidate} from '../web3_functions'

function ListCandidates({instance, account}) {
  // state for candidates
  const [candidates, setCandidates] = useState([]);

//   function to get all candidates
const getCandidates = async ()=>{
    const res = await getAllCandidate(instance , account)
    console.log(res)
    setCandidates(res.message)
}

  // function to mask metaid
  const maskId = (metaid)=>{
    let maskedId = "0XXXXXX"
    maskedId += metaid.substring(metaid.length-10) 
    return maskedId
  }


  useEffect(() => {
    
  getCandidates()

  }, [])
  
  return (
    <div className="col-md-7 border rounded-4 p-4 m-4">
      <h3>Registerd Candidates</h3>
      <button className="btn btn-primary" onClick={getCandidates}>Refresh</button>
      <div className="row mt-2">
        {
          candidates.map((can)=>{
              return(
                  <div key={can.candidateAddress} className="card col-md-3 mx-2">
                      <img src={"http://localhost:8000/uploads/"+can.candidateAddress.toLowerCase()} alt="" className="card-image-top mt-2 rounded-2" />
                      <div className="card-body">
                        <h3 className="card-title">{can.name}</h3>
                        <p className="card-text">{can.candidateAddress&&maskId(can.candidateAddress)}</p>
                      </div>
                  </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default ListCandidates;
