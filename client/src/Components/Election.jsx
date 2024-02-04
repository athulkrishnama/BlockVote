import React from "react";
import { startVoting, stopVoting, getWinner } from "../web3_functions";
import { useState } from "react";
function Election({ instance, account, setElectionStatus }) {
  
    const [winner, setWinner] = useState('')
  
    const startVotingFun = async () => {
    const res = await startVoting(instance, account);
    if(!res.error)setElectionStatus(true)
  };
  const stopVotingFun = async () => {
    const res = await stopVoting(instance, account);
    if(!res.error)setElectionStatus(false)
  };
  const getWinnerFun = async () => {
    const res = await getWinner(instance, account);
    console.log(res);
    setWinner(res.message.name)
  };
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
    </div>
  );
}

export default Election;
