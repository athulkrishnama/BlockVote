import React, { useState , useEffect} from "react";
import axios from "../axios";

function AdminRegister(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    election: "",
    metaid: props.account,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const register = () => {
    if (
      user.email == "" ||
      user.password == "" ||
      user.election == "" ||
      user.metaid == ""
    ) {
      console.log("fields empty");
    } else {
      axios.post("/adminregister", user).then((data) => {
        if (!data.data.registered) {
          props.setLogin(true);
        } else {
          console.log("registration failed");
        }
      });
    }
  };


  // change metaid in form when metaid changed in metamask wallet
  const handleAccountChanged = (accounts) => {
    handleChange({ target: { name: "metaid", value: accounts[0] } });
  };
  useEffect(() => {
    //listener for account change
    window.ethereum.on("accountsChanged", handleAccountChanged);
    return () => {
      //remove lister on unmount
      window.ethereum.off("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <div className="d-flex align-items-center justify-content-center full-page row container-fluid">
      <div className="col-5">
        <h3 className="fs-1 fw-bold">Admin Register</h3>
        <div className="mb-3 form-floating">
          <input
            value={user.name}
            type="email"
            name="email"
            onChange={handleChange}
            autoComplete="off"
            className="form-control"
            placeholder="Email"
          />
          <label htmlFor="" className="form-label">
            Email
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            value={user.password}
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="" className="form-label">
            Password
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            value={user.metaid}
            type="text"
            name="metaid"
            onChange={handleChange}
            className="form-control"
            placeholder="MetaID"
            disabled
          />
          <label htmlFor="" className="form-label">
            MetaMask ID
          </label>
        </div>
        <div className="mb-3 form-floating">
          <input
            value={user.election}
            type="text"
            name="election"
            onChange={handleChange}
            className="form-control"
            placeholder="Election Name"
          />
          <label htmlFor="" className="form-label">
            Election Name
          </label>
        </div>
        <div className="loginBtn">
          <button className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
