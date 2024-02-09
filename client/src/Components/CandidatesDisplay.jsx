import React, { useEffect, useState } from "react";
import { getAllCandidate , putVote} from "../web3_functions";
import axios from "../axios";

function CandidatesDisplay({ instance, account, canVote, metaid, setNotVoted }) {
  // state for candidates
  const [candidates, setCandidates] = useState([]);

  //   function to get all candidates
  const getCandidates = async () => {
    const res = await getAllCandidate(instance, account);
    console.log(res);
    setCandidates(res.message);
  };

  const vote = async (address)=>{
    const res = await putVote(instance, account, address)
    console.log(res)
    if(!res.error)axios.post('/setUserVoted', {metaid:metaid}).then(()=>{
      setNotVoted(false)
    })
  }

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div className=" border rounded-4 p-4 m-4 row justify-content-center">
      <h3 className="text-center fs-1 fw-bold"> Candidates</h3>
      {candidates.map((can) => {
        return (
          <div key={can.candidateAddress} className="card col-md-2 mx-2">
            <h3 className="card-title">{can.name}</h3>
            <div className="car-body">
              <p className="card-text">{can.candidateAddress}</p>
              <button onClick={()=>{vote(can.candidateAddress)}} className="btn btn-primary m-2" disabled={!canVote && 'disabled' }>Vote</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesDisplay;
