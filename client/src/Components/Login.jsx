import React, { useContext } from "react";
import { AppContext } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCookies } from "react-cookie";

function Login() {
  //context of loginstatus {login, msg}
  const status = useContext(AppContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  // cookie to store details of logined user
  const [cookie, setCookie] = useCookies(['user'])

  

  //function to handle change data in the input field 
  // data is updated in the user usestate
  // [name]:value update the key value pair
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Login function
  // context status will be set to login true after successful login
  const logIn = () => {
    // check fields are isempty
    if (user.email == "" || user.password == "") {
      status.setStatus({ ...status.status, msg: "field should not be empty" });
    } else {
      axios
        .post("/login", user)
        .then((data) => {
          status.setStatus({ ...status.status, login: true });
          const userData = data.data.user;
          navigate("/");
          setCookie("login", 1);
          setCookie("name", userData.name);
          setCookie("email", userData.email);
          status.setStatus({ ...status.status, login: true });
        })
        // if login failed set msg to status context
        .catch((e) => {
          status.setStatus({...status.status, msg:e.response.data.message})
        });
    }
  };
  return (
    <div className="loginContainer">
      <div className="login">
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
        <div className="loginBtn">
          <button onClick={logIn}>Login</button>
          <button onClick={() => navigate("/signup")}>Create Account</button>
        </div>
        {status.status.msg && <p>{status.status.msg}</p>}
      </div>
    </div>
  );
}

export default Login;
