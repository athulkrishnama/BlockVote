import React, { useState } from "react";
import axios from "../axios";

function AdminRegister(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    election: "",
    metaid: "",
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
      axios.post("/adminregister", user).then((data)=>{
        if(!data.data.registered){
          props.setLogin(true)
        }
        else{
          console.log('registration failed')
        }
      });
    }
  };
  return (
    <div className="loginContainer">
      <div className="login">
        <h3>Admin Register</h3>
        <div className="inputfield">
          <label htmlFor="">Email</label>
          <input
            value={user.name}
            type="email"
            name="email"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="inputfield">
          <label htmlFor="">Password</label>
          <input
            value={user.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <label htmlFor="">MetaMask ID</label>
          <input
            value={user.metaid}
            type="text"
            name="metaid"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <label htmlFor="">Election Name</label>
          <input
            value={user.election}
            type="text"
            name="election"
            onChange={handleChange}
          />
        </div>
        <div className="loginBtn">
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
