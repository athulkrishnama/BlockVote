import React, { useEffect, useState } from "react";
import { getAllCandidate, registerCandidates } from "../web3_functions";
import axios from "../axios";

function Candidates({ instance, account }) {
  // This is a component inside admin page
  // it handles registration of new candidates

  // state to store data of candidate
  const [candidate, setCandidate] = useState({ name: "", metaid: "" });

  // function to handle change in input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  // function to handle registration of candidate
  const registerCandidate = async () => {
    console.log("name:", candidate.name);
    let result = await registerCandidates(
      instance,
      account,
      candidate.name,
      12,
      candidate.metaid
    );
    if (!result.error) {
      let formData = new FormData();
      await formData.append("name", candidate.name);
      await formData.append("metaid", candidate.metaid.toLowerCase());
      await formData.append("image", candidate.raw);
      axios.post("/registerCandidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res=>{
        console.log(res)
      });
    }
  };

  // function to set image of candidate
  const setImage = (e) => {
    setCandidate({
      ...candidate,
      image: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  return (
    <div className="col-md-3 border rounded-4 p-4 m-4">
      <h2 className="fs-3 fw-medium">Candidate Registration</h2>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          value={candidate.name}
          onChange={handleChange}
          name="name"
          placeholder="Candidate Name"
        />
        <label className="form-label" htmlFor="">
          Candidate Name
        </label>
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          value={candidate.metaid}
          onChange={handleChange}
          name="metaid"
          placeholder="metaid"
        />
        <label className="form-label" htmlFor="">
          Candidate Metamask ID
        </label>
      </div>
      <div>
        {candidate.image && (
          <img
            className="img-fluid  can-image mb-2 mx-auto d-block"
            src={candidate.image}
            alt="test"
          />
        )}
        <input
          type="file"
          name="image"
          id=""
          className="form-control mb-2"
          onChange={setImage}
        />
      </div>
      <button className="btn btn-primary" onClick={registerCandidate}>
        Register
      </button>
    </div>
  );
}

export default Candidates;
