import React, { useEffect, useState } from "react";
import axios from "../axios";

function RegistedVoters({ approveVoter, instance, account }) {
  const [voters, setVoters] = useState([]);


  const fetchData = ()=>{
    axios.get("/voters").then((data) => {
      console.log('data fetched')
      setVoters(data.data.voters);
    });
  }
  const approve = async (votersAddress) => {
    console.log(votersAddress);
    let result = await approveVoter(instance, account, votersAddress);
    if (!result.error) {
      axios.post("/approve", { metaid: votersAddress }).then(() => {
        fetchData()
      });
    }
  };

  const reject = async (votersAddress) => {
    axios.post("/reject", { metaid: votersAddress }).then(() => {
      fetchData()
    });
  };



  useEffect(() => {
    fetchData()
    console.log("refresh");
  }, []);
  return (
    <div className="col-md-4 border rounded-4 m-4">
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
  );
}

export default RegistedVoters;
