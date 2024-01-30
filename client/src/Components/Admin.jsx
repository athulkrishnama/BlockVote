import React, { useEffect, useState } from "react";
import axios from "../axios";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import RegistedVoters from "./RegistedVoters";
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting} from '../web3_functions'
import Candidates from "./Candidates";
function Admin(props) {
  const [registerd, setRegistered] = useState(false);
  const [login, setLogin] = useState(false);
  axios.get("/admin").then((data) => {
    setRegistered(data.data.registerd);
  });

  return (
    <div>
      {login ? (
        <div className="d-flex flex-column container-fluid">
          <nav className="navbar navbar-expanded-md bg-light">
            <h1 className="navbar-brand fs-1 fw-bold">Admin Panel</h1>
            <button className="btn btn-secondary" onClick={() => setLogin(false)}>Log Out</button>
          </nav>
          <div className="row">
            <Candidates funs={{registerCandidates,startVoting,stopVoting,getAllCandidate}} instance={props.contractInstance} account={props.account}/>
            <RegistedVoters approveVoter={whiteListAddress} instance={props.contractInstance} account={props.account}/>
          </div>
        </div>
      ) : !registerd ? (
        <AdminRegister setLogin={setLogin} account={props.account}/>
      ) : (
        <AdminLogin setLogin={setLogin} account={props.account}/>
      )}
    </div>
  );
}

export default Admin;
