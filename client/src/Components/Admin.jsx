import React, { useEffect, useState } from "react";
import axios from "../axios";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import RegistedVoters from "./RegistedVoters";
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting , votingStarted} from '../web3_functions'
import Candidates from "./Candidates";
import Election from "./Election";
import ListCandidates from "./ListCandidates";
function Admin(props) {
  // state to registered or logined
  // if one admin account exists user cant create another admin account 
  const [registerd, setRegistered] = useState(false);

  // state to store login status
  const [login, setLogin] = useState(false);

  // state to store election status
  const [electionStatus, setElectionStatus] = useState(false)

  //query to database if admin exists
  axios.get("/admin").then((data) => {
    setRegistered(data.data.registerd);
  });

  const checkElectionStatus = async () => {
    const res = await votingStarted(props.contractInstance, props.account);
    console.log("election", res);
    if (!res.error) setElectionStatus(res.message);
    else console.log(res);
  };

  useEffect(() => {
    checkElectionStatus();
  }, [])
  

  return (
    <div>
      {login ? (
        <div className="d-flex flex-column container-fluid">
          <nav className="navbar navbar-expanded-md bg-light">
            <h1 className="navbar-brand fs-1 fw-bold">Admin Panel</h1>
            {electionStatus?<h3 className="text-success">Election is Live</h3>:<h3 className="text-danger">Election is not live</h3>}
            <button className="btn btn-secondary" onClick={() => setLogin(false)}>Log Out</button>
          </nav>
          <div className="row">
            <Candidates  instance={props.contractInstance} account={props.account}/>
            <RegistedVoters  instance={props.contractInstance} account={props.account}/>
            <Election instance={props.contractInstance} account={props.account} setElectionStatus={setElectionStatus}/>
            <ListCandidates instance={props.contractInstance} account={props.account}/>
          </div>
        </div>
      ) : !registerd ? (
        <AdminRegister setLogin={setLogin} account={props.account} />
      ) : (
        <AdminLogin setLogin={setLogin} account={props.account}/>
      )}
    </div>
  );
}

export default Admin;
