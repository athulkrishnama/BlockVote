import React, { useEffect, useState } from "react";
import axios from "../axios";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import RegistedVoters from "./RegistedVoters";
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting} from '../web3_functions'
function Admin(props) {
  const [registerd, setRegistered] = useState(false);
  const [login, setLogin] = useState(false);
  axios.get("/admin").then((data) => {
    setRegistered(data.data.registerd);
  });

  return (
    <div>
      {login ? (
        <div className="admin">
          <nav>
            <h1>Admin Panel</h1>
            <div><button onClick={() => setLogin(false)}>Log Out</button></div>
          </nav>
          <div className="adminBody">
            <div className="election half">
              Election functions and candidates addition
            </div>
            <RegistedVoters approveVoter={whiteListAddress} instance={props.contractInstance} account={props.account}/>
          </div>
        </div>
      ) : !registerd ? (
        <AdminRegister setLogin={setLogin} />
      ) : (
        <AdminLogin setLogin={setLogin} />
      )}
    </div>
  );
}

export default Admin;
