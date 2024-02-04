import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import CandidatesDisplay from "./CandidatesDisplay";
import { votingStarted } from "../web3_functions";
import axios from '../axios'
const web3 = new Web3(window.ethereum);

 function Home(props) {
  const status = useContext(AppContext);
  const navigate = useNavigate();

  // cookie to get user data
  const [cookie, setCookie] = useCookies(["user"]);

  //useState to store current metamask account address
  const [account, setAccount] = useState("");

  // state to store election status
  const [electionStatus, setElectionStatus] = useState(false);

  // state to store election details
  const [electionDetails, setElectionDetails] = useState({})

  //state to store approval status
  const [approvalStatus, setApprovalStatus] = useState('')
  const handleAccountChanged = (accounts) => {
    console.log(accounts);
    setAccount("");
  };

  //function to check election status
  const checkElectionStatus = async () => {
    const res = await votingStarted(props.contractInstance, props.account);
    console.log("election", res);
    if (!res.error) setElectionStatus(res.message);
    else console.log(res);
  };

  const getelectionDetails = ()=>{
     axios.get('/getElectionDetails').then((data)=>{
      setElectionDetails(data.data)
    })
  }

  const getApprovalStatus = ()=>{
    if(cookie.metaid)
    axios.post('getApprovalStatus', {metaid:cookie.metaid}).then((data)=>{
      setApprovalStatus(data.data)
    })
  }


  // !status.status.login ? navigate("/login") : null;
  useEffect(() => {
    // check user is signed in or not
    web3.eth.getAccounts().then((data) => setAccount(data[0].toLowerCase()));

    //change account when account changed in metamask wallet
    if (web3) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    checkElectionStatus();
    getelectionDetails();
    getApprovalStatus();
    return () => {
      window.ethereum.off("accountsChanged", handleAccountChanged);
    };
  }, [account]);

  return (
    <div className="d-flex flex-column container-fluid">
      <nav className="navbar navbar-expanded-md bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-1 fw-bold">{electionDetails.election}</h1>
          {electionStatus?<h4 className="text-success">Election Started</h4>:<h4 className="text-danger">Election not yet started</h4>}
          <div className="navbarNav">
            <button
              className="btn btn-primary "
              onClick={() => {
                setCookie("login");
                status.setStatus({ ...status.status, login: false });
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="">
        <table className="col-3">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{cookie.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{cookie.email}</td>
            </tr>
            <tr>
              <th>Metamask ID</th>
              <td>{cookie.metaid}</td>
            </tr>
            <tr>
              <th>Approval Status</th>
              <td>{approvalStatus}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-danger">
          {account != cookie.metaid
            ? "Your registered Id doesnt match with current account"
            : null}
        </p>
      </div>
      <CandidatesDisplay
        electionStatus={electionStatus}
        instance={props.contractInstance}
        account={props.account}
      />
    </div>
  );
}

export default Home;
