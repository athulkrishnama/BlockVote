import React, { useEffect, useState } from "react";
import axios from "../axios";
import {
  whiteListAddress,
  getRegisteredVotersCount,
  getVotedCount,
} from "../web3_functions";

function RegistedVoters({ instance, account }) {
  const [voters, setVoters] = useState([]);

  const [voterStatistics, setVoterStatistics] = useState({});

  const fetchData = () => {
    axios.get("/voters").then((data) => {
      console.log("data fetched");
      setVoters(data.data.voters);
    });
  };
  const approve = async (votersAddress) => {
    console.log(votersAddress);
    let result = await whiteListAddress(instance, account, votersAddress);
    if (!result.error) {
      axios.post("/approve", { metaid: votersAddress }).then(() => {
        fetchData();
        getVoterStatistics();
      });
    }
  };

  const reject = async (votersAddress) => {
    axios.post("/reject", { metaid: votersAddress }).then(() => {
      fetchData();
      getVoterStatistics();
    });
  };

  const getElectionDetails = async () => {
    let res1 = await getRegisteredVotersCount(instance, account);
    let res2 = await getVotedCount(instance, account);
  };

  const getVoterStatistics = () => {
    axios.get("/getVoterStatistics").then((data) => {
      setVoterStatistics(data.data);
    });
  };


  useEffect(() => {
    fetchData();
    getVoterStatistics();
    getElectionDetails();
    console.log("refresh");
  }, []);
  return (
    <>
      <div className="col-md-5 border rounded-4 my-4">
        <h1 className="fs-2 fw-medium text-center m-2">Voters Statictics</h1>
        <table className="table text-center fs-4">
          <tr>
            <th >Registered</th>
            <th className="text-success">Approved</th>
            <th className="text-danger">Rejected</th>
          </tr>
          <tr>
            <td>{voterStatistics.registered}</td>
            <td>{voterStatistics.approved}</td>
            <td>{voterStatistics.rejected}</td>
          </tr>
        </table>
      </div>

      <div className="col-md-3 border rounded-4 m-4">
        <h1 className="fs-2 fw-medium m-2 text-center">
          Pending Voters to Approve
        </h1>
        <ul className="list-group">
          {voters.map((obj) => {
            return (
              <li
                key={obj._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p>Name: {obj.name}</p>
                  <p>Email: {obj.email}</p>
                </div>
                <div className="">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      approve(obj.metaid);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      reject(obj.metaid);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default RegistedVoters;
