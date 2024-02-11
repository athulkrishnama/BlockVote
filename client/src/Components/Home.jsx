import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import CandidatesDisplay from "./CandidatesDisplay";
import { getAllCandidate, votingStarted } from "../web3_functions";
import axios from "../axios";
const web3 = new Web3(window.ethereum);

function Home(props) {
  const status = useContext(AppContext);
  const navigate = useNavigate();

  // cookie to get user data
  const [cookie, setCookie] = useCookies(["user"]);

  //useState to store current metamask account address
  const [account, setAccount] = useState("");

  // voter need to satisfy 4 condition to vote
  // 1.Election must be started
  // 2.Voter must be approved
  // 3.selected metaid and users metaid should be Same
  // 4.Voter should not be voted before

  // state to store use can vote?
  const [canVote, setCanVote] = useState(false);

  // state to store election status
  const [electionStatus, setElectionStatus] = useState(false);

  // state to store approval status
  const [approval, setApproval] = useState(false);

  // state to store wheather currently selected metaid and users metaid is same
  const [isMetaid, setIsMetaid] = useState(false);

  // state to store wheather user already voted
  const [isNotVoted, setIsNotVoted] = useState(false);

  // state to store election details
  const [electionDetails, setElectionDetails] = useState({});

  // state for winner
  const [winner, setWinner] = useState([])
  //state to store approval status
  const [approvalStatus, setApprovalStatus] = useState("");
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

  const getelectionDetails = () => {
    axios.get("/getElectionDetails").then(async(data) => {
      setElectionDetails(data.data);
      if(data.data.declared){
        const res = await getAllCandidate(props.contractInstance, props.account)
        getWinners(res.message)
      }
    });
  };

  const getVoterDetails = () => {
    if (cookie.metaid)
      axios.post("/getVoterDetails", { metaid: cookie.metaid }).then((data) => {
        setApprovalStatus(data.data.status);
        if (approvalStatus == "approved") setApproval(true);
        setIsNotVoted(!data.data.voted);
      });
  };

  const checkMetaid = () => {
    if(account == cookie.metaid){
      setIsMetaid(true)
    }
    else{
      setIsMetaid(false)
    }
  };

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
  // !status.status.login ? navigate("/login") : null;
  useEffect(() => {
    // check user is signed in or not
    !status.status.login ? navigate("/login") : null;
    web3.eth.getAccounts().then((data) => setAccount(data[0].toLowerCase()));

    //change account when account changed in metamask wallet
    if (web3) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    checkElectionStatus();
    getelectionDetails();
    getVoterDetails();
    checkMetaid();
    if (electionStatus && approval && isNotVoted && isMetaid) {
      setCanVote(true);
    } else {
      setCanVote(false);
    }
    console.log(approvalStatus)
    console.log(props.account)
    return () => {
      window.ethereum.off("accountsChanged", handleAccountChanged);
    };
  }, [account, isMetaid , approval, electionStatus, isNotVoted]);

  return (
    <div className="d-flex flex-column container-fluid">
      <nav className="navbar navbar-expanded-md bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-1 fw-bold">
            {electionDetails.election}
          </h1>
          {electionDetails.declared?
          <h4>Result Declared</h4>:
          electionStatus ? (
            <h4 className="text-success">Election Started</h4>
          ) : (
            <h4 className="text-danger">Election not yet started</h4>
          )}
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
            <tr>
              <th>Voting Status</th>
              <td>{isNotVoted?"Not Voted":"Voted"}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-danger">
          {account != cookie.metaid
            ? "Your registered Id doesnt match with current account"
            : null}
        </p>
      </div>
      {
        electionDetails.declared&&(
          <h1>Winner is : {winner[0]?winner.map((can)=>{
            return can.name + " "
            console.log("winners are:",winner)
          }):""}</h1>
        )
      }
      <CandidatesDisplay
        canVote={canVote}
        instance={props.contractInstance}
        account={props.account}
        metaid={account}
        setNotVoted={setIsNotVoted}
        electionDetails={electionDetails}
      />
    </div>
  );
}

export default Home;
