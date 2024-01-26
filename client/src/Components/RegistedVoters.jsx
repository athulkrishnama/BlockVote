import React, { useEffect, useState } from "react";
import axios from "../axios";

function RegistedVoters({ approveVoter, instance, account }) {
  const [voters, setVoters] = useState([]);

  const approve = async (votersAddress) => {
    console.log(votersAddress)
    let result = await approveVoter(instance, account, votersAddress);
    console.log("result:", result);
    if (!result.error) {
      axios.post("/approve", { metaid: votersAddress }).then(() => {
        setVoters([]);
      });
    }
  };

  useEffect(() => {
    axios.get("/voters").then((data) => {
      setVoters(data.data.voters);
    });
  }, [voters]);

  return (
    <div className="voters half">
      <h1>Pending Voters to Approve</h1>
      <ul>
        {voters.map((obj) => {
          return (
            <li key={obj._id}>
              <div>
                <p>Name: {obj.name}</p>
                <p>Email: {obj.email}</p>
              </div>
              <div>
                <button onClick={() => approve(obj.metaid)}>Approve</button>
                <button>Reject</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RegistedVoters;
