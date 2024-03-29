import React, { useEffect, useState } from "react";
import { getAllCandidate, putVote } from "../web3_functions";
import axios from "../axios";

function CandidatesDisplay({
  instance,
  account,
  canVote,
  metaid,
  setNotVoted,
  electionDetails,
}) {
  // component to display candidate list in voters page
  // used to vote and and show votecount if election declared
  // voter can vote only if canVote is true

  // state for candidates
  const [candidates, setCandidates] = useState([]);

  //   function to get all candidates
  const getCandidates = async () => {
    const res = await getAllCandidate(instance, account);
    console.log(res);
    setCandidates(res.message);
  };

  // function to vote 
  const vote = async (address) => {
    const res = await putVote(instance, account, address);
    console.log(res);
    if (!res.error)
      axios.post("/setUserVoted", { metaid: metaid }).then(() => {
        setNotVoted(false);
      });
  };

  const maskId = (metaid)=>{
    let maskedId = "0XXXXXX"
    maskedId += metaid.substring(metaid.length-10) 
    return maskedId
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
            <img src={"http://localhost:8000/uploads/"+can.candidateAddress.toLowerCase()} className="card-image-top mt-2 card-image" alt="" />
            <div className="car-body">
            <h3 className="card-title">{can.name}</h3>
              <p className="card-text">{can.candidateAddress&&maskId(can.candidateAddress)}</p>
              {
                electionDetails.declared?
                <button className="btn btn-success m-2">{can.votes.toString()}</button>
                :<button
                  onClick={() => {
                    vote(can.candidateAddress);
                  }}
                  className="btn btn-primary m-2"
                  disabled={!canVote && "disabled"}
                >
                  Vote
                </button>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesDisplay;
