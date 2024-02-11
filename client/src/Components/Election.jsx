import React, { useEffect } from "react";
import {
  startVoting,
  stopVoting,
  getWinner,
  getAllCandidate,
} from "../web3_functions";
import { useState } from "react";
import axios from "../axios";
function Election({ instance, account, setElectionStatus }) {
  // component inside admin page to start, stop voting and declare winner and show vote count of candidates

  // state to store winner
  const [winner, setWinner] = useState([]);

  // state to store weather election is declared
  const [declared, setDeclared] = useState(false);

  // state to store candidate list
  const [candidates, setCandidates] = useState([]);

  // dunction to start voting
  const startVotingFun = async () => {
    const res = await startVoting(instance, account);
    console.log(res);
    if (!res.error) setElectionStatus(true);
  };

  // function to stop voting
  const stopVotingFun = async () => {
    const res = await stopVoting(instance, account);
    if (!res.error) setElectionStatus(false);
  };

  // function to fetch candidate details. 
  const displayResult = async () => {
    const res = await getAllCandidate(instance, account);
    setCandidates(res.message);
  };

  // find winner if there is multiple candidates with same vote
  const getWinners = (candidates)=>{
    let highest = 0
    candidates.map((can)=>{
      if(parseInt(can.votes) > highest){
        highest = parseInt(can.votes)
      }
    })
    setWinner(candidates.filter((can)=>{
      if(parseInt(can.votes) ==  highest)
          return true;
      else 
        return false
    }))
  }

  // function to declare winner. 
  const getWinnerFun = async () => {
    const res = await getAllCandidate(instance, account);
    getWinners(res.message);
    axios.get("/electionDeclared").then(() => {
      console.log("declared");
      displayResult();
      setDeclared(true);
    });
  };


  useEffect(() => {
    // check weather result is declared or not
    axios.get("/getElectionDetails").then((data) => {
      if (data.data.declared) {
        setDeclared(true);
        getWinnerFun();
      }
    });
    // console.log("Winners are ", winner  )
    displayResult();
  }, []);

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
      <h2 className="border fw-bold mt-3 rounded p-1">{winner[0]?winner.map((can)=>can.name+" "):""}</h2>
      {declared && (
        <div>
          <ul className="list-group">
            {candidates.map((can) => {
              return (
                <li className="list-group-item" key={can.candidatesAddress}>
                  <p className={can.winner&&"text-success"} >{can.name}</p>
                  <p>Vote: {can.votes.toString()}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Election;
