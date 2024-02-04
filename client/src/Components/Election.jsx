import React, { useEffect } from "react";
import { startVoting, stopVoting, getWinner, getAllCandidate } from "../web3_functions";
import { useState } from "react";
import axios from "../axios";
function Election({ instance, account, setElectionStatus }) {
  
    const [winner, setWinner] = useState('')

    const [declared, setDeclared] = useState(false)

    const [candidates, setCandidates] = useState([])
    const startVotingFun = async () => {
    const res = await startVoting(instance, account);
    console.log(res)
    if(!res.error)setElectionStatus(true)
  };
  const stopVotingFun = async () => {
    const res = await stopVoting(instance, account);
    if(!res.error)setElectionStatus(false)
  };

  const displayResult =async ()=>{
    const res = await getAllCandidate(instance, account)
    setCandidates(res.message)
    console.log(candidates)
  }

  const getWinnerFun = async () => {
    stopVotingFun()
    const res = await getWinner(instance, account);
    setWinner(res.message.name)
    axios.get('/electionDeclared').then(()=>{
      console.log('declared')
      setDeclared(true)
    })
  };
  useEffect(() => {
    axios.get('/getElectionDetails').then((data)=>{
      if(data.data.declared){
        setDeclared(true);
        getWinnerFun();
      }
    })
    displayResult()
  }, [])
  
  return (
    <div className="col-md-4 border rounded-4 p-4 m-4">
      <h3>Election</h3>
      <button onClick={startVotingFun} className="btn btn-success me-3">
        Start Voting
      </button>
      <button onClick={stopVotingFun} className="btn btn-danger me-3">
        Stop Voting
      </button>
      <button onClick={getWinnerFun} className="btn btn-primary">
        Get Winner
      </button>
      <h2 className="border fw-bold mt-3 rounded p-1">{winner}</h2>
      {
        declared&&<div>
          <ul className="list-group">
          {
            candidates.map((can)=>{
              return(<li className="list-group-item"><p>{can.name}</p><p>Vote: {can.votes.toString()}</p></li>)
            })
          }
          </ul>
        </div>
      }
    </div>
  );
}

export default Election;
